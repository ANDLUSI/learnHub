<template>
	<view class="box">
		<view class="list_c">
			<view class="li_view" v-for="course in courses" @click="toStudy(course.id)">
				<view class="course_img">
					<image :src="course.coverPic"></image>
				</view>
				<view class="course_text">
					<view class="title">{{course.courseName}}</view>
					<view class="teacher">教学老师：{{course.teacherName}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	
	import { ref, onMounted } from 'vue';
	
	//学生id
	const studentId = ref('');
	//获取登陆人id
	studentId.value = uni.getStorageSync('studentId')
	
	//课程数组
	const courses = ref([]);
	
	
	
	// 页面挂载时调用 findById 函数
	onMounted(() => {
	  if (studentId.value) {
	    findById();
	  } else {
	    uni.showToast({
	      title: '缺少学生ID，请检查参数。',
	      icon: 'none'
	    });
	  }
	});
	
	const findById = async () => {
		try {
			const res = await uni.request({
				url: 'http://localhost:8080/studentCourse/findAllByStuId',
				method: 'GET',
				data: {
					studentId: studentId.value
				}
			});
			if (res.data.code == 2001) {
				courses.value = res.data.data
			} else {
				uni.showToast({
					title: '加载失败，请稍后再试',
					icon: 'none'
				});
			}
		} catch (e) {
			console.error(e);
			console.error('Error fetching data:', e);
		}
	}
	
	//跳转学习页面
	const toStudy = (id) => {
	  uni.navigateTo({
	    url: '/pages/myStudies/courseDetails/courseDetails?id='+id
	  });
	}
</script>

<style scoped lang="scss">
	.li_view{
		width: 100%;
		height: 200rpx;
		border-bottom: 0.5rpx solid lightgray ;
	}
	.course_img{
		float: left;
		width: 320rpx;
		height: 100rpx ;
	
	}
	.course_text{
		padding-top: 10px;
		float: left;
		width: 140rpx;
		height: 100rpx ;
	}
	.course_img image{
		margin-top: 10rpx;
		margin-left: 5rpx;
		width: 300rpx;
		height: 180rpx ;
		border-radius: 25rpx;
	}
	.title{
		overflow: hidden;
		margin-top: -10rpx;
		width: 440rpx;
		height: 100rpx;
		font-weight: bold;
	}
	.teacher{
		overflow: hidden;
		width: 440rpx;
		height: 80rpx;
		font-size: 28rpx;
	}
</style>
