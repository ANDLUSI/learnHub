<template>
	<view class="box">
		<view class="list_c">
			<view v-for="course in courses" class="li_view" @click="toEdit(course.id)">
				<view class="course_img">
					<image :src="course.coverPic || '../../static/personCenter/课程图片.png'"></image>
				</view>
				<view class="course_text">
					<view class="title">{{course.courseName}}</view>
					<view class="teacher">{{course.applicationPeople}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	
	//老师id
	const teacherId = ref('');
	//获取登陆人id
	teacherId.value = uni.getStorageSync('teacherId')
	
	//课程数组
	const courses = ref([]);
	
	
	
	// 页面挂载时调用 findById 函数
	onMounted(() => {
	  if (teacherId.value) {
	    findById();
	  } else {
	    uni.showToast({
	      title: '缺少老师ID，请检查参数。',
	      icon: 'none'
	    });
	  }
	});
	// 获取课程信息
	const findById = async () => {
	  const res = await uni.request({
	    url: 'http://localhost:8080/teacher/findCourseByTeacherId',
	    method: 'GET',
	    data: {
	      teacherId: teacherId.value
	    }
	  });
	
	  if (res) {
	    courses.value = res.data;  // 更新课程信息
	    uni.showToast({
	      title: '查询成功',
	      icon: 'none'
	    });

	  } else {
	    uni.showToast({
	      title: '查询失败',
	      icon: 'none'
	    });
	  }
	}
	
	
	
	const toEdit = (courseId) =>{
		uni.navigateTo({
		  url: '/pages/personalCenter/teacherEditCoures?courseId='+courseId
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
