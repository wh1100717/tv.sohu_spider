#!/usr/bin/env python
# -*- coding: utf-8 -*-

def is_resource_url(url):
	if '?' in url: url = url[:url.find('?')]
	return False if url.rfind('.') == -1 or url[url.find('.')+1:] not in 'jscsspngjpggifswfwavwoff' else True