<template>
  <div>
    <div class="content">
      <div class="title">
        <p>职能学习</p>
      </div>
      <div class="card">
        <el-card class="item1" shadow="hover" @click="goRole"
          >角色扮演
        </el-card>
        <el-card class="item2" shadow="hover" @click="goCase">病例学习</el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();
const goRole = () => {
  $router.push({ path: "/front/role"});
};

const goCase = () => {
  $router.push({ path: "/front/case" });
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.title {
  width: 100%;
  margin-top: 80px;
  display: flex;
  justify-content: center;
  p {
    font-size: 48px;
  }
}
.card {
  height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  margin-top: 100px;

  .item1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35%;
    height: 300px;
    margin-right: 50px;
    border-radius: 15px;
    // background-color: rgb(167, 197, 167);
    cursor: pointer;
  }

  .item2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 35%;
    height: 300px;
    margin-left: 50px;
    border-radius: 15px;
    // background-color: rgb(211, 134, 134);
    cursor: pointer;
  }
}
</style>
