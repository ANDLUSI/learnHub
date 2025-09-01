"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "collection",
  setup(__props) {
    const collections = common_vendor.ref([]);
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
        url: "http://localhost:8080/collection/find",
        method: "GET",
        data: {
          studentId: studentId.value
        }
      });
      if (res.data.message === "操作成功") {
        collections.value = res.data.data;
        console.log(collections.value);
      } else {
        common_vendor.index.showToast({
          title: "暂无数据",
          icon: "none"
        });
      }
    };
    const cancel = async (id) => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/collection/del",
        method: "GET",
        data: {
          id
        }
      });
      if (res.data.message === "操作成功") {
        getList();
        common_vendor.index.showToast({
          title: "取消收藏成功",
          icon: "none"
        });
      } else {
        common_vendor.index.showToast({
          title: "暂无数据",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(collections.value, (collection, k0, i0) => {
          return {
            a: collection.course.coverPic,
            b: common_vendor.t(collection.course.courseName),
            c: common_vendor.o(($event) => cancel(collection.id), collection.id),
            d: collection.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7d53e31f"]]);
wx.createPage(MiniProgramPage);
