"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "addChapter",
  setup(__props) {
    const formRef = common_vendor.ref();
    const form = common_vendor.reactive({
      courseId: "",
      chapterName: "",
      orderIndex: ""
    });
    common_vendor.onLoad((options) => {
      console.log("接收到的参数:", options.courseId);
      form.courseId = options.courseId;
      console.log("表单的的参数:", form.courseId);
    });
    const rules = common_vendor.ref({
      chapterName: {
        rules: [
          {
            required: true,
            errorMessage: "请输入章节名称"
          }
        ]
      },
      orderIndex: {
        rules: [
          {
            required: true,
            errorMessage: "请输入章节顺序"
          }
        ]
      }
    });
    const add = () => {
      formRef.value.validate().then(async (r) => {
        console.log("被提交表单的值：" + form.value);
        console.log("验证成功");
        console.log(r);
        const res = await common_vendor.index.request({
          url: "http://localhost:8080/edit/insertChapter",
          data: form,
          method: "post",
          header: {
            "content-type": "application/json"
            // 设置请求头为JSON
          }
        });
        if (res.data) {
          common_vendor.index.showToast({
            title: "新增成功！"
          });
          common_vendor.index.navigateTo({
            url: "/pages/personalCenter/teacherEditCoures?courseId=" + form.courseId
          });
        } else {
          common_vendor.index.showToast({
            title: "新增失败！"
          });
        }
      }).catch((err) => {
        console.log("验证失败");
        console.log(err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.orderIndex = $event),
        b: common_vendor.p({
          placeholder: "请输入章节顺序",
          modelValue: form.orderIndex
        }),
        c: common_vendor.p({
          required: true,
          label: "章节顺序",
          name: "orderIndex"
        }),
        d: common_vendor.o(($event) => form.chapterName = $event),
        e: common_vendor.p({
          placeholder: "请输入章节名称",
          modelValue: form.chapterName
        }),
        f: common_vendor.p({
          required: true,
          label: "章节名称",
          name: "chapterName"
        }),
        g: common_vendor.sr(formRef, "a74e4fb1-0", {
          "k": "formRef"
        }),
        h: common_vendor.o(($event) => form = $event),
        i: common_vendor.p({
          rules: rules.value,
          ["label-width"]: 100,
          modelValue: form
        }),
        j: common_vendor.o(add)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a74e4fb1"]]);
wx.createPage(MiniProgramPage);
