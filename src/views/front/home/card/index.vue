<template>
  <div>
    <div class="card">
      <el-card class="item1" shadow="hover">3D导览</el-card>
      <el-card class="item2" shadow="hover" @click="goStudy">职能学习</el-card>
      <el-card class="item3" shadow="hover" @click="goTest">在线测试</el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();
const goStudy = () => {
  $router.push({ path: "/front/study" });
};
const goTest = () => {
  $router.push({ path: "/front/testList" });
};
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-wrap:nowrap;
  justify-content: space-between;
  // margin-top: 3vh;
  font-size: 36px;

  .item1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 50vh;
    margin-left: 150px;
    border-radius: 15px;
    opacity: 50%;
    background-color: rgb(167, 197, 167);
    cursor: pointer;
  }

  .item2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 50vh;
    // margin-right: 50px;
    border-radius: 15px;
    opacity: 50%;
    background-color: rgb(167, 197, 167);
    cursor: pointer;
  }

  .item3 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 50vh;
    margin-right: 150px;
    border-radius: 15px;
    opacity: 50%;
    background-color: rgb(167, 197, 167);
    cursor: pointer;
  }
}

</style>
