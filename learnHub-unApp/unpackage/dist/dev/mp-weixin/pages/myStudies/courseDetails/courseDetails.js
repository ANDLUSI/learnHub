"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_l_circle2 = common_vendor.resolveComponent("l-circle");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_badge2 + _easycom_uni_segmented_control2 + _easycom_l_circle2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_section2)();
}
const _easycom_uni_badge = () => "../../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_l_circle = () => "../../../uni_modules/lime-circle/components/l-circle/l-circle.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_badge + _easycom_uni_segmented_control + _easycom_l_circle + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_section)();
}
const _sfc_main = {
  __name: "courseDetails",
  setup(__props) {
    common_vendor.index.setNavigationBarTitle({
      title: "我的课程"
    });
    const isDrop = common_vendor.ref(true);
    const activeNames = common_vendor.ref([]);
    const current = common_vendor.ref(0);
    const items = common_vendor.ref(["课程", "直播"]);
    const studentId = common_vendor.ref(null);
    const haveLive = common_vendor.ref(false);
    const showRedD = common_vendor.ref(false);
    const titleName = common_vendor.ref("");
    const onClickItem = async (e) => {
      if (current.value !== e.currentIndex) {
        current.value = e.currentIndex;
        if (e.currentIndex == 1 && haveLive.value) {
          common_vendor.index.navigateTo({
            url: "/pages/live/live"
          });
        }
      }
    };
    common_vendor.onMounted(() => {
    });
    const courseId = common_vendor.ref();
    common_vendor.onLoad((options) => {
      titleName.value = options.courseName;
      studentId.value = common_vendor.index.getStorageSync("studentId");
      courseId.value = options.id;
      console.log("接收到的参数:", options.id);
      findLiveStatus();
      findisDrop();
      selectCourseProcess();
      showChapter();
    });
    const learnedProgress = common_vendor.ref(0);
    const chapters = common_vendor.ref([{}]);
    const lessons = common_vendor.ref([{}]);
    const isLessons = common_vendor.ref(0);
    const selectCourseProcess = async () => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/studentCourse/selectCourseProcess",
          method: "GET",
          data: {
            studentId: studentId.value,
            courseId: courseId.value
          }
        });
        if (res.data != null) {
          learnedProgress.value = res.data;
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
    const showChapter = async () => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/chapter/findChapters",
          method: "GET",
          data: {
            courseId: courseId.value
          }
        });
        if (res.data.code == 2001) {
          chapters.value = res.data.data;
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
    const chapterId = common_vendor.ref();
    const change = async (e) => {
      chapters.value.forEach((item, i) => {
        if (e.length > 0) {
          if (e == i) {
            chapterId.value = item.id;
            console.log(chapterId.value);
          }
        }
      });
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/lessonProcess/findAllLessonProcess",
        method: "GET",
        data: {
          courseId: courseId.value,
          chapterId: chapterId.value
        }
      });
      if (res.data.code == 2001 && res.data.data != null) {
        console.log(res.data.data);
        lessons.value = res.data.data;
        isLessons.value = lessons.value.length;
      } else {
        common_vendor.index.showToast({
          title: "查询失败了！"
        });
      }
    };
    const toVideoPage = async (chapter, url, lessonId, orderIndex, maxOrderIndex) => {
      if (isDrop.value && chapter > 1) {
        common_vendor.index.showModal({
          content: "你将无法退课?",
          success: (res) => {
            if (res.confirm == true) {
              modifyIdDrop();
              common_vendor.index.navigateTo({
                url: "/pages/myStudies/courseVideo/courseVideo?videoUrl=" + url + "&lessonId=" + lessonId + "&orderIndex=" + orderIndex + "&maxOrderIndex=" + maxOrderIndex
              });
            }
          }
        });
      } else {
        common_vendor.index.navigateTo({
          url: "/pages/myStudies/courseVideo/courseVideo?videoUrl=" + url + "&lessonId=" + lessonId + "&orderIndex=" + orderIndex + "&maxOrderIndex=" + maxOrderIndex
        });
      }
    };
    const findisDrop = async () => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/studentCourse/findIsDrop",
        method: "GET",
        data: {
          studentId: studentId.value,
          courseId: courseId.value
        }
      });
      if (res.data != 1) {
        isDrop.value = false;
      }
    };
    const modifyIdDrop = async () => {
      await common_vendor.index.request({
        url: "http://localhost:8080/studentCourse/modifyIsDrop",
        method: "GET",
        data: {
          studentId: studentId.value,
          courseId: chapterId.value
        }
      });
    };
    const dropCourse = async () => {
      common_vendor.index.showModal({
        title: "",
        content: "您确定要退选该课程吗？退课后将无法恢复，并且退款将原路返回",
        success: async (res) => {
          if (res.confirm == true) {
            try {
              common_vendor.index.showLoading({
                title: "正在处理..."
              });
              const res2 = await common_vendor.index.request({
                url: "http://localhost:8080/studentCourse/dropCourse",
                method: "GET",
                data: {
                  studentId: studentId.value,
                  courseId: courseId.value
                }
              });
              common_vendor.index.hideLoading();
              if (res2.data.code == 2001) {
                common_vendor.index.showToast({
                  title: "退课成功!退款原路返回",
                  icon: "success"
                });
                common_vendor.index.reLaunch({
                  url: "/pages/myStudies/myStudies"
                });
              } else {
                common_vendor.index.showToast({
                  title: "退课失败!",
                  icon: "error"
                });
              }
            } catch (error) {
              common_vendor.index.showToast({
                title: "网络请求错误!",
                icon: "exception"
              });
            }
          }
        }
      });
    };
    const findLiveStatus = async () => {
      try {
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/course/selectLiveStatus",
          method: "GET",
          data: {
            courseId: courseId.value
          }
        });
        if (res.data == 1) {
          showRedD.value = true;
          haveLive.value = true;
        }
      } catch (error) {
      }
    };
    function numberToChinese(num) {
      const chineseNums = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
      if (num == null) {
        console.warn("传入的数字为 undefined 或 null");
        return "";
      }
      if (num >= 0 && num <= 10) {
        return chineseNums[num];
      } else if (num > 10 && num <= 19) {
        return "十" + chineseNums[num - 10];
      } else if (num >= 20 && num <= 99) {
        const tens = Math.floor(num / 10);
        const units = num % 10;
        return chineseNums[tens] + "十" + (units === 0 ? "" : chineseNums[units]);
      } else {
        return num.toString();
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(titleName.value),
        b: common_vendor.t(learnedProgress.value),
        c: isDrop.value
      }, isDrop.value ? {
        d: common_vendor.o(dropCourse)
      } : {}, {
        e: showRedD.value
      }, showRedD.value ? {
        f: common_vendor.p({
          text: "1",
          ["is-dot"]: "true",
          size: "normal"
        })
      } : {}, {
        g: common_vendor.o(onClickItem),
        h: common_vendor.p({
          current: current.value,
          values: items.value,
          styleType: "text",
          activeColor: "#007aff",
          inActiveColor: "#b0b0b0"
        }),
        i: current.value === 0
      }, current.value === 0 ? {
        j: common_vendor.f(chapters.value, (item, k0, i0) => {
          return common_vendor.e(isLessons.value > 0 ? {
            a: common_vendor.f(lessons.value, (item2, k1, i1) => {
              return {
                a: "056548b4-7-" + i0 + "-" + i1 + "," + ("056548b4-6-" + i0 + "-" + i1),
                b: common_vendor.p({
                  size: "20px",
                  percent: item2.watchedProcess * 100
                }),
                c: item2.id,
                d: common_vendor.o(($event) => toVideoPage(item.orderIndex, item2.lesson.videoUrl, item2.lesson.id, item2.lesson.orderIndex, lessons.value[lessons.value.length - 1].lesson.orderIndex), item2.id),
                e: "056548b4-6-" + i0 + "-" + i1 + "," + ("056548b4-5-" + i0),
                f: common_vendor.p({
                  border: false,
                  title: item.orderIndex + "." + item2.lesson.orderIndex + item2.lesson.lessonName,
                  clickable: "true"
                })
              };
            }),
            b: common_assets._imports_0$3
          } : {}, {
            c: "056548b4-5-" + i0 + "," + ("056548b4-4-" + i0)
          }, isLessons.value == 0 ? {} : {}, {
            d: item.id,
            e: "056548b4-4-" + i0 + ",056548b4-3",
            f: common_vendor.p({
              title: "第" + numberToChinese(item.orderIndex) + "章：" + item.chapterName,
              name: item.chapterId
            })
          });
        }),
        k: isLessons.value > 0,
        l: isLessons.value == 0,
        m: common_vendor.o(change),
        n: common_vendor.p({
          accordion: true,
          activeNames: activeNames.value
        })
      } : {}, {
        o: current.value === 1
      }, current.value === 1 ? common_vendor.e({
        p: haveLive.value == false
      }, haveLive.value == false ? {} : {}) : {});
    };
  }
};
wx.createPage(_sfc_main);
