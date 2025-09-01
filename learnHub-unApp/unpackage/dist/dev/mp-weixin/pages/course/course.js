"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_search_bar2 + _easycom_uni_drawer2 + _easycom_uni_section2)();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_drawer = () => "../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_search_bar + _easycom_uni_drawer + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "course",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const classifyTitle = common_vendor.ref("全部");
    const categoryList = common_vendor.ref([]);
    const courseList = common_vendor.ref([]);
    const courseName = common_vendor.ref("");
    const allCourseBtn = async () => {
      fetchCourses();
      closeDrawer();
      classifyTitle.value = "全部";
    };
    common_vendor.onMounted(() => {
      fetchCourses();
      showCategory();
    });
    const fetchCourses = async () => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/course/findCourseName",
          method: "GET",
          data: { courseName: courseName.value }
        });
        courseList.value = res.data.data || [];
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    const toDetails = async (courseId, title) => {
      common_vendor.index.navigateTo({
        url: "/pages/TabOne/TabOne?id=" + courseId + "&title=" + title
      });
    };
    const showCategory = async () => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/category/categoryList",
          method: "GET"
        });
        console.log(res.data.data);
        categoryList.value = res.data.data || [];
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    const findCourseByCatecory = async (categoryId, categoryName) => {
      closeDrawer();
      classifyTitle.value = categoryName;
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/course/courseList",
          method: "GET",
          data: { categoryId }
        });
        courseList.value = res.data.data || [];
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    const showRight = common_vendor.ref(false);
    const showLeft = common_vendor.ref(false);
    const showLeftDrawer = common_vendor.ref(null);
    const handleCancel = () => console.log("Search cancelled");
    const handleClear = () => {
      console.log("Search cleared");
      searchValue.value = "";
    };
    const showDrawer = (drawerRef) => {
      if (showLeftDrawer.value) {
        showLeftDrawer.value.open();
      }
    };
    const closeDrawer = (drawerRef) => {
      if (showLeftDrawer.value) {
        showLeftDrawer.value.close();
      }
    };
    const change = (e, type) => {
      console.log((type === "showLeft" ? "左窗口" : "右窗口") + (e ? "打开" : "关闭"));
      if (type === "showLeft") {
        showLeft.value = e;
      } else if (type === "showRight") {
        showRight.value = e;
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(fetchCourses),
        c: common_vendor.o(handleCancel),
        d: common_vendor.o(handleClear),
        e: common_vendor.o(($event) => courseName.value = $event),
        f: common_vendor.p({
          placeholder: "搜索更多好课",
          radius: "100",
          bgColor: "#F7F8FA",
          modelValue: courseName.value
        }),
        g: common_assets._imports_1$1,
        h: common_vendor.o(($event) => showDrawer()),
        i: common_vendor.t(classifyTitle.value),
        j: common_vendor.f(courseList.value, (course, k0, i0) => {
          return {
            a: course.coverPic || "/static/courseList/课程截图.png",
            b: common_vendor.t(course.courseName),
            c: common_vendor.t(course.teacherLecture),
            d: common_vendor.o(($event) => toDetails(course.id, course.courseName))
          };
        }),
        k: common_assets._imports_2$1,
        l: common_vendor.o(allCourseBtn),
        m: common_assets._imports_3$1,
        n: common_vendor.f(categoryList.value, (category, k0, i0) => {
          return {
            a: common_vendor.t(category.categoryName),
            b: common_vendor.o(($event) => findCourseByCatecory(category.id, category.categoryName))
          };
        }),
        o: common_vendor.sr(showLeftDrawer, "ffd98509-2,ffd98509-1", {
          "k": "showLeftDrawer"
        }),
        p: common_vendor.o(($event) => change($event, "showLeft")),
        q: common_vendor.p({
          mode: "left",
          width: 320
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ffd98509"]]);
wx.createPage(MiniProgramPage);
