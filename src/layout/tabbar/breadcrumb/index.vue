<!--封装面包屑组件-->
<template>
    <el-icon :size="20" style="margin-right:10px;cursor: pointer" @click="changeIcon" >
        <Expand/>
    </el-icon>
    <!--顶部左侧面包屑导航栏-->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ref } from 'vue';
//定义一个响应式数据切换图标
let fold= ref(false);
const changeIcon= ()=>{
    fold.value=!fold.value
}
</script>