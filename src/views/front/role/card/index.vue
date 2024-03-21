<template>
  <div>
    <div class="content">
        <div class="top">
            <p class="title">角色扮演</p>
            <p class="description">描述</p>
        </div>
      <div class="card">
        <el-card class="item1" shadow="hover" @click="goDetail">前台</el-card>
        <el-card class="item2" shadow="hover" @click="goDetail">医助</el-card>
        <el-card class="item3" shadow="hover" @click="goDetail">兽医</el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

let $router = useRouter();
const goDetail=()=>{
  $router.push({path:"/front/roleDetail"});
};
</script>

<style scoped>
.content{
    width:100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.top{
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title{
        font-size: 48px;
    }
    .description{
        margin-top: 50px;
        font-size:24px;
    }
}
.card {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 100px;
  font-size: 36px;

  .item1 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 200px;
    background-color: rgb(167, 197, 167);
    margin-right: 70px;
    cursor: pointer;
  }

  .item2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 200px;
    background-color: rgb(211, 134, 134);
    margin-right: 70px;
    cursor: pointer;
  }

  .item3 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25%;
    height: 200px;
    background-color: rgb(95, 95, 146);
    cursor: pointer;
  }
}
</style>
