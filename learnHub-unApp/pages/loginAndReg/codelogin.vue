<template>
	<view class="box">
		<!--账号登录表单 -->
		<view class="regFrom">
			<image src="/static/index/logo.png" class="logo"></image>
			<uni-forms ref="formRef" v-model="loginForm" :rules="rules" :label-width="100">
				
				<uni-forms-item required label="手机号" name="studentPhone">
					<uni-easyinput v-model="loginForm.studentPhone" placeholder="请输入手机号" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="验证码" name="code">
					<view class="code-input-container">
						<uni-easyinput class="code-input" v-model="loginForm.code" placeholder="请输入短信验证码"></uni-easyinput>
						<button type="default" size="mini" :disabled="isCountingDown" @click="sendCode">{{ countdownText }}</button>
					</view>
				</uni-forms-item>
				
				<!-- 单选按钮 -->
				<uni-forms-item required label="请选择身份" name="identity">
					    <uni-data-select
					      v-model="loginForm.identity"
					      :localdata="range"
					      @change="handleChange"
					    ></uni-data-select>
				</uni-forms-item>
			</uni-forms>
			<!--登录按钮-->
			<view>
				<button type="primary" @click="login" class="login-button">登录</button>
			</view>
			<!-- 验证码登录跳转 -->
			<view class="accountLogin">
				<navigator url="/pages/loginAndReg/index">账号密码登录</navigator>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	
	const formRef = ref();
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
	
	const loginForm = ref({
	  studentPhone: '',
	  code: ''
	});
	
	// 表单验证规则
	const rules = {
	  studentPhone:{
	  	rules:[
	  		{
	  			required:true,
	  			errorMessage:'请输入手机号'
	  		},
	  			{
	  			minLength:11,
	  			maxLength:11,
	  			errorMessage:'手机号长度必须是11位！'
	  		},
	  		{
	  			validateFunction: async (rule,value,data,callback) =>{
	  				if(!/^1[35789]\d{9}$/.test(value)){
	  					return callback('手机号格式不正确！')
	  				}else{
	  					return true
	  				};
	  			}
	  		}
	  	]
	  },
	  code:{
	  	rules:[
	  		{
	  			required:true,
	  			errorMessage:'请输入验证码'
	  		}
	  	]
	  },
	  identity:{
	  	rules:[
	  		{
	  			required:true,
	  			errorMessage:'请选择您的身份'
	  		}
	  	]
	  }
	};
	
	const urlm = ref('http://localhost:8080/user/codeLogin')
	
	// 发送验证码相关逻辑
	const isCountingDown = ref(false);
	const countdownTime = ref(60); // 倒计时时间
	const countdownText = ref('发送验证码');
	
	let countdownInterval;
	
	const sendCode = async () => {
		
		formRef.value.validateField('studentPhone').then(async (r) => {
			
			try {
			  // 构建表单数据
			  const formData = {
			    studentPhone:loginForm.value.studentPhone,
			  };
					// 这里可以添加提交逻辑，例如发送到服务器
					const res = await uni.request({
					  url: 'http://localhost:8080/user/sendCode',
					  method: 'POST',
					  data: formData,
					  header: {
					    'content-type': 'application/x-www-form-urlencoded'
					  }
					});
			  // 模拟发送验证码请求
			  console.log('验证码已发送');
			  
			  // 启动倒计时
			  isCountingDown.value = true;
			  countdownInterval = setInterval(() => {
			    if (countdownTime.value > 0) {
			      countdownText.value = `${countdownTime.value}s后重新发送`;
			      countdownTime.value--;
			    } else {
			      clearInterval(countdownInterval);
			      isCountingDown.value = false;
			      countdownText.value = '重新发送';
			      countdownTime.value = 60; // 重置倒计时
			    }
			  }, 1000);
			} catch (error) {
			  console.error('验证失败或发送验证码失败', error);
			}
		})
		.catch((err) => {
			console.log("验证失败");
			console.log(err);
		});
		
	};
	
	// 提交登录
	const login = () => {
	  formRef.value.validate().then(async (r) => {
	    console.log("验证成功");
	    console.log(r);
		// 更新 URL 根据选择的身份
		if(loginForm.value.identity == "1") {
			// console.log("111111111静茹");
		  urlm.value = 'http://localhost:8080/user/codeLoginTeacher';
		} else {
			// console.log("22222222静茹");
		  urlm.value = 'http://localhost:8080/user/codeLogin'; 
		}
	    try {
			// 构建表单数据
			const formData = {
			  studentPhone:loginForm.value.studentPhone,
			  code:loginForm.value.code,
			  identity: loginForm.value.identity // 如果服务器端需要这个信息的话
			};
			
	      // 这里可以添加提交逻辑，例如发送到服务器
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
	        uni.showToast({ title: '登录失败！' });
	      }
	    } catch (error) {
	      console.error(error);
	      uni.showToast({ title: '登录失败！' });
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
   }
   
   .regFrom{
   	width: 600rpx;
   	margin: 0 auto;
   }
   
   .accountLogin navigator{
	color: #007aff;
	font-size: 30rpx;
	text-align: center;
	margin-top: 30rpx;
   }
   
   // logo
   .logo{
   	width: 200rpx;
   	height: 200rpx;
   	margin-left: 200rpx;
   	margin-top: 20rpx;
   	margin-bottom: 70rpx; 
   }
   
   // 登录按钮
   .login-button{
   	border-radius: 1000rpx;
   	background-color: #007aff;
   }
   
   // 自定义验证码输入框宽度
   .code-input-container {
     display: flex;
     justify-content: space-between;
     align-items: center;
   
     .code-input {
       width: 70%; // 设置为父容器宽度的70%
     }
   
     button {
       margin-left: 10rpx;
     }
   }
</style>
