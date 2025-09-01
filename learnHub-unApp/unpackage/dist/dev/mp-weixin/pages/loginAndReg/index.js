"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_data_select2 + _easycom_uni_forms2)();
}
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_data_select + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const range = [
      { value: 0, text: "学生" },
      { value: 1, text: "老师" }
    ];
    const handleChange = (event) => {
      console.log("Selected value changed to:", event.detail.value);
      loginForm.value.identity = event.detail.value;
    };
    const formRef = common_vendor.ref();
    const loginForm = common_vendor.ref({
      name: "",
      password: "",
      identity: ""
    });
    const rules = {
      name: {
        rules: [
          { required: true, errorMessage: "请输入用户名" }
        ]
      },
      password: {
        rules: [
          { required: true, errorMessage: "请输入密码" },
          { minLength: 6, maxLength: 15, errorMessage: "密码长度在{minLength}--{maxLength}之间" }
        ]
      },
      identity: {
        rules: [
          { required: true, errorMessage: "请选择您的身份" }
        ]
      }
    };
    const urlm = common_vendor.ref("http://localhost:8080/user/login1");
    const login = () => {
      formRef.value.validate().then(async (r) => {
        console.log("验证成功");
        console.log(r);
        if (loginForm.value.identity == "1") {
          urlm.value = "http://localhost:8080/user/loginTeacher";
        } else {
          urlm.value = "http://localhost:8080/user/login1";
        }
        try {
          const formData = {
            studentName: loginForm.value.name,
            studentPassword: loginForm.value.password,
            identity: loginForm.value.identity
            // 如果服务器端需要这个信息的话
          };
          const res = await common_vendor.index.request({
            url: urlm.value,
            method: "POST",
            data: formData,
            header: {
              "content-type": "application/x-www-form-urlencoded"
            }
          });
          if (res.data.code == "2001") {
            common_vendor.index.showToast({ title: "登录成功！" });
            console.log("===========>>>>", res.data);
            if (loginForm.value.identity == "1") {
              common_vendor.index.setStorageSync("teacherId", res.data.data.teacherId);
              common_vendor.index.setStorageSync("studentId", "");
              common_vendor.index.reLaunch({ url: "/pages/personalCenter/teacherCenter" });
            } else {
              common_vendor.index.setStorageSync("studentId", res.data.data.studentId);
              common_vendor.index.setStorageSync("teacherId", "");
              if (!res.data.data.studentLike || res.data.data.studentLike == "") {
                common_vendor.index.reLaunch({ url: "/pages/loginAndReg/choseLike" });
              } else {
                common_vendor.index.reLaunch({ url: "/pages/index/index" });
              }
            }
          } else {
            common_vendor.index.showToast({ title: "登录失败！", icon: "none" });
          }
        } catch (error) {
          console.error(error);
          common_vendor.index.showToast({ title: "登录失败！", icon: "none" });
        }
      }).catch((err) => {
        console.log("验证失败");
        console.log(err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => loginForm.value.name = $event),
        c: common_vendor.p({
          placeholder: "请输入用户名",
          modelValue: loginForm.value.name
        }),
        d: common_vendor.p({
          required: true,
          label: "用户名",
          name: "name"
        }),
        e: common_vendor.o(($event) => loginForm.value.password = $event),
        f: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: loginForm.value.password
        }),
        g: common_vendor.p({
          required: true,
          label: "密码",
          name: "password"
        }),
        h: common_vendor.o(handleChange),
        i: common_vendor.o(($event) => loginForm.value.identity = $event),
        j: common_vendor.p({
          localdata: range,
          modelValue: loginForm.value.identity
        }),
        k: common_vendor.p({
          required: true,
          label: "请选择身份",
          name: "identity"
        }),
        l: common_vendor.sr(formRef, "d3b80979-0", {
          "k": "formRef"
        }),
        m: common_vendor.o(($event) => loginForm.value = $event),
        n: common_vendor.p({
          rules,
          ["label-width"]: 100,
          modelValue: loginForm.value
        }),
        o: common_vendor.o(login)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d3b80979"]]);
wx.createPage(MiniProgramPage);
