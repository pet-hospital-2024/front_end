<template>
    <div class="heading">虚拟宠物医院后台管理系统</div>
    <p class="container">欢迎回来,亲爱的{{ userStore.userData?.identity=='administrator'?'管理员':'教师' }} </p>
    
    <!-- <el-tabs @tab-click="handleChange">
        <el-tab-pane label="1111" name="1">haha</el-tab-pane>
        <el-tab-pane label="2222" name="2">haha</el-tab-pane>
        <el-tab-pane label="3333" name="3">haha</el-tab-pane>
        <el-tab-pane label="4444" name="4">haha</el-tab-pane>
    </el-tabs> -->
    <Upload ></Upload>
</template>
<script setup lang="ts">

import { onMounted } from 'vue';
//获取仓库对象
import useUserStore from '@/store/modules/user';

let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息
import Upload from "@/components/upload/index.vue"

// const handleChange = (tab:any,event:any)=>{
//     console.log(tab.paneName)
// }

</script>
<style scoped>
.container{

    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:100px;
    font-size: 30px;
}
.heading{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: bold;
    margin-top:100px
}
</style>