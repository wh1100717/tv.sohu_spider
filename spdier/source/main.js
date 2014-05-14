/*pub-1|2014-05-04 16:32:11*/
KSLITE.declare("tanxssp-main", ["tanxssp-utils", "tanxssp-config", "tanxssp-params", "tanxssp-request"],
function(d, c) {
    var b = d("tanxssp-utils");
    var g = d("tanxssp-params").Def;
    var e = d("tanxssp-params").pvid;
    var f = d("tanxssp-request").Def;
    var a = d("tanxssp-config");
    c.run = function(h) {
        a.ready(function() {
            var j = {};
            b.mix(j, g());
            b.mix(j, {
                pvid: e
            });
            b.mix(j, h);
            f(j)
        })
    }
});
KSLITE.declare("tanxssp-config",
function(c, a) {
    var b = {};
    var e = {};
    var d = false;
    b.mapAdType = {
        "1": "txt",
        "2": "pic",
        "3": "flash",
        "4": "video",
        "5": "txtlink",
        "6": "tuwen",
        "7": "js",
        "8": "html",
        "9": "flashb",
        "98": "iframehtml",
        "99": "multiframe"
    };
    b.mapDisType = {
        "1": "static",
        "2": "couplet",
        "3": "rightfloat",
        "4": "floatwin",
        "5": "popwin",
        "6": "common",
        "7": "backdisplay",
        "8": "channel",
        "9": "search",
        "10": "topic",
        "11": "video"
    };
    b.ali = ["taobao.com", "alimama.com", "alibaba.com", "alipay.com", "alisoft.com", "linezing.com", "tanx.com", "mmstat.com", "etao.com", "tmall.com"];
    b.sc = "sc1";
    b.mc = "mc1";
    b.kws = ["wd", "p", "q", "keyword", "kw", "w", "key", "word", "query", "name"];
    e.cache = undefined;
    e.win = window;
    e.d = document;
    e.maxwin = null;
    e._maxwin = function(g) {
        if (g) {
            e.maxwin = g;
            return
        }
        g = e.win;
        try {
            if (top != g) {
                if (top.location && top.location.href) {
                    g = top
                }
            }
        } catch(f) {}
        e.maxwin = g
    };
    e.ali = (function() {
        var g = e.d.domain.split("."),
        h = b.ali,
        f;
        if (g.length > 1) {
            f = "@" + g[g.length - 2] + "." + g[g.length - 1];
            if (("@" + h.join("@")).indexOf(f) > -1) {
                return true
            }
        }
        return false
    })();
    e.frm = (function() {
        return (top != window)
    })();
    e.data = {};
    e.laterShowData = {};
    e.dx = function() {
        return e.data[b.sc]
    };
    e.units = [];
    e.addUnit = function(h) {
        var g = (new Date()).getTime();
        var f = {};
        f.w = window;
        f.pid = h.pid;
        f.t = g;
        e.units.push(f)
    };
    e.plusUnitCount = function(h) {
        var f = 0;
        for (var g = 0; g < e.units.length; g++) {
            if (e.units[g].pid == h.pid) {
                f += 1
            }
            if (f > 1) {
                return
            }
        }
        var j = b.sc;
        if (!e.data[j]) {
            e.data[j] = 1
        } else {
            e.data[j]++
        }
    };
    e.ref_url = null;
    e.getRef_url = function() {
        if (e.ref_url) {
            return e.ref_url
        }
        var f = location.href;
        if (e.frm) {
            if (e.win == e.maxwin) {
                f = e.d.referrer
            } else {
                f = top.location.href
            }
            if (f === "") {
                f = location.href
            }
        }
        e.ref_url = f;
        return f
    };
    e.r = (function() {
        var g = "";
        try {
            g = top.document.referrer
        } catch(f) {}
        if (g === null) {
            g = ""
        }
        return g
    })();
    a.c = b;
    a.r = e;
    a.ready = function(f) {
        if (d) {
            return f()
        }
        var g = setTimeout(function() {
            e._maxwin(window);
            d = true;
            f()
        },
        50);
        e._maxwin();
        clearTimeout(g);
        d = true;
        f()
    };
    a.ready(function() {})
});
KSLITE.declare("tanxssp-utils", ["tanxssp-config"],
function(c, b) {
    var a = {};
    a.mix = KSLITE.mix;
    a.getScript = KSLITE.getScript;
    a.syncScript = function(d, e) {
        document.write('<script charset="' + (e || "gbk") + '" src="' + d + '"><\/script>')
    };
    a.encode = function(d) {
        return encodeURIComponent(d + "")
    };
    a.decode = function(d) {
        return decodeURIComponent(d + "")
    };
    a.getAttr = function(e, d) {
        return a.trim(e.getAttribute(d.toLowerCase(), 2) || "") || ""
    };
    a.setAttr = function(f, d, e) {
        f.setAttribute(d.toLowerCase(), a.trim(e + ""))
    };
    a.$ = function(d) {
        return document.getElementById(d)
    };
    a.tanxId = function(d) {
        return a.$("tanx-a-" + d)
    };
    a.tanxSId = function(d) {
        return "tanx-a-" + d
    };
    a.getCookie = function(j) {
        var e = window.localStorage;
        var k = +new Date();
        var f = "";
        if (e) {
            var g = e.getItem(j);
            if (g) {
                if (k > g.split("::")[1]) {
                    e.removeItem(j)
                } else {
                    f = g.split("::")[0]
                }
            }
        } else {
            var l = (" " + document.cookie).split(";");
            j = j ? j: config.cookieKey;
            for (var h = 0; h < l.length; h++) {
                if (l[h].indexOf(" " + j + "=") === 0) {
                    f = a.decode(l[h].split("=")[1]);
                    break
                }
            }
        }
        return f
    };
    a.css = function(e, d, f) {
        if (f) {
            e.style[d] = f;
            return f
        }
        if (window.getComputedStyle) {
            return window.getComputedStyle(e, null).getPropertyValue(d)
        } else {
            if (e.currentStyle) {
                return e.currentStyle[d]
            }
        }
    };
    a.each = function(h, g) {
        if (h.length && h.slice) {
            for (var f = 0,
            d = h.length; f < d; f++) {
                g(h[f], f)
            }
        } else {
            for (var e in h) {
                if (h.hasOwnProperty(e)) {
                    g(h[e], e)
                }
            }
        }
    };
    a.setCookie = function(g, h, e) {
        var f = window.localStorage;
        var j = new Date();
        if (f) {
            if (f.getItem(g)) {
                f.removeItem(g)
            }
            f.setItem(g, h + "::" + ( + j + e * 86400000))
        } else {
            g = arguments.length == 1 ? config.cookieKey: g;
            j.setDate(j.getDate() + e);
            document.cookie = g + "=" + a.encode(h) + "; expires=" + j.toGMTString() + "; path=/"
        }
    };
    a.trim = function(f) {
        var d = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
        for (var e = 0; e < f.length; e++) {
            if (d.indexOf(f.charAt(e)) === -1) {
                f = f.substring(e);
                break
            }
        }
        for (e = f.length - 1; e >= 0; e--) {
            if (d.indexOf(f.charAt(e)) === -1) {
                f = f.substring(0, e + 1);
                break
            }
        }
        return d.indexOf(f.charAt(0)) === -1 ? f: ""
    };
    a.show = function(d) {
        var e = a.getAttr(d, "_tanx_old_display") || "";
        a.css(d, "display", e)
    };
    a.hide = function(d) {
        if (!d) {
            return
        }
        a.setAttr(d, "_tanx_old_display", a.css(d, "display"));
        a.css(d, "display", "none")
    };
    if (navigator.userAgent && navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
        if (typeof(HTMLElement) != "undefined" && !HTMLElement.prototype.insertAdjacentElement) {
            HTMLElement.prototype.insertAdjacentElement = function(e, d) {
                switch (e.toLowerCase()) {
                case "beforebegin":
                    this.parentNode.insertBefore(d, this);
                    break;
                case "afterbegin":
                    this.insertBefore(d, this.firstChild);
                    break;
                case "beforeend":
                    this.appendChild(d);
                    break;
                case "afterend":
                    if (this.nextSibling) {
                        this.parentNode.insertBefore(d, this.nextSibling)
                    } else {
                        this.parentNode.appendChild(d)
                    }
                    break
                }
            };
            HTMLElement.prototype.insertAdjacentHTML = function(e, g) {
                var h = this.ownerDocument.createRange();
                h.setStartBefore(this);
                var f = h.createContextualFragment(g);
                this.insertAdjacentElement(e, f)
            }
        }
    }
    a.showAd = function(h, e, f, g) {
        if (e) {
            window.setTimeout((function() {
                var j = document.getElementById(e);
                try {
                    j.insertAdjacentHTML("beforebegin", h);
                    if (typeof g == "function") {
                        g()
                    }
                } catch(d) {
                    j = j.parentNode;
                    j.insertAdjacentHTML("beforebegin", h);
                    if (typeof g == "function") {
                        g()
                    }
                }
            }), 0)
        } else {
            if (f) {
                window.setTimeout((function() {
                    try {
                        f.insertAdjacentHTML("afterbegin", h);
                        if (typeof g == "function") {
                            g()
                        }
                    } catch(d) {
                        f = f.parentNode;
                        f.insertAdjacentHTML("afterbegin", h);
                        if (typeof g == "function") {
                            g()
                        }
                    }
                }), 0)
            } else {
                document.write(h);
                if (typeof g == "function") {
                    g()
                }
            }
        }
    };
    a.fixedEl = (function() {
        var f = navigator.userAgent.toLowerCase();
        var g = (f.indexOf("msie") > -1);
        var d = navigator.userAgent.match(/MSIE\s([^;]*)/);
        var k = 0;
        var j;
        if (d && d[1]) {
            k = parseFloat(d[1])
        }
        if (g) {
            if (k < 7) {
                j = false
            } else {
                if ("BackCompat" == document.compatMode) {
                    j = false
                } else {
                    j = true
                }
            }
        } else {
            j = true
        }
        var h = [];
        var e = [];
        return function(m, p) {
            if (j) {
                m.style.position = "fixed";
                a.each(p,
                function(r, q) {
                    m.style[q] = (r || 0)
                })
            } else {
                var o = null;
                var l = null;
                h.push(m);
                e.push(p);
                var n = function() {
                    var w = document;
                    var s = (w.documentElement.clientHeight || w.body.clientHeight);
                    var v;
                    var u;
                    var r;
                    var x;
                    for (var t = 0,
                    q = h.length; t < q; t++) {
                        v = h[t];
                        x = e[t];
                        v.style.position = "absolute";
                        u = v.offsetWidth;
                        r = v.offsetHeight;
                        if (x.top !== undefined) {
                            v.style.top = (parseInt(x.top, 10) || 0) + (w.body.scrollTop || w.documentElement.scrollTop) + "px"
                        }
                        if (x.left !== undefined) {
                            v.style.left = (parseInt(x.left, 10) || 0) + (w.body.scrollLeft || w.documentElement.scrollLeft) + "px"
                        }
                        if (x.right !== undefined) {
                            v.style.right = (parseInt(x.right, 10) || 0) - (w.body.scrollLeft || w.documentElement.scrollLeft) + "px"
                        }
                        if (x.bottom !== undefined) {
                            v.style.top = s - (parseInt(x.bottom, 10) || 0) - r + (w.body.scrollTop || w.documentElement.scrollTop) + "px"
                        }
                    }
                };
                a.addEvent(window, "scroll",
                function() {
                    if (o) {
                        clearTimeout(o)
                    }
                    o = setTimeout(function() {
                        n()
                    },
                    10)
                });
                a.addEvent(window, "resize",
                function() {
                    if (l) {
                        clearTimeout(l)
                    }
                    l = setTimeout(function() {
                        n()
                    },
                    10)
                });
                n()
            }
        }
    })();
    a.createCloseBtn = function() {
        var f = document.createElement("div");
        var e = " onmouseover=\"this.src='http://img.alimama.cn/p/close2.gif'\"";
        var d = " onmouseout=\"this.src='http://img.alimama.cn/p/close1.gif'\"";
        var g = ' style="height:13px;font-size:14px;float:right;width:43px;cursor:pointer;position:absolute;top:-16px;right:0"';
        f.innerHTML = '<img alt="Close" src="http://img.alimama.cn/p/close1.gif" ' + e + d + g + " />";
        return f
    }; (function(e, d) {
        if (d.addEventListener) {
            a.addEvent = function(g, f, h) {
                g.addEventListener(f, h, false)
            };
            a.removeEvent = function(g, f, h) {
                g.removeEventListener(f, h, false)
            }
        } else {
            if (d.attachEvent) {
                a.addEvent = function(g, f, h) {
                    g["e" + f + h] = h;
                    g[f + h] = function() {
                        g["e" + f + h](window.event)
                    };
                    g.attachEvent("on" + f, g[f + h])
                };
                a.removeEvent = function(g, f, h) {
                    g.detachEvent("on" + f, g[f + h]);
                    g[f + h] = null
                }
            } else {
                a.addEvent = function(g, f, h) {
                    g["on" + f] = h.call(g, e.event)
                };
                a.removeEvent = function(g, f) {
                    g["on" + f] = null
                }
            }
        }
        a.domReady = (function(o) {
            var t = [];
            var n;
            var m = false;
            var p = document;
            var h = p.documentElement;
            var s = h.doScroll;
            var g = "DOMContentLoaded";
            var j = "addEventListener";
            var r = "onreadystatechange";
            var l = "readyState";
            var u = s ? /^loaded|^c/: /^loaded|c/;
            var k = u.test(p[l]);
            function q(v) {
                k = 1;
                while (v = t.shift()) {
                    v()
                }
            }
            if (p[j]) {
                n = function() {
                    p.removeEventListener(g, n, m);
                    q()
                };
                p[j](g, n, m)
            }
            if (s) {
                n = function() {
                    if (/^c/.test(p[l])) {
                        p.detachEvent(r, n);
                        q()
                    }
                };
                p.attachEvent(r, n)
            }
            if (!s) {
                return function(f) {
                    if (k) {
                        f()
                    } else {
                        t.push(f)
                    }
                }
            } else {
                o = function(f) {
                    if (self != top) {
                        if (k) {
                            f()
                        } else {
                            t.push(f)
                        }
                    } else {
                        try {
                            h.doScroll("left")
                        } catch(v) {
                            return setTimeout(function() {
                                o(f)
                            },
                            50)
                        }
                        f()
                    }
                };
                return o
            }
        })()
    })(window, document);
    a.tagName = function(d) {
        return d && d.tagName ? d.tagName.toLowerCase() : null
    };
    a.each(a,
    function(e, d) {
        b[d] = e
    })
});
KSLITE.declare("tanxssp-request", ["tanxssp-utils", "tanxssp-config", "tanxssp-lazy", "tanxssp-close", "tanxssp-iframe-stat"],
function(c, e) {
    var d = c("tanxssp-config").r;
    var j = c("tanxssp-utils");
    var b = c("tanxssp-lazy").treatShow;
    var h = c("tanxssp-iframe-stat").Def;
    var a;
    var f;
    var k = c("tanxssp-close");
    if (window.null_data) {
        f = window.null_data
    }
    window.null_data = function() {
        if (f) {
            f()
        }
    };
    function g(r) {
        var n = "jsonp_callback_" + parseInt(Math.random() * 100000, 10);
        window[n] = function(v) {
            b(v);
            var t = {
                elConId: "tanxssp-outer-con" + v.pid,
                clickUrl: v.clickurl,
                data: v.data,
                height: v.height,
                pid: v.pid,
                width: v.width
            };
            var s = window;
            if (s.tanx_ssp_load_ad && s.tanx_ssp_load_ad.length) {
                for (var u = 0,
                o = s.tanx_ssp_load_ad.length; u < o; u++) {
                    if (s.tanx_ssp_load_ad[u][v.pid]) {
                        try {
                            s.tanx_ssp_load_ad[u][v.pid](t)
                        } catch(x) {}
                    }
                }
            }
            h(v.pid, j.encode(r.u), j.encode(location.href));
            try {
                window[n] = null;
                delete window[n]
            } catch(x) {}
        };
        r.cb = n;
        r.ai = d.units.length - 1;
        var m = r.cas;
        var q = ["i", "cb", "callback", "ep", "userid", "o", "f", "n", "re", "r", "cah", "caw", "ccd", "ctz", "chl", "cja", "cpl", "cmm", "cf", "cg", "pvid", "ai", "ac", m, "cas", "cbh", "cbw", "dx", "u", "pf", "k", "tt"];
        var p = [];
        j.each(q,
        function(o) {
            if (r[o] !== a) {
                p.push(o + "=" + j.encode(r[o]))
            }
        });
        return p.join("&")
    }
    function l(q) {
        var n = false;
        for (var p = 0,
        m = d.units.length; p < m; p++) {
            if (q.i == d.units[p].i) {
                n = true;
                break
            }
        }
        if (!n) {
            d.units.push({
                i: q.i,
                sync: q.sync
            })
        }
        return n
    }
    e.Def = function(p) {
        if (l(p)) {
            return false
        }
        if (k.isClose(p.i)) {
            return
        }
        var n = g(p);
        var m = "http://" + p.sd + "/ex?" + n;
        if (p.sync) {
            j.syncScript(m)
        } else {
            j.getScript(m)
        }
    }
});
KSLITE.declare("tanxssp-params", ["tanxssp-config", "tanxssp-utils"],
function(e, w) {
    var k = e("tanxssp-config").r;
    var u = e("tanxssp-config").c;
    var r = e("tanxssp-utils");
    var d = Math;
    var v = k.maxwin.document;
    function j() {
        return {
            ctz: ( - ((new Date()).getTimezoneOffset() / 60))
        }
    }
    function p() {
        return {
            chl: history.length
        }
    }
    function q() {
        var x = navigator;
        return {
            cja: (x.javaEnabled() ? "1": "0"),
            cpl: (x.plugins ? x.plugins.length: 0),
            cmm: (x.mimeTypes ? x.mimeTypes.length: 0)
        }
    }
    function t() {
        var x = "-1",
        C = navigator,
        z, y;
        if (C.plugins && C.plugins.length) {
            for (z = 0; z < C.plugins.length; z++) {
                if (C.plugins[z].name.indexOf("Shockwave Flash") != -1) {
                    x = C.plugins[z].description.split("Shockwave Flash ")[1];
                    break
                }
            }
        } else {
            if (window.ActiveXObject) {
                for (y = 10; y >= 2; y--) {
                    try {
                        var A = new Function("return new ActiveXObject('ShockwaveFlash.ShockwaveFlash." + y + "');");
                        if (A) {
                            x = y + ".0";
                            break
                        }
                    } catch(B) {}
                }
            }
        }
        if (x != "-1") {
            x = x.substring(0, x.indexOf(".") + 2)
        }
        return {
            cf: x
        }
    }
    function g() {
        var y, x = 0,
        z = 0;
        if (v && v.body) {
            y = v.body;
            x = y.clientHeight;
            z = y.clientWidth
        }
        return {
            cbh: x,
            cbw: z
        }
    }
    function a() {
        var z = window.screen,
        x = 0,
        D = 0,
        y = 0,
        B = 0,
        C = 0;
        try {
            x = z.width;
            D = z.height;
            y = z.availHeight;
            B = z.availWidth;
            C = z.colorDepth
        } catch(A) {}
        return {
            re: x + "x" + D,
            cah: y,
            caw: B,
            ccd: C
        }
    }
    function h() {
        var x = "";
        try {
            x = v.title
        } catch(y) {}
        return {
            tt: x
        }
    }
    function f() {
        var y = "",
        x = "",
        A, B, E, F, D = location,
        z = "";
        function C(I, K) {
            var J = "",
            G = 1,
            H;
            G = Math.floor(I.length / K);
            if (G == 1) {
                J = I.substr(0, K)
            } else {
                for (H = 0; H < K; H++) {
                    J += I.substr(H * G, 1)
                }
            }
            return J
        }
        if (k.ali) {
            A = (" " + document.cookie).split(";");
            for (B = 0; B < A.length; B++) {
                if (A[B].indexOf(" cna=") === 0) {
                    x = A[B].substr(5, 24);
                    break
                }
            }
        }
        if (x === "") {
            cu = (D.search.length > 9) ? D.search: ((D.pathname.length > 9) ? D.pathname: D.href).substr(1);
            A = document.cookie.split(";");
            for (B = 0; B < A.length; B++) {
                if (A[B].split("=").length > 1) {
                    z += A[B].split("=")[1]
                }
            }
            if (z.length < 16) {
                z += "0123456789abcdef"
            }
            x = C(cu, 8) + C(z, 16)
        }
        for (B = 1; B <= 32; B++) {
            E = d.floor(d.random() * 16);
            if (x && B <= x.length) {
                F = x.charCodeAt(B - 1);
                E = (E + F) % 16
            }
            y += E.toString(16);
            if (B === 1 && y < "a") {
                y = "a"
            }
        }
        return {
            cg: y
        }
    }
    function n() {
        var x = d.floor(d.random() * 10000) + 10001;
        try {
            if (k.sid) {
                x = k.sid
            } else {
                x = x - 10001;
                k.sid = x
            }
        } catch(y) {}
        return {
            ac: x
        }
    }
    function b() {
        var C = 0,
        F = 16,
        D = 0,
        z, y, A, G, B, E = u[0] || 4973;
        for (A = 1; A <= F; A++) {
            z = d.random();
            y = d.random();
            if ((d.pow(z, 2) + d.pow(y, 2)) <= 1) {
                C++
            }
            if (A <= 12) {
                D = D + z
            }
        }
        G = "pr" + String.fromCharCode(97 + C);
        B = (d.round(D * E) | ((v.body ? v.body.clientWidth: 0) << 16));
        var x = {};
        x[G] = B;
        x.cas = G;
        return x
    }
    function m() {
        var x = k.data[u.sc] || 1;
        return {
            dx: (x ? x: "")
        }
    }
    function l() {
        return {
            u: k.getRef_url()
        }
    }
    function o() {
        return {
            r: k.r
        }
    }
    function s(y) {
        var A = u.kws,
        z, B, x;
        if (y) {
            for (z = 0; z < A.length; z++) {
                B = new RegExp("[^1-9a-zA-Z]" + A[z] + "=([^&]*)");
                x = y.match(B);
                if (x) {
                    B = new RegExp("^[0-9]*$");
                    if (x[1].match(B) === null) {
                        return x[1]
                    }
                }
            }
        }
        return ""
    }
    function c() {
        var x = s(k.u);
        if (x === "" && k.r) {
            x = s(k.r)
        }
        return {
            k: x
        }
    }
    w.pvid = (function() {
        var F = "tanx_ssp_pvid";
        var z = k.maxwin;
        var x = z[F];
        var E = z.navigator[F];
        var C = window.localStorage;
        var G = new Date().getTime();
        var B = f().cg;
        var A = 2000;
        function D() {
            try {
                if (x) {
                    return x
                }
                if (E) {
                    return E
                }
                if (C) {
                    var I = C.getItem(F);
                    if (I && (G - I.split("::")[1] <= A)) {
                        return I.split("::")[0]
                    }
                }
                y(B)
            } catch(H) {}
            return B
        }
        function y(H) {
            z[F] = H;
            z.navigator[F] = H;
            if (C) {
                C.setItem(F, H + "::" + G)
            }
        }
        return D()
    })();
    w.Def = function() {
        var x = {};
        r.each([j(), p(), q(), t(), g(), a(), h(), f(), n(), b(), m(), l(), o(), c()],
        function(y) {
            r.mix(x, y)
        });
        return x
    }
});
KSLITE.declare("tanxssp-acookie",
function(c, a) {
    var b = false;
    function d() {
        var f = navigator.userAgent.toLowerCase();
        var g = (f.indexOf("msie") > -1);
        var m;
        var l = document;
        var k = location.pathname.split("/");
        k[k.length - 1] = "";
        var j = encodeURIComponent(k.join("/"));
        if (window.localStorage) {
            m = window.localStorage;
            return {
                setkey: function(o, n) {
                    try {
                        m.setItem(o, n)
                    } catch(p) {
                        return false
                    }
                    return true
                },
                getkey: function(n) {
                    try {
                        return m.getItem(n)
                    } catch(o) {
                        return
                    }
                }
            }
        } else {
            if (g) {
                m = l.getElementById("_tanxssp_userdata");
                if (!m) {
                    m = l.createElement("input");
                    m.type = "hidden";
                    l.body.insertBefore(m, l.body.firstChild);
                    try {
                        m.addBehavior("#default#userData")
                    } catch(h) {}
                }
                return {
                    setkey: function(o, n) {
                        try {
                            m.load(j);
                            m.setAttribute(o, n);
                            m.save(j)
                        } catch(p) {
                            return false
                        }
                        return true
                    },
                    getkey: function(n) {
                        try {
                            m.load(j)
                        } catch(o) {
                            return
                        }
                        return m.getAttribute(n)
                    }
                }
            } else {
                return {
                    setkey: function() {},
                    getkey: function() {}
                }
            }
        }
    }
    a.Def = function() {
        if (!b) {
            b = true;
            if (location.host.indexOf("www.taobao.com") < 0) {
                var h = d();
                var f = "tanxssp_acookie_expires";
                var g = h.getkey(f);
                if (g && (g > (new Date().getTime()))) {
                    return false
                }
                h.setkey(f, new Date().getTime() + 60 * 60 * 1000);
                var j = document;
                var e = j.createElement("iframe");
                e.style.cssText = "width:0;height:0;display:none";
                e.src = "http://cdn.tanx.com/t/acookie/acbeacon2.html";
                j.body.insertBefore(e, j.body.firstChild)
            }
        }
    }
});
KSLITE.declare("tanxssp-cookiemap", ["tanxssp-config"],
function(b, a) {
    var c = b("tanxssp-config").r;
    a.Def = function(d) {
        if (!c.units[0] || c.units[0].i !== d) {
            return 0
        }
        var e = Math.floor(Math.random() * 100 + 1);
        if (e == 15 || e == 80) { (new Image()).src = "http://cm.g.doubleclick.net/pixel?google_cm&google_nid=taobao"
        }
        if (e == 51) { (new Image()).src = "http://ckm.qiyi.com/pixel?qiyi_nid=71000017&qiyi_no_sc"
        }
    }
});
KSLITE.declare("tanxssp-show", ["tanxssp-display", "tanxssp-acookie", "tanxssp-feedback", "tanxssp-ws2subway", "tanxssp-activeview"],
function(d, b) {
    var g = d("tanxssp-display").Def;
    var c = d("tanxssp-acookie").Def;
    var a = d("tanxssp-feedback").Def;
    var f = d("tanxssp-ws2subway").Def;
    var e = d("tanxssp-activeview");
    b.show = function(h) {
        c(h);
        if (h.stdwidth && h.stdheight && (h.stdwidth != h.width || h.stdheight != h.height)) {
            h.adSpaceWidth = h.width;
            h.adSpaceHeight = h.height;
            h.paddingLeft = 0;
            h.paddingTop = 0;
            if (h.stdheight < h.height) {
                h.height = h.stdheight;
                h.paddingTop = (h.adSpaceHeight - 2 - h.height) / 2
            }
            if (h.stdwidth < h.width) {
                h.width = h.stdwidth;
                h.paddingLeft = (h.adSpaceWidth - 2 - h.width) / 2
            }
            h.adSpaceWidth -= (h.paddingLeft + 2);
            h.adSpaceHeight -= (h.paddingTop + 2);
            if (h.height > h.adSpaceHeight) {
                h.height = h.adSpaceHeight
            }
            if (h.width > h.adSpaceWidth) {
                h.width = h.adSpaceWidth
            }
        }
        f(h);
        g(h);
        a(h);
        try {
            e.check(h.pid)
        } catch(j) {}
    }
});
KSLITE.declare("tanxssp-feedback",
function(b, a) {
    a.Def = function(f) {
        if (f.feedback !== undefined && f.feedback !== "") {
            var e = window["tanxssp-feedback-cache"] || (window["tanxssp-feedback-cache"] = {});
            var d = new Image();
            e[f.pid] = d;
            d.onload = d.onerror = function() {
                d.onload = d.onerror = null;
                d = null;
                delete e[f.pid]
            };
            var c = "?";
            if (f.feedback.indexOf("?") > -1) {
                c = "&"
            }
            d.src = f.feedback + c + "tanxssp_t=" + parseInt(Math.random() * 100000, 10)
        }
    }
});
KSLITE.declare("tanxssp-icon", ["tanxssp-utils"],
function(c, b) {
    var a = c("tanxssp-utils");
    b.show = function(g) {
        var l = function(m) {
            return m + g.pid
        };
        var f = a.$(l("icon"));
        var j = a.$(l("icon_small"));
        var e = a.$(l("icon_big"));
        if (!f || !j || !e) {
            return false
        }
        var h = null;
        var k = "s";
        function d() {
            j.style.display = "block";
            e.style.display = "none";
            f.style.width = "26px";
            k = "s"
        }
        f.onmouseover = function() {
            if (h) {
                window.clearTimeout(h)
            }
            if ("s" === k) {
                j.style.display = "none";
                e.style.display = "block";
                f.style.width = "110px";
                k = "b"
            }
        };
        f.onmouseout = function() {
            if ("b" === k) {
                h = window.setTimeout(d, 200)
            }
        }
    };
    b.tmpl = function(k, e) {
        if (!k.icon) {
            return e
        }
        var m = function(f) {
            return f + k.pid
        };
        var h = "http://img03.taobaocdn.com/tps/i3/T1dt7VXiRaXXbd25o5-110-18.png";
        var g = "http://gtms02.alicdn.com/tps/i2/";
        var d = ["", g + "T1oY3VXmNbXXXb8qDc-26-18.png", g + "T1qOSyFmXfXXaAQWDc-26-17.png", g + "T1xfOxFnVfXXaAQWDc-26-17.png", g + "T14e9lFhNgXXaAQWDc-26-17.png", g + "T1kvGNFeRgXXaAQWDc-26-17.png"];
        var l = d[parseInt(k.icon, 10)];
        if (!l) {
            l = d[1]
        }
        var j = '<a id="' + m("icon") + '" title="&#25105;&#20063;&#35201;&#30003;&#35831;&#27249;&#31383;&#25512;&#24191;" target="_blank" href="http://c.alimama.com" style="width:26px;height:17px;right:0px;bottom:0px;display:block;position:absolute;cursor:pointer;z-index:250;">   <span id="' + m("icon_small") + '" style="float:none;width:26px;display:block;height:17px;background-repeat:no-repeat;background-image: url(\'' + l + "');*background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://img02.taobaocdn.com/tps/i2/T1oY3VXmNbXXXb8qDc-26-18.png');\"></span>   <span id=\"" + m("icon_big") + '" style="float:none;width:110px;height:17px;display: none;background-repeat:no-repeat;background-image: url(\'' + h + "');*background-image:none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='http://img03.taobaocdn.com/tps/i3/T1dt7VXiRaXXbd25o5-110-18.png');\"></span></a>";
        return '<div id="tanxssp_con_' + k.pid + '" style="display:inline-block;position:relative;width:' + k.width + "px;height:" + k.height + 'px;*display:inline;*zoom:1">' + e + j + "</div>"
    }
});
KSLITE.declare("tanxssp-otherwin", ["tanxssp-utils"],
function(b, a) {
    a.writeData = function(g) {
        var d = "1";
        var c = [];
        for (var e in g) {
            if (g.hasOwnProperty(e)) {
                if (e == "distype") {
                    c.push('"' + e + '":"' + d + '"')
                } else {
                    if (e == "data") {
                        c.push('"' + e + '":"' + g[e].replace(/"/g, '\\"') + '"')
                    } else {
                        c.push('"' + e + '":"' + g[e] + '"')
                    }
                }
            }
        }
        c = "{" + c.join(",") + "}";
        var h = "var TANXSSPFILE = 'http://cdn.tanx.com/t/tanxssp.js';var TANXSSPMAINFILE = 'http://cdn.tanx.com/t/tanxssp/main.js?_t=201405041424.js';var win = window;var head = win.document.getElementsByTagName(\"head\")[0];var s = win.document.createElement(\"script\");s.type = \"text/javascript\";s.charset = 'gbk';s.src = TANXSSPFILE;function callback() {    var s1 = win.document.createElement(\"script\");    s1.type =\"text/javascript\";    s1.charset = 'gbk';    s1.src = TANXSSPMAINFILE;    head.insertBefore(s1, head.lastChild);}s.onload = callback;s.onreadystatechange = function() {    if (s.readyState && (s.readyState == 'loaded' || s.readyState == 'complete')) {        callback();    }};head.insertBefore(s, head.lastChild);";
        var f = "";
        f += "<html>";
        f += "<head>";
        f += '<style type="text/css">*{margin:0;padding:0}</style>';
        f += '<script type="text/javascript">';
        f += "   window.tanx_ssp_temp_show_obj = " + c + ";";
        f += h;
        f += "<\/script>";
        f += "</head>";
        f += "<body>";
        f += '<a style="none" id="tanx-a-' + g.pid + '" style="display:none"></a>';
        f += "</body>";
        f += "</html>";
        return f
    }
});
KSLITE.declare("tanxssp-display", ["tanxssp-template", "tanxssp-utils", "tanxssp-config", "tanxssp-icon", "tanxssp-otherwin", "tanxssp-cookiemap", "tanxssp-close"],
function(a, c) {
    var n = a("tanxssp-template").Def;
    var k = a("tanxssp-utils");
    var m = a("tanxssp-config").c.mapAdType;
    var b = a("tanxssp-config").r;
    var g = a("tanxssp-config").c.mapDisType;
    var j = a("tanxssp-icon");
    var q = a("tanxssp-otherwin");
    var f = a("tanxssp-cookiemap").Def;
    var p = a("tanxssp-close");
    var e = {};
    function d(t, s) {
        if (s.insertAdjacentHTML) {
            s.insertAdjacentHTML("beforebegin", t)
        } else {
            var r = document.createElement("div");
            r.innerHTML = t;
            s.parentNode.insertBefore(r.getElementsByTagName("iframe")[0], s)
        }
    }
    function o(s, u, r, t) {
        var x = "tanx_frameanchor_" + s;
        var w = '<!doctype html><html><head><meta charset=gbk /></head><body style="margin:0px;padding:0px">' + t + "</body></html>";
        if (k.$(x)) { (function v(D) {
                if (D > 20) {
                    return false
                }
                var A = "tanxssp-outer-iframe" + s;
                var B = '<iframe id="' + A + '" width="' + u + '" height="' + r + '" style="display:none"';
                var z = " src=\"javascript:void((function(){try{var d=document;d.open();d.domain='" + document.domain + "';d.write('');d.close();}catch(e){}})())\"";
                var y = ' border="0" frameborder="0" scrolling="no" marginwidth="0" allowTransparency="true" marginheight="0"  style="border: 0pt none;"></iframe>';
                var E = B;
                if (navigator.userAgent.toLowerCase().indexOf("msie") > -1 && document.domain != location.hostname) {
                    E += z
                }
                E += y;
                var C = k.$(x);
                d(E, C);
                setTimeout(function() {
                    try {
                        var H = document.getElementById(A);
                        var G = H.contentWindow.document;
                        G.open("text/html", "replace");
                        G.write(w);
                        setTimeout(function() {
                            G.close()
                        },
                        20);
                        H.style.display = "";
                        if (H.style.display == "none") {
                            setTimeout(function() {
                                H.style.display = ""
                            },
                            10)
                        }
                    } catch(F) {
                        H.parentNode.removeChild(H);
                        E = B + z + y;
                        d(E, C);
                        if (!D) {
                            D = 1
                        } else {
                            D++
                        }
                        v(D)
                    }
                },
                20)
            })()
        }
    }
    function l(t, s, r) {
        this.frameCount = s;
        this.clickurl = r;
        this.pid = t;
        this.cur = 0;
        this.previous = 0;
        this.init()
    }
    k.mix(l.prototype, {
        interval: 2000,
        timer: null,
        isAuto: true,
        init: function() {
            this.show(0);
            this.start();
            this.bindEvents()
        },
        stopBubble: function(r) {
            r = r ? r: window.event;
            if (r.stopPropagation) {
                r.stopPropagation()
            } else {
                r.cancelBubble = true
            }
        },
        bindEvents: function() {
            var s = k.$("tanx-sw-wrap-" + this.pid);
            var t = this;
            s.onmouseover = function(u) {
                t.isAuto = false;
                k.$("tanx-sw-nav-" + t.pid).style.display = "block";
                t.stopBubble(u)
            };
            s.onmouseout = function(u) {
                t.isAuto = true;
                k.$("tanx-sw-nav-" + t.pid).style.display = "none";
                t.stopBubble(u)
            };
            for (var r = 0; r < this.frameCount; r++) { (function(v) {
                    var u = k.$("tanx-sw-nav-" + t.pid + v);
                    var w = k.$("tanx-sw-block-" + t.pid + v);
                    u.onmouseover = function() {
                        t.isAuto = false;
                        t.show(v)
                    };
                    u.onmouseout = function() {
                        t.isAuto = true
                    };
                    w.onclick = function(B) {
                        B = window.event || B;
                        var A = B.srcElement || B.target;
                        try {
                            if (A.tagName.toUpperCase() != "A") {
                                for (var y = 5; y > 0; y--) {
                                    A = A.parentNode;
                                    if (A.tagName.toUpperCase() == "A") {
                                        break
                                    }
                                }
                                if (A.tagName.toUpperCase() != "A") {
                                    A = 0
                                }
                            }
                            if (typeof A.href == "undefined") {
                                A = 0
                            }
                            if (A) {
                                if (A.tagName.toUpperCase() == "A" && A.getAttribute("href", 2).replace(/(^\s*)/g, "").indexOf("http") !== 0) {
                                    A = 0
                                }
                                var z = (A.getAttribute("href", 2).replace(/(^\s*)/g, "").match(/http:\/\/([^\/]+)/i) || ["", ""])[1];
                                new Image().src = decodeURIComponent(t.clickurl) + "&d_r=" + z + "_" + (new Date()).getTime().toString().substr(9)
                            }
                            t.stopBubble(B)
                        } catch(x) {}
                    }
                })(r)
            }
        },
        stop: function() {
            this.isAuto = false
        },
        start: function() {
            var r = this;
            this.timer = setInterval(function() {
                if (!r.isAuto) {
                    return false
                }
                var s = r.cur + 1;
                if (s >= r.frameCount) {
                    s = 0
                }
                r.show(s)
            },
            this.interval)
        },
        show: function(r) {
            try {
                this.cur = r;
                this.hide(this.previous);
                k.$("tanx-sw-block-" + this.pid + r).style.display = "block";
                k.$("tanx-sw-nav-" + this.pid + r).className = "tanx-sw-nav-cur";
                this.previous = this.cur
            } catch(s) {}
        },
        hide: function(r) {
            try {
                k.$("tanx-sw-block-" + this.pid + r).style.display = "none";
                k.$("tanx-sw-nav-" + this.pid + r).className = ""
            } catch(s) {}
        }
    });
    e.flash = function(u, r) {
        var v = k.tanxSId(u.pid);
        var s = "<a style='display:none !important;' id='tanx_frameanchor_" + u.pid + "'></a>";
        var t = n(u);
        k.showAd(s, v, null,
        function() {
            o(u.pid, u.width, u.height, t);
            if (r) {
                r()
            }
        })
    };
    e.iframehtml = function(s, r) {
        var t = k.tanxSId(s.pid);
        k.showAd(n(s), t, null,
        function() {
            o(s.pid, s.width, s.height, s.data);
            if (r) {
                r()
            }
        })
    };
    e.multiframe = function(u, t) {
        var y = u;
        var s = "#tanx-sw-nav-" + y.pid + " span";
        var B = "text-decoration:underline;color:#F60;cursor:pointer;margin-left:3px;width:18px;height:18px;background:white;float:left;font-size:13px;line-height:18px;overflow:visible;text-align:center;opacity:.6;filter:alpha(opacity=60);border:1px solid #D8D8D8;margin-left:-1px;font-family:tahoma,arial;";
        var w = "#tanx-sw-nav-" + y.pid + " span.tanx-sw-nav-cur";
        var v = "background:#F60;color:white;font-weight:bold;opacity:1;filter:alpha(opacity=100);z-index:2;position:relative;";
        var A = document;
        if (A.createStyleSheet) {
            var x = A.createStyleSheet();
            x.addRule(s, B);
            x.addRule(w, v)
        } else {
            var r = A.createElement("style");
            r.innerHTML = s + "{" + B + "}" + w + "{" + v + "}";
            r.setAttribute("type", "text/css");
            var z = A.getElementsByTagName("head")[0];
            z.insertBefore(r, z.firstChild)
        }
        var C = k.tanxSId(y.pid);
        k.showAd(n(u), C, null,
        function() {
            new l(u.pid, u.data.split("|+|").length || 0, u.clickurl);
            if (t) {
                t()
            }
        })
    };
    var h = {};
    h.popwin = (function() {
        var r = false;
        return function(t) {
            if (r) {
                return false
            }
            var s = function() {
                var z = document;
                var y = z.createElement("div");
                var w = k.$("tanxssp-outer-con" + t.pid);
                if (!w) {
                    w = k.$("tanxssp-outer-iframe" + t.pid)
                }
                if (!w) {
                    return false
                }
                y.style.cssText = "position:absolute;display:block;z-index:2147483647;height:0px;overflow:hidden;right:5px";
                var v = k.createCloseBtn();
                v.onclick = function() {
                    k.hide(y)
                };
                y.appendChild(v);
                y.appendChild(w);
                document.body.insertBefore(y, null);
                r = true;
                var A = 0;
                var u;
                var x = parseInt(t.height, 10);
                j.show(t);
                u = setInterval(function() {
                    var B = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                    var C = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
                    A += 30;
                    if (A >= x) {
                        A = x;
                        clearInterval(u);
                        y.style.overflow = "visible";
                        setTimeout(function() {
                            k.fixedEl(y, {
                                top: "auto",
                                right: "5px",
                                bottom: "0px"
                            })
                        },
                        0)
                    }
                    y.style.top = (B + C - A) + "px";
                    y.style.height = A + "px"
                },
                125)
            };
            k.domReady(function() {
                setTimeout(function() {
                    var v = k.tanxSId(t.pid);
                    var u = m[t.adboardtype];
                    if (!e[u]) {
                        k.showAd(n(t), v, null, s)
                    } else {
                        e[u](t, s)
                    }
                },
                50)
            })
        }
    })();
    h.backdisplay = function(x, s) {
        if (x.width < 254) {
            x.width = 254
        }
        if (x.width === "") {
            x.width = 760
        }
        if (x.height === "") {
            x.height = 480
        }
        var z = "width=" + x.width + ",height=" + x.height + ",toolbar=no,location=no,directories=no,status=yes,resizable=no,scrollbars=no";
        var r = q.writeData(x);
        var w = function() {
            var C;
            if ( !! (window.attachEvent && !window.opera)) {
                try {
                    var D = document.getElementById("tanx_popup_try") || document.createElement("iframe");
                    D.id = "tanx_popup_try";
                    D.style.display = "none";
                    document.body.insertBefore(D, document.body.childNodes[0]);
                    document.getElementById("tanx_popup_try").contentWindow.document.write(".");
                    document.body.removeChild(document.getElementById("tanx_popup_try"));
                    C = window.open("about:blank", "_blank", z);
                    D = null
                } catch(B) {
                    C = window.open('javascript:void((function(){var d=document;d.open();d.domain="' + document.domain + '";d.write("");d.close();})())', "_blank", z)
                }
            } else {
                C = window.open("about:blank", "_blank", z)
            }
            if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                C.HTMLElement.prototype.insertAdjacentElement = function(E, F) {
                    switch (E.toLowerCase()) {
                    case "beforebegin":
                        this.parentNode.insertBefore(F, this);
                        break;
                    case "afterbegin":
                        this.insertBefore(F, this.firstChild);
                        break;
                    case "beforeend":
                        this.appendChild(F);
                        break;
                    case "afterend":
                        if (this.nextSibling) {
                            this.parentNode.insertBefore(F, this.nextSibling)
                        } else {
                            this.parentNode.appendChild(F)
                        }
                        break
                    }
                };
                C.HTMLElement.prototype.insertAdjacentHTML = function(F, H) {
                    var G = this.ownerDocument.createRange();
                    G.setStartBefore(this);
                    var E = G.createContextualFragment(H);
                    this.insertAdjacentElement(F, E)
                }
            }
            C.blur();
            try {
                C.opener.focus()
            } catch(A) {}
            if (s) {
                C.location = s
            } else {
                var u = C.document;
                u.open("text/html", "replace");
                u.write(r);
                u.close()
            }
        };
        var v = function() {
            k.removeEvent(document, "click", v);
            try {
                w()
            } catch(u) {
                k.domReady(y)
            }
        };
        var y = function() {
            k.addEvent(document, "click", v)
        };
        try {
            y()
        } catch(t) {
            setTimeout(function() {
                y()
            },
            2000)
        }
    };
    h.couplet = (function() {
        return function(L) {
            var M = document;
            var u = Math.min(M.documentElement.clientHeight, M.body.clientHeight);
            var J = Math.min(M.documentElement.clientWidth, M.body.clientWidth);
            var K = {},
            G;
            if (L.webwidth) {
                G = ((J - parseInt(L.webwidth, 10)) / 2 - L.width)
            }
            G = (G < 0 || G === undefined) ? 5 : G;
            K.pos = {
                top: (u < 301 ? "80": "30") + "px"
            };
            var v = M.createElement("div");
            var t = M.createElement("div");
            v.style.cssText = "position:absolute;display:block;z-index:2147483647;left:" + G + "px";
            t.style.cssText = "position:absolute;display:block;z-index:2147483647;right:" + G + "px";
            var B = "tanx_displayframe_" + L.pid + "_l";
            var r = "tanx_displayframe_" + L.pid + "_r";
            var C = L.height;
            var E = L.width;
            function D(N) {
                return '<iframe id="' + N + '" width="' + E + '" height="' + C + '" border="0" frameborder="0" scrolling="no" marginwidth="0" allowTransparency="true" marginheight="0"  style="border: 0pt none;"></iframe>'
            }
            v.innerHTML = D(B);
            t.innerHTML = D(r);
            var w = k.createCloseBtn();
            var x = k.createCloseBtn();
            w.onclick = x.onclick = function() {
                k.hide(v);
                k.hide(t)
            };
            v.appendChild(w);
            t.appendChild(x);
            var y = document.body;
            y.insertBefore(v, y.firstChild);
            y.insertBefore(t, y.firstChild);
            k.fixedEl(v, K.pos);
            k.fixedEl(t, K.pos);
            var I = document.getElementById(B);
            var z = document.getElementById(r);
            var H = "javascript:void((function(){var d=document;d.open();d.domain='" + document.domain + "';d.write('');d.close();})())";
            if (navigator.userAgent.toLowerCase().indexOf("msie") > -1 && document.domain != location.hostname) {
                I.src = H;
                z.src = H
            }
            var F = q.writeData(L);
            var A = 0; (function s() {
                if (A > 10) {
                    return false
                }
                A++;
                try {
                    setTimeout(function() {
                        var O = I.contentWindow.document;
                        O.open("text/html", "replace");
                        O.write(F);
                        O.close();
                        var P = z.contentWindow.document;
                        P.open("text/html", "replace");
                        P.write(F);
                        P.close()
                    },
                    10)
                } catch(N) {
                    I.src = H;
                    z.src = H;
                    s()
                }
            })()
        }
    })();
    c.Def = function(w) {
        var y = k.tanxSId(w.pid);
        var s = m[w.adboardtype];
        var u = g[w.distype];
        f(w.pid);
        var t = false;
        if (s == "html" && u == "static") {
            for (var v = 0,
            r = b.units.length; v < r; v++) {
                if (b.units[v].i === w.pid) {
                    t = b.units[v].sync;
                    break
                }
            }
            if (t) {
                document.write(n(w));
                try {
                    setTimeout(function() {
                        j.show(w)
                    },
                    0)
                } catch(x) {}
            } else {
                k.showAd(n(w), y, null,
                function() {
                    setTimeout(function() {
                        j.show(w)
                    },
                    0)
                })
            }
            return false
        }
        if (u === "backdisplay") {
            h[u](w);
            return false
        }
        if (u === "couplet") {
            h[u](w);
            return false
        }
        if (u == "popwin") {
            h[u](w);
            return false
        }
        if (!e[s]) {
            k.showAd(n(w), y, null,
            function() {
                setTimeout(function() {
                    j.show(w)
                },
                0)
            })
        } else {
            e[s](w,
            function() {
                setTimeout(function() {
                    j.show(w)
                },
                0)
            })
        }
        setTimeout(function() {
            p.show(w)
        },
        300);
        if (h[u]) {
            setTimeout(function() {
                h[u](w)
            },
            0)
        }
    }
});
KSLITE.declare("tanxssp-template", ["tanxssp-utils", "tanxssp-config", "tanxssp-icon", "tanxssp-close"],
function(a, c) {
    var h = a("tanxssp-utils");
    var j = a("tanxssp-config").c.mapAdType;
    var e = a("tanxssp-config").c.mapDisType;
    var g = a("tanxssp-icon").tmpl;
    var l = a("tanxssp-close").tmpl;
    var d = {};
    d.txt = {
        tmpl: function(m) {
            return '<a href="' + m.clickurl + '" target="_blank">' + m.data + "</a>"
        }
    };
    d.txtlink = d.txt;
    d.pic = {
        tmpl: function(m) {
            return '<a href="' + m.clickurl + '" target="_blank"><img border=0 src="' + m.data + '" width="' + m.width + 'px" height="' + m.height + 'px"/></a>'
        }
    };
    d.tuwen = {
        tmpl: function(n) {
            var m = "pid=" + n.pid;
            if (n.data.indexOf("?") == -1) {
                m = "?" + m
            } else {
                m = "&" + m
            }
            return '<iframe src="' + n.data + m + '" width="' + n.width + 'px" height="' + n.height + 'px" border="0" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" allowTransparency="true"></iframe>'
        }
    };
    d.flash = {
        tmpl: function(o) {
            var m = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + o.width + 'px" height="' + o.height + 'px" align="middle">   <param name="allowScriptAccess" value="' + (o.bannermaker == "1" ? "always": "never") + '" />' + (o.fvs !== "" ? '<param name="flashvars" value="' + o.fvs + '" />': "") + '   <param name="movie" value="' + o.data + '" />   <param name="wmode" value="transparent" />   <param name="quality" value="high" />   <param name="bgcolor" value="#ffffff" />   <embed src="' + o.data + '" quality="high" bgcolor="#ffffff" width="' + o.width + '" height="' + o.height + '" ' + (o.fvs !== "" ? 'flashvars="' + o.fvs + '" ': "") + '      align="middle" allowScriptAccess="' + (o.bannermaker === "1" ? "always": "never") + '" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
            var n = '<!doctype html><html><head></head>  <body style="margin:0px;padding:0px">       <div style="float:left;z-index:100;position:absolute;width:' + o.width + "px;height:" + o.height + 'px;">' + m + '       </div>       <div style="float:left;overflow:hidden;z-index:1000;position:absolute;left:0;top:0;width:' + o.width + "px;height:" + o.height + 'px;">       <a style="position:absolute;height:100%;width:100%;overflow:hidden;font-size:900px;" target="_blank" href="' + o.clickurl + '">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></div> </body></html>';
            return n
        }
    };
    d.flashb = {
        tmpl: function(n) {
            if (n.fvs) {
                n.fvs = n.fvs + "&clickTAG=" + h.encode(n.clickurl)
            } else {
                n.fvs = "clickTAG=" + h.encode(n.clickurl)
            }
            var m = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + n.width + 'px" height="' + n.height + 'px" align="middle">    <param name="allowScriptAccess" value="' + (n.bannermaker === "1" ? "always": "never") + '" />    <param name="flashvars" value="' + n.fvs + '" />    <param name="movie" value="' + n.data + '" />    <param name="wmode" value="transparent" />    <param name="quality" value="high" />    <param name="bgcolor" value="#ffffff" />    <embed src="' + n.data + '" quality="high" bgcolor="#ffffff" width="' + n.width + '" height="' + n.height + '" flashvars="' + n.fvs + '" align="middle" allowScriptAccess="' + (n.bannermaker === "1" ? "always": "never") + '" wmode="transparent" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>';
            return m
        }
    };
    d.iframehtml = {
        tmpl: function(m) {
            return "<a style='display:none !important;' id='tanx_frameanchor_" + m.pid + "'></a>"
        }
    };
    d.multiframe = {
        tmpl: function(v) {
            var t = v.data.split("|+|");
            var m = t.length;
            var q = "";
            var p = "";
            var r = '<div id="tanx-sw-nav-' + v.pid + '" style="display:none;position:absolute;bottom:20px;right:10px;">{nav}</div>';
            var u = '<div><div id="tanx-sw-wrap-' + v.pid + '" style="display:block;position:relative;width:' + v.width + "px;height:" + v.height + 'px; border:0;margin:0;">{block}</div></div>';
            for (var n = 0; n < m; n++) {
                q += '<div id="tanx-sw-block-' + v.pid + n + '" style="display:' + (n === 0 ? "block": "none") + ';position:absolute;top:0;left:0;">' + t[n] + "</div>";
                p += '<span id="tanx-sw-nav-' + v.pid + n + '" style="display:block;text-decoration:none">' + (n + 1) + "</span>"
            }
            r = r.replace(/{nav}/gi, p);
            u = u.replace(/{block}/gi, [q, r].join(""));
            return u
        }
    };
    d.html = {
        tmpl: function(m) {
            return m.data
        }
    };
    function f(r, p) {
        var n = j[r.adboardtype];
        var o = e[r.distype];
        if (n == "html" && o == "static") {
            return p
        }
        if (r.adSpaceWidth && r.adSpaceHeight) {
            return '<ins style="display:inline-block;overflow:hidden;text-align:left;padding:0;margin:0;border:1px solid #e5e5e5;width:' + r.adSpaceWidth + "px;height:" + r.adSpaceHeight + "px;*zoom:1;*display:inline;background:#F3F3F3;padding-left:" + r.paddingLeft + "px;padding-top:" + r.paddingTop + 'px" id="tanxssp-outer-con' + r.pid + '">' + p + "</ins>"
        }
        var q;
        var m;
        if (parseInt(r.width, 10) <= 1) {
            q = "auto"
        } else {
            q = r.width + "px"
        }
        if (parseInt(r.height, 10) <= 1) {
            m = "auto"
        } else {
            m = r.height + "px"
        }
        return '<ins style="display:inline-block;padding:0;margin:0;width:' + q + ";height:" + m + ';*zoom:1;*display:inline" id="tanxssp-outer-con' + r.pid + '">' + p + "</ins>"
    }
    var k = "http://img.alimama.cn/defboards/domainbind/2/";
    var b = {};
    h.each(["760x90", "468x60", "250x60", "728x90", "950x90", "658x60", "120x600", "336x280", "300x250", "290x200", "120x60", "100x100", "120x240", "160x600", "180x250", "250x300", "360x190", "250x250", "200x200"],
    function(m) {
        b[m] = k + m + ".jpg"
    });
    c.Def = function(n) {
        if (n.unregist === "1") {
            n.clickurl = "http://a.alimama.cn";
            if (b[n.width + "x" + n.height]) {
                n.data = b[n.width + "x" + n.height]
            } else {
                n.data = "http://img.alimama.cn/defboards/domainbind/2/200x200.jpg"
            }
            n.distype = "1";
            n.adboardtype = "2"
        }
        var m = j[n.adboardtype];
        if (n.width === "0") {
            n.width = "auto"
        }
        if (n.height === "0") {
            n.height = "auto"
        }
        return f(n, l(n, g(n, d[m].tmpl(n))))
    }
});
KSLITE.declare("tanxssp-lazy", ["tanxssp-utils", "tanxssp-show", "tanxssp-config"],
function(c, b) {
    var a = c("tanxssp-show").show;
    var h = c("tanxssp-config").r;
    var g = false;
    if (window.is_tanx_ssp_lazy && ((location.host.indexOf("www.taobao.com") >= 0) || (location.host.indexOf("tb-fp.taobao.com") >= 0) || (location.host.indexOf("www.tmall.com") >= 0) || (location.host.indexOf("www.daily.taobao.net") >= 0))) {
        g = true;
        var f = window.tanx_ssp_lazy;
        window.tanx_ssp_lazy = {
            push: function(e) {
                var k = h.data[e];
                if (!k) {
                    h.laterShowData[e] = {
                        isRender: false
                    }
                }
                if (k && !k.isRender) {
                    a(k.data);
                    k.isRender = true
                }
            }
        };
        if (f && f.length) {
            for (var d = 0; d < f.length; d++) {
                try {
                    tanx_ssp_lazy.push(f[d])
                } catch(j) {}
            }
        }
    }
    b.treatShow = function(k) {
        var e = k.pid;
        if (!g) {
            a(k)
        } else {
            if (!h.data[e]) {
                h.data[e] = {
                    isRender: false,
                    data: k
                };
                if (h.laterShowData[e] && !h.laterShowData[e].isRender) {
                    tanx_ssp_lazy.push(e);
                    h.laterShowData[e].isRender = true
                }
            }
        }
    }
});
KSLITE.declare("tanxssp-ws2subway", ["tanxssp-config"],
function(b, a) {
    var c = b("tanxssp-config").r;
    a.Def = function(f) {
        var g = document.__tanxdata__ || {};
        var e = (f.data.indexOf("?") > 0 ? "&": "?") + "u=" + encodeURIComponent(c.getRef_url()) + "&r=" + encodeURIComponent(c.r) + "&t=" + f.tproduct + "&k=" + (g[f.pid] || "");
        if ((f.tproduct == "2" && f.icon == "3") || (f.tproduct == "4" && f.data.match(/^<iframe /i))) {
            f.data = f.data.replace(/src="(http:\/\/.*)?"/i, 'src="$1' + e + '"')
        }
        if (f.tproduct == "3") {
            f.data += e
        }
    }
});
KSLITE.declare("tanxssp-close", ["tanxssp-utils"],
function(c, a) {
    var b = c("tanxssp-utils");
    var d = {
        mm_2000078546_20134048_20158119: 1
    };
    a.list = d;
    a.isClose = function(f) {
        var e = b.getCookie(f);
        return d.hasOwnProperty(f) && e
    };
    a.tmpl = function(f, e) {
        if (!d.hasOwnProperty(f.pid)) {
            return e
        }
        var g = '<a href="javascript:;" style="display:block;position:absolute;top:5px;right:5px;width:12px;height:12px;"><img tanxssp-close="' + f.pid + '" src="http://gtms01.alicdn.com/tps/i1/T1Ey6ZFaxeXXaKKoA_-11-11.png" border="0"></a>';
        return '<div id="tanxssp_col_' + f.pid + '" style="display:inline-block;position:relative;width:' + f.width + "px;height:" + f.height + 'px;*display:inline;*zoom:1">' + e + g + "</div>"
    };
    a.show = function(f) {
        var e = b.$("tanxssp-outer-con" + f.pid);
        if (!e) {
            return
        }
        b.addEvent(e, "click",
        function(j) {
            var h = j.target;
            if (!h || !h.tagName) {
                return
            }
            if (h.tagName.toLowerCase() == "img") {
                var g = b.getAttr(h, "tanxssp-close");
                if (g) {
                    b.setCookie(g, "1", 1);
                    e.parentNode.removeChild(e)
                }
            }
        })
    }
});
KSLITE.declare("tanxssp-activeview", ["tanxssp-utils", "tanxssp-params", "tanxssp-config"],
function(d, b) {
    var a = d("tanxssp-utils");
    var e = d("tanxssp-params").pvid;
    var c = d("tanxssp-config").r.ali;
    var g = document;
    var f = {
        isTobeCheck: function() {
            var h = Math.floor(Math.random() * 1000 + 1);
            if (!c && (h === 2 || h === 1)) {
                return true
            }
            return false
        },
        viewPortSize: function() {
            var j = window,
            h = "inner";
            if (! ("innerWidth" in window)) {
                h = "client";
                j = g.documentElement || g.body
            }
            return {
                vw: j[h + "Width"],
                vh: j[h + "Height"]
            }
        },
        pageSize: function() {
            var j = g.documentElement,
            h = g.body;
            return {
                pw: Math.max(j.clientWidth, h.clientWidth),
                ph: Math.max(j.clientHeight, h.clientHeight)
            }
        },
        pageVisibility: (function() {
            var h;
            if (typeof document.hidden !== "undefined") {
                h = "hidden"
            } else {
                if (typeof document.mozHidden !== "undefined") {
                    h = "mozHidden"
                } else {
                    if (typeof document.msHidden !== "undefined") {
                        h = "msHidden"
                    } else {
                        if (typeof document.webkitHidden !== "undefined") {
                            h = "webkitHidden"
                        }
                    }
                }
            }
            return function() {
                if (h) {
                    return~~ ! g[h]
                } else {
                    return - 1
                }
            }
        })(),
        isIframe: function() {
            return~~ (self != top)
        },
        pageOpenTime: parseInt(new Date() / 1000, 10),
        adRect: function(h) {
            var j = {
                width: 0,
                height: 0,
                left: 0,
                top: 0
            };
            var k = this.getAdEl(h);
            if (k) {
                if ((k.childNodes.length > 0) || (k.tagName.toLowerCase() == "iframe")) {
                    j = k.getBoundingClientRect();
                    if (j.height === undefined || j.width === undefined) {
                        j = a.mix({},
                        j);
                        j.height = k.offsetHeight;
                        j.width = k.offsetWidth
                    }
                }
            }
            j.top = Math.round(j.top);
            j.left = Math.round(j.left);
            return j
        },
        adPosInPage: function(j) {
            var l = g.documentElement,
            h = g.body,
            m = (l.scrollLeft || h.scrollLeft),
            k = (l.scrollTop || h.scrollTop);
            return {
                wx: j.left + m,
                wy: j.top + k
            }
        },
        hashCode: function(k) {
            var j = 0;
            var h;
            if (k.length === 0) {
                return j
            }
            for (i = 0; i < k.length; i++) {
                h = k.charCodeAt(i);
                j = ((j << 5) - j) + h
            }
            return (j >>> 0).toString(16)
        },
        bindEvents: function() {
            if (this.binded) {
                return false
            }
            var h = this;
            a.addEvent(window, "scroll",
            function() {
                h.walkList()
            });
            this.binded = true
        },
        checkListObj: {},
        walkListTimer: null,
        walkList: function() {
            if (this.walkListTimer) {
                clearTimeout(this.walkListTimer)
            }
            var j = this;
            function h(n) {
                var k = j.viewPortSize();
                var m = j.adRect(n);
                var o = {
                    x: m.left,
                    y: m.top
                };
                var l = {
                    x: m.left + m.width,
                    y: m.top + m.height
                };
                if (((o.x >= 0 && o.x <= k.vw) && (o.y >= 0 && o.y <= k.vh)) || ((l.x >= 0 && l.x <= k.vw) && (l.y >= 0 && l.y <= k.vh))) {
                    new b.checker(n);
                    j.checkListObj[n] = true
                }
            }
            this.walkListTimer = setTimeout(function() {
                for (var k in j.checkListObj) {
                    if (j.checkListObj[k] === true) {
                        continue
                    }
                    var l = j.getAdEl(k);
                    if (!l) {
                        setTimeout(function() {
                            h(k)
                        },
                        100)
                    } else {
                        h(k)
                    }
                }
            },
            50)
        },
        check: function(h) {
            if (this.isTobeCheck(h)) {
                this.bindEvents();
                this.firstLog(h);
                if (!this.isIframe()) {
                    this.checkListObj[h] = false;
                    this.walkList()
                }
            }
        },
        firstLog: function(m) {
            var j = this.isIframe();
            var k = {
                ah: 0,
                ai: j,
                aw: 0,
                gtm: parseInt(new Date() / 1000, 10),
                mo: 0,
                pid: m,
                ta: 0,
                vh: 0,
                vw: 0,
                vx: 0,
                vy: 0,
                wx: 0,
                wy: 0,
                pw: 0,
                ph: 0
            };
            var l = "";
            var h = ["gtm", "aw", "ah", "vw", "vh", "wx", "wy", "vx", "vy", "mo", "ta", "ai", "pw", "ph"];
            var n = [];
            l += "p=" + e;
            l += "&s=0";
            l += "&o=" + this.pageOpenTime;
            l += "&i=" + m;
            l += "&f=" + h.join(",");
            l += "&r=";
            a.each(h,
            function(p) {
                n.push(k[p])
            });
            l += n.join(",");
            var o = this.hashCode(l);
            l += "&h=" + o;
            this.send(l)
        },
        cacheAdEl: {},
        getAdEl: function(j) {
            if (this.cacheAdEl[j]) {
                return this.cacheAdEl[j]
            }
            var l = g.getElementById("tanx-a-" + j);
            var k = l;
            var m = 0;
            while (k && (a.css(k, "display") == "none")) {
                m++;
                if (m === 6) {
                    break
                }
                k = k.previousSibling;
                if (k) {
                    while (k.nodeType !== 1) {
                        k = k.previousSibling;
                        m++;
                        if (m === 6) {
                            break
                        }
                    }
                }
            }
            if (k === l || k === null) {
                var h = g.getElementById("tanxssp-outer-con" + j) || g.getElementById("tanx_displayframe_" + j + "_l");
                if (!h) {
                    return null
                } else {
                    k = h
                }
            }
            this.cacheAdEl[j] = k;
            return k
        },
        canSend: function(h) {
            if (h === 0) {
                return 0
            }
            if (h == 1) {
                return 1
            }
            var j = Math.log(h) / Math.log(2);
            return~~ (parseInt(j, 10) === j)
        },
        buildQuery: function(k) {
            var j = "";
            var h = ["gtm", "aw", "ah", "vw", "vh", "wx", "wy", "vx", "vy", "mo", "ta", "ai", "pw", "ph"];
            j += "p=" + k[0].pvid;
            j += "&s=" + k[0].startTime;
            j += "&o=" + this.pageOpenTime;
            j += "&i=" + k[0].pid;
            j += "&f=" + h.join(",");
            a.each(k,
            function(m) {
                j += "&r=";
                var n = [];
                a.each(h,
                function(o) {
                    n.push(m[o])
                });
                j += n.join(",")
            });
            var l = this.hashCode(j);
            j += "&h=" + l;
            return j
        },
        send: function(k) {
            var j = window["tanxssp-feedback-cache"] || (window["tanxssp-feedback-cache"] = {});
            var h = new Image();
            var m = "av_" + Math.floor(Math.random() * 10000);
            var l = "http://activeview.tanx.com/t?" + k;
            j[m] = h;
            h.onload = h.onerror = function() {
                h.onload = h.onerror = null;
                h = null;
                delete j[m]
            };
            h.src = l
        }
    };
    b.checker = function(j) {
        this.pid = j;
        this.hasMouseover = false;
        this.checkIndex = 0;
        this.maxCheck = 33;
        this.dataStack = [];
        this.pvid = e;
        this.timer = null;
        this.startTime = null;
        var h = this;
        var k = f.getAdEl(j);
        if (!k) {
            setTimeout(function() {
                new b.checker(j)
            },
            250);
            return false
        }
        h.mouseListener = function() {
            h.hasMouseover = true
        };
        a.addEvent(k, "mouseover", h.mouseListener);
        h.check()
    };
    b.checker.prototype.check = function() {
        if (this.checkIndex == this.maxCheck) {
            clearTimeout(this.timer);
            return false
        }
        var j = this;
        var l = f;
        var h = l.adRect(j.pid);
        var k = {
            pid: j.pid,
            pvid: e,
            gtm: parseInt(new Date() / 1000, 10),
            aw: h.width,
            ah: h.height,
            ai: l.isIframe(),
            vx: h.left,
            vy: h.top,
            ta: l.pageVisibility(),
            mo: ~~ (j.hasMouseover)
        };
        if (!this.startTime) {
            this.startTime = k.gtm
        }
        k.startTime = j.startTime;
        a.mix(k, l.adPosInPage(h));
        a.mix(k, l.viewPortSize());
        a.mix(k, l.pageSize());
        j.dataStack.push(k);
        j.hasMouseover = false;
        if (l.canSend(j.checkIndex)) {
            l.send(l.buildQuery(j.dataStack));
            j.dataStack = []
        }
        j.checkIndex++;
        j.timer = setTimeout(function() {
            j.check()
        },
        1000)
    };
    a.mix(b, f)
});
KSLITE.declare("tanxssp-iframe-stat", ["tanxssp-config"],
function(e, d) {
    var f = e("tanxssp-config").r;
    var h = f.win;
    var c = f.maxwin;
    var g = f.frm;
    var b = Math.floor(Math.random() * 100 + 1);
    d.Def = function(a, j, l) {
        if (!/taobao.com|weibo.com|ifeng.com|tmall.com|1688.com|sina.com|youku.com$/ig.test(document.domain) && b < 3 && g) {
            var k = new Image();
            window[Math.random().toString(16).substring(2)] = k;
            k.src = "http://gm.mmstat.com/tanx.55" + (h == c ? "1": "0") + "?logtype=2&pid=" + a + "&u=" + j + "&r=" + l
        }
    }
}); (function() {
    if (window.tanx_ssp_temp_adobj) {
        var a = window.tanx_ssp_temp_adobj;
        try {
            window.tanx_ssp_temp_adobj = null;
            delete window.tanx_ssp_temp_adobj
        } catch(c) {}
        KSLITE.provide(["tanxssp-main"],
        function(d) {
            d("tanxssp-main").run(a)
        })
    }
    if (window.tanx_ssp_temp_show_obj) {
        var b = window.tanx_ssp_temp_show_obj;
        try {
            window.tanx_ssp_temp_show_obj = null;
            delete window.tanx_ssp_temp_show_obj
        } catch(c) {}
        try {
            KSLITE.provide(["tanxssp-display"],
            function(d) {
                d("tanxssp-display").Def(b)
            })
        } catch(c) {}
    }
})();