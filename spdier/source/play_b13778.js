/*! Team:2014-05-07 3:27:00 PM */
!
function(e, t, i) {
    function a(e) {
        var i = new MessageBus,
        a = t.extend({
            container: "body",
            className: {
                active: "ton"
            }
        },
        e),
        s = t(a.container).find('[data-tab^="' + a.name + '"]'),
        l = {};
        return l.active = function(e) {
            s.removeClass(a.className.active);
            var t = {
                name: e,
                $tabElem: s.filter('[data-tab^="' + a.name + "-tab-" + e + '"]').addClass(a.className.active),
                $boxElem: s.filter('[data-tab^="' + a.name + "-box-" + e + '"]').addClass(a.className.active)
            };
            i.publish(["active", e].join("."), t)
        },
        l.on = function(e, t, a) {
            i.subscribe(e, t, a || l, null, {
                cache: !0
            })
        },
        l.one = function(e, t, a) {
            i.subscribe(e, t, a || l, null, {
                cache: !0,
                execTime: 1
            })
        },
        l
    }
    var s = i.UI = i.UI || {};
    s.Tab = a
} (window, jQuery, sohuHD),
function(e) {
    var t = e.Template;
    t.registHelper({
        on: function(e) {
            return e ? "on": ""
        },
        slash: function(e, t, i) {
            t = t || 5,
            t = Math.min(t, e.length),
            i = i ||
            function(e) {
                return e
            };
            for (var a = [], s = 0; t > s; s++) a.push(i(e[s]));
            return a.join(" / ")
        },
        videoName: function(e) {
            return "" == e.subName ? e.name: e.subName
        },
        isNewPub: function(e) {
            if (e && e.publishTime) {
                var t = e.publishTime.split("-"),
                i = "0" == t[1].substr(0, 1) ? parseInt(t[1].substr(1, 1)) - 1 : parseInt(t[1]) - 1,
                a = parseInt((new Date - new Date(t[0], i, t[2])) / 1e3 / 60 / 60 / 24);
                if (a >= 0 && 2 > a) return ! 0
            }
            return ! 1
        },
        albumSeries: function(e) {
            if (e.albums && e.albums.length > 0) {
                var t = [],
                i = null;
                return $.each(e.albums,
                function(a, s) {
                    e.playlistid == s.playlistid ? i = e.albums[a + 1] : t.push(s)
                }),
                i ? [i] : t
            }
            return []
        }
    })
} (sohuHD),
function(e, t) {
    var i = function(i) {
        i = t(i);
        var a = t(e).scrollLeft(),
        s = t(e).scrollTop(),
        l = t(e).height(),
        o = t(e).width(),
        n = i.offset(),
        r = n.left,
        c = n.top;
        0 > r && (r = 0),
        0 > c && (c = 0);
        var d = d || i.outerWidth(),
        u = u || i.outerHeight();
        return (a >= r && r + i.width > a || r >= a && a + o >= r) && (s >= c && c + i.height > s || c >= s && s + l >= c) ? !0 : !1
    },
    a = {},
    s = function(t) {
        t = t || {};
        var i = t.dom || [],
        s = t.callback;
        if (i instanceof Array || e.jQuery && i instanceof jQuery || (i = [i]), !i.length || !s) return _e("seed need dom & callback"),
        void 0;
        var o = t.cycle || 1e3,
        n = sohuHD.random();
        a[n] = "growing",
        sohuHD.each(i,
        function(e, t) {
            t.seed = {
                id: n,
                callback: s
            },
            l(t, o)
        })
    },
    l = function(e, t) {
        var s = function() {
            e && i(e) && ("growing" == a[e.seed.id] ? n(e) : o(e))
        };
        s(),
        e.seed.timer = setInterval(s, t)
    },
    o = function(e) {
        clearInterval(e.seed.timer),
        e.seed.timer = null,
        a[e.seed.id] = "dig"
    },
    n = function(e) {
        _e("fruit"),
        a[e.seed.id] = "fruit",
        e.seed.callback.call(e)
    };
    sohuHD.seed = s
} (window, jQuery),
function(e, t, i) {
    var a = function(e, t, i) {
        return messagebus.subscribe(e, t ||
        function() {},
        null, null, i || {
            cache: !0
        })
    };
    e.getVrsPlayerHistory = function(t, a, s, l, o) {
        i.play.videoInfo.thistime = l;
        var n = i.play.videoInfo,
        r = n.totalcount,
        c = 0,
        d = n.thisurl,
        u = n.nexturl,
        p = n.thistitle,
        h = (n.nexttitle, 0); ("" == p || null == p) && (p = o);
        var m = new Date;
        m.setTime(m.getTime() + 6048e5);
        var f = m.toGMTString(),
        g = new Date,
        v = null,
        y = 180,
        b = 1,
        _ = "",
        w = function(e) {
            var t = new RegExp("(?:^|; )" + e + "=([^;]*)").exec(document.cookie);
            return t ? t[1] || "": ""
        };
        _ = w("savehistory").split("%2C"),
        1 == parseInt(w("isJump")) && (b = 3),
        "#true" == location.hash && (b = 3),
        "undefined" == typeof s && (s = 0),
        ("undefined" == typeof l || 0 == s) && (l = 0);
        var k = new RegExp("[-|\u7b2c|\u4e4b|:|\u2014|\uff1a]", "i"),
        x = new RegExp("[\\^|\\*|\\&]", "i"),
        D = "",
        $ = p;
        if (null != p.match(k)) {
            var H = new RegExp("(.*)([-|\u7b2c|:|\u2014|\uff1a|\u4e4b])", "i").exec(p);
            for ($ = H[1], D = H[2]; null != $.match(k);) {
                var I = new RegExp("(.*)([-|\u7b2c|:|\u2014|\uff1a|\u4e4b])", "i").exec($);
                $ = I[1],
                D = I[2]
            }
        }
        if ("" != location.hash && null != location.hash && "#true" != location.hash && null == v) {
            var P = location.hash;
            B = parseInt(P.substring(1)),
            v = {
                success: 5,
                order: 0,
                lastTime: B,
                title: "",
                url: C,
                nexturl: ""
            }
        }
        if (null == v && "" != _ && "" != location.hash && null != location.hash && "#true" != location.hash) for (var C = location.href,
        T = 0,
        B = 0,
        z = "",
        d = "",
        j = "",
        E = 0; E < _.length; E++) {
            var L = _[E].split(_[E].match(x));
            if (C.substring(0, C.indexOf("#")) == L[5].substring(0, L[5].indexOf("#"))) {
                T = L[2],
                B = parseInt(L[3]),
                z = unescape(L[6]),
                d = L[5],
                j = L[8];
                var S = 1;
                30 > B && (S = 3),
                v = {
                    success: S,
                    order: T,
                    lastTime: B,
                    title: z,
                    url: d.substring(0, d.indexOf("#")),
                    nexturl: j
                };
                break
            }
        } else if (null == v && null != _ && "" != _ && _.length > 0) for (var E = _.length - 1; E >= 0; E--) {
            var N = _[E].split(_[E].match(x)),
            M = null;
            void 0 != _[E - 1] && null != _[E - 1] && (M = _[E - 1].split(_[E].match(x)));
            var V = unescape(N[6]);
            if ("" != D && -1 != V.indexOf(D) && (V = V.substring(0, V.indexOf(D))), parseInt(N[0]) == a && parseInt(N[3]) > 30 && r > 1) {
                var O = N[5],
                U = 0;
                if (N[1] == t) {
                    var A, W, F, R;
                    null != M ? a != M[0] ? (U = b, A = N[2], W = Math.ceil(N[3]), F = unescape(N[6]), R = N[5]) : c == parseInt(M[2]) + 1 && parseInt(M[9]) - y <= parseInt(M[3]) || (U = 2, t != M[1] || "#true" != location.href && 3 != b || (U = 3), A = M[2], W = Math.ceil(M[3]), F = unescape(M[6]), R = M[5]) : (U = b, A = N[2], W = Math.ceil(N[3]), F = unescape(N[6]), R = N[5]),
                    2 == U && -1 != R.indexOf("#") && (R = R.substring(0, R.indexOf("#")) + "#true"),
                    v = {
                        success: U,
                        order: A,
                        lastTime: W,
                        title: F,
                        url: R
                    }
                } else V == $ ? c == parseInt(N[2]) + 1 && parseInt(N[9]) - y <= parseInt(N[3]) || (U = 2, N[1] == t && (U = 3), -1 != N[5].indexOf("#") && (O = N[5].substring(0, N[5].indexOf("#")) + "#true"), v = {
                    success: U,
                    order: N[2],
                    lastTime: Math.ceil(N[3]),
                    title: unescape(N[6]),
                    url: O
                }) : a == h && (c == parseInt(N[2]) + 1 && parseInt(N[9]) - y <= parseInt(N[3]) || (U = 2, -1 != N[5].indexOf("#") && (O = N[5].substring(0, N[5].indexOf("#")) + "#true"), v = {
                    success: U,
                    order: N[2],
                    lastTime: Math.ceil(N[3]),
                    title: unescape(N[6]),
                    url: O
                }));
                2 == U && (document.cookie = "isJump=1; expires=" + f + "; path=/; domain=tv.sohu.com;");
                break
            }
            if (parseInt(N[0]) == a && parseInt(N[3]) > 30 && 1 == r) {
                var O = ""; - 1 != N[5].indexOf("#") && (O = N[5].substring(0, N[5].indexOf("#")) + "#true"),
                v = {
                    success: 1,
                    order: N[2],
                    lastTime: Math.ceil(N[3]),
                    title: unescape(N[6]),
                    url: O
                }
            }
        }
        var G = 0;
        null != _ && "" != _ && (G = _.length),
        G > 6 && _.shift();
        var J = (new Date).getTime(),
        q = !1,
        Y = "",
        Q = "",
        X = "";
        if (d = -1 != d.indexOf("#") ? d.substring(0, d.indexOf("#")) : d, null != _ && _.length > 0) for (var E = 0; E < _.length; E++) if (null == _[E] || "" == _[E]);
        else {
            var L = _[E].split(_[E].match(x)),
            K = unescape(L[6]);
            if ("" != D && -1 != K.indexOf(D) && (K = K.substring(0, K.indexOf(D))), L[0] == a && $ == K) {
                q = !0;
                var Z = Math.ceil(L[3]);
                if (Math.ceil(s) > 30) Z = Math.ceil(s),
                X = a + "^" + t + "^" + c + "^" + Z + "^0^" + d + "#" + Z + "^" + escape(p) + "^" + g.getTime() + "^" + u + "^" + l,
                document.cookie = "isJump=0; expires=" + f + "; path=/; domain=tv.sohu.com;";
                else {
                    var et = L[5].substring(0, L[5].indexOf("#")) + "#" + Z;
                    X = L[0] + "^" + L[1] + "^" + L[2] + "^" + Math.ceil(L[3]) + "^0^" + et + "^" + L[6] + "^" + g.getTime() + "^" + L[8] + "^" + L[9]
                }
            } else {
                var tt = (J - parseInt(L[7])) / 1e3 < 1 ? 1 : Math.floor((J - parseInt(L[7])) / 1e3),
                et = L[5].substring(0, L[5].indexOf("#")) + "#" + L[3];
                Y += Q + L[0] + "^" + L[1] + "^" + L[2] + "^" + L[3] + "^" + tt + "^" + et + "^" + L[6] + "^" + L[7] + "^" + L[8] + "^" + L[9],
                Q = escape(",")
            }
        }
        return e.sohuHD && i.passport && i.passport.getPassport && i.passport.getPassport() || (!q && Math.floor(s) > 30 && (Y += Q + a + "^" + t + "^" + c + "^" + Math.floor(s) + "^0^" + d + "#" + Math.floor(s) + "^" + escape(p) + "^" + g.getTime() + "^" + u + "^" + l, document.cookie = "isJump=0; expires=" + f + "; path=/; domain=tv.sohu.com;"), Y = Y + ("" != X && "" != Y ? escape(",") : "") + X, null != Y && "" != Y && (document.cookie = "savehistory=" + Y + "; expires=" + f + "; path=/; domain=tv.sohu.com;")),
        v
    },
    e.vrsPlayerCallEndAd = function() {
        return videoInfo.nexturl ? 1 : void 0
    },
    e.spxzClick = function() {
        messagebus.publish("ifox.showdetail")
    },
    e.onVideoPause = function() {
        messagebus.publish("play.pause")
    },
    e.onVideoPlay = function() {
        messagebus.publish("play.play")
    },
    function(e, t) {
        var a, s = 1e3,
        l = !1,
        o = {
            cookieName: "maskState",
            store: function() {
                i.cookie(this.cookieName, 1, {
                    domain: "tv.sohu.com",
                    path: "/"
                })
            },
            clear: function() {
                i.cookie(this.cookieName, -1, {
                    expires: -1,
                    domain: "tv.sohu.com",
                    path: "/"
                })
            },
            get: function() {
                return i.cookie(this.cookieName)
            },
            getPlaylistID: function() {
                return playlistID = e.vrs_playlist_id || e.PLAYLIST_ID || e.VRS_ALBUM_ID
            },
            isOff: function() {
                var e = t("#alpha"),
                i = !1;
                return e.length && !e.hasClass("hidden") && (i = !0),
                i
            },
            isAutolight: function() {
                return l
            },
            _isAutolight: function() {
                var e = this.get();
                return 1 == e
            }
        },
        n = function() {
            var e = document.getElementById("player");
            try {
                e.externalLightOff()
            } catch(t) {}
        },
        r = function() {
            o.isAutolight() && (e._turnPageLight(0), n(), needInform = !0),
            o.clear()
        };
        t.extend(e, {
            _turnPageLight: function(e) {
                if ("floating" !== i.play.player_status) {
                    i.play.player_islight = e;
                    var l = t(document.body);
                    a || (l.prepend('<div id="alpha" class="hidden"></div>'), a = t("#alpha").css({
                        opacity: 0
                    })),
                    a.stop();
                    var o = t("#player");
                    0 == e ? (o.css({
                        "z-index": 1e3,
                        position: "relative"
                    }), l.addClass("light-mask"), a.show().removeClass("hidden"), a.animate({
                        opacity: 1
                    },
                    s)) : 1 == e && a.animate({
                        opacity: 0
                    },
                    s,
                    function() {
                        a.hide().addClass("hidden"),
                        l.removeClass("light-mask"),
                        "1" != i.cookie("fullwindow") && o.css({
                            "z-index": 1,
                            position: "static"
                        })
                    })
                }
            }
        }),
        t.extend(e._turnPageLight, {
            stateUtil: o,
            autoLight: r
        }),
        o._isAutolight() && (l = !0, o.clear())
    } (e, t),
    e.getNextTitle = function() {
        var e = i.play.videoInfo;
        return e.nexttitle
    },
    e.getNextVideo = function() {
        function a() {
            for (var e, t = navigator.plugins || [], i = 0; e = t[i]; i++) if (/npifox/i.test(e.description)) return ! 0;
            return ! 1
        }
        var s = i.play.videoInfo,
        l = {},
        o = 0;
        if (e.ActiveXObject) try {
            var n = new ActiveXObject("SoHuVA.SoHuDector.1");
            o = n.GetSohuVAVersion()
        } catch(r) {
            return l
        } else if (a()) {
            var c = null;
            0 == t("#embed_ifox").length && t("body").append('<embed id="embed_ifox" type="application/ifox-plugin" width="0" height="0"></embed>'),
            c = document.getElementById("embed_ifox");
            try {
                o = c.GetSohuVAVersion()
            } catch(r) {
                return l
            }
        }
        if (o >= 34078720 && s.nexturl && i.play.listData[i.play.currentPage] && i.play.listData[i.play.currentPage].videos.length > 0) {
            for (var d = t.extend(!0, {},
            i.play.listData[i.play.currentPage]), u = d.videos.length, p = d.videos, h = [], m = 0; u > m; m++) p[m].vid == vid && void 0 != p[m + 1] && (h = p[m + 1]);
            l = {
                playLength: h.playLength,
                relativeVideoId: h.vid,
                videoId: h.vid,
                videoImage: h.smallPicUrl,
                videoName: h.name,
                videoOrder: h.order,
                videoShowDate: h.showDate,
                videoSubName: h.showName,
                videoUrl: h.pageUrl
            }
        }
        return l
    },
    e.swfGotoNewPage = function(a, s) {
        if (t(".btn-contin").hasClass("btn-contin_cancel") || i.commenting) return null;
        a = a || "";
        var l = a || i.play.videoInfo.nexturl;
        "undefined" != typeof _videoInfo && _videoInfo.nurl && (l = l || _videoInfo.nurl);
        var o = e._turnPageLight;
        if (l) {
            var n = n || 2,
            r = 1e3 * n;
            return i.cookie("pagelianbo", 2, {
                path: "/"
            }),
            i.cookie("series_video", 2, {
                path: "/"
            }),
            s && t.getScript("http://qf1.hd.sohu.com.cn/dov.do?method=stat&code=97&type=" + s + "&r=" + (new Date).getTime(),
            function() {
                return setTimeout(function() {
                    e._AD_noNewPage || (e.testFull = !0, o.stateUtil.isOff() && o.stateUtil.store(), i.redirect(l))
                },
                r),
                1
            }),
            setTimeout(function() {
                e._AD_noNewPage || (e.testFull = !0, o.stateUtil.isOff() && o.stateUtil.store(), i.redirect(l))
            },
            r),
            1
        }
    };
    var s = function() {
        _e("vrsOnResize"),
        t("#player").css({
            width: n() + "px",
            height: o() + "px",
            top: c() + "px",
            left: r() + "px"
        })
    },
    l = function() {
        _e("vrsOnScroll"),
        t("#player").css({
            width: n() + "px",
            height: o() + "px",
            top: c() + "px",
            left: r() + "px"
        })
    },
    o = function() {
        var e = document.documentElement;
        return e && e.clientHeight || document.body.clientHeight
    },
    n = function() {
        var e = document.documentElement;
        return e && e.clientWidth || document.body.clientWidth
    },
    r = function() {
        var t = document.documentElement;
        return e.pageXOffset || t && t.scrollLeft || document.body.scrollLeft
    },
    c = function() {
        var t = document.documentElement;
        return e.pageYOffset || t && t.scrollTop || document.body.scrollTop
    },
    d = function() {
        _e("fullBig"),
        swfWindowMode(),
        t("#player").css({
            top: c() + "px",
            left: r() + "px",
            zIndex: "1010",
            position: "absolute",
            width: n() + "px",
            height: o() + "px"
        }),
        i.cookie("fullwindow", "1"),
        i.cookie("pid", "undefined" != typeof pid ? pid: ""),
        t("window").bind("resize.play", s),
        t("window").bind("scroll.play", l)
    };
    messagebus.subscribe("play.playStart",
    function() {
        return "1" == i.cookie("fullwindow") && "undefined" != typeof pid && i.cookie("pid") == pid ? (_e("playstart call swfWiderMode!!!!!!!!"), e.swfWiderMode("offbyjs"), d(), "1") : void 0
    },
    null, null, {
        cache: !0
    }),
    messagebus.wait(["play.playStart", "play.playlistloaded"],
    function(e, a) {
        var s = a["play.playlistloaded"],
        l = [];
        i.each(s.videos,
        function(e, t) {
            l.push({
                playLength: t.playLength,
                relativeVideoId: t.vid,
                videoId: t.vid,
                videoImage: t.largePicUrl,
                videoName: t.name,
                videoOrder: t.order,
                videoShowDate: t.showDate,
                videoSubName: t.showName,
                videoUrl: t.pageUrl
            })
        });
        try {
            var o = t("#player")[0];
            o.setVrsVideoList({
                videolist: l
            })
        } catch(n) {
            _e(n)
        }
    },
    null, null, {
        cache: !0
    }),
    e.setFullWindowCookie = function(e) {
        "1" == e ? (i.cookie("fullwindow", "1"), i.cookie("pid", "undefined" != typeof pid ? pid: "")) : i.cookie("fullwindow", "0")
    },
    e.isFullWindow = function() {
        return "1" == i.cookie("fullwindow") && "undefined" != typeof pid && i.cookie("pid") == pid ? "1": void 0
    },
    messagebus.subscribe("play.onVideoPlayed",
    function(s, l) {
        var o = l.uid,
        n = l.vt,
        r = l.rp,
        c = l.notJoin;
        try {
            _e(["start| uid: ", o, " vt: ", n, " rp: ", r, " notjoin: ", c].join(""));
            var d = t("#player")[0],
            u = e.playlistId,
            p = sohuHDApple.hasSoHuVA ? "3": "1",
            h = i.user.passport,
            m = !!h,
            f = encodeURIComponent(document.title.replace(/\u89c6\u9891\uff1a| - \u641c\u72d0\u89c6\u9891/g, "")),
            g = encodeURIComponent(location.href),
            v = function(a) {
                if (!v.ran) {
                    v.ran = !0;
                    var s = "",
                    l = ["http://my.tv.sohu.com/user/card/rule?callback=?&type=1&uid=", o, "&vt=", n, "&rp=", r, "&title=", f, "&vurl=", g, "&vid=", vid, "&pid=", u, "&suid=", a, "&s=", p].join("");
                    _e(l);
                    var c = function(e) {
                        i.cookie("active_order_key", s, {
                            path: "/",
                            domain: "tv.sohu.com",
                            expire: new Date((new Date).getTime() + 6e5).getTime()
                        }),
                        h ? _e(e + "\n\u70b9\u786e\u5b9a\u53bb\u67e5\u770b") : _e(e + "\n\u4f60\u73b0\u5728\u672a\u767b\u5f55,\u70b9\u786e\u5b9a\u53bb\u767b\u9646")
                    };
                    e._activityPick = function() {
                        var e = "";
                        "undefined" != typeof gUserParams && (e = gUserParams.data.id),
                        i.cookie("active_pick_gift", e || "unlogin", {
                            path: "/",
                            domain: "tv.sohu.com"
                        })
                    },
                    e._activityValidate = function() {
                        var e = ["http://my.tv.sohu.com/user/card/rule?callback=?&type=2&uid=", o, "&vt=", n, "&rp=", r, "&title=", f, "&vurl=", g, "&key=", s, "&vid=", vid, "&pid=", u, "&s=", p];
                        _e(e.join("")),
                        "undefined" != typeof gUserParams && e.push("&suid=", gUserParams.data.id),
                        setTimeout(function() {
                            t.getJSON(e.join(""),
                            function(e) {
                                if (1 == e.status) {
                                    s = e.key,
                                    c(e.content, e.key),
                                    e.setUrl = "http://my.tv.sohu.com/user/card/updateConfig.jhtml?isJoin=2&isFull=2&suid=" + o,
                                    e.loginUrl = "http://my.tv.sohu.com/user/card/cardsinfo.jsp?s=2",
                                    e.isLogin = m,
                                    e.passport = h;
                                    try {
                                        d.activity(e)
                                    } catch(t) {}
                                } else _e("\u554a\u54e6, \u518d\u5237\u4e00\u6b21")
                            })
                        },
                        6e4)
                    };
                    var y = function(e, a) {
                        if (_e(e), 1 != e.status) return _e("\u554a\u54e6,\u518d\u5237\u4e00\u6b21"),
                        void 0;
                        s = e.key,
                        e.pt = 60 * e.pt,
                        e.setUrl = "http://my.tv.sohu.com/user/card/updateConfig.jhtml?isJoin=2&isFull=2&suid=" + o,
                        e.loginUrl = "http://my.tv.sohu.com/user/card/cardsinfo.jsp?s=2",
                        e.isLogin = m,
                        e.passport = h;
                        try {
                            d.activity(e)
                        } catch(l) {}
                        _e(e),
                        e.pt ? _e([e.pt, "\u79d2\u540e\u4e2d\u5956"].join("")) : c(e.content),
                        1 == a && messagebus.subscribe("core.login",
                        function() {
                            t.getJSON("http://my.tv.sohu.com/user/card/bp?callback=?", {
                                cardId: e.cardId,
                                uuid: i.cookie("fuid"),
                                pid: u,
                                vid: vid,
                                title: f,
                                vurl: g
                            },
                            function(e) {
                                s = e.key ? e.key: "unlogin|noprize",
                                c(e.content)
                            })
                        },
                        null, null, {
                            cache: !0,
                            execTime: 1
                        })
                    };
                    i.user.uid ? t.getJSON(l,
                    function(e) {
                        y(e)
                    }) : (i.foxCardInit = function(t) {
                        var i = t.list,
                        a = i.length;
                        if (i.length) {
                            for (var s = null,
                            l = [], o = null, n = null, r = 0; a > r; r++) if (o = i[r], o.pid) {
                                if (n = new RegExp("(^|,)" + u + "(,|$)"), n.test(o.pid)) {
                                    s = o;
                                    break
                                }
                            } else if (o.vid) {
                                if (n = new RegExp("(^|,)" + e.vid + "(,|$)"), n.test(o.vid)) {
                                    s = o;
                                    break
                                }
                            } else l.push(o);
                            if (!s) {
                                if (!l.length) return;
                                a = l.length;
                                var c = Math.floor(Math.random() * a);
                                s = l[c]
                            }
                            var d = Math.round(100 * Math.random()) <= s.rate;
                            if (d) {
                                _e("randomCard:      ------"),
                                _e(s);
                                var p = {};
                                p.cardId = s.cardId,
                                p.pt = 0,
                                p.cardType = 5,
                                p.disp = 1,
                                p.content = "",
                                p.cardImgUrl = "",
                                p.skinAddress = "",
                                p.key = "unlogin|" + s.cardId,
                                p.status = 1,
                                y(p, 1)
                            }
                        }
                    },
                    t.ajax({
                        url: "http://my.tv.sohu.com/user/card/static.json",
                        dataType: "script",
                        cache: !0
                    }))
                }
            };
            if (v.ran = !1, 0 == c && u) {
                var y = i.random([3, 4, 5]); ("25" == cid || "13" == cid) && (y = 1),
                i.cookie("_card_test") && (y = 0),
                y = 60 * y * 1e3,
                a("core.login.userinfo",
                function(e, t) {
                    t.id && setTimeout(function() {
                        v(t.id)
                    },
                    y)
                }),
                a("core.logout",
                function() {
                    v(null)
                })
            }
        } catch(b) {
            _e(b)
        }
    },
    null, null, {
        cache: !0
    }),
    function(e, t) {
        function i() {
            n && n.hide(),
            l.show(),
            o.show(),
            r.hide()
        }
        try {
            var a = function() {},
            s = e.playerADCallback || a,
            l = t("#video .left"),
            o = t("#video .right"),
            n = t("#player_wider_ad"),
            r = t("#player_bar_layer");
            e.playerADCallback = function(a) {
                if (s(a), a / 1 == 0) {
                    var c = t("#location");
                    c = c.length ? c: t(".location"),
                    c.append('<div id="player_wider_ad"></div>'),
                    n = t("#player_wider_ad"),
                    l = t("#video .left"),
                    o = t("#video .right"),
                    l.hide(),
                    o.hide(),
                    n.show(),
                    n.css({
                        position: "absolute",
                        width: 390,
                        height: c.height(),
                        top: 0,
                        right: 0,
                        background: 'url("http://css.tv.itc.cn/global/images/newmytvbg.png") repeat-x scroll 0 0 #F1F1F1',
                        "z-index": 1005
                    }),
                    t(".fullVideo").after('<div style="z-index:1;position:relative;width:980px;height:0;margin:0 auto;"><div id="player_bar_layer"></div></div>'),
                    r = t("#player_bar_layer");
                    var d = {
                        movie: {
                            left: 310
                        },
                        tv: {
                            left: 327
                        },
                        doc: {
                            left: 327
                        }
                    },
                    u = d[e.filmType] || d.tv;
                    r.css({
                        background: "#151618",
                        width: 281,
                        height: 22,
                        position: "absolute",
                        left: u.left,
                        top: -32
                    }),
                    setTimeout(function() {
                        i()
                    },
                    33e3)
                } else i()
            }
        } catch(c) {
            _e(c)
        }
    } (e, t),
    e.hasPreVideo = function() {
        var e = i.play.videoInfo;
        return e.lasturl
    },
    e.hasNextVideo = function() {
        var e = i.play.videoInfo;
        return e.nexturl
    },
    e.playPreVideo = function() {
        var e = i.play.videoInfo,
        t = e.lasturl;
        t && i.redirect(t)
    },
    e.playNextVideo = e.swfGotoNewPage,
    a("play.playerMovieLoaded",
    function() {
        if (!i.getElem("speedTest")) {
            var e = new SWFObject("http://tv.sohu.com/upload/jq_plugin/test/nodeTest.swf", "speedTest", 1, 1, "9,0,145", "#000000");
            e.addParam("allowscriptaccess", "always"),
            t(document.body).append(e.getFlashHtml())
        }
    }),
    e.swfWiderMode = function(e) {
        "on" == e || "off" == e ? "on" == e ? i.play.playerToWider() : i.play.playerToNormal() : (e = e.replace("byjs", ""), a("play.playStart",
        function() {
            "on" == e ? t("#player")[0].externalCinema(1) : t("#player")[0].externalCinema(0)
        }))
    },
    e.modifyVideoState = function(a, s, l) {
        if ("undefined" == typeof s && "undefined" == typeof l) {
            if (e.vid = a, i.play.showPlayListBox(i.play.listData[i.play.currentPage]), 0 == t("#listBox li.on").next().length && !i.play.isScrollMod() && i.play.currentPage != i.play.totalPage) {
                var o = i.play.currentPage / 1 + 1;
                i.play.listData[o] && i.play.showPlayListBox(i.play.listData[o])
            }
            var n = i.play.videoInfo.thistitle;
            t(".location strong").html(n),
            t("#crumbsBar h2").html(n),
            document.title = n + " - \u641c\u72d0\u89c6\u9891";
            var r = {
                vid: a,
                url: i.play.videoInfo.thisurl,
                preUrl: i.play.videoInfo.lasturl
            };
            return messagebus.publish("play.nextVideoPlayed", r),
            !1
        }
        if (l) {
            var c = function(e) {
                var a = !1;
                return t.each(i.play.listData[i.play.currentPage].videos,
                function(t, i) {
                    e == i.vid && (a = !0)
                }),
                a
            };
            if (e.vid = a, c(a) ? i.play.showPlayListBox(i.play.listData[i.play.currentPage]) : i.play.initList(), 0 == t("#listBox li.on").next().length && !i.play.isScrollMod() && i.play.currentPage != i.play.totalPage) {
                var o = i.play.currentPage / 1 + 1;
                i.play.listData[o] && i.play.showPlayListBox(i.play.listData[o])
            }
            var n = i.play.videoInfo.thistitle;
            t(".location strong").html(n),
            t("#crumbsBar h2").html(n),
            document.title = n + " - \u641c\u72d0\u89c6\u9891";
            var r = {
                vid: a,
                url: i.play.videoInfo.thisurl,
                preUrl: i.play.videoInfo.lasturl
            };
            messagebus.publish("play.nextVideoPlayed", r)
        } else s && i.redirect(s)
    }
} (window, jQuery, sohuHD),
function(e) {
    function t(e, t) {
        var i = {
            min_x: 0,
            max_x: 100,
            min_y: 0,
            max_y: 100,
            limit: function(e) {
                return e.x = Math.max(e.x, this.min_x),
                e.x = Math.min(e.x, this.max_x),
                e.y = Math.max(e.y, this.min_y),
                e.y = Math.min(e.y, this.max_y),
                e
            },
            onInit: function() {},
            onDrag: function() {}
        },
        a = $(e),
        s = $(window.document.documentElement);
        return t && $.extend(i, t),
        a.each(function() {
            var e, t, a = this,
            l = $(this),
            o = {},
            n = !1;
            i.onInit(a),
            l.mousedown(function(i) {
                document.onselectstart = function() {
                    return ! 1
                },
                n = !0,
                e = i.pageX,
                t = i.pageY,
                o.left = parseFloat(l.css("left")),
                o.top = parseFloat(l.css("top")),
                isNaN(o.left) && (o.left = 0),
                isNaN(o.top) && (o.top = 0)
            }),
            s.mousemove(function(s) {
                if (n) {
                    var r = s.pageX - e,
                    c = s.pageY - t,
                    d = i.limit({
                        x: o.left + r,
                        y: o.top + c
                    });
                    l.css({
                        left: d.x,
                        top: d.y
                    }),
                    i.onDrag(a, {
                        left: d.x,
                        top: d.y,
                        dx: r,
                        dy: c
                    })
                }
            }).mouseup(function() {
                n = !1,
                document.onselectstart = function() {
                    return ! 0
                }
            })
        }),
        {
            moveTo: function(e, t) {
                var s = i.limit({
                    x: e,
                    y: t
                });
                a.css({
                    left: s.x,
                    top: s.y
                })
            }
        }
    }
    if (! ($.browser.msie && $.browser.version <= 7 || -1 == $.inArray(window.cid, ["1", "7", "8", "16", "24"]))) {
        var i = {
            $placeholder: $("#sohuplayer"),
            $player: $("#player"),
            checkVisible: function(e) {
                var t = e || $(window),
                i = this.$placeholder,
                a = i.offset();
                a.width = i.width(),
                a.height = i.height() - 40;
                var s = {
                    left: t.scrollLeft(),
                    top: t.scrollTop(),
                    width: t.width(),
                    height: t.height()
                };
                return a.left < 0 ? "unknow": a.left + a.width > s.left && a.left < s.left + s.width && a.top + a.height > s.top && a.top < s.top + s.height ? "visible": "invisible"
            },
            currentSize: function() {
                var e = this.$player.width(),
                t = this.$player.height();
                return {
                    width: e,
                    height: t
                }
            },
            currentPoint: function() {
                if (!this.currentPoint.x || !this.currentPoint.y) {
                    var e = this.currentSize();
                    this.currentPoint.x = $(window).width() - e.width - 60,
                    this.currentPoint.y = $(window).height() - e.height - 10
                }
                return {
                    x: this.currentPoint.x,
                    y: this.currentPoint.y
                }
            },
            initMask: function() {
                var e = this,
                i = this.$mask,
                a = this.$player;
                if (! (i && i.length > 0)) {
                    var s = this.currentSize(),
                    l = this.currentPoint();
                    i = this.$mask = $('<div style="background:#000;cursor:move;display:none;"> </div>').appendTo("body"),
                    i.css({
                        position: "fixed",
                        width: s.width,
                        height: s.height,
                        left: l.x,
                        top: l.y,
                        opacity: 0,
                        "z-index": parseInt(a.css("z-index"), 10) + 1
                    }),
                    new t(i, {
                        limit: function(e) {
                            var t = 10,
                            a = $(window).width() - i.width() - 10,
                            s = 46,
                            l = $(window).height() - i.height() - 10;
                            return e.x = Math.max(e.x, t),
                            e.x = Math.min(e.x, a),
                            e.y = Math.max(e.y, s),
                            e.y = Math.min(e.y, l),
                            e
                        },
                        onDrag: function(t, i) {
                            e.currentPoint.x = i.left,
                            e.currentPoint.y = i.top,
                            e.$player.css({
                                left: i.left,
                                top: i.top
                            })
                        }
                    })
                }
                return i
            },
            ctrlBarVisible: function(e) {
                try {
                    this.$player[0].ctrlBarVisible(e)
                } catch(t) {}
            },
            open: function() {
                if ("normal" === e.play.player_status) {
                    this.$player.css({
                        position: "fixed",
                        "z-index": 80
                    }).addClass("floating");
                    var t = this.currentPoint();
                    this.$player.css({
                        left: t.x,
                        top: t.y
                    }),
                    this.ctrlBarVisible(0),
                    this.initMask(),
                    this.$mask && this.$mask.show(),
                    e.play.player_status = "floating",
                    e.pingback("http://click.hd.sohu.com.cn/s.gif?type=pg_showplayer_" + window.cid + "&expand5=" + window.playlistId + "&_=" + e.random())
                }
            },
            close: function() {
                "floating" === e.play.player_status && (this.$player.css({
                    position: "static",
                    top: "auto",
                    left: "auto",
                    "z-index": 1
                }).removeClass("floating"), this.ctrlBarVisible(1), this.$mask && this.$mask.hide(), e.play.player_status = "normal")
            },
            handler: function() {
                if (!e.play.player_islight || 0 != e.play.player_islight) {
                    var t = this.checkVisible();
                    "visible" === t ? this.close() : "invisible" === t && this.open()
                }
            }
        };
        messagebus.subscribe("play.onVideoPlayed",
        function() {
            var e = function(e) {
                var t = null,
                a = function() {
                    i.handler()
                };
                return function() {
                    clearTimeout(t),
                    t = setTimeout(a, e)
                }
            };
            $(window).bind("scroll", e(100))
        },
        null, null, {
            cache: !0
        })
    }
} (sohuHD);
var onRankLoaded = function(e) {
    $("#movieRank").html(sohuHD.play.watchRank(e, 10, !0))
},
tmpl = {
    modJlpAll: ["<%if(!newFlag){%>", '<div class="mod-info cfix">', '<ul class="cfix">', "<li>\u5267\u96c6\u5217\u8868</li>", "<li>\u89c6\u9891\u4fe1\u606f</li>", "</ul>", '<div class="vBox-warn" data-plid="<%=playlistId%>">', '<a href="#" class="vbtn vbtn-warned"><em>\u66f4\u65b0\u63d0\u9192</em></a>', '<div class="vCont">', '<p class="f-song">\u70b9\u51fb\u201c\u66f4\u65b0\u63d0\u9192\u201d\u89c6\u9891\u6709\u66f4\u65b0\u4f1a\u7b2c\u4e00\u65f6\u95f4\u63d0\u9192\u6211</p>', '<p class="ta-r"><a href="#">\u77e5\u9053\u4e86</a></p>', "</div>", "</div>", "</div>", "<%}%>", '<div class="info-con">', '<ul id="listBox" class="list-jlp cfix">', "<%for(var k=0,el; el=data.videos[k]; k++) {%>", '<%var _name=el.subName=="" ? el.name : el.subName;%>', "<li<%=el.vid==cvid ? ' class=\"on\"' : ' '%>>", '<p><a href="<%=el.pageUrl%>" title="<%=_name%>">', "<%if(sohuHD.isNewPub(el.publishTime)){%>", '	<em class="new"></em>', "<%}%>", "<%=sohuHD.strSub(_name,28)%>", '</a></p><span class="time">', "<%if(cid == 7){%>", "	<%=sohuHD.publishTime(el.showDate, el.publishTime)%>", "<%} else {%>", "	<%=sohuHD.formatPlayLength(el.playLength)%>", "<%}%>", "</span></li>", "<%}%>", "</ul>", "<%if(newFlag){%>", '<div class="warn-row cfix">', '<div class="warn c-black vBox-warn" data-plid="<%=playlistId%>"><a href="#" class="vbtn vbtn-warned"><em>\u66f4\u65b0\u63d0\u9192\u6211</em></a></div>', "<%}%>", '<div class="G-page1" id="pageContainer"></div>', "<%if(newFlag){%>", "</div>", "<%}%>", "</div>	"].join(""),
    modTvAll: ["<%if(!newFlag){%>", '<div class="mod-info cfix">', '<ul class="cfix">', "<li>\u5267\u96c6\u5217\u8868</li>", "<li>\u89c6\u9891\u4fe1\u606f</li>", "</ul>", '<div class="vBox-warn" data-plid="<%=playlistId%>">', '<a href="#" class="vbtn vbtn-warned"><em>\u66f4\u65b0\u63d0\u9192</em></a>', '<div class="vCont">', '<p class="f-song">\u70b9\u51fb\u201c\u66f4\u65b0\u63d0\u9192\u201d\u89c6\u9891\u6709\u66f4\u65b0\u4f1a\u7b2c\u4e00\u65f6\u95f4\u63d0\u9192\u6211</p>', '<p class="ta-r"><a href="#">\u77e5\u9053\u4e86</a></p>', "</div>", "</div>", "</div>", "<%}%>", '<div class="info-con">', '<ul id="listBox" class="juji-list cfix">', "<%for(var k=0,el; el=data.videos[k]; k++) {%>", '<%var _name=el.subName=="" ? el.name : el.subName;%>', "<li<%=el.vid==cvid ? ' class=\"on\"' : ' '%>>", '<a href="<%=el.pageUrl%>" title="<%=_name%>">', "<%if(sohuHD.isNewPub(el.publishTime)){%>", '	<em class="new"></em>', "<%}%>", "<%=el.order%>", "</a>", "</li>", "<%}%>", "</ul>", "<%if(newFlag){%>", '<div class="warn-row cfix">', '<div class="warn c-black vBox-warn" data-plid="<%=playlistId%>"><a href="#" class="vbtn vbtn-warned"><em>\u66f4\u65b0\u63d0\u9192\u6211</em></a></div>', "<%}%>", '<div class="G-page1" id="pageContainer"></div>', "<%if(newFlag){%>", "</div>", "<%}%>", "</div>	"].join(""),
    modMusicAll: ['<div class="ablumBox">', "<h6>\u4e13\u8f91\uff1a", '<%if(data.albumPageUrl==""){%>', "<%=data.albumName%>", "<%} else {%>", '<a href="<%=data.albumPageUrl%>" target="_blank"><%=data.albumName%></a>', "<%}%>", "</h6>", '<div class="aList scroll-bar" id="listBox">', '<ul class="cfix">', "<%for(var k=0,el; el=data.videos[k]; k++) {%>", '<%var _name= (el.subName=="" || cid=="13" || cid=="25") ? el.name : el.subName;%>', "<li<%=el.vid==cvid ? ' class=\"on\"' : ' '%>>", '<div class="pic">', '<a class="photo" href="<%=el.pageUrl%>" title="<%=_name%>">', "<%if(scroll) {%>", '<img width="80" height="60" alt="<%=_name%>" src="http://css.tv.itc.cn/global/images/loading-b.gif" lazySrc="<%=el.smallPicUrl%>" />', '<span class="videoBtn"></span>', "<%} else {%>", '<img src="<%=el.smallPicUrl%>" alt="<%=_name%>" width="80" height="60" />', "<%}%>", "</a>", "</div>", '<div class="txt">', '<strong><a href="<%=el.pageUrl%>"><%=_name%></a></strong>', '<p><span class="count pcount" rel="<%=el.vid%>"></span></p>', "</div>", "</li>", "<%}%>", "</ul>", "</div>", "</div>", '<div class="ablum-bar zhankai" id="listBtn"><em>\u6536\u8d77\u4e13\u8f91\u5217\u8868</em></div>'].join(""),
    modMyAll: ['<div class="mod-tit">', "</div>", '<div class="mod-wrap">', '<div class="mod-con" id="listBox">', '<ul class="list-jlp cfix">', "<%for(var k=0,el; el=data.videos[k]; k++) {%>", '<%var _name=el.subName=="" ? el.name : el.subName;%>', "<li<%=el.vid==cvid ? ' class=\"on\"' : ' '%>>", '<p><a href="<%=el.pageUrl%>" title="<%=_name%>">', "<%if(sohuHD.isNewPub(el.publishTime)){%>", '	<em class="new"></em><%=sohuHD.strSub(_name,28)%>', "<%} else {%>", "<%=sohuHD.strSub(_name,30)%>", "<%}%>", '</a></p><span class="time"><%=sohuHD.formatPlayLength(el.playLength)%></span></li>', "<%}%>", "</ul>", "</div>	", '<div class="mod-bot cfix" id="pageContainer"></div>', "</div>"].join(""),
    modJlpPage: ['<ul id="listBox" class="list-jlp cfix">', "<%for(var k=0,el; el=data.videos[k]; k++) {%>", '<%var _name= (el.subName=="") ? el.name : el.subName;%>', "<li<%=el.vid==cvid ? ' class=\"on\"' : ' '%>>", '<p><a href="<%=el.pageUrl%>" title="<%=_name%>">', "<%if(sohuHD.isNewPub(el.publishTime)){%>", '	<em class="new"></em>', "<%}%> ", "<%=sohuHD.strSub(_name,28)%>", '</a></p><span class="time">', "<%if(cid == 7){%>", "	<%=sohuHD.publishTime(el.showDate, el.publishTime)%>", "<%} else {%>", "	<%=sohuHD.formatPlayLength(el.playLength)%>", "<%}%>", "</span></li>", "<%}%>", "</ul>"].join(""),
    modMyPage: ['<ul class="list-jlp cfix">', "<%for(var k=0,el; el=data.videos[k]; k++) {%>", '<%var _name= (el.subName=="") ? el.name : el.subName;%>', "<li<%=el.vid==cvid ? ' class=\"on\"' : ' '%>>", '<p><a href="<%=el.pageUrl%>" title="<%=_name%>">', "<%if(sohuHD.isNewPub(el.publishTime)){%>", '	<em class="new"></em><%=sohuHD.strSub(_name,28)%>', "<%} else {%>", "<%=sohuHD.strSub(_name,30)%>", "<%}%>", '</a></p><span class="time"><%=sohuHD.formatPlayLength(el.playLength)%></span></li>', "<%}%>", "</ul>"].join(""),
    modTvPage: ['<ul id="listBox" class="list-jlp cfix">', "<%for(var k=0,el; el=data.videos[k]; k++) {%>", '<%var _name= (el.subName=="") ? el.name : el.subName;%>', "<li<%=el.vid==cvid ? ' class=\"on\"' : ' '%>>", '<a href="<%=el.pageUrl%>" title="<%=_name%>">', "<%if(sohuHD.isNewPub(el.publishTime)){%>", '	<em class="new"></em>', "<%}%> ", "<%=el.order%>", "</a>", "</li>", "<%}%>", "</ul>"].join("")
};
tmpl.modComicPage = ["", '<ul class="cfix">', '<%var _target = (data.playlistid == window["o_playlistId"]?"_blank":"_self"); %>', "<%for(var k = 0, el; el = data.videos[k]; k++) {%>", '<%var _name = el.subName=="" ? el.name : el.subName;%>', "<li <%=el.vid == cvid ? ' class=\"on\"' : ' '%>>", "<%if(data.cid == 16 && isPh == false){%>", '<a href="<%=el.pageUrl%>" title="<%=_name%>" target="<%=_target%>"><%=el.order%></a>', "<%}else{%>", '<a href="<%=el.pageUrl%>" title="<%=_name%>" target="<%=_target%>"><p><%=_name%></p></a>', '<span class="time">', "<%if(data.cid == 7){%>", "<%=sohuHD.publishTime(el.showDate, el.publishTime)%>", "<%} else {%>", "<%=sohuHD.formatPlayLength(el.playLength)%>", "<%}%>", "</span>", "<%}%>", "<%if(sohuHD.isNewPub(el.publishTime)){%>", '<em class="cnew"></em>', "<%}%>", "</li>", "<%}%>", "</ul>"].join(""),
tmpl.modComicTab = ["", "<% var _totalCount = totalCount || data.size; %>", "<% var _groupSize  = groupSize; %>", "<% var _groupCount = Math.ceil(_totalCount / _groupSize); %>", "<% var _groupGetHL = function(i) { return { l: (i-1) * _groupSize + 1, h: Math.min(_totalCount, i * _groupSize)}; }; %>", '<ul class="comics-tab">', "<%for(var i = _groupCount,j=1; i >= 1; i--,j++){%>", "<%var hl = _groupGetHL(i);%>", "<%if(j>3 && _groupCount-j >= 1){%>", "<li data-dropdown>", '<span class="cmpage"><%=_groupSize%>-1</span>', '<div class="cm-opt">', '<div class="grid">', "<% while(i >= 1) {%>", '<a class="cm-item" data-tab-index="<%=i%>" href="#"><%=hl.h%>-<%=hl.l%></a>', "<%i--;%>", "<%hl = _groupGetHL(i);%>", "<%}%>", "</div>", "</div>", "</li>", "<%}else{%>", '<li data-tab-index="<%=i%>"><%=hl.h%>-<%=hl.l%></li>', "<%}%>", "<%}%>", "</ul>"].join(""),
tmpl.modComicBox = ["", "<div id=\"<%=elemId%>\" class=\"<%=(data.cid == 16 && isPh == false)?'comicsList':'zyiList'%> scroll-bar\">", tmpl.modComicPage, "</div>", tmpl.modComicTab, "<%if(data.cid == 16 && isPh == false){%>", '<div id="comicRecomm" class="comics-recomm">', "<ul>", '<%if(window["playlistId"] == 1007474) {%>', '<li><a href="http://tv.sohu.com/20140405/n397794861.shtml" target="_blank" title="\u300a\u866b\u5e08\u7eed\u7ae0\u300b \u4e2d\u56fd\u5927\u9646\u6b63\u7248\u72ec\u64ad" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>\u300a\u866b\u5e08\u7eed\u7ae0\u300b \u4e2d\u56fd\u5927\u9646\u6b63\u7248\u72ec\u64ad</a></li>', '<li><a href="http://tv.sohu.com/20111223/n330048227.shtml" target="_blank" title="\u300a\u5996\u7cbe\u7684\u5c3e\u5df4\u300b \u540c\u6b65\u65e5\u672c\u72ec\u5bb6\u732e\u6620" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>\u300a\u5996\u7cbe\u7684\u5c3e\u5df4\u300b \u540c\u6b65\u65e5\u672c\u72ec\u5bb6\u732e\u6620</a></li>', '<%} else if(window["playlistId"] == 6648122) {%>', '<li><a href="http://tv.sohu.com/20130415/n372763492.shtml" target="_blank" title="\u300aOne Piece\u300b\u4e2d\u56fd\u5927\u9646\u300a\u822a\u6d77\u738b\u300b" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>\u300aOne Piece\u300b\u4e2d\u56fd\u5927\u9646\u300a\u822a\u6d77\u738b\u300b</a></li>', '<li><a href="http://tv.sohu.com/20111223/n330048227.shtml" target="_blank" title="\u300a\u5996\u7cbe\u7684\u5c3e\u5df4\u300b \u540c\u6b65\u65e5\u672c\u72ec\u5bb6\u732e\u6620" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>\u300a\u5996\u7cbe\u7684\u5c3e\u5df4\u300b \u540c\u6b65\u65e5\u672c\u72ec\u5bb6\u732e\u6620</a></li>', '<%} else if(window["playlistId"] == 1007177) {%>', '<li><a href="http://tv.sohu.com/20140405/n397794861.shtml" target="_blank" title="\u300a\u866b\u5e08\u7eed\u7ae0\u300b \u4e2d\u56fd\u5927\u9646\u6b63\u7248\u72ec\u64ad" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>\u300a\u866b\u5e08\u7eed\u7ae0\u300b \u4e2d\u56fd\u5927\u9646\u6b63\u7248\u72ec\u64ad</a></li>', '<li><a href="http://tv.sohu.com/20130415/n372763492.shtml" target="_blank" title="\u300aOne Piece\u300b\u4e2d\u56fd\u5927\u9646\u300a\u822a\u6d77\u738b\u300b" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>\u300aOne Piece\u300b\u4e2d\u56fd\u5927\u9646\u300a\u822a\u6d77\u738b\u300b</a></li>', "<%} else {%>", '<li><a href="http://tv.sohu.com/20140405/n397794861.shtml" target="_blank" title="\u300a\u866b\u5e08\u7eed\u7ae0\u300b \u4e2d\u56fd\u5927\u9646\u6b63\u7248\u72ec\u64ad" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>\u300a\u866b\u5e08\u7eed\u7ae0\u300b \u4e2d\u56fd\u5927\u9646\u6b63\u7248\u72ec\u64ad</a></li>', '<li><a href="http://tv.sohu.com/20130415/n372763492.shtml" target="_blank" title="\u300aOne Piece\u300b\u4e2d\u56fd\u5927\u9646\u300a\u822a\u6d77\u738b\u300b" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>\u300aOne Piece\u300b\u4e2d\u56fd\u5927\u9646\u300a\u822a\u6d77\u738b\u300b</a></li>', "<%}%>", '<li><a href="http://tv.sohu.com/20130415/n372763492.shtml" target="_blank" title="\u300aOne Piece\u300b\u4e2d\u56fd\u5927\u9646\u300a\u822a\u6d77\u738b\u300b" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>\u300aOne Piece\u300b\u4e2d\u56fd\u5927\u9646\u300a\u822a\u6d77\u738b\u300b</a></li>', "</ul>", "</div>", "<%}%>"].join(""),
tmpl.modComicAll = ["", '<div class="ablumBox">', '<div class="cfix titWarn">', '<div class="comTab l">', '<span data-tab="albumList-tab-vlist" class="ton">\u5267\u96c6\u5217\u8868</span>', '<%if(window["cid"] == 16 && window["o_playlistId"] && window["o_playlistId"].length > 0){%>', '<span data-tab="albumList-tab-phlist">\u76f8\u5173\u89c6\u9891</span>', "<%}%>", "</div>", '<div class="warn-row r">', '<div data-plid="<%=data.playlistid%>" class="warn c-black vBox-warn">', '<a class="vbtn" href="#"><em>\u66f4\u65b0\u63d0\u9192\u6211</em></a>', "</div>", "</div>", "</div>", '<div class="tabCont ton" data-tab="albumList-box-vlist">', tmpl.modComicBox, "</div>", '<%if(window["cid"] == 16 && window["o_playlistId"] && window["o_playlistId"].length > 0){%>', '<div class="tabCont" data-tab="albumList-box-phlist"> </div>', "<%}%>", "</div>", '<div class="ablum-bar zhankai" id="listBtn"><em>\u6536\u8d77\u4e13\u8f91\u5217\u8868</em></div>'].join(""),
sohuHD.play = {
    videoInfo: {
        totalcount: 1,
        lasttitle: "",
        lasturl: "",
        thistitle: "",
        thisurl: document.location.href,
        nexturl: "",
        nexttitle: ""
    },
    size: 0,
    duration: "0",
    currentPage: 1,
    totalPage: 1,
    isEnd: !1,
    listData: {},
    isWideMod: !1,
    $playlist: $("#playlist"),
    player_status: "normal",
    player_islight: "1",
    getEnumCls: function() {
        return "2" != cid && "16" != cid || "1" != pianhua ? CatgoryEnum[cid] ? CatgoryEnum[cid].cls: CatgoryEnum["0"].cls: "modComic"
    },
    getEnumOrder: function() {
        return CatgoryEnum[cid] ? CatgoryEnum[cid].order: CatgoryEnum["0"].order
    },
    getEnumSize: function() {
        var e = 0;
        return $(window).width() > 1140 && "undefined" == typeof pagetype ? "2" != cid && "16" != cid || "1" != pianhua ? (e = CatgoryEnum[cid] ? CatgoryEnum[cid].w1140: CatgoryEnum["0"].w1140, sohuHD.play.size = e, e) : (e = CatgoryEnum["7"].w1140, sohuHD.play.size = e, e) : "2" != cid && "16" != cid || "1" != pianhua ? (e = CatgoryEnum[cid] ? CatgoryEnum[cid].w980: CatgoryEnum["0"].w980, sohuHD.play.size = e, e) : (e = CatgoryEnum["7"].w980, sohuHD.play.size = e, e)
    },
    getEnumWide: function() {
        return CatgoryEnum[cid] ? CatgoryEnum[cid].wide: CatgoryEnum["0"].wide
    },
    isScrollMod: function() {
        return "modMusic" == this.getEnumCls() ? !0 : !1
    },
    getLastVideoLinkCallback: function(e) { ! e || !e.videos || e.videos && e.videos.length < 1 || (this.listData[this.currentPage - 1] = e, this.videoInfo.lasturl = e.videos[e.videos.length - 1].pageUrl, this.videoInfo.lasttitle = e.videos[e.videos.length - 1].name)
    },
    getNextVideoLinkCallback: function(e) { ! e || !e.videos || e.videos && e.videos.length < 1 || (this.listData[this.currentPage + 1] = e, this.videoInfo.nexturl = e.videos[0].pageUrl, this.videoInfo.nexttitle = e.videos[0].name)
    },
    showPlayListOnePage: function(e) {
        if (e && e.videos && !(e.videos && e.videos.length < 1)) {
            this.listData[this.currentPage] = e;
            var t = this.getEnumCls(),
            i = {
                data: e,
                cvid: vid,
                isPh: "1" == window.pianhua,
                totalCount: e.size,
                groupSize: this.size
            };
            $("#listBox").html(sohuHD.tmpl(tmpl[t + "Page"], i))
        }
    },
    getPlayListOnePage: function(e) {
        if (sohuHD.play.currentPage = e, sohuHD.play.listData[e]) return sohuHD.play.showPlayListOnePage(sohuHD.play.listData[e]),
        void 0;
        var t = sohuHD.play.size,
        i = sohuHD.play.getEnumOrder(),
        a = "";
        a = "9001" == cid ? "http://my.tv.sohu.com/play/getvideolist.do?": "http://pl.hd.sohu.com/videolist?",
        sohuHD.getScript(a + "playlistid=" + playlistId + "&pagenum=" + e + "&pagesize=" + parseInt(t) + "&order=" + i + "&callback=sohuHD.play.showPlayListOnePage")
    },
    showPlayListBox: function(e) {
        if (!e || !e.videos || ("modMusic" != sohuHD.play.getEnumCls() || "modComic" != sohuHD.play.getEnumCls()) && e.size < 2) return this.infoEvent(!0),
        $("#list").hide(),
        $(".s1-tab").addClass("on"),
        $(".s2-tab").remove(),
        void 0;
        $(".s2-tab").show();
        var t = this.getEnumCls();
        this.$playlist.addClass(t),
        this.currentPage = e.currentPage,
        this.videoInfo.totalcount = e.size,
        e.totalSet == e.size && (this.isEnd = !0);
        var i = {
            data: e,
            scroll: this.isScrollMod(),
            cvid: vid,
            newFlag: $(".info-tab").length,
            elemId: "listBox",
            isPh: "1" == window.pianhua,
            totalCount: e.size,
            groupSize: this.size
        },
        a = sohuHD.tmpl(tmpl[t + "All"], i);
        $("#list").html(a).show(),
        sohuHD.play.listData[this.currentPage] = e,
        this.infoEvent(),
        this.pageEvent(e),
        this.setVideoInfo(this.size, this.getEnumOrder()),
        messagebus.publish("play.playlistloaded", e)
    },
    initList: function() {
        var e = window.vid,
        t = this.getEnumSize(),
        i = this.getEnumOrder(),
        a = "http://pl.hd.sohu.com/videolist?";
        "9001" == cid && (a = "http://my.tv.sohu.com/play/getvideolist.do?", _videoInfo.from && "1" == _videoInfo.from && (e = "v" + e)),
        sohuHD.getScript(a + "playlistid=" + playlistId + "&pagesize=" + parseInt(t) + "&order=" + i + "&callback=sohuHD.play.showPlayListBox&vid=" + e)
    },
    infoEvent: function(e) {
        if (e || 0 == sohuHD.play.size || "modMusic" == sohuHD.play.getEnumCls() || "modComic" == sohuHD.play.getEnumCls()) $(".s2-tab").remove(),
        $(".s1-tab").addClass("on"),
        $("#playlist .info-con").show(),
        $(".intro .info-arrT").click(function() {
            return $(".intro").hasClass("open") ? ($(".intro").removeClass("open"), $(this).text("\u5c55\u5f00\u4fe1\u606f"), $(".info .h").hide()) : ($(".intro").addClass("open"), $(this).text("\u6536\u8d77\u4fe1\u606f"), $(".info .h").show()),
            !1
        });
        else {
            $("#playlist .intro").addClass("open"),
            $(".info .h").show(),
            $(".intro .info-arrT").hide();
            var t = $(".info-tab").length ? $("#playerBar .info-tab li") : $("#playlist .mod-info li");
            sohuHD.switchTab(t, {
                cssName: "on",
                boxs: $(".info-con"),
                start: $(".info-tab").length
            })
        }
    },
    pageEvent: function(e) {
        if (this.isScrollMod()) {
            var t = $("#listBox"),
            i = t.find("li"),
            a = i.length,
            s = i.outerHeight() + parseInt(i.css("marginBottom").substring(0, i.css("marginBottom").length - 2)) + parseInt(i.css("marginTop").substring(0, i.css("marginTop").length - 2)),
            l = function(e) {
                for (var t = parseInt(e.scrollTop() / s), i = [], l = t; t + 8 > l; l++) if (a > l) {
                    var o = e.find("img").eq(l);
                    o && "" != o.attr("lazySrc") && i.push(o[0])
                }
                sohuHD.lazyImage(i, 300)
            };
            t.scroll(function() {
                l(t)
            });
            var o = -1 == i.index(t.find("li.on")) ? 0 : i.index(t.find("li.on"));
            a > 6 ? $("#listBox").scrollTop(1 + o * s) : l(t)
        } else {
            var n = e.size / sohuHD.play.size;
            if (sohuHD.play.totalPage = n > parseInt(n) ? parseInt(n) + 1 : n, "modComic" === this.getEnumCls()) {
                var r = this.$playlist,
                c = this.currentPage,
                d = {
                    __cached: {},
                    initGroupTabEvent: function(e, t) {
                        e.on("click", "[data-tab-index]",
                        function() {
                            var i = $(this);
                            if (i.hasClass("cur")) return ! 1;
                            var a = e.find("[data-dropdown]"),
                            s = e.find("[data-tab-index]");
                            return s.removeClass("cur"),
                            a.removeClass("cur").removeClass("dropon"),
                            i.addClass("cur"),
                            i.hasClass("cm-item") && (i.parents("li").find(".cmpage").html(i.html()), a.addClass("cur")),
                            "function" == typeof t && t(i.attr("data-tab-index")),
                            sohuHD.pingback("http://click.hd.sohu.com.cn/s.gif?type=pg_playlist_fy_" + cid + "_v20130724&expand5=" + playlistId + "&_=" + sohuHD.random()),
                            !1
                        }),
                        e.on("click", "[data-dropdown]",
                        function() {
                            var e = $(this);
                            return e.addClass("dropon"),
                            sohuHD.pingback("http://click.hd.sohu.com.cn/s.gif?type=pg_playlist_fytab_" + cid + "_v20130724&expand5=" + playlistId + "&_=" + sohuHD.random()),
                            $("body").one("click",
                            function() {
                                e.removeClass("dropon")
                            }),
                            !1
                        })
                    },
                    getPHListData: function(e, t, i) {
                        var a = $.Deferred();
                        if (d.__cached[e]) window.setTimeout(function() {
                            a.resolve(d.__cached[e])
                        },
                        0);
                        else {
                            var s = "http://pl.hd.sohu.com/videolist?playlistid=" + window.o_playlistId + "&pagenum=" + parseInt(e, 10) + "&pagesize=" + parseInt(t, 10) + "&order=" + (i || 0) + "&callback=?";
                            $.getJSON(s).done(function(t) {
                                d.__cached[e] = t,
                                a.resolve(t)
                            }).fail(function() {
                                a.reject()
                            })
                        }
                        return a.promise()
                    }
                },
                u = new sohuHD.UI.Tab({
                    container: r,
                    name: "albumList"
                });
                u.one("active.vlist",
                function(e, t) {
                    var i = t.$boxElem,
                    a = $("#listBox");
                    d.initGroupTabEvent(i,
                    function(e) {
                        sohuHD.play.getPlayListOnePage(e)
                    }),
                    i.find('[data-tab-index="' + c + '"]').trigger("click"),
                    a.scrollTop(a.find("ul>li.on").position().top)
                }),
                u.one("active.phlist",
                function(e, t) {
                    var i = t.$boxElem,
                    a = 0,
                    s = 100,
                    l = function(e) {
                        d.getPHListData(e, s).done(function(e) {
                            i.find(">div").html(sohuHD.tmpl(tmpl.modComicPage, {
                                data: e,
                                cvid: null,
                                isPh: !0,
                                totalCount: a,
                                groupSize: s
                            }))
                        })
                    };
                    d.getPHListData(1, 100).done(function(e) {
                        a = e.size,
                        s = 100,
                        i.html(sohuHD.tmpl(tmpl.modComicBox, {
                            data: e,
                            cvid: null,
                            elemId: "listBoxPh",
                            isPh: !0,
                            totalCount: a,
                            groupSize: s
                        })),
                        d.initGroupTabEvent(i, l),
                        i.find('[data-tab-index="1"]').trigger("click")
                    })
                }),
                r.on("click", "[data-tab]",
                function() {
                    var e = $(this).attr("data-tab").split("-"),
                    t = (e[0], e[1], e[2]);
                    u.active(t)
                }),
                u.active("vlist")
            } else window.kao("paging",
            function() {
                sohuHD.play.page = new sohuHD.Pagination({
                    id: "pageContainer",
                    total: sohuHD.play.totalPage,
                    current: sohuHD.play.currentPage,
                    shownFirstLast: !0,
                    handle: sohuHD.play.getPlayListOnePage
                }),
                sohuHD.play.page.init()
            })
        }
    },
    setVideoInfo: function(e, t) {
        var i = "";
        if (i = "9001" == cid ? "http://my.tv.sohu.com/play/getvideolist.do?": "http://pl.hd.sohu.com/videolist?", $("#listBox li.on").next().length > 0) this.videoInfo.nexturl = $("#listBox li.on").next().find("a").attr("href"),
        this.videoInfo.nexttitle = $("#listBox li.on").next().find("a").attr("title");
        else if (this.videoInfo.nexturl = "", this.videoInfo.nexttitle = "", this.isScrollMod()) this.videoInfo.nexturl = $("#listBox li").eq(0).find("a").attr("href"),
        this.videoInfo.nexttitle = $("#listBox li").eq(0).find("a").attr("title");
        else if (this.currentPage != this.totalPage) {
            var a = this.currentPage / 1 + 1;
            this.listData[a] ? this.getNextVideoLinkCallback(this.listData[a]) : sohuHD.getScript(i + "playlistid=" + playlistId + "&pagenum=" + a + "&pagesize=" + parseInt(e) + "&order=" + t + "&callback=sohuHD.play.getNextVideoLinkCallback")
        }
        if ($("#listBox li.on").length > 0 && (this.videoInfo.thisurl = $("#listBox li.on").find("a").attr("href"), this.videoInfo.thistitle = $("#listBox li.on").find("a").attr("title")), $("#listBox li.on").prev().length > 0) this.videoInfo.lasturl = $("#listBox li.on").prev().find("a").attr("href"),
        this.videoInfo.lasttitle = $("#listBox li.on").prev().find("a").attr("title");
        else if (this.videoInfo.lasturl = "", this.videoInfo.lasttitle = "", this.isScrollMod());
        else if (1 != this.currentPage) {
            var a = this.currentPage / 1 - 1;
            this.listData[a] ? this.getLastVideoLinkCallback(this.listData[a]) : sohuHD.getScript(i + "playlistid=" + playlistId + "&pagenum=" + a + "&pagesize=" + parseInt(e) + "&order=" + t + "&callback=sohuHD.play.getLastVideoLinkCallback")
        }
    },
    watchRank: function(e, t, i, a) {
        var s = e.videos,
        l = s.length,
        o = l > t ? t: l,
        n = "",
        r = "",
        c = "",
        d = [];
        if (i) {
            d = ['<ul class="clist cfix clistL">'];
            for (var u = 0; 5 > u; u++) n = s[u].tv_name,
            r = sohuHD.strSub(n, 16, !0, ".."),
            c = s[u].videoUrl || s[u].tv_url,
            a && (c += "?src=" + a),
            d.push('<li><a href="', c, '" target="_blank" title="', n, '">', r, "</a></li>");
            d.push("</ul>"),
            d.push('<ul class="clist cfix clistR">');
            for (var u = 5; o > u; u++) n = s[u].tv_name,
            r = sohuHD.strSub(n, 16, !0, ".."),
            c = s[u].videoUrl || s[u].tv_url,
            a && (c += "?src=" + a),
            d.push('<li><a href="', c, '" target="_blank" title="', n, '">', r, "</a></li>");
            d.push("</ul>")
        } else {
            d = ['<ul class="clist cfix">'];
            for (var u = 0; o > u; u++) n = s[u].tv_name,
            r = sohuHD.strSub(n, 30, !0, ".."),
            c = s[u].videoUrl || s[u].tv_url,
            a && (c += "?src=" + a),
            d.push('<li><a href="', c, '" target="_blank" title="', n, '">', r, "</a></li>");
            d.push("</ul>")
        }
        return d.join("")
    }
},
sohuHD.searchNewTag = function(e, t, i, a) {
    var s = e,
    l = "25" == i ? 122 : i;
    typeurl = "http://so.tv.sohu.com/list_p1" + l,
    s = escape(s).replace(/%/g, "_");
    var o = "",
    n = "",
    r = "",
    c = "",
    d = "",
    u = "",
    p = "",
    h = "";
    switch (t) {
    case 4:
    case 12:
        o = s;
        break;
    case 7:
        n = s;
        break;
    case 10:
        r = s;
        break;
    case 13:
        h = s;
        break;
    case 15:
        "2" == i || "1" == i || "16" == i ? d = s: u = s;
        break;
    case 11:
        c = s;
        break;
    default:
        u = s
    }
    var m = a ? "": "_blank";
    sohuHD.redirect([typeurl, "_p2", n, "_p3", o, , "_p4", d, "_p5", r, "_p6", c, "_p7", p, "_p8_p9_p10_p11", h, ".html"].join(""), m)
},
sohuHD.searchKey = function(e, t, i, a) {
    var s = "";
    if (s = "object" == typeof e ? e.innerHTML: e, t = t || "", t = parseInt(t), i = i || "", /4|7|10|11|12|13/.test(t.toString()) || "15" == t && /1|2|16/.test(i)) return sohuHD.searchNewTag(s, t, i, a),
    void 0;
    var l = "mts?&c=" + i + "&f=js";
    switch (t) {
    case 4:
        l += "&area=";
        break;
    case 7:
        l += "&cat=";
        break;
    case 10:
        l += "&cs=";
        break;
    case 15:
        l += "2" == i || "1" == i ? "&year=": "&wd=";
        break;
    case 11:
        l += "&age=";
        break;
    case 13:
        l += "&language=";
        break;
    default:
        l += "&wd="
    }
    s = escape(s);
    var o = a ? "": "_blank";
    sohuHD.redirect("http://so.tv.sohu.com/" + l + s, o)
},
sohuHD.formatPlayLength = function(e) {
    function t(e) {
        return e > 0 ? e / 10 >= 1 ? e: "0" + e: "00"
    }
    return m = parseInt(e / 60),
    s = parseInt(e - 60 * m),
    t(m) + ":" + t(s)
},
sohuHD.isNewPub = function(e) {
    var t = e.split("-"),
    i = "0" == t[1].substr(0, 1) ? parseInt(t[1].substr(1, 1)) - 1 : parseInt(t[1]) - 1,
    a = parseInt((new Date - new Date(t[0], i, t[2])) / 1e3 / 60 / 60 / 24);
    return a >= 0 && 2 > a ? !0 : !1
},
sohuHD.publishTime = function(e, t) {
    var i = e || t;
    if ("string" == typeof i) {
        var a = i.match(/(\d{4})(\d{2})(\d{2})/);
        return a ? a.slice(1).join("-") : t
    }
    return ""
},
messagebus.subscribe("core.loaded_begin",
function() {}),
messagebus.subscribe("core.loaded_first_screen",
function() {
    var e = function() {
        var e = sohuHD.getElem("player") || sohuHD.getElem("player_ob"),
        t = {
            pauseVideo: function() {
                e && e.pauseVideo && e.pauseVideo()
            },
            playVideo: function() {
                e && e.playVideo && e.playVideo()
            },
            playedTime: function() {
                return e && e.playedTime ? parseInt(e.playedTime()) : 0
            },
            getPlayCount: function() {
                return e && e.getCount ? e.getCount() : "wait"
            },
            seekTo: function(t) {
                e && e.seekTo && e.seekTo(t)
            },
            on: function(e, i) {
                return messagebus.subscribe("play." + e, i, t),
                t
            }
        };
        return t
    } (),
    t = sohuHD.getElem("playtoolbar");
    t && kao("playtoolbar",
    function() {
        sohuHD.initPlayToolbar(t, {
            player: e,
            info: {}
        })
    })
},
null, null, {
    cache: !0
}),
messagebus.subscribe("play.onVideoPlayed",
function() {
    $("#player").length > 0 && (sohuHD.play.totalTime = $("#player")[0].videoTotTime()),
    window._openSmallWin = function() {
        var e = sohuHD.play.videoInfo,
        t = !1;
        try {
            sohuHD._smallWin.document && (t = !0)
        } catch(i) {}
        if (t) return sohuHD._smallWin.focus(),
        !1;
        var a = document.getElementById("player"),
        s = 0;
        try {
            s = a.playedTime(),
            a.pauseVideo()
        } catch(i) {}
        var l = new SWFObject(sohuHD.playerUrl, "player", "100%", "100%", "9,0,115", "#000000");
        l.flashVars = "",
        l.addParam("allowscriptaccess", "always"),
        l.addParam("allowfullscreen", "true"),
        l.addParam("wmode", "Opaque"),
        l.addVariable("skin", "0"),
        l.addVariable("pageurl", sohuHD.play.videoInfo.thisurl),
        l.addVariable("cover", window.cover),
        l.addVariable("vid", window.vid),
        l.addVariable("nid", window.nid),
        l.addVariable("pid", window.pid),
        l.addVariable("seekTo", s),
        l.addVariable("jump", "0"),
        l.addVariable("shareBtn", "1"),
        l.addVariable("autoplay", !0);
        var o = sohuHD.cookie("SUV");
        l.addVariable("sid", o);
        var n = l.getFlashHtml();
        sohuHD._smallWin = window.open("", "_s_newin", ["width=980,height=515,toolbar=0,location=0,directories=0,status=0,menubar=0,scrollbars=0,resizable=1"].join("")),
        sohuHD.pingback("http://220.181.61.231/get.gif?type=miniwin&r=" + (new Date).getTime()),
        sohuHD._checkSmallWin = function() {
            var t = 1;
            try {
                t = sohuHD._smallWin.document.getElementById("player").playedTime(),
                1 > t && (t = 1)
            } catch(i) {
                t = document.getElementById("player").playedTime()
            }
            sohuHD._smallWinTimer = setTimeout(function() {
                var i = e.thistime - document.getElementById("player").playedTime();
                parseInt(i, 10) > 300 && document.getElementById("player").seekTo(t),
                sohuHD._smallWin = null
            },
            500)
        },
        sohuHD._smallWin.document.write(["<body style='margin:0;'>", n, "<script>try{window.opener.clearTimeout(window.opener.sohuHD._smallWinTimer);}catch(e){}window.onbeforeunload=function(){window.opener.sohuHD._checkSmallWin();}</script></body>"].join(""))
    }
},
window, null, {
    cache: !0
}),
messagebus.subscribe("core.loaded_left",
function() {
    var e = {
        1 : "20092852"
    };
    window.tuijianCall = function(t) {
        var i = [];
        t.data && t.data[e[cid]] && ($.each(t.data[e[cid]],
        function(e, t) {
            i.push('<li class="pwatch" rel="' + t.vid + '">', '<div class="pic"><a title="', t.title, '" href="', t.link, '" target="_blank" class="apic"><img width="140" height="190" alt="', t.title, '"  class="" lazysrc="', t.pic, '" src="http://css.tv.itc.cn/global/images/transparent.png"></a><a class="super" title="\u9ad8\u6e05">\u9ad8\u6e05</a> </div>', '<strong><a title="', t.title, '" href="', t.link, '" target="_blank">', t.title, "</a></strong> ", "</li>")
        }), $("#tuijian ul").html(i.join("")), $("#tuijian").length && sohuHD.seed({
            dom: $("#tuijian"),
            callback: function() {
                sohuHD.lazyImage($("#tuijian .pic img"), 0)
            }
        }), messagebus.publish("play.loaded_tuijian_data"))
    },
    e[cid] && sohuHD.getScript("http://pl.hd.sohu.com/recommend_frag?ids=" + e[cid] + "&types=2&nos=10&callback=tuijianCall");
    var t = function() {
        "" != sohuHD.passport.getPassport() ? $(".adv .playad").hide() : document.documentElement.clientWidth > 1140 ? $.each($(".adv .playad"),
        function() {
            $(this).parents(".adv").find(".crossPage").length && $(this).show()
        }) : $(".adv .playad").hide()
    };
    t(),
    $(window).bind("resize", t),
    sohuHD.play.videoInfo.thisurl = location.href,
    sohuHD.play.videoInfo.thistitle = document.title.split("-")[0],
    "0" == sohuHD.play.getEnumSize() || "undefined" != typeof pagetype && "report" == pagetype ? sohuHD.play.infoEvent(!0) : sohuHD.play.initList(),
    $("#hotzy").length && sohuHD.seed({
        dom: $("#hotzy"),
        callback: function() {
            sohuHD.lazyImage($("#hotzy .pic img"), 0)
        }
    }),
    $("#weekrank").length && sohuHD.seed({
        dom: $("#weekrank"),
        callback: function() {
            sohuHD.lazyImage($("#weekrank .pic img"), 0)
        }
    }),
    $("#tuijian").length && sohuHD.seed({
        dom: $("#tuijian"),
        callback: function() {
            sohuHD.lazyImage($("#tuijian .pic img"), 0)
        }
    }),
    $("#vip").length && sohuHD.seed({
        dom: $("#vip"),
        callback: function() {
            sohuHD.lazyImage($("#vip .pic img"), 0)
        }
    }),
    $("#musichotzt").length && sohuHD.seed({
        dom: $("#musichotzt"),
        callback: function() {
            sohuHD.lazyImage($("#musichotzt .pic img"), 0)
        }
    }),
    $("#hottv").length && sohuHD.seed({
        dom: $("#hottv"),
        callback: function() {
            sohuHD.lazyImage($("#hottv .pic img"), 0)
        }
    }),
    $("#globalhottv").length && sohuHD.seed({
        dom: $("#globalhottv"),
        callback: function() {
            sohuHD.lazyImage($("#globalhottv .pic img"), 0)
        }
    });
    var i = "9001" == cid ? _videoInfo.tag: "undefined" == typeof tag ? "": tag;
    if ($("#similar").length > 0) {
        var a = 0,
        s = 0,
        l = sohuHD.cookie("SUV") || "";
        s = l ? parseInt(l.substring(l.length - 2, l.length), 10) : parseInt(100 * Math.random()),
        25 > s ? a = 0 : 50 > s ? a = 1 : 75 > s ? a = 2 : 85 > s ? a = 3 : 95 > s ? a = 4 : 100 > s && (a = 5);
        var o = 10;
        recommArea.isEnable() && (o = 15),
        sohuHD.getScript("http://search.vrs.sohu.com/p?title=" + escape(escape($(".location strong").text() || $("#crumbsBar h2").text())) + "&tag=" + escape(escape(i)) + "&vid=" + vid + "&cid=" + cid + "&pid=" + playlistId + "&u=" + sohuHD.cookie("fuid") + "&y=" + sohuHD.cookie("YYID") + "&p=" + sohuHD.passport.getPassport() + "&pageNum=1&pageSize=" + o + "&source=20&cateid=&cate=&var=similar&test=2&ab=" + a,
        function() {
            if ("undefined" == typeof similar) return ! 1;
            messagebus.publish("play.loaded_similar_data", similar),
            kao("pingback",
            function() {
                {
                    var e = {
                        pingback_container: document.getElementById("similar"),
                        pingback_type: "play",
                        pingback_ab: a,
                        attr: "videos"
                    };
                    $.extend(similar, e)
                }
                pingbackBundle.init("c", similar)
            });
            var e, t, i = [],
            s = "";
            $.each(similar.videos,
            function(a, l) {
                return recommArea.isEnable() && 5 > a ? !0 : (e = Math.floor(l.videoPlayTime / 60), t = l.videoPlayTime - 60 * e, s = "1" == l.type ? l.videoAlbumPic1: l.videoPic7, s = "" == s ? l.videoBigPic: s, i.push('<li class="pwatch" rel="' + l.id + '">', '<div class="pic">', '<a target="_blank" href="', l.videoUrl, '" title="', l.videoName, '" class="spic">', '<img src="http://css.tv.itc.cn/global/images/transparent.png" lazySrc="', s, '" width="140" height="80"></a></div>', '<strong><a title="', l.videoName, '" target="_blank" href="', l.videoUrl, '">', l.videoName, "</a></strong>", "</li>"), void 0)
            }),
            $("#similar").html(i.join("")),
            $("#similar").find("a").click(function() {
                sohuHD.pingback("http://click.hd.sohu.com.cn/s.gif?type=maybelike_" + cid + "_v20130724&expand1=" + cid + "&expand2=" + sohuHD.play.totalTime + "&ref=" + escape(document.location.href) + "&expand3=" + similar.videos[0].ab + "&expand4=" + similar.videos[0].r + "&expand5=" + playlistId + "&r=" + (new Date).getTime())
            }),
            sohuHD.seed({
                dom: $("#similar"),
                callback: function() {
                    sohuHD.lazyImage($("#similar img"), 0)
                }
            }),
            $("#myuser").length > 0 && sohuHD.seed({
                dom: $("#myuser"),
                callback: function() {
                    sohuHD.lazyImage($("#myuser img"), 0)
                }
            })
        })
    }
},
null, null, {
    cache: !0
}),
messagebus.subscribe("core.loaded_right",
function() {
    if ($("#movieRank").length > 0) {
        var e = "http://tv.sohu.com/frag/vrs_inc/phb_mv_week_10_simple.js";
        sohuHD.getScript(e)
    }
    $("#fragHotLink").length && sohuHD.seed({
        dom: $("#fragHotLink"),
        callback: function() {
            sohuHD.lazyImage($("#fragHotLink img"), 0)
        }
    }),
    $("#usershare").length && sohuHD.seed({
        dom: $("#usershare"),
        callback: function() {
            sohuHD.lazyImage($("#usershare img"), 0)
        }
    }),
    $("#rank").length && sohuHD.seed({
        dom: $("#rank"),
        callback: function() {
            sohuHD.lazyImage($("#rank img"), 0)
        }
    })
},
null, null, {
    cache: !0
}),
messagebus.subscribe("core.loaded_end",
function() {
    var e = sohuHD.getElem("sKeyA");
    sohuHD.bind(sohuHD.getElem("sFormA"), "submit",
    function() {
        return sohuHD.redirect("http://so.tv.sohu.com/mts?wd=" + escape(e.value), "_blank"),
        !1
    }),
    kao("comment")
},
null, null, {
    cache: !0
}),
messagebus.subscribe("play.playlistloaded",
function() { ("modMusic" == sohuHD.play.getEnumCls() || "modComic" == sohuHD.play.getEnumCls()) && ($("#playerBar").addClass("music"), $(window).bind("resize",
    function() {
        $("#listBtn").hasClass("shouqi") ? $("#playerBar").removeClass("music") : $("#playerBar").addClass("music")
    }), $("#listBtn").click(function() {
        $("#listBtn").hasClass("zhankai") ? ($("#listBtn").removeClass("zhankai").addClass("shouqi").find("em").html("\u5c55\u5f00\u4e13\u8f91\u5217\u8868"), $(".ablumBox").hide(), $("#playerBar").removeClass("music"), $("#playerBar").addClass("musicnolist")) : ($("#listBtn").removeClass("shouqi").addClass("zhankai").find("em").html("\u6536\u8d77\u4e13\u8f91\u5217\u8868"), $(".ablumBox").show(), $("#playerBar").addClass("music"), $("#playerBar").removeClass("musicnolist"))
    }), kao("count",
    function() {
        sohuHD.count.getCountBy($("#listBox"))
    }));
    var e = function() {
        var e = window.cid;
        return 2 == e || 16 == e || 7 == e || 8 == e || 9001 == e
    }; ! sohuHD.play.isEnd && e() ? kao("rss",
    function() {
        sohuHD.rss.configure({
            subBtn: "#list .vBox-warn"
        }),
        sohuHD.rss.run("psub")
    }) : $(".vBox-warn").remove()
},
null, null, {
    cache: !0
}),
messagebus.subscribe("play.playlistloaded",
function() {
    if ("16" == window.cid && "1" != window.pianhua) {
        var e = window.cateCode ? window.cateCode.split(";")[0] : "";
        window.__so_comic_recomm = function(e) {
            if (e && e.r && e.r.length > 0) {
                var t, i = [];
                $.each(e.r,
                function(e, a) {
                    a.aid != window.playlistId && (t = "\u300a" + a.albumTitle + "\u300b" + (a.tip || ""), i.push('<li><a href="' + a.videoUrl + '" target="_blank" title="' + t + '" data-pgclick="pg_playlist_tj3"><span class="tips_recom"></span>' + t + "</a></li>"))
                }),
                $("#comicRecomm").html("<ul>" + i.slice(0, 3).join("") + "</ul>")
            }
        },
        sohuHD.getScript("http://so.tv.sohu.com/jsl?c=115&cate=" + e + "&o=4&l=0&s=4&encode=GBK&callback=__so_comic_recomm")
    }
},
null, null, {
    cache: !0
}),
messagebus.subscribe("core.loaded_left",
function() {
    var e = $("#starmod"),
    t = $("#mainactor a");
    if (! (e.length < 0)) {
        var i = function(e) {
            return e.replace(/http:\/\/so\.tv\.sohu\.com\/star\/([^\.]*)(\..+)?/, "$1")
        }; ! (t.length > 0) || 2 != window.cid && 1 != window.cid || window.pagetype && "report" === window.pagetype ? window.pagetype && "report" == window.pagetype && messagebus.subscribe("play.playlistloaded",
        function(t, a) {
            a = a.videos;
            for (var s, l = 0,
            o = a.length; o > l; l++) if (a[l].vid == window.vid) {
                s = a[l];
                break
            }
            if (s.starMap.length) {
                for (var n = [], l = 0, o = s.starMap.length; o > l; l++) n.push(i(s.starMap[l].starUrl));
                n.length && kao("starmod",
                function() {
                    messagebus.publish("page.module.star", {
                        stars: n,
                        isMJ: 0,
                        elem: e
                    })
                })
            }
        },
        null, null, {
            execTime: 1
        }) : kao("starmod",
        function() {
            var t = function() {
                var e = [];
                return $("#mainactor a").each(function(t) {
                    if (4 > t) {
                        var i = $(this).attr("href").replace(/http:\/\/so\.tv\.sohu\.com\/star\/([^\.]*)(\..+)?/, "$1");
                        e.push(encodeURIComponent(i))
                    }
                }),
                e
            } (),
            i = function() {
                var e = $("#areabox").text();
                return /\u4ea7\u5730\uff1a[^>]*(\u7f8e\u5267|\u7f8e\u56fd)/.test(e) ? 1 : 0
            } ();
            messagebus.publish("page.module.star", {
                stars: t,
                isMJ: i,
                elem: e
            })
        })
    }
},
null, null, {
    cache: !0
}),
$(function() {
    "1007474" == window.playlistId && $("#crumbsBar h2").append('<span style="font-size:11px;color:#3A3A3A;padding-left:10px;letter-spacing:0.3px;">\u4e2d\u56fd\u5927\u9646\u300aOne Piece\u300b\u6b63\u5f0f\u8bd1\u540d\u300a\u822a\u6d77\u738b\u300b \u90e8\u5206\u9875\u9762\u91c7\u7528\u7684\u201c\u6d77\u8d3c\u738b\u201d\u4e3a\u9999\u6e2f\u7248\u672c\u4ee3\u540d\u8bcd</span>');
    var e = function(e, t) {
        $("body").delegate(e, "click",
        function() {
            sohuHD.pingback("http://click.hd.sohu.com.cn/s.gif?type=" + t + "_" + cid + "_v20130724&expand5=" + playlistId + "&_=" + sohuHD.random())
        })
    };
    $("body").on("click", "[data-pgclick]",
    function() {
        var e = $(this).attr("data-pgclick");
        sohuHD.pingback("http://click.hd.sohu.com.cn/s.gif?type=" + e + "_" + cid + "_v20130724&expand5=" + playlistId + "&_=" + sohuHD.random())
    }),
    ("undefined" == typeof pagetype || "voice" != pagetype) && (e(".reportBox .rLink", "pg_yulebobao"), e(".reportBox .rTab", "pg_yulebobao"), e(".hd-logoMini", "pg_topnav_channel"), e("#newplayNavCrumbs a", "pg_topnav_channel"), e(".hd-hotWord a", "pg_topnav_bjtj"), "" == sohuHD.passport.getPassport() ? (e("#hd-fBox3", "pg_topnav_history_s"), e(".hd-mUpload", "pg_topnav_upload_s")) : (e("#hd-fBox1", "pg_topnav_menu"), e("#hd-fBox3", "pg_topnav_history_m"), e(".hd-mUpload", "pg_topnav_upload_m"), e("#hd-fBox2", "pg_topnav_order")), e(".location a", "pg_playcrumbs"), e("#crumbsBar a", "pg_playcrumbs"), e(".vBox-ding", "pg_pg_playupdown"), e(".vBox-cai", "pg_pg_playupdown"), e("#shareBox", "pg_playforward"), e(".vBox-fav", "pg_playfav"), e(".vBox-warn", "pg_playnewnotice"), e("#j-download", "pg_playvideodown"), e("#phone-download a", "pg_downtomobile"), e(".vBox-desktop", "pg_playdesktop"), e(".shouqi", "pg_playcloselist"), e("#listBox a", "pg_playlist"), e("#listBoxPh a", "pg_pianhua"), e(".info a", "pg_videoinfo"), e("#musichotzt", "pg_music_lpos1"), e("#musictoprank", "pg_music_lpos2"), e("#musicsort", "pg_music_rpos1"), e("#hotzy a", "pg_show_lpos1"), e("#weekrank a", "pg_show_lpos2"), e("#vip a", "pg_playvip"), e("#myuser a", "pg_myusertj"), e("#tuijian a", "pg_djdzk"), e("#hottv a", "pg_drama_lpos1"), e("#globalhottv a", "pg_drama_lpos2"), e("#fragHotLink a", "pg_playhotword"), e("#movieRank a", "pg_playpaihang"), e("#usershare a", "pg_myusershare"), e("#commentSubmit", "pg_comment"), e(".l_btn_top", "pg_playgototop"), e(".l_btn_feed", "pg_playfeedback"), e(".sbtn-erwm", "pg_playerweima"), $("body").delegate(".boxAdv a", "click",
    function(e) {
        var t = $(e.target);
        "close" != t.attr("rev") && sohuHD.pingback("http://click.hd.sohu.com.cn/s.gif?type=pg_ifoxlayer_" + cid + "&expand5=" + playlistId + "&_=" + sohuHD.random())
    }))
}),
$(function() {
    window.specialTopFavBarSign || kao("topbar"),
    kao("webpush"),
    kao("ifoxtip")
}),
$(function() {
    kao("corner",
    function() {
        sohuHD.Corner.register("rank",
        function() {
            var e, t = $(".sbtn-wrap"),
            i = $(".rankBox");
            $(".sbtn-wrap .sbtn-rank").hover(function() {
                i.show()
            },
            function() {
                e = setTimeout(function() {
                    i.hide()
                },
                1e3)
            }),
            i.hover(function() {
                clearTimeout(e)
            },
            function() {
                i.hide()
            });
            var a = {
                1 : 2,
                2 : 0,
                16 : 3
            },
            s = $(".sbtn-wrap .rTab_menu li");
            return sohuHD.switchTab(s, {
                cssName: "on",
                boxs: $(".sbtn-wrap .rankBox .rTab_con"),
                start: a[cid] ? a[cid] : 0,
                callback: function(e) {
                    var t = e.n,
                    i = s.eq(t).attr("data-link");
                    i && $(".rankBox .mod-tit .top50").attr("href", i)
                }
            }),
            $(".sbtn-wrap .rankBox .rTab_con .pic_meta").hover(function() {
                $(this).addClass("pic_meta_over")
            },
            function() {
                $(this).removeClass("pic_meta_over")
            }),
            t
        }),
        kao("pingback",
        function() {
            pingbackBundle.initBlock({
                customParam: {
                    pg_playbang: {
                        url: "http://click.hd.sohu.com.cn/s.gif",
                        type: ["pg_playbang_" + cid + "_v20130724"],
                        expand5: [playlistId],
                        _: "stamp"
                    }
                }
            })
        }),
        $('<div class="G-later"> </div>').corner({
            items: ["rank", "code", "feedback", "returntop"]
        }).appendTo("body")
    })
});