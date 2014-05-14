showwin13112501.js

/*! mm | Date: Mon Nov 25 2013 11:18:00 GMT+0800 (CST) */
!
function(i, n, e) {
    var o = n.isIE6;
    n.closeWin = function(i) {
        var o = this.winboxArr || {};
        for (var t in o) o[t].closeWin();
        i && i(),
        e("#hideForLoginBox").append(n.loginBox)
    },
    n.showWin = function(t) {
        var s = this;
        if (! (s instanceof n.showWin)) {
            t.showOnce = !0;
            var a = new s.showWin(t);
            return a.initWin(!0),
            void 0
        }
        void 0 == t ? t = {}: "string" == typeof t && (t = {
            htmlStr: t
        });
        var d = t.showOnce || !1;
        s.onWinBoxShowed = t.onWinBoxShowed ||
        function() {},
        s.hiddenMedia = "undefined" != typeof t.hiddenMedia ? t.hiddenMedia: !0,
        s.html = t.htmlStr || "",
        s.initMask = function() {
            s.winmask && s.winmask.remove();
            var i = "100%",
            a = e(document).height() + "px",
            d = ['<div style="width:', i, ";height:", a, ";position:absolute;z-index: 998;", "background:", t.maskColor || "#FFF", ";opacity:", t.opacity || "0.8", ";", n.isIE ? "filter:alpha(opacity=" + parseInt(100 * (t.opacity || "0.8"), 10) + ");": "", 'top:0;left:0;" class="__mask"></div>'];
            o && d.push('<iframe style="width:', i, ";height:", a, ';" frameBorder="0" allowTransparency="true"></iframe>'),
            s.winmask = e(d.join("")),
            e("body").append(s.winmask)
        },
        s.closeWin = function(i) {
            s.timer && (clearTimeout(s.timer), s.timer = null),
            d ? (s.winbox.remove(), s.winmask.remove(), delete n.winboxArr[s.timespam]) : (s.winbox.hide(), s.winmask.hide()),
            o && s.hiddenMedia && e("embed,object").each(function() {
                "window" == this.wmode && (this.style.visibility = "visible")
            }),
            i && i()
        },
        s.initWin = function(i) {
            var o = s.html;
            s.winbox = "string" != typeof o || /<|>/.test(o) ? e(o) : e(["<div>", o, "</div>"].join("")),
            d && (n.winbox = s.winbox),
            s.winmask = e(""),
            s.winbox.hide(),
            e("body").append(s.winbox),
            s.winbox.click(function(i) {
                e(i.target).hasClass("close") && (s.closeWin(t.callback), i.preventDefault())
            }),
            i && s.show()
        },
        s.show = function() {
            t.noMask || s.initMask(),
            s.winbox.show(),
            s.initPos(),
            s.onWinBoxShowed.call(this),
            t.autohide && (s.timer = setTimeout(function() {
                s.closeWin()
            },
            t.hidetime || 0))
        },
        s.initPos = function() {
            if (t.offset) return s.winbox.css(t.offset),
            s.winbox.css({
                position: o ? "absolute": "fixed",
                zIndex: "999"
            }),
            void 0;
            var n = s.winbox.outerWidth(),
            a = s.winbox.outerHeight();
            if (o) {
                s.hiddenMedia && e("embed,object").each(function() {
                    "window" == this.wmode && (this.style.visibility = "hidden")
                });
                var d = e(i).height() / 2 + e(i).scrollTop() - a / 2;
                s.winbox.css({
                    position: "absolute",
                    top: d,
                    left: e(i).width() / 2 - n / 2,
                    zIndex: "999"
                })
            } else s.winbox.css({
                position: "fixed",
                top: "50%",
                left: "50%",
                margin: "-" + a / 2 + "px 0 0 -" + n / 2 + "px",
                zIndex: "999"
            })
        };
        var r = (new Date).getTime();
        return s.timespam = r,
        n.winboxArr[r] = s,
        s
    }
} (window, sohuHD, jQuery);