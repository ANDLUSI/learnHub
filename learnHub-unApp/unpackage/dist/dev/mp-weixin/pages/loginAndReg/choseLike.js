"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "choseLike",
  setup(__props) {
    common_vendor.onMounted(() => {
      showCategory();
    });
    const toggleCategory = (category) => {
      category.selected = !category.selected;
    };
    const categories = common_vendor.ref([
      { name: "分类1", selected: false }
    ]);
    const transformCategories = (data) => {
      return data.map((item) => ({
        name: item.categoryName,
        selected: false
      }));
    };
    const showCategory = async () => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/category/categoryList",
          method: "GET"
        });
        console.log("Raw categories:", res.data.data);
        categories.value = transformCategories(res.data.data || []);
        console.log("Transformed categories:", categories.value);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    const studentId = common_vendor.ref("");
    studentId.value = common_vendor.index.getStorageSync("studentId");
    const saveLike = async () => {
      const selectedCategories = categories.value.filter((category) => category.selected);
      const likeString = selectedCategories.map((category) => category.name).join(",");
      console.log("Selected categories string:", likeString);
      console.log("StudentId string:", studentId.value);
      const formData = {
        likeString,
        studentId: studentId.value
      };
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/user/saveLike",
          method: "POST",
          // 注意这里应该是POST请求，因为你在发送数据给服务器
          data: formData,
          header: {
            "content-type": "application/x-www-form-urlencoded"
            // 显式指定内容类型
          }
        });
        console.log("Response from server:", res.data);
        common_vendor.index.reLaunch({ url: "/pages/index/index" });
      } catch (error) {
        console.error("Failed to save likes:", error);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(categories.value, (category, index, i0) => {
          return {
            a: category.selected,
            b: common_vendor.o(($event) => category.selected = $event.detail.value, index),
            c: common_vendor.t(category.name),
            d: index,
            e: common_vendor.n({
              "active": category.selected
            }),
            f: common_vendor.o(($event) => toggleCategory(category), index)
          };
        }),
        b: common_vendor.o(saveLike)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cbc3f036"]]);
wx.createPage(MiniProgramPage);
