#!/usr/bin/env python
#-*- coding: utf-8 -*-

'''
Author: @wh1100717
Repository: https://github.com/wh1100717/tv.sohu_spider
Version: 0.0.1

做到最大可能的页面覆盖率
选择重要的信息进行存储
选择合适的数据存储方式，便于后续使用
可通过参数限制要抓取视频信息的数目
要用多线程方式完成抓取
反防抓取策略
*分布式支持
*崩溃后进度恢复

'''

import argparse
import sys
import os
reload(sys)
sys.setdefaultencoding('utf-8')

def main(config):
	import spider
	s = spider.Spider()
	s.start(config)

if __name__ == '__main__':
	parser = argparse.ArgumentParser(description='tv.sohu Spider')
	parser.add_argument('-m', type=int, dest="max_videos", help="config the max video count, 100 Default")
	args = parser.parse_args()
	config = {}
	config['max_videos'] = 100 if not args.max_videos else args.max_videos

	main(config)





	