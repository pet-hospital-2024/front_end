<template>
  <el-page-header :icon="ArrowLeft" @back="goBack" style="margin:15px 0 0 30px;">
      <template #content>
        <span class="title"> {{ $route.query.disease_name }}</span>
      </template>
    </el-page-header>
  <div class="caseTable">
    
    <el-table
      :data="useStore.caseList"
      size="large"
      stripe
      style="width: 90%"
      max-height="500"
    >
      <el-table-column prop="case_id" label="ID" width="150" />
      <el-table-column prop="case_name" label="病例名称" width="200" />
      <el-table-column prop="case_introduction" label="基本情况" width="700" />
      <el-table-column prop="operation" label="操作">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="default"
            @click="goDetailedCase(scope.row.case_id)"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import useFrontCaseStore from "@/store/front/case";
import { ArrowLeft } from "@element-plus/icons-vue";

let $router = useRouter();
const goBack = () => {
  // $router.replace({ path: "/front/case" });
  $router.go(-1);
};
let useStore = useFrontCaseStore();
//获取当前路由的信息
let $route = useRoute();
onMounted(() => {
  useStore.getCaseList($route.query.disease_id as string);
});

//测试用例
// const tableData = [
//   {
//     case_id: "001",
//     case_name: "犬蕴热",
//     case_introduction: "5岁小狗豆豆",
//   },
//   {
//     case_id: "001",
//     case_name: "犬蕴热",
//     case_introduction: "5岁小狗豆豆",
//   },
//   {
//     case_id: "001",
//     case_name: "犬蕴热",
//     case_introduction: "5岁小狗豆豆",
//   },
//   {
//     case_id: "001",
//     case_name: "犬蕴热",
//     case_introduction: "5岁小狗豆豆",
//   },
//   {
//     case_id: "001",
//     case_name: "犬蕴热",
//     case_introduction: "5岁小狗豆豆",
//   },
// ];

const goDetailedCase = (case_id: string) => {
  $router.push({ path: "/front/caseDetail", query: { case_id: case_id } });
};
</script>

<style lang="scss" scoped>
.caseTable {
  margin-top: 20px;
  width: 100%;
  height: 200px;
  display: flex;
  // flex-direction: column;
  justify-content: center;
}

.title{
  // margin-left: 200px;
  font-size: 16px;
  font-weight: 550;
}
</style>
