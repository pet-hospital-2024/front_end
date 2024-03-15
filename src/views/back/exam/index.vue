<template>
    <p>考试管理界面</p>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
//获取仓库对象
import useUserStore from '@/store/modules/user';
let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息
onMounted(()=>{
    userStore.userInfo();
})
</script>