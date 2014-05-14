/*pub-1|2014-03-12 09:42:00*/
(function(f, p) {
    if (f.__tanxclick_bind__) {
        return
    }
    f.__tanxclick_bind__ = true;
    var j = document.body;
    var c = j.clientWidth || 0;
    var b = j.clientHeight || 0;
    if (!c || !b) {
        setTimeout(function() {
            c = j.clientWidth;
            b = j.clientHeight
        },
        20)
    }
    var n = new Date().getTime();
    var e = location.href.split("?");
    e.shift();
    var o = (e.join("?") || "").split("&"),
    a = {};
    for (var s = 0; s < o.length; s++) {
        var m = o[s].split("=");
        a[m[0]] = a[m[0]] || m[1]
    }
    var q = !!(window.attachEvent && !window.opera);
    if (q) {
        j.attachEvent("onclick", h);
        j.attachEvent("onmousemove", r);
        j.attachEvent("onmousedown", l)
    } else {
        j.addEventListener("click", h, false);
        j.addEventListener("mousemove", r, false);
        j.addEventListener("mousedown", l, false)
    }
    var w = [],
    u = 0,
    d = 0;
    function r(B) {
        var A = B || event;
        var z = new Date().getTime();
        if (z - n > 5000) {
            w = []
        }
        n = z;
        if (w.length < 5) {
            var i = A.pageX ? A.pageX: A.clientX + document.body.scrollLeft - document.body.clientLeft;
            var C = A.pageY ? A.pageY: A.clientY + document.body.scrollTop - document.body.clientTop;
            if (Math.abs(i - u) > 10 || Math.abs(C - d) > 10) {
                u = i;
                d = C;
                w.push(i + "," + C)
            }
        }
    }
    function v(x) {
        var i = x || event;
        var t;
        if (i.pageX || i.pageY) {
            t = (i.pageX + "," + i.pageY)
        } else {
            t = ((i.clientX + document.body.scrollLeft - document.body.clientLeft) + "," + (i.clientY + document.body.scrollTop - document.body.clientTop))
        }
        return t
    }
    function l(t) {
        var i = t || event;
        if (4 == i.button) {
            h(i)
        }
        if (2 == i.button) {
            h(i)
        }
    }
    function h(B) {
        try {
            var A = B || event;
            var t = v(A);
            var D = t + "__" + A.button + "__" + w.join("_");
            var z = k(D);
            var E = A.srcElement ? A.srcElement: A.target;
            if (E.tagName.toUpperCase() != "A") {
                for (var x = 5; x > 0; x--) {
                    E = E.parentNode;
                    if (E.tagName.toUpperCase() == "A") {
                        break
                    }
                }
                if (E.tagName.toUpperCase() != "A") {
                    return
                }
            }
            if (typeof E.href == "undefined") {
                return
            }
            if (E.tagName.toUpperCase() == "A" && E.getAttribute("href", 2).indexOf("http") !== 0) {
                return
            }
            var y = (E.getAttribute("href", 2).match(/http:\/\/([^\/]+)/i) || ["", ""])[1];
            g(y, D + "|" + z)
        } catch(C) {}
    }
    function g(t, y) {
        for (var x = 0; x < p.length; x++) {
            if (a[p[x]]) {
                var z = (new Date()).getTime();
                f.img = new Image();
                f.img.id = z;
                f.img.src = decodeURIComponent(a[p[x]]) + "&d_r=" + t + "_" + (new Date()).getTime().toString().substr(4) + "&tr=" + y
            }
        }
    }
    function k(x) {
        var t = 0;
        var i;
        if (x.length === 0) {
            return t
        }
        for (s = 0; s < x.length; s++) {
            i = x.charCodeAt(s);
            t = ((t << 5) - t) + i
        }
        return (t >>> 0).toString(16)
    }
})(window, ["tanxclick", "tanxdspv"]);