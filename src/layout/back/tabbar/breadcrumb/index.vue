<!--封装面包屑组件-->
<template>
    <el-icon :size="20" style="margin-right:10px;cursor: pointer" @click="changeIcon" >
            <component :is=" LayoutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <!--顶部左侧面包屑导航栏-->
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
//从仓库获取
import useBackLayoutSettingStore from '@/store/modules/setting';
let LayoutSettingStore=useBackLayoutSettingStore();

const changeIcon= ()=>{
    LayoutSettingStore.fold=!LayoutSettingStore.fold;
}
</script>
<script lang="ts">
export default{
    name:'Breadcrumb',
}
</script>