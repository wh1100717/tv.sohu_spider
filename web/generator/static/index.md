# Installation
  
项目中用到了一些依赖库，所以需要首先安装对应的依赖库

主要用到了一下库:

*	requests==2.2.1
*	BeautifulSoup==3.2.1
*	Mako==0.9.1
*	nose==1.3.0
*	queuelib==1.1.1
*	redis==2.9.1
*	supervisor==3.0
*	tornado==3.2
*	Twisted==12.2.0
*	sh==1.09
*	autobahn==0.8.8

```
pip install -r requirements.txt
```

###启动supervisor

项目通过supervisor来运行项目，supervisor是一个用来统一管理python程序的工具，其配有相应的控制前端页面，并可以实现爬虫结束重爬等功能，利用其可以轻松管理多个spider以及其他python程序。具体的配置文件为 `spider/supervisor.conf`，通过以下命令启动supervisor

	# 首先需要启动redis，具体的启动方式请参看redis文档http://redis.io/documentation
    # 进入 spider 目录下
	supervisord -c supervisor.conf

	# 如果想实现开机自启动可以查看supervisor的文档

接下来可以通过`localhost:9001`来查看具体的爬虫状态，用户名为`admin`，密码为`admin`(可以在supervisor.conf中更改和配置)
可以通过配置supervisor来配置多个爬虫同时进行。另外，supervisor还具备爬虫结束或者意外中断重启功能，可以进行轻松配置及管理。
另外supervisor还管理了一个进程叫做log-server，其主要负责监控log/sohu_spider_err.log文件是否增减新的内容，然后通过websocket的方式传输给链接他的客户端，可以轻松实现通过网页非ajax的方式动态查看Log日志功能。

###启动Log Monitor
two files should be included in your log system -- server.py(which would generate a server watching the log file and broadcast the data to the browser) and log.html(it contains the html and js code which would be included in your website.)
* just step into the directory that contains the server.py and use command `python server.py log_path port`(log_path means the absolute path of the log file which you want to bring to the web; port means the server port you specified.)
* modify the log.html with your own ip address(or hostname) and port and put the code in some page of your website.
* Then, just wath the page in browser and see what will happen!
* If you want to stop the server, just use `ctrl+c` to stop it. NEVER use `ctrl+d`, there is a thread process which will not be killed in this way(well, u can use `ps -ef | grep server.py` to see whch one should be killed and then use `kill -9 process_id`. THAT is NOT recommended!).

Note:已经在supervisor.conf中配置好了。Log Monitor依赖库安装安装成功的话，可以直接启动supervisor使用，不需要额外配置


###启动前端页面

项目中主页是用jade生成的，如果运行则需要node环境。然后进入 `web/generator/` 目录执行：

```
$ npm install
$ make -j4
```

运行主页需要进入 `web` 目录执行：

```
$ sudo python server.py
$ open http://localhost
```

至此，可以关于项目的搭建和运行就介绍完了。
