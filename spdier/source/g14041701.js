//2014-4-17 14:21 ww
var _e = function() {};
typeof console != "undefined" && console.info && (_e = function(e) {
    console.info(e)
}),
function(e) {
    typeof e.sohuHD == "undefined" && (e.sohuHD = {}),
    sohuHD.DAY = 86400,
    sohuHD.HOUR = 3600,
    sohuHD.SEC = 60,
    sohuHD.version = "20121111",
    sohuHD.winboxArr = {},
    function(e) {
        var t = {};
        e.tmpl = function n(e, r) {
            var i = /\W/.test(e) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + e.replace(/[\r\t\n]/g, " ").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');") : t[e] = t[e] || n(document.getElementById(e).innerHTML);
            return r ? i(r) : i
        }
    } (sohuHD);
    var t = function(e, t, n) {
        if (!e || !t) {
            _e("sohuHD.trigger need elem and events");
            return
        }
        Object.prototype.toString.call(t) != "[object String]" && _e("events name must be string");
        var r = t.split("."),
        i = r[0] || "",
        s = r[1] || "",
        o = e.eventsArr || {};
        o = o[i] || [];
        if (!o.length) return;
        sohuHD.each(o,
        function(t, r) {
            if (!s || this.name == s) this.fn ? this.fn.call(e, n) : o.splice(t, 1)
        })
    },
    n = function(e) {
        e.preventDefault || (e.preventDefault = function() {
            e.returnValue = !1
        }),
        e.stopPropagation || (e.stopPropagation = function() {
            e.cancelBubble = !0
        }),
        e.target || (e.target = e.srcElement || document),
        !e.relatedTarget && e.fromElement && (e.relatedTarget = e.fromElement === e.target ? e.toElement: e.fromElement);
        if (e.pageX == null && e.clientX != null) {
            var t = e.target.ownerDocument || document,
            n = t.documentElement,
            r = t.body;
            e.pageX = e.clientX + (n && n.scrollLeft || r && r.scrollLeft || 0) - (n && n.clientLeft || r && r.clientLeft || 0),
            e.pageY = e.clientY + (n && n.scrollTop || r && r.scrollTop || 0) - (n && n.clientTop || r && r.clientTop || 0)
        }
        return e.which == null && (e.charCode != null || e.keyCode != null) && (e.which = e.charCode != null ? e.charCode: e.keyCode),
        !e.metaKey && e.ctrlKey && (e.metaKey = e.ctrlKey),
        !e.which && e.button !== undefined && (e.which = e.button & 1 ? 1 : e.button & 2 ? 3 : e.button & 4 ? 2 : 0),
        e
    },
    r = function(e, r, i, s) {
        if (!e || !r) {
            _e("sohuHD.bind need elem and events");
            return
        }
        if (Object.prototype.toString.call(r) != "[object String]") {
            _e("events name must be string");
            return
        }
        var o = r.split("."),
        u = o[0] || "",
        a = o[1] || "";
        e.eventsArr || (e.eventsArr = {}),
        sohuHD.each(u.split(" "),
        function(r, o) {
            var u = e.eventsArr;
            u[o] || (u[o] = []),
            u = u[o] || [],
            s = s || {},
            u.length || (e.addEventListener ? e.addEventListener(o,
            function(r) {
                t(e, o, n(r))
            },
            !1) : e.attachEvent ? e.attachEvent("on" + o,
            function(r) {
                t(e, o, n(r))
            }) : e["on" + o] = function(r) {
                t(e, o, n(r))
            }),
            u.push({
                name: o,
                fn: i
            })
        })
    },
    i = function(e, t) {
        if (!e && !t) {
            _e("sohuHD.unbind need elem or events");
            return
        }
        if (Object.prototype.toString.call(t) != "[object String]") {
            _e("events name must be string");
            return
        }
        var n = t.split("."),
        r = n[0] || "",
        i = n[1] || "",
        s = e.eventsArr || {};
        s = s[r] || [];
        if (!s.length) return;
        i ? sohuHD.each(s,
        function(e, t) {
            this.name == i && s.splice(e, 1)
        }) : s = [],
        e.eventsArr[r] = s
    };
    sohuHD.bind = function(e, t, n, i) {
        var s = t == "hover" && Object.prototype.toString.call(i) == "[object Function]";
        s ? sohuHD.each(e,
        function(e, t) {
            r(t, "mouseover", n),
            r(t, "mouseout", i)
        }) : sohuHD.each(e,
        function(e, s) {
            r(this, t, n, i)
        })
    },
    sohuHD.unbind = function(e, t, n, r) {
        sohuHD.each(e,
        function(e, i) {
            ubind(this, t, n, r)
        })
    },
    sohuHD.trigger = function(e, n, r, i) {
        sohuHD.each(e,
        function(e, s) {
            t(this, n, r, i)
        })
    };
    var s = new Date;
    sohuHD.now = function() {
        return++s
    };
    var o = function() {
        if (this == e) throw new Error(0, "HttpRequest is unable to call as a function.");
        var t = this,
        n = !1,
        r = !1,
        i, s = function() {
            t.onreadystatechange && t.onreadystatechange.call(i);
            if (i.readyState == 4) {
                if (Number(i.status) >= 300) {
                    t.onerror && t.onerror.call(i, new Error(0, "Http error:" + i.status + " " + i.statusText)),
                    r ? i.onreadystatechange = Function.prototype: i.onReadyStateChange = Function.prototype,
                    i = null;
                    return
                }
                t.status = i.status,
                t.statusText = i.statusText,
                t.responseText = i.responseText,
                t.responseBody = i.responseBody,
                t.responseXML = i.responseXML,
                t.readyState = i.readyState,
                r ? i.onreadystatechange = Function.prototype: i.onReadyStateChange = Function.prototype,
                i = null,
                t.onfinish && t.onfinish()
            }
        },
        o = function() {
            var t;
            try {
                i = new e.XMLHttpRequest,
                r = !0
            } catch(t) {
                var n = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "Msxml2.XMLHTTP", "MSXML.XMLHttp", "Microsoft.XMLHTTP"],
                s = function() {
                    var e;
                    for (var t = 0; t < n.length; t++) {
                        try {
                            var i = new ActiveXObject(n[t]);
                            r = !1
                        } catch(e) {
                            continue
                        }
                        return i
                    }
                    throw {
                        message: "XMLHttp ActiveX Unsurported."
                    }
                };
                try {
                    i = new s,
                    r = !1
                } catch(t) {
                    throw new Error(0, "XMLHttpRequest Unsurported.")
                }
            }
        };
        o(),
        this.abort = function() {
            i.abort()
        },
        this.getAllResponseHeaders = function() {
            i.getAllResponseHeaders()
        },
        this.getResponseHeader = function(e) {
            i.getResponseHeader(bstrHeader)
        },
        this.open = function(e, r, s, o, u) {
            n = s;
            try {
                i.open(e, r, s, o, u)
            } catch(a) {
                if (!t.onerror) throw a;
                t.onerror(a)
            }
        },
        this.send = function(e) {
            try {
                r ? i.onreadystatechange = s: i.onReadyStateChange = s,
                i.send(e),
                n || (this.status = i.status, this.statusText = i.statusText, this.responseText = i.responseText, this.responseBody = i.responseBody, this.responseXML = i.responseXML, this.readyState = i.readyState, r ? i.onreadystatechange = Function.prototype: i.onReadyStateChange = Function.prototype, i = null)
            } catch(o) {
                if (!t.onerror) throw o;
                t.onerror(o)
            }
        },
        this.setRequestHeader = function(e, t) {
            i.setRequestHeader(e, t)
        }
    };
    sohuHD.getJSON = function(e, t) {
        var n = new o;
        n.onfinish = function() {
            var e = (new Function("return " + this.responseText))();
            t(e)
        },
        n.open("get", e, !0),
        n.send(null)
    },
    sohuHD.formatCount = function(e) {
        var t = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
        return e >= 1e5 ? e = parseInt(e / 1e4).toString().replace(t, "$1,") + "\u4e07": e = e.toString().replace(t, "$1,"),
        e
    },
    sohuHD.random = function() {
        var e = [],
        t = 0,
        n = this;
        switch (arguments.length) {
        case 0:
            return sohuHD.now();
        case 1:
            e = arguments[0];
            break;
        case 2:
            e = arguments[0],
            t = arguments[1]
        }
        if (e instanceof Array) {
            var r = e.length,
            i = [],
            s = [];
            if (typeof t == "number" && t > 0) {
                t >= r && (t = r);
                for (var o = 0; o < r; ++o) i.push(e[o]);
                return i.sort(function() {
                    return Math.floor(Math.random() * 2)
                }),
                i.slice(0, t)
            }
            return e[Math.floor(Math.random() * r)]
        }
        return _e("sohuHD.random need Array arguments"),
        0
    },
    sohuHD.timeFromNow = function(e) {
        var t = sohuHD.now();
        t < e && (t = e),
        e = (t - parseInt(e)) / 1e3;
        var n = parseInt(e) + "\u79d2\u524d";
        return e == 0 ? "\u6b63\u5728\u64ad\u653e": e >= this.DAY ? Math.floor(e / this.DAY) + "\u5929\u524d": e >= this.HOUR ? Math.floor(e / this.HOUR) + "\u5c0f\u65f6\u524d": e >= this.SEC ? Math.floor(e / this.SEC) + "\u5206\u524d": n
    },
    sohuHD.formatTime = function(e) {
        var t = sohuHD.now();
        t < e && (t = e),
        e = (t - parseInt(e)) / 1e3;
        var n = parseInt(e) + "\u79d2\u524d";
        if (e == 0) return "\u521a\u521a";
        if (e >= this.DAY) {
            var r = Math.floor(e / this.DAY);
            return r <= 365 && r > 30 ? Math.floor(r / 30) + "\u4e2a\u6708\u524d": r > 365 ? Math.floor(r / 365) + "\u5e74\u524d": Math.floor(e / this.DAY) + "\u5929\u524d"
        }
        return e >= this.HOUR ? Math.floor(e / this.HOUR) + "\u5c0f\u65f6\u524d": e >= this.SEC ? Math.floor(e / this.SEC) + "\u5206\u524d": n
    },
    sohuHD.transPlayTime = function(e) {
        if (e > 0) {
            var t = [],
            n = Math.floor(e / 60),
            r = e - n * 60;
            return t.push(n / 10 >= 1 ? n + "\u5206": "0" + n + "\u5206"),
            t.push(r / 10 >= 1 ? r + "\u79d2": "0" + r + "\u79d2"),
            t.join("")
        }
        return "00\u520600\u79d2"
    },
    sohuHD.strSub = function(e, t, n, r) {
        var i = /[^\x00-\xff]/g;
        n = n || !1,
        r = r || "...";
        if (t > 0 && e.replace(i, "mm").length > t) {
            var s = Math.floor(t / 2);
            for (var o = s; o < e.length; o++) if (e.substr(0, o).replace(i, "mm").length >= t) return e.substr(0, o) + (n ? r: "")
        }
        return e
    },
    sohuHD.redirect = function(t, n, r) {
        if (document.all) {
            var i = document.createElement("a");
            i.onclick = null,
            i.href = t,
            n && (i.target = n),
            document.body.appendChild(i),
            i.click()
        } else if (n) var s = e.open(t, n);
        else location.href = t
    };
    var u = function(e) {
        var t = e.getAttribute("focusColor") || "#000";
        e._old = e.value,
        sohuHD.bind(e, "focus",
        function() {
            var e = this.value.trim();
            e == this._old && (this.value = "", this.style.color = t)
        }),
        sohuHD.bind(e, "blur",
        function() {
            var e = this.value.trim();
            e == "" && (this.value = this._old, this.style.color = "")
        })
    };
    sohuHD.focusClear = function(e) {
        sohuHD.each(e,
        function() {
            u(this)
        })
    };
    var a = function(t, n) {
        var r = t.value.length,
        i = t.getAttribute("maxlength"),
        s;
        if (n) {
            n.innerHTML = i;
            var o = function() {
                var e = t.value,
                s = e.length;
                if (r == s) return;
                r = e.length,
                e == t._old && (r = 0),
                r <= i ? (n.innerHTML = i - r, sohuHD.removeClass(n, "error")) : (n.innerHTML = i - r, sohuHD.addClass(n, "error"))
            };
            sohuHD.bind(t, "focus",
            function() {
                this.timer = setInterval(o, 200)
            }),
            sohuHD.bind(t, "blur",
            function() {
                clearInterval(this.timer),
                this.timer = null
            })
        }
        sohuHD.isIE && t.tagName == "TEXTAREA" && sohuHD.bind(t, "keypress paste",
        function(t) {
            var n = this.value.length,
            r = i - n,
            s = document.selection.createRange().text.length;
            if (t.type == "keypress") {
                if (t.which > 32 && t.which < 127 && !t.metaKey && r <= 0 && s == 0) return ! 1
            } else if (t.type == "paste") {
                var o = e.clipboardData.getData("Text");
                n - s + o.length > i && e.clipboardData.setData("Text", o.substring(0, i - (n - s)))
            }
        })
    };
    sohuHD.wordLimit = function(e, t) {
        t && t.length !== undefined && t.length > 0 ? sohuHD.each(e,
        function(e, n) {
            a(n, t[e])
        }) : a(e, t)
    };
    var f = function(e, t, n) {
        if (typeof t == "undefined" || t < 0) t = t || 1e3;
        setTimeout(function() {
            var t = e.getAttribute("lazySrc");
            if (!t) {
                _e("lazyImage need lazySrc");
                return
            }
            var r = document.createElement("img");
            r.onload = function() {
                sohuHD.removeClass(e, "lazy"),
                e.src = this.src,
                n && n.call(e, arguments)
            },
            r.src = t
        },
        t)
    };
    sohuHD.lazyImage = function(e, t, n) {
        sohuHD.each(e,
        function(e, r) {
            f(r, t, n)
        })
    },
    sohuHD.loadFlv = function(e, t, n, r, i, s) {
        t += "?" + sohuHD.now(),
        r = r || "0",
        i = i || "0",
        n = n || "#000000";
        var o = [];
        sohuHD.isIE ? (o.push('<object name="' + e + '" id="' + e + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="' + r + '" height="' + i + '">'), o.push('<param name="movie" value="' + t + '" />'), o.push('<param name="bgcolor" value="' + n + '" />'), o.push('<param name="quality" value="high" />'), o.push('<param name="allowScriptAccess" value="always" />'), o.push("</object>")) : o.push('<embed id="' + e + '" name="' + e + '" allowScriptAccess="always" type="application/x-shockwave-flash" src="' + t + '" width="' + r + '" height="' + i + '" bgcolor="' + n + '" quality="high" />');
        if (!s || !document.getElementById(s)) return o.join("");
        document.getElementById(s).innerHTML = o.join("")
    },
    sohuHD.switchTab = function(e, n) {
        if (!e) {
            _e("sohuHD.switchTab need tabs");
            return
        }
        n = n || {};
        var r = n.event || "mouseover",
        i = n.cssName || "current",
        s = n.callback || null,
        o = n.before || null,
        u = n.boxs || [],
        a = n.next || "",
        f = n.prev || "",
        l = u.length > 1 ? !0 : !1,
        c = 0;
        Math.abs(n.start) > 0 && (c = n.start);
        var h = n.auto || !1;
        e.n = 0,
        l && sohuHD.hide(u);
        var p = function() {
            g(e[e.n >= e.length - 1 ? 0 : e.n + 1])
        },
        d = function() {
            g(e[e.n <= 0 ? e.length - 1 : e.n - 1])
        };
        a && sohuHD.bind(a, "click",
        function() {
            g(e[e.n >= e.length - 1 ? 0 : e.n + 1])
        }),
        f && sohuHD.bind(f, "click",
        function() {
            g(e[e.n <= 0 ? e.length - 1 : e.n - 1])
        });
        var v;
        if (h) {
            var m = typeof h == "boolean" ? 5e3: h;
            v = setInterval(p, m),
            sohuHD.bind(e, "hover",
            function() {
                clearInterval(v)
            },
            function() {
                v = setInterval(p, m)
            })
        }
        var g = function(n) {
            if (typeof o == "function" && !o(n, l ? u[r] : u)) return ! 1;
            var r = n.n;
            if (sohuHD.hasClass(n, i)) return;
            sohuHD.addClass(n, i),
            r != e.n && sohuHD.removeClass(e[e.n], i),
            l && (sohuHD.hide(u[e.n]), sohuHD.show(u[r])),
            e.n = r,
            t(n, "blur"),
            s && s(n, l ? u[r] : u)
        };
        sohuHD.each(e,
        function(e, t) {
            sohuHD.removeClass(t, i),
            t.n = e,
            e == c && g(t)
        }),
        r == "mouseover" ? sohuHD.bind(e, "hover",
        function() {
            var e = this;
            e.timer = setTimeout(function() {
                g(e)
            },
            100)
        },
        function() {
            clearTimeout(this.timer),
            this.timer = null
        }) : sohuHD.bind(e, "click",
        function(e) {
            this.getAttribute("disabled") || (g(this), e.preventDefault())
        })
    },
    sohuHD.crossDomainPost = function(e) {
        var t = [],
        n = function() {};
        e.indexOf("?") > -1 && (t = e.split("?")[1]),
        t.length && t.indexOf("&") && (t = t.split("&"));
        var r = [],
        i = null;
        sohuHD.each(t,
        function(e, t) {
            i = t.split("="),
            r.push('<input name="', i[0], '" value="', i[1] || "", '" />')
        }),
        arguments.length && (arguments[1] && (t = arguments[1], typeof t == "function" ? (n = t, t = {}) : typeof t == "object" && (t = arguments[1])), arguments[2] && typeof arguments[2] == "function" && (n = arguments[2]));
        for (var s in t) r.push('<input name="', s, '" value="', t[s], '" />');
        var o = sohuHD.createElement('<div style="display:none"></div>'),
        u = "tmpPostForm" + sohuHD.now();
        o.innerHTML = ['<form id="', u, '" action="', e, '" method="POST" target="hideFrame">', r.join(""), "</form>", '<iframe name="hideFrame" />'].join("");
        var a = document.body || document.head;
        a.appendChild(o),
        document.getElementById(u).submit(),
        setTimeout(function() {
            a.removeChild(o),
            n()
        },
        800)
    }
} (window),
function() {
    var e = {
        news: 1300,
        movie: 1,
        tv: 2,
        orshow: 6,
        doc: 8,
        variety: 7,
        comic: 16,
        deep: 26,
        mytv: 9001
    };
    sohuHD.getCid = function(t) {
        return e[t = t || window.filmType]
    }
} (),
sohuHD.extend = function(e, t, n) {
    n && sohuHD.extend(e, n);
    if (t && typeof t == "object") for (var r in t) e[r] = t[r];
    return e
},
sohuHD.extend(sohuHD, {
    namespace: function() {
        var e = Array.prototype.slice.call(arguments);
        sohuHD.each(e,
        function(e, t) {
            var n = t.split(".");
            typeof window[n[0]] == "undefined" && (window[n[0]] = {});
            var r = window[n[0]];
            for (var i = 1,
            s = n.length; i < s; i++) r[n[i]] = r[n[i]] || {},
            r = r[n[i]]
        })
    },
    inherit: function(e, t, n) {
        var r = function() {};
        r.prototype = t.prototype,
        e.prototype = new r,
        e.prototype.constructor = e,
        e.prototype.superClass = t.prototype,
        n = n || {},
        sohuHD.extend(e.prototype, n),
        t.prototype.constructor === Object.prototype.constructor && (t.prototype.constructor = t)
    }
}),
function(e) {
    function s() {}
    function o(e) {
        this.content = e || "",
        this.helper = new s
    }
    e = e || this;
    var t = function(e, t, n) {
        n && extend(e, n);
        if (t && typeof t == "object") for (var r in t) e[r] = t[r];
        return e
    },
    n = {
        h: {
            name: "helper",
            dir: "helper"
        }
    },
    r = /(^\s*)|(\s*$)/g,
    i = "".trim ?
    function(e) {
        return e.trim()
    }: function(e) {
        return (e || "").replace(r, "")
    };
    t(s.prototype, {
        trim: i,
        dateFormat: function(e, t) { (({})).toString.call(e) != "[object Date]" && (e = new Date(parseInt(e)));
            var n = {
                "y+": e.getFullYear(),
                "M+": e.getMonth() + 1,
                "d+": e.getDate(),
                "h+": e.getHours(),
                "m+": e.getMinutes(),
                "s+": e.getSeconds()
            };
            for (var r in n)(new RegExp("(" + r + ")")).test(t) && (t = t.replace(RegExp.$1, ("00" + n[r]).slice(~RegExp.$1.length + 1)));
            return t
        },
        timeFormat: function(e, t) {
            e /= 1;
            var n = {
                "m+": Math.floor(e / 60),
                "s+": e % 60
            };
            t = t.replace(/(m+)/,
            function(e, t) {
                var r = t,
                i = ("" + n["m+"]).length;
                return t && i > t.length && (r = (new Array(i + 1)).join("m")),
                r
            });
            for (var r in n)(new RegExp("(" + r + ")")).test(t) && (t = t.replace(RegExp.$1, ("00" + n[r]).slice(~RegExp.$1.length + 1)));
            return t
        },
        truncate: function(e, t, n, r) {
            return e = e || "",
            e.length <= t ? e: (e = e.substr(0, t), n && (e += r || "..."), e)
        },
        truncateCN: function(e, t, n, r) {
            e = e || "";
            var i = /[^\x00-\xff]/g;
            n = n || !1,
            r = r || "...";
            if (t > 0 && e.replace(i, "mm").length > t) {
                var s = Math.floor(t / 2);
                for (var o = s; o < e.length; o++) if (e.substr(0, o).replace(i, "mm").length >= t) return e.substr(0, o) + (n ? r: "")
            }
            return e
        },
        numberGroup: function(e, t, n) {
            e = e || "1234567345345.000",
            t = t || 3,
            n = n || ",",
            e = "" + e;
            if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(e)) return e;
            var r = RegExp.$1,
            i = RegExp.$2,
            s = RegExp.$3,
            o = (new RegExp).compile("(\\d+)(\\d{" + t + "})(" + n + "|$)");
            while (o.test(i)) i = i.replace(o, "$1" + n + "$2$3");
            return r + i + s
        },
        escapeXSS: function(e) {
            return (e || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        }
    }),
    t(o, {
        render: function(e, t) {
            return (new o(e)).render(t)
        },
        registHelper: function() {
            var e = {},
            n = [].slice.call(arguments);
            n.length == 2 && typeof n[0] == "string" ? e[n[0]] = n[1] : n.length == "1" && typeof n[0] == "object" && (e = n[0]),
            e && t(s.prototype, e)
        }
    }),
    t(o.prototype, {
        version: "1.0",
        setContent: function(e) {
            this.fn = null,
            this.directive = null,
            this.content = e
        },
        render: function(e) {
            this.compile();
            var t = this.directive || {},
            r, i;
            for (var s in n) {
                i = n[s],
                r = typeof t[s] == "undefined" ? i.name: t[s];
                if (e[r]) throw new Error("\u6307\u4ee4{ " + r + " }\u51b2\u7a81...");
                e[r] = this[i.dir]
            }
            var o = this.fn(e);
            for (var s in n) i = n[s],
            r = typeof t[s] == "undefined" ? i.name: t[s],
            delete e[r];
            return o
        },
        compile: function() {
            if (!this.fn) {
                this.directive = {};
                var e = this,
                t = this.content.replace(/[\r\t\n]/g, " ").replace(/<%@(.*?)%>/g,
                function(t, n) {
                    if (n) {
                        var t = n.split(":");
                        t && t.length && (e.directive[i(t[0])] = i(t[1]))
                    }
                    return ""
                }).replace(/<%!--(.*?)--%>/g, "").split("<%").join("	").replace(/((^|%>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)%>/g, "',$1,'").split("	").join("');").split("%>").join("p.push('").split("\r").join("\\'"),
                n = "var p = [];with(obj){p.push('" + t + "');}" + "return p.join('');";
                this.fn = new Function("obj", n)
            }
        },
        registHelper: function() {
            var e = this[n.h.dir],
            r = [].slice.call(arguments);
            r.length == 2 && typeof r[0] == "string" ? e[r[0]] = r[1] : r.length == "1" && typeof r[0] == "object" && t(e, r[0])
        }
    }),
    e.Template = o
} (sohuHD),
typeof JSON != "object" && (JSON = {}),
function() {
    "use strict";
    function f(e) {
        return e < 10 ? "0" + e: e
    }
    function quote(e) {
        return escapable.lastIndex = 0,
        escapable.test(e) ? '"' + e.replace(escapable,
        function(e) {
            var t = meta[e];
            return typeof t == "string" ? t: "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice( - 4)
        }) + '"': '"' + e + '"'
    }
    function str(e, t) {
        var n, r, i, s, o = gap,
        u, a = t[e];
        a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)),
        typeof rep == "function" && (a = rep.call(t, e, a));
        switch (typeof a) {
        case "string":
            return quote(a);
        case "number":
            return isFinite(a) ? String(a) : "null";
        case "boolean":
        case "null":
            return String(a);
        case "object":
            if (!a) return "null";
            gap += indent,
            u = [];
            if (Object.prototype.toString.apply(a) === "[object Array]") {
                s = a.length;
                for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                return i = u.length === 0 ? "[]": gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]": "[" + u.join(",") + "]",
                gap = o,
                i
            }
            if (rep && typeof rep == "object") {
                s = rep.length;
                for (n = 0; n < s; n += 1) typeof rep[n] == "string" && (r = rep[n], i = str(r, a), i && u.push(quote(r) + (gap ? ": ": ":") + i))
            } else for (r in a) Object.prototype.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": ": ":") + i));
            return i = u.length === 0 ? "{}": gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}": "{" + u.join(",") + "}",
            gap = o,
            i
        }
    }
    typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z": null
    },
    String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap, indent, meta = {
        "\b": "\\b",
        "	": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\"
    },
    rep;
    typeof JSON.stringify != "function" && (JSON.stringify = function(e, t, n) {
        var r;
        gap = "",
        indent = "";
        if (typeof n == "number") for (r = 0; r < n; r += 1) indent += " ";
        else typeof n == "string" && (indent = n);
        rep = t;
        if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
            "": e
        });
        throw new Error("JSON.stringify")
    }),
    typeof JSON.parse != "function" && (JSON.parse = function(text, reviver) {
        function walk(e, t) {
            var n, r, i = e[t];
            if (i && typeof i == "object") for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r: delete i[n]);
            return reviver.call(e, t, i)
        }
        var j;
        text = String(text),
        cx.lastIndex = 0,
        cx.test(text) && (text = text.replace(cx,
        function(e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice( - 4)
        }));
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"),
        typeof reviver == "function" ? walk({
            "": j
        },
        "") : j;
        throw new SyntaxError("JSON.parse")
    })
} ()