"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "teacherCourse",
  setup(__props) {
    const teacherId = common_vendor.ref("");
    teacherId.value = common_vendor.index.getStorageSync("teacherId");
    const courses = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      if (teacherId.value) {
        findById();
      } else {
        common_vendor.index.showToast({
          title: "缺少老师ID，请检查参数。",
          icon: "none"
        });
      }
    });
    const findById = async () => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/teacher/findCourseByTeacherId",
        method: "GET",
        data: {
          teacherId: teacherId.value
        }
      });
      if (res) {
        courses.value = res.data;
        common_vendor.index.showToast({
          title: "查询成功",
          icon: "none"
        });
      } else {
        common_vendor.index.showToast({
          title: "查询失败",
          icon: "none"
        });
      }
    };
    const toEdit = (courseId) => {
      common_vendor.index.navigateTo({
        url: "/pages/personalCenter/teacherEditCoures?courseId=" + courseId
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(courses.value, (course, k0, i0) => {
          return {
            a: course.coverPic || "../../static/personCenter/课程图片.png",
            b: common_vendor.t(course.courseName),
            c: common_vendor.t(course.applicationPeople),
            d: common_vendor.o(($event) => toEdit(course.id))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7ca24b61"]]);
wx.createPage(MiniProgramPage);
