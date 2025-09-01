<template>
  <view class="box">
    <view class="top">
      <!-- 背景图 -->
      <image src="../../static/personCenter/back.png" class="background-image"></image>
      
      <!-- 个人信息展示部分 -->
      <view class="person_view" v-show="loginFlag">
        <view class="headP">
          <image :src="student.data.studentHeadphone || 'https://learnhub.oss-cn-beijing.aliyuncs.com/images/2024/12/05/1733378526228.png'"></image>
        </view>
        <view class="personText">
          <view class="name_p">{{ student.data.studentName }}</view>
          <view @click="toModify">
            <image src="../../static/personCenter/修改.png" class="modify_btn"></image>
          </view>
        </view>
      </view>

      <!-- 未登录提示 -->
      <view class="toLogin" @click="toLogin" v-show="!loginFlag">
        您还未登录，去登录
      </view>
    </view>

    <view class="bottom">
      <view class="li_box">
        <view @click="toCollection">
          <image src="../../static/personCenter/收藏夹.png" class="sm_img"></image>
          我的收藏夹
          <image src="../../static/personCenter/右箭头.png" class="sm_img_right"></image>
        </view>
        <view @click="toMyCourse">
          <image src="../../static/personCenter/我的课程.png" class="sm_img"></image>
          我的课程
          <image src="../../static/personCenter/右箭头.png" class="sm_img_right"></image>
        </view>
        <view @click="toBuyLog">
          <image src="../../static/personCenter/订单.png" class="sm_img"></image>
          购买记录
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

const studentId = ref('');
const teacherId = ref('');
//获取登陆人id
studentId.value = uni.getStorageSync('studentId')
teacherId.value = uni.getStorageSync('teacherId')

//判断当前登陆人身份跳转对应页面
if(teacherId.value!=''){
	console.log("==========="+teacherId);
	// uni.navigateTo({
	//   url: '/pages/personalCenter/teacherCenter'
	// });
	uni.reLaunch({ url: '/pages/personalCenter/teacherCenter' })
}

const student = ref({
  data: {
    studentName: '',
    studentHeadphone: ''  // 默认头像路径为空
  }
});

const loginFlag = ref(false);

// 获取学生信息
const findById = async () => {
  const res = await uni.request({
    url: 'http://localhost:8080/user/findById',
    method: 'GET',
    data: {
      studentId: studentId.value
    }
  });

  if (res.data.message === "操作成功") {
    student.value.data = res.data.data;  // 更新学生信息
    uni.showToast({
      title: '登录成功',
      icon: 'none'
    });
    loginFlag.value = true;
  } else {
    uni.showToast({
      title: '当前处于未登录状态',
      icon: 'none'
    });
  }
}

// 页面挂载时调用 findById 函数
onMounted(() => {
  if (studentId.value) {
    findById();
  } 
});

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
		student.data = '{}'
	}

// 跳转到我的收藏页面
const toCollection = () => {
  uni.navigateTo({
    url: '/pages/personalCenter/collection'
  });
}

// 跳转到我的课程页面
const toMyCourse = () => {
  uni.navigateTo({
    url: '/pages/personalCenter/myCourse'
  });
}

// 跳转到购买记录页面
const toBuyLog = () => {
  uni.navigateTo({
    url: '/pages/personalCenter/buyLog'
  });
}

// 跳转到修改个人信息页面
const toModify = () => {
  uni.navigateTo({
    url: '/pages/personalCenter/modifyStudnet'
  });
}

// 跳转到登录页面
const toLogin = () => {
  uni.navigateTo({
    url: '/pages/loginAndReg/index'
  });
}
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
}

.top {
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
  z-index: -1;
}

.bottom {
  height: 910rpx;
}

.li_box {
  padding: 0rpx;
}

.li_box view {
  background-color: white;
  padding-left: 50rpx;
  height: 120rpx;
  width: 100%;
  line-height: 120rpx;
  border-bottom: 0.1rpx solid lightgray;
}

.sm_img {
  float: left;
  margin-top: 35rpx;
  margin-right: 26rpx;
  width: 50rpx;
  height: 50rpx;
}

.sm_img_right {
  float: right;
  margin-top: 35rpx;
  margin-right: 100rpx;
  width: 50rpx;
  height: 50rpx;
}

.headP image {
  border-radius: 15px;
  width: 150rpx;
  height: 150rpx;
}

.headP {
  float: left;
}

.personText {
  padding-top: 20px;
  padding-left: 10px;
  float: left;
  color: white;
  font-weight: bold;
  font-size: 25px;
}

.person_view {
  position: absolute;
  top: 130px;
  left: 100rpx;
  width: 100%;
  height: 150rpx;
}

.modify_btn {
  position: absolute;
  left: 460rpx;
  bottom: 35px;
  width: 25px;
  height: 25px;
}

.name_p {
  overflow: hidden;
  width: 280rpx;
}

.toLogin {
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
