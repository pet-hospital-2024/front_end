<template>
  <div class="container">
    <el-page-header :icon="ArrowLeft" @back="goBack" style="margin:15px 0 0 30px;">
      <template #content>
        <span class="title">  </span>
      </template>
    </el-page-header>
    <Card />
  </div>
</template>

<script setup lang="ts">
import Card from "./card/index.vue";
import { ArrowLeft } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

let $route = useRouter();
const goBack = () => {
  $route.go(-1);
};
</script>

<style scoped lang="scss">
</style>
