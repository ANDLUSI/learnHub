<template>
	<view class="box-view">
		<div>
			<p class="like-title">选择您感兴趣的分类 </p>
		</div>
		<div class="category-container">
		  <label 
		    v-for="(category, index) in categories" 
		    :key="index" 
		    :class="['category-item', { 'active': category.selected }]" 
		    @click="toggleCategory(category)"
		  >
		    <input type="checkbox" v-model="category.selected" class="hidden-checkbox" />
		    {{ category.name }}
		  </label>
		</div>
		<view>
			<button @click="saveLike" class="into-button">进入首页</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 在组件挂载时调用函数获取数据
onMounted(() => {
	showCategory();
});


// 切换分类状态的方法
const toggleCategory = (category) => {
  category.selected = !category.selected;
};
// 定义分类数据
const categories = ref([
  { name: '分类1', selected: false },
]);

//将查询得会来的数组转换位为页面需要的格式
const transformCategories = (data) => {
  return data.map(item => ({
    name: item.categoryName,
    selected: false,
  }));
};

//分类渲染
const showCategory = async () => {
  try {
    const res = await uni.request({
      url: 'http://localhost:8080/category/categoryList',
      method: 'GET',
    });
    console.log('Raw categories:', res.data.data);
    
    // 使用转换函数处理数据
    categories.value = transformCategories(res.data.data || []);
    
    console.log('Transformed categories:', categories.value);
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
};

const studentId = ref('');
studentId.value = uni.getStorageSync('studentId')
//将数组中的名字取出来，格式化成一个完整字符串，每个name中间用,号隔开
const saveLike = async () => {
  // 将categories数组中selected为true的名字取出来，格式化成一个完整字符串，每个name中间用,号隔开
  const selectedCategories = categories.value.filter(category => category.selected);
  const likeString = selectedCategories.map(category => category.name).join(',');

  console.log('Selected categories string:', likeString);
  console.log('StudentId string:', studentId.value);
  
  const formData = {
    likeString: likeString ,
    studentId: studentId.value
  };

  try {
    const res = await uni.request({
      url: 'http://localhost:8080/user/saveLike',
      method: 'POST', // 注意这里应该是POST请求，因为你在发送数据给服务器
      data: formData,
	    header: {
	      'content-type': 'application/x-www-form-urlencoded' // 显式指定内容类型
	    },
    });
    console.log('Response from server:', res.data);
	//选择完喜欢专业跳转到首页
	uni.reLaunch({ url: '/pages/index/index' });
    // 如果你需要根据响应做进一步处理，可以在这里添加逻辑

  } catch (error) {
    console.error('Failed to save likes:', error);
  }
};

</script>

<style scoped>
/* 外层div */
.box-view{
	padding: 30rpx;
	text-align: center;
}
.like-title{
	font-size: 40rpx;
	margin-top: 60rpx;
}
/* 标签样式 */
.category-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 30rpx;
  margin-left: 43rpx;
}

.category-item {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  text-align: center;
  transition: all 0.3s ease;
}

.category-item.active {
  background-color: #07b1ff;
  color: white;
  border-color: #07b1ff;
}

.hidden-checkbox {
  display: none; /* 隐藏原生复选框 */
}

/* 确保文字在长方形内上下左右居中 */
.category-item {
  height: 37px; /* 根据需要调整高度 */
  line-height: 37px; /* 使单行文本垂直居中 */
  margin-top: 30rpx;
  margin-left: 30rpx;
  border-radius: 10rpx;
}
.into-button{
	background-color: #007aff;
	color: white;
	padding: 13rpx 30rpx;
	border-radius: 100rpx;
	margin-top: 100rpx;
	font-size: 36rpx;
}
</style>