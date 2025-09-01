<template>
	<view>
		<view class="course-list">
			<text v-if="loading">加载中...</text>
			<text v-else-if="error">{{ error.message || '加载失败，请稍后再试。' }}</text>
			<view v-else>
				<view class="course-item" v-for="course in filteredCourses" :key="course.id">
					<text>{{ course.title }}</text>
				</view>
			</view>
		</view>


		<!-- 选项卡栏 -->
		<view class="tab-bar">
			<view class="tab-item" v-for="course in courses" :key="course.id" @click="navigateTo(course.id)">
				<image class="pic" :src="course.coverPic" mode=""></image>
				<text>{{course.courseName}}</text>
			</view>
			<!-- <view class="tab-item" @click="navigateTo('/pages/TabOne/TabOne')">
				<image class="pic" src="../../static/index/second2.png" mode=""></image>
				<text>产业组织理论</text>

			</view> -->

		</view>




	</view>


</template>

<script setup>
	import {
		ref,
		computed,
		onMounted
	} from 'vue';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	//定义数据
	// 定义数据
	const loading = ref(true);
	const error = ref(null); // 存储具体的错误信息
	const courses = ref([]);
	const categoryId = ref(null); // 当前选中的类别 ID
	const activeTabId = ref(null); // 当前激活的选项卡 ID
	const list = ref([{}]);
	// 计算属性用于过滤课程
	const filteredCourses = computed(() => {
		if (!categoryId.value) return [];
		return courses.value.filter(course => course.categoryId === categoryId.value);
	});
	const title = ref('')
	// 使用 onLoad 钩子捕获传递的参数并加载数据
	onLoad(async (options) => {
		title.value = options.title
		uni.setNavigationBarTitle({
			title: options.title
		})
		try {
			const response = await uni.request({
				url: 'http://localhost:8080/course/courseList', // 替换为你的API地址
				method: 'GET',
				data: {
					categoryId: options.id || null, // 确保传递了 categoryId 参数
				}
			});

			if (response.data.code === 1001) {
				courses.value = response.data.data;
				console.log(response);

				// // 设置默认的 categoryId（如果有的话）
				// if (options.categoryId) {
				// 	categoryId.value = parseInt(options.categoryId, 10);
				// }
			} else {
				console.error('没找到课程:', response.data.message);
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
		} finally {
			loading.value = false;
		}
	});

	const navigateTo = (id) => {
		// 直接使用 uni.navigateTo 进行页面跳转
		uni.navigateTo({
			url: '/pages/TabOne/TabOne?id=' + id + '&title=' + title.value
		});
	};
</script>

<style>
	.tab-bar {

		font-size: 16rpx;
		justify-content: space-around;
		height: 700px;
		width: auto;
		background-color: #fff;
		/* border: 1px solid red; */
	}

	.tab-item {
		float: left;
		/* border: 1px solid red; */
		margin-left: 30px;
		width: 300rpx;
		margin-top: 20px;
		text-align: center;
		flex-wrap: inherit;
		font-size: 16px;

		/* Adjust based on the number of columns you want */
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		/* 这个属性确保变换是平滑过渡的，而不是瞬间发生的。 */
		transition: transform 0.2s ease;
		cursor: pointer;
		transform: translateY(3);
		/* 初始状态 */

	}

	.tab-item:hover {
		transform: translateY(-30px);
		/* 鼠标悬停时的状态 */
	}

	/* .tab-icon {
		width: 24px;
		height: 24px;
		margin-top: 5px;
	} */




	.pic {
		width: 300rpx;
		height: 200rpx;
	}

	.tab-content-area {
		flex: 1;
		overflow-y: auto;
		padding: 10px;

	}
</style>