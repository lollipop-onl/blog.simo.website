"use strict";

(function ($) {
    // ゼロ埋
    var zero = function (num) {
        var lv = arguments[1] === undefined ? 2 : arguments[1];

        return ("000000" + num).slice(-lv);
    };

    // 今年の経過時間
    var diffYearDate = function () {
        var now = new Date();
        var toYear = new Date("" + now.getFullYear() + "-01-01 00:00:00");
        var diff = now - toYear;
        var days = Math.floor(diff / (24 * 60 * 60 * 1000));
        console.log(days);
        return days;
    };

    // HSL色空間からRGB色空間（16進数カラーコード）に変換
    var hslToRgb = function (h, s, l) {
        var result = null;

        if ((h || h === 0) && h <= 360 && ((s || s === 0) && s <= 100) && (l || l === 0) && l <= 100) {
            (function () {
                var r = 0,
                    g = 0,
                    b = 0,
                    q = 0,
                    p = 0;

                // Hue == 色相
                h = Number(h) / 360;
                // Saturation == 彩度
                s = Number(s) / 100;
                // Lightness == 明度
                l = Number(l) / 100;

                if (s === 0) {
                    // 彩度が0ならグレースケール
                    r = l;
                    g = l;
                    b = l;
                } else {
                    var hueToRgb = function (p, q, t) {
                        if (t < 0) {
                            t++;
                        }

                        if (t > 1) {
                            t--;
                        }

                        if (t < 1 / 6) {
                            p += (q - p) * 6 * t;
                        } else if (t < 1 / 2) {
                            p = q;
                        } else if (t < 2 / 3) {
                            p += (q - p) * (2 / 3 - t) * 6;
                        }

                        return p;
                    };

                    if (l < 0.5) {
                        q = l * (1 + s);
                    } else {
                        q = l + s - l * s;
                    }
                    p = 2 * l - q;

                    r = hueToRgb(p, q, h + 1 / 3);
                    g = hueToRgb(p, q, h);
                    b = hueToRgb(p, q, h - 1 / 3);
                }

                var rgb = {
                    r: Math.round(r * 255).toString(16),
                    g: Math.round(g * 255).toString(16),
                    b: Math.round(b * 255).toString(16)
                };

                result = "" + zero(rgb.r) + "" + zero(rgb.g) + "" + zero(rgb.b);
            })();
        }

        return result || false;
    };

    // Page jumpper
    $("#jumper").on("click", function (e) {
        e.preventDefault();
        $("html,body").animate({ scrollTop: 0 }, 400, "swing");
    });

    // アンカーリンク
    $("a[href^=\"#\"]").on("click", function (e) {
        e.preventDefault();
        var href = $(this).attr("href");
        var $target = $(href === "#" || href === "" ? "html" : href);
        var position = $target.offset().top - 60;
        $("body,html").animate({ scrollTop: position }, 400, "swing");
        return false;
    });

    // ナビゲーションバートリガー
    $("#navbarTrigger").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("theme-accent__color")) {
            $(this).removeClass("theme-accent__color");
        } else {
            $(this).addClass("theme-accent__color");
        }
    });

    // Initialized Elements
    $(function () {
        // カラーカレンダー
        var css = ".theme-accent__border-color {  border-color: #%%COLOR%% !important;}.theme-accent__background-color {  background-color: #%%COLOR%% !important;}.theme-accent__color {  color: #%%COLOR%% !important;}.theme-accent__hover__color:hover {  color: #%%COLOR%% !important;}.theme-accent__hover__background-color:hover {  background-color: #%%COLOR%% !important;}.theme-accent__before__color::before {  color: #%%COLOR%%;}.theme-accent__before__background-color::before {  background-color: #%%COLOR%%;}.theme-accent__before__border-color::before {  border-color: #%%COLOR%% !important;}.global-footer .dist-list li::before {  background: #%%COLOR%%;}.entry-post-content h1::before,.entry-post-content h1::after {  background: #%%COLOR%% !important;}.entry-post-content h2::before {  background: #%%COLOR%% !important;}.entry-post-content h3 {  border-color: #%%COLOR%% !important;}.entry-post-content ul li::before {  background: #%%COLOR%% !important;  border-color: #%%COLOR%% !important;}.entry-post-content ol li::before {  color: #%%COLOR%% !important;}.entry-post-content a:hover {  color: #%%COLOR%% !important;}.entry-post-content em {  background-image: -webkit-linear-gradient(to bottom, transparent, transparent 60%, #%%LIGHT%% 60%, #%%LIGHT%%);  background-image: -o-linear-gradient(to bottom, transparent, transparent 60%, #%%LIGHT%% 60%, #%%LIGHT%%);  background-image: linear-gradient(to bottom, transparent, transparent 60%, #%%LIGHT%% 60%, #%%LIGHT%%);}";
        var color = hslToRgb(360 * (diffYearDate() / 365), 70, 50);
        var style = css.replace(/%%COLOR%%/g, color);
        var light = hslToRgb(360 * (diffYearDate() / 365), 80, 90);
        var result = style.replace(/%%LIGHT%%/g, light);
        $("head").append("<style>" + result + "</style><meta name=\"theme-color\" content=\"#" + color + "\">");
    });

    $(window).on("load resize", function () {
        // codeblockのスクロール領域にwidthを付与
        console.log("load resize");
        var $codeblock = $(".highlight");
        if ($codeblock) {
            (function () {
                // いずれかのcodeblockからwidthを取得
                var cbW = $codeblock.width();
                var lnW = $codeblock.find(".gutter").width();
                var w = cbW - lnW;
                // すべてのcodeblockにwidthを設定
                $codeblock.each(function () {
                    $(this).find(".code").width(w);
                    $(this).find(".code pre").width(w);
                });
            })();
        }
    });
})(jQuery);