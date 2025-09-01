<template>
	<view class="course-detail">
		<!-- 顶部图片 -->
		<image class="course-image" :src="course.course.coverPic" mode="widthFix"></image>

		<!-- 课程标题和信息 -->
		<view class="course-info">
			<view class="course-title">
				<text class="title">{{course.course.courseName}}</text>
				<text class="tag" v-text="title"></text>
			</view>
			<view class="course-university">
				<image class="university-logo" src="../../static/index/university-logo.png" mode="widthFix"></image>
				<text class="university-name">深受清华学生喜爱的课程</text>
				<text class="enrollment">182191人已报名</text>
			</view>
			<view class="course-description">
				<text>{{course.course.courseFeature}}</text>
			</view>
		</view>

		<!-- 开课班级 -->
		<view class="class-info">
			<text class="class-title">开课班级</text>
			<text class="class-date">2024.07.25 ~ 2025.01.14</text>
		</view>

		<!-- 教师团队 -->
		<view class="teacher-team">
			<text class="team-title">教师团队</text>
			<view class="teacher-item">
				<image class="teacher-image" :src="course.teacher.teacherHeadphone" mode="widthFix"></image>
				<view class="teacher-info">
					<text class="teacher-name">{{course.teacher.realName}}</text>
					<text class="teacher-position">{{course.teacher.teacherDescription }}</text>
					<!-- <text class="teacher-description">{{ teacher.description }}</text> -->
				</view>
			</view>
		</view>

		<!-- 报名按钮 -->
		<view class="enroll-button">
			<!-- 收藏按钮 -->
			<view class="collection_btn" @click="addCollection()">
				<image class="collection_img" :src="!flag ? 'https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/08/1733662472702.png' : 'https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/08/1733662844059.png'"></image>
			</view>
			<view class="money">
				金额:{{course.course.coursePrice}}
			</view>
			<button class="enroll-btn" @click="enroll">立即购买</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	const course = ref({});
	const categoryId = ref(null);
	const list = ref([{}]);
	const title = ref('');
	onLoad(async (options) => {
		courseId.value = options.id;
		console.log('==== options.titie :', options.title);
		title.value = options.title
		uni.setNavigationBarTitle({
			title: options.title
		})
		try {
			const response = await uni.request({
				url: 'http://localhost:8080/course/courseInfo',
				method: 'GET',
				data: {
					id: options.id, // 确保传递了 categoryId 参数
				}

			});
			if (response.data.code == 1001) {
				course.value = response.data.data;
				console.log(response);


			} else {
				console.error("没找到课程", response.data.message);
				error.value = new Error(
					`HTTP Status: ${response.statusCode}, Message: ${response.data.message}`);
			}
		} catch (err) {
			// 确保捕获到的是原始错误对象
			if (err._rawValue !== undefined) {
				err = err._rawValue;
			}
			console.error('错误的请求:', err);
			error.value = err;



		}



	});

	// // 教师团队数据
	// const teachers = ref([{
	// 		name: '李正风',
	// 		position: '清华大学社会科学学院,教授',
	// 		description: '清华大学社会科学学院副院长，科技与社会研究所教授。中国发展战略学研究会副理事长，中国科...',
	// 		image: '../../static/index/teacher1.jpg'
	// 	},
	// 	{
	// 		name: '王前',
	// 		position: '清华大学社会科学学院,教授',
	// 		description: '清华大学社会科学学院教授，科技与社会研究所教授。中国发展战略学研究会副理事长，中国科...',
	// 		image: '../../static/index/teacher2.jpg'
	// 	}
	// ]);

	// 报名按钮点击事件
	const enroll = async() => {
		try {
			const res=await uni.request({
				url: 'http://localhost:8080/order/add',
				method: 'POST',
				data: {
					studentId:studentIdC.value,
					courseId:courseId.value,				
					coursePrice:course.value.course.coursePrice,
					teacherId:course.value.teacher.teacherId			
				},		
			});
			if(res.data.code==2001) {
				uni.showToast({
					title: '购买成功！',
					icon: 'success'
				});
			}else{
				
				uni.showToast({
					title: '购买成功！',
					icon: 'none'
				});
			}
			
		} catch (error) {
			//TODO handle the exception
			uni.showToast({
				title: '网络异常！请稍后重试',
				icon: 'exception'
			})
		}
		
	};
	
	// 页面挂载时调用 findCollection 函数
	onMounted(() => {
		studentIdC.value = uni.getStorageSync('studentId');
		findCollection();
	});
	//获取学生id
	const studentIdC = ref('')
	const courseId = ref('');
	//收藏记录id
	const collectionId = ref('');
	//课程是否被收藏标志
	const flag = ref(false);
	
	//查询课程是否被收藏
	const findCollection = async () => {
		const formData = {
		  studentId:studentIdC.value,
		  courseId:courseId.value
		};
	  const res = await uni.request({
	    url: 'http://localhost:8080/collection/findCollection',
	    method: 'post',
	    data: formData
	  });
	  if (res.data.message === "操作成功") {
		  collectionId.value = res.data.data.id;
		  console.log("这是查回来的id"+res.data.data.id);
		  flag.value = true;
	  }
	}
	
	//新增收藏
	const addCollection = async () => {
		if(flag.value){
			//调用取消方法
			const res = await uni.request({
			  url: 'http://localhost:8080/collection/del',
			  method: 'get',
			  data: {
				  id:collectionId.value
			  },
			  header: {
			    'content-type': 'application/x-www-form-urlencoded'
			  }
			});
			if (res.data.message === "操作成功") {
					uni.showToast({
					  title: '取消收藏成功',
					  icon: 'none'
					});
				  flag.value = false;
			}
			return;
		}
		
		const formData = {
		  studentId:studentIdC.value,
		  courseId:courseId.value
		};
	  const res = await uni.request({
	    url: 'http://localhost:8080/collection/add',
	    method: 'post',
	    data: formData
	  });
	  if (res.data.message === "操作成功") {
	    flag.value = true;
		uni.showToast({
		  title: '收藏成功',
		  icon: 'none'
		});
	  }
	}
</script>

<style scoped>
	.course-detail {
		padding: 20px;
	}

	.course-image {
		width: 100%;
		height: 300px;
	}

	.course-info {
		margin-top: 20px;
	}

	.title {
		font-size: 20px;
		font-weight: bold;
	}

	.tag {
		background-color: #ff4500;
		color: #fff;
		padding: 5px 15px;
		border-radius: 20px;
		margin-left: 10px;
	}

	.university-logo {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin-right: 10px;
	}

	.university-name {
		font-size: 20px;
		margin-right: 10px;
	}

	.enrollment {
		color: #666;
	}

	.course-description {
		margin-top: 20px;
		font-size: 18px;
		color: #666;
	}

	.class-info {
		margin-top: 30px;
		border-top: 1px solid #ddd;
		padding-top: 20px;
	}

	.class-title {
		font-size: 20px;
		font-weight: bold;
	}

	.class-date {
		color: #666;
		margin-top: 10px;
	}

	.teacher-team {
		margin-top: 30px;
		border-top: 1px solid #ddd;
		padding-top: 20px;
	}

	.team-title {
		font-size: 20px;
		font-weight: bold;
	}

	.teacher-item {
		display: flex;
		margin-top: 20px;
	}

	.teacher-image {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin-right: 20px;
	}

	.teacher-info {
		flex: 1;
	}

	.teacher-name {
		font-size: 20px;
		font-weight: bold;
	}

	.teacher-position {
		margin-top: 10px;
		color: #666;
	}

	/* 	.teacher-description {
		margin-top: 10px;
		color: #666;
	} */

	.enroll-button {
		margin-top: 30px;
		display: flex;
	}

	.money {
		/* border: 1px solid red; */
		width: 100rpx;
		height: 100rpx;
		margin-top: 10px;
		font-size: 18px;
		color: #ff4500;
	}

	.enroll-btn {
		width: 170px;
		height: 50px;
		background-color: #2877f2;
		color: #fff;
		border-radius: 25px;
		font-size: 18px;
		font-weight: bold;
		margin-right: 10px;


	}
	
	.collection_btn{
		width: 80rpx;
		height: 80rpx;
		position:absolute;
		left: 280rpx;
	}
	.collection_btn image{
		width: 80rpx;
		height: 80rpx;
	}
</style>