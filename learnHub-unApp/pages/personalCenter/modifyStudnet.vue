<template>
  <view class="box">
    <!-- 表单 -->
    <view class="regFrom">
      <uni-forms ref="formRef" v-model="form" :rules="rules" :label-width="100">
        <view class="person_view">
          <view class="headP">
            <image :src="form.studentHeadphone || 'https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/05/1733378526228.png'"></image>
          </view>
        </view>

        <uni-forms-item name="studentId" class="hidden">
          <input type="text" v-model="form.studentId" class="hidden" />
        </uni-forms-item>

        <uni-forms-item required label="用户名" name="studentName">
          <uni-easyinput v-model="form.studentName" placeholder="请输入用户名"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item required label="密码" name="studentPassword">
          <uni-easyinput type="password" v-model="form.studentPassword" placeholder="请输入密码"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item required label="确认密码" name="repassword">
          <uni-easyinput type="password" v-model="form.repassword" placeholder="请输入密码"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item required label="电话" name="studentPhone">
          <uni-easyinput v-model="form.studentPhone" placeholder="请输入电话"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item required label="出生日期" name="studentBorndate">
          <uni-datetime-picker v-model="form.studentBorndate" type="date" placeholder="请选择出生日期" @change="handleDateChange" />
        </uni-forms-item>

        <uni-forms-item required label="邮箱" name="studentEmail">
          <uni-easyinput v-model="form.studentEmail" placeholder="请输入邮箱"></uni-easyinput>
        </uni-forms-item>

		<uni-forms-item  label="头像" name="filePath">
			<uni-file-picker v-model="form.filePath" file-mediatype="image" mode="grid" 
			@select="selectFile">请选择图片上传</uni-file-picker>
		</uni-forms-item>
      </uni-forms>
      <!-- 提交按钮 -->
      <button type="default" @click="save">保存</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const studentId = ref('');
const formRef = ref();
const form = ref({});

// 控制是否上传头像的 flag
const uploadFlag = ref(false);

// 控制显示和隐藏的 flag
const loginFlag = ref(false);

// 通过学生id查询学生对象
const findById = async () => {
  const res = await uni.request({
    url: 'http://localhost:8080/user/findById',
    method: 'GET',
    data: {
      studentId: studentId.value,
    },
  });
  if (res.data.message === '操作成功') {
    form.value = res.data.data;
    console.log(form);
    uni.showToast({
      title: '登录成功',
      icon: 'none',
    });
    loginFlag.value = true;
  } else {
    uni.showToast({
      title: '当前处于未登录状态',
      icon: 'none',
    });
  }
};

// 页面挂载时调用 findById 函数
onMounted(() => {
	studentId.value = uni.getStorageSync('studentId')
  if (studentId.value) {
    findById();
  } else {
    uni.showToast({
      title: '缺少学生ID，请检查参数。',
      icon: 'none',
    });
  }
});

// 处理日期变化事件
const handleDateChange = (e) => {
  console.log('Selected date:', e.detail.value);
  form.studentBorndate = e.detail.value;
};


//将上传图片存入数组
const selectFile = (e) =>{
	uploadFlag.value = true;
	console.log("============>"+uploadFlag.value);
	form.value.filePath = e.tempFiles[0]
}

// 提交修改
const save = () => {
  formRef.value
    .validate()
    .then(async (r) => {
      // 验证成功
      console.log('验证成功');
      console.log(r);



     

      // 如果上传了头像
      if (uploadFlag.value) {
        const res = await uni.uploadFile({
          url: 'http://localhost:8080/user/modify',
          filePath: form.value.filePath.url, // 上传的文件路径
          name: 'photo', // 头像字段名称
          formData: form.value, // 传递表单数据（包括头像路径、日期等）
          method: 'POST',
        });

        // 处理上传结果
        if (res.data) {
          uni.showToast({
            title: '修改成功！',
            icon: 'success',
            success: function () {
              setTimeout(() => {
                uni.reLaunch({
                  url: '/pages/personalCenter/personalCenter',
                });
              }, 1000);
            },
          });
        } else {
          uni.showToast({
            title: '修改失败！',
          });
        }
      } else {
        // 用户没有上传头像时，仅上传表单数据
        const res = await uni.uploadFile({
          url: 'http://localhost:8080/user/modify',
          formData: form.value, // 只有表单数据，忽略文件上传
          method: 'POST',
        });

        if (res.data) {
          uni.showToast({
            title: '修改成功！',
            icon: 'success',
            success: function () {
              setTimeout(() => {
                uni.reLaunch({
                  url: '/pages/personalCenter/personalCenter',
                });
              }, 1000);
            },
          });
        } else {
          uni.showToast({
            title: '修改失败！',
          });
        }
      }
    })
    .catch((err) => {
      // 验证失败
      console.log('验证失败', err);
    });
};

// 表单验证规则
const rules = ref({
  studentName: {
    rules: [
      {
        required: true,
        errorMessage: '请输入用户名',
      },
      {
        minLength: 1,
        maxLength: 15,
        errorMessage: '用户名长度在{minLength}--{maxLength}之间',
      },
    ],
  },
  studentPassword: {
    rules: [
      {
        required: true,
        errorMessage: '请输入密码',
      },
      {
        minLength: 6,
        maxLength: 15,
        errorMessage: '密码长度在{minLength}--{maxLength}之间',
      },
    ],
  },
  repassword: {
    rules: [
      {
        required: true,
        errorMessage: '请输入确认密码',
      },
      {
        minLength: 6,
        maxLength: 15,
        errorMessage: '密码长度在{minLength}--{maxLength}之间',
      },
      {
        validateFunction: async (rule, value, data, callback) => {
          if (value !== form.value.studentPassword) {
            return callback('两次密码输入不一致！');
          } else {
            return true;
          }
        },
      },
    ],
  },
  studentPhone: {
    rules: [
      {
        required: true,
        errorMessage: '请输入电话',
      },
      {
        minLength: 11,
        maxLength: 11,
        errorMessage: '手机号长度必须是11位！',
      },
      {
        validateFunction: async (rule, value, data, callback) => {
          if (!/^1[35789]\d{9}$/.test(value)) {
            return callback('手机号格式不正确！');
          } else {
            return true;
          }
        },
      },
    ],
  },
  studentEmail: {
    rules: [
      {
        required: true,
        errorMessage: '请输入邮箱',
      },
      {
        minLength: 1,
        maxLength: 30,
        errorMessage: '长度在{minLength}--{maxLength}之间',
      },
      {
        validateFunction: async (rule, value, data, callback) => {
          if (!/^\w+@\w+(\.\w+){1,2}$/.test(value)) {
            return callback('邮箱格式不正确！');
          } else {
            return true;
          }
        },
      },
    ],
  },
});
</script>

<style scoped lang="scss">
.box {
  .regFrom {
    padding: 20rpx;
  }
}

.headP image {
  border-radius: 15px;
  width: 150rpx;
  height: 150rpx;
}
.headP {
  margin-left: 300rpx;
  // float: left;
}

.person_view {
  top: 130px;
  left: 100rpx;
  width: 100%;
  height: 150rpx;
}
.modify_btn {
  position: absolute;
  left: 460rpx;
  bottom: 35px;
  width: 25px;
  height: 25px;
}
.hidden {
  display: none;
}
</style>
