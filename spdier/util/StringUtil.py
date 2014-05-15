#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Author: @wh1100717
Repository: https://github.com/wh1100717/tv.sohu_spider
'''


def is_resource_url(url):
	#判断是否是资源文件
	if '?' in url: url = url[:url.find('?')]
	return False if url.rfind('.') == -1 or url[url.find('.')+1:] not in 'jscsspngjpggifswfwavwoff' else True

def get_config_value(s, var_name):
	#解析<script><script>标签中的内容，根据变量名获取具体的值
	if var_name not in s: return None
	s = s[s.find(var_name):]
	s = s[:s.find(";")]
	return s[s.find("\"")+1:s.rfind("\"")]

def process_url(url):
	#http://tv.sohu.com/20130813/n384034268.shtml
	# ->
	#http://m.tv.sohu.com/20130813/n384034268.shtml
	#可能需要对url进行一些处理，预留出来
	return url
	pass


# str_config = """
#   var vid="1766750";
#   var nid = "399512567";
#   var pid ="314606944";
#   var cover="http://photocdn.sohu.com/20140513/63a9417b-ebae-4cb2-ba76-394ca788882d_1766750_S_b.jpg";  
#   var playlistId="5696708";
#   var o_playlistId="";
#     var cid="25";//一级分类id
#   var subcid="176";//二级分类id
#   var osubcid="";//二级分类的唯一项
#   var category="251366993;314606944;399512567";
#   var cateCode="122102;";
#   var pianhua = "0";
#   var tag = "火车 亚洲女子天团 飙舞 广场舞";
#   var tvid = "1265734";
#   var playerSpaceId = "";
# """
# print get_config_value(str_config, 'tvid')