#!/usr/bin/env python
# -*- coding: utf-8 -*- 
'''
Author: @wh1100717
Repository: https://github.com/wh1100717/tv.sohu_spider
'''
import sys

import Queue
import threading
from sh import tail
from twisted.internet import reactor
from twisted.python import log

from autobahn.twisted.websocket import WebSocketServerFactory, \
                                       WebSocketServerProtocol, \
                                       listenWS

logQueue = Queue.Queue(maxsize = 100)
signal_terminate = False

def set_exit_handler(func):
    import signal
    signal.signal(signal.SIGINT, func)
    signal.signal(signal.SIGTERM, func)
#    signal.signal(signal.SIGKILL, func)

def on_exit(sig, func=None):
    print "******exit handler triggered******"
    global signal_terminate
    signal_terminate = True

class ReadLogThread(threading.Thread):
    
    def __init__(self, log_path):
        threading.Thread.__init__(self)
        self.log_path = log_path
    
    def run(self):
        for line in tail("-f", self.log_path, _iter=True):
            if signal_terminate: break
            print line
            logQueue.put(line)

class BroadcastServerProtocol(WebSocketServerProtocol):

    def onOpen(self):
        self.factory.register(self)

    def onMessage(self, payload, isBinary):
        if not isBinary: self.factory.broadcast(payload.decode('utf8'))

    def connectionLost(self, reason):
        WebSocketServerProtocol.connectionLost(self, reason)
        self.factory.unregister(self)


class BroadcastServerFactory(WebSocketServerFactory):

    def __init__(self, url, debug = False, debugCodePaths = False):
        WebSocketServerFactory.__init__(self, url, debug = debug, debugCodePaths = debugCodePaths)
        self.clients = []
        self.sendLog()

    def sendLog(self):
        if signal_terminate: reactor.stop()
        str = ""
        while not logQueue.empty():
           str += logQueue.get()
        if str != "":
            self.broadcast(str.encode('utf8'))
        reactor.callLater(1, self.sendLog)

    def register(self, client):
        if not client in self.clients:
            print("registered client {0}".format(client.peer))
            self.clients.append(client)

    def unregister(self, client):
        if client in self.clients:
            print("unregistered client {0}".format(client.peer))
            self.clients.remove(client)

    def broadcast(self, msg):
        print("broadcasting message '{0}' ..".format(msg))
        for c in self.clients:
            c.sendMessage(msg.encode('utf8'))
            print("message sent to {0}".format(c.peer))

if __name__ == '__main__':
    '''
    argv[1]为日志绝对路径 必填项
    argv[2]为服务器端口号 默认未9003
    网页日志服务器启动方式如下：
        python log-server.py /home/abc/project/someProject/src/tmp/log/std.log 9002 
    '''
    if len(sys.argv) <= 1:
        print "***Error: Need log_path, i.e. '$python server.py /var/sys.log'***"
        sys.exit(1)
    elif len(sys.argv) <= 2:
        print "***No port input, 9003 as default***"
        log_path = sys.argv[1]
        port = '9003'
    else:
        log_path = sys.argv[1]
        port = sys.argv[2]
        print "***Server start! using port %s***" %port
    print "***Make sure you have modified log.html as the right ip address and port***"
    log.startLogging(sys.stdout)
    debug = True #u can switch the debug module by True of False
    ServerFactory = BroadcastServerFactory
    factory = ServerFactory("ws://localhost:" + port,
                            debug = debug,
                            debugCodePaths = debug)
    factory.protocol = BroadcastServerProtocol
    factory.setProtocolOptions(allowHixie76 = True)
    listenWS(factory)
    set_exit_handler(on_exit)
    log_thread = ReadLogThread(log_path)
    log_thread.setDaemon(True)
    log_thread.start()
    reactor.run()
