"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "firstCourse",
  setup(__props) {
    const loading = common_vendor.ref(true);
    const error = common_vendor.ref(null);
    const courses = common_vendor.ref([]);
    const categoryId = common_vendor.ref(null);
    common_vendor.ref(null);
    common_vendor.ref([{}]);
    const filteredCourses = common_vendor.computed(() => {
      if (!categoryId.value)
        return [];
      return courses.value.filter((course) => course.categoryId === categoryId.value);
    });
    const title = common_vendor.ref("");
    common_vendor.onLoad(async (options) => {
      title.value = options.title;
      common_vendor.index.setNavigationBarTitle({
        title: options.title
      });
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:8080/course/courseList",
          // 替换为你的API地址
          method: "GET",
          data: {
            categoryId: options.id || null
            // 确保传递了 categoryId 参数
          }
        });
        if (response.data.code === 1001) {
          courses.value = response.data.data;
          console.log(response);
        } else {
          console.error("没找到课程:", response.data.message);
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
      } finally {
        loading.value = false;
      }
    });
    const navigateTo = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/TabOne/TabOne?id=" + id + "&title=" + title.value
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loading.value
      }, loading.value ? {} : error.value ? {
        c: common_vendor.t(error.value.message || "加载失败，请稍后再试。")
      } : {
        d: common_vendor.f(filteredCourses.value, (course, k0, i0) => {
          return {
            a: common_vendor.t(course.title),
            b: course.id
          };
        })
      }, {
        b: error.value,
        e: common_vendor.f(courses.value, (course, k0, i0) => {
          return {
            a: course.coverPic,
            b: common_vendor.t(course.courseName),
            c: course.id,
            d: common_vendor.o(($event) => navigateTo(course.id), course.id)
          };
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
