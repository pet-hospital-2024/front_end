<template>
    <el-card>
        <!--添加考试-->
        <el-button type="primary" size="default" icon="Plus" @click="handleAddTest">
            创建考试
        </el-button>
        <el-table style="margin:10px 0" stripe :data="testArr">
            <el-table-column type="index" label="序号" width="80" align="center"/>
            <el-table-column  label="考试起始时间" prop="start_time" width="100" align="center"/>
            <el-table-column  label="考试截至时间" prop="end_time" width="100" align="center"/>
            <el-table-column  label="考试时长" width="80" prop="last_time" align="center"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button size="small" @click="handleEditTest(scope.$index, scope.row)"
                    >编辑</el-button
                    >
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDeleteTest(scope.$index, scope.row)"
                    >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </el-card>
     <el-dialog v-model="AddDialogVisible" title="创建考试" width="800" align-center>
    <el-form>
        <el-form-item label="考试名称">
            <input>
        </el-form-item>
        <el-form-item label="考试时长">
            <input>
        </el-form-item>
        <el-form-item>
            <div class="demo-time-range">
    <el-time-select
      v-model="startTime"
      style="width: 240px"
      :max-time="endTime"
      class="mr-4"
      placeholder="开始日期"
      start="08:30"
      step="00:15"
      end="18:30"
    />
    <el-time-select
      v-model="endTime"
      style="width: 240px"
      :min-time="startTime"
      placeholder="截至日期"
      start="08:30"
      step="00:15"
      end="18:30"
    />
  </div>
        </el-form-item>
        <el-form-item label="选择试卷">
            
        </el-form-item>
    </el-form>
    <template #footer>
    <div class="dialog-footer">
        <el-button type="primary">提交</el-button>
        <el-button>重置</el-button>
    </div>
    </template>
 </el-dialog>
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
import { ref } from 'vue';
const AddDialogVisible=ref<boolean>(false);
const handleAddTest=()=>{
    AddDialogVisible.value=true;
}

const testArr=[
    {
        start_time:'2024.1.4',
        end_time:'2024.2.5',
        last_time:'1h',
    },
    {
        start_time:'2024.1.4',
        end_time:'2024.2.5',
        last_time:'1h',
    },
    {
        start_time:'2024.1.4',
        end_time:'2024.2.5',
        last_time:'1h',
    },
    {
        start_time:'2024.1.4',
        end_time:'2024.2.5',
        last_time:'1h',
    },
]


import { ElMessage, ElMessageBox } from 'element-plus'
const handleDeleteTest = ()=>{
  ElMessageBox.confirm(
    '您确定删除该考试吗？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '成功删除',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      })
    })
}
</script>