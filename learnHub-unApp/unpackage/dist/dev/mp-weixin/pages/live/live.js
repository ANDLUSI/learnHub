"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  _easycom_uni_easyinput2();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
if (!Math) {
  _easycom_uni_easyinput();
}
const _sfc_main = {
  __name: "live",
  setup(__props) {
    const videoSrc = common_vendor.ref("");
    const danmuList = common_vendor.ref([
      {
        text: "老师讲得正不错",
        color: "#ff0000",
        time: 1
      },
      {
        text: "太棒了",
        color: "#ff00ff",
        time: 3
      }
    ]);
    const danmuValue = common_vendor.ref("");
    let videoContext = null;
    common_vendor.onMounted(() => {
      videoContext = common_vendor.index.createVideoContext("myVideo");
      const secretKey = "1001";
      updateVideoSrc(secretKey);
      console.log("这是密钥：" + secretKey);
    });
    const updateVideoSrc = (key) => {
      if (typeof key === "string" && key.length > 0) {
        videoSrc.value = `http://192.168.140.116/hls/${encodeURIComponent(key)}/index.m3u8`;
        console.log("videoSrc.value: ", videoSrc.value);
      } else {
        console.error("Invalid or missing secretKey:", key);
        videoSrc.value = `http://192.168.140.116/hls/1001/index.m3u8`;
      }
    };
    common_vendor.watch(videoSrc, (newSrc) => {
      if (videoContext) {
        videoContext.stop();
        videoContext.src = newSrc;
        videoContext.play();
      }
    });
    const sendDanmu = () => {
      if (videoContext && danmuValue.value) {
        videoContext.sendDanmu({
          text: danmuValue.value,
          color: getRandomColor()
        });
        danmuValue.value = "";
      }
    };
    const videoErrorCallback = (e) => {
      common_vendor.index.showModal({
        content: "网络连接错误",
        showCancel: false
      });
    };
    const getRandomColor = () => {
      const rgb = [];
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16);
        color = color.length === 1 ? "0" + color : color;
        rgb.push(color);
      }
      return "#" + rgb.join("");
    };
    return (_ctx, _cache) => {
      return {
        a: videoSrc.value,
        b: common_vendor.o(videoErrorCallback),
        c: danmuList.value,
        d: common_vendor.o(sendDanmu),
        e: common_vendor.o(($event) => danmuValue.value = $event),
        f: common_vendor.p({
          prefixIcon: "chatbubble",
          type: "text",
          placeholder: "在此处输入弹幕内容",
          modelValue: danmuValue.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4934862e"]]);
wx.createPage(MiniProgramPage);
