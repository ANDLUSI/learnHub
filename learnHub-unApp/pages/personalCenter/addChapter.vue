<template>
	<view class="box">
		<!--表单 -->
		<view class="addFrom">
			<uni-forms ref="formRef" v-model="form" :rules="rules" :label-width="100">
				
				<uni-forms-item required label="章节顺序" name="orderIndex">
					<uni-easyinput  v-model="form.orderIndex" placeholder="请输入章节顺序" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="章节名称" name="chapterName">
					<uni-easyinput  v-model="form.chapterName" placeholder="请输入章节名称" ></uni-easyinput>
				</uni-forms-item>
				

			</uni-forms>
			<!--提交按钮-->
			<button type="default" @click="add">新增</button>
		</view>
		
	</view>
	
	
</template>

<script setup>
import { ref,reactive  } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

	const formRef = ref();
	// 定义表单数据对象
	const form = reactive({
	  courseId: '',  
	  chapterName: '',
	  orderIndex: ''
	});
	// 接收传来的参数
	onLoad((options) => {
	  console.log('接收到的参数:', options.courseId);
	  form.courseId = options.courseId;  // 直接赋值给 form 的 courseId
	  console.log('表单的的参数:', form.courseId);
	});
	
	
	//表单验证规则
	const rules = ref({
		chapterName:{
			rules:[
				{
					required:true,
					errorMessage:'请输入章节名称'
				}
			]
		},
		orderIndex:{
			rules:[
				{
					required:true,
					errorMessage:'请输入章节顺序'
				}
			]
		}
	});
	

	
	//提交新增
	const add = () =>{
		formRef.value.validate().then(async r => {
			console.log("被提交表单的值："+form.value);
				//验证成功
				console.log("验证成功");
				console.log(r);
				const res = await uni.request({
					url: 'http://localhost:8080/edit/insertChapter',
					data: form,
					method:'post',
					header: {
						
						'content-type': 'application/json' // 设置请求头为JSON
					}
				})
				//判断用户是否新增成功，成则去编辑页面
				if(res.data){
					uni.showToast({
						title: '新增成功！'
					});
					//跳转编辑页面
					uni.navigateTo({
					  url: '/pages/personalCenter/teacherEditCoures?courseId='+form.courseId
					});
				}else{
					uni.showToast({
						title: '新增失败！'
					});
				}
			})
			.catch(err => {
				//验证失败
				console.log("验证失败");
				console.log(err);
			})
	}
	
</script>

<style scoped lang="scss">
	.box{
		.addFrom{
			padding: 20rpx;
		}
	}
</style>
