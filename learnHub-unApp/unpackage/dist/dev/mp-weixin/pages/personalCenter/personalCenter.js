"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "personalCenter",
  setup(__props) {
    const studentId = common_vendor.ref("");
    const teacherId = common_vendor.ref("");
    studentId.value = common_vendor.index.getStorageSync("studentId");
    teacherId.value = common_vendor.index.getStorageSync("teacherId");
    if (teacherId.value != "") {
      console.log("===========" + teacherId);
      common_vendor.index.reLaunch({ url: "/pages/personalCenter/teacherCenter" });
    }
    const student = common_vendor.ref({
      data: {
        studentName: "",
        studentHeadphone: ""
        // 默认头像路径为空
      }
    });
    const loginFlag = common_vendor.ref(false);
    const findById = async () => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/user/findById",
        method: "GET",
        data: {
          studentId: studentId.value
        }
      });
      if (res.data.message === "操作成功") {
        student.value.data = res.data.data;
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "none"
        });
        loginFlag.value = true;
      } else {
        common_vendor.index.showToast({
          title: "当前处于未登录状态",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      if (studentId.value) {
        findById();
      }
    });
    const outLogin = async () => {
      common_vendor.index.showToast({
        title: "退出登录",
        icon: "none"
      });
      common_vendor.index.setStorageSync("studentId", "");
      common_vendor.index.setStorageSync("teacherId", "");
      common_vendor.index.setStorageSync("secretKey", "");
      loginFlag.value = false;
      student.data = "{}";
    };
    const toCollection = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personalCenter/collection"
      });
    };
    const toMyCourse = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personalCenter/myCourse"
      });
    };
    const toBuyLog = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personalCenter/buyLog"
      });
    };
    const toModify = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personalCenter/modifyStudnet"
      });
    };
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/loginAndReg/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: student.value.data.studentHeadphone || "https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/05/1733378526228.png",
        c: common_vendor.t(student.value.data.studentName),
        d: common_assets._imports_1$2,
        e: common_vendor.o(toModify),
        f: loginFlag.value,
        g: common_vendor.o(toLogin),
        h: !loginFlag.value,
        i: common_assets._imports_2$2,
        j: common_assets._imports_2$3,
        k: common_vendor.o(toCollection),
        l: common_assets._imports_3$2,
        m: common_assets._imports_2$3,
        n: common_vendor.o(toMyCourse),
        o: common_assets._imports_1$3,
        p: common_assets._imports_2$3,
        q: common_vendor.o(toBuyLog),
        r: common_assets._imports_5$1,
        s: common_assets._imports_2$3,
        t: common_vendor.o(outLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7b035f71"]]);
wx.createPage(MiniProgramPage);
