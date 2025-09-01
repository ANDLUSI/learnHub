<template>
  <view class="box">
    <view class="list_c" v-for="collection in collections" :key="collection.id">
      <view class="li_view">
        <view class="course_img">
          <image :src="collection.course.coverPic"></image>
        </view>
        <view class="course_text">
			<view class="title_box">
				<text class="title">{{ collection.course.courseName }}</text>
			</view>
          <view class="cansole" @click="cancel(collection.id)">取消收藏</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	const collections = ref([]);
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
	//获取收藏列表数据
	const getList = async() =>{
		const res = await uni.request({
		  url: 'http://localhost:8080/collection/find',
		  method: 'GET',
		  data: {
			studentId: studentId.value,
		  },
		});
		if(res.data.message==="操作成功"){
			collections.value = res.data.data;
			console.log(collections.value);
		}else{
			uni.showToast({
			  title: '暂无数据',
			  icon: 'none'
			});
		};
	}
	
	//取消收藏
	const cancel = async (id) =>{
		const res = await uni.request({
		  url: 'http://localhost:8080/collection/del',
		  method: 'GET',
		  data: {
			id: id,
		  },
		});
		if(res.data.message==="操作成功"){
			getList();
			uni.showToast({
			  title: '取消收藏成功',
			  icon: 'none'
			});
		}else{
			uni.showToast({
			  title: '暂无数据',
			  icon: 'none'
			});
		};
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
	.title_box{
		width: 500rpx;
		height: 70rpx;
	}
	.cansole{
		margin-top: 20px;
		background-color:indianred;
		padding: 10rpx 10rpx;
		color: white;
		font-size: 28rpx;
		border-radius: 5px;
	}
</style>
