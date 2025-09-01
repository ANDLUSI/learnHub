"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "teacherCenter",
  setup(__props) {
    const teacherId = common_vendor.ref("");
    teacherId.value = common_vendor.index.getStorageSync("teacherId");
    const teacher = common_vendor.ref({
      data: {
        teacherName: "",
        teacherHeadphone: ""
      }
    });
    const loginFlag = common_vendor.ref(false);
    common_vendor.onMounted(() => {
      if (teacher.value) {
        findById();
      }
    });
    const findById = async () => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/teacher/findTeacherById",
        method: "GET",
        data: {
          teacherId: teacherId.value
        }
      });
      if (res.data.message === "操作成功") {
        teacher.value.data = res.data.data;
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "none"
        });
        common_vendor.index.setStorageSync("secretKey", res.data.data.secretKey);
        loginFlag.value = true;
      } else {
        common_vendor.index.showToast({
          title: "当前处于未登录状态",
          icon: "none"
        });
      }
    };
    const toTeacherC = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personalCenter/teacherCourse"
      });
    };
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/loginAndReg/index"
      });
    };
    const toaddCourse = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personalCenter/teacherAddCourse"
      });
    };
    const toLive = () => {
      common_vendor.index.navigateTo({
        url: "/pages/live/live-info"
      });
    };
    const outLogin = async () => {
      common_vendor.index.showToast({
        title: "退出登录",
        icon: "none"
      });
      common_vendor.index.setStorageSync("studentId", "");
      common_vendor.index.setStorageSync("teacherId", "");
      common_vendor.index.setStorageSync("secretKey", "");
      loginFlag.value = false;
      teacher.data = "{}";
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: teacher.value.data.teacherHeadphone || "https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/06/1733487956203.png",
        c: common_vendor.t(teacher.value.data.teacherName),
        d: loginFlag.value,
        e: common_vendor.o(toLogin),
        f: !loginFlag.value,
        g: common_assets._imports_1$3,
        h: common_assets._imports_2$3,
        i: common_vendor.o(toTeacherC),
        j: common_assets._imports_3$2,
        k: common_assets._imports_2$3,
        l: common_vendor.o(toaddCourse),
        m: common_assets._imports_4$1,
        n: common_assets._imports_2$3,
        o: common_vendor.o(toLive),
        p: common_assets._imports_5$1,
        q: common_assets._imports_2$3,
        r: common_vendor.o(outLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8304fa1c"]]);
wx.createPage(MiniProgramPage);
