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
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 3vh;
  font-size: 36px;

  .item1 {
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33%;
    height: 14vh;
    background-color: rgb(137, 218, 252);
    cursor: pointer;
    // border-radius: 30px;
    margin-left: 0px;
    background-image: linear-gradient(to right, hwb(98 64% 16%), #97d1b5);
  }

  .item2 {
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33%;
    height: 14vh;
    // background-color: rgb(255, 160, 160);
    background-image: linear-gradient(to right, #97d1b5, #98c5e3);
    cursor: pointer;
    // border-radius: 10px;
  }

  .item3 {
    color:white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 33%;
    height: 14vh;
    // background-color: rgb(149, 149, 255);
    cursor: pointer;
    margin-right: 0px;
    // border-radius: 30px;
    background-image: linear-gradient(to right, #98c5e3, #878ab0);
  }
}
</style>
