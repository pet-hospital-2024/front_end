<template>
  <el-page-header :icon="ArrowLeft" @back="goBack" style="margin:15px 0 0 30px;">
      <template #content>
        <span class="title"> 在线测试 </span>
      </template>
    </el-page-header>
  <div class="container">
    <el-card
      style="margin-bottom: 20px"
      v-for="(paper, index) in useStore.testListArr"
      :key="index"
    >
      <div class="paperCard">
        <div class="left">
          <span style="font-size: 20px">{{ paper.exam_name }}</span>
          <br />
          <span style="color: gray"
            >起止时间：{{ paper.exam_start + " — " + paper.exam_end }}</span
          >
          <el-icon size="15px"><Timer /></el-icon>
          <span style="color: gray">{{ paper.duration }}分钟</span>
        </div>
        <div class="right">
          <el-button
            size="large"
            type="primary"
            plain
            color=" rgb(100, 220, 255)"
            style="width: 100%"
            @click="goExam(paper.paper_id,paper.duration)"
            >进入考试</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Timer } from "@element-plus/icons-vue";
import {onMounted} from "vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { useFrontExamStore } from "@/store/front/exam";
let useStore = useFrontExamStore();
let $router = useRouter();

const goBack = () => {
  $router.go(-1);
};



onMounted(async() => {
  await useStore.getTestListArr();
});

//暂时的数据
// const paperInfo = [
//   {
//     exam_id: "000",
//     paper_id: "000",
//     paper_name: "Test0",
//     duration: 100,
//     exam_start: "2024-04-01 20:00",
//     exam_end: "2024-04-02 20:00",
//   },
//   {
//     exam_id: "003",
//     paper_id: "004",
//     paper_name: "Test1",
//     duration: 100,
//     exam_start: "2024-04-01 20:00",
//     exam_end: "2024-04-02 20:00",
//   },
//   {
//     exam_id: "002",
//     paper_id: "005",
//     paper_name: "Test2",
//     duration: 100,
//     exam_start: "2024-04-01 20:00",
//     exam_end: "2024-04-02 20:00",
//   },
//   {
//     exam_id: "006",
//     paper_id: "006",
//     paper_name: "Test3",
//     duration: 100,
//     exam_start: "2024-04-01 20:00",
//     exam_end: "2024-04-02 20:00",
//   },
//   {
//     exam_id: "007",
//     paper_id: "007",
//     paper_name: "Test7",
//     duration: 100,
//     exam_start: "2024-04-01 20:00",
//     exam_end: "2024-04-02 20:00",
//   },
// ];

const goExam = (paper_id:string,duration:number) => {
  $router.push({
    path: "/front/testDetail",query:{paper_id:paper_id}
  });
  localStorage.setItem('examStarted', "true");
  localStorage.setItem('examStartTime', Date.now().toString());
  localStorage.setItem('isSubmitted',"false"); // 重置提交状态
  localStorage.setItem('totalExamTime', duration.toString()); 
};
</script>

<style scoped lang="scss">
.container {
  padding: 30px 50px;
  background-color: rgb(255, 255, 255);

  .paperCard {
    background-color: white;
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .left {
      // margin-left: 20px;
      span {
        font-size: 16px;
        line-height: 2;
        margin-right: 50px;
        margin-left: 5px;
      }
    }

    .right {
      margin-right: 30px;
      width: 150px;
    }
  }
}
</style>
