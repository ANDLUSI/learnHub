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
  __name: "register",
  setup(__props) {
    const formRef = common_vendor.ref();
    common_vendor.ref();
    const regForm = common_vendor.ref({
      studentName: "",
      studentPassword: "",
      passwordCon: "",
      studentEmail: "",
      studentPhone: "",
      code: ""
    });
    const range = [
      { value: 0, text: "学生" },
      { value: 1, text: "老师" }
    ];
    const handleChange = (event) => {
      console.log("Selected value changed to:", event.detail.value);
      regForm.value.identity = event.detail.value;
    };
    const rules = common_vendor.ref({
      studentName: {
        rules: [
          {
            required: true,
            errorMessage: "请输入用户名"
          },
          {
            minLength: 1,
            maxLength: 15,
            errorMessage: "用户名长度在{minLength}--{maxLength}之间"
          },
          {
            validateFunction: async (rule, value, data, callback) => {
              const res = await common_vendor.index.request({
                url: "http://localhost:8080/user/validUsername",
                method: "GET",
                data: {
                  username: value
                }
              });
              if (res.data) {
                return callback("用户名已存在！");
              } else {
                return true;
              }
            }
          }
        ]
      },
      studentPassword: {
        rules: [
          {
            required: true,
            errorMessage: "请输入密码"
          },
          {
            minLength: 6,
            maxLength: 15,
            errorMessage: "密码长度在{minLength}--{maxLength}之间"
          }
        ]
      },
      passwordCon: {
        rules: [
          {
            required: true,
            errorMessage: "请输入密码"
          },
          {
            minLength: 6,
            maxLength: 15,
            errorMessage: "密码长度在{minLength}--{maxLength}之间"
          },
          {
            validateFunction: async (rule, value, data, callback) => {
              if (value != regForm.value.studentPassword) {
                return callback("两次密码输入不一致！");
              } else {
                return true;
              }
            }
          }
        ]
      },
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
      studentEmail: {
        rules: [
          {
            required: true,
            errorMessage: "请输入电子邮箱"
          },
          {
            minLength: 1,
            maxLength: 30,
            errorMessage: "长度在{minLength}--{maxLength}之间"
          },
          {
            validateFunction: async (rule, value, data, callback) => {
              if (!/^\w+@\w+(\.\w+){1,2}$/.test(value)) {
                return callback("邮箱格式不正确！");
              } else {
                return true;
              }
            }
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
      },
      code: {
        rules: [
          {
            required: true,
            errorMessage: "请输入验证码"
          },
          {
            validateFunction: async (rule, value, data, callback) => {
              const formData = {
                studentPhone: regForm.value.studentPhone,
                code: regForm.value.code
              };
              const res = await common_vendor.index.request({
                url: "http://localhost:8080/user/codeReg",
                method: "GET",
                data: formData
              });
              if (res.data.code == 4001) {
                return callback("验证码错误！");
              } else {
                return true;
              }
            }
          }
        ]
      }
    });
    const isCountingDown = common_vendor.ref(false);
    const countdownTime = common_vendor.ref(60);
    const countdownText = common_vendor.ref("发送验证码");
    let countdownInterval;
    const sendCode = async () => {
      formRef.value.validateField("studentPhone").then(async (r) => {
        try {
          const formData = {
            studentPhone: regForm.value.studentPhone
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
    const urlm = common_vendor.ref("http://localhost:8080/user/save");
    const reg = () => {
      formRef.value.validate().then(async (r) => {
        console.log(regForm.value);
        console.log("验证成功");
        console.log(r);
        if (regForm.value.identity == "0") {
          urlm.value = "http://localhost:8080/user/save";
        } else {
          urlm.value = "http://localhost:8080/user/saveTeacher";
        }
        const res = await common_vendor.index.request({
          url: urlm.value,
          data: regForm.value,
          method: "post"
        });
        if (res.data.code == 2001) {
          common_vendor.index.showToast({
            title: "注册成功！"
          });
          common_vendor.index.reLaunch({ url: "/pages/loginAndReg/index" });
        } else {
          common_vendor.index.showToast({
            title: "注册失败！"
          });
        }
      }).catch((err) => {
        console.log("验证失败");
        console.log(err);
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(($event) => regForm.value.studentName = $event),
        c: common_vendor.p({
          placeholder: "请输入用户名",
          modelValue: regForm.value.studentName
        }),
        d: common_vendor.p({
          required: true,
          label: "用户名",
          name: "studentName"
        }),
        e: common_vendor.o(($event) => regForm.value.studentPassword = $event),
        f: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: regForm.value.studentPassword
        }),
        g: common_vendor.p({
          required: true,
          label: "密码",
          name: "studentPassword"
        }),
        h: common_vendor.o(($event) => regForm.value.passwordCon = $event),
        i: common_vendor.p({
          type: "password",
          placeholder: "请确认密码",
          modelValue: regForm.value.passwordCon
        }),
        j: common_vendor.p({
          required: true,
          label: "确认密码",
          name: "passwordCon"
        }),
        k: common_vendor.o(($event) => regForm.value.studentEmail = $event),
        l: common_vendor.p({
          type: "text",
          placeholder: "请输入邮箱",
          modelValue: regForm.value.studentEmail
        }),
        m: common_vendor.p({
          required: true,
          label: "邮箱",
          name: "studentEmail"
        }),
        n: common_vendor.o(($event) => regForm.value.studentPhone = $event),
        o: common_vendor.p({
          type: "text",
          placeholder: "请输入手机号",
          modelValue: regForm.value.studentPhone
        }),
        p: common_vendor.p({
          required: true,
          label: "手机号",
          name: "studentPhone"
        }),
        q: common_vendor.o(($event) => regForm.value.code = $event),
        r: common_vendor.p({
          placeholder: "请输入短信验证码",
          modelValue: regForm.value.code
        }),
        s: common_vendor.t(countdownText.value),
        t: isCountingDown.value,
        v: common_vendor.o(sendCode),
        w: common_vendor.p({
          required: true,
          label: "验证码",
          name: "code"
        }),
        x: common_vendor.o(handleChange),
        y: common_vendor.o(($event) => regForm.value.identity = $event),
        z: common_vendor.p({
          localdata: range,
          modelValue: regForm.value.identity
        }),
        A: common_vendor.p({
          required: true,
          label: "请选择身份",
          name: "identity"
        }),
        B: common_vendor.sr(formRef, "905a5107-0", {
          "k": "formRef"
        }),
        C: common_vendor.o(($event) => regForm.value = $event),
        D: common_vendor.p({
          rules: rules.value,
          ["label-width"]: 100,
          modelValue: regForm.value
        }),
        E: common_vendor.o(reg)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-905a5107"]]);
wx.createPage(MiniProgramPage);
