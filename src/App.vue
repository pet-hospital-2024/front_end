<template>
  <div>
    <!-- <HospitalTop/> -->
    <!-- <div class="content"> -->
      <router-view ></router-view>
    <!-- </div> -->
    <Modify v-if="modifyStore.isVisible" />
    
  </div>
</template>

<script setup lang="ts">
import Modify from "@/components/modify/index.vue";
import useModifyStore from "./store/front/modifyPw";
let modifyStore = useModifyStore();


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