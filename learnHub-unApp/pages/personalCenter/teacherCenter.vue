<template>
	<view class="box">
		<view class="top">
			<image src="../../static/personCenter/back.png" class="background-image"></image>
			<view class="person_view" v-show="loginFlag">
				<view class="headP">
					<image :src="teacher.data.teacherHeadphone || 'https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/06/1733487956203.png'"></image>
				</view>
				<view class="personText">
					<view class="name_p">{{ teacher.data.teacherName }}</view>
<!-- 					<view>
						<image src="../../static/personCenter/修改.png" class="modify_btn"></image>
					</view> -->
				</view>
			</view>
      <!-- 未登录提示 -->
      <view class="toLogin" @click="toLogin" v-show="!loginFlag">
        您还未登录，去登录
      </view>
		</view>
		<view class="bottom">
			<view class="li_box">
				<view @click="toTeacherC">
					<image src="../../static/personCenter/订单.png" class="sm_img"></image>
					我教的课
					<image src="../../static/personCenter/右箭头.png" class="sm_img_right"></image>
				</view>
				<view @click="toaddCourse">
					<image src="../../static/personCenter/我的课程.png" class="sm_img"></image>
					新增课程
					<image src="../../static/personCenter/右箭头.png" class="sm_img_right"></image>
				</view>
				<view @click="toLive">
					<image src="../../static/personCenter/直播.png" class="sm_img"></image>
					发起直播
					<image src="../../static/personCenter/右箭头.png" class="sm_img_right"></image>
				</view>
				<view @click="outLogin">
				  <image src="../../static/personCenter/退出.png" class="sm_img"></image>
				  退出登录
				  <image src="../../static/personCenter/右箭头.png" class="sm_img_right"></image>
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
	//老师对象
	const teacher = ref({
		data: {
		  teacherName: '',
		  teacherHeadphone: '' ,
		}
	});
	//是否登录标志
	const loginFlag = ref(false);


	// 页面挂载时调用 findById 函数
	onMounted(() => {
	  if (teacher.value) {
	    findById();
	  }
	});
	// 获取老师信息
	const findById = async () => {
	  const res = await uni.request({
	    url: 'http://localhost:8080/teacher/findTeacherById',
	    method: 'GET',
	    data: {
	      teacherId: teacherId.value
	    }
	  });

	  if (res.data.message === "操作成功") {
	    teacher.value.data = res.data.data;  // 更新老师信息
	    uni.showToast({
	      title: '登录成功',
	      icon: 'none'
	    });
		//将直播secretKey存起来
		uni.setStorageSync('secretKey', res.data.data.secretKey)
		//修改登录状态
	    loginFlag.value = true;
	  } else {
	    uni.showToast({
	      title: '当前处于未登录状态',
	      icon: 'none'
	    });
	  }
	}


	const toTeacherC = () =>{
		uni.navigateTo({
		  url: '/pages/personalCenter/teacherCourse'
		});
	}
	const toLogin = () =>{
		uni.navigateTo({
		  url: '/pages/loginAndReg/index'
		});
	}
	const toaddCourse = () =>{
		uni.navigateTo({
		  url: '/pages/personalCenter/teacherAddCourse'
		});
	}
	const toLive = () =>{
		uni.navigateTo({
		  url: '/pages/live/live-info'
		});
	}

	//退出登录
	const outLogin = async () =>{
		uni.showToast({
		  title: '退出登录',
		  icon: 'none'
		});
		uni.setStorageSync('studentId', '')
		uni.setStorageSync('teacherId', '')
		uni.setStorageSync('secretKey', '')
		loginFlag.value = false;
		teacher.data = '{}'
	}

</script>

<style scoped lang="scss">
.box{
	width: 100%;
	height: 100%;
}
.top{
	position: relative;
	width: 100%;
	height: 460rpx;
}
.background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1; /* 确保图片在内容之后 */
}
.bottom{
	height: 910rpx;
}
.li_box{
	padding: 0rpx;
}
.li_box view{
	background-color: white;
	padding-left: 50rpx;
	height: 120rpx;
	width: 100%;
	line-height: 120rpx;
	border-bottom: 0.1rpx solid lightgray;
}
.sm_img {
    float: left;
    margin-top: 35rpx; /* 如果需要顶部偏移，可以使用 margin */
	margin-right: 26rpx;
    width: 50rpx; /* 使用 rpx 单位 */
    height: 50rpx; /* 使用 rpx 单位 */
}
.sm_img_right {
    float: right;
    margin-top: 35rpx; /* 如果需要顶部偏移，可以使用 margin */
	margin-right: 100rpx;
    width: 50rpx; /* 使用 rpx 单位 */
    height: 50rpx; /* 使用 rpx 单位 */
}
.headP image{
	border-radius: 15px;
	width: 150rpx;
	height: 150rpx;
}
.headP{
	float: left;
}
.personText{
	padding-top: 20px;
	padding-left: 10px;
	float: left;
	color: white;
	font-weight: bold;
	font-size: 25px;
}
.person_view{
	position: absolute;
	top: 130px;
	left: 100rpx;
	width: 100%;
	height: 150rpx;
	// display: none;
}
.modify_btn{
	position: absolute;
	left: 460rpx;
	bottom: 35px;
	width: 25px;
	height: 25px;
}
.name_p{
	overflow: hidden;
	width:280rpx;
}
.toLogin{
	font-weight: bold;
	color: white;
	left: 150rpx;
	bottom: 35px;
	position: absolute;
	text-align: center;
	border-radius: 40rpx;
	height: 100rpx;
	line-height: 100rpx;
	width: 430rpx;
	background-color: #99CC99;
}
</style>
