#!/usr/bin/env python
#-*- coding: utf-8 -*-

'''
Author: @wh1100717
Repository: https://github.com/wh1100717/tv.sohu_spider
Version: 0.0.1

做到最大可能的页面覆盖率 Done
选择重要的信息进行存储 Done
选择合适的数据存储方式，便于后续使用 Done
可通过参数限制要抓取视频信息的数目 Done
要用多线程方式完成抓取 Done
反防抓取策略 Done
*分布式支持 Done
*崩溃后进度恢复 Done
简单的文档 Done
前端展示Server框架 Done
Supervisor配置 Done

数据导出API TODO
数据展示 TODO
Test with Nose  TODO
错误处理 Done
'''

import argparse
import sys
import os
reload(sys)
sys.setdefaultencoding('utf-8')

def main(config):
	#加载爬虫库并执行
	import spider
	s = spider.Spider()
	s.start(config)

if __name__ == '__main__':
	#通过argParse进行命令行配置
	parser = argparse.ArgumentParser(description='tv.sohu Spider')
	#max_videos表示最多抓取的视频信息数量
	parser.add_argument('-m', type=int, dest="max_videos", help="config the max video count, 100 Default")
	#max_threads表示最多同时运行的线程数
	parser.add_argument('-t', type=int, dest="max_threads", help="config the max thread count, Default to read THREAD_MAX from config")

	args = parser.parse_args()
	config = {}
	config['max_videos'] = 100 if not args.max_videos else args.max_videos
	config['max_threads'] = None if not args.max_threads else args.max_threads

	#程序入口
	main(config)





	