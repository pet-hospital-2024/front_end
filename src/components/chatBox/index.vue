<template>
  <div class="chatBox_contianer">
    <h1 class="unique_h1">智能助教</h1>
    <el-divider />
    <div class="chatRoom">
      <div
        v-for="message in useStore.messageArr"
        :key="message.id"
        class="chat_message"
      >
        <div :class="['chat_message-text', message.isMe ? 'mine' : 'not-mine']">
          <div v-html="message.text"></div>
        </div>
      </div>
      <div ref="endOfMessages"></div>
      <!-- 用于滚动到最新消息 -->
    </div>
    <el-divider />
    <div class="chat_inputArea">
      <el-input
        v-model="textarea"
        style="width: 300px; overflow: auto; margin: 10px"
        :rows="4"
        resize="none"
        type="textarea"
        placeholder="请输入您的问题"
      />
      <!-- <el-button
        type="primary"
        @click="sendMessage(textarea)"
        style="margin-top: 20px"
        :disabled="useStore.isSending"
        >发送</el-button
      > -->
      <div
        class="chat_send"
        @click="sendMessage(textarea)"
        v-if="!useStore.isSending"
      >
        <svg
          t="1713195662038"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9590"
          width="24"
          height="24"
        >
          <path d="M325.450697 862.306736" fill="#ffffff" p-id="9591"></path>
          <path d="M882.088359 862.306736" fill="#ffffff" p-id="9592"></path>
          <path d="M236.00336 877.09995" fill="#ffffff" p-id="9593"></path>
          <path d="M960.182765 877.09995" fill="#ffffff" p-id="9594"></path>
          <path d="M63.645221 788.684697" fill="#ffffff" p-id="9595"></path>
          <path d="M958.462624 788.684697" fill="#ffffff" p-id="9596"></path>
          <path d="M64.84932 858.69444" fill="#ffffff" p-id="9597"></path>
          <path d="M959.494709 858.69444" fill="#ffffff" p-id="9598"></path>
          <path
            d="M842.009071 396.492525l-296.036284-295.86427c-18.749538-18.749538-49.196036-18.749538-67.945574 0l-295.86427 296.036284c-26.662187 26.662187-4.472367 73.278011 30.446498 73.278011l146.728036 0 0 420.5745c0 25.974131 20.985721 47.131866 47.131866 47.131866l211.233328 0c25.974131 0 47.131866-20.985721 47.131866-47.131866L664.834537 469.770536 811.906602 469.770536C847.513523 469.770536 867.811188 422.63867 842.009071 396.492525z"
            fill="#ffffff"
            p-id="9599"
          ></path>
        </svg>
      </div>
      <div class="chat_cancel" @click="cancelSend" v-if="useStore.isSending">
        <svg
          t="1713187619202"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5957"
          width="24"
          height="24"
        >
          <path
            d="M296.962348 819.192775h430.086141c50.897458 0 92.151511-41.254053 92.151511-92.151511V296.958736c0-50.895652-41.252246-92.160542-92.151511-92.160542H296.962348c-50.897458 0-92.160542 41.26489-92.160542 92.160542v430.082528c-0.001806 50.895652 41.261277 92.151511 92.160542 92.151511z"
            fill="#ffffff"
            p-id="5958"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from "vue";
import useFrontAIStore from "@/store/front/ai";
import useUserStore from "@/store/modules/user";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import MarkdownIt from "markdown-it";

const useStore = useFrontAIStore();
const userStore = useUserStore();

const textarea = ref(""); //输入文本

const parsedMarkdown = (text: string) => {
  const md = new MarkdownIt({
    html: true, // 在源码中启用HTML标签
    linkify: true, // 将类似URL的文本自动转换为链接
    breaks: true, // 转换段落里的 '\n' 到 <br>
  });

  // console.log(md.render(text));
  return md.render(text);
};
onMounted(() => {
  //加载历史消息
  useStore.loadMessages();
  nextTick(() => {
    if (endOfMessages.value) {
      endOfMessages.value.scrollIntoView();
    }
  });
});

//控制消息显示位置
const endOfMessages = ref<HTMLDivElement | null>(null);

const sendMessage = async (text: string) => {
  if (!text.trim()) return; // 避免发送空消息
  useStore.isSending = true;
  // 将用户输入的消息添加到messages数组
  useStore.messageArr.push({
    id: useStore.nextMessageId++,
    text: text,
    isMe: true,
  });
  nextTick(() => {
    scrollToBottom();
  });

  textarea.value = ""; // 清空输入框

  await getAIResponse(text);
  // await useStore.sendMessage(text, userStore.token as string);
  // console.log(await nextTick());
  nextTick(() => scrollToBottom());
};

let currentController: any = null;

const getAIResponse = async (text: string) => {
  try {
    const query = {
      query: text,
    };

    let index = 0;

    // 每次调用前先检查并中止之前的流
    if (currentController) {
      currentController.abort();
    }

    // 创建新的控制中断
    currentController = new AbortController();
    await fetchEventSource("/api/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userStore.token as string,
      },
      body: JSON.stringify(query),
      openWhenHidden: true,
      signal: currentController.signal,
      onmessage: (event) => {
        // console.log("返回数据", event);
        if (event.data) {
          const data = event.data;
          console.log(data);
          // concatContent += data;
          if (index == 0) {
            useStore.messageArr.push({
              id: useStore.nextMessageId++,
              text: data,
              isMe: false,
            });
          } else {
            useStore.messageArr[useStore.messageArr.length - 1].text += data;
          }
          index++;
          nextTick(() => scrollToBottom());
        }
      },
      onclose() {
        // 数据返回结束时触发
        // console.log("关闭连接成功");
      },
      onerror(err) {
        console.log("eventSource error");
        throw err;
      },
    });
  } catch (error) {
    console.error("Failed to get AI response:", error);
    useStore.messageArr.push({
      id: useStore.nextMessageId++,
      text: "Error: Failed to get response from AI.",
      isMe: false,
    });
  } finally {
    useStore.isSending = false;
    useStore.saveMessages();
    await nextTick();
  }
};

const cancelSend = () => {
  useStore.isSending = false;
  // textarea.value = "";
  if (currentController) {
    currentController.abort();
    console.log("Event stream aborted");
    currentController = null; // 清除控制器实例
  }
};

function scrollToBottom() {
  console.log("Attempting to scroll to bottom");
  if (endOfMessages.value) {
    endOfMessages.value.scrollIntoView({ behavior: "smooth" });
  }
}

onUnmounted(() => {
  useStore.saveMessages();
});
</script>

<style lang="scss">
.chatBox_contianer {
  width: 400px;
  height: 550px;
  z-index: 990;
  position: fixed;
  right: 70px;
  bottom: 70px;
  padding: 5px 10px;
  background-color: white;
  border-radius: 20px;
  border: 5px solid rgb(118, 128, 118);
  transition: ease-in-out 1s;
  display: flex;
  flex-direction: column;
  align-items: center;

  .unique_h1 {
    font-size: 18px;
    margin-top: 10px;
    margin-bottom: -10px;
    // font-weight: 600;
  }

  .chatRoom {
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    // background: rgb(235, 229, 229);
    margin: -10px 0px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .chat_inputArea {
    margin-top: -20px;
    display: flex;
    justify-content: space-between;
  }

  .chat_message {
    margin: 10px 0px;
    // padding: 5px;
    line-height: 1.5;
    display: flex;
    justify-content: flex-start;
  }

  .chat_message-text {
    max-width: 90%;
    padding: 10px 15px;
    border-radius: 18px;
    display: inline-block;
    word-wrap: break-word;
  }

  .mine {
    background-color: #dcf8c6;
    margin-left: auto;
    border-top-right-radius: 2px;
    // border-bottom-right-radius: 2px;
  }

  .not-mine {
    background-color: #ebebeb;
    margin-right: auto;
    border-top-left-radius: 2px;
    // border-bottom-left-radius: 2px;
  }

  .chat_send {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: rgb(184, 193, 184);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: ease-in-out 0.5s;
    margin-top: 10px;
    // &:hover {
    //   background-color: rgb(118, 128, 118);
    // }
  }
  .chat_cancel {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: rgb(183, 202, 183);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: ease-in-out 0.5s;
    margin-top: 10px;
  }

  strong {
    font-weight: bold;
  }
}
</style>
