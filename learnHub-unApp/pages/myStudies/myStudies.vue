<template>
	<uni-section>
		<view class="uni-padding-wrap uni-common-mt">
			<uni-segmented-control :current="current" :values="items" styleType="text" activeColor="#007aff"
				inActiveColor="#b0b0b0" @clickItem="onClickItem" />
		</view>
		<view class="content">
			<view v-if="current === 0">
				<uni-list class="custom-nav" v-if="list.length>0">
					<uni-list-item v-for="item in list" :key="item.id" class="custom-thumb" :title="item.courseName"
						clickable :note="item.teacherName" link="navigateTo"
						:to="'/pages/myStudies/courseDetails/courseDetails?id=' + item.courseId+'&courseName='+item.courseName" showArrow
						rightText="去学习">

						<template v-slot:header>
							<uni-badge v-if="item.liveStatus==1" class="uni-badge-left-margin" text="1" is-dot="true"
								size="normal" />
							<image class="slot-image" :src="item.coverPic" mode="widthFix"></image>
						</template>

					</uni-list-item>
				</uni-list>
				<view class="noContent" v-if="list.length<=0">暂无内容</view>
			</view>
			<view v-if="current === 1">
				<uni-list class="custom-nav" v-if="list.length>0">
					<uni-list-item v-for="item in list" :key="item.id" class="custom-thumb" :title="item.courseName"
						clickable :note="item.teacherName" rightText="未开始">
						<template v-slot:header>
							<image class="slot-image" :src="item.coverPic" mode="widthFix"></image>
						</template>
					</uni-list-item>
				</uni-list>
				<view class="noContent" v-if="list.length<=0">暂无内容</view>
			</view>
			<view v-if="current === 2">
				<uni-list class="custom-nav" v-if="list.length>0">
					<uni-list-item v-for="item in list" :key="item.id" class="custom-thumb" :title="item.courseName"
						clickable :note="item.teacherName" link="navigateTo"
						:to="'/pages/myStudies/courseDetails/courseDetails?id=' + item.courseId+'&courseName='+item.courseName" showArrow rightText="已结课">
						<template v-slot:header>
							<image class="slot-image" :src="item.coverPic" mode="widthFix"></image>
						</template>
					</uni-list-item>
				</uni-list>
				<view class="noContent" v-if="list.length<=0">暂无内容</view>
			</view>
			<view v-if="current === 3">
				<uni-list class="custom-nav" v-if="list2.length>0">
					<uni-list-item v-for="item in list2" :key="item.id" class="custom-thumb" :title="item.courseName"
						:note="item.teacherName" rightText="已退款">
						<template v-slot:header>
							<image class="slot-image" :src="item.coverPic" mode="widthFix"></image>
						</template>
					</uni-list-item>
				</uni-list>
			<view  class="noContent" v-if="list2.length<=0">暂无内容</view>
			</view>
		</view>
	</uni-section>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from "vue";

	const items = ref(['正在上课', '即将开课', '已结课', '已退课'])
	const current = ref(0)
	const list = ref([])
	const list2 = ref([])
	const studentId = ref(null)
	onMounted(() => {
		studentId.value = uni.getStorageSync('studentId')
		showList(0)
	})

	const onClickItem = async (e) => {
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex
			if (e.currentIndex != 3) {
				showList(e.currentIndex)
			} else {
				showRetiredOrder()
				console.log(list2.value.length);
			}

		}
	}
	const showList = async (i) => {
		try {
			const res = await uni.request({
				url: 'http://localhost:8080/studentCourse/findAllByStuId',
				method: 'GET',
				data: {
					studentId: studentId.value,
					courseStatus: i
				}
			});
			if (res.data.code == 2001) {
				if (res.data.data.length!=null) {
					list.value = res.data.data		
				};
		
			} else {
				uni.showToast({
					title: '加载失败，请稍后再试',
					icon: 'none'
				});
			}
		} catch (e) {
			console.error(e);
			console.error('Error fetching data:', e);
			uni.showToast({
				title: '网络请求失败，请检查网络连接',
				icon: 'none'
			});
		}
	}


	const showRetiredOrder = async () => {
		try {
			const res = await uni.request({
				url: 'http://localhost:8080/course/selectRetiredCourse',
				method: 'GET',
				data: {
					studentId: studentId.value,
				}
			});
			
			if (res.data.code == 2001) {
				if (res.data.data.length!=null) {
					list2.value = res.data.data
					console.log(res.data.data);
				};

				console.log(list2.value);
			} else {
				uni.showToast({
					title: '加载失败，请稍后再试',
					icon: 'none'
				});
			}
		} catch (e) {
			console.error(e);
			console.error('Error fetching data:', e);
			uni.showToast({
				title: '网络请求失败，请检查网络连接',
				icon: 'none'
			});
		}
	}
</script>

<style>
	.content>view {
		width: auto;
		height: auto;

	}

	.slot-image {
		border-radius: 4px;
		width: 200rpx;
		margin-right: 20px;
	}

	.custom-nav>view {
		height: 200rpx;
	}

	.uni-badge-left-margin {
		position: absolute;
		bottom: 70%;
		left: 5%;
	}
	
	.noContent{
		text-align: center;
		margin-top: 260rpx;
		color: #b0b0b0;
	}
</style>