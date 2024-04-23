<template>
  <div>
    <div class="content">
      <div class="card">
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

        <el-card class="item4" shadow="hover" @click="goCase">

          <p>病例学习</p>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();

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
  // margin-top: 20px;
}

// .title {
//   width: 100%;
//   margin-top: 80px;
//   display: flex;
//   justify-content: center;
//   p {
//     font-size: 48px;
//   }
// }
.card {
  // height: 300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-family: Georgia, "Times New Roman", Times, serif;
  // margin-top: 100px;

  .box {
    margin-top: 5vh;
    margin-left: 10vw;
    width: 20vw;
  }
  .item1 {
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 80%;
    height: 20vh;
    // margin-top: 50px;
    background-color: #c7d9cb;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25vw;
    height: 70vh;
    margin-left: 2vw;
    margin-top: 5vh;
    border-radius: 15px;
    background-color: #dadfc4;
    font-size: 42px;
    cursor: pointer;
  }
  .item1:hover,
  .item2:hover,
  .item3:hover {
    background-color: #789c8b;
  }

  .item4:hover {
    background-color: #aab08f;
  }
}
</style>
