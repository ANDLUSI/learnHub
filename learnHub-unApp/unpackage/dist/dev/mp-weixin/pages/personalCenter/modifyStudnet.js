"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_datetime_picker2 = common_vendor.resolveComponent("uni-datetime-picker");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  (_easycom_uni_forms_item2 + _easycom_uni_easyinput2 + _easycom_uni_datetime_picker2 + _easycom_uni_file_picker2 + _easycom_uni_forms2)();
}
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_datetime_picker = () => "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.js";
const _easycom_uni_file_picker = () => "../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
if (!Math) {
  (_easycom_uni_forms_item + _easycom_uni_easyinput + _easycom_uni_datetime_picker + _easycom_uni_file_picker + _easycom_uni_forms)();
}
const _sfc_main = {
  __name: "modifyStudnet",
  setup(__props) {
    const studentId = common_vendor.ref("");
    const formRef = common_vendor.ref();
    const form = common_vendor.ref({});
    const uploadFlag = common_vendor.ref(false);
    const loginFlag = common_vendor.ref(false);
    const findById = async () => {
      const res = await common_vendor.index.request({
        url: "http://localhost:8080/user/findById",
        method: "GET",
        data: {
          studentId: studentId.value
        }
      });
      if (res.data.message === "操作成功") {
        form.value = res.data.data;
        console.log(form);
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "none"
        });
        loginFlag.value = true;
      } else {
        common_vendor.index.showToast({
          title: "当前处于未登录状态",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      studentId.value = common_vendor.index.getStorageSync("studentId");
      if (studentId.value) {
        findById();
      } else {
        common_vendor.index.showToast({
          title: "缺少学生ID，请检查参数。",
          icon: "none"
        });
      }
    });
    const handleDateChange = (e) => {
      console.log("Selected date:", e.detail.value);
      form.studentBorndate = e.detail.value;
    };
    const selectFile = (e) => {
      uploadFlag.value = true;
      console.log("============>" + uploadFlag.value);
      form.value.filePath = e.tempFiles[0];
    };
    const save = () => {
      formRef.value.validate().then(async (r) => {
        console.log("验证成功");
        console.log(r);
        if (uploadFlag.value) {
          const res = await common_vendor.index.uploadFile({
            url: "http://localhost:8080/user/modify",
            filePath: form.value.filePath.url,
            // 上传的文件路径
            name: "photo",
            // 头像字段名称
            formData: form.value,
            // 传递表单数据（包括头像路径、日期等）
            method: "POST"
          });
          if (res.data) {
            common_vendor.index.showToast({
              title: "修改成功！",
              icon: "success",
              success: function() {
                setTimeout(() => {
                  common_vendor.index.reLaunch({
                    url: "/pages/personalCenter/personalCenter"
                  });
                }, 1e3);
              }
            });
          } else {
            common_vendor.index.showToast({
              title: "修改失败！"
            });
          }
        } else {
          const res = await common_vendor.index.uploadFile({
            url: "http://localhost:8080/user/modify",
            formData: form.value,
            // 只有表单数据，忽略文件上传
            method: "POST"
          });
          if (res.data) {
            common_vendor.index.showToast({
              title: "修改成功！",
              icon: "success",
              success: function() {
                setTimeout(() => {
                  common_vendor.index.reLaunch({
                    url: "/pages/personalCenter/personalCenter"
                  });
                }, 1e3);
              }
            });
          } else {
            common_vendor.index.showToast({
              title: "修改失败！"
            });
          }
        }
      }).catch((err) => {
        console.log("验证失败", err);
      });
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
      repassword: {
        rules: [
          {
            required: true,
            errorMessage: "请输入确认密码"
          },
          {
            minLength: 6,
            maxLength: 15,
            errorMessage: "密码长度在{minLength}--{maxLength}之间"
          },
          {
            validateFunction: async (rule, value, data, callback) => {
              if (value !== form.value.studentPassword) {
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
            errorMessage: "请输入电话"
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
            errorMessage: "请输入邮箱"
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
      }
    });
    return (_ctx, _cache) => {
      return {
        a: form.value.studentHeadphone || "https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/05/1733378526228.png",
        b: form.value.studentId,
        c: common_vendor.o(($event) => form.value.studentId = $event.detail.value),
        d: common_vendor.p({
          name: "studentId"
        }),
        e: common_vendor.o(($event) => form.value.studentName = $event),
        f: common_vendor.p({
          placeholder: "请输入用户名",
          modelValue: form.value.studentName
        }),
        g: common_vendor.p({
          required: true,
          label: "用户名",
          name: "studentName"
        }),
        h: common_vendor.o(($event) => form.value.studentPassword = $event),
        i: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: form.value.studentPassword
        }),
        j: common_vendor.p({
          required: true,
          label: "密码",
          name: "studentPassword"
        }),
        k: common_vendor.o(($event) => form.value.repassword = $event),
        l: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: form.value.repassword
        }),
        m: common_vendor.p({
          required: true,
          label: "确认密码",
          name: "repassword"
        }),
        n: common_vendor.o(($event) => form.value.studentPhone = $event),
        o: common_vendor.p({
          placeholder: "请输入电话",
          modelValue: form.value.studentPhone
        }),
        p: common_vendor.p({
          required: true,
          label: "电话",
          name: "studentPhone"
        }),
        q: common_vendor.o(handleDateChange),
        r: common_vendor.o(($event) => form.value.studentBorndate = $event),
        s: common_vendor.p({
          type: "date",
          placeholder: "请选择出生日期",
          modelValue: form.value.studentBorndate
        }),
        t: common_vendor.p({
          required: true,
          label: "出生日期",
          name: "studentBorndate"
        }),
        v: common_vendor.o(($event) => form.value.studentEmail = $event),
        w: common_vendor.p({
          placeholder: "请输入邮箱",
          modelValue: form.value.studentEmail
        }),
        x: common_vendor.p({
          required: true,
          label: "邮箱",
          name: "studentEmail"
        }),
        y: common_vendor.o(selectFile),
        z: common_vendor.o(($event) => form.value.filePath = $event),
        A: common_vendor.p({
          ["file-mediatype"]: "image",
          mode: "grid",
          modelValue: form.value.filePath
        }),
        B: common_vendor.p({
          label: "头像",
          name: "filePath"
        }),
        C: common_vendor.sr(formRef, "81520a7e-0", {
          "k": "formRef"
        }),
        D: common_vendor.o(($event) => form.value = $event),
        E: common_vendor.p({
          rules: rules.value,
          ["label-width"]: 100,
          modelValue: form.value
        }),
        F: common_vendor.o(save)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-81520a7e"]]);
wx.createPage(MiniProgramPage);
