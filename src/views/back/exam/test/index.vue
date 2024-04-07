<template>
    <el-card>
        <!--添加考试-->
        <el-button type="primary" size="default" icon="Plus" @click="handleAddTest">
            创建考试
        </el-button>
        <el-table style="margin:10px 0" stripe :data="TestInfoStore.testInfoArr">
            <el-table-column type="index" label="序号" width="80" align="center"/>
            <el-table-column label="考试名称" width="150" align="center" prop="exam_name"></el-table-column>
            <el-table-column  label="考试起始时间" prop="exam_start" width="150" align="center"/>
            <el-table-column  label="考试截至时间" prop="exam_end" width="150" align="center"/>
            <el-table-column  label="考试时长" width="80" prop="duration" align="center"/>
            <el-table-column label="操作" align="center">
              <template v-slot="{ index, row }">
                    <el-button @click="handleShowTestDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
                    <el-button size="small" @click="handleEditTest(index,row)" :icon="Edit" type="info">编辑
                    </el-button>
                    <el-button size="small" type="danger" @click="handleDeleteTest(index,row)" 
                      :icon="Delete">删除</el-button>
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
      :total="TestInfoStore.total"
      @current-change="handlePageChange"
      style="margin-top:20px"
      />

      <!-- 创建考试对话框 -->
     <el-dialog v-model="AddTestDialogVisible" title="创建考试" width="600" style="margin-top: 100px;">
    <el-form :model="addTestForm">
        <el-form-item label="考试名称" required>
            <input v-model="addTestForm.exam_name">
        </el-form-item>
        <el-form-item label="考试开始日期">
          <el-date-picker
            v-model="addTestForm.exam_start"
            type="date"
            placeholder="选择考试开始日期"
            value-format="YYYY/MM/DD"
            :popper-options="{
              modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['buttom-end'],
                            allowedAutoPlacements: ['buttom-end'],
                        }
                    }
                ]
            }"

          />
        </el-form-item>
        <el-form-item label="考试结束日期">
          <el-date-picker
            v-model="addTestForm.exam_end"
            type="date"
            placeholder="选择考试结束日期"
            value-format="YYYY/MM/DD"
            :popper-options="{
              modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['buttom-end'],
                            allowedAutoPlacements: ['buttom-end'],
                        }
                    }
                ]
            }"
          />
        </el-form-item>
        <el-form-item v-if="addTestForm.paper_id!=''">试卷名称   {{ TestInfoStore.paper_name }}</el-form-item>
    </el-form>
    
    

    <template #footer>
        <div class="dialog-footer" style="display: flex; justify-content: space-between; align-items: center;">
          <!-- 添加试卷按钮 -->
          <el-button @click="handleSelectPaper" type="primary">选择试卷</el-button>
          
          <!-- 提交和取消按钮 -->
          <div>
            <el-button type="primary" @click="submitAddTestForm">提交</el-button>
            <el-button @click="cancleAddTestForm">取消</el-button>
          </div>
        </div>
      </template>
      </el-dialog>


 <!-- 选择试卷界面 -->
 <el-drawer v-model="SelectPaperDialogVisible"  size="40%" @open="open" >
  <el-card style="min-height: 500px;">
    <el-table :data="PaperInfoStore.paperInfoArr" style="margin:10px 0;height: 100%;" stripe  >
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column label="试卷名称" width="100" align="center" prop="paper_name"></el-table-column>
            <el-table-column label="题目数量" width="80" align="center" prop="question_number"/>
            <el-table-column label="试卷总分" align="center" width="80" prop="value"/>
            <el-table-column align="center" class="operation" label="操作">
            <template v-slot="{ row, index }">
              <el-button @click="SelectPaper(row,index)">选择</el-button>
            </template>
            </el-table-column>
        </el-table>
  </el-card>
      <!--分页器-->
      <el-pagination
      v-model:current-page="innerPageNo"
      v-model:page-size="innerPageSize"
      :background="true"
      layout="prev, pager, next, jumper, -> , total"
      :total="TestInfoStore.total"
      @current-change="handleInnerPageChange"
      style="margin-top:20px"
      />
 </el-drawer>

  <!-- 查看详情对话框 -->
  <el-drawer
    v-model="DetailDialogVisible"
    title="考试详情"
    width="500"
    center
    
  >
    <el-form style="max-width: 400px" :TestInfo="TestInfo">
        <el-form-item  label="试卷ID:">
            <span>{{ TestInfo.paper_id }}</span>
        </el-form-item>
        <el-form-item  label="考试名称:">
            <span>{{ TestInfo.exam_name }}</span>
        </el-form-item>
        <el-form-item label="考试起始日期">
            <span>
                {{ TestInfo.exam_start }}
            </span>
        </el-form-item>
        <el-form-item  label="考试截止日期:">
            <span>
                {{TestInfo.exam_end  }}
            </span>
        </el-form-item>
        <el-form-item  label="考试时长">
            <span>{{ TestInfo.duration }}分钟</span>
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="DetailDialogVisible = false">
          确认
        </el-button>
      </div>
    </template>
</el-drawer>

<!-- 编辑考试页面 -->
<el-dialog v-model="EditTestDialogVisible" title="编辑考试" width="600" style="margin-top: 100px;">
    <el-form :model="editTestForm">
        <el-form-item label="考试名称" required>
            <input v-model="examName" disabled>
        </el-form-item>
        <el-form-item label="考试开始日期">
          <el-date-picker
            v-model="editTestForm.exam_start"
            type="date"
            placeholder="选择考试开始日期"
            value-format="YYYY/MM/DD"
            :popper-options="{
              modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['buttom-end'],
                            allowedAutoPlacements: ['buttom-end'],
                        }
                    }
                ]
            }"

          />
        </el-form-item>
        <el-form-item label="考试结束日期">
          <el-date-picker
            v-model="editTestForm.exam_end"
            type="date"
            placeholder="选择考试结束日期"
            value-format="YYYY/MM/DD"
            :popper-options="{
              modifiers: [
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['buttom-end'],
                            allowedAutoPlacements: ['buttom-end'],
                        }
                    }
                ]
            }"
          />
        </el-form-item>
        <el-form-item v-if="editTestForm.paper_id!=''">试卷名称   {{ TestInfoStore.paper_name }}</el-form-item>
    </el-form>
    <template #footer>
        <div class="dialog-footer" style="display: flex; justify-content: space-between; align-items: center;">
          <!-- 添加试卷按钮 -->
          <el-button @click="handleSelectPaper" type="primary">选择试卷</el-button>
          
          <!-- 提交和取消按钮 -->
          <div>
            <el-button type="primary" @click="submitEditTestForm">提交</el-button>
            <el-button @click="cancleEditTestForm">取消</el-button>
          </div>
        </div>
      </template>
</el-dialog>

</template>
<script setup lang="ts">
import { Delete, Edit,Plus,Remove,ZoomIn } from '@element-plus/icons-vue';
//获取仓库对象

//目前首页挂载完毕发请求获取用户信息

import { ref,onMounted, reactive,toRefs, effect } from 'vue';
import useBackTestInfoStore from '@/store/back/test';
let TestInfoStore=useBackTestInfoStore();
//分页器ref
let pageNo = ref<string>('1')

let pageSize = ref<string>('10')
//页面变化
const handlePageChange = async(pager="1")=>{
  pageNo.value=pager;
  await TestInfoStore.getAllTestInfo(pageNo.value,pageSize.value);
}
onMounted(async()=>{
  await TestInfoStore.getAllTestInfo(pageNo.value,pageSize.value);
})
import useBackPaperInfoStore from '@/store/back/paper';
let PaperInfoStore=useBackPaperInfoStore();
let innerPageNo = ref<string>('1')

let innerPageSize = ref<string>('10')
const open=async()=>{
await PaperInfoStore.getAllPaperInfo(innerPageNo.value,innerPageSize.value)
}
const handleInnerPageChange = async(pager="1")=>{
  pageNo.value=pager;
  await PaperInfoStore.getAllPaperInfo(innerPageNo.value,innerPageSize.value);
}
let paperName=ref();
let AddTestDialogVisible=ref<boolean>(false);
let addTestForm=reactive<addTestData>({
  paper_id:"",
  exam_name:"",
  exam_start:"",
  exam_end:""
})
const handleAddTest=()=>{
  addTestForm.paper_id="";
  addTestForm.exam_end="";
  addTestForm.exam_name="";
  addTestForm.exam_start="";
  TestInfoStore.paper_name="";
  AddTestDialogVisible.value=true;
}
const cancleAddTestForm = ()=>{
  AddTestDialogVisible.value=false;
}
let SelectPaperDialogVisible=ref(false);
let sendData=reactive({paper_id:""});
const handleSelectPaper=()=>{
  SelectPaperDialogVisible.value=true;
  sendData.paper_id="";
}

const SelectPaper=async (row:any,index:any)=>{
  addTestForm.paper_id=row.paper_id;
  sendData.paper_id=row.paper_id;
  await TestInfoStore.getPaperNameById(sendData);
  SelectPaperDialogVisible.value=false;
}
const submitAddTestForm = async ()=>{

  const { exam_start, exam_end } = toRefs(addTestForm);
  exam_start.value = exam_start.value.replace(/\//g, '.');
  exam_end.value = exam_end.value.replace(/\//g, '.');
  
    let result=await TestInfoStore.addTestInfo(addTestForm);
    if(result==='ok'){
      await TestInfoStore.getAllTestInfo(pageNo.value,pageSize.value);
      AddTestDialogVisible.value=false;
    }
} 

//详情页面
let DetailDialogVisible=ref<boolean>(false);
const TestInfo=ref();
const handleShowTestDetail = (index:any,row:any)=>{
  TestInfo.value=row;
  DetailDialogVisible.value=true;
}
//修改考试
let editTestForm=reactive<editTestData>({
  paper_id:"",
  exam_end:"",
  exam_id:"",
  exam_start:""
})
let EditTestDialogVisible=ref(false);
let examName=ref();
const handleEditTest = async(index:any,row:any)=>{
  editTestForm.paper_id = row.paper_id;
  examName.value=row.exam_name;
  editTestForm.exam_end = row.exam_end;
  editTestForm.exam_id = row.exam_id;
  editTestForm.exam_start = row.exam_start;
  sendData.paper_id=editTestForm.paper_id;
  await TestInfoStore.getPaperNameById(sendData);
  EditTestDialogVisible.value=true;
}
const cancleEditTestForm = ()=>{
  EditTestDialogVisible.value=false;
}
const submitEditTestForm = async (index:any,row:any)=>{
  const { exam_start, exam_end } = toRefs(editTestForm);
  exam_start.value = exam_start.value.replace(/\//g, '.');
  exam_end.value = exam_end.value.replace(/\//g, '.');
  
  console.log(editTestForm);
  let result=await TestInfoStore.editTestInfo(editTestForm);
  if(result==='ok'){
    TestInfoStore.getAllTestInfo(pageNo.value,pageSize.value);
    EditTestDialogVisible.value=false;
  }
}

//删除考试
import { ElMessage, ElMessageBox } from 'element-plus'
import type { editTestData, addTestData, deleteTestData } from '@/api/back/exam/test/type';
const handleDeleteTest = async (index: any, row: any) => {
  try {
    await ElMessageBox.confirm(
      '您确定删除该考试吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    // 用户确认删除后，调用删除用户方法，并传递用户名作为参数
    let deleteData=ref<deleteTestData>({exam_id:""});
    deleteData.value.exam_id=row.exam_id;
     let result = await TestInfoStore.deleteTestInfo(deleteData.value);  
     if(result==='ok'){
       TestInfoStore.getAllTestInfo(pageNo.value,pageSize.value);
     }

  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  }
}
//根据paper_id获取paper_name

</script>