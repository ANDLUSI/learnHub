<template>
  <view class="box">
    <!-- 搜索框 -->
    <view class="search-view">
      <image src="../../static/index/logo.png" class="logo"></image>
      <uni-search-bar 
        v-model="courseName" 
        @blur="fetchCourses" 
        @cancel="handleCancel"
        @clear="handleClear"
        placeholder="搜索更多好课"
        radius="100"
        bgColor="#F7F8FA">
      </uni-search-bar>
      <view class="search-result">
        <!-- <text class="search-result-text">当前输入为：{{ searchValue }}</text> -->
      </view>
    </view>

    <!-- 分类点击后现实的小标题 -->
    <view class="classify-title">
      <image src="/static/courseList/全部列表.png" @click="showDrawer('showLeftDrawer')"></image>
      <view class="title-view">{{ classifyTitle }}</view>
    </view>
	<!-- 课程列表 -->
	<view class="course-view">
		<ul>
			<li v-for="course in courseList" class="course-view-li" @click="toDetails(course.id,course.courseName)">
				<div class="course-img">
					<image :src="course.coverPic || '/static/courseList/课程截图.png'"></image>
				</div>
				<div class="course-text">
					<p class="course-name">{{course.courseName}}</p>
					<p class="course-school">{{course.teacherLecture}}</p>
				</div>
			</li>
		</ul>
	</view>

    <!-- 分类抽屉滑出 -->
    <view class="drawer-left">
      <uni-section>
        <view class="example-body">
          <uni-drawer ref="showLeftDrawer" mode="left" :width="320" @change="change($event, 'showLeft')">
            <view class="close">
				<view class="close-all">
					<image src="/static/courseList/全部.png"></image>
					<view @click="allCourseBtn">全部课程</view>
				</view>
				<view class="close-classify">
					<view class="close-classify-title">
						<image src="/static/courseList/分类.png"></image>
						<view>学科分类</view>
					</view>
					<view class="close-classify-text">
						<view v-for="category in categoryList" class="classify-name" @click="findCourseByCatecory(category.id,category.categoryName)">
							{{category.categoryName}}
						</view>
					</view>
				</view>
            </view>
          </uni-drawer>
        </view>
      </uni-section>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 定义响应式变量
const searchValue = ref('');
const classifyTitle = ref('全部');
//分类
const categoryList = ref([]);
// 定义响应式变量(课程数组)
const courseList = ref([]);

const courseName = ref('');

//点击全部课程显示全部
const allCourseBtn = async () => {
	fetchCourses();
	closeDrawer();
	classifyTitle.value = '全部';
}

// 在组件挂载时调用函数获取数据
onMounted(() => {
	  fetchCourses();
	  showCategory();
	});

// 显示全部课程
const fetchCourses = async () => {
	// const formData = {
	//   courseName:courseName.value
	// };
  try {
    const res = await uni.request({
      url: 'http://localhost:8080/course/findCourseName',
      method: 'GET',
	  data:{courseName:courseName.value}
    });
    // 假设服务器返回的数据结构是 {data: [{id, coverPic, courseName, teacherLecture}, ...]}
    courseList.value = res.data.data || [];
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  }
};

//跳转到详情页面
const toDetails = async (courseId,title) =>{
	uni.navigateTo({
		url: '/pages/TabOne/TabOne?id=' + courseId + '&title=' + title,
	});
}

//分类渲染
const showCategory = async () => {
	// const formData = {
	//   courseName:courseName.value
	// };
  try {
    const res = await uni.request({
      url: 'http://localhost:8080/category/categoryList',
      method: 'GET',
    });
    console.log(res.data.data);
    categoryList.value = res.data.data || [];
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  }
};

//点击分类查询并显示课程
const findCourseByCatecory = async (categoryId,categoryName) => {
	closeDrawer();
	classifyTitle.value = categoryName;
	// const formData = {
	//   courseName:courseName.value
	// };
  try {
    const res = await uni.request({
      url: 'http://localhost:8080/course/courseList',
      method: 'GET',
	  data:{categoryId:categoryId}
    });
    // 假设服务器返回的数据结构是 {data: [{id, coverPic, courseName, teacherLecture}, ...]}
    courseList.value = res.data.data || [];
  } catch (error) {
    console.error('Failed to fetch courses:', error);
  }
};


// 分类抽屉状态
const showRight = ref(false);
const showLeft = ref(false);

// 使用 ref 获取对 drawer 组件的引用
const showLeftDrawer = ref(null);

// 定义事件处理函数
const handleConfirm = (event) => {
  console.log('Search confirmed:', searchValue.value);
};

const handleBlur = () => console.log('Input blurred');
const handleFocus = () => console.log('Input focused');
const handleInput = (event) => console.log('Input value changed:', event.detail.value);
const handleCancel = () => console.log('Search cancelled');
const handleClear = () => {
  console.log('Search cleared');
  searchValue.value = ''; // 清空搜索框的内容
};

// 打开窗口
const showDrawer = (drawerRef) => {
  if (showLeftDrawer.value) {
    showLeftDrawer.value.open();
  }
};

// 关闭窗口
const closeDrawer = (drawerRef) => {
  if (showLeftDrawer.value) {
    showLeftDrawer.value.close();
  }
};

// 抽屉状态发生变化触发
const change = (e, type) => {
  console.log((type === 'showLeft' ? '左窗口' : '右窗口') + (e ? '打开' : '关闭'));
  if (type === 'showLeft') {
    showLeft.value = e;
  } else if (type === 'showRight') {
    showRight.value = e;
  }
};

// 当点击分类图标时，滑出左侧抽屉
const drawerSlideOut = () => {
  showDrawer('showLeftDrawer');
};
</script>

<style scoped lang="scss">
.logo {
  width: 70rpx;
  height: 70rpx;
  display: inline-block;
}

.search-view uni-search-bar {
  display: inline-block;
  width: 600rpx;
}

.box {
  background-color: white;
  width: 100%;
  padding: 26rpx;
}

//页面分类标题
.classify-title{
	height: 11rpx;
}

.classify-title image {
  width: 55rpx;
  height: 55rpx;
  margin-top: 6rpx;
}

.classify-title image , .title-view{
	float: left;
	// border: 1px solid red;
}

.title-view{
	margin-left: 20rpx;
	// width: 100rpx;
	margin-top: 10rpx;
	font-size: 37rpx;
	font-weight: bold;
}

//抽屉全部课程
.close-all image , .close-all view{
	float: left;
}
.close-all image{
	width: 45rpx;
	height: 45rpx;
	margin-top: 6rpx;
}
.close{
	padding: 27rpx;
}
.close-all view{
	margin-left: 20rpx;
	width: 100rpx;
	margin-top: 10rpx;
	font-size: 33rpx;
	// border: 1px solid red;
	width: 200rpx;
	color: gray;
}
.close-all{
	height: 100rpx;
	width: 490rpx;
	border-bottom: 1px solid lightgray;
}

//抽屉学科分类
.close-classify{
	height: 600rpx;
	// border-bottom: 1px solid lightgray;
}
.close-classify-title{
	margin-top: 20rpx;
	width: 490rpx;
	height:40rpx;
	// border: 1px solid red;
}
.close-classify-title image , .close-classify-title view{
	float: left;
	// border: 1px solid red;
}
.close-classify-title image{
	width: 45rpx;
	height: 45rpx;
	margin-top: 6rpx;
}
.close-classify-title view{
	margin-left: 20rpx;
	width: 100rpx;
	margin-top: 10rpx;
	font-size: 33rpx;
	// border: 1px solid red;
	width: 200rpx;
	color: gray;
}
.classify-name{
	float: left;
	margin-left: 50rpx;
	margin-top: 60rpx;
	font-size: 33rpx;
	width: 198rpx;
	height: 50rpx;
	// border: 1px solid red
}
.close-classify-text{
	float: left;
	width: 500rpx;
	// background-color: yellow;
}



//课程列表
.course-view {
	margin-top: 70rpx;
}

/* 设置 li 的内边距和下边框 */
.course-view-li {
	width: 90%;
	box-sizing: border-box; /* 确保 padding 不会影响整体大小 */
	// margin-bottom: 20rpx;
	// margin-top: 20rpx;
	padding: 30rpx; /* 内边距 */
	// padding-bottom: 30rpx;
	border-bottom: 1rpx solid lightgray; /* 下边框，颜色改为红色，宽度为2rpx */
	display: flex; /* 使用 Flexbox */
	align-items: center; /* 垂直居中 */
}


.course-img image {
	width: 300rpx;
	height: 200rpx;
	border-radius: 10rpx; /* 圆角大小，可以根据需要调整 */
}

.course-img, .course-text {
	display: inline-block;
	height: 200rpx;
}

.course-text {
	margin-left: 20rpx;
}

.course-school {
	margin-top: 100rpx;
}

.course-name{
	font-size: 30rpx;
	font-weight: bold;
}
.course-school{
	color: gray;
}
</style>