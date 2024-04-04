<template>
    <p class="container">欢迎回来,亲爱的{{ userStore.userData?.identity }} {{ userStore.userData?.username }}</p>
    
    
</template>
<script setup lang="ts">

import { onMounted } from 'vue';
//获取仓库对象
import useUserStore from '@/store/modules/user';

let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息
console.log(userStore.userData);
</script>
<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top:100px;
    font-size: 30px;
}
</style>@/store/back/role