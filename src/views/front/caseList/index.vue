<template>
  <div class="caseTable">
    <el-table :data="tableData" size="large" stripe style="width: 90%" max-height="500">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column prop="name" label="病例名称" width="200" />
      <el-table-column prop="info" label="基本情况" width="600" />
      <el-table-column prop="operation" label="操作">
        <template #default>
          <el-button link type="primary" size="default" @click="goDetailedCase"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
let $router = useRouter();

//测试用例
const tableData = [
  {
    id: "001",
    name: "犬蕴热",
    info:"5岁小狗豆豆"
  },
  {
    id: "001",
    name: "犬蕴热",
  },
  {
    id: "001",
    name: "犬蕴热",
  },
  {
    id: "001",
    name: "犬蕴热",
  },
  {
    id: "001",
    name: "犬蕴热",
  },
];

const goDetailedCase = () => {
  $router.push({ path: "/front/caseDetail" });
};
</script>

<style lang="scss" scoped>
.caseTable {
  margin-top: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
}
</style>
