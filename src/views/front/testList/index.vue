<template>
  <div class="container">
    <el-card
      style="margin-bottom: 20px"
      v-for="(paper, index) in paperInfo"
      :key="index"
    >
      <div class="paperCard">
        <div class="left">
          <span style="font-size: 20px">{{ paper.paper_name }}</span>
          <br />
          <span style="color: gray"
            >起止时间：{{ paper.exam_start + " — " + paper.exam_end }}</span
          >
          <el-icon size="20px"><Timer /></el-icon>
          <span style="color: gray">{{ paper.duration }}分钟</span>
        </div>
        <div class="right">
          <el-button
            size="large"
            type="primary"
            plain
            color=" rgb(100, 220, 255)"
            style="width: 100%"
            @click="goExam"
            >进入考试</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Timer } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import {onMounted} from "vue";
//@ts-ignore
import { useFrontExamStore } from "@/store/front/exam";
let useStore = useFrontExamStore();

onMounted(async() => {
  await useStore.getTestListArr();
});

let $router = useRouter();

//暂时的数据
const paperInfo = [
  {
    exam_id: "000",
    paper_id: "000",
    paper_name: "Test0",
    duration: 100,
    exam_start: "2024-04-01 20:00",
    exam_end: "2024-04-02 20:00",
  },
  {
    exam_id: "003",
    paper_id: "004",
    paper_name: "Test1",
    duration: 100,
    exam_start: "2024-04-01 20:00",
    exam_end: "2024-04-02 20:00",
  },
  {
    exam_id: "002",
    paper_id: "005",
    paper_name: "Test2",
    duration: 100,
    exam_start: "2024-04-01 20:00",
    exam_end: "2024-04-02 20:00",
  },
  {
    exam_id: "006",
    paper_id: "006",
    paper_name: "Test3",
    duration: 100,
    exam_start: "2024-04-01 20:00",
    exam_end: "2024-04-02 20:00",
  },
  {
    exam_id: "007",
    paper_id: "007",
    paper_name: "Test7",
    duration: 100,
    exam_start: "2024-04-01 20:00",
    exam_end: "2024-04-02 20:00",
  },
];

const goExam = () => {
  $router.push({
    path: "/front/testDetail",
  });
  localStorage.setItem('examStarted', "true");
  localStorage.setItem('examStartTime', Date.now().toString());
  localStorage.setItem('isSubmitted',"false"); // 重置提交状态
};
</script>

<style scoped lang="scss">
.container {
  padding: 30px;
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
      }
    }

    .right {
      margin-right: 30px;
      width: 150px;
    }
  }
}
</style>
