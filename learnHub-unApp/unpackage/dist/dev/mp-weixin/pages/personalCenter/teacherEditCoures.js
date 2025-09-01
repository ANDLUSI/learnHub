"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_section2)();
}
const _easycom_uni_collapse_item = () => "../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "teacherEditCoures",
  setup(__props) {
    const courseId = common_vendor.ref("");
    const course = common_vendor.ref({});
    const form = common_vendor.ref({});
    common_vendor.onLoad((options) => {
      console.log("接收到的参数:", options.courseId);
      courseId.value = options.courseId;
      console.log("表单的的参数:", form.courseId);
    });
    const findById = async () => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/edit/findByCourseId",
        method: "GET",
        data: {
          courseId: courseId.value
        }
      });
      if (res.data.message === "操作成功") {
        course.value.data = res.data.data;
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
    common_vendor.onMounted(() => {
      findById();
    });
    const delP = async (id) => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/edit/delChapter",
        method: "GET",
        data: {
          id
        }
      });
      if (res.data.message === "操作成功") {
        course.value.data = res.data.data;
        common_vendor.index.showToast({
          title: "删除成功",
          icon: "none"
        });
      } else {
        common_vendor.index.showToast({
          title: "删除失败",
          icon: "none"
        });
      }
      findById();
    };
    const delL = async (id) => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/edit/delLesson",
        method: "GET",
        data: {
          id
        }
      });
      if (res.data.message === "操作成功") {
        course.value.data = res.data.data;
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
      findById();
    };
    const toAddC = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personalCenter/addChapter?courseId=" + courseId.value
      });
    };
    const toAddL = () => {
      common_vendor.index.navigateTo({
        url: "/pages/personalCenter/addLesson?courseId=" + courseId.value
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(toAddC),
        b: common_vendor.o(toAddL),
        c: common_vendor.f(course.value.data.chapterList, (chapter, k0, i0) => {
          return {
            a: common_vendor.o(($event) => delP(chapter.id)),
            b: common_vendor.f(chapter.lessonList, (lesson, k1, i1) => {
              return {
                a: common_vendor.o(($event) => delL(lesson.id)),
                b: common_vendor.t(lesson.orderIndex),
                c: common_vendor.t(lesson.lessonName)
              };
            }),
            c: "2357886e-2-" + i0 + ",2357886e-1",
            d: common_vendor.p({
              title: chapter.orderIndex + "-" + chapter.chapterName,
              ["show-animation"]: true
            })
          };
        }),
        d: common_vendor.p({
          title: course.value.data.courseName,
          type: "line"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2357886e"]]);
wx.createPage(MiniProgramPage);
