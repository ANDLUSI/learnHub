"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_data_select2 + _easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_file_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_data_select + _easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_file_picker + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "addLesson",
  setup(__props) {
    const formRef = common_vendor.ref();
    const form = common_vendor.ref({
      courseId: "",
      chapterId: "",
      lessonName: "",
      orderIndex: ""
    });
    const courseIdM = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      console.log("接收到的参数:", options.courseId);
      courseIdM.value = options.courseId ? parseInt(options.courseId, 10) : null;
      console.log("课程ID的参数:", courseIdM.value);
    });
    const selectFile = (e) => {
      form.value.filePath = e.tempFiles[0];
    };
    const categoryOptions = common_vendor.ref([]);
    const rules = common_vendor.ref({
      chapterId: {
        rules: [
          {
            required: true,
            errorMessage: "请选择章节"
          }
        ]
      },
      lessonName: {
        rules: [
          {
            required: true,
            errorMessage: "请输入课时名称"
          }
        ]
      },
      orderIndex: {
        rules: [
          {
            required: true,
            errorMessage: "请输入课时顺序"
          }
        ]
      }
      // filePath:{
      // 	rules:[
      // 		{
      // 			required:true,
      // 			errorMessage:'请上传视频'
      // 		}
      // 	]
      // }
    });
    const add = () => {
      formRef.value.validate().then(async (r) => {
        console.log("验证成功，提交表单:", form.value);
        const formData = {
          courseId: courseIdM.value,
          chapterId: form.value.chapterId,
          lessonName: form.value.lessonName,
          orderIndex: form.value.orderIndex
        };
        common_vendor.index.showLoading({ title: "正在上传...", mask: true });
        const res = await common_vendor.index.uploadFile({
          url: "http://localhost:8080/edit/addLesson",
          filePath: form.value.filePath.url,
          name: "file",
          formData,
          method: "POST"
        });
        common_vendor.index.hideLoading();
        if (res.data) {
          common_vendor.index.showToast({ title: "新增成功！" });
          common_vendor.index.navigateTo({
            url: "/pages/personalCenter/teacherEditCoures?courseId=" + courseIdM.value
          });
        } else {
          common_vendor.index.showToast({ title: "新增失败！" });
        }
      }).catch((err) => {
        common_vendor.index.hideLoading();
        console.log("验证失败", err);
      });
    };
    const findById = async () => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/edit/findByCourseId",
        method: "GET",
        data: {
          courseId: courseIdM.value
        }
      });
      if (res.data.message === "操作成功") {
        common_vendor.index.showToast({
          title: "查询成功",
          icon: "none"
        });
        categoryOptions.value = res.data.data.chapterList.map((chapter) => ({
          value: chapter.id.toString(),
          // 确保 value 是字符串类型
          text: `${chapter.orderIndex}. ${chapter.chapterName}`
        }));
        console.log("章节选项:", categoryOptions.value);
      } else {
        common_vendor.index.showToast({
          title: "查询失败",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      findById();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => form.value.chapterId = $event),
        b: common_vendor.p({
          localdata: categoryOptions.value,
          placeholder: "请选择章节",
          modelValue: form.value.chapterId
        }),
        c: common_vendor.p({
          required: true,
          label: "选择章节",
          name: "chapterId"
        }),
        d: common_vendor.o(($event) => form.value.lessonName = $event),
        e: common_vendor.p({
          placeholder: "请输入课时名称",
          modelValue: form.value.lessonName
        }),
        f: common_vendor.p({
          required: true,
          label: "课时名称",
          name: "lessonName"
        }),
        g: common_vendor.o(($event) => form.value.orderIndex = $event),
        h: common_vendor.p({
          placeholder: "请输入课时顺序",
          modelValue: form.value.orderIndex
        }),
        i: common_vendor.p({
          required: true,
          label: "课时顺序",
          name: "orderIndex"
        }),
        j: common_vendor.o(selectFile),
        k: common_vendor.o(($event) => form.value.filePath = $event),
        l: common_vendor.p({
          ["file-mediatype"]: "video",
          mode: "grid",
          modelValue: form.value.filePath
        }),
        m: common_vendor.p({
          required: true,
          label: "课程视频",
          name: "filePath"
        }),
        n: common_vendor.sr(formRef, "0b30edea-0", {
          "k": "formRef"
        }),
        o: common_vendor.o(($event) => form.value = $event),
        p: common_vendor.p({
          rules: rules.value,
          ["label-width"]: 100,
          modelValue: form.value
        }),
        q: common_vendor.o(add)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0b30edea"]]);
wx.createPage(MiniProgramPage);
