<template>
  <view>
    <view class="uni-padding-wrap uni-common-mt">
      <view>
        <video
            id="myVideo"
            :src="videoSrc"
            @error="videoErrorCallback"
            :danmu-list="danmuList"
            enable-danmu
            danmu-btn
            controls
            show-fullscreen-btn
            direction="-90"
            :show-mute-btn="true"
            is-live="true"
        ></video>
      </view>
      <view class="uni-list uni-common-mt">
        <view class="uni-list-cell">
          <view class="uni-list-cell-db">
            <uni-easyinput
                prefixIcon="chatbubble"
                v-model="danmuValue"
                class="uni-input"
                type="text"
                placeholder="在此处输入弹幕内容"
                @change="sendDanmu"
            />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';

const videoSrc = ref('');
const danmuList = ref([
  {
    text: '老师讲得正不错',
    color: '#ff0000',
    time: 1
  },
  {
    text: '太棒了',
    color: '#ff00ff',
    time: 3
  }
]);
const danmuValue = ref('');

let videoContext = null;

onMounted(() => {
  // 创建视频上下文
  videoContext = uni.createVideoContext('myVideo');

  // 获取老师的密钥并动态添加地址
  // const secretKey = uni.getStorageSync('secretKey');
  const secretKey = '1001';
  updateVideoSrc(secretKey);

  console.log("这是密钥：" + secretKey);
});

const updateVideoSrc = (key) => {
  if (typeof key === 'string' && key.length > 0) {
    videoSrc.value = `http://192.168.140.116/hls/${encodeURIComponent(key)}/index.m3u8`;
    console.log('videoSrc.value: ', videoSrc.value);
  } else {
    console.error('Invalid or missing secretKey:', key);
    videoSrc.value = `http://192.168.140.116/hls/1001/index.m3u8`; // 默认地址
  }
};

// 监听 videoSrc 的变化
watch(videoSrc, (newSrc) => {
  if (videoContext) {
    videoContext.stop(); // 停止当前视频
    videoContext.src = newSrc; // 设置新的视频源
    videoContext.play(); // 播放新的视频
  }
});

// 发送弹幕方法
const sendDanmu = () => {
  if (videoContext && danmuValue.value) {
    videoContext.sendDanmu({
      text: danmuValue.value,
      color: getRandomColor()
    });
    danmuValue.value = '';
  }
};

// 视频发送错误
const videoErrorCallback = (e) => {
  uni.showModal({
    content: '网络连接错误',
    showCancel: false
  });
};

// 随机弹幕的颜色
const getRandomColor = () => {
  const rgb = [];
  for (let i = 0; i < 3; ++i) {
    let color = Math.floor(Math.random() * 256).toString(16);
    color = color.length === 1 ? '0' + color : color;
    rgb.push(color);
  }
  return '#' + rgb.join('');
};
</script>

<style scoped lang="scss">
#myVideo {
  text-align: center;
  margin-left: 95rpx;
}

.uni-list-cell-db {
  width: 600rpx;
  margin-left: 95rpx;
}

.uni-padding-wrap {
  position: relative;
  top: 280rpx;
}
</style>

