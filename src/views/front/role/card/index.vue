<template>
  <div>
    <div class="content">
        <!-- <div class="top">
            <p class="title">角色扮演</p>
            <p class="description">描述</p>
        </div> -->
      <div class="card">
        <el-card class="item1" shadow="hover" @click="goDetail('3')">前台</el-card>
        <el-card class="item2" shadow="hover" @click="goDetail('2')">医助</el-card>
        <el-card class="item3" shadow="hover" @click="goDetail('1')">兽医</el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

let $router = useRouter();

const goDetail=(role_id:string)=>{
  // console.log(role_id);
  $router.push({path:"/front/roleDetail", query:{role_id:role_id}});
};
</script>

<style scoped>
.content{
    width:100%;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
}

/* .top{
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title{
        font-size: 48px;
    }
    .description{
        margin-top: 30px;
        font-size:24px;
    }
} */
.card {
  width:40vw;
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  font-size: 36px;

  .item1 {
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 25%; */
    height: 80px;
    margin-top: 10px;
    background-color: rgb(185, 196, 185);
    cursor: pointer;
  }

  .item2 {
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 25%; */
    height: 80px;
    margin-top: 20px;
    background-color: rgb(209, 209, 209);
    cursor: pointer;
  }

  .item3 {
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 25%; */
    height: 80px;
    margin-top: 20px;
    background-color: rgb(157, 157, 157);
    cursor: pointer;
  }
}
</style>
