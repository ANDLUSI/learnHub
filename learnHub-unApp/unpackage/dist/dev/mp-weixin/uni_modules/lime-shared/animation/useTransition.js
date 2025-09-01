"use strict";
const uni_modules_limeShared_animation_ease = require("./ease.js");
const uni_modules_limeShared_animation_vue = require("./vue.js");
const common_vendor = require("../../../common/vendor.js");
function useTransition(percent, options) {
  const current = common_vendor.ref(0);
  const { immediate, duration = 300 } = options;
  let tl = null;
  let timer = -1;
  const isFunction = typeof percent === "function";
  common_vendor.watch(isFunction ? percent : () => percent.value, (v) => {
    if (tl == null) {
      tl = new uni_modules_limeShared_animation_vue.Timeline();
    }
    tl.start();
    tl.add(
      new uni_modules_limeShared_animation_vue.Animation(
        current.value,
        v,
        duration,
        0,
        uni_modules_limeShared_animation_ease.ease,
        (nowValue) => {
          current.value = nowValue;
          clearTimeout(timer);
          if (current.value == v) {
            timer = setTimeout(() => {
              tl == null ? void 0 : tl.pause();
              tl = null;
            }, duration);
          }
        }
      )
    );
  }, { immediate });
  return current;
}
exports.useTransition = useTransition;
