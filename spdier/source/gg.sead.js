//2014-4-14 19:4 ww
typeof window._sohuHD == "undefined" && (window._sohuHD = {}),
_sohuHD.AD = {
    init: function() {
        var e = Array.prototype.slice.call(arguments);
        _sohuHD.AD.ready(function() {
            _sohuHD.AD.init.apply(_sohuHD.AD, e)
        })
    },
    ready: function(e) {
        kao(!1, "http://js.tv.itc.cn/base/core/gg14012201.js",
        function() {
            e && e()
        })
    }
},
function() {
    var e = {
        1 : {
            left: "http://images.sohu.com/ytv/SH/CHANEL/14048020131127030928.jpg",
            right: "http://images.sohu.com/ytv/SH/CHANEL/14048020131127030928.jpg",
            url: "http://inside.chanel.com/zh/marilyn?WT.mc_id=FB_N5MM_13_zh_CN_sohutv_preroll_pc_beijing&WT.mc_t=display"
        },
        2 : {
            left: "http://images.sohu.com/bill/s2012/yule/bailongchen/Chanel/140480LEFT1127.jpg",
            right: "http://images.sohu.com/bill/s2012/yule/bailongchen/Chanel/140480RIGHT1127.jpg",
            url: "http://www.chanel.com/zh_CN/%E9%A6%99%E6%B0%B4-%E5%8C%96%E5%A6%86%E5%93%81/%E9%A6%99%E6%B0%B4-%E5%8F%AF%E5%8F%AF%E5%B0%8F%E5%A7%90%E9%A6%99%E6%B0%B4%E7%B3%BB%E5%88%97-98063?WT.mc_id=FB_CocoM_13_zh_CN_sohu_tv_the_big_bang_ccom_national&WT.mc_t=display"
        },
        3 : {
            left: "http://images.sohu.com/bill/s2012/yule/bailongchen/Chanel/140480LEFT1127.jpg",
            right: "http://images.sohu.com/bill/s2012/yule/bailongchen/Chanel/140480RIGHT1127.jpg",
            url: "http://www.chanel.com/zh_CN/%E9%A6%99%E6%B0%B4-%E5%8C%96%E5%A6%86%E5%93%81/%E9%A6%99%E6%B0%B4-%E8%94%9A%E8%93%9D%E7%94%B7%E5%A3%AB%E6%B7%A1%E9%A6%99%E6%B0%B4%E7%B3%BB%E5%88%97-118663?WT.mc_id=FB_Bleu_13_zh_CN_sohu_tv_the_big_bang_bleu_national&WT.mc_t=display"
        },
        4 : {
            left: "http://images.sohu.com/bill/s2012/yule/new/chanel/0102/Background_140x480_x2_left.jpg",
            right: "http://images.sohu.com/bill/s2012/yule/new/chanel/0102/Background_140x480_x2_right.jpg",
            url: "http://www-cn.chanel.com/zh_CN/%E9%A6%99%E6%B0%B4-%E5%8C%96%E5%A6%86%E5%93%81/%E9%A6%99%E6%B0%B4-%E9%82%82%E9%80%85%E9%A6%99%E6%B0%B4%E7%B3%BB%E5%88%97-98110?WT.mc_id=FB_Chance_14_ZHCN_sohu_pc_beijing_preroll&WT.mc_t=display"
        },
        15 : {
            left: "http://images.sohu.com/bill/s2012/yule/new/chanel/0102/left15.jpg",
            right: "http://images.sohu.com/bill/s2012/yule/new/chanel/0102/right15.jpg",
            url: "http://clk.optaim.com/event.ng/Type=click&FlightID=201401&TargetID=sohu&Values=645a8d5d,86658ddd,aa87f110,ff973279&AdID=9948966"
        },
        20 : {
            left: "http://images.sohu.com/bill/s2012/yule/new/chanel/0102/left20.jpg",
            right: "http://images.sohu.com/bill/s2012/yule/new/chanel/0102/right20.jpg",
            url: "http://clk.optaim.com/event.ng/Type=click&FlightID=201401&TargetID=sohu&Values=6740d7b8,ac687428,04ad5229,3130e040&AdID=3243244"
        },
        30 : {
            left: "http://images.sohu.com/bill/s2012/yule/new/chanel/0102/left30.jpg",
            right: "http://images.sohu.com/bill/s2012/yule/new/chanel/0102/right30.jpg",
            url: "http://clk.optaim.com/event.ng/Type=click&FlightID=201401&TargetID=sohu&Values=9ec7cb70,2e9ffb1b,bd2f055f,762e0c46&AdID=3057907"
        }
    },
    t = "_skyAD_channle",
    n = null,
    r = function(n) {
        _sohuHD.AD.ready(function() {
            var r = Mix,
            i = r.dom.getByClassName("skyAD", r.dom.getById("contentB"));
            i = i || [],
            r.each(i || [],
            function(e) {
                r.css.hide(e)
            });
            var s = r.dom.getById(t);
            s || (s = r.dom.create("div", {
                position: "relative",
                width: "100%",
                height: 0,
                "z-index": 5
            },
            {
                id: t
            }));
            var o, u = !1;
            i.length ? o = i[0] : (o = r.dom.getById("sohuplayer"), u = !0),
            r.dom.before(s, o),
            n = n || "1";
            var a = e["" + n],
            f = a.url,
            l = '<div style="position:absolute;left:-140px;" class="video-couplet video-couplet-left"><div class="content" style="width:140px;height:480px"><a href="' + f + '" target="_blank" style="display:block;width:140px;height:480px;overflow:hidden;">' + '<img src="' + a.left + '" />' + "</a>" + "</div>" + "</div>" + '<div class="content" style="position:absolute;right:-140px;">' + '<div class="content" style="width:140px;height:480px">' + '<a href="' + f + '" target="_blank" style="display:block;width:140px;height:480px;overflow:hidden;">' + '<img src="' + a.right + '" />' + "</a>" + "</div>" + "</div>";
            s.innerHTML = l,
            r.css.show(s),
            messagebus.publish("playerad.hideother")
        })
    },
    i = function() {
        _sohuHD.AD.ready(function() {
            clearTimeout(n);
            var e = Mix,
            r = e.dom.getById(t);
            r && e.css.hide(r);
            var i = e.dom.getByClassName("skyAD", e.dom.getById("contentB"));
            e.each(i || [],
            function(t) {
                e.css.show(t)
            }),
            messagebus.publish("playerad.showother")
        })
    },
    s = function(e, t, n) {
        n = n || 3e4,
        t / 1 == 0 ? (r(e), setTimeout(function() {
            i()
        },
        n)) : i()
    };
    window.playerSkyADCallback1 = function(e) {
        s(1, e, 3e4)
    },
    window.playerSkyADCallback2 = function(e) {
        s(2, e, 3e4)
    },
    window.playerSkyADCallback3 = function(e) {
        s(3, e, 15e3)
    },
    window.playerSkyADCallback4 = function(e) {
        s(4, e, 3e4)
    },
    window.playerSkyADCallback15 = function(e) {
        s(15, e, 15e3)
    },
    window.playerSkyADCallback20 = function(e) {
        s(20, e, 2e4)
    },
    window.playerSkyADCallback30 = function(e) {
        s(30, e, 3e4)
    }
} (),
messagebus.subscribe("playerad.hideother",
function() {
    _sohuHD.AD.ready(function() {
        var e = Mix,
        t = e.dom.getByClassName("ad", e.dom.getById("contentA")),
        n = e.dom.getByClassName("skyAD", e.dom.getById("contentB"));
        e.each(t || [],
        function(t) {
            e.css.hide(t)
        }),
        e.each(n || [],
        function(t) {
            e.css.hide(t)
        });
        var r = !n || !n.length,
        i = e.dom.create("div", {
            position: "relative",
            height: 0,
            margin: "0 auto"
        },
        {
            id: "player_bar_ad_container"
        }),
        s = e.dom.create("div", {
            background: "#151618",
            width: "281px",
            height: "22px",
            position: "absolute",
            left: r ? "226px": "226px",
            top: r ? "-32px": "-43px"
        },
        {
            id: "player_bar_ad_layer"
        });
        e.dom.after(i, e.dom.getById("sohuplayer")),
        e.dom.append(i, s)
    })
},
null, null, {
    cache: !0
}),
messagebus.subscribe("playerad.showother",
function() {
    _sohuHD.AD.ready(function() {
        var e = Mix,
        t = e.dom.getByClassName("ad", e.dom.getById("contentA")),
        n = e.dom.getByClassName("skyAD", e.dom.getById("contentB"));
        e.each(t || [],
        function(t) {
            e.css.show(t)
        }),
        e.each(n || [],
        function(t) {
            e.css.show(t)
        });
        var r = e.dom.getById("player_bar_ad_container");
        r && e.css.hide(r)
    })
},
null, null, {
    cache: !0
}),
function() {
    var e = "_ad_ftmda",
    t, n = function(n) {
        _sohuHD.AD.ready(function() {
            var r = {
                1 : "http://images.sohu.com/bill/s2012/yule/wangxinxin/peak/peak.swf",
                2 : "http://images.sohu.com/bill/s2012/yule/wangxinxin/peak/0410/interactads.swf"
            },
            i = r["" + n];
            if (!i) return;
            var s = Mix,
            o = s.dom.getByClassName("skyAD", s.dom.getById("contentB"));
            o = o || [],
            s.each(o || [],
            function(e) {
                s.css.hide(e)
            });
            var u, a = !1;
            o.length ? u = o[0] : (u = s.dom.getById("sohuplayer"), a = !0);
            var f = document.getElementById(e);
            f || (f = s.dom.create("div", {
                position: "relative",
                width: "100%",
                height: 0,
                "z-index": 500
            },
            {
                id: e
            }), s.dom.before(f, u)),
            f.innerHTML = "",
            s.css.setStyle(f, {
                display: "block"
            });
            var l = s.dom.create("div", {
                left: "0",
                position: "absolute",
                height: "480px",
                width: "1140px"
            }),
            c = _sohuHD.AD.getFlashObject(),
            h = new c({
                src: i,
                width: 1140,
                height: 480,
                version: 7,
                allowscriptaccess: "always"
            });
            s.dom.append(f, l),
            h.write(l);
            var p = document.getElementById(h.id);
            t = setInterval(function() {
                var e = s.css.width(s.dom.getById("sohuplayer")),
                t = s.css.height(s.dom.getById("sohuplayer"));
                s.css.setStyle(l, {
                    width: e + "px",
                    height: t + "px"
                }),
                s.dom.setAttrs(p, {
                    width: e,
                    height: t
                })
            },
            200)
        })
    },
    r = function() {
        clearInterval(t),
        t = null,
        _sohuHD.AD.ready(function() {
            var t = Mix,
            n = t.dom.getById(e);
            n && t.css.hide(n)
        })
    },
    i = function(e, t) {
        t / 1 == 0 ? (n(e), setTimeout(function() {
            r()
        },
        15e3)) : r()
    };
    window.playerDazzleADCallback = function(e) {
        i(1, e)
    },
    window.playerDazzleADCallback2 = function(e) {
        i(2, e)
    }
} (),
function() {
    var e = "_ad_ftmda1",
    t = function(t) {
        _sohuHD.AD.ready(function() {
            var n = {
                1 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121010303.swf",
                2 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121010239.swf",
                3 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121010219.swf",
                4 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121010151.swf",
                5 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121010118.swf",
                6 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121010046.swf",
                7 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121010018.swf",
                8 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121125955.swf",
                9 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121125902.swf",
                10 : "http://images.sohu.com/ytv/SH/SHANGHAIGM/64036020131121125838.swf"
            },
            r = n["" + t];
            if (!r) return;
            var i = Mix,
            s = i.dom.getByClassName("skyAD", i.dom.getById("contentB"));
            s = s || [],
            i.each(s || [],
            function(e) {
                i.css.hide(e)
            });
            var o = i.dom.create("div", {
                position: "relative",
                width: "100%",
                height: 0,
                "z-index": 5
            },
            {
                id: e
            }),
            u,
            a = !1;
            s.length ? u = s[0] : (u = i.dom.getById("sohuplayer"), a = !0),
            i.dom.before(o, u);
            var f = i.dom.create("div", {
                left: "0",
                position: "absolute",
                height: "515px",
                width: "980px"
            }),
            l = _sohuHD.AD.getFlashObject(),
            c = new l({
                src: r,
                width: 980,
                height: 515,
                version: 7,
                allowscriptaccess: "always"
            });
            i.dom.append(o, f),
            c.write(f)
        })
    },
    n = function() {
        _sohuHD.AD.ready(function() {
            var t = Mix,
            n = t.dom.getById(e);
            n && t.css.hide(n)
        })
    },
    r = function(e, r) {
        r / 1 == 0 ? (t(e), setTimeout(function() {
            n()
        },
        15e3)) : n()
    };
    window.playerADCallback1 = function(e) {
        r(1, e)
    },
    window.playerADCallback2 = function(e) {
        r(2, e)
    },
    window.playerADCallback3 = function(e) {
        r(3, e)
    },
    window.playerADCallback4 = function(e) {
        r(4, e)
    },
    window.playerADCallback5 = function(e) {
        r(5, e)
    },
    window.playerADCallback6 = function(e) {
        r(6, e)
    },
    window.playerADCallback7 = function(e) {
        r(7, e)
    },
    window.playerADCallback8 = function(e) {
        r(8, e)
    },
    window.playerADCallback9 = function(e) {
        r(9, e)
    },
    window.playerADCallback10 = function(e) {
        r(10, e)
    }
} ()