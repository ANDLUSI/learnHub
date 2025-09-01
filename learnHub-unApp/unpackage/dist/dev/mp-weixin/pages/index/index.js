"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const pics = common_vendor.ref([
      {
        id: "",
        src: "../../static/index/pic1.png",
        text: ""
      },
      {
        id: "",
        src: "../../static/index/pic2.png",
        text: ""
      },
      {
        id: "",
        src: "../../static/index/pic5.png",
        text: ""
      },
      {
        id: "",
        src: "../../static/index/pic4.png",
        text: ""
      },
      {
        id: "",
        src: "../../static/index/pic3.png",
        text: ""
      },
      {
        id: "",
        src: "../../static/index/pic6.png",
        text: ""
      },
      {
        id: "",
        src: "../../static/index/pic7.png",
        text: ""
      },
      {
        id: "",
        src: "../../static/index/pic8.png",
        text: ""
      },
      {
        id: "",
        src: "../../static/index/pic9.png",
        text: ""
      },
      {
        id: "",
        src: "../../static/index/pic10.png",
        text: ""
      }
    ]);
    const navigateToPage = (id, title) => {
      console.log("==== 进来了 :", id);
      common_vendor.index.navigateTo({
        url: "/pages/firstCourse/firstCourse?id=" + id + "&title=" + title
      });
    };
    common_vendor.onMounted(async () => {
      common_vendor.index.request({
        url: "http://localhost:8080/category/categoryList",
        // 确保URL正确
        method: "GET",
        success: (res) => {
          if (res.statusCode === 200 && res.data.code === 1001) {
            res.data.data.forEach((item, i) => {
              pics.value[i].id = item.id;
              pics.value[i].text = item.categoryName;
            });
            console.log("==== pics :", pics.value);
          } else {
            console.error("没找到当前页面:", res.data.message);
          }
        },
        fail: (err) => {
          console.error("错误的请求:", err);
        }
      });
    });
    const currentIndex = common_vendor.ref(0);
    const tagRefs = common_vendor.ref([]);
    const scrollViewRef = common_vendor.ref(null);
    common_vendor.ref(null);
    const studentId = common_vendor.ref(common_vendor.index.getStorageSync("studentId"));
    const error = common_vendor.ref(null);
    const recommendItems = common_vendor.ref([{
      "courseName": "前端页面学习与设计",
      "courseDescription": "前端页面技术加实践理论",
      "coverPic": "https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/05/1733369037314.png"
    }, {
      "courseName": "java面向对象编程",
      "courseDescription": "深入讲解Java的类与对象，强化面向对象理念##实践导向，通过项目加深继承、封装、多态理解##强调异常处理与集合框架",
      "coverPic": "https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/05/1733369067155.png"
    }, {
      "courseName": "人工智能",
      "courseDescription": "理论与实践并重，注重编程和项目实战##涵盖机器学习、深度学习等前沿技术##采用互动式教学方法",
      "coverPic": "https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/05/1733369085795.png"
    }]);
    const underlinePosition = common_vendor.ref(0);
    const underlineWidth = common_vendor.ref(0);
    const updateUnderlinePosition = async () => {
      var _a, _b, _c;
      await common_vendor.nextTick$1();
      if (!tagRefs.value[currentIndex.value])
        return;
      const rect = (_a = tagRefs.value[currentIndex.value].$el) == null ? void 0 : _a.getBoundingClientRect();
      if (!rect)
        return;
      const parentRect = (_b = scrollViewRef.value) == null ? void 0 : _b.$el.getBoundingClientRect();
      const scrollLeft = ((_c = scrollViewRef.value) == null ? void 0 : _c.scrollLeft) || 0;
      underlinePosition.value = rect.left - ((parentRect == null ? void 0 : parentRect.left) || 0) + scrollLeft;
      underlineWidth.value = rect.width;
    };
    common_vendor.onMounted(async () => {
      if (!studentId.value) {
        error.value = "用户ID未找到";
        return;
      }
      getUserLikes();
    });
    common_vendor.watch(currentIndex, updateUnderlinePosition);
    const swiperCurrent = common_vendor.ref(0);
    const switchContent = () => {
      const nextIndex = (swiperCurrent.value + 1) % recommendItems.value.length;
      swiperCurrent.value = nextIndex;
    };
    const onSwiperChange = (e) => {
      swiperCurrent.value = e.detail.current;
    };
    async function getUserLikes() {
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:8080/course/guest",
          method: "GET",
          data: {
            studentId: studentId.value
          },
          header: {
            "content-type": "application/x-www-form-urlencoded"
          }
        });
        if (response.data.code === 1001) {
          recommendItems.value = response.data.data;
          console.log("==== recommendItems.value :", response.data.data);
          console.log("==== recommendItems.value :", recommendItems.value);
        } else {
          throw new Error("无法获取用户喜好");
        }
      } catch (err) {
        console.error("Error fetching user likes:", err);
        error.value = "无法获取用户喜好";
        return [];
      }
    }
    const otherItems = common_vendor.ref([
      {
        image: "../../static/index/activite1.png",
        title: "疾风计划2025【1期】【一年…",
        description: "挑战一年学习计算机专业！",
        tags: ["好课推荐"]
      },
      {
        image: "../../static/index/activite2.png",
        title: "驭风计划：培养人工智能青年…",
        description: "和清华教授，零基础学习人工智能！",
        tags: ["爆款好课"]
      },
      {
        image: "../../static/index/activite3.png",
        title: "乘风计划2024【3期】系统培…",
        description: "科班式培养+工程师能力落地！",
        tags: ["限时特惠", "爆款好课"]
      },
      {
        image: "../../static/index/activite4.png",
        title: "深心计划：深入学习心理学",
        description: "各大名校带你学心理学专业",
        tags: ["限时特惠", "爆款好课"]
      }
      // 添加更多静态其他项目...
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_assets._imports_2,
        d: common_assets._imports_3,
        e: common_assets._imports_4,
        f: common_assets._imports_5,
        g: common_assets._imports_6,
        h: common_vendor.f(pics.value, (pic, index, i0) => {
          return {
            a: pic.src,
            b: common_vendor.t(pic.text),
            c: index,
            d: common_vendor.o(($event) => navigateToPage(pic.id, pic.text), index)
          };
        }),
        i: common_vendor.f(otherItems.value, (item, index, i0) => {
          return {
            a: item.image,
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.description),
            d: common_vendor.f(item.tags, (tag, tagIndex, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tagIndex
              };
            }),
            e: index
          };
        }),
        j: common_assets._imports_7,
        k: common_vendor.o(switchContent),
        l: common_vendor.f(recommendItems.value, (item, index, i0) => {
          return {
            a: item.coverPic,
            b: common_vendor.t(item.courseName),
            c: common_vendor.t(item.courseDescription),
            d: index
          };
        }),
        m: swiperCurrent.value,
        n: common_vendor.o(onSwiperChange)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
