<template>
	<view class="main">
		<view>
			<video id="myVideo" :src="videoSrc" controls show-mute-btn="true" object-fit="fill" @canplay="onCanPlay"
				@pause="onPause" @ended="onEnded" @timeupdate="onTimeUpdate"></video>
		</view>
		<view v-if="isNextLesson" class="nextCourse" @click="nextLessonVideo">下一讲<image
				src="/static/mystudies/youjiantou.png"></image>
		</view>
	</view>

</template>
<script setup>
	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue';
	import {
		onReady
	} from '@dcloudio/uni-app';
	import {
		onLoad,
		onUnload
	} from '@dcloudio/uni-app';
    const studentId=ref(0)
	const videoSrc = ref('');
	const progressKey = ref(null)
	const lessonId = ref(0)
	const isNextLesson = ref(false)
	const nowVideoIndex = ref(0)
	const maxOrderIndex = ref(0)
	// 存储视频播放进度的 key
	const VIDEO_PROGRESS_KEY = 'video_progress';
	//获取课程章节页面传递的视频路径
	onLoad((options) => {
		studentId.value=uni.getStorageSync('studentId')
		console.log(typeof options.lessonId);
		if (options.orderIndex < options.maxOrderIndex) {
			isNextLesson.value = true;
			maxOrderIndex.value = options.maxOrderIndex
			nowVideoIndex.value = options.orderIndex;
		};

		lessonId.value = options.lessonId;
		videoSrc.value = options.videoUrl;
		console.log('接收到的参数:', options.videoUrl, options.lessonId);



	});


	// 获取视频上下文
	let videoContext;

	// 在页面加载完成后初始化视频上下文
	onReady(() => {
		//创建出来一个视频上下文对象
		videoContext = uni.createVideoContext('myVideo');
		//查询视频最新断点并跳转到断点播放
		fetchLatestProgressFromServer();

	});


	// 当视频准备就绪时
	const onCanPlay = () => {
		console.log('视频已准备好播放');
	};


	//每次更新时间
	let lastUpdateTime = 0;
	//当视频播放结束时，清除播放进度
	const onEnded = () => {
		// uni.removeStorageSync(VIDEO_PROGRESS_KEY + lessonId.value);
		console.log('视频播放结束，清除播放进度');
	};

	// 每次视频时间更新时，保存当前播放时间
	const onTimeUpdate = (event) => {
		console.log(progressKey.value);
		lastUpdateTime = event.detail.currentTime;
		// uni.setStorageSync(VIDEO_PROGRESS_KEY + lessonId.value, lastUpdateTime);
		console.log('视频时间更新', lastUpdateTime);
	};


	// 当视频暂停时，保存当前播放时间
	const onPause = () => {
		// uni.setStorageSync(VIDEO_PROGRESS_KEY, lastUpdateTime);
		saveProgressToServer(lastUpdateTime);
		console.log('视频暂停，保存播放进度:', lastUpdateTime);
	};

	//当离开页面触发暂停视频
	onUnload((options) => {
		saveProgressToServer(lastUpdateTime)
	});

	// 从服务器获取最新的播放进度
	async function fetchLatestProgressFromServer() {
		try {
			const response = await uni.request({
				url: 'http://localhost:8080/lessonProcess/lastUpdateTime', // 假设这是获取播放进度的 API
				method: 'GET',
				data: {
					studentId: studentId.value,
					lessonId: lessonId.value

				}
			});
			const serverProgress = response.data.data;
			if (serverProgress > 0) {
				// 更新本地存储和视频播放位置
				// uni.setStorageSync(VIDEO_PROGRESS_KEY, serverProgress);				
				videoContext.seek(serverProgress);
				setTimeout(() => {
					videoContext.play() // 延迟一段时间后播放，确保 seek 操作完成
				}, 500);
			}else{
				videoContext.play()
			}
		} catch (error) {
			console.error('获取播放进度失败:', error);
		}
		
	}


	// 异步保存播放进度到服务器
	async function saveProgressToServer(currentTime) {
		console.log('==== currentTime :', currentTime);
		try {
			await uni.request({
				url: 'http://localhost:8080/lessonProcess/updateVideoProcess', // 假设这是保存播放进度的 API
				method: 'POST',
				data: {
					studentId: studentId.value,
					lessonId: lessonId.value,
					lastUpdateTime: currentTime
				}
			});
			console.log('保存播放进度到服务器成功:', currentTime);
		} catch (error) {
			console.error('保存播放进度到服务器失败:', error);
		}
	}


	/**
	 * 切换下一个视频
	 */
	const nextLessonVideo = async () => {
		try {
			//暂停当前视频
			 videoContext.pause();
			const res = await uni.request({
				url: 'http://localhost:8080/lessonProcess/selectLessonInfo',
				method: 'GET',
				data: {
					orderIndex: nowVideoIndex.value,
					lessonId: lessonId.value
				}
			});
			if (res.data.code == 2001) {
				console.log('==== 进来了');
				const lesson1=ref({})
				  lesson1.value= res.data.data
				  console.log('====  :',lesson1.value );
				uni.navigateTo({
					url: '/pages/myStudies/courseVideo/courseVideo?videoUrl=' + lesson1.value.videoUrl + '&lessonId=' +
						lesson1.value.id + '&orderIndex=' + lesson1.value.orderIndex + '&maxOrderIndex=' + maxOrderIndex.value
				})		

			} else {
				uni.showToast({
					title: '加载失败，请稍后再试',
					icon: 'none'
				});
			}
		} catch (e) {
			console.error(e);
			console.error('Error fetching data:', e);
			uni.showToast({
				title: '网络请求失败，请检查网络连接',
				icon: 'none'
			});
		}
	}
</script>
<style>
	.main {
		position: relative;
	}

	video {
		width: 100%;
	}

	.nextCourse {
		bottom: -100rpx;
		color: #1296db;
		position: absolute;
		right: 0;
		margin-right: 20rpx;

	}

	.nextCourse image {
		position: relative;
		top: 10rpx;
		width: 30rpx;
		height: 40rpx;
	}
</style>