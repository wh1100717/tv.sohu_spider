/*! liulyliu@sohu-inc.com | Date: Wed Nov 14 2012 11:29:15 GMT+0800 (CST) */
sohuHD.DataCtrl = sohuHD.DataCtrl ||
function(e) {
    var t = {
        dataSourse: "",
        dataType: "jsonp",
        dataVarible: "",
        dataName: "data",
        page: 1,
        pageType: "server",
        totalName: "count",
        dataArrList: "",
        countName: ""
    },
    n = $.extend(t, e),
    r = this,
    i = {},
    s = {},
    o = {},
    u = 0,
    a = n.pageSize || 10,
    f = 1,
    l = n.page,
    c = (l - 1) * a,
    h = function(e, t, n, r, i) {
        var s = document.getElementsByTagName("head")[0] || document.documentElement,
        o = document.createElement("script");
        o.src = e,
        o.charset = n || "GBK",
        i = i || [];
        var u = !1,
        a = this;
        o.onload = o.onreadystatechange = function() { ! u && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") && (u = !0, t && t.apply(a, i), o.onload = o.onreadystatechange = null, r && (o.onerror = r), s && o.parentNode && s.removeChild(o))
        },
        s.insertBefore(o, s.firstChild)
    },
    p = function() {
        return typeof n.dataSourse != "string" || n.dataSourse == "" ? "": (r.URL = n.dataSourse.replace(/<\{pageSize\}>/gi, a).replace(/<\{page\}>/gi, l).replace(/<\{start\}>/gi, c), r.URL)
    },
    d = function(e, t, n) {
        i[escape(e)] = this.data,
        s[escape(e)] = this.fullData,
        typeof t == "function" && t.call(this, this.fullData)
    },
    v = function(t, o) {
        typeof n.loadFn == "function" && n.loadFn.call(r);
        var l = function(i) {
            var s = r.fullData = i || {};
            if (n.dataArrList && n.dataArrList != "") try {
                var o = (new Function("_d", "return _d." + n.dataArrList.replace(/>/g, ".")))(i)
            } catch(l) {} else {
                n.hasStatus && (s = s[n.hasStatus] || []);
                var o = s[n.dataName] || []
            }
            if (n.countName && n.countName != "") try {
                var c = (new Function("_d", "return _d." + n.countName.replace(/>/g, ".")))(i)
            } catch(l) {} else var c = s[n.totalName];
            u = isNaN(c) ? o.length >> 0 : c >> 0,
            f = parseInt(u / a) + Math.min(u % a, 1),
            o.length >> 0 > 0 ? r.data = o: r.data = [],
            d.apply(r, [t, e.fn, i])
        };
        if (i[escape(t)]) this.data = i[escape(t)],
        this.fullData = s[escape(t)],
        l(this.fullData);
        else {
            var c = {};
            c[n.totalName] = 0,
            c[n.dataName] = [];
            switch (o) {
            case "variable":
                h(t,
                function() {
                    c = window[n.dataVarible],
                    l(c)
                });
                break;
            case "jsonp":
                $.getJSON(t,
                function(e) {
                    l(e)
                });
                break;
            case "function":
                window[n.initName] = function(e) {
                    l(e)
                },
                h(t,
                function() {});
                break;
            case "json":
                $.getJSON(t,
                function(e) {
                    l(e)
                })
            }
        }
    },
    m = function(t, s) {
        if (i[escape(t)]) this.data = o[l],
        d.apply(r, [t, e.fn, arguments]);
        else {
            var c = function(i) {
                var s = {};
                try {
                    s = (new Function("_d", "return _d." + n.dataArrList.replace(/>/g, ".")))(i)
                } catch(c) {}
                u = s.length >> 0;
                if (/^nopages$/i.test(n.pageType)) r.data = s;
                else {
                    f = parseInt(u / a) + Math.min(u % a, 1);
                    var h = 1;
                    for (; h <= f; h++) o[h] = s.splice(0, a);
                    r.data = o[l]
                }
                d.apply(r, [t, e.fn, arguments])
            };
            switch (s) {
            case "variable":
                $.getScript(t,
                function() {
                    _data = window[n.dataVarible],
                    c(_data)
                });
                break;
            case "jsonp":
                $.getJSON(t,
                function(e) {
                    c(e.data)
                });
                break;
            case "json":
                $.getJSON(t,
                function(e) {
                    c(e.data)
                })
            }
        }
    },
    g = function() { / ^server$ / i.test(n.pageType) ? v.apply(this, [p(), n.dataType]) : /^client$|^nopages$/i.test(n.pageType) && m.apply(this, [n.dataSourse, n.dataType])
    };
    this.total = function() {
        return u
    },
    this.totalPage = function() {
        return f
    },
    this.pageSize = function(e) {
        return e && parseInt(e) > 0 && e != a && (this.clearCache(), a = e, f = parseInt(u / a) + Math.min(u % a, 1), this.page(1)),
        a
    },
    this.page = function(e) {
        var e = parseInt(e);
        if (e) {
            var e = parseInt(e);
            e != l && e > 0 && e <= f ? (l = e, c = (l - 1) * a, g.apply(this)) : e == l && g.apply(this)
        }
        return l
    },
    this.prevPage = function() {
        l > 1 && this.page(l - 1)
    },
    this.nextPage = function() {
        l < f && this.page(l + 1)
    },
    this.clearCache = function() {
        return i = {},
        s = {},
        this
    },
    g.apply(this)
};