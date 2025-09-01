"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "TabOne",
  setup(__props) {
    const course = common_vendor.ref({});
    common_vendor.ref(null);
    common_vendor.ref([{}]);
    const title = common_vendor.ref("");
    common_vendor.onLoad(async (options) => {
      courseId.value = options.id;
      console.log("==== options.titie :", options.title);
      title.value = options.title;
      common_vendor.index.setNavigationBarTitle({
        title: options.title
      });
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:8080/course/courseInfo",
          method: "GET",
          data: {
            id: options.id
            // 确保传递了 categoryId 参数
          }
        });
        if (response.data.code == 1001) {
          course.value = response.data.data;
          console.log(response);
        } else {
          console.error("没找到课程", response.data.message);
          error.value = new Error(
            `HTTP Status: ${response.statusCode}, Message: ${response.data.message}`
          );
        }
      } catch (err) {
        if (err._rawValue !== void 0) {
          err = err._rawValue;
        }
        console.error("错误的请求:", err);
        error.value = err;
      }
    });
    const enroll = async () => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/order/add",
          method: "POST",
          data: {
            studentId: studentIdC.value,
            courseId: courseId.value,
            coursePrice: course.value.course.coursePrice,
            teacherId: course.value.teacher.teacherId
          }
        });
        if (res.data.code == 2001) {
          common_vendor.index.showToast({
            title: "购买成功！",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: "购买成功！",
            icon: "none"
          });
        }
      } catch (error2) {
        common_vendor.index.showToast({
          title: "网络异常！请稍后重试",
          icon: "exception"
        });
      }
    };
    common_vendor.onMounted(() => {
      studentIdC.value = common_vendor.index.getStorageSync("studentId");
      findCollection();
    });
    const studentIdC = common_vendor.ref("");
    const courseId = common_vendor.ref("");
    const collectionId = common_vendor.ref("");
    const flag = common_vendor.ref(false);
    const findCollection = async () => {
      const formData = {
        studentId: studentIdC.value,
        courseId: courseId.value
      };
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/collection/findCollection",
        method: "post",
        data: formData
      });
      if (res.data.message === "操作成功") {
        collectionId.value = res.data.data.id;
        console.log("这是查回来的id" + res.data.data.id);
        flag.value = true;
      }
    };
    const addCollection = async () => {
      if (flag.value) {
        const res2 = await common_vendor.index.request({
          url: "http://localhost:8080/collection/del",
          method: "get",
          data: {
            id: collectionId.value
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          }
        });
        if (res2.data.message === "操作成功") {
          common_vendor.index.showToast({
            title: "取消收藏成功",
            icon: "none"
          });
          flag.value = false;
        }
        return;
      }
      const formData = {
        studentId: studentIdC.value,
        courseId: courseId.value
      };
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/collection/add",
        method: "post",
        data: formData
      });
      if (res.data.message === "操作成功") {
        flag.value = true;
        common_vendor.index.showToast({
          title: "收藏成功",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: course.value.course.coverPic,
        b: common_vendor.t(course.value.course.courseName),
        c: common_vendor.t(title.value),
        d: common_assets._imports_0$5,
        e: common_vendor.t(course.value.course.courseFeature),
        f: course.value.teacher.teacherHeadphone,
        g: common_vendor.t(course.value.teacher.realName),
        h: common_vendor.t(course.value.teacher.teacherDescription),
        i: !flag.value ? "https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/08/1733662472702.png" : "https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/08/1733662844059.png",
        j: common_vendor.o(($event) => addCollection()),
        k: common_vendor.t(course.value.course.coursePrice),
        l: common_vendor.o(enroll)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-85257ec5"]]);
wx.createPage(MiniProgramPage);
