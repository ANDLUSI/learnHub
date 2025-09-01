<template>
  <view>
    <uni-forms ref="formRef" :rules="rules" class="warp" v-model="form">
      <uni-forms-item label="选择课程:" name="id" label-width="100">
        <uni-data-select value="courseId" v-model="form.id" :localdata="coursedata" class="selectCourse"></uni-data-select>
      </uni-forms-item>
      <uni-forms-item label="直播间名称:" name="title" label-width="100">
        <uni-easyinput  v-model="form.title" placeholder="请输入直播间名称" />
      </uni-forms-item>
      <uni-forms-item label="直播间描述:" name="description" label-width="100">
        <uni-easyinput  v-model="form.description" placeholder="请输入直播间描述" />
      </uni-forms-item>
<!--      <uni-forms-item label="直播间密钥:" name="secretKey" label-width="100">-->
<!--        <uni-easyinput  v-model="form.secretKey" placeholder="请输入直播间密钥" />-->
<!--      </uni-forms-item>-->
      <uni-forms-item label="直播间地址:" name="liveUrl" label-width="100">
        <uni-easyinput  v-model="form.liveUrl" value="http://192.168.100.116:8080/hls" />
      </uni-forms-item>
    </uni-forms>

    <view>
      <button type="primary"  @click="submitForm">创建直播间</button>
    </view>
    <view class="live-out">
      <button type="primary" @click="exit">关闭直播间</button>
    </view>
  </view>

</template>

<script setup>
import {
  onMounted,
  ref
} from 'vue'
const formRef = ref({});
const form = ref({});
const courseId = ref('');
//定义规则
const rules = ref({
  id: {
    rules: [{ required: true, errorMessage: '课程不能为空' }]
  },
  title: {
    rules: [{ required: true, errorMessage: '直播间名称不能为空' },
      {
        minLength: 3,
        maxLength: 20,
        errorMessage: "直播间长度在{minLength}-{maxLength}之间"
      }]
  },
  description: {
    rules: [{ required: true, errorMessage: '直播间描述不能为空' },
      {
        minLength: 3,
        maxLength: 20,
        errorMessage: "直播间描述长度在{minLength}-{maxLength}之间"
      }]
  },
  secretKey: {
    rules: [{ required: true, errorMessage: '直播间密钥不能为空' },
      {
        minLength: 4,
        maxLength: 20,
        errorMessage: "直播间密钥长度在{minLength}-{maxLength}之间"
      }]
  }
});
//调用组件的时候，渲染数据
onMounted(() => {
	teacherId.value = uni.getStorageSync("teacherId")
  findCoursr();
})
//课程数据
const coursedata = ref([])
const teacherId = ref('')
//查询老师教的所有课程
const findCoursr = async () => {
  try {
    const response = await uni.request({
      url: "http://localhost:8080/teacher/findCourseByTeacherId", // 替换为实际获取课程数据的API地址
      method: "GET",
      data: {
        teacherId: teacherId.value
      },
    });

    // 假设响应数据是一个包含课程对象的数组，每个对象有 id 和 courseName 属性
    const courses = response.data.map(item => ({
      value: item.id,
      text: item.courseName // 根据实际情况调整属性名
    }));
    coursedata.value = courses;
  } catch (error) {
    console.error('加载课程数据失败', error);
  }
};

//开始直播
// 提交表单的方法
const submitForm =  () => {
  try {
    // 表单验证
    formRef.value.validate()
        .then(async ress=>{
          // 构造要发送的数据对象
          const transObj = {
            course: {
              id: form.value.id,
              teacherId: teacherId.value
            },
            live: {
              title: form.value.title,
              courseId: form.value.id,
              description: form.value.description,
              secretKey: form.value.secretKey,
              liveUrl: form.value.liveUrl,
              teacherId: teacherId.value
            }
          };
          //将课程id存入
          uni.setStorageSync('courseId', form.value.id);
          uni.setStorageSync('secretKey', form.value.secretKey)
          // 发送数据到后端
          const response = await uni.request({
            url: "http://localhost:8080/teacher/startLive", // 替换为实际提交直播信息的API地址
            method: "POST",
            data: transObj
          });
          const data = response.data.data
          uni.setStorageSync('liveId', response.data.data);

          console.log("提交成功", response);
		  uni.showToast({
		    title: '直播间创建成功',
		    icon: 'none'
		  });

        });

  } catch (error) {
    console.error("提交失败", error);
  }
};
//点击关闭直播

const course=uni.getStorageSync('courseId');

const liveId = uni.getStorageSync('liveId');

const exit=async ()=>{
  // 构造要发送的数据对象
  const TransObj = {
    course: {
      id: course,
      teacherId: teacherId.value
    },
    live: {
      id: liveId,
    }
  };

  console.log(TransObj);
  const respones = await uni.request({
    url: 'http://localhost:8080/teacher/stopLive',
    method: 'POST',
    data:TransObj,
  });

  if(respones.data.code==1001){
    uni.showModal({
      title: respones.data.message
    })
  }
}
</script>

<style scoped lang="scss">
.live-out{
  margin-top: 30rpx;
}
</style>