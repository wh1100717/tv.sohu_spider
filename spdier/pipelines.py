#!/usr/bin/env python
#-*- coding: utf-8 -*-
'''
Author: @wh1100717
Repository: https://github.com/wh1100717/tv.sohu_spider
'''

from util import RedisUtil
from BeautifulSoup import BeautifulSoup
from util.StringUtil import *
import requests
import json
import sys
reload(sys)
sys.setdefaultencoding('utf-8')


class Pipelines:

	def __init__(self, html):
		self.html = html

	def process(self):
		'''
		 * 进行html的处理，预留接口，可以做成流水线处理的模式，可以将具体的数据分析进行拆解来充分解耦
		'''
		data = self.get_content()
		return data

	def get_content(self):
		'''
		 * 获取详细页面中的信息
		'''
		soup = BeautifulSoup(self.html)
		data = {}

		try:
			str_config = soup.findAll('script')[3].contents[0]
			data['vid'] = get_config_value(str_config, 'vid')
			data['nid'] = get_config_value(str_config, 'nid')
			data['pid'] = get_config_value(str_config, 'pid')
			data['cover'] = get_config_value(str_config, 'cover')
			data['playlistId'] = get_config_value(str_config, 'playlistId')
			data['cid'] = get_config_value(str_config, 'cid')
			data['subcid'] = get_config_value(str_config, 'subcid')
			data['osubcid'] = get_config_value(str_config, 'osubcid')
			data['category'] = get_config_value(str_config, 'category')
			data['cateCode'] = get_config_value(str_config, 'cateCode')
			data['pianhua'] = get_config_value(str_config, 'pianhua')
			data['tag'] = get_config_value(str_config, 'tag')
			data['tvid'] = get_config_value(str_config, 'tvid')
			data['playerSpaceId'] = get_config_value(str_config, 'playerSpaceId')
		except Exception, e:
			print "BeautifulSoup Error: ", Exception, e
			return None

		try:
			#发布时间 | 时长 | 来源 | 简介
			# str_cfix = soup.find('div', {'id':'playlist'})
			# info = str_cfix
			# data['publishTime'] = str_cfix.findAll('li')[0].contents[0][3:-1].strip()
			# data['length'] = str_cfix.find('li',{'class':'s h'}).contents[0][3:].strip()
			# data['from'] = str_cfix.find('li',{'class':'h'}).contents[0][3:].strip()
			# data['intro'] = str_cfix.find('p',{'class':'intro'}).contents[0].strip()
			
			#标题
			data['title'] = soup.title.contents[0]			

			data['intro'] = soup.find('p', {'class':'intro'}).contents[0].strip()
			info = soup.find('ul', {'class':'u cfix'})

			info_list = info.findAll('li')
			for i in info_list:
				information = i.contents[0].strip()
				index = information.find('：')
				key = information[:index].strip()
				val = information[index+1:].strip()
				data[key] = val
		except Exception, e:
			raise e

		try:
			count_url = "http://count.vrs.sohu.com/count/stat.do?videoId=" + str(data['vid']) + \
			"&tvid=" + str(data['tvid']) + \
			"&playlistId=" + str(data['playlistId']) + \
			"&categoryId=" + str(data['subcid']) + \
			"&catecode=" + str(data['cateCode']) + \
			"&plat=flash&os=MacOS10.9.2&online=0&type=vms&t=1399992400861.4104111"

			#播放量
			# url = "http://count.vrs.sohu.com/count/stat.do?videoId=1766750&tvid=1265734&playlistId=5696708&categoryId=158&catecode=122102&uid=13950525923672874988&plat=flash&os=MacOS10.9.2&online=0&type=vms&r=http%3A//tv.sohu.com/20140513/n399512567.shtml&t=1399993714380.2917"
			res  = requests.get(count_url)
			str_count = res.text
			data['count'] = str_count[str_count.find("=")+1:]			
		except Exception, e:
			raise e

		try:
			#顶踩数
			#这个真心无力吐槽......
			status_url = "http://score.my.tv.sohu.com/digg/get.do?vid=" + str(data['vid']) + \
			"&type=" + str(data['cid']) + "&callback=omg&_=1399997399119"
			res = requests.get(status_url)
			str_status = res.text
			str_status = str_status[str_status.find("{"):str_status.rfind("}") + 1]
			status = json.loads(str_status)
			data['upCount'] = status['upCount']
			data['downCount'] = status['downCount']

		except Exception, e:
			raise e

		try:
			#评论
			reply_url = "http://access.tv.sohu.com/reply/list/" + \
				data['subcid'] + "_" +\
				data['playlistId'] + "_" +\
				data['vid'] + "_0_10.js"
			# url = "http://access.tv.sohu.com/reply/list/176_5696708_1766750_0_10.js"
			res = requests.get(reply_url)
			str_reply = res.text
			str_reply = str_reply[str_reply.find("{"):str_reply.rfind("}") + 1]
			data['reply'] = json.loads(str_reply)
		except Exception, e:
			print e

		try:
			#视频地址
			# 卡在获取来的http://123.126.104.14/sohu/6/|378|111.195.91.56|tDqYtJamfn2Ruijbm6pvdanVsMQtqOTFIIek7g..|1|0|2|4002|1根据何种规则进行替换这里。
			vrs_flash_url = "http://hot.vrs.sohu.com/vrs_flash.action?vid=" + data['vid']
			res = requests.get(vrs_flash_url)
			vrs_flash = json.loads(res.text)
			danteng_url = "http://%s/?prot=2&t=0.123123&file=%s&new=%s" %(vrs_flash['allot'], vrs_flash['data']['clipsURL'][0][23:], vrs_flash['data']['su'][0])

			res = requests.get(danteng_url)
			str_danteng = res.text
			first_dash = str_danteng.find('|')
			second_dash = str_danteng.find('|', first_dash + 1)
			third_dash = str_danteng.find('|', second_dash + 1)
			str_danteng = str_danteng[:first_dash] + vrs_flash['data']['su'][0] + "?key=" + str_danteng[third_dash+1:]
			data['video_url'] = str_danteng[:str_danteng.find('|')]			
		except Exception, e:
			raise e

		#http://123.126.104.14/sohu/6/|378|111.195.91.56|tDqYtJamfn2Ruijbm6pvdanVsMQtqOTFIIek7g..|1|0|2|4002|1
		#http://123.126.104.13/sohu/6/|378|111.195.91.56|ozPcB-FsCnlS9fEkepVYVVF277aTXbxQVh012g..|1|0|2|4002|1
		#http://61.135.176.247/sohu/1/|172|111.195.91.56|jfxw6EyNPjTZgnv67JhKYC3v9rhAE4-D6lrQ0X4703c.|1|0|2|4002|1
		#http://61.135.176.238/sohu/vod/MTAvMjM0LzYxL0xCajU5dnl3dm1NOXVJaE5Dbmowci5tcDQ9B.mp4?key=auVH5kPuW7oN9MB_TvB9nmEUjG4cCyRd9rJTaB4-pDU.&r=aHR0cDovL2RhdGEudm8yFzS6MZcxtxefujo2HpmTNLIxnpibmC&n=2&a=4002&cip=111.195.91.56&prod=ad

		# # 换个思路，从m.tv.sohu.com获取实际文件下载地址
		# # tv.sohu.com和m.tv.sohu.com对应的不是同一视频...不能这样直接转换
		# # http://tv.sohu.com/20140513/n399512567.shtml -> http://m.tv.sohu.com/20140513/n399512567.shtml
		# m_url = self.url[:7] + 'm.' + self.url[7:]
		# print m_url

		# #http://api.tv.sohu.com/v4/album/videos/1010790.json?api_key=695fe827ffeb7d74260a813025970bd5&page_size=6&plat=17&sver=4.0&partner=78&callback=videoPageListCallback&vid=621884&site=1
		# video_url = ""


		# for i in data:
		# 	print i," : ",data[i]

		return data
		# res  = requests.get(url)
		# print res.text

			# soup_res = soup.findAll(True, {'href': re.compile(self._target['grab_url_reg'])})
		# print data['title']
		# print data['type']
		# print data['up']

# url = "http://tv.sohu.com/20140514/n399532703.shtml"
# res = requests.get(url)
# res.encoding = 'gbk'
# pipe = Pipelines(res.text)
# print pipe.process()
