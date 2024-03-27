<template>
  <el-card>
    <el-button type="primary" size="default" icon="Plus" @click="handleAddCase">
            添加病例
        </el-button>
    <el-table style="margin:10px 0" stripe>
      <el-table-column type="index" label="序号" width="80" align="center"/>
      <el-table-column  label="科室" width="80" align="center"/>
      <el-table-column  label="疾病种类" width="80" align="center"/>
      <el-table-column align="center" prop="操作">
        <template>
          <el-button size="small" :icon="ZoomIn">详情</el-button>
          <el-button size="small" @click="handleEditQuestion(index,row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeleteQuestion(index,row)" 
                :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script setup lang="ts">



 
import { onMounted } from 'vue';
//获取仓库对象
import useUserStore from '@/store/modules/user';
import {Delete, Edit, ZoomIn} from '@element-plus/icons-vue'
let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息
onMounted(()=>{
    userStore.userInfo();
})
</script>