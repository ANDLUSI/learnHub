<template>
	<view class="box">
		<!--表单 -->
		<view class="addFrom">
			<uni-forms ref="formRef" v-model="form" :rules="rules" :label-width="100">
				<uni-forms-item required label="课程名称" name="courseName">
					<uni-easyinput v-model="form.courseName" placeholder="请输入课程名称" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="课程介绍" name="courseDescription">
					<uni-easyinput  v-model="form.courseDescription" placeholder="请输入课程介绍" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="课程价格" name="coursePrice">
					<uni-easyinput  v-model="form.coursePrice" placeholder="请输入课程价格" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="课程分类" name="categoryId">
				  <uni-data-select 
					v-model="form.categoryId" 
					:localdata="categoryOptions"
					placeholder="请选择课程分类"
				  ></uni-data-select>
				</uni-forms-item>
				
				<uni-forms-item required label="课程特色" name="courseFeature">
					<uni-easyinput v-model="form.courseFeature" placeholder="请输入课程特色" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="主讲方向" name="teacherLecture">
					<uni-easyinput v-model="form.teacherLecture" placeholder="请输入主讲方向" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="适用人群" name="applicationPeople">
					<uni-easyinput v-model="form.applicationPeople" placeholder="请输入适用人群" ></uni-easyinput>
				</uni-forms-item>
			
				
				<uni-forms-item required label="封面" name="contentImage">
					<uni-file-picker v-model="form.contentImage" file-mediatype="image" mode="grid" 
					@select="selectFile">请选择图片上传</uni-file-picker>
				</uni-forms-item>
			</uni-forms>
			<!--提交按钮-->
			<button type="default" @click="add">新增</button>
		</view>
		
	</view>
	
	
</template>

<script setup>
import { ref } from 'vue';

	
	
	const formRef = ref();
	const form = ref({
		teacherId:uni.getStorageSync("teacherId"),
		contentImage:''
	});
	// 示例分类选项数据
	const categoryOptions = ref([
	  { value: '1', text: '编程语言' },
	  { value: '2', text: '前端开发' },
	  { value: '3', text: '后端开发' },
	  { value: '4', text: '数据库管理' },
	  // 添加更多分类...
	]);
	//表单验证规则
	const rules = ref({
		courseName:{
			rules:[
				{
					required:true,
					errorMessage:'请输入课程名称'
				}
			]
		},
		courseDescription:{
			rules:[
				{
					required:true,
					errorMessage:'请输入课程介绍'
				}
			]
		},
		coursePrice:{
			rules:[
				{
					required:true,
					errorMessage:'请输入课程价格'
				},
				{
					validateFunction: async (rule,value,data,callback) =>{
						if(!/^\d+$/.test(value)){
							return callback('只能输入数字！')
						}else{
							return true
						};
					}
				}
			]
		},
		categoryId:{
			rules:[
				{
					required:true,
					errorMessage:'请选择课程分类'
				}
			]
		},
		courseFeature:{
			rules:[
				{
					required:true,
					errorMessage:'请输入课程特色'
				}
			]
		},
		teacherLecture:{
			rules:[
				{
					required:true,
					errorMessage:'请输入主讲方向'
				}
			]
		},
		applicationPeople:{
			rules:[
				{
					required:true,
					errorMessage:'请输入适用人群'
				}
			]
		},
		// contentImage:{
		// 	rules:[
		// 		{
		// 			required:true,
		// 			errorMessage:'请上传封面'
		// 		}
		// 	]
		// }
		
	});
	
//将上传图片存入数组
const selectFile = (e) =>{
	form.value.filePath = e.tempFiles[0]
}
	
	//提交新增
	const add = () =>{
		formRef.value.validate().then(async r => {
			//验证成功
			console.log("验证成功");
			console.log(r);
			
			const res = await uni.uploadFile({
			  url: 'http://localhost:8080/edit/addCourse',
			  filePath: form.value.filePath.url, // 上传的文件路径
			  name: 'photo', // 头像字段名称
			  formData: form.value, // 传递表单数据（
			  method: 'POST',
			});
			
			// 处理上传结果
			if (res.data) {
			  uni.showToast({
			    title: '修改成功！',
			    icon: 'success',
			    success: function () {
			      setTimeout(() => {
			        uni.reLaunch({
			          url: '/pages/personalCenter/teacherCenter',
			        });
			      }, 1000);
			    },
			  });
			} else {
			  uni.showToast({
			    title: '修改失败！',
			  });
			}
		})
		.catch((err) => {
		  // 验证失败
		  console.log('验证失败', err);
		});

	}
	
</script>

<style scoped lang="scss">
	.box{
		.addFrom{
			padding: 20rpx;
		}
	}
</style>
