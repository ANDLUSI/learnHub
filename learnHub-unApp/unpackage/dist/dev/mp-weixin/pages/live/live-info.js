"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_select2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "live-info",
  setup(__props) {
    const formRef = common_vendor.ref({});
    const form = common_vendor.ref({});
    common_vendor.ref("");
    const rules = common_vendor.ref({
      id: {
        rules: [{ required: true, errorMessage: "课程不能为空" }]
      },
      title: {
        rules: [
          { required: true, errorMessage: "直播间名称不能为空" },
          {
            minLength: 3,
            maxLength: 20,
            errorMessage: "直播间长度在{minLength}-{maxLength}之间"
          }
        ]
      },
      description: {
        rules: [
          { required: true, errorMessage: "直播间描述不能为空" },
          {
            minLength: 3,
            maxLength: 20,
            errorMessage: "直播间描述长度在{minLength}-{maxLength}之间"
          }
        ]
      },
      secretKey: {
        rules: [
          { required: true, errorMessage: "直播间密钥不能为空" },
          {
            minLength: 4,
            maxLength: 20,
            errorMessage: "直播间密钥长度在{minLength}-{maxLength}之间"
          }
        ]
      }
    });
    common_vendor.onMounted(() => {
      teacherId.value = common_vendor.index.getStorageSync("teacherId");
      findCoursr();
    });
    const coursedata = common_vendor.ref([]);
    const teacherId = common_vendor.ref("");
    const findCoursr = async () => {
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:8080/teacher/findCourseByTeacherId",
          // 替换为实际获取课程数据的API地址
          method: "GET",
          data: {
            teacherId: teacherId.value
          }
        });
        const courses = response.data.map((item) => ({
          value: item.id,
          text: item.courseName
          // 根据实际情况调整属性名
        }));
        coursedata.value = courses;
      } catch (error) {
        console.error("加载课程数据失败", error);
      }
    };
    const submitForm = () => {
      try {
        formRef.value.validate().then(async (ress) => {
          const transObj = {
            course: {
              id: form.value.id,
              teacherId: teacherId.value
            },
            live: {
              title: form.value.title,
              courseId: form.value.id,
              description: form.value.description,
              secretKey: form.value.secretKey,
              liveUrl: form.value.liveUrl,
              teacherId: teacherId.value
            }
          };
          common_vendor.index.setStorageSync("courseId", form.value.id);
          common_vendor.index.setStorageSync("secretKey", form.value.secretKey);
          const response = await common_vendor.index.request({
            url: "http://localhost:8080/teacher/startLive",
            // 替换为实际提交直播信息的API地址
            method: "POST",
            data: transObj
          });
          const data = response.data.data;
          common_vendor.index.setStorageSync("liveId", response.data.data);
          console.log("提交成功", response);
          common_vendor.index.showToast({
            title: "直播间创建成功",
            icon: "none"
          });
        });
      } catch (error) {
        console.error("提交失败", error);
      }
    };
    const course = common_vendor.index.getStorageSync("courseId");
    const liveId = common_vendor.index.getStorageSync("liveId");
    const exit = async () => {
      const TransObj = {
        course: {
          id: course,
          teacherId: teacherId.value
        },
        live: {
          id: liveId
        }
      };
      console.log(TransObj);
      const respones = await common_vendor.index.request({
        url: "http://localhost:8080/teacher/stopLive",
        method: "POST",
        data: TransObj
      });
      if (respones.data.code == 1001) {
        common_vendor.index.showModal({
          title: respones.data.message
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.value.id = $event),
        b: common_vendor.p({
          value: "courseId",
          localdata: coursedata.value,
          modelValue: form.value.id
        }),
        c: common_vendor.p({
          label: "选择课程:",
          name: "id",
          ["label-width"]: "100"
        }),
        d: common_vendor.o(($event) => form.value.title = $event),
        e: common_vendor.p({
          placeholder: "请输入直播间名称",
          modelValue: form.value.title
        }),
        f: common_vendor.p({
          label: "直播间名称:",
          name: "title",
          ["label-width"]: "100"
        }),
        g: common_vendor.o(($event) => form.value.description = $event),
        h: common_vendor.p({
          placeholder: "请输入直播间描述",
          modelValue: form.value.description
        }),
        i: common_vendor.p({
          label: "直播间描述:",
          name: "description",
          ["label-width"]: "100"
        }),
        j: common_vendor.o(($event) => form.value.liveUrl = $event),
        k: common_vendor.p({
          value: "http://192.168.100.116:8080/hls",
          modelValue: form.value.liveUrl
        }),
        l: common_vendor.p({
          label: "直播间地址:",
          name: "liveUrl",
          ["label-width"]: "100"
        }),
        m: common_vendor.sr(formRef, "8eed1aa8-0", {
          "k": "formRef"
        }),
        n: common_vendor.o(($event) => form.value = $event),
        o: common_vendor.p({
          rules: rules.value,
          modelValue: form.value
        }),
        p: common_vendor.o(submitForm),
        q: common_vendor.o(exit)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8eed1aa8"]]);
wx.createPage(MiniProgramPage);
