"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_limeCircle_components_lCircle_props = require("./props.js");
const uni_modules_limeCircle_components_lCircle_getCanvas = require("./getCanvas.js");
const uni_modules_limeCircle_components_lCircle_circle_esm = require("./circle.esm.js");
const uni_modules_limeShared_animation_useTransition = require("../../../lime-shared/animation/useTransition.js");
const uni_modules_limeShared_addUnit_index = require("../../../lime-shared/addUnit/index.js");
const uni_modules_limeShared_unitConvert_index = require("../../../lime-shared/unitConvert/index.js");
const uni_modules_limeShared_getRect_vue = require("../../../lime-shared/getRect/vue.js");
const uni_modules_limeCircle_components_lCircle_utils = require("./utils.js");
const _sfc_main = common_vendor.defineComponent({
  name: "l-circle",
  props: uni_modules_limeCircle_components_lCircle_props.CircleProps,
  emits: ["update:current"],
  setup(props, { emit }) {
    const context = common_vendor.getCurrentInstance().proxy;
    const useCanvas = common_vendor.ref(props.canvas);
    const canvasId = `l-circle-${context.uid}`;
    let circleCanvas = null;
    const percent = common_vendor.ref(0);
    const offsetTop = common_vendor.ref(0);
    const current = uni_modules_limeShared_animation_useTransition.useTransition(percent, {
      duration: props.duration
    });
    const styles = common_vendor.computed(() => ({
      width: uni_modules_limeShared_addUnit_index.addUnit(props.size),
      height: uni_modules_limeShared_addUnit_index.addUnit(props.size),
      "--l-circle-offset-top": !useCanvas.value && offsetTop.value
      // '--l-circle-percent': `${Math.min(props.percent, props.max) * ratio.value}%`,
      // '--l-circle-percent2': `${Math.min(props.percent, props.max) * ratio.value / 100}`,
    }));
    const classes = common_vendor.computed(() => {
      const { clockwise, lineCap } = props;
      return lineCap ? `is-${lineCap} ` : " " + !clockwise && !useCanvas.value && `clockwise`;
    });
    const widths = common_vendor.computed(() => {
      return [
        uni_modules_limeShared_unitConvert_index.unitConvert(props.trailWidth),
        uni_modules_limeShared_unitConvert_index.unitConvert(props.strokeWidth)
      ];
    });
    const trailStyles = common_vendor.computed(() => {
      const { size, trailColor, dashboard, gapDegree, gapPosition } = props;
      return uni_modules_limeCircle_components_lCircle_utils.getCircleStyle("trail", size, 1, dashboard ? gapDegree : 0, gapPosition, trailColor, widths.value[0]);
    });
    const strokeStyles = common_vendor.computed(() => {
      const { size, strokeColor, dashboard, max, gapDegree, gapPosition } = props;
      return uni_modules_limeCircle_components_lCircle_utils.getCircleStyle("stroke", size, Math.min(current.value / props.max, 1), dashboard ? gapDegree : 0, gapPosition, strokeColor, widths.value[1]);
    });
    const stopPercent = common_vendor.watch(() => props.percent, (v) => {
      percent.value = Math.min(v, props.max);
      circleCanvas && circleCanvas.play(v);
    });
    const stopCurrent = common_vendor.watch(current, (v) => {
      emit("update:current", v.toFixed(2));
    });
    const getProps = () => {
      return Object.assign({}, props, { trailWidth: widths.value[0], strokeWidth: widths.value[1] });
    };
    common_vendor.onMounted(() => {
      uni_modules_limeShared_getRect_vue.getRect(".check", context).then((res) => {
        useCanvas.value = !(res.height > 0 && !props.canvas);
        if (useCanvas.value) {
          setTimeout(() => {
            uni_modules_limeCircle_components_lCircle_getCanvas.getCanvas(canvasId, { context }).then((res2) => {
              circleCanvas = new uni_modules_limeCircle_components_lCircle_circle_esm.A(res2, {
                size: uni_modules_limeShared_unitConvert_index.unitConvert(props.size),
                run: (v) => current.value = v,
                pixelRatio: uni_modules_limeCircle_components_lCircle_getCanvas.isCanvas2d ? common_vendor.index.getSystemInfoSync().pixelRatio : 1
              });
              circleCanvas.setOption(getProps());
              circleCanvas.play(props.percent);
            });
          }, 50);
        }
        percent.value = props.percent;
      });
    });
    common_vendor.onUnmounted(() => {
      stopPercent();
      stopCurrent();
    });
    return {
      useCanvas,
      canvasId,
      classes,
      styles,
      trailStyles,
      strokeStyles,
      current
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !_ctx.useCanvas
  }, !_ctx.useCanvas ? {
    b: common_vendor.s(_ctx.trailStyles)
  } : {}, {
    c: !_ctx.useCanvas
  }, !_ctx.useCanvas ? common_vendor.e({
    d: _ctx.current
  }, _ctx.current ? {} : {}, {
    e: _ctx.current
  }, _ctx.current ? {} : {}, {
    f: common_vendor.s(_ctx.strokeStyles)
  }) : {}, {
    g: _ctx.useCanvas
  }, _ctx.useCanvas ? {
    h: _ctx.canvasId,
    i: _ctx.canvasId
  } : {}, {
    j: common_vendor.n({
      clockwise: !_ctx.clockwise && !_ctx.useCanvas
    }),
    k: common_vendor.n(["is-" + _ctx.lineCap]),
    l: common_vendor.s(_ctx.styles)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
