"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_segmented_control2 + _easycom_uni_badge2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_badge + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "myStudies",
  setup(__props) {
    const items = common_vendor.ref(["正在上课", "即将开课", "已结课", "已退课"]);
    const current = common_vendor.ref(0);
    const list = common_vendor.ref([]);
    const list2 = common_vendor.ref([]);
    const studentId = common_vendor.ref(null);
    common_vendor.onMounted(() => {
      studentId.value = common_vendor.index.getStorageSync("studentId");
      showList(0);
    });
    const onClickItem = async (e) => {
      if (current.value !== e.currentIndex) {
        current.value = e.currentIndex;
        if (e.currentIndex != 3) {
          showList(e.currentIndex);
        } else {
          showRetiredOrder();
          console.log(list2.value.length);
        }
      }
    };
    const showList = async (i) => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/studentCourse/findAllByStuId",
          method: "GET",
          data: {
            studentId: studentId.value,
            courseStatus: i
          }
        });
        if (res.data.code == 2001) {
          if (res.data.data.length != null) {
            list.value = res.data.data;
          }
          ;
        } else {
          common_vendor.index.showToast({
            title: "加载失败，请稍后再试",
            icon: "none"
          });
        }
      } catch (e) {
        console.error(e);
        console.error("Error fetching data:", e);
        common_vendor.index.showToast({
          title: "网络请求失败，请检查网络连接",
          icon: "none"
        });
      }
    };
    const showRetiredOrder = async () => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/course/selectRetiredCourse",
          method: "GET",
          data: {
            studentId: studentId.value
          }
        });
        if (res.data.code == 2001) {
          if (res.data.data.length != null) {
            list2.value = res.data.data;
            console.log(res.data.data);
          }
          ;
          console.log(list2.value);
        } else {
          common_vendor.index.showToast({
            title: "加载失败，请稍后再试",
            icon: "none"
          });
        }
      } catch (e) {
        console.error(e);
        console.error("Error fetching data:", e);
        common_vendor.index.showToast({
          title: "网络请求失败，请检查网络连接",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(onClickItem),
        b: common_vendor.p({
          current: current.value,
          values: items.value,
          styleType: "text",
          activeColor: "#007aff",
          inActiveColor: "#b0b0b0"
        }),
        c: current.value === 0
      }, current.value === 0 ? common_vendor.e({
        d: list.value.length > 0
      }, list.value.length > 0 ? {
        e: common_vendor.f(list.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.liveStatus == 1
          }, item.liveStatus == 1 ? {
            b: "54ec2990-4-" + i0 + "," + ("54ec2990-3-" + i0),
            c: common_vendor.p({
              text: "1",
              ["is-dot"]: "true",
              size: "normal"
            })
          } : {}, {
            d: item.coverPic,
            e: item.id,
            f: "54ec2990-3-" + i0 + ",54ec2990-2",
            g: common_vendor.p({
              title: item.courseName,
              clickable: true,
              note: item.teacherName,
              link: "navigateTo",
              to: "/pages/myStudies/courseDetails/courseDetails?id=" + item.courseId + "&courseName=" + item.courseName,
              showArrow: true,
              rightText: "去学习"
            })
          });
        })
      } : {}, {
        f: list.value.length <= 0
      }, list.value.length <= 0 ? {} : {}) : {}, {
        g: current.value === 1
      }, current.value === 1 ? common_vendor.e({
        h: list.value.length > 0
      }, list.value.length > 0 ? {
        i: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.coverPic,
            b: item.id,
            c: "54ec2990-6-" + i0 + ",54ec2990-5",
            d: common_vendor.p({
              title: item.courseName,
              clickable: true,
              note: item.teacherName,
              rightText: "未开始"
            })
          };
        })
      } : {}, {
        j: list.value.length <= 0
      }, list.value.length <= 0 ? {} : {}) : {}, {
        k: current.value === 2
      }, current.value === 2 ? common_vendor.e({
        l: list.value.length > 0
      }, list.value.length > 0 ? {
        m: common_vendor.f(list.value, (item, k0, i0) => {
          return {
            a: item.coverPic,
            b: item.id,
            c: "54ec2990-8-" + i0 + ",54ec2990-7",
            d: common_vendor.p({
              title: item.courseName,
              clickable: true,
              note: item.teacherName,
              link: "navigateTo",
              to: "/pages/myStudies/courseDetails/courseDetails?id=" + item.courseId + "&courseName=" + item.courseName,
              showArrow: true,
              rightText: "已结课"
            })
          };
        })
      } : {}, {
        n: list.value.length <= 0
      }, list.value.length <= 0 ? {} : {}) : {}, {
        o: current.value === 3
      }, current.value === 3 ? common_vendor.e({
        p: list2.value.length > 0
      }, list2.value.length > 0 ? {
        q: common_vendor.f(list2.value, (item, k0, i0) => {
          return {
            a: item.coverPic,
            b: item.id,
            c: "54ec2990-10-" + i0 + ",54ec2990-9",
            d: common_vendor.p({
              title: item.courseName,
              note: item.teacherName,
              rightText: "已退款"
            })
          };
        })
      } : {}, {
        r: list2.value.length <= 0
      }, list2.value.length <= 0 ? {} : {}) : {});
    };
  }
};
wx.createPage(_sfc_main);
