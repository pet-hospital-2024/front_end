<template>
  <div>
    <el-page-header
      :icon="ArrowLeft"
      @back="goBack"
      style="margin: 15px 0 0 30px"
    >
      <template #content>
        <span class="title">职能学习</span>
      </template>
    </el-page-header>
    <Card />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft } from "@element-plus/icons-vue";
import Card from "./card/index.vue";
import { useRouter } from "vue-router";
let $router = useRouter();

const goBack = () => {
  // $router.replace({ path: "/front/study" });
  $router.go(-1);
};
</script>

<style scoped></style>
