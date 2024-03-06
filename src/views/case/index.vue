<template>
    <div>
        <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0" --active-color="#ffffff">
      <img
        style="width: 50px"
        src="@/assets/logo.svg"
        alt="Element logo"
      />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
    </el-sub-menu>
  </el-menu>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
.flex-grow {
  flex-grow: 1;
}
</style>