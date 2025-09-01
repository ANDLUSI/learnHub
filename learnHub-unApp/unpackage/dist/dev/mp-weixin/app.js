"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/course/course.js";
  "./pages/myStudies/myStudies.js";
  "./pages/assistant/assistant.js";
  "./pages/personalCenter/personalCenter.js";
  "./pages/courseList/courseList.js";
  "./pages/live/live.js";
  "./pages/courseDetails/courseDetails.js";
  "./pages/personalCenter/teacherCenter.js";
  "./pages/personalCenter/collection.js";
  "./pages/personalCenter/myCourse.js";
  "./pages/personalCenter/buyLog.js";
  "./pages/personalCenter/modifyStudnet.js";
  "./pages/personalCenter/teacherCourse.js";
  "./pages/personalCenter/teacherEditCoures.js";
  "./pages/personalCenter/addChapter.js";
  "./pages/personalCenter/addLesson.js";
  "./pages/myStudies/courseDetails/courseDetails.js";
  "./pages/myStudies/courseVideo/courseVideo.js";
  "./pages/personalCenter/teacherAddCourse.js";
  "./pages/loginAndReg/index.js";
  "./pages/loginAndReg/codelogin.js";
  "./pages/loginAndReg/register.js";
  "./pages/loginAndReg/choseLike.js";
  "./pages/live/live-info.js";
  "./pages/firstCourse/firstCourse.js";
  "./pages/TabOne/TabOne.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.warn("当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
