iwt-min.js

//20120502
(function(a, b, c) {
    function y() {}
    function z(b) {
        d && a.console && a.console.log && a.console.log("MTFlashStore:" + b)
    }
    function H() {
        o.get(i,
        function(a) {
            a ? (D._getQueryStrByName(j) != "" ? m = f + a + "&_iwt_cid=" + D._getQueryStrByName(j) + "&_iwt_UA=" + D._getUAId() : m = f + a + "&_iwt_UA=" + D._getUAId(), I(m,
            function(a) {
                o.set(i, a),
                k = a
            })) : (D._getQueryStrByName(j) != "" ? m = f + "&_iwt_cid=" + D._getQueryStrByName(j) + "&_iwt_UA=" + D._getUAId() : m = f + "&_iwt_UA=" + D._getUAId(), I(m,
            function(a) {
                o.set(i, a),
                k = a
            }))
        })
    }
    function I(d, e) {
        var f = b.createElement("script"),
        g = o.guid();
        a[g] = function() {
            try {
                e.apply(a, arguments),
                n.removeChild(f)
            } catch(b) {}
            a[g] = c
        },
        f.setAttribute("type", "text/javascript"),
        f.setAttribute("charset", "utf-8");
        var h = d + "&jsonp=" + g + "&";
        typeof _iwt_p1 == "undefined" ? h += "_iwt_p1=&": h = h + "_iwt_p1=" + _iwt_p1 + "&",
        typeof _iwt_p2 == "undefined" ? h += "_iwt_p2=&": h = h + "_iwt_p2=" + _iwt_p2 + "&",
        typeof _iwt_p3 == "undefined" ? h += "_iwt_p3=&": h = h + "_iwt_p3=" + _iwt_p3 + "&";
        if (typeof _iwt_no_referrer != "undefined" && !_iwt_no_referrer) {
            var i = D.getReferrer();
            i != "" && (h = h + "ref=" + encodeURIComponent(i) + "&")
        }
        f.setAttribute("src", h),
        n.firstChild ? n.insertBefore(f, n.firstChild) : n.appendChild(f)
    }
    var d = !1,
    e = !-[1],
    f = "http://irs01.com/irt?_iwt_id=",
    g = "http://irs01.net/MTFlashStore.swf#",
    h = "http://irs01.com/_iwt.gif",
    i = "_iwt_id",
    j = "_iwt_cid",
    k = "",
    l = "",
    m = "",
    n = b.getElementsByTagName("head")[0],
    o = {
        available: !1,
        guid: function() {
            return ["MT", ( + (new Date) + p++).toString(36), (Math.random() * 1e18).toString(36)].join("").slice(0, 16).toUpperCase()
        },
        get: function(a, b) {
            return o._sendFlashMsg(b, "jGetItem", a)
        },
        set: function(a, b, c) {
            return o._sendFlashMsg(c, "jSetItem", a, b)
        },
        clear: function(a, b) {
            return o._sendFlashMsg(b, "jClearItem", a)
        },
        clearAll: function(a) {
            return o._sendFlashMsg(a, "jClearAllItems")
        },
        _sendFlashMsg: function(b, c, d, e) {
            b = b || y;
            var f = o.guid();
            a[f] = b;
            switch (arguments.length) {
            case 2:
                u[c](f);
                break;
            case 3:
                u[c](d, f);
                break;
            case 4:
                u[c](d, e, f)
            }
        },
        initSWF: function(a, b) {
            if (!o.available) return b && b();
            if (o.inited) return a && setTimeout(a, 0);
            a && q.push(a),
            b && r.push(b)
        }
    },
    p = 1,
    q = [],
    r = [],
    s = "",
    t,
    u,
    v,
    w = b.createElement("DIV"),
    x = o.guid();
    if (!a._iwt_no_flash) {
        try {
            t = a.navigator.plugins["Shockwave Flash"] || a.ActiveXObject,
            s = t.description ||
            function() {
                return (new t("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
            } ()
        } catch(A) {}
        s = (s.match(/\d+/g) || [0])[0];
        if (s < 9) o.available = !1;
        else {
            o.available = !0,
            a[x] = function(b, c) {
                switch (b) {
                case "onecall":
                    if (!a[c]) return;
                    a[c].apply(a, [].slice.call(arguments, 2)),
                    delete a[c];
                    break;
                case "error":
                    o.available = !1;
                    while (v = r.shift()) v();
                    z(c);
                    break;
                case "load":
                    z("Flash load success!"),
                    o.inited = !0,
                    o.available = !0;
                    while (v = q.shift()) setTimeout(v, 0)
                }
            };
            function B() {
                w.setAttribute("style", "display:block;clear:both;float:none;position:absolute;right:0;bottom:0;border:none;"),
                b.body.firstChild ? b.body.insertBefore(w, b.body.firstChild) : b.body.appendChild(w),
                w.innerHTML = '<object id="' + o.guid() + (e ? ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ': "") + '" data="' + g + '" type="application/x-shockwave-flash" ' + ' width="10" height="10" style="position:absolute;right:0;bottom:0;border:none;" >' + '<param name="movie" value="' + g + '" />' + '<param name="wmode" value="transparent" />' + '<param name="version" value="10" />' + '<param name="allowScriptAccess" value="always" />' + '<param name="flashvars" value="jsproxyfunction=' + x + '" />' + "</object>",
                u = w.firstChild,
                o.swf = u
            }
            var C = setInterval(function() {
                b.body && (B(), clearInterval(C))
            },
            100)
        }
    }
    var D = {
        track: function() {
            o.available ? (o.initSWF(H), setTimeout(function() {
                o.inited || (o.available = !1, a[x] = y, D.track())
            },
            3e3)) : (this._getQueryStrByName(j) != "" ? m = f + "&_iwt_cid=" + this._getQueryStrByName(j) + "&_iwt_UA=" + this._getUAId() : m = f + "&_iwt_UA=" + this._getUAId(), I(m,
            function(a) {
                var b = a;
                k = a
            }))
        },
        record_video_api: function(a, b, c, d) {
            if (d + "" == "0") {
                l = this._getHashId(),
                this._feedBack_video(a, b, c, d);
                return
            }
            this._feedBack_video(a, b, c, d)
        },
        _feedBack_video: function(a, b, c, d) {
            var e = ["ta=" + d, "eid=" + l, "pt=" + encodeURIComponent(document.title), "vid=" + a, "du=" + b, "la=" + c, "_iwt_id=" + k, "_iwt_UA=" + this._getUAId(), "r=" + (new Date).getTime()].join("&"),
            f = h + "?" + e;
            this._img = new Image,
            this._img.src = f
        },
        _getHashId: function() {
            var a = location.href,
            b = (new Date).valueOf(),
            c = navigator.userAgent,
            d = "";
            return d = this._md5([location.host, a, c, b, Math.random()].join("")),
            d
        },
        _getUAId: function() {
            return typeof _iwt_UA == "undefined" ? "": _iwt_UA
        },
        _getQueryStrByName: function(a) {
            var b = location.search.match(new RegExp("[?&]" + a + "=([^&]+)", "i"));
            return b == null || b.length < 1 ? "": b[1]
        },
        _getCookie: function(a) {
            var b, c, d, e = document.cookie.split(";");
            for (b = 0; b < e.length; b++) {
                c = e[b].substr(0, e[b].indexOf("=")),
                d = e[b].substr(e[b].indexOf("=") + 1),
                c = c.replace(/^\s+|\s+$/g, "");
                if (c == a) return unescape(d)
            }
        },
        getReferrer: function() {
            var a = "";
            try {
                a = window.top.document.referrer
            } catch(b) {
                if (window.parent) try {
                    a = window.parent.document.referrer
                } catch(c) {
                    a = ""
                }
            }
            return a == "" && (a = document.referrer),
            a
        },
        _md5: function(a) {
            function b(a, b) {
                return a << b | a >>> 32 - b
            }
            function c(a, b) {
                var c, d, e, f, g;
                return e = a & 2147483648,
                f = b & 2147483648,
                c = a & 1073741824,
                d = b & 1073741824,
                g = (a & 1073741823) + (b & 1073741823),
                c & d ? g ^ 2147483648 ^ e ^ f: c | d ? g & 1073741824 ? g ^ 3221225472 ^ e ^ f: g ^ 1073741824 ^ e ^ f: g ^ e ^ f
            }
            function d(a, b, c) {
                return a & b | ~a & c
            }
            function e(a, b, c) {
                return a & c | b & ~c
            }
            function f(a, b, c) {
                return a ^ b ^ c
            }
            function g(a, b, c) {
                return b ^ (a | ~c)
            }
            function h(a, e, f, g, h, i, j) {
                return a = c(a, c(c(d(e, f, g), h), j)),
                c(b(a, i), e)
            }
            function i(a, d, f, g, h, i, j) {
                return a = c(a, c(c(e(d, f, g), h), j)),
                c(b(a, i), d)
            }
            function j(a, d, e, g, h, i, j) {
                return a = c(a, c(c(f(d, e, g), h), j)),
                c(b(a, i), d)
            }
            function k(a, d, e, f, h, i, j) {
                return a = c(a, c(c(g(d, e, f), h), j)),
                c(b(a, i), d)
            }
            function l(a) {
                var b, c = a.length,
                d = c + 8,
                e = (d - d % 64) / 64,
                f = (e + 1) * 16,
                g = Array(f - 1),
                h = 0,
                i = 0;
                while (i < c) b = (i - i % 4) / 4,
                h = i % 4 * 8,
                g[b] = g[b] | a.charCodeAt(i) << h,
                i++;
                return b = (i - i % 4) / 4,
                h = i % 4 * 8,
                g[b] = g[b] | 128 << h,
                g[f - 2] = c << 3,
                g[f - 1] = c >>> 29,
                g
            }
            function m(a) {
                var b = "",
                c = "",
                d, e;
                for (e = 0; e <= 3; e++) d = a >>> e * 8 & 255,
                c = "0" + d.toString(16),
                b += c.substr(c.length - 2, 2);
                return b
            }
            function n(a) {
                a = a.replace(/\r\n/g, "\n");
                var b = "";
                for (var c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    d < 128 ? b += String.fromCharCode(d) : d > 127 && d < 2048 ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(d & 63 | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(d & 63 | 128))
                }
                return b
            }
            var o = Array(),
            p,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x,
            y = 7,
            z = 12,
            A = 17,
            B = 22,
            C = 5,
            D = 9,
            E = 14,
            F = 20,
            G = 4,
            H = 11,
            I = 16,
            J = 23,
            K = 6,
            L = 10,
            M = 15,
            N = 21;
            a = n(a),
            o = l(a),
            u = 1732584193,
            v = 4023233417,
            w = 2562383102,
            x = 271733878;
            for (p = 0; p < o.length; p += 16) q = u,
            r = v,
            s = w,
            t = x,
            u = h(u, v, w, x, o[p + 0], y, 3614090360),
            x = h(x, u, v, w, o[p + 1], z, 3905402710),
            w = h(w, x, u, v, o[p + 2], A, 606105819),
            v = h(v, w, x, u, o[p + 3], B, 3250441966),
            u = h(u, v, w, x, o[p + 4], y, 4118548399),
            x = h(x, u, v, w, o[p + 5], z, 1200080426),
            w = h(w, x, u, v, o[p + 6], A, 2821735955),
            v = h(v, w, x, u, o[p + 7], B, 4249261313),
            u = h(u, v, w, x, o[p + 8], y, 1770035416),
            x = h(x, u, v, w, o[p + 9], z, 2336552879),
            w = h(w, x, u, v, o[p + 10], A, 4294925233),
            v = h(v, w, x, u, o[p + 11], B, 2304563134),
            u = h(u, v, w, x, o[p + 12], y, 1804603682),
            x = h(x, u, v, w, o[p + 13], z, 4254626195),
            w = h(w, x, u, v, o[p + 14], A, 2792965006),
            v = h(v, w, x, u, o[p + 15], B, 1236535329),
            u = i(u, v, w, x, o[p + 1], C, 4129170786),
            x = i(x, u, v, w, o[p + 6], D, 3225465664),
            w = i(w, x, u, v, o[p + 11], E, 643717713),
            v = i(v, w, x, u, o[p + 0], F, 3921069994),
            u = i(u, v, w, x, o[p + 5], C, 3593408605),
            x = i(x, u, v, w, o[p + 10], D, 38016083),
            w = i(w, x, u, v, o[p + 15], E, 3634488961),
            v = i(v, w, x, u, o[p + 4], F, 3889429448),
            u = i(u, v, w, x, o[p + 9], C, 568446438),
            x = i(x, u, v, w, o[p + 14], D, 3275163606),
            w = i(w, x, u, v, o[p + 3], E, 4107603335),
            v = i(v, w, x, u, o[p + 8], F, 1163531501),
            u = i(u, v, w, x, o[p + 13], C, 2850285829),
            x = i(x, u, v, w, o[p + 2], D, 4243563512),
            w = i(w, x, u, v, o[p + 7], E, 1735328473),
            v = i(v, w, x, u, o[p + 12], F, 2368359562),
            u = j(u, v, w, x, o[p + 5], G, 4294588738),
            x = j(x, u, v, w, o[p + 8], H, 2272392833),
            w = j(w, x, u, v, o[p + 11], I, 1839030562),
            v = j(v, w, x, u, o[p + 14], J, 4259657740),
            u = j(u, v, w, x, o[p + 1], G, 2763975236),
            x = j(x, u, v, w, o[p + 4], H, 1272893353),
            w = j(w, x, u, v, o[p + 7], I, 4139469664),
            v = j(v, w, x, u, o[p + 10], J, 3200236656),
            u = j(u, v, w, x, o[p + 13], G, 681279174),
            x = j(x, u, v, w, o[p + 0], H, 3936430074),
            w = j(w, x, u, v, o[p + 3], I, 3572445317),
            v = j(v, w, x, u, o[p + 6], J, 76029189),
            u = j(u, v, w, x, o[p + 9], G, 3654602809),
            x = j(x, u, v, w, o[p + 12], H, 3873151461),
            w = j(w, x, u, v, o[p + 15], I, 530742520),
            v = j(v, w, x, u, o[p + 2], J, 3299628645),
            u = k(u, v, w, x, o[p + 0], K, 4096336452),
            x = k(x, u, v, w, o[p + 7], L, 1126891415),
            w = k(w, x, u, v, o[p + 14], M, 2878612391),
            v = k(v, w, x, u, o[p + 5], N, 4237533241),
            u = k(u, v, w, x, o[p + 12], K, 1700485571),
            x = k(x, u, v, w, o[p + 3], L, 2399980690),
            w = k(w, x, u, v, o[p + 10], M, 4293915773),
            v = k(v, w, x, u, o[p + 1], N, 2240044497),
            u = k(u, v, w, x, o[p + 8], K, 1873313359),
            x = k(x, u, v, w, o[p + 15], L, 4264355552),
            w = k(w, x, u, v, o[p + 6], M, 2734768916),
            v = k(v, w, x, u, o[p + 13], N, 1309151649),
            u = k(u, v, w, x, o[p + 4], K, 4149444226),
            x = k(x, u, v, w, o[p + 11], L, 3174756917),
            w = k(w, x, u, v, o[p + 2], M, 718787259),
            v = k(v, w, x, u, o[p + 9], N, 3951481745),
            u = c(u, q),
            v = c(v, r),
            w = c(w, s),
            x = c(x, t);
            var O = m(u) + m(v) + m(w) + m(x);
            return O.toLowerCase()
        }
    },
    E,
    F = !1,
    G = !1;
    a._iwt = D,
    D.FC = o,
    _iwt.track()
})(window, document);