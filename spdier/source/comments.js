/*! Team:2014-03-25 10:14:50 AM */
!
function(e, t, n) {
    kao("commentCpt",
    function() {
        function e(e) {
            u.removeClass("rkBoxMax").addClass("rkBoxMin"),
            "" != $.trim(e.val()) && u.find(".tex").addClass("noempty"),
            $("#commentTextarea").scrollTop(66)
        }
        var t = ['<div class="tex"><textarea id="commentTextarea"></textarea></div>', '<div class="bot">', '    <div class="tong" id="commentSns"></div>', '    <input class="button" value="" type="button" id="commentSubmit" needlogin="true">', "</div>"].join(""),
        o = ['<div class="rBox"><div class="tex"><textarea id="recommentTextarea"></textarea></div>', '<div class="cfix"><input type="button" class="button" id="recommentSubmit"></div>        </div>'].join(""),
        a = ['<div class="rList cfix">', '    <div class="pic"><a href="{userLink}" target="_blank"><img width="30" height="30" alt="{nickName}" src="{headPic}"></a></div>', '    <div class="txt">', '        <p class="p-user"><a class="c-red" href="{userLink}" target="_blank">{nickName}</a> {fromIcon}', '            <a style="display:{fee};line-height:12px;" href="http://tv.sohu.com/vip/" title="\u641c\u72d0\u89c6\u9891\u4f1a\u5458" target="_blank"><img width="16" height="12" alt="\u641c\u72d0\u89c6\u9891\u4f1a\u5458" src="http://tv.sohu.com/upload/tv110421/images/vip.gif"/></a>', "        </p>", '        <p class="p-txt">{content}', "{reply}", ' //<a target="_blank" title="" style="color:#DD0D0B" href="{replyUserLink}">@{replyNickName}</a>\uff1a', " {replyContent} {/reply}</p>", '        <p class="p-time"><span class="zf zf-on r" action="showCommentsShare"><a href="#" class="shareTo">\u8f6c\u53d1</a>', '<a action="commentsShare" style="display:none" replyid="{replyid}" appname="space" href="#" title="\u8f6c\u53d1\u81f3\u89c6\u9891\u7a7a\u95f4"><img width="16" height="16" src="http://tv.sohu.com/upload/static/space/skin/images/ico/sohu-zome.png"></a>', '<a action="commentsShare" style="display:none" replyid="{replyid}" appname="weibosohu" href="#" title="\u8f6c\u53d1\u81f3\u641c\u72d0\u5fae\u535a"><img width="16" height="16" src="http://tv.sohu.com/upload/110325tvnews/images/icon01.gif"></a>', '<a action="commentsShare" style="display:none" replyid="{replyid}" appname="weibosina" href="#" title="\u8f6c\u53d1\u81f3\u65b0\u6d6a\u5fae\u535a"><img width="16" height="16" src="http://i2.itc.cn/20110426/7c2_ebf9c59b_8cdf_a522_dc23_de88bf468536_1.gif"></a>', '<a action="commentsShare" style="display:none" replyid="{replyid}" appname="qq" href="#" title="\u8f6c\u53d1\u81f3QQ\u7a7a\u95f4"><img width="16" height="16" src="http://tv.sohu.com/upload/110325tvnews/images/icon03.gif"></a>', '| <a href="#" replyid="{replyid}"  class="reply">\u56de\u590d</a></span>{createTime}{from}<span class="mLR6">\u6765\u81ea</span> <a href="{fromUrl}" target="_blank">{fromName}</a> {/from}', '&nbsp;{userAgent}\u901a\u8fc7<a href="{agentFromUrl}" target="_blank">{agentFromName}</a> {/userAgent}</p>', '<div id="replyBox{replyid}"></div>', "    </div>", "</div>"].join(""),
        i = window.vid,
        s = window.cid,
        r = 0,
        m = 0,
        c = window.subcid || "";
        "9001" != s ? (r = window.nid, m = window.playlistId, r || (i = 0)) : window._videoInfo && "1" == _videoInfo.from ? (s = _videoInfo.videoType, m = _videoInfo.vrs_playlistid) : m = _uid,
        c.indexOf(";") > -1 && (c = c.split(";")[0]),
        "25" == s && parseInt(c) > 0 && (s = c),
        "1" == s && (s = 1e3);
        var l = new n.Comment({
            cid: s,
            playlistId: m,
            vid: i
        }),
        d = ["http://tv.sohu.com/upload/static/movieCommit/remark.html?cid=", s, "&vid=", i, "&uid=", "undefined" != typeof _uid ? _uid: "", "&pid=", pid, "&playlistId=", m, "&tag=", encodeURIComponent(window.tag || window.tags || ""), "&url=", encodeURIComponent(window.location.href), "&title=", encodeURIComponent($("#crumbsBar h2").html() || $("title").html().replace(/-\s\u641c\u72d0\u89c6\u9891/g, ""))].join("");
        $(".entry").attr("href", d),
        l.init();
        var u = $(".rkBox"),
        p = (l.require("Inputbox.txt", {
            selector: ".rkBox",
            nameSpace: ".txt",
            html: t,
            textareaSelector: "#commentTextarea",
            tip: "",
            submitSelector: "#commentSubmit",
            submiturl: "http://my.tv.sohu.com/reply/save.do?redirect=blank",
            maxLength: 200,
            snsSelector: "#commentSns"
        }), document.createElement("div"));
        p.className = "cfix",
        p.id = "recommentBox",
        p.style.display = "none",
        (document.body || document.head).appendChild(p);
        var h = $(p),
        f = (l.require("Inputbox.retxt", {
            selector: "#recommentBox",
            nameSpace: ".retxt",
            html: o,
            textareaSelector: "#recommentTextarea",
            tip: "",
            submitSelector: "#recommentSubmit",
            submiturl: "http://my.tv.sohu.com/reply/save.do?redirect=blank",
            maxLength: 200,
            replySelector: ".reply[replyid]"
        }), l.require("Commentlist.comment", {
            selector: "#commList",
            template: a,
            nums: 10
        }));
        messagebus.subscribe("core.logout",
        function() {});
        var g = $("#commList");
        g.delegate(".shareTo", "mouseenter",
        function() {
            $(this).parent().find('[action="commentsShare"]').show()
        }),
        g.delegate('[action="showCommentsShare"]', "mouseleave",
        function() {
            $(this).find('[action="commentsShare"]').hide()
        }),
        g.delegate('[action="commentsShare"]', "click",
        function(e) {
            var t = f.getParams(),
            o = t.commentsHash[$(this).attr("replyid")],
            a = $(this).attr("appname");
            kao("forward",
            function() {
                if ("space" == a) n.shareToSpace();
                else {
                    var e = null,
                    t = location.href,
                    i = "\u300a" + n.play.videoInfo.thistitle + "\u300b\u7684\u8fd9\u6761\u8bc4\u8bba\u4eae\u4e86\uff1a\u201c" + unescape(o.content) + "\u201d ",
                    s = s;
                    jump(a, e, t, i, s)
                }
            }),
            e.preventDefault()
        });
        var b;
        messagebus.subscribe("core.login.userinfo",
        function(t, n) {
            l.messagebus.subscribe("comment.submit.before.**",
            function(e, t) {
                t.btn.addClass("button-grey")
            }),
            l.messagebus.subscribe("comment.submit.after.**",
            function(t, n) {
                n.btn.removeClass("button-grey"),
                "comment.submit.after.txt" == t && (b = setTimeout(function() {
                    e($("#commentTextarea"))
                },
                3e3))
            }),
            l.messagebus.subscribe("comment.submit.after.txt",
            function(e, t) {
                u.find(".tex").addClass("tip-ok");
                var o = {
                    user_link: "http://my.tv.sohu.com/user/" + n.id,
                    head_pic: n.smallPhoto,
                    author: n.nickName,
                    content: t.content,
                    time: +new Date,
                    id: 0,
                    fee: n.fee
                },
                a = f.getHtml,
                i = a(o).html,
                s = $(i);
                s.find('[action="showCommentsShare"]').remove(),
                $(".remarkNo").remove(),
                $("#pagination_5").children().length && $("#commPage .entry").show(),
                s.prependTo($("#commList"))
            }),
            l.messagebus.subscribe("comment.submit.after.retxt",
            function(e, t) {
                var o = f.getParams(),
                a = o.commentsHash[t.replyid],
                i = {
                    user_link: "http://my.tv.sohu.com/user/" + n.id,
                    head_pic: n.smallPhoto,
                    author: n.nickName,
                    content: t.content,
                    original_content: a.content,
                    original_user_link: a.user_link,
                    original_author: a.author,
                    id: 0,
                    time: +new Date,
                    fee: n.fee
                },
                s = f.getHtml,
                r = s(i).html,
                m = $(r);
                m.find('[action="showCommentsShare"]').remove(),
                $(".remarkNo").remove(),
                $("#pagination_5").children().length && $("#commPage .entry").show(),
                m.prependTo($("#commList")),
                $(p).remove()
            })
        },
        null, null, {
            cache: !0
        }),
        l.messagebus.subscribe("comment.replybtn.click.retxt",
        function(e, t) {
            var n = t.e;
            n.preventDefault(),
            t.inputBox.appendTo($("#replyBox" + t.replyid)),
            document.getElementById("recommentTextarea").onfocus = null,
            t.replyFlag ? t.inputBox.show() : t.inputBox.toggle(),
            t.inputBox.is(":hidden") || (document.getElementById("recommentTextarea").onfocus = function() {
                h.find(".tex")[0].className = "tex"
            })
        }),
        l.messagebus.subscribe("comment.validate.txt",
        function(e, t) {
            t.err && ("000001" == t.code ? n.showLoginWinbox() : "000003" == t.code ? alert("\u8bc4\u8bba\u8bf7\u5728200\u5b57\u4ee5\u5185") : u.find(".tex").addClass("tip-warn"))
        }),
        l.messagebus.subscribe("comment.validate.retxt",
        function(e, t) {
            t.err && ("000001" == t.code ? n.showLoginWinbox() : "000003" == t.code ? alert("\u8bc4\u8bba\u8bf7\u5728200\u5b57\u4ee5\u5185") : h.find(".tex").addClass("tex-warn"))
        }),
        l.messagebus.subscribe("comment.list.after.**",
        function(e, t) {
            t.box;
            if (0 == t.commentTotal ? $(".remark .remark-count").hide() : $(".remark .remark-count").show(), t.commentTotal > t.nums && $("#commPage .entry").show(), t.cData.length > 0) {
                l.require("Page", {
                    depend: f,
                    selector: "pagination_5",
                    pagination: {
                        type: "vertical"
                    }
                })
            } else $("#commList").html('<div class="remarkNo"></div>')
        },
        null, null, {
            cache: !0
        });
        l.require("Countcolumns", {
            depend: f,
            selector: "#commTotal"
        });
        l.messagebus.subscribe("comment.**",
        function() {},
        null, null, {
            cache: !0
        }),
        l.messagebus.subscribe("comment.require.Textarea.after.txt",
        function(t, n) {
            n.box.focus(function() {
                u.find(".tex")[0].className = "tex",
                clearTimeout(b),
                u.removeClass("rkBoxMin").addClass("rkBoxMax"),
                $(document).undelegate("click.rk").delegate("*", "click.rk",
                function(t) {
                    clearTimeout(b),
                    $("body").undelegate("click.rk"),
                    u.hasClass("rkBoxMin") || 0 == $(t.target).parents(".rkBox").length && e(n.box)
                })
            })
        },
        null, null, {
            cache: !0
        }),
        l.messagebus.subscribe("comment.require.Textarea.after.**",
        function(e, t) {
            t.box.focus(function() {
                n.showLoginWinbox()
            })
        },
        null, null, {
            cache: !0
        })
    })
} (window, document, sohuHD);