<template>
	<view class="box">
		<!--表单 -->
		<view class="addFrom">
			<uni-forms ref="formRef" v-model="form" :rules="rules" :label-width="100">
				<uni-forms-item required label="选择章节" name="chapterId">
				  <uni-data-select 
					v-model="form.chapterId" 
					:localdata="categoryOptions"
					placeholder="请选择章节"
				  ></uni-data-select>
				</uni-forms-item>
				
				
				<uni-forms-item required label="课时名称" name="lessonName">
					<uni-easyinput  v-model="form.lessonName" placeholder="请输入课时名称" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required label="课时顺序" name="orderIndex">
					<uni-easyinput  v-model="form.orderIndex" placeholder="请输入课时顺序" ></uni-easyinput>
				</uni-forms-item>
				
				<uni-forms-item required  label="课程视频" name="filePath">
					<uni-file-picker v-model="form.filePath" file-mediatype="video" mode="grid" 
					@select="selectFile">请选择视频上传</uni-file-picker>
				</uni-forms-item>
				
			</uni-forms>
			<!--提交按钮-->
			<button type="default" @click="add">新增</button>
		</view>
		
	</view>
	
	
</template>

<script setup>
import { ref,reactive,onMounted  } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

	const formRef = ref();
	// 定义表单数据对象
	const form = ref({
		courseId:'',
		chapterId:'',
		lessonName:'',
		orderIndex:''
	});
	const courseIdM = ref('');
	// 接收传来的参数
	onLoad((options) => {
	  console.log('接收到的参数:', options.courseId);
	  courseIdM.value = options.courseId ? parseInt(options.courseId, 10) : null;
	  // 直接赋值给 form 的 courseId
	  // form.courseId = options.courseId ;  
	  console.log('课程ID的参数:', courseIdM.value);
	});

	
	//将上传图片存入数组
	const selectFile = (e) =>{
		form.value.filePath = e.tempFiles[0]
	}
	
	// 示例分类选项数据
	const categoryOptions = ref([]);
	//表单验证规则
	const rules = ref({
		chapterId:{
			rules:[
				{
					required:true,
					errorMessage:'请选择章节'
				}
			]
		},
		lessonName:{
			rules:[
				{
					required:true,
					errorMessage:'请输入课时名称'
				}
			]
		},
		orderIndex:{
			rules:[
				{
					required:true,
					errorMessage:'请输入课时顺序'
				}
			]
		},
		// filePath:{
		// 	rules:[
		// 		{
		// 			required:true,
		// 			errorMessage:'请上传视频'
		// 		}
		// 	]
		// }
	});
	

	
	//提交新增
	const add = () => {
		formRef.value.validate().then(async r => {
			console.log("验证成功，提交表单:", form.value); // 确认 courseId 存在
			
			// 构建表单数据
			const formData = {
				courseId : courseIdM.value,
			    chapterId: form.value.chapterId,
			    lessonName: form.value.lessonName,
			    orderIndex: form.value.orderIndex
			};
	
			uni.showLoading({ title: '正在上传...', mask: true });

			const res = await uni.uploadFile({
				url: 'http://localhost:8080/edit/addLesson',
				filePath: form.value.filePath.url, 
				name: 'file', 
				formData: formData,
				method: 'POST',
			});

			uni.hideLoading();

			if (res.data) {
				uni.showToast({ title: '新增成功！' });
				uni.navigateTo({
					url: '/pages/personalCenter/teacherEditCoures?courseId=' + courseIdM.value
				});
			} else {
				uni.showToast({ title: '新增失败！' });
			}
		}).catch(err => {
			uni.hideLoading();
			console.log("验证失败", err);
		});
	};

	
	
	// 获取课程信息
	const findById = async () => {
	  const res = await uni.request({
	    url: 'http://localhost:8080/edit/findByCourseId',
	    method: 'GET',
	    data: {
	      courseId: courseIdM.value
	    }
	  });
	
	  if (res.data.message === "操作成功") {
	    uni.showToast({
	      title: '查询成功',
	      icon: 'none'
	    });
	  // categoryOptions.value = res.data.data.chapterList
	        // 将 chapterList 转换为适合 uni-data-select 的格式
      categoryOptions.value = res.data.data.chapterList.map(chapter => ({
        value: chapter.id.toString(), // 确保 value 是字符串类型
        text: `${chapter.orderIndex}. ${chapter.chapterName}`
      }));

      console.log('章节选项:', categoryOptions.value);
	  } else {
	    uni.showToast({
	      title: '查询失败',
	      icon: 'none'
	    });
	  }
	}
	//页面挂载时获取数据
	onMounted(() => {
		findById();
	});
	
</script>

<style scoped lang="scss">
	.box{
		.addFrom{
			padding: 20rpx;
		}
	}
</style>
