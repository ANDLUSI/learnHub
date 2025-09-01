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
  __name: "codelogin",
  setup(__props) {
    const formRef = common_vendor.ref();
    const range = [
      { value: 0, text: "学生" },
      { value: 1, text: "老师" }
    ];
    const handleChange = (event) => {
      console.log("Selected value changed to:", event.detail.value);
      loginForm.value.identity = event.detail.value;
    };
    const loginForm = common_vendor.ref({
      studentPhone: "",
      code: ""
    });
    const rules = {
      studentPhone: {
        rules: [
          {
            required: true,
            errorMessage: "请输入手机号"
          },
          {
            minLength: 11,
            maxLength: 11,
            errorMessage: "手机号长度必须是11位！"
          },
          {
            validateFunction: async (rule, value, data, callback) => {
              if (!/^1[35789]\d{9}$/.test(value)) {
                return callback("手机号格式不正确！");
              } else {
                return true;
              }
            }
          }
        ]
      },
      code: {
        rules: [
          {
            required: true,
            errorMessage: "请输入验证码"
          }
        ]
      },
      identity: {
        rules: [
          {
            required: true,
            errorMessage: "请选择您的身份"
          }
        ]
      }
    };
    const urlm = common_vendor.ref("http://localhost:8080/user/codeLogin");
    const isCountingDown = common_vendor.ref(false);
    const countdownTime = common_vendor.ref(60);
    const countdownText = common_vendor.ref("发送验证码");
    let countdownInterval;
    const sendCode = async () => {
      formRef.value.validateField("studentPhone").then(async (r) => {
        try {
          const formData = {
            studentPhone: loginForm.value.studentPhone
          };
          const res = await common_vendor.index.request({
            url: "http://localhost:8080/user/sendCode",
            method: "POST",
            data: formData,
            header: {
              "content-type": "application/x-www-form-urlencoded"
            }
          });
          console.log("验证码已发送");
          isCountingDown.value = true;
          countdownInterval = setInterval(() => {
            if (countdownTime.value > 0) {
              countdownText.value = `${countdownTime.value}s后重新发送`;
              countdownTime.value--;
            } else {
              clearInterval(countdownInterval);
              isCountingDown.value = false;
              countdownText.value = "重新发送";
              countdownTime.value = 60;
            }
          }, 1e3);
        } catch (error) {
          console.error("验证失败或发送验证码失败", error);
        }
      }).catch((err) => {
        console.log("验证失败");
        console.log(err);
      });
    };
    const login = () => {
      formRef.value.validate().then(async (r) => {
        console.log("验证成功");
        console.log(r);
        if (loginForm.value.identity == "1") {
          urlm.value = "http://localhost:8080/user/codeLoginTeacher";
        } else {
          urlm.value = "http://localhost:8080/user/codeLogin";
        }
        try {
          const formData = {
            studentPhone: loginForm.value.studentPhone,
            code: loginForm.value.code,
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
            common_vendor.index.showToast({ title: "登录失败！" });
          }
        } catch (error) {
          console.error(error);
          common_vendor.index.showToast({ title: "登录失败！" });
        }
      }).catch((err) => {
        console.log("验证失败");
        console.log(err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => loginForm.value.studentPhone = $event),
        c: common_vendor.p({
          placeholder: "请输入手机号",
          modelValue: loginForm.value.studentPhone
        }),
        d: common_vendor.p({
          required: true,
          label: "手机号",
          name: "studentPhone"
        }),
        e: common_vendor.o(($event) => loginForm.value.code = $event),
        f: common_vendor.p({
          placeholder: "请输入短信验证码",
          modelValue: loginForm.value.code
        }),
        g: common_vendor.t(countdownText.value),
        h: isCountingDown.value,
        i: common_vendor.o(sendCode),
        j: common_vendor.p({
          required: true,
          label: "验证码",
          name: "code"
        }),
        k: common_vendor.o(handleChange),
        l: common_vendor.o(($event) => loginForm.value.identity = $event),
        m: common_vendor.p({
          localdata: range,
          modelValue: loginForm.value.identity
        }),
        n: common_vendor.p({
          required: true,
          label: "请选择身份",
          name: "identity"
        }),
        o: common_vendor.sr(formRef, "d0bd57a7-0", {
          "k": "formRef"
        }),
        p: common_vendor.o(($event) => loginForm.value = $event),
        q: common_vendor.p({
          rules,
          ["label-width"]: 100,
          modelValue: loginForm.value
        }),
        r: common_vendor.o(login)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d0bd57a7"]]);
wx.createPage(MiniProgramPage);
