"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "assistant",
  setup(__props) {
    const sessionId = common_vendor.ref("");
    const userInput = common_vendor.ref("");
    const messages = common_vendor.ref([]);
    const scrollTop = common_vendor.ref(0);
    const typingSpeed = common_vendor.ref(100);
    const isTyping = common_vendor.ref(false);
    common_vendor.onMounted(async () => {
      let localSessionId = common_vendor.index.getStorageSync("sessionId");
      if (!localSessionId) {
        localSessionId = createSessionId();
        common_vendor.index.setStorageSync("sessionId", localSessionId);
      }
      sessionId.value = localSessionId;
      try {
        const response = await common_vendor.index.request({
          url: `http://localhost:8080/session/getSessionData?sessionId=${sessionId.value}`,
          method: "GET"
        });
        if (response.data.sessionData) {
          messages.value.push(...response.data.sessionData.map((msg) => ({
            ...msg,
            displayContent: msg.content
            // 确保历史消息立即完全显示
          })));
        }
        updateScroll();
      } catch (error) {
        console.error("获取会话失败:", error);
      }
    });
    const createSessionId = () => {
      return "session_" + Math.random().toString(36).substr(2, 9);
    };
    const onInput = (e) => {
      userInput.value = e.detail.value;
    };
    const onSend = () => {
      updateScroll();
      if (!userInput.value.trim() || isTyping.value)
        return;
      sendMessage();
    };
    const onScrollToUpper = () => {
      console.log("加载更多历史消息");
    };
    const sendMessage = async () => {
      var _a, _b, _c, _d, _e, _f;
      if (!userInput.value.trim() || isTyping.value)
        return;
      try {
        const sendServer = {
          // 67546235c2508f5d61d3712c 原来的
          "assistant_id": "6756d60975a4eb3ffee02908",
          "prompt": userInput.value
        };
        const userMessage = {
          type: "user",
          content: userInput.value
        };
        messages.value.push(userMessage);
        const response = await common_vendor.index.request({
          url: "https://chatglm.cn/chatglm/assistant-api/v1/stream_sync",
          method: "POST",
          header: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMzc0NTMwNSwianRpIjoiOWI0ODM3OTgtMGI1OC00ZjRhLTg2OGQtZjA3M2MxOTIyZjhiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFQSV82NzI0NjRhNjMxMDIzNTg1NDhjMDBhYzlfMWRjNzhhYzMiLCJuYmYiOjE3MzM3NDUzMDUsImV4cCI6MTczNDYwOTMwNSwidWlkIjoiNjc1NmQ2M2VkOGQ5ZmMwZmZhYzFjYWNlIiwidXBsYXRmb3JtIjoiIiwiYXBpX3JvbGUiOiJkZXZlbG9wZXIiLCJyb2xlcyI6WyJhdXRoZWRfdXNlciJdfQ.NMU9HeIz1DUWyxRHDMyJL-xHvijGzJhME6flw8M3-dI"
          },
          data: sendServer
        });
        console.log("原始响应:", response);
        const resData = (_f = (_e = (_d = (_c = (_b = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.result) == null ? void 0 : _b.output) == null ? void 0 : _c[0]) == null ? void 0 : _d.content) == null ? void 0 : _e[0]) == null ? void 0 : _f.text;
        if (!resData) {
          console.error("未接收到有效响应数据");
          common_vendor.index.showToast({
            title: "未接收到有效响应数据",
            icon: "none"
          });
          return;
        }
        console.log("解析后的响应数据:", resData);
        const botMessage = {
          type: "bot",
          content: resData,
          displayContent: ""
          // 用于显示打字效果
        };
        messages.value.push(botMessage);
        typeMessage(messages.value.length - 1);
        userInput.value = "";
        saveSessionToRedis();
      } catch (error) {
        console.error("请求失败:", error);
        common_vendor.index.showToast({
          title: "发送失败",
          icon: "none"
        });
      }
    };
    const saveSessionToRedis = async () => {
      try {
        const response = await common_vendor.index.request({
          url: "http://localhost:8080/session/UpdateSession",
          method: "POST",
          data: {
            sessionId: sessionId.value,
            messages: messages.value
          }
        });
        console.log("会话保存成功:", response);
      } catch (error) {
        console.error("保存会话失败:", error);
      }
    };
    const typeMessage = async (messageIndex) => {
      const message = messages.value[messageIndex];
      if (!message || message.type !== "bot")
        return;
      isTyping.value = true;
      const fullText = message.content;
      let currentIndex = 0;
      const typeNextChar = () => {
        if (currentIndex < fullText.length) {
          messages.value[messageIndex].displayContent = fullText.substring(0, currentIndex + 1);
          currentIndex++;
          common_vendor.nextTick$1(() => {
            updateScroll();
          });
          setTimeout(typeNextChar, typingSpeed.value);
        } else {
          isTyping.value = false;
        }
      };
      typeNextChar();
    };
    const updateScroll = () => {
      common_vendor.nextTick$1(() => {
        scrollTop.value = Number.MAX_SAFE_INTEGER;
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(messages.value, (message, index, i0) => {
          return common_vendor.e({
            a: message.type === "bot"
          }, message.type === "bot" ? {
            b: common_assets._imports_0$1
          } : {}, {
            c: common_vendor.t(message.type === "bot" ? message.displayContent : message.content),
            d: index,
            e: common_vendor.n(message.type)
          });
        }),
        b: scrollTop.value,
        c: common_vendor.o(onScrollToUpper),
        d: common_vendor.o([($event) => userInput.value = $event.detail.value, onInput]),
        e: common_vendor.o(onSend),
        f: userInput.value,
        g: common_vendor.o(onSend)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-52842203"]]);
wx.createPage(MiniProgramPage);
