"use strict";
const uni_modules_limeShared_unitConvert_index = require("../../../lime-shared/unitConvert/index.js");
const uni_modules_limeShared_isString_index = require("../../../lime-shared/isString/index.js");
function getCircle(size, lineWidth) {
  const s = uni_modules_limeShared_unitConvert_index.unitConvert(size);
  const w = uni_modules_limeShared_unitConvert_index.unitConvert(lineWidth);
  const c = (s - w) / 2;
  const r = s / 2 - w;
  return {
    s,
    w,
    c,
    r
  };
}
function getMaskStyle(radius = 0) {
  return `radial-gradient(transparent ${radius - 0.5}px, #000 ${radius}px)`;
}
function getCircleStyle(name, size, percent, gapDegree, gapPosition, strokeColor, strokeWidth) {
  const positionDeg = gapDegree === 0 ? 0 : {
    bottom: 0,
    top: 180,
    left: 90,
    right: -90
  }[gapPosition];
  const rotateDeg = gapDegree > 0 ? 90 + gapDegree / 2 : -90;
  const offsetDeg = 90;
  const circle = getCircle(size, strokeWidth);
  const perimeter = (360 - gapDegree) / 360 * percent * 100;
  const startDeg = positionDeg + rotateDeg + offsetDeg;
  const mask = getMaskStyle(circle.r);
  let background = "";
  let startColor = "";
  let endColor = "";
  if (uni_modules_limeShared_isString_index.isString(strokeColor)) {
    startColor = strokeColor;
    endColor = strokeColor;
    background = `conic-gradient(from ${startDeg}deg, ${startColor} 0%, ${startColor} ${perimeter}%, transparent ${perimeter}%, transparent 100%)`;
  } else if (Array.isArray(strokeColor)) {
    background = `conic-gradient(from ${startDeg}deg, transparent 0%,`;
    const len = strokeColor.length;
    for (let i = 0; i < len; i++) {
      const color = strokeColor[i];
      if (i === 0) {
        background += `${color} 0%,`;
        startColor = color;
      } else {
        background += `${color} ${perimeter * (i + 1) / len}%,`;
      }
      if (i == len - 1) {
        endColor = color;
      }
    }
    background += `transparent ${perimeter}%, transparent 100%)`;
  }
  return {
    color: startColor,
    [`--l-circle-${name}-cap-start`]: `${startDeg}deg`,
    [`--l-circle-${name}-cap-color-end`]: endColor,
    // [`--l-circle-${name}-cap-end`]: `calc(var(--l-circle-percent2) * ${perimeter} * 360deg + ${startDeg}deg)`,
    [`--l-circle-${name}-cap-end`]: `${perimeter / 100 * 360 + startDeg}deg`,
    [`--l-circle-${name}-cap-size`]: `${strokeWidth / 2}px`,
    mask,
    "-webkit-mask": mask,
    "--l-background": background
  };
}
exports.getCircleStyle = getCircleStyle;
