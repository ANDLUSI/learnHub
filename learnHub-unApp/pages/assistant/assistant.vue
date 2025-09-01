<template>
	<view class="container">
		<!-- 头部 -->
		<view class="header">
			<view class="logo">
				<text class="title">学习助手</text>
				<text class="version">1.0</text>
			</view>
		</view>

		<!-- 主要内容区域 -->
		<view class="main-content">

			<view class="content-wrapper">

				<!-- 右侧聊天区域 -->
				<view class="chat-panel">
					<scroll-view class="chat-container" scroll-y="true" :scroll-top="scrollTop"
						:scroll-with-animation="true" @scrolltoupper="onScrollToUpper">
						<view v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
							<image v-if="message.type === 'bot'" class="bot-avatar" src="../../static/ai.jpg"
								mode="aspectFit" />
							<view class="message-content">
								<text>{{ message.type === 'bot' ? message.displayContent : message.content }}</text>
							</view>
						</view>
					</scroll-view>

					<!-- 输入区域 -->
					<view class="input-area">
						<input class="input" v-model="userInput" placeholder="您想了解哪些学习的信息？" @input="onInput"
							@confirm="onSend" confirm-type="send" />
						<button class="send-button" @click="onSend">发送</button>
					</view>
				</view>
			</view>

			<!-- 底部提示信息 -->
			<view class="tips-section">
				<view class="health-tips">
					<text class="tips-title">健康小贴士:</text>
					<text
						class="tips-content">我可以为您提供学习方面的信息和知识，回答您的问题，帮助您解决困惑或疑问。无论您遇到什么学习方面的问题，我都会尽力给您最准确、详细的答案。</text>
				</view>
				<view class="disclaimer">
					<text>如遇回答不完整，可以输入（请继续回答刚才未完成的答案）即可继续回复。由于系统基于国内AI接口混合开发，仅用于学习知识回答，禁止一切非法活动。</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		nextTick,
		onMounted,
		onUnmounted
	} from 'vue'
	//会话Id
	const sessionId = ref('')
	// 状态定义
	const userInput = ref('')
	const messages = ref([])
	const scrollTop = ref(0)
	const typingSpeed = ref(100)
	const isTyping = ref(false)
	// 页面加载时读取本地存储的消息历史
	onMounted(async () => {
	    // 获取或创建sessionId
	    let localSessionId = uni.getStorageSync('sessionId');
	    if (!localSessionId) {
	        localSessionId = createSessionId();
	        uni.setStorageSync('sessionId', localSessionId);
	    }
	    sessionId.value = localSessionId;
	
	    // 尝试获取会话数据
		// 尝试获取会话数据
		try {
			const response = await uni.request({
				url: `http://localhost:8080/session/getSessionData?sessionId=${sessionId.value}`,
				method: 'GET'
			});

			if (response.data.sessionData) {
				// 如果有旧的聊天记录，解析并添加到messages中
				messages.value.push(...response.data.sessionData.map(msg => ({
					...msg,
					displayContent: msg.content // 确保历史消息立即完全显示
				})));
			}

			// 更新滚动位置以确保最新的消息可见
			updateScroll();

		} catch (error) {
			console.error('获取会话失败:', error);
		}
	});
	
	
	//生成sessionId 
	const createSessionId =()=>{
		return 'session_' + Math.random().toString(36).substr(2, 9);
	}

	// 输入处理
	const onInput = (e) => {
		userInput.value = e.detail.value
	}

	// 发送消息处理
	const onSend = () => {
		updateScroll();
		if (!userInput.value.trim() || isTyping.value) return
		sendMessage()
	}

	// 滚动到顶部处理
	const onScrollToUpper = () => {
		console.log('加载更多历史消息')
	}

	// 发送消息
	const sendMessage = async () => {
		if (!userInput.value.trim() || isTyping.value) return;
		try {
			// API调用参数
			const sendServer = {
				// 67546235c2508f5d61d3712c 原来的
				
				"assistant_id": "6756d60975a4eb3ffee02908",
				"prompt": userInput.value
			};

			// 添加用户消息
			const userMessage=({
				type: 'user',
				content: userInput.value,
			});
			messages.value.push(userMessage);

			// 发送请求
			const response = await uni.request({
				url: 'https://chatglm.cn/chatglm/assistant-api/v1/stream_sync',
				method: 'POST',
				header: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMzc0NTMwNSwianRpIjoiOWI0ODM3OTgtMGI1OC00ZjRhLTg2OGQtZjA3M2MxOTIyZjhiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFQSV82NzI0NjRhNjMxMDIzNTg1NDhjMDBhYzlfMWRjNzhhYzMiLCJuYmYiOjE3MzM3NDUzMDUsImV4cCI6MTczNDYwOTMwNSwidWlkIjoiNjc1NmQ2M2VkOGQ5ZmMwZmZhYzFjYWNlIiwidXBsYXRmb3JtIjoiIiwiYXBpX3JvbGUiOiJkZXZlbG9wZXIiLCJyb2xlcyI6WyJhdXRoZWRfdXNlciJdfQ.NMU9HeIz1DUWyxRHDMyJL-xHvijGzJhME6flw8M3-dI'
				},
				data: sendServer
			});

			// 打印原始响应以进行调试
			console.log('原始响应:', response);

			// 解析响应结果
			const resData = response?.data?.result?.output?.[0]?.content?.[0]?.text;

			// 检查是否有有效响应数据
			if (!resData) {
				console.error('未接收到有效响应数据');
				uni.showToast({
					title: '未接收到有效响应数据',
					icon: 'none'
				});
				return;
			}

			// 打印解析后的响应数据以便查看其内容
			console.log('解析后的响应数据:', resData);

			// 创建机器人消息对象并添加到消息列表中
			const botMessage = {
				type: 'bot',
				content: resData,
				displayContent: '' // 用于显示打字效果
			};
			messages.value.push(botMessage);

			// 调用 typeMessage 来启动打字效果
			typeMessage(messages.value.length - 1);

			// 清空输入框
			userInput.value = '';
			 // 将整个会话保存到Redis
			saveSessionToRedis();

		} catch (error) {
			console.error('请求失败:', error);
			uni.showToast({
				title: '发送失败',
				icon: 'none'
			});
		}
	};
	// 保存会话到Redis
	const saveSessionToRedis = async () => {
	    try {
	        const response = await uni.request({
	            url: 'http://localhost:8080/session/UpdateSession',
	            method: 'POST',
	            data: {
	                sessionId: sessionId.value,
	                messages: messages.value
	            }
	        });
	        console.log('会话保存成功:', response);
	    } catch (error) {
	        console.error('保存会话失败:', error);
	    }
	};

	// 打字效果实现
	const typeMessage = async (messageIndex) => {
		const message = messages.value[messageIndex];
		if (!message || message.type !== 'bot') return;

		isTyping.value = true;
		const fullText = message.content;
		let currentIndex = 0;

		const typeNextChar = () => {
			if (currentIndex < fullText.length) {
				// 更新显示内容
				messages.value[messageIndex].displayContent = fullText.substring(0, currentIndex + 1);
				currentIndex++;

				// 滚动到底部
				nextTick(() => {
					updateScroll();
				});

				// 继续打字
				setTimeout(typeNextChar, typingSpeed.value);
			} else {
				isTyping.value = false;
			}
		};

		// 开始打字
		typeNextChar();
	};

	// 更新滚动位置
	const updateScroll = () => {
		nextTick(() => {
			scrollTop.value = Number.MAX_SAFE_INTEGER;
		});
	};
</script>

<style scoped lang="scss">
	.container {
		padding: 20rpx;
	}

	.header {
		text-align: center;
		margin-bottom: 30rpx;
	}

	.logo {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
	}

	.version {
		font-size: 24rpx;
		margin-left: 10rpx;
	}

	.content-wrapper {
		display: flex;
		margin: 20rpx 0;
	}

	.suggestion-panel {
		width: 200rpx;
		margin-right: 20rpx;
	}

	.suggest-title {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	.suggest-item {
		display: block;
		font-size: 24rpx;
		margin-bottom: 16rpx;
		color: #666;
	}

	.chat-panel {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.chat-container {
		height: 800rpx;
		background: #fff;
		padding: 20rpx;
		border-radius: 20rpx;
		box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
	}

	.message {
		margin-bottom: 30rpx;
		display: flex;
		align-items: flex-start;
	}

	.message.user {
		justify-content: flex-end;
	}

	.bot-avatar {
		width: 80rpx;
		height: 80rpx;
		margin-right: 20rpx;
		border-radius: 40rpx;
	}

	.message-content {
		max-width: 70%;
		padding: 20rpx;
		border-radius: 16rpx;
		word-break: break-all;
		transition: all 0.1s ease-out;
	}

	.user .message-content {
		background-color: #007AFF;
		color: #fff;
	}

	.bot .message-content {
		background-color: #f0f0f0;
		position: relative;
	}

	.bot .message-content::after {
		content: '|';
		position: absolute;
		right: -2rpx;
		animation: cursor 0.8s infinite;
	}

	@keyframes cursor {

		0%,
		100% {
			opacity: 0;
		}

		50% {
			opacity: 1;
		}
	}

	.input-area {
		display: flex;
		padding: 20rpx 0;
	}

	.input {
		flex: 1;
		height: 80rpx;
		background: #fff;
		border-radius: 40rpx;
		padding: 0 30rpx;
		margin-right: 20rpx;
	}

	.send-button {
		width: 160rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		background: #007AFF;
		color: #fff;
		border-radius: 40rpx;
		font-size: 28rpx;
	}

	.tips-section {
		margin-top: 30rpx;
		padding: 30rpx;
		background: #f9f9f9;
		border-radius: 20rpx;
	}

	.tips-title {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 16rpx;
	}

	.tips-content {
		font-size: 24rpx;
		color: #666;
		line-height: 1.6;
	}

	.disclaimer {
		margin-top: 20rpx;
		font-size: 24rpx;
		color: #999;
	}
</style>