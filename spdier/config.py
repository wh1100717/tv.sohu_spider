#!/usr/bin/env python
# -*- coding: utf-8 -*-

SPIDER_NAME = 'TvSohuSpider'

#最大线程数
THREAD_MAX = 3

UNTI_BAN = {
	#毫秒 3000毫秒等于3秒
	'download_delay': 2000,
	'randomize_download_delay': True
}

TARGET = {
	'host': 'http://tv.sohu.com/',
	'grab_url_reg': 'tv\.sohu\.com',
	'view_detail_page_reg': '^http\:\/\/tv\.sohu\.com\/\d+\/\w+\.shtml$'
}

REQUEST = {
	"headers": {
		"X-Requested-With" : "XMLHttpRequest"
	},
	"encoding": 'utf-8'
}

