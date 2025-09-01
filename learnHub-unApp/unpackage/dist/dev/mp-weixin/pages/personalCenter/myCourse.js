"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "myCourse",
  setup(__props) {
    const studentId = common_vendor.ref("");
    studentId.value = common_vendor.index.getStorageSync("studentId");
    const courses = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      if (studentId.value) {
        findById();
      } else {
        common_vendor.index.showToast({
          title: "缺少学生ID，请检查参数。",
          icon: "none"
        });
      }
    });
    const findById = async () => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/studentCourse/findAllByStuId",
          method: "GET",
          data: {
            studentId: studentId.value
          }
        });
        if (res.data.code == 2001) {
          courses.value = res.data.data;
        } else {
          common_vendor.index.showToast({
            title: "加载失败，请稍后再试",
            icon: "none"
          });
        }
      } catch (e) {
        console.error(e);
        console.error("Error fetching data:", e);
      }
    };
    const toStudy = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/myStudies/courseDetails/courseDetails?id=" + id
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(courses.value, (course, k0, i0) => {
          return {
            a: course.coverPic,
            b: common_vendor.t(course.courseName),
            c: common_vendor.t(course.teacherName),
            d: common_vendor.o(($event) => toStudy(course.id))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2b812a46"]]);
wx.createPage(MiniProgramPage);
