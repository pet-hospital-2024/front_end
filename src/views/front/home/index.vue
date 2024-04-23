<template>
  <div class="container">
    <!-- <Carousel /> -->
    <div class="title">
      <h1>开启你的宠物医疗学习之旅</h1>
      <h3>Embarking on your Veterinary Learning Adventure</h3>
    </div>
    <!-- <Card/> -->
    <div class="card">
      <div class="item1" @click="goPanorama">
        <!-- <div class="picture"></div> -->
        <p class="name">3D导览</p>
        <p class="description">查看医院内部全景</p>
        <p class="description">View the panoramic view of the hospital</p>
      </div>
      <div class="item2" @click="goStudy">
        <!-- <div class="picture"></div> -->
        <p class="name">职能学习</p>
        <p class="description">进行角色扮演和病例学习</p>
        <p class="description">Conduct role-playing and case study</p>
      </div>
      <div class="item3" @click="goTest">
        <!-- <div class="picture"></div> -->
        <p class="name">在线测试</p>
        <p class="description">及时测试所学知识</p>
        <p class="description">Timely testing of learned knowledge</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();
const goPanorama = () => {
  $router.push({ path: "/front/panorama" });
};
const goStudy = () => {
  $router.push({ path: "/front/study"});
};
const goTest = () => {
  $router.push({ path: "/front/testList" });
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 92vh;
  // background: url("@/assets/images/background.jpg") no-repeat;
  // background-size: cover;
  background-color: #f3f9f1;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  

  .title {
    height: 40vh;
    // padding: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // font-size:56px;
    // font-weight: 600;
    // color: rgb(255, 255, 255);
    h1 {
      margin-top: 10vh;
      font-size: 56px;
      font-weight: 600;
      // color: rgb(255, 255, 255);
      // font-family: Georgia, "Times New Roman", Times, serif;
    }
    h3 {
      margin-top: 30px;
      font-size: 36px;
      font-weight: 400;
      font-family: Georgia, "Times New Roman", Times, serif;
      // color: rgb(255, 255, 255);
    }
  }

  .card {
    width: 90%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    // margin-top: 3vh;
    font-size: 36px;
    height: 45vh;

    .item1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
      width: 23%;
      height: 45vh;
      margin-left: 150px;
      margin-right: 20px;
      border-radius: 15px;
      // opacity: 50%;
      background-color: rgb(255, 255, 255);
      cursor: pointer;
      transition: box-shadow 0.3s ease;
      background: url("@/assets/images/item1.jpg") no-repeat center center;
      background-size: cover;
    }

    .item2 {
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
      width: 23%;
      height: 45vh;
      margin-right: 20px;
      border-radius: 15px;
      // opacity: 50%;
      background-color: rgb(255, 255, 255);
      cursor: pointer;
      transition: box-shadow 0.3s ease;
      background: url("@/assets/images/item2.jpg") no-repeat center center;
      background-size: cover;
    }

    .item2 .item1 .item3:hover {
      box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.2); /* 鼠标悬停时的阴影效果 */
    }

    .item3 {
      display: flex;
      flex-direction: column;
      align-items: center;
      // justify-content: center;
      width: 23%;
      height: 45vh;
      margin-right: 150px;
      border-radius: 15px;
      // opacity: 50%;
      background-color: rgb(255, 255, 255);
      cursor: pointer;
      transition: box-shadow 0.3s ease;
      background: url("@/assets/images/item3.jpg") no-repeat center center;
      background-size: cover;
    }

    .name {
      color: #1e3232;
      height: 10vh;
      opacity: 0.6;
      font-size: 36px;
      line-height: 10vh;
      margin-top: 15vh;
      margin-bottom: 5vh;
    }

    .description {
      text-align: center;
      width: 60%;
      margin-top: 1vh;
      color: #1e3232;
      font-size: 14px;
    }
  }
}
</style>
