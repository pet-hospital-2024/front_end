<!--封装面包屑组件-->
<template>
    <el-icon :size="20" style="margin-right:10px;cursor: pointer" @click="changeIcon" >
            <component :is=" LayoutSettingStore.fold?'Fold':'Expand'"></component>
    </el-icon>
    <!--顶部左侧面包屑导航栏-->
    <el-breadcrumb :separator-icon="ArrowRight">
        <!--遍历动态生成-->
        <el-breadcrumb-item
      v-for="(item, index) in $route.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon style="vertical-align: middle">
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span style="margin: 0 5px; vertical-align: middle">
        {{ item.meta.title }}
      </span>
    </el-breadcrumb-item>

    </el-breadcrumb>
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
//从仓库获取
import useBackLayoutSettingStore from '@/store/modules/setting';
import { useRoute } from 'vue-router';
let LayoutSettingStore=useBackLayoutSettingStore();
//获取路由对象
let $route=useRoute();
const changeIcon= ()=>{
    LayoutSettingStore.fold=!LayoutSettingStore.fold;
}

</script>
<script lang="ts">
export default{
    name:'Breadcrumb',
}
</script>