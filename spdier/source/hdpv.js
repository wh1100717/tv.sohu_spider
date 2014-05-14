//2014-3-4 10:29 ww
window.sohuHD || (window.sohuHD = {}),
sohuHD.cookie || (sohuHD.cookie = function(e, t, n) {
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
}),
function(e, t) {
    if (typeof e._hdpv != "undefined") return;
    var n = {},
    r = "http://pv.hd.sohu.com/pvpb.gif",
    i = 1,
    s = {
        pingback: function(e) {
            var t = new Image,
            r = "hdpv_" + i++;
            n[r] = t,
            t.onload = t.onerror = t.onabort = function() {
                n[r] = null
            },
            t.src = e
        },
        sendClickLog: function(e, t) {
            e = e || "";
            var n = location.href,
            r = t && t.getAttribute ? t.getAttribute("href") : "",
            i = encodeURIComponent;
            this.pingback("http://click.hd.sohu.com.cn/s.gif?type=" + e + "&ref=" + i(n) + "&des=" + i(r))
        },
        utf8to16: function(e) {
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
        b64_decodex: function(e) {
            var t = new Array,
            n, r = "";
            for (n = 0; n < e.length; n += 4) r += s.b64_423(e.substr(n, 4));
            for (n = 0; n < r.length; n += 8) t += s.b2i(r.substr(n, 8));
            return t
        },
        b64_423: function(e) {
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
        b2i: function(e) {
            var t = 0,
            n = 128;
            for (var r = 0; r < 8; r++, n /= 2) e.charAt(r) == "1" && (t += n);
            return String.fromCharCode(t)
        }
    };
    s.passport = function() {
        var e = function() {
            var e = ["ppinf", "ppinfo", "passport"],
            n,
            r,
            i;
            for (n = 0, r = e.length; n < r; n++) {
                i = (new RegExp("\\b" + e[n] + "\\b=(.*?)(?:$|;)")).exec(t.cookie);
                if (i && i.length) {
                    i = i[1];
                    break
                }
            }
            return i
        },
        n = function(e) {
            var t, n = s.utf8to16,
            r = s.b64_decodex;
            try {
                e = unescape(e).split("|");
                if (e[0] == "1" || e[0] == "2") t = n(r(e[3]));
                return t
            } catch(i) {}
        },
        r = function(e) {
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
        i = function() {
            return r(n(e()))
        };
        return {
            getAppid: function() {
                return i().appid || ""
            },
            getPassport: function() {
                return i().userid || ""
            },
            getUid: function() {
                return i().uid || ""
            },
            getUUID: function() {
                return i().uuid || ""
            },
            getQname: function() {
                return i().uniqname || ""
            }
        }
    } ();
    var o = {
        ie: !-[1],
        swfurl: "http://tv.sohu.com/upload/swf/playerGetUID131031.swf",
        timer: null,
        intervalID: null,
        container: null,
        pageLB: sohuHD.cookie("series_video"),
        guid: function() {
            return ["TT", ( + (new Date) + i++).toString(36), (Math.random() * 1e18).toString(36)].join("").slice(0, 16).toUpperCase()
        },
        getLandrefer: function() {
            var e = function() {
                var e = t.referrer;
                return e ? (e = e.split("?")[0], e = e.split("#")[0], e.indexOf("tv.sohu.com") == -1) : !1
            },
            n = sohuHD.cookie("landingrefer");
            return n || (e() ? (sohuHD.cookie("landingrefer", encodeURIComponent(t.referrer), {
                path: "/",
                domain: "tv.sohu.com"
            }), n = t.referrer) : n = ""),
            n
        },
        createSWF: function() {
            this.container || (this.container = t.createElement("div"), t.body.firstChild ? t.body.insertBefore(this.container, t.body.firstChild) : t.body.appendChild(this.container), this.container.setAttribute("style", "display:block;clear:both;float:none;position:absolute;right:0;bottom:0;border:none;"));
            var e = this.guid();
            this.container.innerHTML = '<object name="' + e + '" id="' + e + (this.ie ? '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ': "") + '" data="' + this.swfurl + '" type="application/x-shockwave-flash"  width="1" height="1" style="position:absolute;right:0;bottom:0;border:none;" >' + '<param name="movie" value="' + this.swfurl + '" /><param name="wmode" value="transparent" /><param name="version" value="10" /><param name="allowScriptAccess" value="always" /><param name="flashvars" /></object>',
            this.swf = t.getElementById(e)
        },
        run: function() {
            clearTimeout(this.timer),
            this.itmer = null;
            if (typeof this.flashVersion == "undefined") {
                this.flashVersion = "";
                try {
                    var n = e.navigator.plugins["Shockwave Flash"] || e.ActiveXObject;
                    this.flashVersion = n.description ||
                    function() {
                        return (new n("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
                    } ()
                } catch(r) {}
                this.flashVersion = (this.flashVersion.match(/\d+/g) || [0])[0]
            }
            var i = this;
            this.executed = !1,
            this.flashVersion < 9 ? u(null, e.undefined) : t.body ? (i.createSWF(), i.timer = setTimeout(function() {
                u(null, e.undefined, "timeout=1")
            },
            1e4)) : this.intervalID == null && (this.intervalID = setInterval(function() {
                t.body && (clearInterval(i.intervalID), i.intervalID == null, i.createSWF(), i.timer = setTimeout(function() {
                    u(null, e.undefined, "timeout=1")
                },
                1e4))
            },
            100))
        }
    },
    u = function(n, i, u) {
        if (o.swf && typeof o.swf.getData != "function") {
            var a = Array.prototype.slice.call(arguments),
            f = arguments.callee;
            return setTimeout(function() {
                f.apply(e, a)
            },
            50),
            !1
        }
        o.timer && (clearTimeout(o.timer), o.timer = null);
        if ( !! o.executed) return;
        o.executed = !0;
        var l = function() {
            var e = 0;
            return e = o.lb ? o.lb: o.pageLB ? o.pageLB: 0,
            o.lb = null,
            delete o.lb,
            e
        } (),
        c = typeof _tv_hdpv_options == "undefined" ? {}: _tv_hdpv_options,
        h = typeof top != "undefined" ? top.location == self.location ? "t": "f": "f",
        p = t.cookie.indexOf("ppinf=") < 0 && t.cookie.indexOf("ppinfo=") < 0 && t.cookie.indexOf("passport=") < 0 ? "f": "t",
        d = s.passport.getPassport(),
        v = o.swf,
        m = function() {
            var e = "",
            t = sohuHD.cookie("SUV"),
            n = "";
            try {
                n = v ? v.getData("SUV") : ""
            } catch(r) {}
            if (n) sohuHD.cookie("SUV", n, {
                path: "/",
                domain: ".sohu.com",
                expires: 100
            }),
            e = n;
            else if (t) {
                try {
                    v && v.setData("SUV", t)
                } catch(i) {}
                e = t
            }
            return e
        } ();
        n = function() {
            var e = "",
            t = sohuHD.cookie("fuid"),
            n = "";
            try {
                n = v ? v.getData("id") : ""
            } catch(r) {}
            if (t) {
                try {
                    v && v.setData("id", t)
                } catch(i) {}
                e = t
            } else n && (sohuHD.cookie("fuid", n, {
                path: "/",
                domain: "tv.sohu.com",
                expires: 100
            }), e = n);
            return e
        } (),
        n || (n = m !== null ? m: "");
        var g = e.vid || "",
        y = encodeURIComponent(t.referrer),
        b = encodeURIComponent(e.location.href);
        l == 1 && o.lbInfo && (g = o.lbInfo.vid, o.lbInfo.url && (b = encodeURIComponent(o.lbInfo.url)), o.lbInfo.preUrl && (y = encodeURIComponent(o.lbInfo.preUrl)), o.lbInfo = null, delete o.lbInfo);
        var w = function() {
            var t = "";
            return e.cateCode ? t = e.cateCode: e._videoInfo && e._videoInfo.cateCode && (t = e._videoInfo.cateCode),
            t
        } (),
        E = sohuHD.cookie("YYID"),
        S = sohuHD.cookie("showqd"),
        x = [r, "?", "url=", b, "&refer=", y, "&fuid=", n, "&yyid=", E ? E: "", "&showqd=", S ? S: ""].join(""),
        T = "";
        try {
            h == "f" && (T = e.top.location.href)
        } catch(N) {}
        try {
            x += ["&vid=", g, "&nid=", typeof nid != "undefined" && nid !== "" ? nid: "", "&pid=", typeof pid != "undefined" && pid !== "" ? pid: "", "&cid=", e.cid || "", "&suv=", m !== null ? m: "", c.is404 ? "&is404=t": "", "&istoploc=", h, "&topurl=", T, "&lb=", l, "&oth=", sohuHD.cookie("_LQD"), "&cd=", sohuHD.cookie("_LCODE"), "&lf=", encodeURIComponent(o.getLandrefer()), "&passport=", d, "&_=", (new Date).getTime(), "&islogin=", p, "&catename=", typeof filmType != "undefined" && filmType !== "" ? filmType: "", "&catecode=", w, typeof cateId != "undefined" ? "&cateid=" + cateId: "", "&playlistid=", e.vrs_playlist_id || e._playListId || e.playlistId || e.PLAYLIST_ID || "", typeof _uid != "undefined" ? "&buid=" + _uid: "", i ? "&" + i: "", u ? "&" + u: ""].join("")
        } catch(C) {}
        s.pingback(x)
    };
    sohuHD.cookie("series_video", null, {
        path: "/"
    });
    var a = t.referrer,
    f = "http://click.hd.sohu.com.cn/s.gif?";
    a.search("so.tv.sohu.com/mts?") != -1 && (s.pingback(f + "type=search_kpi_0&ref=" + escape(a)), setTimeout(function() {
        s.pingback(f + "type=search_kpi_1&ref=" + escape(a))
    },
    1e4), setTimeout(function() {
        s.pingback(f + "type=search_kpi_2&ref=" + escape(a))
    },
    6e4)),
    o.run(),
    e.messagebus && messagebus.subscribe("play.nextVideoPlayed",
    function(e, t) {
        o.lb = 1,
        o.lbInfo = t,
        o.run()
    },
    null, null, {
        cache: !0
    }),
    s.pv = o,
    e.gotPlayerUID = u,
    e._hdpv = s
} (window, document)