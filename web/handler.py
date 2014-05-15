#!/usr/bin/env python
# -*- coding: utf-8 -*-
'''
Author: @wh1100717
Repository: https://github.com/wh1100717/tv.sohu_spider
'''

import tornado.web
from base import *
# from controller import BaseController

handlers = []

# handlers += BaseController.handlers

handlers += [(r"^/(.*)$", BaseHandler)]
