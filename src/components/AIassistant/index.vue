<template>
  <div>
    <div class="assistantButton" @click="showChatBox">
      <svg
        t="1712729149125"
        class="AIicon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4410"
        width="42"
        height="42"
      >
        <path
          d="M495.5 264.2c172 0 253.4 71.1 253.4 71.1V149S623.4 98.2 498.4 98.2c-129.6 0-257.7 50.8-257.7 50.8v203.3l20-19.9s61.7-68.2 234.8-68.2zM444 166h33.9v-33.9h33.9V166h33.9v33.9h-33.9v33.9h-33.9v-33.9H444V166z m-82.5 479.3c-150 24.9-256.4 97.1-256.4 229.2 2 34.3 22.3 53.5 60 53.4 87.2-0.2 184.2 0.4 329.7 0.4v-51.9c-47.5-20.6-94.3-231.9-133.3-231.1z m366.9-158.7c15.6-5.5 35.5-18 42.7-51.7 9.2-42.7-23.8-52.9-23.8-52.9-2.8-0.1-5.8 2.1-8.8 5.8-5.3-13-15.2-25.6-25.6-33.7-59.5-46.1-117.6-48.6-201.2-48.3-92.3 0.3-169.1 16.2-210.7 49.3-11 8.8-20 19.2-25 31-2.4-2.7-4.9-4.2-7.2-4.1 0 0-32.6 10.3-23.5 53.1 6.9 32.7 25.5 45.6 40.7 51.3 33 89.6 109.8 147.2 211.5 147.2 101.6 0 197.9-57.5 230.9-147z m-66.7 158.7c-39-0.8-85.5 210.4-133 231v51.9c145.5 0 242.2-0.6 329.4-0.4 37.7 0.1 58-21.7 60-56.1 0-132-106.4-201.5-256.4-226.4z"
          p-id="4411"
          fill="#ffffff"
        ></path>
      </svg>
      <p>智能助教</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import useChatStore from "@/store/front/chat";
let chatStore = useChatStore();
const showChatBox = () => {
  chatStore.change();
};
</script>

<style scoped lang="scss">
.assistantButton {
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 999;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  background-color: rgb(161, 174, 159);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  cursor: pointer;

  .AIicon {
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 12px;
    color: #fff;
  }
}
</style>
