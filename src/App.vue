<template>
  <div>
    <AIassistant/>
    <ChatBox v-if="chatStore.isVisible"/>
    <!-- <HospitalTop/> -->
    <!-- <div class="content"> -->
      <router-view ></router-view>
    <!-- </div> -->
    <Modify v-if="modifyStore.isVisible" />
    
    
  </div>
</template>

<script setup lang="ts">
import useModifyStore from "./store/front/modifyPw";
import useChatStore from "./store/front/chat";
import Modify from "@/components/modify/index.vue";
import AIassistant from "@/components/AIassistant/index.vue";
//@ts-ignore
import ChatBox from "@/components/chatBox/index.vue";

let modifyStore = useModifyStore();
let chatStore = useChatStore();


</script>

<style scoped lang="scss">
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgb(151, 222, 233);
  .content{
    margin-top: 80px;
    // margin-left: 180px;
    // margin-right: 180px;
    width: 1200px;
    min-height: 850px;
    background-color: white;
  }
}
</style>./store/front/modifyPw