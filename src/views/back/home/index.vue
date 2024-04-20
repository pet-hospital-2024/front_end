<template>
    <div class="outter-box">
        <div class="heading">虚拟宠物医院后台管理系统</div>
        <p class="container">欢迎回来&nbsp;亲爱的{{ userStore.userData?.identity=='administrator'?'管理员':'教师' }} </p>
    </div>

</template>
<script setup lang="ts">

import { onMounted } from 'vue';
//获取仓库对象
import useUserStore from '@/store/modules/user';

let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息
</script>
<style scoped>
.outter-box{
    width: calc(100% + 40);
    height: 87%;
    background:linear-gradient(white,rgb(151, 167, 151));
    margin-left:-20px;
    margin-right: -20px;
    margin-bottom: -20px;
}
.container{

    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:100px;
    font-size: 30px;
    font-weight:500;
}
.heading{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    font-weight: bold;
    margin-top:100px;
}
</style>