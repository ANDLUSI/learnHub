<template>
	<view>
		<view class="header">
			<view class="title">{{titleName}}</view>
			<view class="learnedProgress">已学<text>{{learnedProgress}}%</text></view>
			<button size="mini" @click="dropCourse" v-if="isDrop"  >退课</button>
			<uni-badge v-if="showRedD" class="uni-badge-left-margin" text="1" is-dot="true" size="normal" />
		</view>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" styleType="text" activeColor="#007aff"
				inActiveColor="#b0b0b0" @clickItem="onClickItem" />
		</view>
		<view v-if="current === 0" class="course-content">
			<uni-section>
				<uni-collapse accordion :activeNames="activeNames" @change="change">
					<uni-collapse-item v-for="item in chapters" :key="item.id"
						:title="'第'+numberToChinese(item.orderIndex)+'章：'+item.chapterName" :name="item.chapterId">
						<view class="content">
							<uni-list>
								<uni-list-item v-if="isLessons>0" v-for="item2 in lessons" :key="item2.id"
									:border="false"
									:title=" item.orderIndex+'.'+item2.lesson.orderIndex+item2.lesson.lessonName"
									clickable="true"
									@click="toVideoPage(item.orderIndex,item2.lesson.videoUrl,item2.lesson.id,item2.lesson.orderIndex,lessons[lessons.length-1].lesson.orderIndex)">

									<template v-slot:header>
										<image class="slot-image" src="/static/mystudies/video_logo.png"
											mode="widthFix"></image>
									</template>
									<template v-slot:footer>
										<l-circle class="progress" size="20px" :percent="item2.watchedProcess*100">

										</l-circle>
									</template>
								</uni-list-item>


							</uni-list>

						</view>
						<view class="notLesson" v-if="isLessons==0">暂无课时内容</view>
					</uni-collapse-item>

				</uni-collapse>
			</uni-section>
		</view>



		<view v-if="current === 1" >
			<view>

			</view>
           <view class="notLesson" style="margin-top: 60rpx;" v-if="haveLive==false">暂无直播信息</view>
		</view>


	</view>

</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';

	uni.setNavigationBarTitle({
		title: '我的课程'
	})
	
	
	const isDrop=ref(true)
	const activeNames = ref([])
	const current = ref(0)
	const items = ref(['课程', '直播'])
    const studentId=ref(null) 
	const haveLive=ref(false)
	const showRedD = ref(false)
	const titleName=ref('')
	const onClickItem = async (e) => {
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex
			if(e.currentIndex==1&&haveLive.value) {
				uni.navigateTo({
					url: '/pages/live/live',
				
				});
			};
		}
	}

	/**
	 * 接收上个页面携带的参数
	 */
	
	onMounted(() => {
           
	})

	const courseId = ref();
	onLoad((options) => {
		titleName.value=options.courseName
		studentId.value=uni.getStorageSync('studentId')
		courseId.value = options.id;
		console.log('接收到的参数:', options.id);
		findLiveStatus()
		findisDrop()
		selectCourseProcess()
		showChapter();
	});
	const learnedProgress = ref(0)

	//章节变量
	const chapters = ref([{}]);
	//课时变量
	const lessons = ref([{}]);

	const isLessons = ref(0);
   
   
  

	/**
	 * 查询课程学习进度
	 */
	const selectCourseProcess = async () => {
		try {
			const res = await uni.request({
				url: 'http://localhost:8080/studentCourse/selectCourseProcess',
				method: 'GET',
				data: {
					studentId:studentId.value,
					courseId: courseId.value
				}
			});
			if (res.data != null) {
				learnedProgress.value = res.data 

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



	/**
	 * 显示课程章节
	 */
	const showChapter = async () => {
		try {
			const res = await uni.request({
				url: 'http://localhost:8080/chapter/findChapters',
				method: 'GET',
				data: {
					courseId: courseId.value
				}
			});
			if (res.data.code == 2001) {
				chapters.value = res.data.data

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


	const chapterId = ref()
	/**
	 * 切换章节渲染对应章节课时
	 */
	const change = async (e) => {

		//获取章节的id值
		chapters.value.forEach((item, i) => {
			if (e.length > 0) {
				if (e == i) {
					chapterId.value = item.id
					console.log(chapterId.value);

				};
			}

		})
		const res = await uni.request({
			url: 'http://localhost:8080/lessonProcess/findAllLessonProcess',
			method: 'GET',
			data: {
				courseId: courseId.value,
				chapterId: chapterId.value
			}
		});

		if (res.data.code == 2001 && res.data.data != null) {
			console.log(res.data.data);
			lessons.value = res.data.data;
			isLessons.value = lessons.value.length
		} else {
			uni.showToast({
				title: '查询失败了！'
			});
		}

	}

	//课时跳转视频
	const toVideoPage = async(chapter,url, lessonId, orderIndex, maxOrderIndex) => {
		if(isDrop.value&&chapter>1) {		
				uni.showModal({
					content: '你将无法退课?',
					success: (res) => {
						if(res.confirm==true) {
						 modifyIdDrop();
						 // 使用时创建一个包含所有参数的对象
						 uni.navigateTo({
						 	url: '/pages/myStudies/courseVideo/courseVideo?videoUrl=' + url + '&lessonId=' + lessonId +
						 		'&orderIndex=' + orderIndex + '&maxOrderIndex=' + maxOrderIndex
						 });
						}
					},
					})
		}else{
			// 使用时创建一个包含所有参数的对象
			uni.navigateTo({
				url: '/pages/myStudies/courseVideo/courseVideo?videoUrl=' + url + '&lessonId=' + lessonId +
					'&orderIndex=' + orderIndex + '&maxOrderIndex=' + maxOrderIndex
			});
		}
		
		
	}


 /**
	* 查询是否可以退课
	*/
    const findisDrop=async()=>{
		const res=await uni.request({
			url: 'http://localhost:8080/studentCourse/findIsDrop',
			method: 'GET',
			data: {
				studentId:studentId.value,
				courseId:courseId.value
			},
			
		});
		if(res.data!=1) {
			isDrop.value=false;
		};
	}
  
  /**
   * 修改退课状态
   */
  const modifyIdDrop= async()=>{
	  const res = await uni.request({
	  	url: 'http://localhost:8080/studentCourse/modifyIsDrop',
	  	method: 'GET',
	  	data: {
	  		studentId: studentId.value,
	  		courseId: chapterId.value
	  	}
	  });
	 
  
  }
  
   /**
	* 退课
	*/
	const dropCourse = async () => {
		uni.showModal({
			title: '',
			content: '您确定要退选该课程吗？退课后将无法恢复，并且退款将原路返回',
			success: async(res) => {
				if (res.confirm == true) {
					try {
						// 显示加载提示
						uni.showLoading({
							title: '正在处理...'
						});

						const res = await uni.request({
							url: 'http://localhost:8080/studentCourse/dropCourse',
							method: 'GET',
							data: {
								studentId: studentId.value,
								courseId: courseId.value
							},
						});
						// 隐藏加载提示
						uni.hideLoading();
						if (res.data.code == 2001) {
							uni.showToast({
								title: '退课成功!退款原路返回',
								icon: 'success'
							});
							  
								   uni.reLaunch({
								   	url: '/pages/myStudies/myStudies'
								   
								   });	
							
						} else {
							uni.showToast({
								title: '退课失败!',
								icon: 'error'
							});
						}

					} catch (error) {
						uni.showToast({
							title: '网络请求错误!',
							icon: 'exception'
						});
					}


				} else {

				}
			}
		})


	}
  
  /**
   * 查询直播状态
   */
  const findLiveStatus=async()=>{
	  try {
	  const res=await uni.request({
	  		url: 'http://localhost:8080/course/selectLiveStatus',
	  		method: 'GET',
	  		data: {
				courseId:courseId.value
			},

	  	});
		
		if(res.data==1){
			showRedD.value=true
			haveLive.value=true
		}
	  } catch (error) {
	  	//TODO handle the exception
	  }
  }

	// 在 定义辅助函数
	function numberToChinese(num) {
		const chineseNums = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
		if (num == null) {
			console.warn('传入的数字为 undefined 或 null');
			return ''; // 或者返回其他默认值
		}
		if (num >= 0 && num <= 10) {
			return chineseNums[num];
		} else if (num > 10 && num <= 19) {
			return '十' + chineseNums[num - 10];
		} else if (num >= 20 && num <= 99) {
			const tens = Math.floor(num / 10);
			const units = num % 10;
			return chineseNums[tens] + '十' + (units === 0 ? '' : chineseNums[units]);
		} else {
			return num.toString(); // 超出范围时返回原数字
		}
	}
</script>

<style>
	.header {
		background-image: linear-gradient(135deg, #3581df, #8789f5);	
		height: 300rpx;
		position: relative;
	}

	uni-collapse-item {
		height: auto;
		/* 确保高度根据内容自动调整 */
		min-height: 0;
		/* 移除可能的最小高度限制 */
	}

	.slot-image {
		width: 40rpx;
		margin-right: 40rpx;
		margin-left: 30rpx;
	}

	.progress {
		font-size: 4px;
		margin-right: 10rpx;
	}

	.learnedProgress {
		color: #fff;
		font-size: 25rpx;

	}

	.header>.title {
		font-weight: 500;
		color: #fff;
		margin-left: 40rpx;
		padding-top: 60rpx;
	}

	.header button {
		position: absolute;
		right: 0;
		border-style: none;
	}

	.learnedProgress {
		margin-top: 100rpx;
		margin-left: 40rpx;
	}

	.learnedProgress text {
		margin-left: 10rpx;
		font-size: 16px;
	}

	.notLesson {
		height: 80rpx;
		line-height: 80rpx;
		color: indianred;
		font-size: 26rpx;
		text-align: center;
	}

	.uni-badge-left-margin {
		position: relative;
		left: 80%;
		top: 20%;


	}
</style>