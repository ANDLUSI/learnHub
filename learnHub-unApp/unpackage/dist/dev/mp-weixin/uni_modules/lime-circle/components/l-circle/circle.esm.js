"use strict";
function t(t2, e2) {
  if (!(t2 instanceof e2))
    throw new TypeError("Cannot call a class as a function");
}
function e(t2, e2) {
  for (var i2 = 0; e2.length > i2; i2++) {
    var n2 = e2[i2];
    n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t2, n2.key, n2);
  }
}
function i(t2, i2, n2) {
  return i2 && e(t2.prototype, i2), n2 && e(t2, n2), Object.defineProperty(t2, "prototype", { writable: false }), t2;
}
function n(t2, e2) {
  return function(t3) {
    if (Array.isArray(t3))
      return t3;
  }(t2) || function(t3, e3) {
    var i2 = null == t3 ? null : "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
    if (null == i2)
      return;
    var n2, r2, a2 = [], o2 = true, s2 = false;
    try {
      for (i2 = i2.call(t3); !(o2 = (n2 = i2.next()).done) && (a2.push(n2.value), !e3 || a2.length !== e3); o2 = true)
        ;
    } catch (t4) {
      s2 = true, r2 = t4;
    } finally {
      try {
        o2 || null == i2.return || i2.return();
      } finally {
        if (s2)
          throw r2;
      }
    }
    return a2;
  }(t2, e2) || r(t2, e2) || function() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }();
}
function r(t2, e2) {
  if (t2) {
    if ("string" == typeof t2)
      return a(t2, e2);
    var i2 = Object.prototype.toString.call(t2).slice(8, -1);
    return "Object" === i2 && t2.constructor && (i2 = t2.constructor.name), "Map" === i2 || "Set" === i2 ? Array.from(t2) : "Arguments" === i2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i2) ? a(t2, e2) : void 0;
  }
}
function a(t2, e2) {
  (null == e2 || e2 > t2.length) && (e2 = t2.length);
  for (var i2 = 0, n2 = Array(e2); e2 > i2; i2++)
    n2[i2] = t2[i2];
  return n2;
}
var o = function(t2) {
  return /^#.{3,6}$/.test(t2) ? 4 === t2.length ? t2.substring(1).split("").map(function(t3) {
    return 17 * parseInt(t3, 16);
  }) : [t2.substring(1, 3), t2.substring(3, 5), t2.substring(5, 7)].map(function(t3) {
    return parseInt(t3, 16);
  }) : (console.error("lime-circle: 渐变仅支持hex值"), [0, 0, 0]);
}, s = function(t2) {
  return 1 === t2.length ? "0" + t2 : t2;
}, u = function(t2, e2, i2) {
  var n2, r2, a2, u2, h2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1, c2 = [], l2 = [], f2 = function(t3) {
    return Math.pow(t3 / 255, h2);
  };
  for (t2 = o(t2).map(f2), e2 = o(e2).map(f2), n2 = 0; i2 > n2; n2++) {
    for (u2 = 1 - (a2 = n2 / (i2 - 1)), r2 = 0; 3 > r2; r2++)
      l2[r2] = s(Math.round(255 * Math.pow(t2[r2] * u2 + e2[r2] * a2, 1 / h2)).toString(16));
    c2.push("#" + l2.join(""));
  }
  return c2;
};
var h = function(t2, e2, i2, n2) {
  var r2 = 1e-6, a2 = 3 * t2 - 3 * i2 + 1, o2 = 3 * i2 - 6 * t2, s2 = 3 * t2, u2 = 3 * e2 - 3 * n2 + 1, h2 = 3 * n2 - 6 * e2, c2 = 3 * e2;
  function l2(t3) {
    return ((a2 * t3 + o2) * t3 + s2) * t3;
  }
  return function(t3) {
    return e3 = function(t4) {
      for (var e4, i3, n3, u3 = t4, h3 = 0; 8 > h3; h3++) {
        if (i3 = l2(u3) - t4, r2 > Math.abs(i3))
          return u3;
        if (r2 > Math.abs(e4 = (3 * a2 * (n3 = u3) + 2 * o2) * n3 + s2))
          break;
        u3 -= i3 / e4;
      }
      var c3 = 1, f2 = 0;
      for (u3 = t4; c3 > f2; ) {
        if (i3 = l2(u3) - t4, r2 > Math.abs(i3))
          return u3;
        i3 > 0 ? c3 = u3 : f2 = u3, u3 = (c3 + f2) / 2;
      }
      return u3;
    }(t3), ((u2 * e3 + h2) * e3 + c2) * e3;
    var e3;
  };
}(0.25, 0.1, 0.25, 1), c = Symbol("tick"), l = Symbol("tick-handler"), f = Symbol("animations"), d = Symbol("start-times"), v = Symbol("pause-start"), m = Symbol("pause-time"), y = "undefined" != typeof requestAnimationFrame ? requestAnimationFrame : function(t2) {
  return setTimeout(t2, 1e3 / 60);
}, g = "undefined" != typeof cancelAnimationFrame ? cancelAnimationFrame : function(t2) {
  clearTimeout(t2);
}, p = function() {
  function e2() {
    t(this, e2), this.state = void 0, this.state = "Initiated", this[f] = /* @__PURE__ */ new Set(), this[d] = /* @__PURE__ */ new Map();
  }
  return i(e2, [{ key: "start", value: function() {
    var t2 = this;
    if ("Initiated" === this.state) {
      this.state = "Started";
      var e3 = Date.now();
      this[m] = 0, this[c] = function() {
        var i2, n2 = Date.now(), a2 = function(t3, e4) {
          var i3 = "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
          if (!i3) {
            if (Array.isArray(t3) || (i3 = r(t3)) || e4 && t3 && "number" == typeof t3.length) {
              i3 && (t3 = i3);
              var n3 = 0, a3 = function() {
              };
              return { s: a3, n: function() {
                return t3.length > n3 ? { done: false, value: t3[n3++] } : { done: true };
              }, e: function(t4) {
                throw t4;
              }, f: a3 };
            }
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
          }
          var o3, s3 = true, u2 = false;
          return { s: function() {
            i3 = i3.call(t3);
          }, n: function() {
            var t4 = i3.next();
            return s3 = t4.done, t4;
          }, e: function(t4) {
            u2 = true, o3 = t4;
          }, f: function() {
            try {
              s3 || null == i3.return || i3.return();
            } finally {
              if (u2)
                throw o3;
            }
          } };
        }(t2[f]);
        try {
          for (a2.s(); !(i2 = a2.n()).done; ) {
            var o2 = i2.value, s2 = void 0;
            (s2 = t2[d].get(o2) < e3 ? n2 - e3 - o2.delay - t2[m] : n2 - t2[d].get(o2) - o2.delay - t2[m]) > o2.duration && (t2[f].delete(o2), s2 = o2.duration), s2 > 0 && o2.run(s2);
          }
        } catch (t3) {
          a2.e(t3);
        } finally {
          a2.f();
        }
        t2[l] = y(t2[c]);
      }, this[c]();
    }
  } }, { key: "pause", value: function() {
    "Started" === this.state && (this.state = "Paused", this[v] = Date.now(), g(this[l]));
  } }, { key: "resume", value: function() {
    "Paused" === this.state && (this.state = "Started", this[m] += Date.now() - this[v], this[c]());
  } }, { key: "reset", value: function() {
    this.pause(), this.state = "Initiated", this[m] = 0, this[v] = 0, this[f] = /* @__PURE__ */ new Set(), this[d] = /* @__PURE__ */ new Map(), this[l] = null;
  } }, { key: "add", value: function(t2, e3) {
    2 > arguments.length && (e3 = Date.now()), this[f].add(t2), this[d].set(t2, e3);
  } }]), e2;
}(), w = function() {
  function e2(i2, n2, r2, a2, o2, s2) {
    t(this, e2), this.startValue = void 0, this.endValue = void 0, this.duration = void 0, this.timingFunction = void 0, this.delay = void 0, this.template = void 0, o2 = o2 || function(t2) {
      return t2;
    }, s2 = s2 || function(t2) {
      return t2;
    }, this.startValue = i2, this.endValue = n2, this.duration = r2, this.timingFunction = o2, this.delay = a2, this.template = s2;
  }
  return i(e2, [{ key: "run", value: function(t2) {
    var e3 = this.endValue - this.startValue, i2 = this.timingFunction(t2 / this.duration);
    this.template(this.startValue + e3 * i2);
  } }]), e2;
}(), b = Math.PI / 180, A = function() {
  function e2(i2, n2) {
    t(this, e2), this.canvas = void 0, this.context = void 0, this.current = 0, this.size = 0, this.pixelRatio = 1, this._isConicGradient = false, this._attrs = { percent: 0, size: 120, lineCap: "round", strokeWidth: 6, strokeColor: "#2db7f5", trailWidth: 6, trailColor: "#ddd", dashboard: false, clockwise: true, duration: 300, max: 100, beforeAnimate: true, animate: true, formatter: "{d}{d}.{d}{d}%", fontSize: "16px", showText: false, gapDegree: 90, gapPosition: "bottom" }, this._timer = void 0, this.startTime = 0, this.target = 0, this._colors = [], this._gradientColors = [], this._rAF = function(t2) {
    }, this._cAf = function(t2) {
    }, this.timeline = void 0, this.run = void 0, this.canvas = i2, this.run = n2.run, this.size = n2.size || 120, this.pixelRatio = n2.pixelRatio || 1, this.init(), this.initRaf(), this.timeline = new p();
  }
  return i(e2, [{ key: "init", value: function() {
    var t2 = this.size, e3 = this.pixelRatio;
    if (this.canvas) {
      this.canvas.width = t2 * e3, this.canvas.height = t2 * e3;
      var i2 = this.canvas.getContext("2d");
      this._isConicGradient = !!i2.createConicGradient, this.context = i2;
    }
  } }, { key: "initRaf", value: function() {
    var t2 = this.canvas;
    "undefined" != typeof window ? (this._rAF = window.requestAnimationFrame || function(t3) {
      return window.setTimeout(t3, 1e3 / 60);
    }, this._cAf = window.cancelAnimationFrame || function(t3) {
      window.clearTimeout(t3);
    }) : t2 && t2.requestAnimationFrame ? (this._rAF = t2.requestAnimationFrame, this._cAf = t2.cancelAnimationFrame) : (this._rAF = function(t3) {
      return setTimeout(t3, 16.7);
    }, this._cAf = function(t3) {
      clearTimeout(t3);
    });
  } }, { key: "setOption", value: function(t2) {
    Object.assign(this._attrs, t2);
  } }, { key: "set", value: function(t2, e3) {
    this._attrs[t2] = e3;
  } }, { key: "get", value: function(t2) {
    return this._attrs[t2] || this.canvas[t2];
  } }, { key: "play", value: function() {
    var t2 = this, e3 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.get("percent");
    this.target = Math.max(Math.min(e3, this.get("max") || 100), 0), this.createConicGradient(), this.timeline.start(), this.timeline.add(new w(this.current, e3, this.get("duration"), 0, h, function(e4) {
      t2.current = 1e-4 > e4 ? 0 : e4, t2.render(t2.current), t2.run(t2.current);
    }));
  } }, { key: "createConicGradient", value: function() {
    if (!this._isConicGradient) {
      var t2 = this._attrs.strokeColor;
      if ("string" != typeof t2 && this._colors != t2 && Array.isArray(t2)) {
        var e3 = n(this.getDeg(), 2), i2 = e3[0], r2 = e3[1];
        this._colors = t2, this._gradientColors = [];
        for (var a2 = r2 - i2, o2 = t2.length - 1, s2 = Math.floor(a2 / o2), h2 = 0; o2 > h2; h2++) {
          a2 -= s2, this._gradientColors = this._gradientColors.concat(u(t2[h2], t2[h2 + 1], h2 + 1 === o2 ? s2 + a2 : s2, 1));
        }
      }
    }
  } }, { key: "render", value: function() {
    var t2 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e3 = this.context, i2 = this.size, n2 = this.pixelRatio, r2 = this.getSalce(), a2 = i2 / 2;
    e3.setTransform(1, 0, 0, 1, 0, 0), e3.clearRect(2 * -a2, 2 * -a2, 4 * i2, 4 * i2), e3.setTransform(r2 * n2, 0, 0, n2, a2 * n2, a2 * n2), this.drawTrail(a2), this.drawStroke(a2, t2), e3.draw && e3.draw();
  } }, { key: "drawArc", value: function(t2, e3, i2, n2, r2) {
    var a2 = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : this._attrs.lineCap, o2 = this.context;
    o2.beginPath(), o2.lineCap = a2, o2.strokeStyle = e3, o2.lineWidth = i2, o2.arc(0, 0, t2, n2, r2), o2.stroke();
  } }, { key: "getSalce", value: function() {
    return this.get("clockwise") ? 1 : -1;
  } }, { key: "getDeg", value: function() {
    var t2 = this._attrs, e3 = t2.gapDegree;
    t2.dashboard || (e3 = 0);
    var i2 = (0 === e3 ? 0 : { bottom: 0, top: 180, left: 90, right: -90 }[t2.gapPosition]) + (e3 > 0 ? 90 + e3 / 2 : -90) + 0;
    return [i2, i2 + 360 * ((360 - e3) / 360)];
  } }, { key: "drawTrail", value: function(t2) {
    var e3 = this._attrs, i2 = e3.trailWidth, r2 = e3.trailColor, a2 = t2 - i2 / 2, o2 = n(this.getDeg(), 2);
    this.drawArc(a2, r2, i2, o2[0] * b, o2[1] * b);
  } }, { key: "drawStroke", value: function(t2) {
    var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    if (e3) {
      var i2 = this._attrs, r2 = i2.strokeWidth, a2 = i2.strokeColor, o2 = i2.max, s2 = i2.dashboard, u2 = i2.lineCap, h2 = this.getDeg(), c2 = n(h2, 2), l2 = c2[0], f2 = c2[1], d2 = t2 - r2 / 2, v2 = Math.round((f2 - l2) / o2 * e3);
      if ("string" == typeof a2 || this._isConicGradient)
        if (Array.isArray(a2) && this._isConicGradient) {
          var m2 = this.context, y2 = m2.createConicGradient(l2, 0, 0);
          a2.forEach(function(t3, e4) {
            y2.addColorStop(e4 / (a2.length - 1), t3);
          }), this.drawArc(d2, y2, r2, l2 * b, (v2 + l2) * b);
        } else
          this.drawArc(d2, a2, r2, l2 * b, (v2 + l2) * b);
      else
        for (var g2 = 0; v2 > g2; g2++)
          this.drawArc(d2, this._gradientColors[g2], r2, (g2 + l2) * b, (g2 + 1 + l2) * b, s2 || f2 != v2 + l2 ? u2 : "butt");
    }
  } }]), e2;
}();
exports.A = A;
