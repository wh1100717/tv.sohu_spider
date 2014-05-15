#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Author: @wh1100717
Repository: https://github.com/wh1100717/tv.sohu_spider
'''

import requests
'''
 # Request简单使用方法
 1. 
 	r = requests.get('https://github.com/timeline.json')
 	*	同时支持 post | put | delete | head | options
 2. 
 	payload = {'key1': 'value1', 'key2': 'value2'}
	r = requests.get("http://httpbin.org/get", params=payload)
 3. 
	import json
	url = 'https://api.github.com/some/endpoint'
	payload = {'some': 'data'}
	headers = {'content-type': 'application/json'}
	r = requests.post(url, data=json.dumps(payload), headers=headers)
 	r.status_code	#200
 	r.status_code == requests.codes.ok
'''
# Note: 在用BeautifulSoup4的时候，sohu部分网页不能解析body node，故使用3
from BeautifulSoup import BeautifulSoup
from util import RedisUtil
from util import StringUtil
from util import AgentPoolUtil
import traceback
import pipelines
import config
import re
import time
import random
import thread

class Spider:

	def __init__(self):
		#redis client，在RedisUtil中对redis-py进行了进一步封装
		self._redis = RedisUtil.RedisClient()
		#防ban策略配置
		self._unti_ban = config.UNTI_BAN
		#目标网站
		self._target = config.TARGET
		#请求的一些配置信息
		self._request = config.REQUEST
		#最大进程数
		self._thread_max = config.THREAD_MAX
		#当前进程数
		self._current_thread_count = 0

	def _get_html(self, url):
		#进行一些url的预处理，可扩展，目前没有处理
		url = StringUtil.process_url(url)
		headers = {
			#动态更改userAgent
			'User-Agent': AgentPoolUtil.getRandomUserAgent()
		}
		proxies = {
			#动态更改代理,https的tv.sohu.com用不上
			# 'http': AgentPoolUtil.getRandomProxy(),
		}
		try:
			response  = requests.get(url, headers = headers, proxies=proxies)
		except Exception, e:
			print e
			print Exception
			print "请求错误拦截，因为url未必都靠谱，所以有可能会报错"
			print "%s Thread exit with error occurs"
			self._current_thread_count -= 1
			thread.exit_thread()
		#设置返回值的编码
		response.encoding = self._request['encoding']
		return response.text

	def _process_html(self, html):
		'''
		 * 解析内容中的url，存入集合中
		'''
		urls = set()
		soup = BeautifulSoup(html)
		soup_res = soup.findAll(True, {'href': re.compile(self._target['grab_url_reg'])})
		for res in soup_res:
			url = res['href']
			#如果是资源文件，则丢弃
			if StringUtil.is_resource_url(url): continue
			urls.add(url)
		'''
		 * 将解析的url set存入到redis中
		'''
		for url in urls:
			self._redis.sset('sohu::url', url)
		print "     >>>>finish push %s urls in `sohu::url` of redis" %len(urls)

	def _pop_url_from_redis(self):
		'''
		 * 从redis中pop出来一个url进行内容抓取
		'''
		return self._redis.spop('sohu::url')

	def _is_view_detail_page(self, url):
		'''
		 * 检查对应url是否为视频详细页
		 	如果是视频详细页解析具体的数据并存入redis
		 	如果不是详细页，则仅进行页面url的获取
		'''
		return True if re.match(self._target['view_detail_page_reg'], url) else False

	
	def _pipelines(self, html):
		'''
		 * 获取页面具体数据，具体获取的数据有以下内容：
		 	*	vid | nid | pid | cover url | playListId | cid | subcid | osubcid |
		 		category | cateCode | pianhua | tag | tvid | playSpaceId
		 	*	发布时间|时长|来源|简介|类型|导演|演员等等信息
		 	*	播放量(通过构造count.vrs.sohu.com/count/stat.do请求来获得)
		 	*	顶踩数(通过构造score.my.tv.sohu.com/digg/get.do请求来获得)
		 	*	评论数及具体评论信息(通过构造access.tv.sohu.com/replay/list请求来获得)
		 	*	视频真实地址
		 		构造hot.vrs.sohu.com获取allot, clipsURL及su
		 		构造{allot}/?prot=.....来获取视频真实地址模板和key
		 		进行模板替换获取真实地址
		'''
		pipe = pipelines.Pipelines(html)
		data = pipe.process()
		self._to_redis(data)
		print "     ****success save data into redis sohu::video with data vid: ", data['vid']

	def _to_redis(self, data):
		'''
		 * 将解析的数据存入redis中
		'''
		self._redis.hset('sohu::video',data['vid'], data)
		#只有成功处理了一个视频详细页的数据，才将max_videos减一
		self.max_videos -= 1

	def _clear_redis(self):
		#测试用，清空表数据
		self._redis.delete('sohu::url')
		self._redis.delete('sohu::video')
		pass

	def thread_proc(self, threadName, url):
		try:
			#获取url所对应的页面内容
			html = self._get_html(url)
			#判断url是否是视频详细页
			#如果是，则进一步处理，获取具体信息；如果不是，则仅获取网页中的url
			if self._is_view_detail_page(url):
				self._pipelines(html)
			self._process_html(html)
		except Exception, e:
			print Exception, e
			print traceback.format_exc()
		finally:
			self._current_thread_count -= 1
			print "    Thread: Exit --- %s " %threadName
			thread.exit_thread()



	def start(self,config):
		print "start"
		#如果命令行通过 -m 配置最大进程数，则覆盖配置文件中的配置
		if config['max_threads']:
			self._thread_max = config['max_threads']
		url = self._target['host']
		self.max_videos = config['max_videos']
		#清空表数据(测试用，实际上不需要)
		#self._clear_redis()
		#flag用来判断是否为入口地址，如果为入口地址，则直接处理，如果不是入口地址则从数据库中读取url进行处理
		flag = False
		#max_videos为最多需要获取的视频数量
		#只有在处理的时视频详细页的url才会减一
		while self.max_videos:
			if self._unti_ban['download_delay']:
				#通过设置延迟时间来防BAN
				if self._unti_ban['randomize_download_delay']:
					#可以设置是否随机获取延迟时间，如果是的话，则根据最大延迟时间来获取随机值
					sleep_time = random.randrange(0, self._unti_ban['download_delay'])
				else:
					sleep_time = self._unti_ban('download_delay')
				print "    Sleep: %s seconds" %(float(sleep_time)/1000)
				time.sleep(float(sleep_time)/1000)
			while True:
				#这里生成多线程来请求数据并处理，其生成速度会收到download_delay的影响。
				time.sleep(0.1)
				if self._current_thread_count < self._thread_max:
					#获取新的url
					if flag:
						url = self._pop_url_from_redis()
					else:
						flag = True
					if not url: 
						print "    the redis set is empty, please wait a moment"
						break
					thread.start_new_thread(self.thread_proc, (time.ctime(),url))
					self._current_thread_count += 1
					print "Thead: New ---- (%s alived) with url: %s" %(self._current_thread_count, url)
					break
		print "crawl done"

















