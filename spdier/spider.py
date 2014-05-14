#!/usr/bin/env python
# -*- coding: utf-8 -*-

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
import config
import re
import time
import random
import thread


'''
TODO:
	1. 	多线程 Done
	2. 	代理池 Done
	3. 	存储数据
	4. 	分布式部署
	5. 	崩溃后进行恢复
	6. 	数据导出API
	7. 	数据展示
	8. 	nose
	9. 	错误处理
'''

class Spider:

	def __init__(self):
		self._redis = RedisUtil.RedisClient()
		self._unti_ban = config.UNTI_BAN
		self._target = config.TARGET
		self._request = config.REQUEST
		self._thread_max = config.THREAD_MAX
		self._current_thread_count = 0

	def _get_html(self, url):
		url = StringUtil.process_url(url)
		res = requests.get(url)
		user_agent = {'User-agent': 'Mozilla/5.0'}
		headers = {
			#动态更改userAgent
			'User-Agent': AgentPoolUtil.getRandomUserAgent()
		}
		proxies = {
			#动态更改代理,https的tv.sohu.com用不上
			# 'http': AgentPoolUtil.getRandomProxy(),
		}
		response  = requests.get(url, headers = headers, proxies=proxies)
		res.encoding = self._request['encoding']
		return res.text

	def _process_html(self, html):
		#获取urls
		urls = set()
		soup = BeautifulSoup(html)
		soup_res = soup.findAll(True, {'href': re.compile(self._target['grab_url_reg'])})
		for res in soup_res:
			url = res['href']
			#如果是资源文件，则丢弃
			if StringUtil.is_resource_url(url): continue
			urls.add(url)
		#redis操作
		for url in urls:
			self._redis.sset('url_set', url)
		print "finish push %s urls in `url_set` of redis" %len(urls)

	def _pop_url_from_redis(self):
		return self._redis.spop('url_set')

	def _is_view_detail_page(self, url):
		return True if re.match(self._target['view_detail_page_reg'], url) else False

	
	def _pipelines(self, html):
		pass

	def _clear_redis(self):
		#测试用，清空表数据
		self._redis.delete('url_set')

	def thread_proc(self, threadName, url):
		#TODO 增加try catch， 保证thread一定退出，以及_current_thread_count一定执行正确

		#获取url所对应的页面内容
		html = self._get_html(url)
		#判断url是否是视频详细页
		#如果是，则进一步处理，获取具体信息；如果不是，则仅获取网页中的url
		if self._is_view_detail_page(url):
			self._pipelines(url, html)
		self._process_html(html)
		self._current_thread_count -= 1
		print "%s Thread exit" %threadName
		thread.exit_thread()



	def start(self,config):
		print "start"
		if config['max_threads']:
			self._thread_max = config['max_threads']
		url = self._target['host']
		max_videos = config['max_videos']
		#清空表数据(测试用，实际上不需要)
		self._clear_redis()
		flag = False
		while max_videos:
			if self._unti_ban['download_delay']:
				#通过设置延迟时间来防BAN
				if self._unti_ban['randomize_download_delay']:
					sleep_time = random.randrange(0, self._unti_ban['download_delay'])
				else:
					sleep_time = self._unti_ban('download_delay')
				print "Sleep %s seconds" %(float(sleep_time)/1000)
				time.sleep(float(sleep_time)/1000)
			while True:
				time.sleep(0.1)
				if self._current_thread_count < self._thread_max:
					#获取新的url
					if flag:
						url = self._pop_url_from_redis()
					else:
						flag = True
					if not url: 
						print "the redis set is empty, please wait a moment"
						break
					thread.start_new_thread(self.thread_proc, (time.ctime(),url))
					self._current_thread_count += 1
					max_videos -= 1
					print "new thread(%s alived) with url: %s" %(self._current_thread_count, url)
					break
		print "crawl done"

















