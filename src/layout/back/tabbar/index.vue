<template>
    <div class="tabbar">
        <!--tabbar左侧-->
        <div class="tabbar_left">
            <!--左侧静态icon-->
            <Breadcrumb></Breadcrumb>
        </div>
        <!--tabbar右侧-->
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>
<script setup lang="ts">
//使用右箭头作为分隔符
 
import Breadcrumb from './breadcrumb/index.vue'//导入面包屑组件
import Setting from './setting/index.vue'
</script>
<style scoped lang="scss">
.tabbar{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;//一左一右
    //tabbar背景渐变色，后期UI设计加上
    //background-image: linear-gradient(to right,white,black,white);

    .tabbar_left{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right{
        display:flex;
        align-items: center;
        margin-right:20px;
    }
} 
</style>