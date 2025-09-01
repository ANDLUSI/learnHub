"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "buyLog",
  setup(__props) {
    const courses = common_vendor.ref([]);
    const studentId = common_vendor.ref("");
    studentId.value = common_vendor.index.getStorageSync("studentId");
    common_vendor.onMounted(() => {
      if (studentId.value) {
        getList();
      } else {
        common_vendor.index.showToast({
          title: "缺少学生ID，请检查参数。",
          icon: "none"
        });
      }
    });
    const getList = async () => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/order/selOrder",
        method: "GET",
        data: {
          studentId: studentId.value
        }
      });
      if (res.data.message === "操作成功") {
        courses.value = res.data.data;
      } else {
        common_vendor.index.showToast({
          title: "暂无数据",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(courses.value, (course, k0, i0) => {
          return {
            a: common_vendor.t(course.courseName),
            b: common_vendor.t(course.coursePrice),
            c: common_vendor.t(course.courseBuyDate)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1375d3d7"]]);
wx.createPage(MiniProgramPage);
