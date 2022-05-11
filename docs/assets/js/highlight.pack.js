/*! highlight.js v9.9.0 | BSD3 License | git.io/hljslicense */
!(function (e) {
  var n =
    ("object" == typeof window && window) || ("object" == typeof self && self);
  "undefined" != typeof exports
    ? e(exports)
    : n &&
      ((n.hljs = e({})),
      "function" == typeof define &&
        define.amd &&
        define([], function () {
          return n.hljs;
        }));
})(function (e) {
  function n(e) {
    return e.replace(/[&<>]/gm, function (e) {
      return I[e];
    });
  }
  function t(e) {
    return e.nodeName.toLowerCase();
  }
  function r(e, n) {
    var t = e && e.exec(n);
    return t && 0 === t.index;
  }
  function i(e) {
    return k.test(e);
  }
  function a(e) {
    var n,
      t,
      r,
      a,
      o = e.className + " ";
    if (((o += e.parentNode ? e.parentNode.className : ""), (t = B.exec(o))))
      return R(t[1]) ? t[1] : "no-highlight";
    for (o = o.split(/\s+/), n = 0, r = o.length; r > n; n++)
      if (((a = o[n]), i(a) || R(a))) return a;
  }
  function o(e, n) {
    var t,
      r = {};
    for (t in e) r[t] = e[t];
    if (n) for (t in n) r[t] = n[t];
    return r;
  }
  function u(e) {
    var n = [];
    return (
      (function r(e, i) {
        for (var a = e.firstChild; a; a = a.nextSibling)
          3 === a.nodeType
            ? (i += a.nodeValue.length)
            : 1 === a.nodeType &&
              (n.push({ event: "start", offset: i, node: a }),
              (i = r(a, i)),
              t(a).match(/br|hr|img|input/) ||
                n.push({ event: "stop", offset: i, node: a }));
        return i;
      })(e, 0),
      n
    );
  }
  function c(e, r, i) {
    function a() {
      return e.length && r.length
        ? e[0].offset !== r[0].offset
          ? e[0].offset < r[0].offset
            ? e
            : r
          : "start" === r[0].event
          ? e
          : r
        : e.length
        ? e
        : r;
    }
    function o(e) {
      function r(e) {
        return " " + e.nodeName + '="' + n(e.value) + '"';
      }
      l += "<" + t(e) + w.map.call(e.attributes, r).join("") + ">";
    }
    function u(e) {
      l += "</" + t(e) + ">";
    }
    function c(e) {
      ("start" === e.event ? o : u)(e.node);
    }
    for (var s = 0, l = "", f = []; e.length || r.length; ) {
      var g = a();
      if (((l += n(i.substring(s, g[0].offset))), (s = g[0].offset), g === e)) {
        f.reverse().forEach(u);
        do c(g.splice(0, 1)[0]), (g = a());
        while (g === e && g.length && g[0].offset === s);
        f.reverse().forEach(o);
      } else
        "start" === g[0].event ? f.push(g[0].node) : f.pop(),
          c(g.splice(0, 1)[0]);
    }
    return l + n(i.substr(s));
  }
  function s(e) {
    function n(e) {
      return (e && e.source) || e;
    }
    function t(t, r) {
      return new RegExp(n(t), "m" + (e.cI ? "i" : "") + (r ? "g" : ""));
    }
    function r(i, a) {
      if (!i.compiled) {
        if (((i.compiled = !0), (i.k = i.k || i.bK), i.k)) {
          var u = {},
            c = function (n, t) {
              e.cI && (t = t.toLowerCase()),
                t.split(" ").forEach(function (e) {
                  var t = e.split("|");
                  u[t[0]] = [n, t[1] ? Number(t[1]) : 1];
                });
            };
          "string" == typeof i.k
            ? c("keyword", i.k)
            : E(i.k).forEach(function (e) {
                c(e, i.k[e]);
              }),
            (i.k = u);
        }
        (i.lR = t(i.l || /\w+/, !0)),
          a &&
            (i.bK && (i.b = "\\b(" + i.bK.split(" ").join("|") + ")\\b"),
            i.b || (i.b = /\B|\b/),
            (i.bR = t(i.b)),
            i.e || i.eW || (i.e = /\B|\b/),
            i.e && (i.eR = t(i.e)),
            (i.tE = n(i.e) || ""),
            i.eW && a.tE && (i.tE += (i.e ? "|" : "") + a.tE)),
          i.i && (i.iR = t(i.i)),
          null == i.r && (i.r = 1),
          i.c || (i.c = []);
        var s = [];
        i.c.forEach(function (e) {
          e.v
            ? e.v.forEach(function (n) {
                s.push(o(e, n));
              })
            : s.push("self" === e ? i : e);
        }),
          (i.c = s),
          i.c.forEach(function (e) {
            r(e, i);
          }),
          i.starts && r(i.starts, a);
        var l = i.c
          .map(function (e) {
            return e.bK ? "\\.?(" + e.b + ")\\.?" : e.b;
          })
          .concat([i.tE, i.i])
          .map(n)
          .filter(Boolean);
        i.t = l.length
          ? t(l.join("|"), !0)
          : {
              exec: function () {
                return null;
              },
            };
      }
    }
    r(e);
  }
  function l(e, t, i, a) {
    function o(e, n) {
      var t, i;
      for (t = 0, i = n.c.length; i > t; t++)
        if (r(n.c[t].bR, e)) return n.c[t];
    }
    function u(e, n) {
      if (r(e.eR, n)) {
        for (; e.endsParent && e.parent; ) e = e.parent;
        return e;
      }
      return e.eW ? u(e.parent, n) : void 0;
    }
    function c(e, n) {
      return !i && r(n.iR, e);
    }
    function g(e, n) {
      var t = N.cI ? n[0].toLowerCase() : n[0];
      return e.k.hasOwnProperty(t) && e.k[t];
    }
    function h(e, n, t, r) {
      var i = r ? "" : y.classPrefix,
        a = '<span class="' + i,
        o = t ? "" : C;
      return (a += e + '">'), a + n + o;
    }
    function p() {
      var e, t, r, i;
      if (!E.k) return n(B);
      for (i = "", t = 0, E.lR.lastIndex = 0, r = E.lR.exec(B); r; )
        (i += n(B.substring(t, r.index))),
          (e = g(E, r)),
          e ? ((M += e[1]), (i += h(e[0], n(r[0])))) : (i += n(r[0])),
          (t = E.lR.lastIndex),
          (r = E.lR.exec(B));
      return i + n(B.substr(t));
    }
    function d() {
      var e = "string" == typeof E.sL;
      if (e && !x[E.sL]) return n(B);
      var t = e ? l(E.sL, B, !0, L[E.sL]) : f(B, E.sL.length ? E.sL : void 0);
      return (
        E.r > 0 && (M += t.r),
        e && (L[E.sL] = t.top),
        h(t.language, t.value, !1, !0)
      );
    }
    function b() {
      (k += null != E.sL ? d() : p()), (B = "");
    }
    function v(e) {
      (k += e.cN ? h(e.cN, "", !0) : ""),
        (E = Object.create(e, { parent: { value: E } }));
    }
    function m(e, n) {
      if (((B += e), null == n)) return b(), 0;
      var t = o(n, E);
      if (t)
        return (
          t.skip ? (B += n) : (t.eB && (B += n), b(), t.rB || t.eB || (B = n)),
          v(t, n),
          t.rB ? 0 : n.length
        );
      var r = u(E, n);
      if (r) {
        var i = E;
        i.skip ? (B += n) : (i.rE || i.eE || (B += n), b(), i.eE && (B = n));
        do E.cN && (k += C), E.skip || (M += E.r), (E = E.parent);
        while (E !== r.parent);
        return r.starts && v(r.starts, ""), i.rE ? 0 : n.length;
      }
      if (c(n, E))
        throw new Error(
          'Illegal lexeme "' + n + '" for mode "' + (E.cN || "<unnamed>") + '"'
        );
      return (B += n), n.length || 1;
    }
    var N = R(e);
    if (!N) throw new Error('Unknown language: "' + e + '"');
    s(N);
    var w,
      E = a || N,
      L = {},
      k = "";
    for (w = E; w !== N; w = w.parent) w.cN && (k = h(w.cN, "", !0) + k);
    var B = "",
      M = 0;
    try {
      for (var I, j, O = 0; ; ) {
        if (((E.t.lastIndex = O), (I = E.t.exec(t)), !I)) break;
        (j = m(t.substring(O, I.index), I[0])), (O = I.index + j);
      }
      for (m(t.substr(O)), w = E; w.parent; w = w.parent) w.cN && (k += C);
      return { r: M, value: k, language: e, top: E };
    } catch (T) {
      if (T.message && -1 !== T.message.indexOf("Illegal"))
        return { r: 0, value: n(t) };
      throw T;
    }
  }
  function f(e, t) {
    t = t || y.languages || E(x);
    var r = { r: 0, value: n(e) },
      i = r;
    return (
      t.filter(R).forEach(function (n) {
        var t = l(n, e, !1);
        (t.language = n), t.r > i.r && (i = t), t.r > r.r && ((i = r), (r = t));
      }),
      i.language && (r.second_best = i),
      r
    );
  }
  function g(e) {
    return y.tabReplace || y.useBR
      ? e.replace(M, function (e, n) {
          return y.useBR && "\n" === e
            ? "<br>"
            : y.tabReplace
            ? n.replace(/\t/g, y.tabReplace)
            : void 0;
        })
      : e;
  }
  function h(e, n, t) {
    var r = n ? L[n] : t,
      i = [e.trim()];
    return (
      e.match(/\bhljs\b/) || i.push("hljs"),
      -1 === e.indexOf(r) && i.push(r),
      i.join(" ").trim()
    );
  }
  function p(e) {
    var n,
      t,
      r,
      o,
      s,
      p = a(e);
    i(p) ||
      (y.useBR
        ? ((n = document.createElementNS(
            "http://www.w3.org/1999/xhtml",
            "div"
          )),
          (n.innerHTML = e.innerHTML
            .replace(/\n/g, "")
            .replace(/<br[ \/]*>/g, "\n")))
        : (n = e),
      (s = n.textContent),
      (r = p ? l(p, s, !0) : f(s)),
      (t = u(n)),
      t.length &&
        ((o = document.createElementNS("http://www.w3.org/1999/xhtml", "div")),
        (o.innerHTML = r.value),
        (r.value = c(t, u(o), s))),
      (r.value = g(r.value)),
      (e.innerHTML = r.value),
      (e.className = h(e.className, p, r.language)),
      (e.result = { language: r.language, re: r.r }),
      r.second_best &&
        (e.second_best = {
          language: r.second_best.language,
          re: r.second_best.r,
        }));
  }
  function d(e) {
    y = o(y, e);
  }
  function b() {
    if (!b.called) {
      b.called = !0;
      var e = document.querySelectorAll("pre code");
      w.forEach.call(e, p);
    }
  }
  function v() {
    addEventListener("DOMContentLoaded", b, !1),
      addEventListener("load", b, !1);
  }
  function m(n, t) {
    var r = (x[n] = t(e));
    r.aliases &&
      r.aliases.forEach(function (e) {
        L[e] = n;
      });
  }
  function N() {
    return E(x);
  }
  function R(e) {
    return (e = (e || "").toLowerCase()), x[e] || x[L[e]];
  }
  var w = [],
    E = Object.keys,
    x = {},
    L = {},
    k = /^(no-?highlight|plain|text)$/i,
    B = /\blang(?:uage)?-([\w-]+)\b/i,
    M = /((^(<[^>]+>|\t|)+|(?:\n)))/gm,
    C = "</span>",
    y = {
      classPrefix: "hljs-",
      tabReplace: null,
      useBR: !1,
      languages: void 0,
    },
    I = { "&": "&amp;", "<": "&lt;", ">": "&gt;" };
  return (
    (e.highlight = l),
    (e.highlightAuto = f),
    (e.fixMarkup = g),
    (e.highlightBlock = p),
    (e.configure = d),
    (e.initHighlighting = b),
    (e.initHighlightingOnLoad = v),
    (e.registerLanguage = m),
    (e.listLanguages = N),
    (e.getLanguage = R),
    (e.inherit = o),
    (e.IR = "[a-zA-Z]\\w*"),
    (e.UIR = "[a-zA-Z_]\\w*"),
    (e.NR = "\\b\\d+(\\.\\d+)?"),
    (e.CNR =
      "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)"),
    (e.BNR = "\\b(0b[01]+)"),
    (e.RSR =
      "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~"),
    (e.BE = { b: "\\\\[\\s\\S]", r: 0 }),
    (e.ASM = { cN: "string", b: "'", e: "'", i: "\\n", c: [e.BE] }),
    (e.QSM = { cN: "string", b: '"', e: '"', i: "\\n", c: [e.BE] }),
    (e.PWM = {
      b: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/,
    }),
    (e.C = function (n, t, r) {
      var i = e.inherit({ cN: "comment", b: n, e: t, c: [] }, r || {});
      return (
        i.c.push(e.PWM),
        i.c.push({ cN: "doctag", b: "(?:TODO|FIXME|NOTE|BUG|XXX):", r: 0 }),
        i
      );
    }),
    (e.CLCM = e.C("//", "$")),
    (e.CBCM = e.C("/\\*", "\\*/")),
    (e.HCM = e.C("#", "$")),
    (e.NM = { cN: "number", b: e.NR, r: 0 }),
    (e.CNM = { cN: "number", b: e.CNR, r: 0 }),
    (e.BNM = { cN: "number", b: e.BNR, r: 0 }),
    (e.CSSNM = {
      cN: "number",
      b:
        e.NR +
        "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
      r: 0,
    }),
    (e.RM = {
      cN: "regexp",
      b: /\//,
      e: /\/[gimuy]*/,
      i: /\n/,
      c: [e.BE, { b: /\[/, e: /\]/, r: 0, c: [e.BE] }],
    }),
    (e.TM = { cN: "title", b: e.IR, r: 0 }),
    (e.UTM = { cN: "title", b: e.UIR, r: 0 }),
    (e.METHOD_GUARD = { b: "\\.\\s*" + e.UIR, r: 0 }),
    e
  );
});
hljs.registerLanguage("xml", function (s) {
  var e = "[A-Za-z0-9\\._:-]+",
    t = {
      eW: !0,
      i: /</,
      r: 0,
      c: [
        { cN: "attr", b: e, r: 0 },
        {
          b: /=\s*/,
          r: 0,
          c: [
            {
              cN: "string",
              endsParent: !0,
              v: [
                { b: /"/, e: /"/ },
                { b: /'/, e: /'/ },
                { b: /[^\s"'=<>`]+/ },
              ],
            },
          ],
        },
      ],
    };
  return {
    aliases: ["html", "xhtml", "rss", "atom", "xjb", "xsd", "xsl", "plist"],
    cI: !0,
    c: [
      {
        cN: "meta",
        b: "<!DOCTYPE",
        e: ">",
        r: 10,
        c: [{ b: "\\[", e: "\\]" }],
      },
      s.C("<!--", "-->", { r: 10 }),
      { b: "<\\!\\[CDATA\\[", e: "\\]\\]>", r: 10 },
      {
        b: /<\?(php)?/,
        e: /\?>/,
        sL: "php",
        c: [{ b: "/\\*", e: "\\*/", skip: !0 }],
      },
      {
        cN: "tag",
        b: "<style(?=\\s|>|$)",
        e: ">",
        k: { name: "style" },
        c: [t],
        starts: { e: "</style>", rE: !0, sL: ["css", "xml"] },
      },
      {
        cN: "tag",
        b: "<script(?=\\s|>|$)",
        e: ">",
        k: { name: "script" },
        c: [t],
        starts: {
          e: "</script>",
          rE: !0,
          sL: ["actionscript", "javascript", "handlebars", "xml"],
        },
      },
      {
        cN: "meta",
        v: [
          { b: /<\?xml/, e: /\?>/, r: 10 },
          { b: /<\?\w+/, e: /\?>/ },
        ],
      },
      {
        cN: "tag",
        b: "</?",
        e: "/?>",
        c: [{ cN: "name", b: /[^\/><\s]+/, r: 0 }, t],
      },
    ],
  };
});
hljs.registerLanguage("javascript", function (e) {
  var r = "[A-Za-z$_][0-9A-Za-z$_]*",
    t = {
      keyword:
        "in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",
      literal: "true false null undefined NaN Infinity",
      built_in:
        "eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise",
    },
    a = {
      cN: "number",
      v: [{ b: "\\b(0[bB][01]+)" }, { b: "\\b(0[oO][0-7]+)" }, { b: e.CNR }],
      r: 0,
    },
    n = { cN: "subst", b: "\\$\\{", e: "\\}", k: t, c: [] },
    c = { cN: "string", b: "`", e: "`", c: [e.BE, n] };
  n.c = [e.ASM, e.QSM, c, a, e.RM];
  var s = n.c.concat([e.CBCM, e.CLCM]);
  return {
    aliases: ["js", "jsx"],
    k: t,
    c: [
      { cN: "meta", r: 10, b: /^\s*['"]use (strict|asm)['"]/ },
      { cN: "meta", b: /^#!/, e: /$/ },
      e.ASM,
      e.QSM,
      c,
      e.CLCM,
      e.CBCM,
      a,
      {
        b: /[{,]\s*/,
        r: 0,
        c: [{ b: r + "\\s*:", rB: !0, r: 0, c: [{ cN: "attr", b: r, r: 0 }] }],
      },
      {
        b: "(" + e.RSR + "|\\b(case|return|throw)\\b)\\s*",
        k: "return throw case",
        c: [
          e.CLCM,
          e.CBCM,
          e.RM,
          {
            cN: "function",
            b: "(\\(.*?\\)|" + r + ")\\s*=>",
            rB: !0,
            e: "\\s*=>",
            c: [
              {
                cN: "params",
                v: [
                  { b: r },
                  { b: /\(\s*\)/ },
                  { b: /\(/, e: /\)/, eB: !0, eE: !0, k: t, c: s },
                ],
              },
            ],
          },
          {
            b: /</,
            e: /(\/\w+|\w+\/)>/,
            sL: "xml",
            c: [
              { b: /<\w+\s*\/>/, skip: !0 },
              {
                b: /<\w+/,
                e: /(\/\w+|\w+\/)>/,
                skip: !0,
                c: [{ b: /<\w+\s*\/>/, skip: !0 }, "self"],
              },
            ],
          },
        ],
        r: 0,
      },
      {
        cN: "function",
        bK: "function",
        e: /\{/,
        eE: !0,
        c: [
          e.inherit(e.TM, { b: r }),
          { cN: "params", b: /\(/, e: /\)/, eB: !0, eE: !0, c: s },
        ],
        i: /\[|%/,
      },
      { b: /\$[(.]/ },
      e.METHOD_GUARD,
      {
        cN: "class",
        bK: "class",
        e: /[{;=]/,
        eE: !0,
        i: /[:"\[\]]/,
        c: [{ bK: "extends" }, e.UTM],
      },
      { bK: "constructor", e: /\{/, eE: !0 },
    ],
    i: /#(?!!)/,
  };
});
