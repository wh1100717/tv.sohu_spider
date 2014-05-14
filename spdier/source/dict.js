/* @author creep 2014-05-06 14:58:23 6cb0c9 */
var __tv_dict = {
    swfobject: {
        path: "http://js.tv.itc.cn/base/plugin/swfobject13123101.js"
    },
    ifox: {
        path: "http://js.tv.itc.cn/base/plugin/ifox13112001.js"
    },
    passport: {
        path: "base/core/newpassport13062401.js"
    },
    jquery: {
        path: "base/core/j_1.7.2.js"
    },
    ifoxtip: {
        path: "site/play/ifoxtip13112001.js",
        requires: ["jquery"]
    },
    login: {
        path: "base/plugin/login_1350c6.js",
        requires: ["winbox"]
    },
    history: {
        path: "base/plugin/history_8c5da1.js",
        requires: ["login"]
    },
    nav: {
        path: "base/plugin/nav_4419f8.js",
        requires: ["jquery", "login"]
    },
    commentCpt: {
        path: "base/plugin/comment_cpt_c90815.js"
    },
    cometd: {
        path: "base/plugin/cometd.js",
        requires: ["jquery"]
    },
    winbox: {
        path: "base/plugin/showwin13112501.js",
        requires: ["jquery"]
    },
    webpush: {
        path: "base/plugin/webpush13120101.js",
        requires: ["jquery", "winbox"]
    },
    topbar: {
        path: "base/plugin/top_toolbar_6f429d.js",
        requires: ["jquery", "ifox"]
    },
    share: {
        path: "base/plugin/share_c1e8b7.js"
    },
    addto_album: {
        path: "base/plugin/addto_album13013001.js",
        requires: ["jquery"]
    },
    datactrl: {
        path: "base/plugin/datactrl.js",
        charset: "gbk"
    },
    sns: {
        path: "base/plugin/sns.js"
    },
    paging: {
        path: "base/plugin/pagination_207d6b.js"
    },
    clipboard: {
        path: "base/plugin/ZeroClipboard/ZeroClipboard.js"
    },
    wiki: {
        path: "base/plugin/wiki/wiki13031201.js"
    },
    updown: {
        path: "base/plugin/updown13010701.js",
        requires: ["jquery"]
    },
    rss: {
        path: "base/plugin/rss/rss13071001.js",
        requires: ["global", "md5"]
    },
    rsscss: {
        path: "base/plugin/rss/skin/rss13012901.css"
    },
    md5: {
        path: "base/plugin/md5.js"
    },
    score: {
        path: "base/plugin/score13052001.js",
        requires: ["jquery"]
    },
    count: {
        path: "base/plugin/count13080801.js",
        requires: ["jquery"]
    },
    poll: {
        path: "base/plugin/poll/poll13080101.js",
        requires: ["jquery", "passport", "winbox"]
    },
    chat: {
        path: "base/plugin/chat/chat13122701.js",
        requires: ["jquery", "cometd", "login"]
    },
    navslider: {
        path: "base/plugin/navslider13010501.js",
        requires: ["jquery"]
    },
    navHistoryUI: {
        path: "base/plugin/navhistoryui13022001.js",
        requires: ["navslider", "history"]
    },
    navRSSUI: {
        path: "base/plugin/navrssui13022001.js",
        requires: ["navslider", "jquery"]
    },
    navhis: {
        path: "base/plugin/nav/history13062601.js",
        requires: ["jquery", "history"]
    },
    navrss: {
        path: "base/plugin/nav/rss_5c498a.js",
        requires: ["jquery"]
    },
    focslider: {
        path: "base/plugin/focslider14041701.js",
        requires: ["jquery"]
    },
    focslider_v2: {
        path: "base/plugin/focslider_v2_14041701.js",
        requires: ["jquery"]
    },
    forward: {
        path: "base/plugin/forward13090401.js",
        requires: ["jquery"]
    },
    qrcode: {
        path: "base/plugin/jquery.qrcode_693e3f.js",
        requires: ["jquery"]
    },
    forward_v2: {
        path: "base/plugin/forward_v2_74a451.js",
        requires: ["jquery"]
    },
    corner: {
        path: "base/plugin/corner_b2cd8b.js",
        requires: ["jquery"]
    },
    vote: {
        path: "base/plugin/vote_9c5199.js",
        requires: ["jquery"]
    },
    "space.global": {
        path: "site/space/g13112701.js",
        requires: ["jquery", "login"]
    },
    "space.growbox": {
        path: "site/space/growbox.js",
        requires: ["jquery"]
    },
    "space.menu": {
        path: "site/space/center/menu_1842b8.js",
        requires: ["jquery"]
    },
    "space.nav": {
        path: "site/space/center/nav_790647.js",
        requires: ["login"]
    },
    gift: {
        path: "base/plugin/gift/js/gift13080101.js"
    },
    pst: {
        path: "base/plugin/gift/js/gift13080101.js"
    },
    pstcss: {
        path: "base/plugin/gift/css/present.css"
    },
    pingback: {
        path: "base/plugin/new_pingback_cda5f0.js"
    },
    search_suggest: {
        path: "base/plugin/search/search_4393cd.js",
        requires: ["jquery"]
    },
    "pingback-1": {
        path: "base/plugin/pingback-1_49008a.js"
    },
    special: {
        path: "site/special/special_f60e05.js",
        requires: ["jquery"]
    },
    "watchLater-embed": {
        path: "site/watchlater/embed13112801.js",
        requires: ["jquery"]
    }
};
if ("undefined" != typeof window.kao) for (var p in __tv_dict) kao.add(p, __tv_dict[p]);