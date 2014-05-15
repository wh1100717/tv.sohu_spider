#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from mako.lookup import TemplateLookup

#根目录
__root_dir__ = os.path.dirname(__file__)
#模板目录
__template_dir__ = os.path.join(__root_dir__, "templates")
#静态文件目录
__static_dir__ =  os.path.join(__root_dir__, "static")
#黑名单列表
__blacklist_templates__ = ('layouts',)

#服务器端口
__server_port__ = 80

#服务器配置
__server_config__ = {
	"static_path": __static_dir__,
	"cookie_secret": "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=", 
	"xsrf_cookies": False,
	"debug": True,
}

'''
This is a special Mako object, 
[TemplateLookup](http://docs.makotemplates.org/en/latest/usage.html#mako.lookup.TemplateLookup), 
that provides a simple API for secure (rooted) template lookup, retrieval, and encoding, amongst other things.
'''
__template_lookup__ = TemplateLookup(	input_encoding='utf-8',
										output_encoding='utf-8',
										encoding_errors='replace',
										directories=[__template_dir__])

'''
MongoDB在这里配置
'''
__redis_config__ = {
	'host': '127.0.0.1',
	'port': 27017,
	'db': 'emm',
}