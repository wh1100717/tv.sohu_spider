/*! Team:2014-05-07 3:27:01 PM */
kao.add("recommbar", {
    path: "base/plugin/recommbar13121101.js",
    requires: ["jquery"]
}),
kao.add("starmod", {
    path: "site/play/starmod_20861c.js",
    requires: ["jquery"]
}),
kao.add("ifoxtip", {
    path: "site/play/v1/ifoxtip13112001.js",
    requires: ["jquery"]
}),
kao.add("nav", {
    path: "site/play/v1/nav_bdc9da.js",
    requires: ["jquery", "login"]
}),
kao.add("play", {
    path: "site/play/v1/play_b13778.js",
    requires: ["jquery", "login"]
}),
kao.add("masonry", {
    path: "site/play/v1/masonry.js",
    requires: ["jquery"]
}),
kao.add("playtoolbar", {
    path: "site/play/v1/toolbar_6fefaa.js",
    requires: ["jquery", "winbox"]
}),
kao.add("sidebar", {
    path: "site/play/v1/sidebar_a460d8.js",
    requires: ["jquery"]
}),
kao.add("comment", {
    path: "site/play/v1/comment_3bd977.js",
    requires: ["jquery", "login"]
}),
kao.add("voice_widget", {
    path: "site/play/v1/voice_widget13100802.js",
    requires: ["jquery", "login"]
}),
kao.add("report_widget", {
    path: "site/play/v1/report_widget_1738ee.js",
    requires: ["play"]
}),
kao.add("vip_discount", {
    path: "site/play/v1/vip_discount_a0458d.js",
    requires: ["jquery", "history"]
});
var recommArea = function() {
    var e = {
        isEnable: function() {
            return 2 == window.cid || (13 == window.cid || 25 == window.cid) && "" == playlistId
        },
        init: function(e) {
            return this.isEnable() ? (e._base = this, e.init(), void 0) : (_e("recomm disabled"), void 0)
        }
    };
    return e.isEnable() && kao("recommbar"),
    e
} (); !
function(e) {
    if (!e.pagetype || "voice" != e.pagetype) {
        var a = function() {
            document.body.className = document.documentElement.clientWidth > 1140 ? "W-1140": "W-980"
        };
        a(),
        e.onresize = a
    }
    e.specialTopFavBarSign = !0,
    messagebus.subscribe("core.rendervideo",
    function() {
        var e = sohuHD.ifox;
        sohuHD.install = {},
        sohuHD.install.isInstall = function() {
            return e.isInstalled()
        },
        sohuHD.install.play = function(a, i, n, r, o) {
            e.play(a, i, n, r, o)
        }
    },
    null, null, {
        cache: !0
    }),
    e.playerMovieLoaded = function() {
        messagebus.publish("play.playerMovieLoaded")
    },
    e.showDownload = function() {
        messagebus.publish("video.candownload")
    };
    var i = !1,
    n = function() {
        i || (i = !0, messagebus.subscribe("core.loaded_nav",
        function() {
            kao("nav",
            function() {
                kao("vip_discount")
            })
        },
        null, null, {
            cache: !0
        }), sohuHD.play = {},
        kao("play"), e.pagetype && "voice" === e.pagetype && kao("voice_widget"), e.pagetype && "report" === e.pagetype && kao("report_widget"))
    };
    setTimeout(n, 5e3),
    sohuHD.onPlayerReady = function() {
        _e("player ready"),
        n(),
        messagebus.publish("play.playerReady")
    },
    sohuHD.onVideoPlayed = function(e, a, i, n) {
        sohuHD.onVideoPlayed.hasCall || (_e("player videoplayed"), sohuHD.onVideoPlayed.hasCall = !0, messagebus.publish("play.onVideoPlayed", {
            uid: e,
            vt: a,
            rp: i,
            notJoin: n
        }))
    },
    e.playStart = function() {
        _e("playStart"),
        messagebus.publish("play.playStart")
    }
} (window),
16 == cid &&
function(e) {
    var a = function(e, a, i) {
        if ("undefined" == typeof a) {
            var n = new RegExp("(?:^|; )" + e + "=([^;]*)").exec(document.cookie);
            return n ? n[1] || "": ""
        }
        i = i || {},
        null === a && (a = "", i.expires = -1);
        var r = "";
        if (i.expires && ("number" == typeof i.expires || i.expires.toUTCString)) {
            var o;
            "number" == typeof i.expires ? (o = new Date, o.setTime(o.getTime() + 24 * i.expires * 60 * 60 * 1e3)) : o = i.expires,
            r = "; expires=" + o.toUTCString()
        }
        var t = i.path ? "; path=" + i.path: "",
        s = i.domain ? "; domain=" + i.domain: "",
        u = i.secure ? "; secure": "";
        document.cookie = [e, "=", a, r, t, s, u].join("")
    },
    i = {
        sendType: "img",
        paramMap: {
            url: 1,
            refer: 1,
            fuid: 1,
            yyid: 1,
            passport: 1,
            sid: 1,
            vid: 1,
            pid: 1,
            cid: 1,
            msg: 1,
            formwork: 1,
            rec: 1,
            ab: 1,
            Lb: 1,
            v: 1,
            uuid: 1,
            type: 1
        },
        targetUrl: ["http://click.hd.sohu.com.cn/r.gif", "http://ctr.hd.sohu.com/ctr.gif"]
    },
    n = {
        pingbackPattern: {
            iframe: function(e) {
                var a = document.createElement("iframe");
                a.src = e,
                a.width = 1,
                a.height = 1,
                a.style.display = "none",
                document.getElementsByTagName("body")[0].appendChild(a)
            },
            img: function(e) {
                var a = new Image;
                a.onload = a.onerror = a.onabort = function() {
                    a = null
                },
                a.src = e
            }
        },
        newProcessURLMap: {
            url: function() {
                return escape(location.href)
            },
            refer: function() {
                return escape(document.referrer)
            },
            fuid: function() {
                return a("fuid")
            },
            yyid: function() {
                return a("YYID")
            },
            sid: function() {
                return a("SUV")
            },
            vid: function() {
                return e.vid
            },
            pid: function() {
                return e.playlistId
            },
            cid: function() {
                return e.cid
            },
            msg: function() {
                return "realimpression"
            },
            formwork: function() {
                return 22
            },
            rec: function(e, a) {
                return escape(a.callback)
            },
            ab: function(e, a) {
                return a.videos.length ? a.videos[0].ab: ""
            },
            uuid: function() {
                var a;
                return a = e.pingback_uuid ? e.pingback_uuid: e.pingback_uuid = (new Date).getTime()
            },
            passport: function() {
                return sohuHD && sohuHD.passport ? sohuHD.passport.getPassport() : void 0
            },
            Lb: function() {
                return a("pagelianbo")
            },
            type: function() {
                return 100
            },
            v: function() {
                return "maybelike_" + e.cid + "_v20130829"
            }
        }
    };
    messagebus.subscribe("play.loaded_similar_data",
    function() {
        messagebus.subscribe("core.loaded_left",
        function() {
            e.kao("jquery",
            function() {
                function a() {
                    var e = $.map(i.paramMap,
                    function(e, a) {
                        var r;
                        return (r = n.newProcessURLMap[a]) ? a + "=" + r.call(n.newProcessURLMap, i, t) : void 0
                    });
                    $.each(i.targetUrl,
                    function(a, r) {
                        n.pingbackPattern[i.sendType](r + "?" + e.join("&"))
                    })
                }
                var r = $("#similar"),
                o = r.offset().top + 250,
                t = e.similar;
                $(e).bind("scroll.pingback",
                function() {
                    var i = $(e).scrollTop() + $(e).height() - 35;
                    if (i > o) {
                        try {
                            a()
                        } catch(n) {}
                        $(e).unbind("scroll.pingback")
                    }
                })
            })
        },
        null, null, {
            cache: !0
        })
    },
    null, null, {
        cache: !0
    })
} (window);