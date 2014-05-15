#!/usr/bin/env python
# -*- coding: utf-8 -*-

import tornado.web
from base import *
# from controller import BaseController

handlers = []

# handlers += BaseController.handlers

handlers += [(r"^/(.*)$", BaseHandler)]
