<template>
	<view class="box">
		<!--注册表单 -->
		<view class="regFrom">
			<image src="/static/index/logo.png" class="logo"></image>
			<uni-forms ref="formRef" v-model="regForm" :rules="rules" :label-width="100">
				
				<uni-forms-item required label="用户名" name="studentName">
					<uni-easyinput v-model="regForm.studentName" placeholder="请输入用户名" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="密码" name="studentPassword">
					<uni-easyinput type="password" v-model="regForm.studentPassword" placeholder="请输入密码" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="确认密码" name="passwordCon">
					<uni-easyinput type="password" v-model="regForm.passwordCon" placeholder="请确认密码" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="邮箱" name="studentEmail">
					<uni-easyinput type="text" v-model="regForm.studentEmail" placeholder="请输入邮箱" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="手机号" name="studentPhone">
					<uni-easyinput type="text" v-model="regForm.studentPhone" placeholder="请输入手机号" ></uni-easyinput>
				</uni-forms-item>
				<uni-forms-item required label="验证码" name="code">
					<view class="code-input-container">
						<uni-easyinput class="code-input" v-model="regForm.code" placeholder="请输入短信验证码"></uni-easyinput>
						<button type="default" size="mini" :disabled="isCountingDown" @click="sendCode">{{ countdownText }}</button>
					</view>
				</uni-forms-item>
				
				<!-- 单选按钮 -->
				<uni-forms-item required label="请选择身份" name="identity">
					    <uni-data-select
					      v-model="regForm.identity"
					      :localdata="range"
					      @change="handleChange"
					    ></uni-data-select>
				</uni-forms-item>
			</uni-forms>
			<!--登录按钮-->
			<view>
				<button type="primary" @click="reg" class="reg-button">注册</button>
			</view>
			<!-- 验证码登录跳转 -->
			<view class="accountLogin">
				<navigator url="/pages/loginAndReg/index" class="reg-nav">已有账号 去登录</navigator>
			</view>
		</view>
	</view>
</template>
	
<script setup>
	import { ref } from 'vue';
		const formRef = ref();
		const identity = ref();
		
		const regForm = ref({
			studentName:'',
			studentPassword:'',
			passwordCon:'',
			studentEmail:'',
			studentPhone:'',
			code: ''
		});
		
		// 定义响应式数据
		// const selectedValue = ref(0); 
		const range = [
		  { value: 0, text: "学生" },
		  { value: 1, text: "老师" },
		];
		
		// 定义方法
		const handleChange = (event) => {
		  console.log("Selected value changed to:", event.detail.value); // uni-app可能将value放在event.detail.value中
			regForm.value.identity = event.detail.value;
		};
		
		//表单验证规则
		const rules = ref({
			studentName:{
				rules:[
					{
						required:true,
						errorMessage:'请输入用户名'
					},
						{
						minLength:1,
						maxLength:15,
						errorMessage:'用户名长度在{minLength}--{maxLength}之间'
					},
					{
						validateFunction: async (rule,value,data,callback) =>{
							
							const res = await uni.request({
								url: 'http://localhost:8080/user/validUsername',
								method: 'GET',
								data: {
									username:value
								},
							});
							if(res.data){
								return callback('用户名已存在！')
							}else{
								return true
							};
						}
					}
				]
			},
			studentPassword:{
				rules:[
					{
						required:true,
						errorMessage:'请输入密码'
					},
						{
						minLength:6,
						maxLength:15,
						errorMessage:'密码长度在{minLength}--{maxLength}之间'
					}
				]
			},
			passwordCon:{
				rules:[
					{
						required:true,
						errorMessage:'请输入密码'
					},
						{
						minLength:6,
						maxLength:15,
						errorMessage:'密码长度在{minLength}--{maxLength}之间'
					},
					{
						validateFunction: async (rule,value,data,callback) =>{
							
							if(value!=regForm.value.studentPassword){
								return callback('两次密码输入不一致！')
							}else{
								return true
							};
						}
					}
				]
			},
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
			studentEmail:{
				rules:[
					{
						required:true,
						errorMessage:'请输入电子邮箱'
					},
						{
						minLength:1,
						maxLength:30,
						errorMessage:'长度在{minLength}--{maxLength}之间'
					},
					{
						validateFunction: async (rule,value,data,callback) =>{
							if(!/^\w+@\w+(\.\w+){1,2}$/.test(value)){
								return callback('邮箱格式不正确！')
							}else{
								return true
							};
						}
					},
				]
			},
			identity:{
				rules:[
					{
						required:true,
						errorMessage:'请选择您的身份'
					}
				]
			},
			code:{
			rules:[
				{
					required:true,
					errorMessage:'请输入验证码'
				},
				{
					validateFunction: async (rule,value,data,callback) =>{
						// 构建表单数据
						const formData = {
						  studentPhone:regForm.value.studentPhone,
						  code:regForm.value.code
						};
						const res = await uni.request({
							url: 'http://localhost:8080/user/codeReg',
							method: 'GET',
							data: formData,
						});
						if(res.data.code==4001){
							return callback('验证码错误！')
						}else{
							return true
						};
					}
				}
	  	]
	  }
			
		});
		
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
				    studentPhone:regForm.value.studentPhone,
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
		
		//初始化默认学生注册
		const urlm = ref('http://localhost:8080/user/save')
		//提交注册
		const reg = () =>{
			formRef.value.validate().then(async r => {
					console.log(regForm.value);
					
					//验证成功
					console.log("验证成功");
					console.log(r);
					// 更新 URL 根据选择的身份
					if(regForm.value.identity == "0") {
					  urlm.value = 'http://localhost:8080/user/save';
					} else {
					  urlm.value = 'http://localhost:8080/user/saveTeacher'; // 假设这是学生的登录URL
					}
					const res = await uni.request({
						url: urlm.value,
						data:regForm.value,
						method:'post'
					})
					//判断用户是否登录成功，成则去登录
					if(res.data.code==2001){
						uni.showToast({
							title: '注册成功！'
						});
						//跳转登录页面
						uni.reLaunch({ url: '/pages/loginAndReg/index' })
					}else{
						uni.showToast({
							title: '注册失败！'
						});
					}
				})
				.catch(err => {
					//验证失败
					console.log("验证失败");
					console.log(err);
				})
		}
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
		margin-top: 40rpx;
		margin-bottom: 70rpx;
	}
	
	//注册按钮
	.reg-button{
		border-radius: 1000rpx;
		background-color: #007aff;
		margin-top: 100rpx;
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
