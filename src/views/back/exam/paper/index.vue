<template>
    <el-card>
        <el-button type="primary" size="default" icon="Plus" @click="handleAddPaper">
            创建试卷
        </el-button>
        <el-table :data="paperArr" style="margin:10px 0" stripe  >
            <el-table-column type="index" label="序号" width="80" align="center" prop="paperId"/>
            <el-table-column label="试卷名称" width="180" align="center" prop="paperName"></el-table-column>
            <el-table-column label="题目数量" width="180" align="center" prop="questionNumber"/>
            <el-table-column label="试卷总分" align="center" width="180" prop="value"/>

            <el-table-column align="center" class="operation" label="操作">
            <template v-slot="{ row, index }">
              <el-button @click="handleShowDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
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
import {ZoomIn,Edit,Delete} from '@element-plus/icons-vue'
let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息
onMounted(()=>{
    userStore.userInfo();
})

//试卷数据
const paperArr=[
    {
        paperId:'1',
        paperName:'心脏病小测',
        duration:'2000',
        questionNumber:'20',
        value:'100',

    },
    {
        paperId:'2',
        paperName:'脑血管病小测',
        duration:'1000',
        questionNumber:'20',
        value:'100',

    },
]
</script>