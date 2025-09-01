"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "courseVideo",
  setup(__props) {
    const studentId = common_vendor.ref(0);
    const videoSrc = common_vendor.ref("");
    const progressKey = common_vendor.ref(null);
    const lessonId = common_vendor.ref(0);
    const isNextLesson = common_vendor.ref(false);
    const nowVideoIndex = common_vendor.ref(0);
    const maxOrderIndex = common_vendor.ref(0);
    common_vendor.onLoad((options) => {
      studentId.value = common_vendor.index.getStorageSync("studentId");
      console.log(typeof options.lessonId);
      if (options.orderIndex < options.maxOrderIndex) {
        isNextLesson.value = true;
        maxOrderIndex.value = options.maxOrderIndex;
        nowVideoIndex.value = options.orderIndex;
      }
      lessonId.value = options.lessonId;
      videoSrc.value = options.videoUrl;
      console.log("接收到的参数:", options.videoUrl, options.lessonId);
    });
    let videoContext;
    common_vendor.onReady(() => {
      videoContext = common_vendor.index.createVideoContext("myVideo");
      fetchLatestProgressFromServer();
    });
    const onCanPlay = () => {
      console.log("视频已准备好播放");
    };
    let lastUpdateTime = 0;
    const onEnded = () => {
      console.log("视频播放结束，清除播放进度");
    };
    const onTimeUpdate = (event) => {
      console.log(progressKey.value);
      lastUpdateTime = event.detail.currentTime;
      console.log("视频时间更新", lastUpdateTime);
    };
    const onPause = () => {
      saveProgressToServer(lastUpdateTime);
      console.log("视频暂停，保存播放进度:", lastUpdateTime);
    };
    common_vendor.onUnload((options) => {
      saveProgressToServer(lastUpdateTime);
    });
    async function fetchLatestProgressFromServer() {
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:8080/lessonProcess/lastUpdateTime",
          // 假设这是获取播放进度的 API
          method: "GET",
          data: {
            studentId: studentId.value,
            lessonId: lessonId.value
          }
        });
        const serverProgress = response.data.data;
        if (serverProgress > 0) {
          videoContext.seek(serverProgress);
          setTimeout(() => {
            videoContext.play();
          }, 500);
        } else {
          videoContext.play();
        }
      } catch (error) {
        console.error("获取播放进度失败:", error);
      }
    }
    async function saveProgressToServer(currentTime) {
      console.log("==== currentTime :", currentTime);
      try {
        await common_vendor.index.request({
          url: "http://localhost:8080/lessonProcess/updateVideoProcess",
          // 假设这是保存播放进度的 API
          method: "POST",
          data: {
            studentId: studentId.value,
            lessonId: lessonId.value,
            lastUpdateTime: currentTime
          }
        });
        console.log("保存播放进度到服务器成功:", currentTime);
      } catch (error) {
        console.error("保存播放进度到服务器失败:", error);
      }
    }
    const nextLessonVideo = async () => {
      try {
        videoContext.pause();
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/lessonProcess/selectLessonInfo",
          method: "GET",
          data: {
            orderIndex: nowVideoIndex.value,
            lessonId: lessonId.value
          }
        });
        if (res.data.code == 2001) {
          console.log("==== 进来了");
          const lesson1 = common_vendor.ref({});
          lesson1.value = res.data.data;
          console.log("====  :", lesson1.value);
          common_vendor.index.navigateTo({
            url: "/pages/myStudies/courseVideo/courseVideo?videoUrl=" + lesson1.value.videoUrl + "&lessonId=" + lesson1.value.id + "&orderIndex=" + lesson1.value.orderIndex + "&maxOrderIndex=" + maxOrderIndex.value
          });
        } else {
          common_vendor.index.showToast({
            title: "加载失败，请稍后再试",
            icon: "none"
          });
        }
      } catch (e) {
        console.error(e);
        console.error("Error fetching data:", e);
        common_vendor.index.showToast({
          title: "网络请求失败，请检查网络连接",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: videoSrc.value,
        b: common_vendor.o(onCanPlay),
        c: common_vendor.o(onPause),
        d: common_vendor.o(onEnded),
        e: common_vendor.o(onTimeUpdate),
        f: isNextLesson.value
      }, isNextLesson.value ? {
        g: common_assets._imports_0$4,
        h: common_vendor.o(nextLessonVideo)
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
