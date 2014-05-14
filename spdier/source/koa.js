//2014-5-5 16:58 ww
window.__tv_M && __tv_M.addTag("kao_load"),
function(e, t) {
    function m(e) {
        e = e || {},
        this.config = i(e, v),
        this.subTree = {
            t: {},
            h: []
        },
        this.pubItems = {}
    }
    if (e.MessageBus) return;
    var n = 1,
    r = Object.prototype.toString,
    i = function(e, t) {
        if (e) for (var n in t) typeof e[n] == "undefined" && (e[n] = t[n]);
        return e
    },
    s = function(e) {
        return (e || "") + n++
    },
    o = function(e) {
        throw new Error(e)
    },
    u = function(e) {
        o("illegalTopic:" + e)
    },
    a = function(e) { (!e || !e.length || r.call(e) != "[object String]" || /\*{2}\.\*{2}/.test(e) || /([^\.\*]\*)|(\*[^\.\*])/.test(e) || /(\*\*\.\*)|(\*\.\*\*)/.test(e) || /\*{3}/.test(e) || /\.{2}/.test(e) || e[0] == "." || e[e.length - 1] == ".") && u(e)
    },
    f = function(e) {
        var t = /[^a-zA-Z0-9-_\.\*]/.exec(e);
        t && o("illegalCharactor:" + t[0])
    },
    l = function(e) { (!e || !e.length || r.call(e) != "[object String]" || e.indexOf("*") != -1 || e[0] == "." || /\.{2}/.test(e) || e[e.length] == ".") && u(e)
    },
    c = function(e, t, n, i) {
        t = typeof t == "undefined" ? null: t;
        var s, o, u = function(e, t, n, r) {
            var i = !0;
            t[n] = r,
            e[n] = !0;
            for (var s in e) if (!e[s]) {
                i = !1;
                break
            }
            return i
        },
        a = function(e, t) {
            for (var n in e) e[n] = !1
        };
        for (var f = 0,
        l = n.length; f < l; f++) s = n[f],
        s && (typeof i == "undefined" || s.pubId !== i) && (s.pubId = i, o = s.config, o && o._topics ? u(o._topics, o.topics, e, t) && (a(o._topics, o.topics), s.h.call(s.scope, e, o.topics, s.data)) : (s.execedTime++, r.call(s.config.execTime) == "[object Number]" && s.execedTime >= s.config.execTime && (n[f] = null), s.h.call(s.scope, e, t, s.data)))
    },
    h = function(e, t) {
        for (var n = 0,
        r = e.length; n < r; n++) if (e[n] && e[n].sid == t) {
            e[n] = null;
            break
        }
    },
    p = function(e, t) {
        return e == t || t == "**" ? !0 : (t = t.replace(/\.\*\*\./g, "(((\\..+?\\.)*)|\\.)"), t = t.replace(/^\*\*\./, "(.+?\\.)*"), t = t.replace(/\.\*\*$/, "(\\..+?)*"), t = t.replace(/\.\*\./g, "(\\..+?\\.)"), t = t.replace(/^\*\./g, "(.+?\\.)"), t = t.replace(/\.\*$/g, "(\\..+?)"), /[^\.|\*]$/.test(t) && (t += "$"), (new RegExp(t)).test(e))
    },
    d = function(e, t) {
        var n = [];
        for (var r in t) p(r, e) && n.push({
            topic: r,
            value: t[r]
        });
        return n
    },
    v = {
        cache: !0
    };
    i(m.prototype, {
        version: "1.0",
        subscribe: function(t, n, r, i, o) {
            a(t),
            f(t),
            r = r || e,
            o = o || {};
            var u = s(),
            l = {
                h: n,
                scope: r,
                data: i,
                sid: u,
                execedTime: 0,
                config: o
            },
            h = t.split("."),
            p = 0,
            v = h.length; (function(e, t, n, r) {
                var i = e[t];
                t == e.length ? r.h.push(n) : (r.t[i] || (r.t[i] = {
                    t: {},
                    h: []
                }), arguments.callee.call(this, e, ++t, n, r.t[i]))
            })(h, 0, l, this.subTree);
            if (this.config.cache && !!o.cache) {
                var m = d(t, this.pubItems);
                for (p = 0, v = m.length; p < v; p++) c(m[p].topic, m[p].value, [l])
            }
            return t + "^" + u
        },
        publish: function(e, t) {
            l(e),
            f(e),
            this.pubItems[e] = t;
            var n = e.split("."),
            r; (function(e, t, n, r, i, s, o) {
                var u = e[t];
                t == e.length ? c(i, r, o && o.isWildcard ? n.t["**"].h: n.h, s) : (n.t["**"] && (n.t["**"].t[u] ? arguments.callee.call(this, e, t + 1, n.t["**"].t[u], r, i, s, {
                    index: t,
                    tree: n
                }) : arguments.callee.call(this, e, t + 1, n, r, i, s, {
                    isWildcard: !0
                })), n.t[u] ? arguments.callee.call(this, e, t + 1, n.t[u], r, i, s) : o && !o.isWildcard && arguments.callee.call(this, e, ++o.index, o.tree, r, i, s, o), n.t["*"] && arguments.callee.call(this, e, t + 1, n.t["*"], r, i, s))
            })(n, 0, this.subTree, t, e, s())
        },
        unsubscribe: function(e) {
            var t = this,
            n = function(e) {
                var e = e.split("^");
                e.length != 2 && o("illegal sid:" + e);
                var n = e[0].split("."),
                r = e[1]; (function(e, t, n, r) {
                    var i = e[t];
                    t == e.length ? h(n.h, r) : n.t[i] && arguments.callee.call(this, e, ++t, n.t[i], r)
                })(n, 0, t.subTree, r)
            },
            e = e.split(";"),
            r = 0,
            i = e.length;
            for (; r < i; r++) n(e[r])
        },
        wait: function(e, t, n, i, s) {
            if (r.call(e) !== "[object Array]" || !e.length) return;
            s = s || {},
            s.topics = {},
            s._topics = {};
            var o = [],
            u = 0,
            a = e.length,
            f;
            for (; u < a; u++) f = e[u],
            l(e[u]),
            s.topics[f] = null,
            s._topics[f] = !1;
            for (u = 0; u < a; u++) o.push(this.subscribe(e[u], t, n, i, s));
            return o.join(";")
        }
    }),
    e.messagebus = new m,
    e.MessageBus = m
} (window, undefined),
function(e, t) {
    var n = new MessageBus,
    r = Array.prototype.slice,
    i = Object.prototype.toString,
    s, o = 0,
    u = function() {
        return "kao-anony-mod" + ++o
    },
    a = function(e) {
        throw new Error(e)
    },
    f = function() {
        var e = t.getElementsByTagName("script"),
        n = 0,
        r = e.length,
        i,
        s = /kao\.js(?=[\?#]|$)/;
        for (; n < r; n++) {
            i = e[n];
            if (s.exec(i.getAttribute("src") || "")) break;
            i = null
        }
        return i
    } (),
    l = function(e) {
        return e = e || "",
        !!/\.js(?=[\?#]|$)/i.exec(e)
    },
    c = function(e) {
        return e = e || "",
        !!/\.css(?=[\?#]|$)/i.exec(e)
    },
    h = function(e) {
        return e && i.call(e) === "[object Function]"
    },
    p = function(e) {
        return e && i.call(e) === "[object String]"
    },
    d = function(e) {
        return e && i.call(e) === "[object Array]"
    },
    v = function(e) {
        return e && i.call(e) === "[object Object]"
    },
    m = function(e) {
        return e && i.call(e) === "[object RegExp]"
    },
    g = function(e, t) {
        if (e && t) for (var n in t) e[n] = t[n]
    },
    y = {
        baseURL: "http://js.tv.itc.cn/",
        coreLib: "http://js.tv.itc.cn/base/core/g14041701.js",
        needCorelib: !0
    },
    b = {
        convert: "all",
        convertFn: function(e) {
            var t = this.convertExclude;
            for (var n = 0,
            r = t.length; n < r; n++) if (p(t[n]) && e == t[n] || m(t[n]) && t[n].test(e) || h(t[n]) && t[n](e)) return e;
            if (/\.src\./.test(e)) return e;
            var i = /\.(\d+)\.js(#|\?|\.|$)/,
            s;
            return (s = i.exec(e)) ? e.replace(s[1], "src") : (i = /\w+?(\d+)\.js(#|\?|\.|$)/, (s = i.exec(e)) ? e.replace(s[1], ".src") : e)
        },
        convertExclude: ["http://js.tv.itc.cn/base/core/j_1.7.2.js"]
    },
    w = {},
    E = {},
    S = {},
    x = function(e) {
        var t;
        return p(e) && (t = S[e]),
        t
    },
    T = function(e) {
        return e = e || "",
        /^http(s)?:\/\//.exec(e) || (e = y.baseURL + e),
        A.DEBUG && b.convert && (b.convert == "all" || m(b.convert) && b.convert.test(e) || h(b.convert) && b.convert(e)) && (e = b.convertFn(e)),
        e
    },
    N = function(e, n) {
        var r = t.createElement("link");
        r.setAttribute("type", "text/css"),
        r.setAttribute("rel", "stylesheet"),
        r.setAttribute("href", e),
        n && (r.charset = n),
        f.parentNode.insertBefore(r, f)
    },
    C = function(e, r, i, s, o) {
        r = T(r);
        var u = r.replace(/[\/:]/g, ""),
        a,
        l,
        h = i === "css" || c(r);
        if (h) {
            N(r, s);
            return
        }
        if (w[r]) {
            o && o(),
            e && n.publish(e);
            return
        }
        l = n.subscribe(u,
        function() {
            o && o(),
            e && n.publish(e)
        },
        this, null, {
            execTime: 1
        });
        if (E[r]) return;
        E[r] = 1,
        a = t.createElement("script"),
        a.setAttribute("type", "text/javascript"),
        a.setAttribute("src", r),
        a.setAttribute("async", !0),
        s && (a.charset = s),
        a.onerror = function() {
            n.unsubscribe(l),
            E[r] = 0,
            a.onerror = null
        };
        var p = !1;
        a.onload = a.onreadystatechange = function() { ! p && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (p = !0, a.onload = a.onreadystatechange = null, w[r] = 1, E[r] = 0, A.DEBUG || f.parentNode.removeChild(a), n.publish(u))
        },
        f.parentNode.insertBefore(a, f)
    },
    k = function(e, t) {
        var r = L(e),
        i,
        s,
        o = 0,
        u;
        u = n.wait(r,
        function() {
            n.unsubscribe(u),
            t && t()
        },
        this);
        while (i = r[o++]) s = x(i),
        s.requires && s.requires.length ? k(s.requires,
        function(e, t) {
            return function() {
                C(e, t.path, t.type, t.charset)
            }
        } (i, s)) : C(i, s.path, s.type, s.charset)
    },
    L = function(e, t) {
        t = t || [];
        var n, r, i = 0;
        while (n = e[i++]) if (p(n)) {
            if (S[n]) t.push(n);
            else if (l(n) || c(n)) r = u(),
            A.add(r, {
                path: n
            }),
            t.push(r)
        } else v(n) && n.path && (r = u(), A.add(r, n), t.push(r));
        return t
    },
    A = function() {
        S["kao-corelib"] || (S["kao-corelib"] = {
            path: y.coreLib
        });
        var e = r.call(arguments),
        t,
        n = y.needCorelib;
        if (e[0] === !1 || e[0] === !0) n = e.shift();
        h(e[e.length - 1]) && (t = e.pop()),
        n ? C("kao-corelib", x("kao-corelib").path, null, null,
        function(e, t) {
            return function() { ! e || !e.length ? t && t() : k(e, t)
            }
        } (e, t)) : !e || !e.length ? t && t() : k(e, t)
    };
    g(A, {
        add: function(e, t) {
            var n;
            if (!p(e)) return;
            p(t) ? n = {
                path: t
            }: v(t) && t.path && (n = t),
            n && (S[e] = n)
        },
        setConfig: function(e) {
            g(y, e)
        },
        DEBUG: !1,
        setDebugConfig: function(e) {
            g(b, e)
        }
    }),
    e.kao = A;
    if (s = f.getAttribute("data-corelib")) y.coreLib = s;
    if (s = f.getAttribute("data-baseurl")) y.baseURL = s; (s = f.getAttribute("data-debug")) == "true" && (A.DEBUG = !0),
    (s = f.getAttribute("data-needcorelib")) == "false" && (y.needCorelib = !1);
    if (s = f.getAttribute("data-main")) f.getAttribute("data-main-needcore") === "false" ? A(!1, s) : A(s)
} (window, document),
function(e, t, n) {
    function s(e, t) {
        var n = !1,
        r = !0,
        i = e.document,
        s = i.documentElement,
        o = i.addEventListener ? "addEventListener": "attachEvent",
        u = i.addEventListener ? "removeEventListener": "detachEvent",
        a = i.addEventListener ? "": "on",
        f = function(r) {
            if (r.type == "readystatechange" && i.readyState != "complete") return; (r.type == "load" ? e: i)[u](a + r.type, f, !1),
            !n && (n = !0) && t.call(e, r.type || r)
        },
        l = function() {
            try {
                s.doScroll("left")
            } catch(e) {
                setTimeout(l, 50);
                return
            }
            f("poll")
        };
        if (i.readyState == "complete") t.call(e, "lazy");
        else {
            if (i.createEventObject && s.doScroll) {
                try {
                    r = !e.frameElement
                } catch(c) {}
                r && l()
            }
            i[o](a + "DOMContentLoaded", f, !1),
            i[o](a + "readystatechange", f, !1),
            e[o](a + "load", f, !1)
        }
    }
    var r = !1,
    i = [],
    o = function() {
        var e = 0,
        t;
        while (t = i[e++]) t.call(this)
    };
    s(this,
    function() {
        r = !0,
        o()
    }),
    n.ready = function() {
        var t = [].slice.call(arguments),
        n = 0,
        s;
        if (r) while (s = t[n++]) s.call(e);
        else while (s = t.shift()) typeof s == "function" && i.push(s)
    }
} (window, document, kao),
function(e, t, n) {
    var r = t.compatMode === "CSS1Compat" ? t.documentElement: t.body,
    i = Array.prototype.slice,
    s,
    o,
    u,
    a = "ontouchstart" in e,
    f = a ? "ontouchstart": "onmousedown",
    l = a ? "ontouchmove": "onmousemove",
    c = a ? "ontouchend": "onmouseup",
    h = function() {
        var n = t.createElement("style");
        n.type = "text/css";
        var r = "#kao-logger-panel div {display:block;-webkit-box-sizing: content-box;-o-box-sizing: content-box;box-sizing: content-box;}#kao-logger-panel {display:block;-webkit-box-sizing: content-box;-o-box-sizing: content-box;box-sizing: content-box;z-index:10000;position:absolute;top : 10px;left : 10px;width:500px;border:3px solid #06a7e1;}#kao-logger-panel-top{height:30px;background:#06a7e1;cursor:move;color:#fff;padding:0 10px;}#kao-logger-panel-body{height:300px;background:#fff;padding:10px;overflow:auto;}#kao-logger-list li{list-style:none;border-bottom:1px solid #f4f4f4;}#kao-logger-title{margin:0;font-size:14px;float:left;height:30px;line-height:30px;}#kao-logger-menu{float:right;}#kao-logger-menu .menu-item{height:30px;line-height:30px;color:#fff;float:left;display:block;margin-right:10px;}.kao-logger-info{color:#06a7e1}.kao-logger-log{color:#3a3a3a;}.kao-logger-error{color:#d80c18;}.kao-logger-group{border:2px solid #06a7e1}";
        n.styleSheet ? n.styleSheet.cssText = r: n.appendChild(t.createTextNode(r));
        var i = t.getElementsByTagName("head")[0];
        i.appendChild(n),
        s = t.createElement("div"),
        s.id = "kao-logger-panel",
        t.body.insertBefore(s, t.body.firstChild),
        s.innerHTML = '<div id="kao-logger-panel-top"><h1 id="kao-logger-title">kao-logger</h1><div id="kao-logger-menu"><a id="kao-logger-btn-clear" class="menu-item" href="#" title="\u6e05\u7a7a">\u6e05\u7a7a</a><a id="kao-logger-btn-close" class="menu-item" href="#" title="\u5173\u95ed">\u5173\u95ed</a></div></div><div id="kao-logger-panel-body"><ul id="kao-logger-list"></ul></div><div id="kao-logger-panel-foot"></div>',
        o = t.getElementById("kao-logger-list");
        var a = t.getElementById("kao-logger-panel-top"),
        h = !1;
        a[f] = function(n) {
            h = !0,
            n = n || e.event;
            var r = n.pageX || n.x,
            i = n.pageY || n.y,
            o = s.offsetLeft,
            u = s.offsetTop;
            t[l] = function(t) {
                t = t || e.event,
                h && (x = t.pageX || t.x, y = t.pageY || t.y, x = Math.max(x, 0), y = Math.max(y, 0), s.style.left = o - r + x + "px", s.style.top = u - i + y + "px")
            },
            t[c] = function() {
                h = !1
            }
        },
        t.getElementById("kao-logger-btn-close").onclick = function() {
            return s.style.display = "none",
            !1
        },
        t.getElementById("kao-logger-btn-clear").onclick = function() {
            return o.innerHTML = "",
            !1
        },
        u = !0
    }; ! a && e.console && e.console.log ? n.logger = {
        log: function() {
            console.log.apply(console, i.call(arguments))
        },
        info: function() {
            console.info.apply(console, i.call(arguments))
        },
        error: function() {
            console.error.apply(console, i.call(arguments))
        },
        group: function() {
            console.group()
        },
        groupEnd: function() {
            console.groupEnd()
        }
    }: n.logger = {
        log: function(e) {
            if (!n.DEBUG) return; ! u && h(),
            s.style.display = "block",
            o.innerHTML = o.innerHTML + '<li class="kao-logger-log">' + e + "</li>"
        },
        info: function(e) {
            if (!n.DEBUG) return; ! u && h(),
            s.style.display = "block",
            o.innerHTML = o.innerHTML + '<li class="kao-logger-info">' + e + "</li>"
        },
        error: function(e) {
            if (!n.DEBUG) return; ! u && h(),
            s.style.display = "block",
            o.innerHTML = o.innerHTML + '<li class="kao-logger-error">' + e + "</li>"
        },
        group: function() {
            if (!n.DEBUG) return; ! u && h(),
            s.style.display = "block",
            o.innerHTML = o.innerHTML + '<li class="kao-logger-group"></li>'
        },
        groupEnd: function() {
            if (!n.DEBUG) return; ! u && h(),
            o.innerHTML = o.innerHTML + '<li class="kao-logger-group"></li>'
        }
    },
    n.logger.setStyle = function(e) {
        if (typeof e == "object" && s) for (var t in e) s.style[t] = e[t]
    }
} (window, document, kao),
function(e, t) {
    var n = e.kao,
    r = Array.prototype.slice,
    i = function() {
        var t = arguments,
        n = "sohuHD",
        r = e[n] || (e[n] = {}),
        i = 0,
        s,
        o,
        u,
        a;
        u = t[0],
        a = t[1];
        if (u && u.indexOf(".")) {
            o = u.split(".");
            for (s = 0; s < o.length; s++) {
                if (!r[o[s]] && a) return null;
                r[o[s]] = r[o[s]] || {},
                r = r[o[s]]
            }
        } else r[u] = r[u] || {};
        return r
    },
    s = function(t, n) {
        return function() {
            var r = i(t, !0) || e;
            r.using = i,
            n.call(r)
        }
    };
    n.n = function() {
        var t = r.call(arguments),
        n = t[0],
        s = t[1],
        o = i(n);
        o.using = i,
        s.call(o, e)
    },
    n.i = function() {
        var t = r.call(arguments),
        i = t.pop(),
        o = t.pop();
        t.push(s(o, i)),
        n.apply(e, t)
    }
} (window),
function(e, t) {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(e) {
        "use strict";
        if (this === void 0 || this === null) throw new TypeError;
        var t = Object(this),
        n = t.length >>> 0;
        if (n === 0) return - 1;
        var r = 0;
        arguments.length > 0 && (r = Number(arguments[1]), r !== r ? r = 0 : r !== 0 && (r = (r > 0 || -1) * Math.floor(Math.abs(r))));
        if (r >= n) return - 1;
        var i = r >= 0 ? r: Math.max(n - Math.abs(r), 0);
        for (; i < n; i++) if (i in t && t[i] === e) return i;
        return - 1
    }),
    String.prototype.trim || (String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "")
    });
    var n = new Date,
    r = Object.prototype.toString;
    e.sohuHD || (e.sohuHD = {});
    var i = e.sohuHD;
    i.cache = {},
    function(t) {
        var n = !!document.all,
        r = !!e.ActiveXObject && !e.XMLHttpRequest,
        i = n && "prototype" in Image,
        s = navigator.userAgent;
        t.isIE = n,
        t.isIE6 = r,
        t.isIE7 = n && !r && !i,
        t.isIE8 = i,
        t.isIE9 = !1,
        navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i) == "9." && (t.isIE9 = !0),
        t.isOpera = /opera/i.test(s),
        t.isChrome = /chrome/i.test(s),
        t.isSafari = !t.isChrome && /webkit/i.test(s),
        t.isFirefox = /mozilla/i.test(s),
        t.isIpad = /ipad/i.test(s),
        t.isIphone = /iphone|ipod/i.test(s),
        t.isAndroid = /android/i.test(s)
    } (i);
    var s = new Date;
    i.now = function() {
        return++s
    },
    i.random = function() {
        var e = [],
        t = 0,
        n = this;
        switch (arguments.length) {
        case 0:
            return i.now();
        case 1:
            e = arguments[0];
            break;
        case 2:
            e = arguments[0],
            t = arguments[1]
        }
        if (e instanceof Array) {
            var r = e.length,
            s = [],
            o = [];
            if (typeof t == "number" && t > 0) {
                t >= r && (t = r);
                for (var u = 0; u < r; ++u) s.push(e[u]);
                return s.sort(function() {
                    return Math.floor(Math.random() * 2)
                }),
                s.slice(0, t)
            }
            return e[Math.floor(Math.random() * r)]
        }
        return _e("sohuHD.random need Array arguments"),
        0
    },
    i.cookie = function(e, t, n) {
        if (typeof t == "undefined") {
            var r = (new RegExp("(?:^|; )" + e + "=([^;]*)")).exec(document.cookie);
            return r ? r[1] || "": ""
        }
        n = n || {},
        t === null && (t = "", n.expires = -1);
        var i = "";
        if (n.expires && (typeof n.expires == "number" || n.expires.toUTCString)) {
            var s;
            typeof n.expires == "number" ? (s = new Date, s.setTime(s.getTime() + n.expires * 24 * 60 * 60 * 1e3)) : s = n.expires,
            i = "; expires=" + s.toUTCString()
        }
        var o = n.path ? "; path=" + n.path: "",
        u = n.domain ? "; domain=" + n.domain: "",
        a = n.secure ? "; secure": "";
        document.cookie = [e, "=", t, i, o, u, a].join("")
    },
    i.addUrlParam = function(e, t, n) {
        var r = [t, n].join("="),
        i = /(\?|\#)/,
        s = {
            "?": "?" + r + "&",
            "#": "?" + r + "#",
            "default": "?" + r
        };
        return i.test(e) ? e.replace(i,
        function(e, t) {
            return s[t]
        }) : e + s["default"]
    },
    i.getUrlParam = function(e, t) {
        var n = function(e, t) {
            var n = e.match(new RegExp("[?&]" + t + "=([^&]+)", "i"));
            return n == null || n.length < 1 ? "": n[1]
        };
        return t = escape(unescape(t)),
        r.call(e) == "[object String]" ? n(e, t) : e.nodeName == "#document" ? n(location.search || "", t) : typeof e.src != "undefined" ? n(e.src, t) : typeof e.href != "undefined" ? n(e.href, t) : null
    },
    i.docCharset = "GBK";
    var o = document.charset || document.characterSet || "gbk";
    o.toLowerCase() == "gb2312" && (o = "GBK"),
    o && (i.docCharset = o),
    i.getScript = function(e, t, n, r, s) {
        var o = document.getElementsByTagName("head")[0] || document.documentElement,
        u = document.createElement("script");
        u.src = e,
        u.charset = n || i.docCharset,
        s = s || [];
        var a = !1;
        u.onload = u.onreadystatechange = function() { ! a && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (a = !0, t && t.apply(this, s), u.onload = u.onreadystatechange = null, r && (u.onerror = r), o && u.parentNode && o.removeChild(u))
        },
        o.insertBefore(u, o.firstChild)
    },
    i.getJSONP = function(t, n, r, s) {
        var o = "jsonp" + i.random();
        t.indexOf("callback=?") > -1 && (t = t.replace("callback=?", "callback=" + o), e[o] = function(t) {
            n(t);
            try {
                delete e[o]
            } catch(r) {}
        },
        i.getScript(t + "&_=" + i.random(), null, r, s))
    };
    var u = function(t, n) {
        if (!t || t.nodeType) n.call(t, 0, t);
        else if (t instanceof Array || e.jQuery && t instanceof jQuery) {
            var r = 0,
            i = null;
            while (r < t.length) {
                i = t[r];
                if (n.call(i, r, i) == 0) break; ++r
            }
        } else for (var r in t) if (n.call(t[r], r, t[r]) == 0) break
    };
    i.each = u;
    var a = function(e, t) {
        u(e,
        function(e, n) {
            l(this, t) || (this.className = this.className + " " + t)
        })
    },
    f = function(e, t) {
        t = new RegExp(t, "g");
        var n = "";
        u(e,
        function(e, r) {
            n = " " + this.className + " ",
            this.className = n.replace(t, "").trim()
        })
    },
    l = function(e, t) {
        var n = /[\n\t\r]/g,
        r = " " + e.className + " ";
        return r = r.replace(/[\n\t\r]/g, " "),
        t = " " + t + " ",
        r.indexOf(t) > -1 ? !0 : !1
    };
    i.addClass = a,
    i.removeClass = f,
    i.hasClass = l;
    var c = null;
    document.defaultView && document.defaultView.getComputedStyle ? c = function(e, n) {
        var r, i, s;
        if (! (i = e.ownerDocument.defaultView)) return t;
        if (s = i.getComputedStyle(e, null)) r = s.getPropertyValue(n);
        return r
    }: c = function(e, t) {
        return e.currentStyle
    };
    var h = function(e) {
        u(e,
        function() {
            this && this.style && (this.originDisplay = this.style.display || c(this, "display"), this.style.display = "none")
        })
    },
    p = function(e) {
        u(e,
        function() {
            this && this.style && (this.style.display = this.style.originDisplay || "block")
        })
    },
    d = function(e) {
        u(e,
        function() {
            this.style.display == "none" ? p(this) : h(this)
        })
    };
    i.show = p,
    i.hide = h,
    i.toggle = d,
    i.sibling = function(e, t) {
        var n = [];
        for (; e; e = e.nextSibling) e.nodeType === 1 && e !== t && n.push(e);
        return n
    },
    i.children = function(e) {
        if (!e.children) return i.sibling(e.firstChild);
        try {
            return i.convertArray(e.children)
        } catch(t) {
            _e(t.message)
        }
    },
    i.createElement = function(e) {
        if (typeof e == "string") {
            var t = document.createElement("div");
            t.innerHTML = e
        }
        var n = i.children(t);
        return n.length < 2 ? n[0] || n: n
    },
    i.convertArray = function(e) {
        if (i.isIE) {
            var t = [];
            for (var n = 0; n < e.length; ++n) t.push(e[n]);
            return t
        }
        return Array.prototype.slice.call(e, 0)
    },
    i.getElem = function(e) {
        return r.call(e) === "[object String]" && (e = document.getElementById(e)),
        e && (e.find = function(t) {
            if (r.call(t) === "[object String]") {
                var n = null,
                s = [],
                o = [];
                t = t.split("."),
                t[0] ? o = e.getElementsByTagName(t[0]) : o = i.children(e);
                var u = t[1];
                if (u) for (var a = 0; a < o.length; ++a) n = o[a],
                l(n, u) && s.push(o[a]);
                else s = i.convertArray(o);
                return s
            }
        }),
        e
    },
    i.pingback = function(e) {
        var t = new Image;
        i.cache[++n] = t,
        t.onload = t.onerror = t.onabort = function() {
            t = null
        },
        t.src = e
    }
} (window),
function(e) {
    var t = e.sohuHD,
    n = {
        "123.sogou.com": "f706392d15c1fe51",
        "kan.sogou.com": "a18ac9fe64557993",
        "v.sogou.com": "571714e730997ec2",
        "tv.sogou.com": "69346951307238ed",
        "www.sogou.com": "abbdd136abdb8172",
        "hao123.com": "a7f04e0e6d9886ea",
        "www.baidu.com": "50e48c6168d7b908",
        "video.baidu.com": "f9260ff3c94091e2",
        "hao.360.cn": "3f4c4b3afde8634b",
        "v.360.cn": "cea0490af0f0aa43",
        "www.sohu.com": "7d182a02ec0c2a46",
        "so.360.cn": "8a61ff9b47bb2e80"
    };
    try {
        var r = t.getUrlParam(document, "ch_key"),
        i = t.getUrlParam(document, "pvid");
        if (!r && i.indexOf("tc_") == 0) switch (i) {
        case "tc_video":
            r = "b11e7053fc403c02";
            break;
        case "tc_ent":
            r = "0f07d828108240ca";
            break;
        case "tc_news_video":
            r = "254e14cc00931184";
            break;
        default:
            r = "b744e8343dba4c5c"
        }
        if (!r && document && document.referrer) for (var s in n) document.referrer.indexOf(s) > -1 && (r = n[s]);
        if (!r) {
            var o = {
                "http://tv.sohu.com/?ifox": "4118f4355f694e9f",
                "http://tv.sohu.com/?ifox1": "d0598d31b5f36195",
                "http://tv.sohu.com/?ifox2": "d0598d31b5f36195",
                "http://tv.sohu.com/?ifox3": "d0598d31b5f36195",
                "http://tv.sohu.com/?ifox4": "d0598d31b5f36195"
            };
            for (var s in o) document.URL == s && (r = o[s])
        }
        var u = t.getUrlParam(document, "aureole");
        u && (r = "aureole_" + u),
        r && t.cookie("ch_key", r, {
            domain: "tv.sohu.com",
            path: "/"
        });
        var a = t.getUrlParam(document, "lqd"),
        f = t.getUrlParam(document, "lcode"),
        l = t.getUrlParam(document, "txid"),
        c = {
            domain: "tv.sohu.com",
            path: "/"
        };
        a && t.cookie("_LQD", a, c),
        f && t.cookie("_LCODE", f, c),
        l && t.cookie("_TXID", l, c)
    } catch(h) {
        _e(h)
    }
} (window),
window._oad_ping_callback = function(e, t) {
    var n = sohuHD.pingback;
    if (!n) return;
    var r = t.split("|");
    for (var i = 0; i < r.length; i++) n(r[i]);
    return "1"
},
window._oad_click_callback = function(e) {
    var t = sohuHD.pingback;
    if (!t) return;
    var n = e.split("|");
    for (var r = 0; r < n.length; r++) t(n[r]);
    return "1"
},
function(e, t) {
    var n = function() {
        this.logoutTimes = 0,
        this.loginTimes = 0
    };
    n.prototype = {
        getAppid: function() {
            return this.getInfo().appid || ""
        },
        getPassport: function() {
            return this.getInfo().userid || ""
        },
        getUid: function() {
            return this.getInfo().uid || ""
        },
        getUUID: function() {
            return this.getInfo().uuid || ""
        },
        getQname: function() {
            return this.getInfo().uniqname || ""
        }
    },
    n.prototype.b64_423 = function(e) {
        var t = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "_"),
        n = new String;
        for (var r = 0; r < e.length; r++) {
            for (var i = 0; i < 64; i++) if (e.charAt(r) == t[i]) {
                var s = i.toString(2);
                n += ("000000" + s).substr(s.length);
                break
            }
            if (i == 64) return r == 2 ? n.substr(0, 8) : n.substr(0, 16)
        }
        return n
    },
    n.prototype.b2i = function(e) {
        var t = 0,
        n = 128;
        for (var r = 0; r < 8; r++, n /= 2) e.charAt(r) == "1" && (t += n);
        return String.fromCharCode(t)
    },
    n.prototype.b64_decodex = function(e) {
        var t = new Array,
        n, r = "";
        for (n = 0; n < e.length; n += 4) r += this.b64_423(e.substr(n, 4));
        for (n = 0; n < r.length; n += 8) t += this.b2i(r.substr(n, 8));
        return t
    },
    n.prototype.utf8to16 = function(e) {
        var t, n, r, i, s, o, u, a, f;
        t = [],
        i = e.length,
        n = r = 0;
        while (n < i) {
            s = e.charCodeAt(n++);
            switch (s >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                t[r++] = e.charAt(n - 1);
                break;
            case 12:
            case 13:
                o = e.charCodeAt(n++),
                t[r++] = String.fromCharCode((s & 31) << 6 | o & 63);
                break;
            case 14:
                o = e.charCodeAt(n++),
                u = e.charCodeAt(n++),
                t[r++] = String.fromCharCode((s & 15) << 12 | (o & 63) << 6 | u & 63);
                break;
            case 15:
                switch (s & 15) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                    o = e.charCodeAt(n++),
                    u = e.charCodeAt(n++),
                    a = e.charCodeAt(n++),
                    f = (s & 7) << 18 | (o & 63) << 12 | (u & 63) << 6 | (a & 63) - 65536,
                    0 <= f && f <= 1048575 ? t[r] = String.fromCharCode(f >>> 10 & 1023 | 55296, f & 1023 | 56320) : t[r] = "?";
                    break;
                case 8:
                case 9:
                case 10:
                case 11:
                    n += 4,
                    t[r] = "?";
                    break;
                case 12:
                case 13:
                    n += 5,
                    t[r] = "?"
                }
            }
            r++
        }
        return t.join("")
    },
    n.prototype.selectInfo = function() {
        var e = ["ppinf", "ppinfo", "passport"],
        t,
        n,
        r;
        for (t = 0, n = e.length; t < n; t++) {
            r = (new RegExp("\\b" + e[t] + "\\b=(.*?)(?:$|;)")).exec(document.cookie);
            if (r && r.length) {
                r = r[1];
                break
            }
        }
        return r
    },
    n.prototype.decodeInfo = function(e) {
        var t;
        try {
            e = unescape(e).split("|");
            if (e[0] == "1" || e[0] == "2") t = this.utf8to16(this.b64_decodex(e[3]));
            return t
        } catch(n) {}
    },
    n.prototype.analyzeInfo = function(e) {
        e = e || "";
        var t = {},
        n, r, i;
        try {
            e = e.split("|");
            for (n = 0, r = e.length; n < r; n++) i = e[n].split(":"),
            i.length > 1 && (t[i[0]] = i[2])
        } catch(s) {}
        return t
    },
    n.prototype.getInfo = function() {
        return this.analyzeInfo(this.decodeInfo(this.selectInfo()))
    },
    t.passport = new n
} (window, sohuHD),
function() {
    sohuHD = sohuHD || {};
    if (sohuHD.ifox) return;
    var e = function() {
        function n(e, n) {
            this._settings = {
                name: "default",
                detailUrl: "http://tv.sohu.com/feihudetail/index.shtml"
            },
            this._isinstalled = !1,
            this._client = n;
            for (var r in e) this._settings[r] = e[r];
            if (t[this._settings.name]) return t[this._settings.name];
            t[this._settings.name] = this
        }
        var e = 67239941,
        t = {};
        return n.prototype = {
            constructor: n,
            isInstalled: function() {
                if (this._isinstalled) return ! 0;
                if (!n.isSupported()) return ! 1;
                if (this._client) this._isinstalled = !0;
                else {
                    var e = null;
                    if (window.ActiveXObject) {
                        e = n.getDector("SoHuVA.SoHuDector.1");
                        try {
                            e && e.isSoHuVaReady && e.isSoHuVaReady() && (this._client = e, this._isinstalled = !0)
                        } catch(t) {}
                    } else n.hasIfoxPlugin() && (e = n.getEmbedPlugin(), e && (this._client = e, this._isinstalled = !0))
                }
                return this._isinstalled
            },
            detectAsync: function(e, t) {
                if (typeof e != "function") return;
                var r = this,
                i = function(t) {
                    t = t || {},
                    setTimeout(function() {
                        e.call(r, t)
                    },
                    0)
                };
                if (!n.isSupported()) {
                    i("\u5e73\u53f0\u4e0d\u652f\u6301");
                    return
                }
                if (!this.isInstalled()) {
                    i("\u672a\u5b89\u88c5");
                    return
                }
                if (this.getVersion() < 67174451) {
                    i("\u7248\u672c\u8fc7\u4f4e");
                    return
                }
                var s = setTimeout(function() {
                    if (s == null) return;
                    s = null,
                    i("\u63a2\u6d4b\u8d85\u65f6")
                },
                t || 3e3),
                o = function() {
                    if (s == null) return;
                    n.callDaemon(function() {
                        clearTimeout(s),
                        s = null,
                        i("\u4e00\u5207\u5c31\u7eed")
                    },
                    function() {
                        setTimeout(o, 500)
                    })
                };
                o()
            },
            run: function(e, t) {
                if (!this.isInstalled()) return ! 1;
                try {
                    var n = function(e) {
                        return (t || []).length === e
                    };
                    if (n(0)) return this._client[e]();
                    if (n(1)) return this._client[e](t[0]);
                    if (n(2)) return this._client[e](t[0], t[1]);
                    if (n(3)) return this._client[e](t[0], t[1], t[2]);
                    if (n(4)) return this._client[e](t[0], t[1], t[2], t[3]);
                    if (n(5)) return this._client[e](t[0], t[1], t[2], t[3], t[4]);
                    if (n(6)) return this._client[e](t[0], t[1], t[2], t[3], t[4], t[5])
                } catch(r) {
                    return ! 1
                }
            },
            getVersion: function(e) {
                var t = this.run("GetSohuVAVersion");
                t = parseInt(t, 10);
                if (e) {
                    var n = t;
                    if (n < 0) return "-1";
                    var r = parseInt(n / 256, 10),
                    i = parseInt(r / 256, 10),
                    s = parseInt(i / 256, 10);
                    return [s % 256, i % 256, r % 256, n % 256].join(".")
                }
                return t
            },
            getUserId: function() {
                var e = this.run("GetUserId");
                return e && e.toString() || "-1"
            },
            getChannelNum: function() {
                var e = this.run("GetChannelNum");
                return e && e.toString() || "-1"
            },
            isShortcutCreated: function(e) {
                var t = "Nonsupport";
                try {
                    var n = this._client;
                    try {
                        t = n.IsShortcutCreatedEx(parseInt(e), 0) ? "Exist": "NotExist"
                    } catch(r) {
                        t = n.IsShortcutCreated(parseInt(e)) ? "Exist": "NotExist"
                    }
                } catch(r) {
                    t = "Nonsupport"
                }
                return t
            },
            isUrlShortcutCreated: function(e) {
                var t = "Nonsupport",
                n = this._client;
                try {
                    t = n.IsShortcutCreated(parseInt(e)) ? "Exist": "NotExist"
                } catch(r) {}
                return t
            },
            isShortcutCreated2: function(e) {
                var t = "Nonsupport";
                try {
                    var n = this._client;
                    t = n.IsShortcutCreatedEx(e, 2) ? "Exist": "NotExist"
                } catch(r) {
                    t = "Nonsupport"
                }
                return t
            },
            createUrlShortcut: function(e, t, n) {
                var r = "\\CreateUrlShortcut=" + [n, e, t].join(",");
                return this.run("RunSohuPlayer", [r])
            },
            createShortcut: function(e, t, n, r, i) {
                var s = "\\CreateShortcut=" + [e, t, n, r, i].join(",");
                return this.run("RunSohuPlayer", [s])
            },
            createShortcut2: function(e, t, n) {
                var r = "\\CreateWholeNetworkQuickLunch=" + n + "#;#" + e + "#;#" + t;
                return this.run("RunSohuPlayer", [r])
            },
            showDetailPageUrl: function(t, n) {
                var r = this.getVersion();
                r > e && (n = n || 6, t = sohuHD.addUrlParam(t, "downloadsrc", n)),
                this.run("ShowDetailPage", [t])
            },
            showDetailPage: function(e, t, n, r) {
                var i = [this._settings.detailUrl, "#", e, "_", t, "_", n, "_", r].join("");
                this.showDetailPageUrl(i)
            },
            play: function(t, n, r, i, s, o, u, a) {
                var f = this.getVersion(),
                l = [t, n, r, i, s].join(",");
                f > e && (o = o || 0, u = u || 0, a = a || 10, l = [t, n, r, i, s, o, u, a].join(",")),
                this.run("OnlinePlay", [l])
            },
            oplay: function(e) {
                var t = "\\WholeNetPlay=" + e;
                this.run("RunSohuPlayer", [t])
            },
            openBrowser: function(e) {
                var t = '\\WholeNetPlay={"live":1, "url":"' + e + '","vtype":4}';
                this.run("RunSohuPlayer", [t])
            },
            runSohuVA: function() {
                if (this.isInstalled()) try {
                    window.ActiveXObject ? this._client.StartSoHuVA() : this._client.RunSohuVA()
                } catch(e) {}
            }
        },
        n.isSupported = function() {
            return /win/i.test(navigator.userAgent)
        },
        n.hasIfoxPlugin = function() {
            var e = navigator.plugins;
            e.refresh(!1);
            for (var t = 0,
            n; n = e[t]; t++) if (/npifox/i.test(n.description)) return ! 0;
            return ! 1
        },
        n.getEmbedPlugin = function() {
            var e = document.getElementById("embed_ifox");
            if (!e) {
                var t = document.createElement("div");
                t.style.cssText = "position:absolute;zIndex:-1;height:1px",
                t.innerHTML = '<embed id="embed_ifox" type="application/ifox-plugin" width="0" height="0"></embed>',
                document.body && (document.body.insertBefore(t, document.body.firstChild), e = document.getElementById("embed_ifox"))
            }
            return e
        },
        n.getDector = function(e) {
            var t = null;
            if (window.ActiveXObject) {
                e = e || "SoHuVA.SoHuDector";
                try {
                    t = new ActiveXObject(e)
                } catch(n) {}
            }
            return t
        },
        n.callDaemon = function(e, t) {
            if (n.callDaemon.calling) return;
            n.callDaemon.calling = !0;
            var r = "http://127.0.0.1:8828/cb.js?_r=" + (new Date).getTime(),
            i = document.getElementsByTagName("head")[0] || document.documentElement,
            s = document.createElement("script");
            s.src = r;
            var o = null,
            u = function() {
                n.callDaemon.calling = !1,
                o && (clearTimeout(o), o = null),
                s.onload = s.onreadystatechange = s.onerror = null,
                i && s.parentNode && i.removeChild(s)
            },
            a = function(e) {
                return typeof e == "function"
            },
            f = function() {
                u(),
                a(e) && e()
            },
            l = function() {
                u(),
                a(t) && t()
            };
            o = window.setTimeout(l, 500),
            window.__ifox_ready = function() {
                if (o == null) return;
                f()
            },
            s.onerror = function() {
                if (o == null) return;
                l()
            },
            i.insertBefore(s, i.firstChild)
        },
        n.getInstance = function(e, t) {
            typeof e == "function" && (t = e, e = {});
            if (!n.isSupported()) {
                t(null);
                return
            }
            var r = new n(e),
            i = 0; (function() {
                if (i >= 5) {
                    t(null);
                    return
                }
                r.isInstalled() ? t(r) : (i += 1, setTimeout(arguments.callee, 15))
            })()
        },
        n
    } ();
    sohuHD.ifox = new e,
    sohuHD.Ifox = e;
    var t = sohuHD.plugin || (sohuHD.plugin = {});
    t.Ifox = e,
    sohuHD.Ifox.getInstance(function(e) {
        e && e.runSohuVA()
    }),
    window.messagebus && messagebus.publish("core.ifox_ready")
} (),
function(e) {
    var t = "ifoxinstalled";
    e.Ifox.getInstance(function(n) {
        if (n === null) {
            e.cookie(t, null, {
                domain: "tv.sohu.com",
                path: "/"
            });
            return
        }
        e.cookie(t, n.run("GetSohuVAVersion"), {
            domain: "tv.sohu.com",
            path: "/"
        })
    })
} (sohuHD),
window.returnUserIdsList = function() {
    var e = sohuHD.cookie("fuid") || "",
    t = sohuHD.ifox.run("GetUserId") || "",
    n = sohuHD.passport.getUid(),
    r = sohuHD.cookie("YYID") || "";
    return '{"flash" : "' + e + '", "ifox" : "' + t + '", "passport" : "' + n + '", "sogou" : "' + r + '"}'
}