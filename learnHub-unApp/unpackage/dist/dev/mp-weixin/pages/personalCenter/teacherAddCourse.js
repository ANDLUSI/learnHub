"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_file_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_file_picker + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "teacherAddCourse",
  setup(__props) {
    const formRef = common_vendor.ref();
    const form = common_vendor.ref({
      teacherId: common_vendor.index.getStorageSync("teacherId"),
      contentImage: ""
    });
    const categoryOptions = common_vendor.ref([
      { value: "1", text: "编程语言" },
      { value: "2", text: "前端开发" },
      { value: "3", text: "后端开发" },
      { value: "4", text: "数据库管理" }
      // 添加更多分类...
    ]);
    const rules = common_vendor.ref({
      courseName: {
        rules: [
          {
            required: true,
            errorMessage: "请输入课程名称"
          }
        ]
      },
      courseDescription: {
        rules: [
          {
            required: true,
            errorMessage: "请输入课程介绍"
          }
        ]
      },
      coursePrice: {
        rules: [
          {
            required: true,
            errorMessage: "请输入课程价格"
          },
          {
            validateFunction: async (rule, value, data, callback) => {
              if (!/^\d+$/.test(value)) {
                return callback("只能输入数字！");
              } else {
                return true;
              }
            }
          }
        ]
      },
      categoryId: {
        rules: [
          {
            required: true,
            errorMessage: "请选择课程分类"
          }
        ]
      },
      courseFeature: {
        rules: [
          {
            required: true,
            errorMessage: "请输入课程特色"
          }
        ]
      },
      teacherLecture: {
        rules: [
          {
            required: true,
            errorMessage: "请输入主讲方向"
          }
        ]
      },
      applicationPeople: {
        rules: [
          {
            required: true,
            errorMessage: "请输入适用人群"
          }
        ]
      }
      // contentImage:{
      // 	rules:[
      // 		{
      // 			required:true,
      // 			errorMessage:'请上传封面'
      // 		}
      // 	]
      // }
    });
    const selectFile = (e) => {
      form.value.filePath = e.tempFiles[0];
    };
    const add = () => {
      formRef.value.validate().then(async (r) => {
        console.log("验证成功");
        console.log(r);
        const res = await common_vendor.index.uploadFile({
          url: "http://localhost:8080/edit/addCourse",
          filePath: form.value.filePath.url,
          // 上传的文件路径
          name: "photo",
          // 头像字段名称
          formData: form.value,
          // 传递表单数据（
          method: "POST"
        });
        if (res.data) {
          common_vendor.index.showToast({
            title: "修改成功！",
            icon: "success",
            success: function() {
              setTimeout(() => {
                common_vendor.index.reLaunch({
                  url: "/pages/personalCenter/teacherCenter"
                });
              }, 1e3);
            }
          });
        } else {
          common_vendor.index.showToast({
            title: "修改失败！"
          });
        }
      }).catch((err) => {
        console.log("验证失败", err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.value.courseName = $event),
        b: common_vendor.p({
          placeholder: "请输入课程名称",
          modelValue: form.value.courseName
        }),
        c: common_vendor.p({
          required: true,
          label: "课程名称",
          name: "courseName"
        }),
        d: common_vendor.o(($event) => form.value.courseDescription = $event),
        e: common_vendor.p({
          placeholder: "请输入课程介绍",
          modelValue: form.value.courseDescription
        }),
        f: common_vendor.p({
          required: true,
          label: "课程介绍",
          name: "courseDescription"
        }),
        g: common_vendor.o(($event) => form.value.coursePrice = $event),
        h: common_vendor.p({
          placeholder: "请输入课程价格",
          modelValue: form.value.coursePrice
        }),
        i: common_vendor.p({
          required: true,
          label: "课程价格",
          name: "coursePrice"
        }),
        j: common_vendor.o(($event) => form.value.categoryId = $event),
        k: common_vendor.p({
          localdata: categoryOptions.value,
          placeholder: "请选择课程分类",
          modelValue: form.value.categoryId
        }),
        l: common_vendor.p({
          required: true,
          label: "课程分类",
          name: "categoryId"
        }),
        m: common_vendor.o(($event) => form.value.courseFeature = $event),
        n: common_vendor.p({
          placeholder: "请输入课程特色",
          modelValue: form.value.courseFeature
        }),
        o: common_vendor.p({
          required: true,
          label: "课程特色",
          name: "courseFeature"
        }),
        p: common_vendor.o(($event) => form.value.teacherLecture = $event),
        q: common_vendor.p({
          placeholder: "请输入主讲方向",
          modelValue: form.value.teacherLecture
        }),
        r: common_vendor.p({
          required: true,
          label: "主讲方向",
          name: "teacherLecture"
        }),
        s: common_vendor.o(($event) => form.value.applicationPeople = $event),
        t: common_vendor.p({
          placeholder: "请输入适用人群",
          modelValue: form.value.applicationPeople
        }),
        v: common_vendor.p({
          required: true,
          label: "适用人群",
          name: "applicationPeople"
        }),
        w: common_vendor.o(selectFile),
        x: common_vendor.o(($event) => form.value.contentImage = $event),
        y: common_vendor.p({
          ["file-mediatype"]: "image",
          mode: "grid",
          modelValue: form.value.contentImage
        }),
        z: common_vendor.p({
          required: true,
          label: "封面",
          name: "contentImage"
        }),
        A: common_vendor.sr(formRef, "263eedf1-0", {
          "k": "formRef"
        }),
        B: common_vendor.o(($event) => form.value = $event),
        C: common_vendor.p({
          rules: rules.value,
          ["label-width"]: 100,
          modelValue: form.value
        }),
        D: common_vendor.o(add)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-263eedf1"]]);
wx.createPage(MiniProgramPage);
