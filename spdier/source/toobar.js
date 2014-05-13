// toolbar_1066e3.js
/*! Team:2014-03-21 10:27:36 AM */
!
function(i) {
    var a = function(i) {
        sohuHD.closeWin();
        var n = a.box;
        n || (n = a.box = new sohuHD.showWin({
            htmlStr: ["", '<div class="wBox wBoxA">', '<div class="wBox-wrap">', '<div class="cfix"><a href="#" class="close ico-close r"></a></div>', '<div class="wBox-con cfix">', '<span class="ico-ok l"></span>', '<div class="txt l">', '<span class="wBox-msg"></span>', '<div><input type="submit" class="close btn-2" value="\u786e \u5b9a"></div>', "</div>", "</div>", "</div>", "</div>"].join(""),
            noMask: !0,
            autohide: !0,
            hidetime: 3e3
        }), n.initWin()),
        n.winbox.find(".wBox-msg").html(i),
        n.show()
    };
    i.dialog = a
} (sohuHD),
function(i, a, n) {
    function t() {
        kao.i("updown", "plugin",
        function() {
            var a = this.UpDown,
            t = c.find(".vBox-ding"),
            s = c.find(".vBox-cai"),
            o = n.formatCount,
            e = function(i) {
                i.find("u").animate({
                    top: -5
                },
                "normal").delay(1e3).fadeOut(function() {
                    i.find("i").css("visibility", "visible"),
                    i.find("span").hide()
                })
            },
            l = new a({
                vid: "null" == i.vid ? "-1": i.vid,
                cid: i.cid,
                pid: i.pid || _uid
            });
            l.init(function(i, a) {
                var n = !1;
                t.find("i").html(o(i)),
                t.bind("click",
                function(i) {
                    return n ? !1 : (n = !0, l.up(function(i) {
                        t.html('<div class="vbtn vbtn-dis"><u>+1</u><em><i>' + o(i) + "</i><span>\u9876</span></em></div>"),
                        s.html('<div class="vbtn"><u>+1</u><em><i>' + o(a) + "</i><span>\u8e29</span></em></div>"),
                        e(t)
                    }), i.preventDefault(), void 0)
                }),
                s.find("i").html(o(a)),
                s.bind("click",
                function(a) {
                    return n ? !1 : (n = !0, l.down(function(a) {
                        t.html('<div class="vbtn"><u>+1</u><em><i>' + o(i) + "</i><span>\u9876</span></em></div>"),
                        s.html('<div class="vbtn vbtn-dis"><u>+1</u><em><i>' + o(a) + "</i><span>\u8e29</span></em></div>"),
                        e(s)
                    }), a.preventDefault(), void 0)
                })
            })
        })
    }
    function s() {
        i.kao("forward_v2",
        function() {
            var i = {
                items: [{
                    title: "QQ\u7a7a\u95f4",
                    img: "qq-zone1.gif",
                    bigimg: "qzone-26.gif",
                    arg: "qq",
                    def: !0,
                    header: !0
                },
                {
                    title: "\u65b0\u6d6a\u5fae\u535a",
                    img: "sina-1.gif",
                    bigimg: "sina-26.gif",
                    arg: "weibosina",
                    header: !0
                },
                {
                    title: "\u4eba\u4eba\u7f51",
                    img: "renren-1.gif",
                    bigimg: "renren-26.gif",
                    arg: "renren",
                    header: !0
                },
                {
                    title: "QQ",
                    img: "qq.png",
                    bigimg: "qq-26.gif",
                    arg: "mqq",
                    header: !0
                },
                {
                    title: "\u641c\u72d0\u89c6\u9891\u7a7a\u95f4",
                    img: "sohu-16.gif",
                    arg: "tvspace"
                },
                {
                    title: "\u641c\u72d0\u5fae\u535a",
                    img: "tsohu.png",
                    arg: "weibosohu"
                },
                {
                    title: "\u817e\u8baf\u5fae\u535a",
                    img: "tencent.gif",
                    arg: "tqq"
                },
                {
                    title: "\u5929\u7ffc\u624b\u673a",
                    img: "tianyi.gif",
                    arg: "tianyi"
                },
                {
                    title: "\u5f00\u5fc3\u7f51",
                    img: "kaixin.gif",
                    arg: "kaixin001"
                },
                {
                    title: "\u817e\u8baf\u670b\u53cb",
                    img: "pengyou.gif",
                    arg: "txpengyou"
                },
                {
                    title: "\u7f51\u6613\u5fae\u535a",
                    img: "163.gif",
                    arg: "163"
                },
                {
                    title: "i\u8d34\u5427",
                    img: "tieba.gif",
                    arg: "itb"
                },
                {
                    title: "\u8c46\u74e3",
                    img: "douban.png",
                    arg: "douban"
                },
                {
                    title: "\u98de\u4fe1\u7a7a\u95f4",
                    img: "fetion.png",
                    arg: "fx"
                },
                {
                    title: "\u5929\u6daf",
                    img: "tianya.gif",
                    arg: "ty"
                }]
            };
            n.Forward(i).init()
        })
    }
    function o() {
        c.find(".vBox-fav .vbtn").click(function(i) {
            i.preventDefault(),
            messagebus.publish("player.do_bookmark")
        })
    }
    function e() {
        var t = d.player,
        s = c.find(".vBox-play"),
        o = function() {
            var i = o.content;
            return i || (i = o.content = a(["", '<div class="vBoxVis-play">', '<iframe width="639" scrolling="no" height="513" frameborder="0" src="http://index.tv.sohu.com/index/switch-aidmini/', playlistId, '.html" border="0" class="clear" allowTransparency="true"  style="background-color:#F1F1F1"></iframe>', '<a  class="img" href="http://index.tv.sohu.com/" target="_blank"><img src="http://css.tv.itc.cn/channel/play_images/idx_desc.jpg" alt=""></a>', "</div>"].join("")), i.insertAfter(c)),
            i
        };
        if (["1", "2", "6", "7", "8", "16", "24"].indexOf(cid) > -1 && "undefined" != typeof pianhua && "0" == pianhua || "8" == cid ? (p = function() {
            s.removeClass("vBoxVis"),
            o().hide()
        },
        s.bind("click",
        function() {
            return s.hasClass("vBoxVis") ? (s.removeClass("vBoxVis"), o().hide()) : (s.addClass("vBoxVis"), o().show(), r()),
            !1
        })) : s.html('<span class="vbtn vbtn-play vbtn-dis"><em><i>&nbsp;</i></em></span>'), "9001" != cid) {
            var e = null,
            l = function() {
                var i = t.getPlayCount();
                i && "wait" !== i && (clearInterval(e), i = new Function(i + ";return count")(), s.find("i").html(n.formatCount(i)))
            };
            e = setInterval(l, 3e3),
            l()
        } else {
            var v, u = "_stat" + n.random();
            v = _videoInfo.videoType && "9001" != _videoInfo.videoType ? ["http://count.vrs.sohu.com/count/query.action?videoId=", vid, "&jsonp=", u, "&type=2"].join("") : ["http://vstat.my.tv.sohu.com/dostat.do?method=getVideoPlayCount&v=", vid, "&n=", u].join(""),
            n.getScript(v,
            function() {
                var a;
                a = _videoInfo.videoType && "9001" != _videoInfo.videoType ? i[u].videos[0] : i[u][0],
                s.find("i").html(n.formatCount(a.count))
            })
        }
    }
    function l() {
        a("#phone-download").on("click", ".vbtn-xiaPhone",
        function(i) {
            a("#phone-download").toggleClass("vBoxVis"),
            i.preventDefault()
        })
    }
    var d = {},
    c = a("#playtoolbar"),
    v = ["", '<div class="vBox vBox-ding"><a href="#" class="vbtn"><em><i>0</i><span>\u9876</span></em></a></div>', '<div class="vBox vBox-cai"><a href="#" class="vbtn"><em><i>0</i><span>\u8e29</span></em></a></div>', '<div id="shareBox" class="vBox vBox-fa"></div>', '<div class="vBox vBox-fav"><a href="http://my.tv.sohu.com/user/bookmark/list.do" target="_blank" class="vbtn"><em>\u6536\u85cf</em></a></div>', '<div class="vBox vBox-warn">', '<a href="" class="vbtn"><em>\u66f4\u65b0\u63d0\u9192</em></a>', '<div class="vCont">', '<p class="f-song">\u70b9\u51fb\u201c\u66f4\u65b0\u63d0\u9192\u201d\u89c6\u9891\u6709\u66f4\u65b0\u4f1a\u7b2c\u4e00\u65f6\u95f4\u63d0\u9192\u6211</p> <p class="ta-r"><a href="#">\u77e5\u9053\u4e86</a></p>', "</div>", "</div>", '<div class="vBox vBox-xia" id="j-download"><a href="#" class="vbtn"><em>\u4e0b\u8f7d\u5230\u7535\u8111</em></a></div>', '<div class="vBox vBox-xiaPhone" id="phone-download">', '<a href="" class="vbtn vbtn-xiaPhone"><em><span>\u4e0b\u8f7d\u5230\u624b\u673a</span></em></a>', '<div class="vCont">', '<p class="p0"><a href="http://tv.sohu.com/sohuapp/" target="_blank">\u5b89\u88c5\u641c\u72d0\u89c6\u9891APP\uff0c\u5c06\u89c6\u9891\u4e0b\u8f7d\u5230\u624b\u673a\uff0c\u968f\u8eab\u66f4\u65b9\u4fbf</a></p>', '<p class="p1"><a href="http://tv.sohu.com/sohuapp/" target="_blank"><img width="100" height="100" src="http://css.tv.itc.cn/channel/play_images/phonetv.png" alt="\u4e8c\u7ef4\u7801"></a></p>', '<p class="p2"><a href="http://tv.sohu.com/sohuapp/" target="_blank">\u626b\u63cf\u4e8c\u7ef4\u7801\uff0c\u9a6c\u4e0a\u5b89\u88c5</a></p>', '<p class="p3"><a class="erwm_btn" target="_blank" href="http://tv.sohu.com/sohuapp/">\u66f4\u591a\u673a\u578b\uff0c\u66f4\u591a\u4e0b\u8f7d\u65b9\u5f0f</a></p>', "</div>", "</div>", '<div class="vBox vBox-desktop" style="display:none;"><a href="#" class="vbtn"><em>\u653e\u5230\u684c\u9762</em></a></div>', '<div class="vBox vBox-play"><a href="#" class="vbtn vbtn-play"><em><i>&nbsp;</i></em></a></div>'].join(""),
    r = (n.dialog,
    function() {}),
    p = function() {};
    n.initPlayToolbar = function(r, p) {
        a.extend(d, p),
        c = a(r),
        c.html(v),
        t(),
        s(),
        o(),
        e(),
        l(),
        messagebus.subscribe("video.candownload",
        function() {
            a("#j-download").show().bind("click",
            function(i) {
                messagebus.publish("ifox.showdetail"),
                i.preventDefault()
            })
        },
        null, null, {
            cache: !0
        }),
        messagebus.subscribe("core.ifox_ready",
        function() {
            var i = n.ifox,
            a = [vid, playlistId, cid, "9001" == cid ? _uid: pid].join("_"),
            t = function() {
                var i = t.box;
                i || (i = t.box = new n.showWin({
                    htmlStr: ["", '<div class="wBox wBox-xia">', '<div class="wBox-wrap">', '<div class="cfix"><a href="#" class="close ico-close r"></a></div>', '<div class="wBox-con">', '<h6 class="mB15">\u68c0\u6d4b\u5230\u60a8\u76ee\u524d\u8fd8\u672b\u5b89\u88c5\u641c\u72d0\u5f71\u97f3\u5ba2\u6237\u7aef\uff0c\u8bf7\u5148\u4e0b\u8f7d\u5b89\u88c5</h6>', '<a href="http://p2p.hd.sohu.com/dcs.do?f=1&s=1018&videoinfo=', a, '" target="_blank" class="btn-xia">\u7acb\u5373\u4e0b\u8f7d</a>', "</div>", "</div>", "</div>"].join(""),
                    noMask: !0
                }), i.initWin(), i.winbox.delegate(".btn-xia", "click",
                function() {
                    i.closeWin()
                })),
                i.show()
            };
            messagebus.subscribe("ifox.showdetail",
            function() {
                i && i.isInstalled() ? (p.player.pauseVideo(), "9001" == cid ? i.showDetailPage(vid, playlistId, cid, _uid) : i.showDetailPage(vid, playlistId, cid, pid)) : t()
            }),
            function() {
                var a = c.find(".vBox-desktop"),
                t = function() {
                    return "2" === cid && /win/i.test(navigator.userAgent)
                };
                if (t() !== !1 && 0 !== a.size()) {
                    if (i.isInstalled()) {
                        var s = i.isShortcutCreated(playlistId);
                        if ("Exist" === s || "Nonsupport" === s) return a.hide(),
                        void 0
                    }
                    var o = null;
                    a.show().bind("click",
                    function(t) {
                        if (n.pingback("http://click.hd.sohu.com.cn/s.gif?type=pg_playdesktop_" + cid + "&expand5=" + playlistId), i.isInstalled()) {
                            var s = document.title || "";
                            i.createShortcut(vid, pid, cid, playlistId, s),
                            a.hide(),
                            n.pingback("http://click.hd.sohu.com.cn/ifox.gif?type=PUT_DESKTOP&stype=5&v=" + i.getVersion(!0) + "&uid=" + i.getUserId() + "&ChannelID=" + i.getChannelNum() + "&r=" + (new Date).getTime()),
                            n.showWin({
                                htmlStr: ['<div class="popbox box2" style="width:290px;">', '<div class="pop-png">', '<div class="inner">', '<div class="pop-hd clear"><a href="#" class="btn_close close">\u5173\u95ed</a></div>', '<div class="pop-bd clear">', "<span></span>", "<div>", "<p>\u8bbe\u7f6e\u6210\u529f</p>", "\u60a8\u7684\u684c\u9762\u4e0a\u5df2\u7ecf\u751f\u6210\u8be5\u5267\u7684\u5feb\u6377\u65b9\u5f0f\uff0c\u53cc\u51fb\u5373\u53ef\u5feb\u901f\u89c2\u770b", "</div>", "</div>", "</div>", "</div>", "</div>"].join(""),
                                autohide: !0,
                                hidetime: 3e3,
                                noMask: !0
                            })
                        } else n.closeWin(),
                        null === o && (o = new n.showWin({
                            htmlStr: ['<div class="popbox box1" style="width:506px;">', '<div class="pop-png">', '<div class="inner">', '<div class="pop-hd clear"><a href="#" class="btn_close close">\u5173\u95ed</a></div>', '<div class="pop-bd clear">', "<p>\u9996\u6b21\u5b89\u88c5\u767b\u9646\u8d60\u9001VIP\u4f1a\u5458</p>", '<div class="steps clear">', '<p class="bg-gray"><span>\u7b2c\u4e00\u6b65\uff1a</span>\u4e0b\u8f7d\u6700\u65b0\u7248\u641c\u72d0\u5f71\u97f3</p>', '<i></i><p class="bg-gray"><span>\u7b2c\u4e8c\u6b65\uff1a</span>\u70b9\u51fb\u201c\u653e\u5230\u684c\u9762\u201d\u6309\u94ae</p>', "</div>", '<p class="gifs"><a class="gotoDownloadIfox" href="http://p2p.hd.sohu.com/dcs.do?f=1&s=1036" title="\u7acb\u5373\u4e0b\u8f7d" target="_blank">\u7acb\u5373\u4e0b\u8f7d</a></p>', "</div>", "</div>", "</div>", "</div>"].join(""),
                            noMask: !0
                        }), o.initWin(), o.winbox.find(".gotoDownloadIfox").one("click",
                        function() {
                            o.closeWin()
                        })),
                        o.show();
                        t.preventDefault()
                    })
                }
            } ()
        },
        null, null, {
            cache: !0
        }),
        i.mbusPlay && mbusPlay.subscribe("play.playlistloaded",
        function() {
            var a = function() {
                var a = i.cid;
                return 2 == a || 16 == a || 7 == a || 8 == a || 9001 == a
            }; ! n.play.isEnd && a() && (c.find(".vBox-warn").attr("data-plid", playlistId).show(), kao("rss",
            function() {
                n.rss.run("psub")
            }))
        },
        null, null, {
            cache: !0
        }),
        messagebus.subscribe("play.bigbang.magic",
        function() {
            if ("5690721" == playlistId) {
                var i = a("#listBox .list-tv .on a").html(),
                n = i.length;
                i = i.substring(0, n - 1),
                i = parseInt(i),
                9 >= i && a("#playtoolbar .vBox-play").before('<div style="" class="vBox vBox-magic"><a class="vbtn" target="_blank" href="http://tv.sohu.com/s2013/bigbang-mofun/?index=' + i + '"><em>\u770b\u900f\u7f8e\u5267</em></a></div>')
            }
        },
        null, null, {
            cache: !0
        })
    }
} (window, jQuery, sohuHD),
function(i) {
    var a = !1,
    n = !1;
    i.getFaved = function() {
        return n ? 1 : 0
    },
    messagebus.subscribe("player.do_bookmark",
    function(i, t) {
        if (!a && !n) {
            if (t = t || {},
            "string" == typeof t) try {
                t = $.parseJSON(t)
            } catch(s) {
                t = {}
            }
            var o = {
                vid: t.vid || window.vid || "",
                cid: t.cid || window.cid || "",
                pid: t.plid || window.playlistId || /\/(\d{1,})\//.exec(location.href)[1] || "",
                url: encodeURIComponent(location.href),
                title: escape(document.title.split("-")[0].replace(/\u300a|\u300b/g, ""))
            };
            t.callback = t.callback ||
            function() {},
            sohuHD.showLoginWinbox(function() {
                var i = ["http://my.tv.sohu.com/user/a/bookmark/save_update.do?callback=?", "&vid=", o.vid, "&url=", o.url, "&title=", o.title, "&type=", o.cid, "&pid=", o.pid].join("");
                a = !0,
                sohuHD.getJSONP(i,
                function(i) {
                    a = !1,
                    n = !0;
                    var s = "\u8bf7\u4e0d\u8981\u91cd\u590d\u6536\u85cf\uff01";
                    i && 1 == i.status && (s = "\u6536\u85cf\u6210\u529f\uff01"),
                    sohuHD.dialog('<strong class="fs14">' + s + '</strong><p class="p1">\u53bb <a href="http://my.tv.sohu.com/user/bookmark/list.do" target="_blank" class="mLR6">\u6211\u7684\u6536\u85cf</a> \u770b\u770b</p>'),
                    $("#playtoolbar").find(".vBox-fav .vbtn").addClass("vbtn-dis");
                    try {
                        document.getElementById("player").collectionComplete(1)
                    } catch(o) {}
                    t.callback && t.callback()
                })
            })
        }
    })
} (sohuHD);