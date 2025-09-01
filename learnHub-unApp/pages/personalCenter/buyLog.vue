<template>
	<view class="box">
		<view class="titlt">
			<text>课程名</text>
			<text>价格</text>
			<text>购买时间</text>
		</view>
		<view class="li_view" v-for="course in courses">
			<view>{{course.courseName}}</view>
			<view>{{course.coursePrice}}</view>
			<view>{{course.courseBuyDate}}</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	const courses = ref([]);
	const studentId = ref("");
	//获取登陆人id
	studentId.value = uni.getStorageSync('studentId')
	
	
	// 页面挂载时调用 getList 函数
	onMounted(() => {
	  if (studentId.value) {
	    getList();
	  } else {
	    uni.showToast({
	      title: '缺少学生ID，请检查参数。',
	      icon: 'none'
	    });
	  }
	});
	//获取订单列表数据
	const getList = async() =>{
		const res = await uni.request({
		  url: 'http://localhost:8080/order/selOrder',
		  method: 'GET',
		  data: {
			studentId: studentId.value,
		  },
		});
		if(res.data.message==="操作成功"){
			courses.value = res.data.data;
		}else{
			uni.showToast({
			  title: '暂无数据',
			  icon: 'none'
			});
		};
	}
</script>

<style scoped lang="scss">
	.titlt text{
		margin-right: 130rpx;
	}
	.li_view{
		// background-color: aliceblue;
		height:100rpx;
		width: 100%;
		border-bottom: 1rpx solid whitesmoke;
	}
	.li_view view{
		float: left;
		/* background-color: red; */
		overflow: hidden;
		width: 220rpx;
		margin-right: 20rpx;
		font-size: 28rpx;
		height:100rpx;
		line-height:100rpx ;
	}    
</style>
