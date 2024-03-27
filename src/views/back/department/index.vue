<template>
    <el-card>
      <el-button type="primary" size="default" icon="Plus" @click="handleAddDepartment">
              添加科室
          </el-button>
      <el-table :data="departmentArr" style="margin:10px 0" stripe>
        <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
        <el-table-column prop="department_name" label="科室" width="80" align="center"/>
        <el-table-column  label="疾病种类" width="80" align="center">
            <template v-slot="{ row, index}">
                <el-button @click="handleShowDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
            </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row, index}">
            <el-button size="small" @click="handleEditQuestion(index,row)" :icon="Edit" type="info">编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleDeleteDepartment(index,row)" 
                  :icon="Delete">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>


<el-dialog v-model="AddDialogVisible" title="添加科室" width="600" align-center>

<el-form  style="max-width: 400px" :model="ruleForm" ref="formRef">
  <el-form-item label="科室名称">
    <el-input/>
  </el-form-item>
  <el-form-item label="科室描述">
    <el-input placeholder="简单描述,小于250个字"/>
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
  import {Delete, Edit, ZoomIn} from '@element-plus/icons-vue'
  let userStore=useUserStore();
  //目前首页挂载完毕发请求获取用户信息
  onMounted(()=>{
      userStore.userInfo();
  })
  const departmentArr=[
    {
        department_name:'aaaaa',
        disease_kinds:[
            {
                disease_name:'aaaaa_a'
            },
            {
                disease_name:'aaaaa_b'
            },
            {
                disease_name:'aaaaa_c'
            }
        ]
    },
    {
        department_name:'aaaaa',
        disease_kinds:[
            {
                disease_name:'aaaaa_a'
            },
            {
                disease_name:'aaaaa_b'
            },
            {
                disease_name:'aaaaa_c'
            }
        ]
    },
    {
        department_name:'aaaaa',
        disease_kinds:[
            {
                disease_name:'aaaaa_a'
            },
            {
                disease_name:'aaaaa_b'
            },
            {
                disease_name:'aaaaa_c'
            }
        ]
    },
    {
        department_name:'aaaaa',
        disease_kinds:[
            {
                disease_name:'aaaaa_a'
            },
            {
                disease_name:'aaaaa_b'
            },
            {
                disease_name:'aaaaa_c'
            }
        ]
    },
  ]
  import { ref } from 'vue';
  const AddDialogVisible=ref<boolean>(false);
  const handleAddDepartment=()=>{
    AddDialogVisible.value=true;
  }

  import { ElMessage, ElMessageBox } from 'element-plus'
const handleDeleteDepartment = ()=>{
  ElMessageBox.confirm(
    '您确定删除该科室吗？',
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