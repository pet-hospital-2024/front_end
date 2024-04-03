<template>
  <div>
    <div class="content">
      <!-- <div class="title">
        <p>职能学习</p>
      </div> -->
      <div class="card">
        <!-- <el-card class="item1" shadow="hover" @click="goRole"
          >角色扮演
        </el-card> -->
        <!-- <div class="content"> -->
        <!-- <div class="top">
            <p class="title">角色扮演</p>
            <p class="description">描述</p>
        </div> -->
        <!-- <div class="card"> -->
        <el-col :span="13" style="padding: 20px">
          <div class="box">
            <el-card class="item1" shadow="hover" @click="goDetail('3')"
              >前台</el-card
            >
            <el-card class="item2" shadow="hover" @click="goDetail('2')"
              >医助</el-card
            >
            <el-card class="item3" shadow="hover" @click="goDetail('1')"
              >兽医</el-card
            >
          </div>
        </el-col>

        <!-- </div> -->
        <!-- </div> -->
        <el-col :span="11"
          ><el-card class="item4" shadow="hover" @click="goCase"
            >病例学习</el-card
          ></el-col
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();
const goRole = () => {
  $router.push({ path: "/front/role" });
};

const goCase = () => {
  $router.push({ path: "/front/case" });
};

const goDetail = (role_id: string) => {
  // console.log(role_id);
  $router.push({ path: "/front/roleDetail", query: { role_id: role_id } });
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

  .box{
    margin-top: 10vh;
    margin-left: 52vh;
    width: 50%;
  }
  .item1 {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 80%;
    height: 20vh;
    margin-top: 50px;
    background-color:#c7d9cb;
    cursor: pointer;
    border-radius: 15px;
  }

  .item2 {
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 25%; */
    height: 20vh;
    margin-top: 5vh;
    background-color: #c7d9cb;
    cursor: pointer;
    border-radius: 15px;
  }

  .item3 {
    display: flex;
    align-items: center;
    justify-content: center;
    /* width: 25%; */
    height: 20vh;
    margin-top: 5vh;
    background-color: #c7d9cb;
    cursor: pointer;
    border-radius: 15px;
  }
  .item4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 70vh;
    // margin-left: 50px;
    margin-top: 10vh;
    border-radius: 15px;
    background-color: #dadfc4;
    cursor: pointer;
  }
}
</style>
