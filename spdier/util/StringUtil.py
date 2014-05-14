#!/usr/bin/env python
# -*- coding: utf-8 -*-

def is_resource_url(url):
	if '?' in url: url = url[:url.find('?')]
	return False if url.rfind('.') == -1 or url[url.find('.')+1:] not in 'jscsspngjpggifswfwavwoff' else True

def get_config_value(s, var_name):
	if var_name not in s: return None
	s = s[s.find(var_name):]
	s = s[:s.find(";")]
	return s[s.find("\"")+1:s.rfind("\"")]

def process_url(url):
	#http://tv.sohu.com/20130813/n384034268.shtml
	# ->
	#http://m.tv.sohu.com/20130813/n384034268.shtml
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