<template>
  <view class="box">
    <!--账号登录表单 -->
    <view class="regFrom">
      <image src="/static/index/logo.png" class="logo"></image>
      <uni-forms ref="formRef" v-model="loginForm" :rules="rules" :label-width="100">
        <uni-forms-item required label="用户名" name="name">
          <uni-easyinput v-model="loginForm.name" placeholder="请输入用户名"></uni-easyinput>
        </uni-forms-item>

        <uni-forms-item required label="密码" name="password">
          <uni-easyinput type="password" v-model="loginForm.password" placeholder="请输入密码"></uni-easyinput>
        </uni-forms-item>

        <!-- 单选按钮(身份) -->
        <uni-forms-item required label="请选择身份" name="identity">
			    <uni-data-select
			      v-model="loginForm.identity"
			      :localdata="range"
			      @change="handleChange"
			    ></uni-data-select>
		</uni-forms-item>
		
      </uni-forms>
      <!-- 登录按钮 -->
      <view>
        <button type="primary" class="login-button" @click="login">登录</button>
      </view>
      <!-- 验证码登录跳转 -->
      <view class="accountLogin">
        <navigator url="/pages/loginAndReg/codelogin" class="code-nav">验证码快捷登录</navigator>
        <navigator url="/pages/loginAndReg/register" class="reg-nav">还没有账号？去注册</navigator>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 定义响应式数据
// const selectedValue = ref(0); 
const range = [
  { value: 0, text: "学生" },
  { value: 1, text: "老师" },
];

// 定义方法
const handleChange = (event) => {
  console.log("Selected value changed to:", event.detail.value); // uni-app可能将value放在event.detail.value中
	loginForm.value.identity = event.detail.value;
};

const formRef = ref();
const loginForm = ref({
  name: '',
  password: '',
  identity: '' 
});


// 表单验证规则
const rules = {
  name: {
    rules: [
      { required: true, errorMessage: '请输入用户名' }
    ]
  },
  password: {
    rules: [
      { required: true, errorMessage: '请输入密码' },
      { minLength: 6, maxLength: 15, errorMessage: '密码长度在{minLength}--{maxLength}之间' }
    ]
  },
  identity: {
    rules: [
      { required: true, errorMessage: '请选择您的身份' }
    ]
  }
};

const urlm = ref('http://localhost:8080/user/login1')


// 提交登录
const login = () => {
  formRef.value.validate().then(async (r) => {
    console.log("验证成功");
    console.log(r);
	// console.log('1111111111==='+loginForm.value.identity);
    // 更新 URL 根据选择的身份
    if(loginForm.value.identity == "1") {
      urlm.value = 'http://localhost:8080/user/loginTeacher';
    } else {
      urlm.value = 'http://localhost:8080/user/login1'; // 假设这是学生的登录URL
    }

    try {
      // 构建表单数据
      const formData = {
        studentName: loginForm.value.name,
        studentPassword: loginForm.value.password,
        identity: loginForm.value.identity // 如果服务器端需要这个信息的话
      };

      // 发送请求
      const res = await uni.request({
        url: urlm.value,
        method: 'POST',
        data: formData, 
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      });

      if (res.data.code == "2001") {
        uni.showToast({ title: '登录成功！' });
        
        console.log("===========>>>>", res.data);
        
    
		if(loginForm.value.identity == "1") {
		  uni.setStorageSync("teacherId", res.data.data.teacherId);
		  uni.setStorageSync("studentId", '');
		  uni.reLaunch({ url: '/pages/personalCenter/teacherCenter' });
		  
		} else {
		  uni.setStorageSync("studentId", res.data.data.studentId); 
		  uni.setStorageSync("teacherId", '');
		  // 跳转到首页或其他页面
		  if((!res.data.data.studentLike) || res.data.data.studentLike=='') {
		  	uni.reLaunch({ url: '/pages/loginAndReg/choseLike' });
		  } else {
		  	uni.reLaunch({ url: '/pages/index/index' });
		  }
		}
        
        
      } else {
        uni.showToast({ title: '登录失败！',icon: 'none' });
      }
    } catch (error) {
      console.error(error);
      uni.showToast({ title: '登录失败！' ,icon: 'none'});
    }
  }).catch((err) => {
    console.log("验证失败");
    console.log(err);
  });
};
</script>

<style scoped lang="scss">

	.box{
		.regFrom{
			padding: 20rpx;
		}
		width: 100%;
		// background-color: white;
		height: 100%;
	}
	
	.regFrom{
		width: 600rpx;
		margin: 0 auto;
	}
	
	// 两个跳转
	.accountLogin navigator{
		color: #007aff;
		font-size: 30rpx;
		margin-top: 30rpx;
		display: inline-block;
	}
	// 去注册
	.reg-nav{
		margin-left: 100rpx;
	}
	// 验证码登录
	.code-nav{
		margin-left: 20rpx;
	}
	
	// logo
	.logo{
		width: 200rpx;
		height: 200rpx;
		margin-left: 200rpx;
		margin-top: 40rpx;
		margin-bottom: 70rpx;
	}
	
	// 登录按钮
	.login-button{
		border-radius: 1000rpx;
		background-color: #007aff;
		margin-top: 100rpx;
	} 
</style>
