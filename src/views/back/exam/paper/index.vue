<template>
    <el-card>
        <el-button type="primary" size="default" icon="Plus" @click="handleAddPaper">
            创建试卷
        </el-button>
        <el-table :data="PaperInfoStore.paperInfoArr" style="margin:10px 0" stripe  >
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column label="试卷名称" width="180" align="center" prop="paper_name"></el-table-column>
            <el-table-column label="题目数量" width="180" align="center" prop="question_number"/>
            <el-table-column label="试卷总分" align="center" width="180" prop="value"/>

            <el-table-column align="center" class="operation" label="操作">
            <template v-slot="{ index,row }">
              <el-button @click="handleShowPaperDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
              <el-button size="small" @click="handleEditPaper(index,row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeletePaper(index,row)" 
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
      :total="PaperInfoStore.total"
      @current-change="handlePageChange"
      style="margin-top:20px"
/>


    <!--对话框组件-->

    <!--title动态，根据点击显示添加or修改-->
    <!--创建试卷-->
 <el-dialog v-model="AddPaperDialogVisible" title="创建试卷" width="600" align-center>
    <el-form>
        <el-form-item label="试卷名称" required>
            <input v-model="addPaperForm.paper_name" placeholder="输入试卷名称">
        </el-form-item>
        <el-form-item label="考试时长" required>
            <input v-model.number="addPaperForm.duration" placeholder="单位分钟">
        </el-form-item>
    </el-form>

    <template #footer>
    <div class="dialog-footer">
      <el-button @click="AddPaperDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="submitAddPaperForm">提交</el-button>
        
    </div>
    </template>
 </el-dialog>

  <!--创建试卷后点击添加试题按钮-->
    <el-dialog v-model="AddQuestion2PaperDialogVisible" title="试题库" width="800" height="400" align-center>
      <el-table  style="margin:10px 0" stripe 
        empty-text="无题干!" >
            <el-table-column type="index" label="序号" width="80" align="center"/>
            <el-table-column label="题目类型" width="100" align="center">
                <template v-slot="{ row }">
                    {{ row.type === 'choice' ? '选择题' : '判断题' }}
                </template>
            </el-table-column>
            <el-table-column prop="disease_kind" label="疾病类型" width="100" align="center"/>
            <el-table-column prop="question_body" label="题目描述" align="center" width="300" />
            <el-table-column align="center" class="operation">
            <template v-slot="{ row, index }">
              <el-button @click="handleShowDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
              <el-button size="small" @click="handleEditQuestion(index,row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeleteQuestion(index,row)" 
                :icon="Delete">删除</el-button>
            </template>


            </el-table-column>
        </el-table>
    </el-dialog>
<!--detail详情对话框-->
<el-dialog title="试卷详情" width="600" align-center v-model="PaperDetailDialogVisible" :PaperInfo="PaperInfo">
<el-form>
  <el-form-item label="题目类型:">
    <span>{{ QuestionInfo.type==='choice'?'选择题':'判断题' }}</span>
  </el-form-item>
  <el-form-item label="疾病种类:">
    <span>{{ QuestionInfo.disease_kind }}</span>
  </el-form-item>
  <el-form-item label="题目详情:">
    <span>{{ QuestionInfo.question_body }}</span>
  </el-form-item>
  <el-form-item label="题目选项:" v-if="QuestionInfo.type==='choice'">
    <span >
      <div>A. {{ QuestionInfo.A }}</div>
      <div>B. {{ QuestionInfo.B }}</div>
      <div>C. {{ QuestionInfo.C }}</div>
      <div>D. {{ QuestionInfo.D }}</div>
    </span>
  </el-form-item>
  <el-form-item label="正确答案:">
    <span v-if="QuestionInfo.type==='choice'">
      {{ String.fromCharCode('A'.charCodeAt(0) + parseInt(QuestionInfo.right_choice))}}
    </span>
    <span v-if="QuestionInfo.type==='judgement'&&QuestionInfo.judgement==='0'">
      <el-icon><Check /></el-icon>
    </span>
    <span v-if="QuestionInfo.type==='judgement'&&QuestionInfo.judgement==='1'">
      <el-icon><Close /></el-icon>
    </span>
  </el-form-item>
  <el-form-item label="分值:">
    <span>{{ QuestionInfo.value }}</span>
  </el-form-item>
</el-form>

<template #footer>
  <div class="dialog-footer">
    <el-button type="primary" @click="showDetail = false">
      确认
    </el-button>
  </div>
</template>
</el-dialog>
</template>
<script setup lang="ts">

//获取仓库对象

import {ZoomIn,Edit,Delete} from '@element-plus/icons-vue'
import useBackPaperInfoStore from '@/store/back/paper';
let PaperInfoStore=useBackPaperInfoStore();
import { ref,onMounted, reactive } from 'vue';
//分页器当前页码
let pageNo=ref<string>("1");
//定义每页展示多少条数据
let pageSize=ref<string>("10")  

//目前首页挂载完毕发请求获取用户信息
onMounted(async()=>{
  await PaperInfoStore.getAllPaperInfo(pageNo.value,pageSize.value);
})
//页面信息变化
const handlePageChange = async(pager="1")=>{
  pageNo.value=pager;
  await PaperInfoStore.getAllPaperInfo(pageNo.value,pageSize.value);
}
//新建试卷
const AddPaperDialogVisible=ref<boolean>(false);
let addPaperForm=reactive<addPaperData>({
  paper_name:"",
  duration:0
})
const handleAddPaper=()=>{
  addPaperForm.duration=0;
  addPaperForm.paper_name="";
    AddPaperDialogVisible.value=true;

}

const submitAddPaperForm=async()=>{
  let result=await PaperInfoStore.addPaper(addPaperForm);
  if(result=='ok'){
    PaperInfoStore.getAllPaperInfo(pageNo.value,pageSize.value);
    AddPaperDialogVisible.value=false;
  }
}
//删除试卷

import { ElMessage, ElMessageBox } from 'element-plus'
import type { addPaperData, deletePaperData } from '@/api/back/exam/paper/type';
const handleDeletePaper = async (index:any,row:any)=>{
  try {
    await ElMessageBox.confirm(
      '您确定删除该试卷吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    // 用户确认删除后，调用删除用户方法，并传递用户名作为参数
    let deleteData=ref<deletePaperData>({paper_id:""});
    deleteData.value.paper_id=row.paper_id;
    
     let result = await PaperInfoStore.deletePaperInfo(deleteData.value);  
     if(result==='ok'){
       PaperInfoStore.getAllPaperInfo(pageNo.value,pageSize.value);
     }

  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  }
}
//展示试卷详情
let PaperDetailDialogVisible=ref(false);
let PaperInfo=ref()
const handleShowPaperDetail=(index:any,row:any)=>{
  PaperDetailDialogVisible.value=true;
}
//
const AddQuestion2PaperDialogVisible=ref<boolean>(false);
const handleAddQuestion2NewPaper=()=>{
  AddQuestion2PaperDialogVisible.value=true;
}
</script>