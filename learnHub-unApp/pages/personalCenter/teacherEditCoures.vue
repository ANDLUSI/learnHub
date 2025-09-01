<template>
	<view class="box">
		<view class="btn_box">
			<text class="addC_btn" @click="toAddC">新增章节</text>
			<text class="addH_btn" @click="toAddL">新增课时</text>
		</view>
		<view class="btn2_box">
			
		</view>
		<uni-section :title="course.data.courseName" type="line">
			<uni-collapse >
				<uni-collapse-item v-for="chapter in course.data.chapterList" :title="chapter.orderIndex + '-' +chapter.chapterName " :show-animation="true">
					<view class="delC_btn" @click="delP(chapter.id)">删除章节</view>
					
					<view class="content">
						<view v-for="lesson in chapter.lessonList">
						<text class="del_btn" @click="delL(lesson.id)">删除</text>
						{{lesson.orderIndex}}
						.
						{{lesson.lessonName}}
						</view>
					</view>			
				</uni-collapse-item>
			</uni-collapse>
		</uni-section>
	</view>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

	//课程Id
	const courseId = ref('');
	//课程对象
	const course = ref({});
	
	const form = ref({});

	// 接收传来的参数
	onLoad((options) => {
	  console.log('接收到的参数:', options.courseId);
	  courseId.value = options.courseId;  // 直接赋值给 form 的 courseId
	  console.log('表单的的参数:', form.courseId);
	});

	
	// 获取课程信息
	const findById = async () => {
	  const res = await uni.request({
	    url: 'http://localhost:8080/edit/findByCourseId',
	    method: 'GET',
	    data: {
	      courseId: courseId.value
	    }
	  });
	
	  if (res.data.message === "操作成功") {
	    course.value.data = res.data.data;  // 更新课程信息
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
	//页面挂载时获取数据
	onMounted(() => {
		findById();
	});
	
	// 删除章节
	const delP = async (id) => {
	  const res = await uni.request({
	    url: 'http://localhost:8080/edit/delChapter',
	    method: 'GET',
	    data: {
	      id: id
	    }
	  });
	
	  if (res.data.message === "操作成功") {
	    course.value.data = res.data.data;  // 更新课程信息
	    uni.showToast({
	      title: '删除成功',
	      icon: 'none'
	    });
	   
	  } else {
	    uni.showToast({
	      title: '删除失败',
	      icon: 'none'
	    });
	  }
	  findById();
	}
	
	// 删除课时
	const delL = async (id) => {
	  const res = await uni.request({
	    url: 'http://localhost:8080/edit/delLesson',
	    method: 'GET',
	    data: {
	      id: id
	    }
	  });
	
	  if (res.data.message === "操作成功") {
	    course.value.data = res.data.data;  // 更新课程信息
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
	   findById();
	}
	
	
	// 跳转到新增章节页面
	const toAddC = () => {
	  uni.navigateTo({
	    url: '/pages/personalCenter/addChapter?courseId='+courseId.value
	  });
	}
	// 跳转到新增课时页面
	const toAddL = () => {
	  uni.navigateTo({
	    url: '/pages/personalCenter/addLesson?courseId='+courseId.value
	  });
	}
</script>

<style scoped lang="scss">
.content {
  height: auto;
  line-height: 80rpx;
  padding-left: 80rpx;
  margin-bottom: 10rpx; // 添加间距以区分各个课时
  // background-color: yellow;
  border-bottom: 0.1rpx dashed whitesmoke;
}
.del_btn{
	margin-left: -50rpx;
	padding: 10rpx 10rpx;
	background-color: #FF6666;
	color: white;
	font-weight: bold;
	border-radius: 12rpx;
	font-size: 20rpx;
	width: 30px;
	height: 20px;
}
.delC_btn{
	font-weight: bold;
	margin-left: 30rpx;
	margin-bottom: 10rpx;
	color: white;
	text-align: center;
	border-radius: 12rpx;
	padding: 6rpx 0rpx;
	font-size: 20rpx;
	width: 140rpx;
	background-color: #FF6666;
}

.addC_btn{
	font-weight: bold;
	color: white;
	text-align: center;
	border-radius: 12rpx;
	padding: 10rpx 10rpx;
	font-size: 35rpx;
	width: 140rpx;
	background-color: lightblue;
}
.addH_btn{
	margin-left: 250rpx;
	font-weight: bold;
	color: white;
	text-align: center;
	border-radius: 12rpx;
	padding: 10rpx 10rpx;
	font-size: 35rpx;
	width: 140rpx;
	background-color: #99CCFF;
}
.btn_box{
	margin-top: 30rpx;
	margin-left: 20rpx;
	margin-bottom: 40rpx;
}

	       
</style>
