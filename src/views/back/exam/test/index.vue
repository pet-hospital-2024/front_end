<template>
    <el-card>
        <!--添加考试-->
        <el-button type="primary" size="default" icon="Plus" @click="handleAddTest">
            创建考试
        </el-button>
        <el-table style="margin:10px 0" stripe>
            <el-table-column type="index" label="序号" width="80" align="center"/>
            <el-table-column  label="考试起始时间" width="80" align="center"/>
            <el-table-column  label="考试截至时间" width="80" align="center"/>
            <el-table-column  label="考试时长" width="80" align="center"/>
        </el-table>
    </el-card>
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