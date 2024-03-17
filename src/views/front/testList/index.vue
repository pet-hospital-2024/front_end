<template>
  <div class="container">
    <el-card style="margin-bottom: 20px">
      <div class="paperCard">
        <div class="left">
          <span style="font-size: 20px">{{ paperInfo.paper_name }}</span>
          <br />
          <span style="color: gray"
            >起止时间：{{
              paperInfo.exam_start + " — " + paperInfo.exam_end
            }}</span
          >
          <el-icon size="20px"><Timer /></el-icon>
          <span style="color: gray">{{ paperInfo.duration }}分钟</span>
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
    <el-card style="margin-bottom: 20px">
      <div class="paperCard">
        <div class="left">
          <span style="font-size: 20px">{{ paperInfo.paper_name }}</span>
          <br />
          <span style="color: gray"
            >起止时间：{{
              paperInfo.exam_start + " — " + paperInfo.exam_end
            }}</span
          >
          <el-icon size="20px"><Timer /></el-icon>
          <span style="color: gray">{{ paperInfo.duration }}分钟</span>
        </div>
        <div class="right">
          <el-button
            size="large"
            type="primary"
            plain
            color=" rgb(100, 220, 255)"
            style="width: 100%"
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

let $router = useRouter();

const paperInfo = {
  exam_id: "001",
  paper_id: "001",
  paper_name: "Test",
  duration: 100,
  exam_start: "2024-04-01 20:00",
  exam_end: "2024-04-02 20:00",
};

const goExam = () => {
  $router.push({
    path: "/front/testDetail",
  });
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
