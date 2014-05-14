spv.1305141919.js

function set_standby(a) {
    flash_standby = a
}
function findSWF(a) {
    return navigator.appName.indexOf("Microsoft") != -1 ? window.document[a] : navigator.appName.indexOf("Opera") != -1 ? window[a] : document[a]
}
function getCookieVal(a) {
    var b = document.cookie.indexOf(";", a);
    return b == -1 && (b = document.cookie.length),
    unescape(document.cookie.substring(a, b))
}
function getCookie(a) {
    var b = a + "=",
    c = b.length,
    d = document.cookie.length,
    e = 0;
    while (e < d) {
        var f = e + c;
        if (document.cookie.substring(e, f) == b) return getCookieVal(f);
        e = document.cookie.indexOf(" ", e) + 1;
        if (e == 0) break
    }
    return null
}
function isExtData() {
    alert("SUV=" + isExtCookie("SUV")),
    alert("IPLOC=" + isExtCookie("IPLOC")),
    alert("YYID=" + isExtCookie("YYID"))
}
function isExtCookie(a) {
    return document.cookie.indexOf(a + "=") < 0
}
function setFlashCookie(a, b) {
    var c = null;
    try {
        navigator.appName.indexOf("Microsoft") != -1 ? c = findSWF("spvFlash") : c = findSWF("spvflashobj"),
        c.setCookie(a, b)
    } catch(d) {}
}
function spvLoadFlash() {
    var a = "//a1.itc.cn/pv/js/spv.swf";
    if (window.attachEvent) {
        var b = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="spvFlash" height="0" width="0"><param wmode="transparent" allowscriptaccess="always" value="' + a + '" name="movie"/>' + '<param name="allowScriptAccess" value ="always" />' + '<object wmode="transparent" id="spvflashobj" type="application/x-shockwave-flash" height="0" width="0"></object>' + "</object>",
        c = document.createElement("div");
        c.id = "container",
        c.style.position = "absolute",
        c.style.top = "-10000px",
        c.style.left = "-10000px";
        var d = document.body;
        d && d.appendChild(c),
        c.innerHTML = b;
        return
    }
    var c = document.createElement("object");
    c.setAttribute("id", "spvFlash"),
    c.setAttribute("classid", "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"),
    c.setAttribute("width", 0),
    c.setAttribute("height", 0);
    var e = document.createElement("param");
    e.setAttribute("name", "movie"),
    e.setAttribute("value", a),
    e.setAttribute("allowScriptAccess", "always");
    var f = document.createElement("object");
    f.setAttribute("type", "application/x-shockwave-flash"),
    f.setAttribute("id", "spvflashobj"),
    f.setAttribute("data", a),
    f.setAttribute("width", 0),
    f.setAttribute("height", 0),
    f.setAttribute("allowScriptAccess", "always"),
    c.appendChild(e),
    c.appendChild(f);
    var d = document.body;
    d && d.appendChild(c)
}
function sendSpv(a) {
    var b = window.screen.width,
    c = window.screen.height,
    d = typeof encodeURI == "function" ? encodeURI(document.referrer) : document.referrer,
    e = !1,
    f = "ifr",
    g = !1,
    h = document.getElementsByTagName("script"); (function() {
        var a = h[h.length - 1],
        b = a && a.src;
        if (!b) return ! 1;
        var c = b.split("?")[1];
        if (!c) return ! 1;
        c.toLowerCase().indexOf(f) != -1 && (g = !0, d = typeof encodeURI == "function" ? encodeURI(window.parent.document.referrer) : window.parent.document.referrer)
    })(),
    typeof _focus_pv_id != "undefined" ? e = _focus_pv_id: typeof _pvinsight_id != "undefined" && (e = _pvinsight_id);
    var i = null;
    document.domain.indexOf(".focus.cn") >= 0 || document.domain.indexOf("home.sohu.com") >= 0 || document.domain.indexOf("ihome.sohu.com") >= 0 ? i = "//pv.focus.cn": i = "//pv.sohu.com";
    var j = i + "/pv.gif";
    a == 1 && (j = i + "/suv/");
    var k = document.getElementsByTagName("head")[0],
    l = document.body,
    m = k || l;
    if (g || top.location == self.location || document.domain.indexOf(".go2map.com") >= 0) {
        e ? spv_server_src = j + "?t?=_" + spv_random_str + "_" + b + "_" + c + "_" + e + "?r?=" + d: spv_server_src = j + "?t?=" + spv_random_str + "_" + b + "_" + c + "?r?=" + d;
        if (m) {
            var n = document.createElement("script");
            n.src = spv_server_src,
            m.appendChild(n)
        } else document.write("<script type='text/javascript' src='" + spv_server_src + "'/></script>")
    }
}
function gMD(a) {
    var b;
    if (a == b || a == null) return null;
    var c = a.length,
    d;
    return a.charAt(c - 3) == "." ? d = a.lastIndexOf(".", a.lastIndexOf(".", c -= a.indexOf(".com.") > 0 ? 8 : 4)) : d = a.lastIndexOf(".", a.lastIndexOf(".") - 1),
    d = d == -1 ? 0 : ++d,
    a.substring(d)
}
function sendByIploc() {
    isExtCookie("IPLOC") ? sendSpv(1) : sendSpv(0)
}
function spvSetCookies(a, b) {
    try {
        if (b) {
            var c = "/",
            d = new Date;
            d.setTime(d.getTime() + 63072e7),
            document.cookie = a + "=" + escape(b) + ";path=" + c + ";expires=" + d.toUTCString() + ";domain=" + gMD(document.domain),
            sendByIploc()
        }
    } catch(e) {}
}
function setSohuCookie(a) {
    var b = escape((new Date).getTime() * 1e3 + Math.round(Math.random() * 1e3)),
    c = "//pv.sohu.com/suv/?t=" + b + "&suv=" + a,
    d = document.getElementsByTagName("head")[0],
    e = document.body,
    f = d || e;
    if (f) {
        var g = document.createElement("script");
        g.src = c,
        f.appendChild(g)
    } else document.write("<script type='text/javascript' src='" + c + "'/></script>")
}
function spvNewCookies() {
    try {
        if (!isExtCookie("YYID")) {
            var a = getCookie("YYID");
            spvSetCookies("SUV", a),
            setFlashCookie("SUV", a),
            sendByIploc()
        } else sendSpv(1)
    } catch(b) {}
}
function ControlVersion() {
    var a, b, c;
    try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7"),
        a = b.GetVariable("$version")
    } catch(c) {}
    if (!a) try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6"),
        a = "WIN 6,0,21,0",
        b.AllowScriptAccess = "always",
        a = b.GetVariable("$version")
    } catch(c) {}
    if (!a) try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),
        a = b.GetVariable("$version")
    } catch(c) {}
    if (!a) try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.3"),
        a = "WIN 3,0,18,0"
    } catch(c) {}
    if (!a) try {
        b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash"),
        a = "WIN 2,0,0,11"
    } catch(c) {
        a = -1
    }
    var d = a.toString().split(","),
    e = "";
    for (var f = 0,
    g = d.length; f < g; f++) d[f].indexOf("WIN") != -1 ? (e += d[f].substring(3), e += ".") : f == g - 1 ? e += d[f] : (e += d[f], e += ".");
    return e
}
function GetSwfVer() {
    var a = navigator.appVersion.indexOf("MSIE") != -1 ? !0 : !1,
    b = navigator.appVersion.toLowerCase().indexOf("win") != -1 ? !0 : !1,
    c = navigator.userAgent.indexOf("Opera") != -1 ? !0 : !1,
    d = -1;
    if (navigator.plugins != null && navigator.plugins.length > 0) {
        if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
            var e = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0": "",
            f = navigator.plugins["Shockwave Flash" + e].description,
            g = f.split(" "),
            h = g[2].split("."),
            i = h[0],
            j = h[1],
            k = g[3];
            k == "" && (k = g[4]),
            k[0] == "d" ? k = k.substring(1) : k[0] == "r" && (k = k.substring(1), k.indexOf("d") > 0 && (k = k.substring(0, k.indexOf("d"))));
            var d = i + "." + j + "." + k
        }
    } else navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1 ? d = 4 : navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1 ? d = 3 : navigator.userAgent.toLowerCase().indexOf("webtv") != -1 ? d = 2 : a && b && !c && (d = ControlVersion());
    return d
}
function sohu_pvinsight_engine() {
    if (isExtCookie("SUV")) {
        var a = parseFloat(GetSwfVer());
        if (a >= 9) {
            spvLoadFlash();
            var b = function() {
                var a = setTimeout(function() {
                    if (flash_standby) {
                        clearTimeout(a);
                        var b = null;
                        navigator.appName.indexOf("Microsoft") != -1 ? b = findSWF("spvFlash") : b = findSWF("spvflashobj"),
                        b.checkCookie()
                    } else sendSpv(1)
                },
                500)
            };
            b()
        } else sendSpv(1)
    } else sendByIploc()
}
var flash_standby = null,
spv_random_str = escape((new Date).getTime() * 1e3 + Math.round(Math.random() * 1e3)),
spv_flag;
spv_flag || sohu_pvinsight_engine(),
spv_flag = 1;