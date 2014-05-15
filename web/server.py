#!/usr/bin/env python
# -*- coding: utf-8 -*-
import platform
import sys
reload(sys)

if platform.system().lower() == 'windows':
	sys.setdefaultencoding('gbk')
else:
	sys.setdefaultencoding('utf-8')

import tornado.ioloop
import tornado.web
import settings
import handler

application = tornado.web.Application(handler.handlers, **settings.__server_config__)

if __name__ == "__main__":
	application.listen(settings.__server_port__)
	tornado.ioloop.IOLoop.instance().start()
