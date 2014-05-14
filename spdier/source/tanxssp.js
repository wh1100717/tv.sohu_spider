/*pub-1|2014-04-15 11:34:44*/
(function(i, f, d) {
    var n = {
        lt_pkgs: {
            tanxssp: "http://cdn.tanx.com/t/",
            charset: "gbk"
        },
        lt_v: "1.0.0",
        lt_t: "201404151105.js"
    };
    if (i[f] === d) {
        i[f] = {}
    } else {
        KSLITE.Config.lt_pkgs = KSLITE.mix(n.lt_pkgs, KSLITE.Config.lt_pkgs);
        return
    }
    var p = i.KSLITEonLoad,
    j = i.KSLITEpkgPaths;
    f = i[f];
    var l = i.document;
    var c = Object.prototype.toString;
    var o = function(w, v, u, y) {
        if (!v || !w) {
            return w
        }
        if (u === d) {
            u = true
        }
        var t, x, q;
        if (y && (q = y.length)) {
            for (t = 0; t < q; t++) {
                x = y[t];
                if (x in v) {
                    if (u || !(x in w)) {
                        w[x] = v[x]
                    }
                }
            }
        } else {
            for (x in v) {
                if (u || !(x in w)) {
                    w[x] = v[x]
                }
            }
        }
        return w
    };
    var k = l.getElementsByTagName("head")[0] || l.documentElement;
    var m = 0,
    e = 2,
    b = 4,
    g = /\.css(?:\?|$)/i;
    var h = l.createElement("script").readyState ?
    function(r, s) {
        var q = r.onreadystatechange;
        r.onreadystatechange = function() {
            var t = r.readyState;
            if (t === "loaded" || t === "complete") {
                r.onreadystatechange = null;
                if (q) {
                    q()
                }
                s.call(this)
            }
        }
    }: function(q, r) {
        q.addEventListener("load", r, false);
        q.addEventListener("error", r, false)
    };
    function a() {
        if (navigator.userAgent.indexOf("MSIE") < 0) {
            return null
        }
        var r = k.getElementsByTagName("script");
        var s, t = 0,
        q = r.length;
        for (; t < q; t++) {
            s = r[t];
            if (s.readyState === "interactive") {
                return s
            }
        }
        return null
    }
    o(f, {
        version: n.lt_v,
        _init: function() {
            var s, t, r = l.getElementsByTagName("script");
            if (!window.KSLITEcurrentScript) {
                for (s = 0; s < r.length; s++) {
                    if (r[s].kslite) {
                        window.KSLITEcurrentScript = r[s];
                        break
                    }
                }
            }
            t = window.KSLITEcurrentScript || r[r.length - 1];
            window.KSLITEcurrentScript = t;
            var v = (t.src).split("/").slice(0, -1).join("/") + "/";
            f.Env = {
                mods: {},
                fns: {},
                _loadQueue: {},
                _relies: {
                    rq: {},
                    sp: {}
                }
            };
            f.Config = {
                debug: "",
                base: v,
                timeout: 10,
                kslite: n
            };
            f.mix(f.Config, n);
            f.declare("kslite", [],
            function(x, w) {
                w = f.mix(w, f, true, ["path", "log", "getScript", "substitute", "clone", "mix", "multiAsync", "extend", "iA", "iF", "iPO", "iS"])
            });
            f.provide(["kslite"],
            function() {
                f.require("kslite").log("kslite inited")
            });
            if (f.Config.debug) {
                n.lt_t += (new Date()).getTime() + ".js"
            }
            var u;
            function q(x) {
                var w = x.split("@");
                n.lt_pkgs[w[0]] = w[1]
            }
            i.KSLITEpkgPaths = {
                push: function(w) {
                    q(w)
                }
            };
            if (j && f.iA(j)) {
                for (u = 0; u < j.length; u++) {
                    q(j[u])
                }
            }
            n.lt_t = i.KSLITEtimestamp || n.lt_t;
            i.KSLITEonLoad = {
                push: function(w) {
                    if (w && f.iF(w)) {
                        w(f)
                    }
                }
            };
            if (p && f.iA(p)) {
                for (u = 0; u < p.length; u++) {
                    if (f.iF(p[u])) {
                        p[u](f)
                    }
                }
            }
        },
        mix: o,
        log: function(r, q) {
            if (f.Config.debug) {
                if (i.console !== d && console.log) {
                    console[q && console[q] ? q: "log"](r)
                }
            }
            return f
        },
        clone: function(t) {
            var s = t,
            q, r;
            if (t && ((q = f.iA(t)) || f.iPO(t))) {
                s = q ? [] : {};
                for (r in t) {
                    if (t.hasOwnProperty(r)) {
                        s[r] = f.clone(t[r])
                    }
                }
            }
            return s
        },
        extend: function(w, v, t, z) {
            if (!v || !w) {
                return w
            }
            var q = Object.prototype,
            y = function(s) {
                function r() {}
                r.prototype = s;
                return new r()
            },
            x = v.prototype,
            u = y(x);
            w.prototype = u;
            u.constructor = w;
            w.superclass = x;
            if (v !== Object && x.constructor === q.constructor) {
                x.constructor = v
            }
            if (t) {
                o(u, t)
            }
            if (z) {
                o(w, z)
            }
            return w
        },
        substitute: function(t, s, r, q) {
            if (!f.iS(t) || !f.iPO(s)) {
                return t
            }
            return t.replace(r || (/\\?\{([^{}]+)\}/g),
            function(v, u) {
                if (v.charAt(0) === "\\") {
                    return v.slice(1)
                }
                return (s[u] !== d) ? s[u] : (q ? v: "")
            })
        },
        getScript: function(q, z, u, y) {
            var A = g.test(q),
            t = l.createElement(A ? "link": "script");
            var s = z,
            w, x, r, v;
            if (f.iPO(s)) {
                z = s.success;
                w = s.error;
                x = s.timeout;
                u = s.charset
            }
            if (u) {
                t.charset = u
            }
            if (A) {
                t.href = q;
                t.rel = "stylesheet"
            } else {
                t.src = q;
                t.async = true
            }
            if (y) {
                for (v in y) {
                    t.setAttribute(v, y[v])
                }
            }
            if (f.iF(z)) {
                if (A) {
                    z.call(t)
                } else {
                    h(t,
                    function() {
                        if (r) {
                            r.cancel();
                            r = d
                        }
                        z.call(t)
                    })
                }
            }
            if (f.iF(w)) {
                r = setTimeout(function() {
                    r = d;
                    w()
                },
                (x || f.Config.timeout) * 1000)
            }
            k.insertBefore(t, k.firstChild);
            return t
        },
        iF: function(q) {
            return c.call(q) === "[object Function]"
        },
        iA: function(q) {
            return c.call(q) === "[object Array]"
        },
        iS: function(q) {
            return c.call(q) === "[object String]"
        },
        iPO: function(q) {
            return q && c.call(q) === "[object Object]" && !q.nodeType && !q.setInterval
        },
        add: function(r, t, q) {
            var u = f.Env.mods,
            s;
            if (u[r] && u[r].status > m) {
                return
            }
            s = {
                name: r,
                fn: t || null,
                status: e
            };
            if (f.iA(q)) {
                q = {
                    requires: q
                }
            }
            o(s, q);
            u[r] = s;
            return f
        },
        use: function(q, r) {
            q = q.split(",");
            f._aMs(q,
            function() {
                if (r) {
                    r(f)
                }
            })
        },
        _aMs: function(q, t) {
            var r, s = {};
            for (r = 0; r < q.length; r++) {
                s[q[r]] = {
                    f: f._aM,
                    a: q[r]
                }
            }
            f.multiAsync(s, t)
        },
        _aM: function(v, u) {
            var r, y;
            var w = f.Env.mods,
            q = f.Env._relies.rq,
            t = f.Env._relies.sp;
            function s(z) {
                if (z.status != b) {
                    if (z.fn) {
                        f.log("attach " + z.name);
                        z.fn(f, f.require(z.name), f._ns(z.name))
                    } else {
                        f.log("attach " + z.name + " without expected attach fn!", "warn")
                    }
                    z.status = b
                }
                u()
            }
            function x(B) {
                var A, C, E, D;
                function z(F) {
                    q[F] = q[F] || {};
                    t[F] = t[F] || {};
                    return F
                }
                C = z(B.name);
                for (A = 0; A < B.requires.length; A++) {
                    E = z(B.requires[A]);
                    q[C][E] = 1;
                    t[E][C] = 1;
                    for (D in t[C]) {
                        q[D][E] = 1;
                        t[E][D] = 1
                    }
                }
            }
            r = w[v];
            if (r && r.status !== m) {
                y = r.requires;
                if (f.iA(y) && y.length > 0) {
                    x(r);
                    if (q[v][v]) {
                        throw new Error("Fatal Error,Loop Reqs:" + r.name)
                    }
                    f.log(r.name + " to req: " + y);
                    f._aMs(y,
                    function() {
                        s(r)
                    })
                } else {
                    s(r)
                }
            } else {
                r = {
                    name: v
                };
                f._lM(r,
                function() {
                    f._aM(v,
                    function() {
                        s(w[v])
                    })
                })
            }
        },
        _lM: function(r, w) {
            var q = f.Env._loadQueue,
            u = r.name,
            s;
            var t = f.Env.mods;
            if (q[u]) {
                s = q[u];
                if (s.c) {
                    f.log(u + " is already loaded", "warn");
                    w()
                } else {
                    f.log(u + " is loading,listen to callback");
                    s.fns.push(w)
                }
            } else {
                if (typeof q[u] != "undefined") {
                    try {
                        q[u].fns.push(w)
                    } catch(v) {
                        q[u].fns = [w]
                    }
                } else {
                    q[u] = {
                        fns: [w],
                        c: false
                    }
                }
                f._gPath(r,
                function() {
                    if (!t[u]) {
                        t[u] = {
                            name: u,
                            status: m
                        }
                    }
                    f.getScript(r.fullpath,
                    function() {
                        var y, z = q[u],
                        x;
                        if (f.__m__) {
                            x = f.__m__;
                            f.add(u, x.fn, x.deps);
                            f.__m__ = null
                        }
                        if (t[u].status === m) {
                            t[u].status = e
                        }
                        for (y = 0; y < z.fns.length; y++) {
                            z.fns[y]()
                        }
                        z.c = true;
                        z.fns = d
                    },
                    "gbk", {
                        mod_name: u
                    })
                })
            }
        },
        path: function(r, v) {
            var q = r.split("-"),
            u = q[0],
            t = f.Config.lt_pkgs;
            if (f.iS(t[u])) {
                v(t[u] + q.join("/"))
            } else {
                KSLITE.provide(["packages-router"],
                function(s) {
                    var w = s("packages-router");
                    v((w[u] || f.Config.base) + q.join("/"))
                })
            }
        },
        _gPath: function(q, r) {
            f.path(q.name,
            function(s) {
                q.fullpath = s + ".js?_t=" + n.lt_t;
                f.log("path " + q.name + ": " + q.fullpath);
                r()
            })
        },
        multiAsync: function(t, u) {
            var r, q = false;
            function s() {
                var v, w = {};
                for (v in t) {
                    if (!t[v].c) {
                        return
                    }
                    w[v] = t[v].r
                }
                u(w)
            }
            for (r in t) {
                q = true
            }
            if (!q) {
                u({})
            }
            for (r in t) {
                if (t.hasOwnProperty(r)) { (function() {
                        var v = t[r];
                        v.f.call((v.c || f), v.a,
                        function(w) {
                            v.r = w;
                            v.c = true;
                            s()
                        })
                    })()
                }
            }
        },
        _ns: function(s) {
            var q, r = s.split("-"),
            t = f.Env.fns;
            for (q = 0; q < r.length; q++) {
                t[r[q]] = t[r[q]] || {};
                t = t[r[q]]
            }
            return t
        },
        require: function(r) {
            var q = f._ns(r);
            q.exports = q.exports || {};
            return q.exports
        },
        declare: function() {
            var t, s, r, v, q, u;
            for (s = 0; s < arguments.length; s++) {
                r = arguments[s];
                if (f.iS(r)) {
                    v = r
                } else {
                    if (f.iA(r)) {
                        q = r
                    } else {
                        if (f.iF(r)) {
                            u = r
                        }
                    }
                }
            }
            if (!v) {
                t = a();
                if (t) {
                    v = t.getAttribute("mod_name") || false
                }
            }
            if (!v) {
                f.__m__ = {
                    deps: q,
                    fn: function(x, w, y) {
                        u(x.require, w, y)
                    }
                }
            } else {
                f.add(v,
                function(x, w, y) {
                    u(x.require, w, y)
                },
                q)
            }
        },
        provide: function(r, q) {
            f.use(r.join(","),
            function(s) {
                q(s.require)
            })
        }
    });
    f._init()
})(window, "KSLITE"); (function(c, b) {
    var d = c.tanx_ssp_onload;
    if (d && b.iA(d)) {
        for (var a = 0; a < d.length; a++) {
            if (b.iPO(d[a])) {
                tanxssp_show(d[a])
            }
        }
    }
    c.tanx_ssp_onload = {
        push: function(e) {
            if (e && b.iPO(e)) {
                tanxssp_show(e)
            }
        }
    }
})(window, KSLITE);
function tanxssp_show(b) {
    if (!document.getElementById("tanx-a-" + b.i || "")) {
        document.write("<iframe style='display:none' id='tanx-a-" + b.i + "' frameborder=0 scrolling='no' marginwidth='0' marginheight='0'></iframe>");
        b.sync = true
    }
    var a = "http://cdn.tanx.com/t/tanxssp/main.js?_t=201404151105.js";
    if (b.sync) {
        window.tanx_ssp_temp_adobj = b;
        document.write('<script charset="gbk" src="' + a + '"></sc');
        document.write("ript>")
    } else {
        KSLITE.provide(["tanxssp-main"],
        function(c) {
            c("tanxssp-main").run(b)
        })
    }
};