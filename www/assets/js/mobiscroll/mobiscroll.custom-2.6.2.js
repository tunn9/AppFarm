(function (a) {
    function m(f, c) {
        function g(a, c, g) {
            a.stopPropagation();
            a.preventDefault();
            if (!V && !k(c) && !c.hasClass("dwa")) {
                V = !0;
                var b = c.find(".dw-ul");
                h(b);
                clearInterval(ha);
                ha = setInterval(function () {
                    g(b)
                }, p.delay);
                g(b)
            }
        }

        function k(c) {
            return a.isArray(p.readonly) ? (c = a(".dwwl", v).index(c), p.readonly[c]) : p.readonly
        }

        function y(c) {
            var g = '<div class="dw-bf">', c = la[c], c = c.values ? c : F(c), b = 1, y = c.labels || [], k = c.values, h = c.keys || k;
            a.each(k, function (a, c) {
                0 == b % 20 && (g += '</div><div class="dw-bf">');
                g += '<div role="option" aria-selected="false" class="dw-li dw-v" data-val="' +
                    h[a] + '"' + (y[a] ? ' aria-label="' + y[a] + '"' : "") + ' style="height:' + H + "px;line-height:" + H + 'px;"><div class="dw-i">' + c + "</div></div>";
                b++
            });
            return g += "</div>"
        }

        function h(c) {
            Y = a(".dw-li", c).index(a(".dw-v", c).eq(0));
            Z = a(".dw-li", c).index(a(".dw-v", c).eq(-1));
            M = a(".dw-ul", v).index(c)
        }

        function d(a) {
            var c = p.headerText;
            return c ? "function" === typeof c ? c.call(N, a) : c.replace(/\{value\}/i, a) : ""
        }

        function l() {
            n.temp = aa && null !== n.val && n.val != G.val() || null === n.values ? p.parseValue(G.val() || "", n) : n.values.slice(0);
            ia()
        }

        function r(c) {
            var g = window.getComputedStyle ? getComputedStyle(c[0]) : c[0].style, b;
            x ? (a.each(["t", "webkitT", "MozT", "OT", "msT"], function (a, c) {
                if (void 0 !== g[c + "ransform"])return b = g[c + "ransform"], !1
            }), b = b.split(")")[0].split(", "), c = b[13] || b[5]) : c = g.top.replace("px", "");
            return Math.round(na - c / H)
        }

        function t(a, c) {
            clearTimeout(ba[c]);
            delete ba[c];
            a.closest(".dwwl").removeClass("dwa")
        }

        function m(a, c, g, b, y) {
            var k = (na - g) * H, h = a[0].style;
            k == ja[c] && ba[c] || (b && k != ja[c] && E("onAnimStart", [v, c, b]), ja[c] = k, h[D + "Transition"] =
                "all " + (b ? b.toFixed(3) : 0) + "s ease-out", x ? h[D + "Transform"] = "translate3d(0," + k + "px,0)" : h.top = k + "px", ba[c] && t(a, c), b && y && (a.closest(".dwwl").addClass("dwa"), ba[c] = setTimeout(function () {
                t(a, c)
            }, 1E3 * b)), ea[c] = g)
        }

        function K(c, g, b, k, y) {
            !1 !== E("validate", [v, g, c]) && (a(".dw-ul", v).each(function (b) {
                var h = a(this), e = a('.dw-li[data-val="' + n.temp[b] + '"]', h), i = a(".dw-li", h), f = i.index(e), j = i.length, I = b == g || void 0 === g;
                if (!e.hasClass("dw-v")) {
                    for (var o = e, d = 0, l = 0; 0 <= f - d && !o.hasClass("dw-v");)d++, o = i.eq(f - d);
                    for (; f + l <
                           j && !e.hasClass("dw-v");)l++, e = i.eq(f + l);
                    (l < d && l && 2 !== k || !d || 0 > f - d || 1 == k) && e.hasClass("dw-v") ? f += l : (e = o, f -= d)
                }
                if (!e.hasClass("dw-sel") || I)n.temp[b] = e.attr("data-val"), a(".dw-sel", h).removeClass("dw-sel"), p.multiple || (a(".dw-sel", h).removeAttr("aria-selected"), e.attr("aria-selected", "true")), e.addClass("dw-sel"), m(h, b, f, I ? c : 0.1, I ? y : !1)
            }), R = p.formatResult(n.temp), "inline" == p.display ? ia(b, 0, !0) : a(".dwv", v).html(d(R)), b && E("onChange", [R]))
        }

        function E(g, b) {
            var k;
            b.push(n);
            a.each([ka.defaults, qa, c], function (a,
                                                   c) {
                c[g] && (k = c[g].apply(N, b))
            });
            return k
        }

        function I(c, g, b, k, y) {
            var g = Math.max(Y, Math.min(g, Z)), h = a(".dw-li", c).eq(g), e = void 0 === y ? g : y, f = M, i = k ? g == e ? 0.1 : Math.abs((g - e) * p.timeUnit) : 0;
            n.temp[f] = h.attr("data-val");
            m(c, f, g, i, y);
            setTimeout(function () {
                K(i, f, !0, b, void 0 !== y)
            }, 10)
        }

        function xa(a) {
            var c = ea[M] + 1;
            I(a, c > Z ? Y : c, 1, !0)
        }

        function ya(a) {
            var c = ea[M] - 1;
            I(a, c < Y ? Z : c, 2, !0)
        }

        function ia(a, c, g, b) {
            W && !g && K(c);
            R = p.formatResult(n.temp);
            b || (n.values = n.temp.slice(0), n.val = R);
            a && aa && G.val(R).trigger("change")
        }

        var na,
            H, R, v, S, O, ra, ca, P, sa, T, za, ka, Aa, V, fa, ta, X, Ba, U, ga, Y, Z, L, M, ha, ua, va, n = this, wa = a.mobiscroll, N = f, G = a(N), p = i({}, B), qa = {}, ba = {}, ea = {}, ja = {}, la = [], aa = G.is("input"), W = !1, Fa = function (c) {
                z(c) && !e && !k(this) && !V && (c.preventDefault(), e = !0, fa = "clickpick" != p.mode, L = a(".dw-ul", this), h(L), ga = (ta = void 0 !== ba[M]) ? r(L) : ea[M], X = A(c, "Y"), Ba = new Date, U = X, m(L, M, ga, 0.0010), fa && L.closest(".dwwl").addClass("dwa"), a(document).on(u, Ca).on(w, Da))
            }, Ca = function (a) {
                fa && (a.preventDefault(), a.stopPropagation(), U = A(a, "Y"), m(L, M, Math.max(Y -
                    1, Math.min(ga + (X - U) / H, Z + 1))));
                ta = !0
            }, Da = function () {
                var c = new Date - Ba, g = Math.max(Y - 1, Math.min(ga + (X - U) / H, Z + 1)), b, k = L.offset().top;
                300 > c ? (c = (U - X) / c, b = c * c / p.speedUnit, 0 > U - X && (b = -b)) : b = U - X;
                c = Math.round(ga - b / H);
                if (!b && !ta) {
                    var k = Math.floor((U - k) / H), y = a(".dw-li", L).eq(k);
                    b = fa;
                    !1 !== E("onValueTap", [y]) ? c = k : b = !0;
                    b && (y.addClass("dw-hl"), setTimeout(function () {
                        y.removeClass("dw-hl")
                    }, 200))
                }
                fa && I(L, c, 0, !0, Math.round(g));
                e = !1;
                L = null;
                a(document).off(u, Ca).off(w, Da)
            }, Ga = function (c) {
                var b = a(this);
                a(document).on(w,
                    Ea);
                b.hasClass("dwb-d") || b.addClass("dwb-a");
                setTimeout(function () {
                    b.blur()
                }, 10);
                b.hasClass("dwwb") && z(c) && g(c, b.closest(".dwwl"), b.hasClass("dwwbp") ? xa : ya)
            }, Ea = function () {
                V && (clearInterval(ha), V = !1);
                a(document).off(w, Ea);
                a(".dwb-a", v).removeClass("dwb-a")
            }, Ha = function (c) {
                38 == c.keyCode ? g(c, a(this), ya) : 40 == c.keyCode && g(c, a(this), xa)
            }, Ia = function () {
                V && (clearInterval(ha), V = !1)
            }, Ja = function (c) {
                if (!k(this)) {
                    c.preventDefault();
                    var c = c.originalEvent || c, c = c.wheelDelta ? c.wheelDelta / 120 : c.detail ? -c.detail /
                    3 : 0, b = a(".dw-ul", this);
                    h(b);
                    I(b, Math.round(ea[M] - c), 0 > c ? 1 : 2)
                }
            };
        n.position = function (c) {
            if (!("inline" == p.display || S === a(window).width() && ra === a(window).height() && c || !1 === E("onPosition", [v]))) {
                var b, g, k, y, e, h, f, i, n, d = 0, l = 0, c = a(window).scrollTop();
                y = a(".dwwr", v);
                var j = a(".dw", v), I = {};
                e = void 0 === p.anchor ? G : p.anchor;
                S = a(window).width();
                ra = a(window).height();
                O = (O = window.innerHeight) || ra;
                /modal|bubble/.test(p.display) && (a(".dwc", v).each(function () {
                    b = a(this).outerWidth(!0);
                    d += b;
                    l = b > l ? b : l
                }), b = d > S ? l : d, y.width(b).css("white-space",
                    d > S ? "" : "nowrap"));
                ca = j.outerWidth();
                P = j.outerHeight(!0);
                sa = P <= O && ca <= S;
                "modal" == p.display ? (g = (S - ca) / 2, k = c + (O - P) / 2) : "bubble" == p.display ? (n = !0, i = a(".dw-arrw-i", v), g = e.offset(), h = g.top, f = g.left, y = e.outerWidth(), e = e.outerHeight(), g = f - (j.outerWidth(!0) - y) / 2, g = g > S - ca ? S - (ca + 20) : g, g = 0 <= g ? g : 20, k = h - P, k < c || h > c + O ? (j.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"), k = h + e) : j.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"), i = i.outerWidth(), y = f + y / 2 - (g + (ca - i) / 2), a(".dw-arr", v).css({
                    left: Math.max(0,
                        Math.min(y, i))
                })) : (I.width = "100%", "top" == p.display ? k = c : "bottom" == p.display && (k = c + O - P));
                I.top = 0 > k ? 0 : k;
                I.left = g;
                j.css(I);
                a(".dw-persp", v).height(0).height(k + P > a(document).height() ? k + P : a(document).height());
                n && (k + P > c + O || h > c + O) && a(window).scrollTop(k + P - O)
            }
        };
        n.enable = function () {
            p.disabled = !1;
            aa && G.prop("disabled", !1)
        };
        n.disable = function () {
            p.disabled = !0;
            aa && G.prop("disabled", !0)
        };
        n.setValue = function (c, g, b, k) {
            n.temp = a.isArray(c) ? c.slice(0) : p.parseValue.call(N, c + "", n);
            ia(g, b, !1, k)
        };
        n.getValue = function () {
            return n.values
        };
        n.getValues = function () {
            var a = [], c;
            for (c in n._selectedValues)a.push(n._selectedValues[c]);
            return a
        };
        n.changeWheel = function (c, g) {
            if (v) {
                var b = 0, k = c.length;
                a.each(p.wheels, function (e, h) {
                    a.each(h, function (e, h) {
                        if (-1 < a.inArray(b, c) && (la[b] = h, a(".dw-ul", v).eq(b).html(y(b)), k--, !k))return n.position(), K(g, void 0, !0), !1;
                        b++
                    });
                    if (!k)return !1
                })
            }
        };
        n.isVisible = function () {
            return W
        };
        n.tap = function (a, c) {
            var b, g;
            if (p.tap)a.on("touchstart.dw", function (a) {
                a.preventDefault();
                b = A(a, "X");
                g = A(a, "Y")
            }).on("touchend.dw",
                function (a) {
                    20 > Math.abs(A(a, "X") - b) && 20 > Math.abs(A(a, "Y") - g) && c.call(this, a);
                    j = !0;
                    setTimeout(function () {
                        j = !1
                    }, 300)
                });
            a.on("click.dw", function (a) {
                j || c.call(this, a)
            })
        };
        n.show = function (c) {
            if (p.disabled || W)return !1;
            "top" == p.display && (T = "slidedown");
            "bottom" == p.display && (T = "slideup");
            l();
            E("onBeforeShow", []);
            var b, g = 0, k = "";
            T && !c && (k = "dw-" + T + " dw-in");
            var h = '<div class="' + p.theme + " dw-" + p.display + (Q ? " dw" + Q : "") + '">' + ("inline" == p.display ? '<div class="dw dwbg dwi"><div class="dwwr">' : '<div class="dw-persp"><div class="dwo"></div><div class="dw dwbg ' +
                k + '"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr"><div aria-live="assertive" class="dwv' + (p.headerText ? "" : " dw-hidden") + '"></div>') + '<div class="dwcc">';
            a.each(p.wheels, function (c, k) {
                h += '<div class="dwc' + ("scroller" != p.mode ? " dwpm" : " dwsc") + (p.showLabel ? "" : " dwhl") + '"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';
                a.each(k, function (a, c) {
                    la[g] = c;
                    b = void 0 !== c.label ? c.label : a;
                    h += '<td><div class="dwwl dwrc dwwl' + g + '">' + ("scroller" !=
                        p.mode ? '<div class="dwb-e dwwb dwwbp" style="height:' + H + "px;line-height:" + H + 'px;"><span>+</span></div><div class="dwb-e dwwb dwwbm" style="height:' + H + "px;line-height:" + H + 'px;"><span>&ndash;</span></div>' : "") + '<div class="dwl">' + b + '</div><div tabindex="0" aria-live="off" aria-label="' + b + '" role="listbox" class="dwww"><div class="dww" style="height:' + p.rows * H + "px;min-width:" + p.width + 'px;"><div class="dw-ul">';
                    h += y(g);
                    h += '</div><div class="dwwol"></div></div><div class="dwwo"></div></div><div class="dwwol"></div></div></td>';
                    g++
                });
                h += "</tr></table></div></div>"
            });
            h += "</div>" + ("inline" != p.display ? '<div class="dwbc' + (p.button3 ? " dwbc-p" : "") + '"><span class="dwbw dwb-s"><span class="dwb dwb-e" role="button" tabindex="0">' + p.setText + "</span></span>" + (p.button3 ? '<span class="dwbw dwb-n"><span class="dwb dwb-e" role="button" tabindex="0">' + p.button3Text + "</span></span>" : "") + '<span class="dwbw dwb-c"><span class="dwb dwb-e" role="button" tabindex="0">' + p.cancelText + "</span></span></div></div>" : "") + "</div></div></div>";
            v = a(h);
            K();
            E("onMarkupReady", [v]);
            "inline" != p.display ? (v.appendTo("body"), T && !c && (v.addClass("dw-trans"), setTimeout(function () {
                v.removeClass("dw-trans").find(".dw").removeClass(k)
            }, 350))) : G.is("div") ? G.html(v) : v.insertAfter(G);
            E("onMarkupInserted", [v]);
            W = !0;
            ka.init(v, n);
            if ("inline" != p.display) {
                n.tap(a(".dwb-s span", v), function () {
                    n.select()
                });
                n.tap(a(".dwb-c span", v), function () {
                    n.cancel()
                });
                p.button3 && n.tap(a(".dwb-n span", v), p.button3);
                a(window).on("keydown.dw", function (a) {
                    a.keyCode == 13 ? n.select() : a.keyCode ==
                    27 && n.cancel()
                });
                if (p.scrollLock)v.on("touchmove touchstart", function (a) {
                    sa && a.preventDefault()
                });
                a("input,select,button").each(function () {
                    if (!this.disabled) {
                        a(this).attr("autocomplete") && a(this).data("autocomplete", a(this).attr("autocomplete"));
                        a(this).addClass("dwtd").prop("disabled", true).attr("autocomplete", "off")
                    }
                });
                n.position();
                a(window).on("orientationchange.dw resize.dw scroll.dw", function (a) {
                    clearTimeout(za);
                    za = setTimeout(function () {
                        var c = a.type == "scroll";
                        (c && sa || !c) && n.position(!c)
                    }, 100)
                });
                n.alert(p.ariaDesc)
            }
            a(".dwww", v).on("DOMMouseScroll mousewheel", Ja).on(C, Fa).on("keydown", Ha).on("keyup", Ia);
            v.on(C, ".dwb-e", Ga).on("keydown", ".dwb-e", function (c) {
                if (c.keyCode == 32) {
                    c.preventDefault();
                    c.stopPropagation();
                    a(this).click()
                }
            });
            E("onShow", [v, R])
        };
        n.hide = function (c, b) {
            if (!W || !1 === E("onClose", [R, b]))return !1;
            a(".dwtd").each(function () {
                a(this).prop("disabled", !1).removeClass("dwtd");
                a(this).data("autocomplete") ? a(this).attr("autocomplete", a(this).data("autocomplete")) : a(this).removeAttr("autocomplete")
            });
            v && ("inline" != p.display && T && !c ? (v.addClass("dw-trans").find(".dw").addClass("dw-" + T + " dw-out"), setTimeout(function () {
                v.remove();
                v = null
            }, 350)) : (v.remove(), v = null), a(window).off(".dw"));
            ja = {};
            W = !1;
            va = !0;
            G.focus()
        };
        n.select = function () {
            !1 !== n.hide(!1, "set") && (ia(!0, 0, !0), E("onSelect", [n.val]))
        };
        n.alert = function (a) {
            o.text(a);
            clearTimeout(s);
            s = setTimeout(function () {
                o.text("")
            }, 5E3)
        };
        n.cancel = function () {
            !1 !== n.hide(!1, "cancel") && E("onCancel", [n.val])
        };
        n.init = function (a) {
            ka = i({defaults: {}, init: b}, wa.themes[a.theme ||
            p.theme]);
            Aa = wa.i18n[a.lang || p.lang];
            i(c, a);
            i(p, ka.defaults, Aa, c);
            n.settings = p;
            G.off(".dw");
            if (a = wa.presets[p.preset])qa = a.call(N, n), i(p, qa, c);
            na = Math.floor(p.rows / 2);
            H = p.height;
            T = p.animate;
            W && n.hide();
            if ("inline" == p.display)n.show(); else {
                l();
                if (aa && (void 0 === ua && (ua = N.readOnly), N.readOnly = !0, p.showOnFocus))G.on("focus.dw", function () {
                    va || n.show();
                    va = false
                });
                p.showOnTap && n.tap(G, function () {
                    n.show()
                })
            }
        };
        n.trigger = function (a, c) {
            return E(a, c)
        };
        n.option = function (a, c) {
            var b = {};
            "object" === typeof a ? b = a : b[a] =
                c;
            n.init(b)
        };
        n.destroy = function () {
            n.hide();
            G.off(".dw");
            delete q[N.id];
            aa && (N.readOnly = ua)
        };
        n.getInst = function () {
            return n
        };
        n.values = null;
        n.val = null;
        n.temp = null;
        n._selectedValues = {};
        n.init(c)
    }

    function d(a) {
        for (var c in a)if (void 0 !== r[a[c]])return !0;
        return !1
    }

    function z(a) {
        if ("touchstart" === a.type)t = !0; else if (t)return t = !1;
        return !0
    }

    function A(a, c) {
        var b = a.originalEvent, k = a.changedTouches;
        return k || b && b.changedTouches ? b ? b.changedTouches[0]["page" + c] : k[0]["page" + c] : a["page" + c]
    }

    function F(b) {
        var c = {
            values: [],
            keys: []
        };
        a.each(b, function (a, b) {
            c.keys.push(a);
            c.values.push(b)
        });
        return c
    }

    function l(a, c, b) {
        var k = a;
        if ("object" === typeof c)return a.each(function () {
            this.id || (f += 1, this.id = "mobiscroll" + f);
            q[this.id] = new m(this, c)
        });
        "string" === typeof c && a.each(function () {
            var a;
            if ((a = q[this.id]) && a[c])if (a = a[c].apply(this, Array.prototype.slice.call(b, 1)), void 0 !== a)return k = a, !1
        });
        return k
    }

    var e, j, t, s, o, f = (new Date).getTime(), q = {}, b = function () {
    }, r = document.createElement("modernizr").style, x = d(["perspectiveProperty",
        "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]), Q = function () {
        var a = ["Webkit", "Moz", "O", "ms"], c;
        for (c in a)if (d([a[c] + "Transform"]))return "-" + a[c].toLowerCase();
        return ""
    }(), D = Q.replace(/^\-/, "").replace("moz", "Moz"), i = a.extend, C = "touchstart mousedown", u = "touchmove mousemove", w = "touchend mouseup", B = {
        width: 70,
        height: 40,
        rows: 3,
        delay: 300,
        disabled: !1,
        readonly: !1,
        showOnFocus: !0,
        showOnTap: !0,
        showLabel: !0,
        wheels: [],
        theme: "",
        headerText: "{value}",
        display: "modal",
        mode: "scroller",
        preset: "",
        lang: "en-US",
        setText: "Set",
        cancelText: "Cancel",
        ariaDesc: "Select a value",
        scrollLock: !0,
        tap: !0,
        speedUnit: 0.0012,
        timeUnit: 0.1,
        formatResult: function (a) {
            return a.join(" ")
        },
        parseValue: function (b, c) {
            var g = b.split(" "), k = [], y = 0, h;
            a.each(c.settings.wheels, function (c, b) {
                a.each(b, function (c, b) {
                    b = b.values ? b : F(b);
                    h = b.keys || b.values;
                    -1 !== a.inArray(g[y], h) ? k.push(g[y]) : k.push(h[0]);
                    y++
                })
            });
            return k
        }
    };
    a(function () {
        o = a('<div class="dw-hidden" role="alert"></div>').appendTo("body")
    });
    a(document).on("mouseover mouseup mousedown click",
        function (a) {
            if (j)return a.stopPropagation(), a.preventDefault(), !1
        });
    a.fn.mobiscroll = function (b) {
        i(this, a.mobiscroll.shorts);
        return l(this, b, arguments)
    };
    a.mobiscroll = a.mobiscroll || {
            setDefaults: function (a) {
                i(B, a)
            }, presetShort: function (a) {
                this.shorts[a] = function (c) {
                    return l(this, i(c, {preset: a}), arguments)
                }
            }, has3d: x, shorts: {}, presets: {}, themes: {}, i18n: {}
        };
    a.scroller = a.scroller || a.mobiscroll;
    a.fn.scroller = a.fn.scroller || a.fn.mobiscroll
})(jQuery);


(function (a) {
    var m = a.mobiscroll, d = new Date, z = {
        dateFormat: "mm/dd/yy",
        dateOrder: "mmddy",
        timeWheels: "hhiiA",
        timeFormat: "hh:ii A",
        startYear: d.getFullYear() - 100,
        endYear: d.getFullYear() + 1,
        monthNames: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
        monthNamesShort: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
        dayNames: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
        dayNamesShort: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
        shortYearCutoff: "+10",
        monthText: "Month",
        dayText: "Day",
        yearText: "Year",
        hourText: "Hours",
        minuteText: "Minutes",
        secText: "Seconds",
        ampmText: "&nbsp;",
        nowText: "Now",
        showNow: !1,
        stepHour: 1,
        stepMinute: 1,
        stepSecond: 1,
        separator: " "
    }, A = function (d) {
        function l(a, c, b) {
            return void 0 !== w[c] ? +a[w[c]] : void 0 !== b ? b : ma[B[c]] ? ma[B[c]]() : B[c](ma)
        }

        function e(a, c, b, g) {
            a.push({values: b, keys: c, label: g})
        }

        function j(a, c) {
            return Math.floor(a / c) * c
        }

        function t(a) {
            var c = l(a, "h", 0);
            return new Date(l(a, "y"), l(a, "m"), l(a, "d", 1), l(a, "a") ?
            c + 12 : c, l(a, "i", 0), l(a, "s", 0))
        }

        var s = a(this), o = {}, f;
        if (s.is("input")) {
            switch (s.attr("type")) {
                case "date":
                    f = "yy-mm-dd";
                    break;
                case "datetime":
                    f = "yy-mm-ddTHH:ii:ssZ";
                    break;
                case "datetime-local":
                    f = "yy-mm-ddTHH:ii:ss";
                    break;
                case "month":
                    f = "yy-mm";
                    o.dateOrder = "mmyy";
                    break;
                case "time":
                    f = "HH:ii:ss"
            }
            var q = s.attr("min"), s = s.attr("max");
            q && (o.minDate = m.parseDate(f, q));
            s && (o.maxDate = m.parseDate(f, s))
        }
        var b, r, x, A, D, q = a.extend({}, d.settings), i = a.extend(d.settings, z, o, q), C = 0, s = [], u = [], w = {}, B = {
            y: "getFullYear", m: "getMonth",
            d: "getDate", h: function (a) {
                a = a.getHours();
                a = h && 12 <= a ? a - 12 : a;
                return j(a, da)
            }, i: function (a) {
                return j(a.getMinutes(), oa)
            }, s: function (a) {
                return j(a.getSeconds(), pa)
            }, a: function (a) {
                return y && 11 < a.getHours() ? 1 : 0
            }
        }, J = i.preset, c = i.dateOrder, g = i.timeWheels, k = c.match(/D/), y = g.match(/a/i), h = g.match(/h/), $ = "datetime" == J ? i.dateFormat + i.separator + i.timeFormat : "time" == J ? i.timeFormat : i.dateFormat, ma = new Date, da = i.stepHour, oa = i.stepMinute, pa = i.stepSecond, K = i.minDate || new Date(i.startYear, 0, 1), E = i.maxDate || new Date(i.endYear,
                11, 31, 23, 59, 59);
        f = f || $;
        if (J.match(/date/i)) {
            a.each(["y", "m", "d"], function (a, g) {
                b = c.search(RegExp(g, "i"));
                -1 < b && u.push({o: b, v: g})
            });
            u.sort(function (a, c) {
                return a.o > c.o ? 1 : -1
            });
            a.each(u, function (a, c) {
                w[c.v] = a
            });
            q = [];
            for (o = 0; 3 > o; o++)if (o == w.y) {
                C++;
                x = [];
                r = [];
                A = K.getFullYear();
                D = E.getFullYear();
                for (b = A; b <= D; b++)r.push(b), x.push(c.match(/yy/i) ? b : (b + "").substr(2, 2));
                e(q, r, x, i.yearText)
            } else if (o == w.m) {
                C++;
                x = [];
                r = [];
                for (b = 0; 12 > b; b++)A = c.replace(/[dy]/gi, "").replace(/mm/, 9 > b ? "0" + (b + 1) : b + 1).replace(/m/, b + 1),
                    r.push(b), x.push(A.match(/MM/) ? A.replace(/MM/, '<span class="dw-mon">' + i.monthNames[b] + "</span>") : A.replace(/M/, '<span class="dw-mon">' + i.monthNamesShort[b] + "</span>"));
                e(q, r, x, i.monthText)
            } else if (o == w.d) {
                C++;
                x = [];
                r = [];
                for (b = 1; 32 > b; b++)r.push(b), x.push(c.match(/dd/i) && 10 > b ? "0" + b : b);
                e(q, r, x, i.dayText)
            }
            s.push(q)
        }
        if (J.match(/time/i)) {
            u = [];
            a.each(["h", "i", "s", "a"], function (a, c) {
                a = g.search(RegExp(c, "i"));
                -1 < a && u.push({o: a, v: c})
            });
            u.sort(function (a, c) {
                return a.o > c.o ? 1 : -1
            });
            a.each(u, function (a, c) {
                w[c.v] =
                    C + a
            });
            q = [];
            for (o = C; o < C + 4; o++)if (o == w.h) {
                C++;
                x = [];
                r = [];
                for (b = 0; b < (h ? 12 : 24); b += da)r.push(b), x.push(h && 0 == b ? 12 : g.match(/hh/i) && 10 > b ? "0" + b : b);
                e(q, r, x, i.hourText)
            } else if (o == w.i) {
                C++;
                x = [];
                r = [];
                for (b = 0; 60 > b; b += oa)r.push(b), x.push(g.match(/ii/) && 10 > b ? "0" + b : b);
                e(q, r, x, i.minuteText)
            } else if (o == w.s) {
                C++;
                x = [];
                r = [];
                for (b = 0; 60 > b; b += pa)r.push(b), x.push(g.match(/ss/) && 10 > b ? "0" + b : b);
                e(q, r, x, i.secText)
            } else o == w.a && (C++, r = g.match(/A/), e(q, [0, 1], r ? ["AM", "PM"] : ["am", "pm"], i.ampmText));
            s.push(q)
        }
        d.setDate = function (a,
                              c, b, g) {
            for (var k in w)d.temp[w[k]] = a[B[k]] ? a[B[k]]() : B[k](a);
            d.setValue(d.temp, c, b, g)
        };
        d.getDate = function (a) {
            return t(a ? d.temp : d.values)
        };
        return {
            button3Text: i.showNow ? i.nowText : void 0, button3: i.showNow ? function () {
                d.setDate(new Date, !1, 0.3, !0)
            } : void 0, wheels: s, headerText: function () {
                return m.formatDate($, t(d.temp), i)
            }, formatResult: function (a) {
                return m.formatDate(f, t(a), i)
            }, parseValue: function (a) {
                var c = new Date, b, g = [];
                try {
                    c = m.parseDate(f, a, i)
                } catch (k) {
                }
                for (b in w)g[w[b]] = c[B[b]] ? c[B[b]]() : B[b](c);
                return g
            },
            validate: function (b) {
                var g = d.temp, y = {y: K.getFullYear(), m: 0, d: 1, h: 0, i: 0, s: 0, a: 0}, e = {
                    y: E.getFullYear(),
                    m: 11,
                    d: 31,
                    h: j(h ? 11 : 23, da),
                    i: j(59, oa),
                    s: j(59, pa),
                    a: 1
                }, f = !0, o = !0;
                a.each("y,m,d,a,h,i,s".split(","), function (h, d) {
                    if (w[d] !== void 0) {
                        var j = y[d], r = e[d], $ = 31, x = l(g, d), q = a(".dw-ul", b).eq(w[d]), t, s;
                        if (d == "d") {
                            t = l(g, "y");
                            s = l(g, "m");
                            r = $ = 32 - (new Date(t, s, 32)).getDate();
                            k && a(".dw-li", q).each(function () {
                                var b = a(this), g = b.data("val"), k = (new Date(t, s, g)).getDay(), g = c.replace(/[my]/gi, "").replace(/dd/, g < 10 ? "0" + g :
                                    g).replace(/d/, g);
                                a(".dw-i", b).html(g.match(/DD/) ? g.replace(/DD/, '<span class="dw-day">' + i.dayNames[k] + "</span>") : g.replace(/D/, '<span class="dw-day">' + i.dayNamesShort[k] + "</span>"))
                            })
                        }
                        f && K && (j = K[B[d]] ? K[B[d]]() : B[d](K));
                        o && E && (r = E[B[d]] ? E[B[d]]() : B[d](E));
                        if (d != "y") {
                            var A = a(".dw-li", q).index(a('.dw-li[data-val="' + j + '"]', q)), u = a(".dw-li", q).index(a('.dw-li[data-val="' + r + '"]', q));
                            a(".dw-li", q).removeClass("dw-v").slice(A, u + 1).addClass("dw-v");
                            d == "d" && a(".dw-li", q).removeClass("dw-h").slice($).addClass("dw-h")
                        }
                        x <
                        j && (x = j);
                        x > r && (x = r);
                        f && (f = x == j);
                        o && (o = x == r);
                        if (i.invalid && d == "d") {
                            var m = [];
                            i.invalid.dates && a.each(i.invalid.dates, function (a, c) {
                                c.getFullYear() == t && c.getMonth() == s && m.push(c.getDate() - 1)
                            });
                            if (i.invalid.daysOfWeek) {
                                var da = (new Date(t, s, 1)).getDay(), F;
                                a.each(i.invalid.daysOfWeek, function (a, c) {
                                    for (F = c - da; F < $; F = F + 7)F >= 0 && m.push(F)
                                })
                            }
                            i.invalid.daysOfMonth && a.each(i.invalid.daysOfMonth, function (a, c) {
                                c = (c + "").split("/");
                                c[1] ? c[0] - 1 == s && m.push(c[1] - 1) : m.push(c[0] - 1)
                            });
                            a.each(m, function (c, b) {
                                a(".dw-li", q).eq(b).removeClass("dw-v")
                            })
                        }
                        g[w[d]] =
                            x
                    }
                })
            }
        }
    };
    a.each(["date", "time", "datetime"], function (a, d) {
        m.presets[d] = A;
        m.presetShort(d)
    });
    m.formatDate = function (d, l, e) {
        if (!l)return null;
        var e = a.extend({}, z, e), j = function (a) {
            for (var b = 0; o + 1 < d.length && d.charAt(o + 1) == a;)b++, o++;
            return b
        }, t = function (a, b, d) {
            b = "" + b;
            if (j(a))for (; b.length < d;)b = "0" + b;
            return b
        }, s = function (a, b, d, e) {
            return j(a) ? e[b] : d[b]
        }, o, f = "", q = !1;
        for (o = 0; o < d.length; o++)if (q)"'" == d.charAt(o) && !j("'") ? q = !1 : f += d.charAt(o); else switch (d.charAt(o)) {
            case "d":
                f += t("d", l.getDate(), 2);
                break;
            case "D":
                f +=
                    s("D", l.getDay(), e.dayNamesShort, e.dayNames);
                break;
            case "o":
                f += t("o", (l.getTime() - (new Date(l.getFullYear(), 0, 0)).getTime()) / 864E5, 3);
                break;
            case "m":
                f += t("m", l.getMonth() + 1, 2);
                break;
            case "M":
                f += s("M", l.getMonth(), e.monthNamesShort, e.monthNames);
                break;
            case "y":
                f += j("y") ? l.getFullYear() : (10 > l.getYear() % 100 ? "0" : "") + l.getYear() % 100;
                break;
            case "h":
                var b = l.getHours(), f = f + t("h", 12 < b ? b - 12 : 0 == b ? 12 : b, 2);
                break;
            case "H":
                f += t("H", l.getHours(), 2);
                break;
            case "i":
                f += t("i", l.getMinutes(), 2);
                break;
            case "s":
                f += t("s",
                    l.getSeconds(), 2);
                break;
            case "a":
                f += 11 < l.getHours() ? "pm" : "am";
                break;
            case "A":
                f += 11 < l.getHours() ? "PM" : "AM";
                break;
            case "'":
                j("'") ? f += "'" : q = !0;
                break;
            default:
                f += d.charAt(o)
        }
        return f
    };
    m.parseDate = function (d, l, e) {
        var j = new Date;
        if (!d || !l)return j;
        var l = "object" == typeof l ? l.toString() : l + "", t = a.extend({}, z, e), s = t.shortYearCutoff, e = j.getFullYear(), o = j.getMonth() + 1, f = j.getDate(), q = -1, b = j.getHours(), j = j.getMinutes(), r = 0, m = -1, A = !1, D = function (a) {
            (a = w + 1 < d.length && d.charAt(w + 1) == a) && w++;
            return a
        }, i = function (a) {
            D(a);
            a = l.substr(u).match(RegExp("^\\d{1," + ("@" == a ? 14 : "!" == a ? 20 : "y" == a ? 4 : "o" == a ? 3 : 2) + "}"));
            if (!a)return 0;
            u += a[0].length;
            return parseInt(a[0], 10)
        }, C = function (a, b, c) {
            a = D(a) ? c : b;
            for (b = 0; b < a.length; b++)if (l.substr(u, a[b].length).toLowerCase() == a[b].toLowerCase())return u += a[b].length, b + 1;
            return 0
        }, u = 0, w;
        for (w = 0; w < d.length; w++)if (A)"'" == d.charAt(w) && !D("'") ? A = !1 : u++; else switch (d.charAt(w)) {
            case "d":
                f = i("d");
                break;
            case "D":
                C("D", t.dayNamesShort, t.dayNames);
                break;
            case "o":
                q = i("o");
                break;
            case "m":
                o = i("m");
                break;
            case "M":
                o = C("M", t.monthNamesShort, t.monthNames);
                break;
            case "y":
                e = i("y");
                break;
            case "H":
                b = i("H");
                break;
            case "h":
                b = i("h");
                break;
            case "i":
                j = i("i");
                break;
            case "s":
                r = i("s");
                break;
            case "a":
                m = C("a", ["am", "pm"], ["am", "pm"]) - 1;
                break;
            case "A":
                m = C("A", ["am", "pm"], ["am", "pm"]) - 1;
                break;
            case "'":
                D("'") ? u++ : A = !0;
                break;
            default:
                u++
        }
        100 > e && (e += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (e <= ("string" != typeof s ? s : (new Date).getFullYear() % 100 + parseInt(s, 10)) ? 0 : -100));
        if (-1 < q) {
            o = 1;
            f = q;
            do {
                t = 32 - (new Date(e, o -
                        1, 32)).getDate();
                if (f <= t)break;
                o++;
                f -= t
            } while (1)
        }
        b = new Date(e, o - 1, f, -1 == m ? b : m && 12 > b ? b + 12 : !m && 12 == b ? 0 : b, j, r);
        if (b.getFullYear() != e || b.getMonth() + 1 != o || b.getDate() != f)throw"Invalid date";
        return b
    }
})(jQuery);
(function (a) {
    var m = a.mobiscroll, d = {invalid: [], showInput: !0, inputClass: ""}, z = function (m) {
        function z(c, b, k, d) {
            for (var h = 0; h < b;) {
                var e = a(".dwwl" + h, c), f = l(d, h, k);
                a.each(f, function (c, b) {
                    a('.dw-li[data-val="' + b + '"]', e).removeClass("dw-v")
                });
                h++
            }
        }

        function l(a, b, k) {
            for (var d = 0, h, e = []; d < b;) {
                var f = a[d];
                for (h in k)if (k[h].key == f) {
                    k = k[h].children;
                    break
                }
                d++
            }
            for (d = 0; d < k.length;)k[d].invalid && e.push(k[d].key), d++;
            return e
        }

        function e(a, b) {
            for (var k = []; a;)k[--a] = !0;
            k[b] = !1;
            return k
        }

        function j(a, b, k) {
            var d = 0, h, e, f =
                [], i = u;
            if (b)for (h = 0; h < b; h++)f[h] = [{}];
            for (; d < a.length;) {
                h = f;
                for (var b = d, j = i, m = {
                    keys: [],
                    values: [],
                    label: w[d]
                }, l = 0; l < j.length;)m.values.push(j[l].value), m.keys.push(j[l].key), l++;
                h[b] = [m];
                h = 0;
                for (b = void 0; h < i.length && void 0 === b;) {
                    if (i[h].key == a[d] && (void 0 !== k && d <= k || void 0 === k))b = h;
                    h++
                }
                if (void 0 !== b && i[b].children)d++, i = i[b].children; else if ((e = t(i)) && e.children)d++, i = e.children; else break
            }
            return f
        }

        function t(a, b) {
            if (!a)return !1;
            for (var d = 0, e; d < a.length;)if (!(e = a[d++]).invalid)return b ? d - 1 : e;
            return !1
        }

        function s(c, b) {
            a(".dwc", c).css("display", "").slice(b).hide()
        }

        function o(a, b) {
            var d = [], e = u, h = 0, f = !1, i, j;
            if (void 0 !== a[h] && h <= b) {
                f = 0;
                i = a[h];
                for (j = void 0; f < e.length && void 0 === j;)e[f].key == a[h] && !e[f].invalid && (j = f), f++
            } else j = t(e, !0), i = e[j].key;
            f = void 0 !== j ? e[j].children : !1;
            for (d[h] = i; f;) {
                e = e[j].children;
                h++;
                if (void 0 !== a[h] && h <= b) {
                    f = 0;
                    i = a[h];
                    for (j = void 0; f < e.length && void 0 === j;)e[f].key == a[h] && !e[f].invalid && (j = f), f++
                } else j = t(e, !0), j = !1 === j ? void 0 : j, i = e[j].key;
                f = void 0 !== j && t(e[j].children) ? e[j].children :
                    !1;
                d[h] = i
            }
            return {lvl: h + 1, nVector: d}
        }

        function f(c) {
            var b = [];
            D = D > i++ ? D : i;
            c.children("li").each(function (c) {
                var d = a(this), e = d.clone();
                e.children("ul,ol").remove();
                var e = e.html().replace(/^\s\s*/, "").replace(/\s\s*$/, ""), j = d.data("invalid") ? !0 : !1, c = {
                    key: d.data("val") || c,
                    value: e,
                    invalid: j,
                    children: null
                }, d = d.children("ul,ol");
                d.length && (c.children = f(d));
                b.push(c)
            });
            i--;
            return b
        }

        var q = a.extend({}, m.settings), b = a.extend(m.settings, d, q), q = a(this), r, x, Q = this.id + "_dummy", D = 0, i = 0, C = {}, u = b.wheelArray || f(q), w =
            function (a) {
                var d = [], e;
                for (e = 0; e < a; e++)d[e] = b.labels && b.labels[e] ? b.labels[e] : e;
                return d
            }(D), B = [], J = function (a) {
            for (var b = [], d, e = !0, f = 0; e;)if (d = t(a), b[f++] = d.key, e = d.children)a = d.children;
            return b
        }(u), J = j(J, D);
        a("#" + Q).remove();
        b.showInput && (r = a('<input type="text" id="' + Q + '" value="" class="' + b.inputClass + '" readonly />').insertBefore(q), m.settings.anchor = r, b.showOnFocus && r.focus(function () {
            m.show()
        }), b.showOnTap && m.tap(r, function () {
            m.show()
        }));
        b.wheelArray || q.hide().closest(".ui-field-contain").trigger("create");
        return {
            width: 50, wheels: J, headerText: !1, onBeforeShow: function () {
                var a = m.temp;
                B = a.slice(0);
                m.settings.wheels = j(a, D, D);
                x = true
            }, onSelect: function (a) {
                r && r.val(a)
            }, onChange: function (a) {
                r && b.display == "inline" && r.val(a)
            }, onClose: function () {
                r && r.blur()
            }, onShow: function (c) {
                a(".dwwl", c).on("mousedown touchstart", function () {
                    clearTimeout(C[a(".dwwl", c).index(this)])
                })
            }, validate: function (a, b, d) {
                var f = m.temp;
                if (b !== void 0 && B[b] != f[b] || b === void 0 && !x) {
                    m.settings.wheels = j(f, null, b);
                    var h = [], i = (b || 0) + 1, l = o(f, b);
                    if (b !== void 0)m.temp = l.nVector.slice(0);
                    for (; i < l.lvl;)h.push(i++);
                    s(a, l.lvl);
                    B = m.temp.slice(0);
                    if (h.length) {
                        x = true;
                        m.settings.readonly = e(D, b);
                        clearTimeout(C[b]);
                        C[b] = setTimeout(function () {
                            m.changeWheel(h);
                            m.settings.readonly = false
                        }, d * 1E3);
                        return false
                    }
                    z(a, l.lvl, u, m.temp)
                } else {
                    l = o(f, f.length);
                    z(a, l.lvl, u, f);
                    s(a, l.lvl)
                }
                x = false
            }
        }
    };
    a.each(["list", "image", "treelist"], function (a, d) {
        m.presets[d] = z;
        m.presetShort(d)
    })
})(jQuery);
(function (a) {
    var m = {inputClass: "", invalid: [], rtl: !1, group: !1, groupLabel: "Groups"};
    a.mobiscroll.presetShort("select");
    a.mobiscroll.presets.select = function (d) {
        function z() {
            var c, b = 0, d = [], f = [], h = [[]];
            e.group ? (e.rtl && (b = 1), a("optgroup", j).each(function (c) {
                d.push(a(this).attr("label"));
                f.push(c)
            }), h[b] = [{values: d, keys: f, label: e.groupLabel}], c = o, b += e.rtl ? -1 : 1) : c = j;
            d = [];
            f = [];
            a("option", c).each(function () {
                var c = a(this).attr("value");
                d.push(a(this).text());
                f.push(c);
                a(this).prop("disabled") && Q.push(c)
            });
            h[b] =
                [{values: d, keys: f, label: x}];
            return h
        }

        function A(a, e) {
            var f = [];
            if (t) {
                var l = [], h = 0;
                for (h in d._selectedValues)l.push(i[h]), f.push(h);
                B.val(l.join(", "))
            } else B.val(a), f = e ? d.values[u] : null;
            e && (b = !0, j.val(f).trigger("change"))
        }

        function F(a) {
            if (t && a.hasClass("dw-v") && a.closest(".dw").find(".dw-ul").index(a.closest(".dw-ul")) == u) {
                var b = a.attr("data-val");
                a.hasClass("dw-msel") ? (a.removeClass("dw-msel").removeAttr("aria-selected"), delete d._selectedValues[b]) : (a.addClass("dw-msel").attr("aria-selected", "true"),
                    d._selectedValues[b] = b);
                "inline" == e.display && A(b, !0);
                return !1
            }
        }

        var l = a.extend({}, d.settings), e = a.extend(d.settings, m, l), j = a(this), t = j.prop("multiple"), l = this.id + "_dummy", s = t ? j.val() ? j.val()[0] : a("option", j).attr("value") : j.val(), o = j.find('option[value="' + s + '"]').parent(), f = o.index() + "", q = f, b;
        a('label[for="' + this.id + '"]').attr("for", l);
        var r = a('label[for="' + l + '"]'), x = void 0 !== e.label ? e.label : r.length ? r.text() : j.attr("name"), Q = [], D = [], i = {}, C, u, w, B, J = e.readonly;
        e.group && !a("optgroup", j).length && (e.group = !1);
        e.invalid.length || (e.invalid = Q);
        e.group ? e.rtl ? (C = 1, u = 0) : (C = 0, u = 1) : (C = -1, u = 0);
        a("#" + l).remove();
        B = a('<input type="text" id="' + l + '" class="' + e.inputClass + '" readonly />').insertBefore(j);
        a("option", j).each(function () {
            i[a(this).attr("value")] = a(this).text()
        });
        e.showOnFocus && B.focus(function () {
            d.show()
        });
        e.showOnTap && d.tap(B, function () {
            d.show()
        });
        l = j.val() || [];
        r = 0;
        for (r; r < l.length; r++)d._selectedValues[l[r]] = l[r];
        A(i[s]);
        j.off(".dwsel").on("change.dwsel", function () {
            b || d.setValue(t ? j.val() || [] : [j.val()],
                true);
            b = false
        }).hide().closest(".ui-field-contain").trigger("create");
        d._setValue || (d._setValue = d.setValue);
        d.setValue = function (c, b, k, l, h) {
            var m = a.isArray(c) ? c[0] : c;
            s = m !== void 0 ? m : a("option", j).attr("value");
            if (t) {
                d._selectedValues = {};
                m = 0;
                for (m; m < c.length; m++)d._selectedValues[c[m]] = c[m]
            }
            if (e.group) {
                o = j.find('option[value="' + s + '"]').parent();
                q = o.index();
                c = e.rtl ? [s, o.index()] : [o.index(), s];
                if (q !== f) {
                    e.wheels = z();
                    d.changeWheel([u]);
                    f = q + ""
                }
            } else c = [s];
            d._setValue(c, b, k, l, h);
            if (b) {
                b = t ? true : s !== j.val();
                A(i[s], b)
            }
        };
        d.getValue = function (a) {
            return (a ? d.temp : d.values)[u]
        };
        return {
            width: 50, wheels: void 0, headerText: !1, multiple: t, anchor: B, formatResult: function (a) {
                return i[a[u]]
            }, parseValue: function () {
                var b = j.val() || [], g = 0;
                if (t) {
                    d._selectedValues = {};
                    for (g; g < b.length; g++)d._selectedValues[b[g]] = b[g]
                }
                s = t ? j.val() ? j.val()[0] : a("option", j).attr("value") : j.val();
                o = j.find('option[value="' + s + '"]').parent();
                q = o.index();
                f = q + "";
                return e.group && e.rtl ? [s, q] : e.group ? [q, s] : [s]
            }, validate: function (b, g, i) {
                if (g === void 0 && t) {
                    var l =
                        d._selectedValues, h = 0;
                    a(".dwwl" + u + " .dw-li", b).removeClass("dw-msel").removeAttr("aria-selected");
                    for (h in l)a(".dwwl" + u + ' .dw-li[data-val="' + l[h] + '"]', b).addClass("dw-msel").attr("aria-selected", "true")
                }
                if (g === C) {
                    q = d.temp[C];
                    if (q !== f) {
                        o = j.find("optgroup").eq(q);
                        q = o.index();
                        s = (s = o.find("option").eq(0).val()) || j.val();
                        e.wheels = z();
                        if (e.group) {
                            d.temp = e.rtl ? [s, q] : [q, s];
                            e.readonly = [e.rtl, !e.rtl];
                            clearTimeout(w);
                            w = setTimeout(function () {
                                d.changeWheel([u]);
                                e.readonly = J;
                                f = q + ""
                            }, i * 1E3);
                            return false
                        }
                    } else e.readonly =
                        J
                } else s = d.temp[u];
                var m = a(".dw-ul", b).eq(u);
                a.each(e.invalid, function (b, c) {
                    a('.dw-li[data-val="' + c + '"]', m).removeClass("dw-v")
                })
            }, onBeforeShow: function () {
                e.wheels = z();
                if (e.group)d.temp = e.rtl ? [s, o.index()] : [o.index(), s]
            }, onMarkupReady: function (b) {
                a(".dwwl" + C, b).on("mousedown touchstart", function () {
                    clearTimeout(w)
                });
                if (t) {
                    b.addClass("dwms");
                    a(".dwwl", b).eq(u).addClass("dwwms").attr("aria-multiselectable", "true");
                    a(".dwwl", b).on("keydown", function (b) {
                        if (b.keyCode == 32) {
                            b.preventDefault();
                            b.stopPropagation();
                            F(a(".dw-sel", this))
                        }
                    });
                    D = {};
                    for (var e in d._selectedValues)D[e] = d._selectedValues[e]
                }
            }, onValueTap: F, onSelect: function (a) {
                A(a, true);
                if (e.group)d.values = null
            }, onCancel: function () {
                if (e.group)d.values = null;
                if (t) {
                    d._selectedValues = {};
                    for (var a in D)d._selectedValues[a] = D[a]
                }
            }, onChange: function (a) {
                if (e.display == "inline" && !t) {
                    B.val(a);
                    b = true;
                    j.val(d.temp[u]).trigger("change")
                }
            }, onClose: function () {
                B.blur()
            }
        }
    }
})(jQuery);
(function (a) {
    a.mobiscroll.themes.android = {defaults: {dateOrder: "Mddyy", mode: "clickpick", height: 50, showLabel: !1}}
})(jQuery);
(function (a) {
    var m = {
        defaults: {
            dateOrder: "Mddyy",
            mode: "mixed",
            rows: 5,
            width: 70,
            height: 36,
            showLabel: !1,
            useShortLabels: !0
        }
    };
    a.mobiscroll.themes["android-ics"] = m;
    a.mobiscroll.themes["android-ics light"] = m
})(jQuery);
(function (a) {
    var m = {
        defaults: {
            dateOrder: "Mddyy",
            mode: "mixed",
            rows: 5,
            width: 70,
            height: 36,
            showLabel: !1,
            useShortLabels: !0
        }
    };
    a.mobiscroll.themes["iot-theme"] = m;
})(jQuery);