<template>
    <el-card>
      <el-button type="primary" size="default" icon="Plus" @click="handleAddDepartment">
              添加科室
          </el-button>
      <el-table :data="departmentInfoStore.departmentInfoArr" style="margin:10px 0" stripe>
        <el-table-column type="index" label="序号" min-width="20%" align="center"></el-table-column>
        <el-table-column prop="department_name" label="科室" min-width="20%" align="center"/>
        <el-table-column align="center" label="操作" min-width="40%">
          <template v-slot="{ row, index}">
            <el-button size="small" @click="handleEditDepartment(index,row)" :icon="Edit" type="info">编辑
                </el-button>
                <el-button size="small" type="danger" @click="handleDeleteDepartment(index,row)" 
                  :icon="Delete">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column  label="选择科室" align="center" min-width="20%">
            <template v-slot="{ row, index}">
                <el-button @click="handleEnterDepartment(index,row)" class="my-button" :icon="Pointer">进入科室</el-button>
            </template>
        </el-table-column>
      </el-table>
    </el-card>


    <!--分页器-->
<el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :background="true"
      layout="prev, pager, next, jumper, -> , total"
      :total="departmentInfoStore.total"
      @current-change="handlePageChange"
      style="margin-top:20px"
/>
<!-- 添加科室对话 -->
<el-dialog v-model="AddDialogVisible" title="添加科室" width="600" align-center>
    <el-form style="max-width: 400px" :model="addDepartmentForm" ref="formRef" >
      <el-form-item label="科室名称" required>
        <el-input v-model="addDepartmentForm.department_name" />
      </el-form-item>
      <!-- 可以添加科室描述 -->
      <!-- <el-form-item label="科室描述">
        <el-input v-model="ruleForm.departmentDescription" placeholder="简单描述，小于250个字" />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancleAddDepartmentForm">取消</el-button>
        <el-button type="primary" @click="submitAddDepartmentForm">提交</el-button>
        
      </div>
    </template>
  </el-dialog>
<!-- 编辑科室对话 -->
  <el-dialog v-model="EditDialogVisible" title="编辑科室" width="600" align-center>
    <el-form style="max-width: 400px" :model="editDepartmentForm" ref="formRef" label-width="auto" >
      <el-form-item label="科室ID" >
        <el-input v-model="editDepartmentForm.department_id" disabled/>
      </el-form-item>
      <el-form-item label="科室名称" required>
        <el-input v-model="editDepartmentForm.department_name" />
      </el-form-item>
      <!-- 可以添加科室描述 -->
      <!-- <el-form-item label="科室描述">
        <el-input v-model="ruleForm.departmentDescription" placeholder="简单描述，小于250个字" />
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancleEditDepartmentForm">取消</el-button>
        <el-button type="primary" @click="submitEditDepartmentForm">提交</el-button>
      </div>
    </template>
  </el-dialog>
<!-- 进入科室对话框 -->
  <el-drawer v-model="EnterDialogVisible" title="疾病管理" size="50%"  modal="true" :departmentData="departmentData" @open="open(departmentData.department_id)">
    <el-card >
      
    <template #header>
      <div  style="display: flex;justify-content: space-between;align-items: center;">
        <span style="text-align: center;">{{ departmentData.department_name }}</span>
        <el-button  @click="handleAddDisease(departmentData.department_id)" icon="Plus" >添加</el-button>
      </div>
    </template>
    
    <el-table :data="diseaseInfoStore.diseaseInfoArr" style="width: 100%" height="400">
      
      <el-table-column label="疾病名称" prop="disease_name" align="center" width="150"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row, index }">
              
              <el-button size="small" @click="handleEditDisease(index,row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeleteDisease(index,row)" 
                :icon="Delete">删除</el-button>

        </template>
      </el-table-column>
      
    </el-table>
  </el-card>
  <!-- 添加疾病对话框 -->
  <el-dialog v-model="AddDiseaseDialogVisible" title="添加疾病" width="600" align-center>
    <el-form style="max-width: 400px" :model="addDiseaseForm" ref="formRef" label-width="auto">
      <el-form-item label="科室ID">
        <el-input v-model="addDiseaseForm.department_id" disabled/>
      </el-form-item>
      <el-form-item label="疾病名称" required>
        <el-input v-model="addDiseaseForm.disease_name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancleAddDiseaseForm">取消</el-button>
        <el-button type="primary" @click="submitAddDiseaseForm(addDiseaseForm.department_id)">提交</el-button>
        
      </div>
    </template>
  </el-dialog>

  <!-- 编辑疾病对话框 -->
  <el-dialog v-model="EditDiseaseDialogVisible" title="编辑疾病" width="600" align-center>
    <el-form style="max-width: 400px" :model="editDiseaseForm" ref="formRef" label-width="auto">
      <el-form-item label="科室ID">
        <el-input v-model="editDiseaseForm.disease_id" disabled/>
      </el-form-item>
      <el-form-item label="疾病名称" required>
        <el-input v-model="editDiseaseForm.disease_name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancleEditDiseaseForm">取消</el-button>
        <el-button type="primary" @click="submitEditDiseaseForm">提交</el-button>
        
      </div>
    </template>
  </el-dialog>
  <!-- 删除疾病对话框 -->
  </el-drawer>
</template>

  <script setup lang="ts">
  
  //获取仓库对象

  import {Delete, Edit, Pointer, ZoomIn} from '@element-plus/icons-vue'
  import useBackDepartmentInfoStore from "@/store/back/department";
  let departmentInfoStore=useBackDepartmentInfoStore();

  import { ref,onMounted, reactive } from 'vue';
  let pageNo=ref<string>('1');
  let pageSize=ref<string>('10');

  onMounted(async()=>{
    departmentInfoStore.getAllDepartmentInfo(pageNo.value,pageSize.value)
  })

const handlePageChange = async(pager="1")=>{
  pageNo.value=pager;
  await departmentInfoStore.getAllDepartmentInfo(pageNo.value,pageSize.value);
}

//添加科室表单

interface RuleForm{
  department_name:string;
}
let addDepartmentForm=reactive<RuleForm>({
  department_name:"",
})
const AddDialogVisible=ref<boolean>(false);
  const handleAddDepartment=()=>{
    addDepartmentForm.department_name="";
    AddDialogVisible.value=true;
  }
//提交添加科室表单
const submitAddDepartmentForm = async ()=>{
  let result=await departmentInfoStore.addDepartment(addDepartmentForm)
  if(result==='ok'){
    AddDialogVisible.value=false;
    departmentInfoStore.getAllDepartmentInfo(pageNo.value,pageSize.value);
  }
}
const cancleAddDepartmentForm = ()=>{
  AddDialogVisible.value=false;
}
  import { ElMessage, ElMessageBox } from 'element-plus'
import type { deleteDepartmentData } from '@/api/back/department/type';
//删除科室
  const handleDeleteDepartment = async (index: any, row: any) => {
  try {
    await ElMessageBox.confirm(
      '您确定删除该科室吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    // 用户确认删除后，调用删除用户方法，并传递用户名作为参数
    let deleteData=ref<deleteDepartmentData>({department_id:""});
    deleteData.value.department_id=row.department_id;
     let result = await departmentInfoStore.deleteDepartment(deleteData.value);  
     if(result==='ok'){
       departmentInfoStore.getAllDepartmentInfo(pageNo.value,pageSize.value);
       
     }

  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  }
}
//编辑科室
let EditDialogVisible=ref<boolean>(false);
interface editForm{
  department_id:string;
  department_name:string;
}
let editDepartmentForm=reactive<editForm>({
  department_id:"",
  department_name:"",
})
const handleEditDepartment = (index:any,row:any)=>{
  editDepartmentForm.department_id=row.department_id;
  editDepartmentForm.department_name=row.department_name;
  EditDialogVisible.value=true;
}
const submitEditDepartmentForm = async ()=>{
  let result=await departmentInfoStore.editDepartment(editDepartmentForm);
  if(result==='ok'){
    await departmentInfoStore.getAllDepartmentInfo(pageNo.value,pageSize.value);
    EditDialogVisible.value=false;
  }
}
const cancleEditDepartmentForm = ()=>{
  EditDialogVisible.value=false;
}
//进入疾病管理
let EnterDialogVisible=ref<boolean>(false);
let departmentData=reactive<editForm>({
  department_id:'',
  department_name:''
})
const handleEnterDepartment = (index:any,row:any)=>{
  departmentData.department_id=row.department_id;
  departmentData.department_name=row.department_name;
  EnterDialogVisible.value=true;
}

///////////////////////////////////////////////////////////////////////////////
//疾病
import useBackDiseaseInfoStore from "@/store/back/disease"
let diseaseInfoStore=useBackDiseaseInfoStore();
let current_department_id=ref<string>("");
const open= async (department_id:string)=>{
  await diseaseInfoStore.getAllDiseaseInfo(department_id);
  current_department_id.value=department_id;
}
//状态
let AddDiseaseDialogVisible=ref<boolean>(false);
let EditDiseaseDialogVisible=ref<boolean>(false);

//表单
import type { addDiseaseData,deleteDiseaseData,editDiseaseData } from '@/api/back/deisease/type';
let addDiseaseForm=reactive<addDiseaseData>({
  disease_name:"",
  department_id:"",
})
//添加疾病
const handleAddDisease = (department_id:any)=>{
  addDiseaseForm.disease_name="";
  addDiseaseForm.department_id=department_id;
  AddDiseaseDialogVisible.value=true;

}
const cancleAddDiseaseForm = ()=>{
AddDiseaseDialogVisible.value=false;
}
const submitAddDiseaseForm = async (department_id:any)=>{
  let result= await diseaseInfoStore.addDiseaseInfo(addDiseaseForm);
  if(result==='ok'){
    AddDiseaseDialogVisible.value=false;
    await diseaseInfoStore.getAllDiseaseInfo(department_id);
  }
}
//删除疾病
const handleDeleteDisease = async (index: any, row: any) => {
  try {
    await ElMessageBox.confirm(
      '您确定删除该疾病吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    // 用户确认删除后，调用删除用户方法，并传递用户名作为参数
    let deleteData=ref<deleteDiseaseData>({disease_id:""});
    deleteData.value.disease_id=row.disease_id;
     let result = await diseaseInfoStore.deleteDiseaseInfo(deleteData.value);  
     if(result==='ok'){
       diseaseInfoStore.getAllDiseaseInfo(row.department_id);
     }

  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  }
}
//编辑病例
let editDiseaseForm=reactive<editDiseaseData>({
  disease_id:"",
  disease_name:""
})
const handleEditDisease=(index:any,row:any)=>{
  editDiseaseForm.disease_id=row.disease_id;
  editDiseaseForm.disease_name=row.disease_name;
  EditDiseaseDialogVisible.value=true;
}
const cancleEditDiseaseForm=()=>{
  EditDiseaseDialogVisible.value=false;
}
const submitEditDiseaseForm=async ()=>{
  let result= await diseaseInfoStore.editDiseaseInfo(editDiseaseForm);
  if(result==='ok'){
    EditDiseaseDialogVisible.value=false;
    await diseaseInfoStore.getAllDiseaseInfo(current_department_id.value);
  }
}
</script>




<style scoped>
.my-button:hover {
  transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  
}

</style>