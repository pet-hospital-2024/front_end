<template>
  <el-page-header
    :icon="ArrowLeft"
    @back="goBack"
    style="margin: 15px 0 0 30px"
  >
    <template #content>
      <span class="title">病例学习</span>
    </template>
  </el-page-header>
  <div class="container">
    <div class="title">
      <!-- <h1>病例学习</h1> -->
      <!-- <h3>描述</h3> -->
    </div>
    <List></List>
  </div>
</template>

<script setup lang="ts">
import List from "./directory/index.vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

let $route = useRouter();
// import { ref } from 'vue'
const goBack = () => {
  // $route.replace({ path: "/front/study" });
  $route.go(-1);
};
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // background: rgb(212, 246, 233);

  .title {
    display: flex;
    flex-direction: column;
    // margin-top: 20px;
    h1 {
      color: rgb(100, 100, 100);
      font-size: 32px;
      // font-family:"FangSong";
    }
    h3 {
      margin-top: 10px;
      font-size: 16px;
    }
  }
}
</style>
