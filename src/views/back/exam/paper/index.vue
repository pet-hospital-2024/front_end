<template>
  <div>
    <el-card>
        <el-button type="primary" size="default" icon="Plus" @click="handleAddPaper">
            创建试卷
        </el-button>
        <el-table :data="PaperInfoStore.paperInfoArr" style="margin:10px 0" stripe v-loading="loading">
            <el-table-column type="index" label="序号" min-width="10%" align="center" />
            <el-table-column label="试卷名称" min-width="15%" align="center" prop="paper_name"></el-table-column>
            <el-table-column label="题目数量" min-width="10%" align="center" prop="question_number"/>
            <el-table-column label="试卷总分" align="center" min-width="10%" prop="value"/>
            <el-table-column label="试卷时长" align="center" min-width="15%">
              <template v-slot="{row}">
                <span>{{ row.duration }}分钟</span>
              </template>
            </el-table-column>

            <el-table-column align="center" class="operation" label="操作" min-width="40%">
            <template v-slot="{ index,row }">
              <el-button @click="handleShowPaperDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
              <el-button size="small" @click="handleEditPaper(index,row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeletePaper(index,row)" 
                :icon="Delete">删除</el-button>
              <el-button size="small" icon="Plus" type="primary" @click="handleEditPaperInfo(index,row)">管理试题</el-button>
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
    <el-form label-width="auto">
        <el-form-item label="试卷名称" required >
            <input v-model="addPaperForm.paper_name" placeholder="输入试卷名称">
        </el-form-item>
        <el-form-item label="考试时长" required>
          <div class="input-with-suffix">
            <input v-model.number="addPaperForm.duration" placeholder="单位分钟">
            <span class="suffix">分钟</span>
          </div>
        </el-form-item>
    </el-form>

    <template #footer>
    <div class="dialog-footer">
      <el-button @click="AddPaperDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="submitAddPaperForm">提交</el-button>
        
    </div>
    </template>
 </el-dialog>

<!-- 编辑试卷基本信息对话 -->
<el-dialog title="编辑试卷信息试卷" width="600" style="padding: 30px;" align-center v-model="EditPaperDialogVisible">
  <el-form v-model="editPaperForm" label-width="auto">
    <el-form-item label="试卷ID">
            <input v-model="editPaperForm.paper_id" disabled>
        </el-form-item>
        <el-form-item label="试卷名称" required>
            <input v-model="editPaperForm.paper_name">
        </el-form-item>
        <el-form-item label="考试时长" required>
          <div class="input-with-suffix">
            <input v-model.number="editPaperForm.duration" placeholder="单位分钟">
            <span class="suffix">分钟</span>
          </div>
        </el-form-item>
    </el-form>

    <template #footer>
    <div class="dialog-footer">
      <el-button @click="EditPaperDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="submitEditPaperForm">提交</el-button>
        
    </div>
    </template>
</el-dialog>

<!-- 查看试卷后显示的当前试卷信息 -->
<el-dialog title="试卷详情" v-model="EditPaperInfoDialogVisible">
  <el-card>
    <el-button type="primary" size="small" icon="Plus" @click="handleAddQuestionToPaper">
            添加试题
        </el-button>
    <el-table :data="PaperInfoStore.questionInfoArr" size="80%" height="350">
      <el-table-column label="题目序号" prop="order" width="80" align="center"></el-table-column>
      <el-table-column label="题目类型"  width="100" align="center">
        <template v-slot="{ row }">
          <span v-if="row.type === 'choice'">选择题</span>
          <span v-else>判断题</span>
        </template>

      </el-table-column>
      <el-table-column label="题目内容" align="center">
        <template v-slot="{ row }">
          <span>{{ row.question_body }} ({{ row.value }}分)</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="70">
        <template v-slot="{ row }">
          <el-button type="danger" size="small" @click="handleDeleteQuestionFromPaper(row)" link>删除</el-button>
        </template>
      </el-table-column>
    </el-table>




  </el-card>
</el-dialog>
  <!--添加试卷详细信息-->
<el-dialog  title="试题库" width="800" height="400" align-center v-model="AddQuestionToPaperDialogVisible">
      <el-table :data="questionInfoStore.questionInfoArr" style="margin:10px 0;min-height: 500px;" stripe 
        empty-text="无题干!" >
            <el-table-column type="index" label="序号" width="80" align="center"/>

            <el-table-column label="题目类型" width="100" align="center">
                <template v-slot="{ row }">
                    {{ row.type === 'choice' ? '选择题' : '判断题' }}
                </template>
            </el-table-column>

            <el-table-column prop="question_body" label="题目描述" align="center" width="400" />
            <el-table-column align="center" class="operation" label="操作">
            <template v-slot="{ row }">
              <!-- <el-button @click="handleShowDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button> -->
              <el-button @click="handleSelectQuestion(row)" link type="primary" style="color:#409EFF">选择</el-button>
            </template>


            </el-table-column>
        </el-table>

                
        <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :background="true"
      layout="prev, pager, next, jumper, -> , total"
      :total="questionInfoStore.total"
      @current-change="handleInnerPageChange"
      style="margin-top:20px"
/>
</el-dialog>
<el-dialog title="选择试题信息" v-model="QuestionFormDialogVisible">
  <el-form :model="sendData" label-width="auto">
    <el-form-item label="题目序号" required>
      <el-input v-model="sendData.question_order" disabled :value="nextQuestionOrder"></el-input>
    </el-form-item>
    <!-- <el-form-item>
      <span>
        {{  }}
      </span>
    </el-form-item> -->
    <el-form-item label="分值" required>
      <el-input v-model="sendData.question_value" required placeholder="输入题目分值"></el-input>
    </el-form-item>

    
  </el-form>
  <template #footer>
    <div >
      <el-button @click="QuestionFormDialogVisible=false">取消</el-button>
      <el-button type="primary" @click="submitAddQuestionForPaper">提交</el-button>
        
    </div>
    </template>
</el-dialog>

<!--detail详情对话框-->
<el-dialog title="试卷详情" width="600" align-center v-model="PaperDetailDialogVisible">
  
  <el-card v-if="PaperInfoStore.questionInfoArr.length" v-loading="detailLoading">
  <div class="paper">
    <div v-for="(question, index) in PaperInfoStore.questionInfoArr" :key="question.question_id" class="question-item">
      <div class="question-header">
        <span>题目ID: {{ question.question_id }}</span>
        <span>题目类型: {{ question.type === 'choice' ? '选择题' : '判断题' }}</span>
      </div>
      <div class="question-body">
        <span>{{ question.order }}. {{ question.question_body }} ({{ question.value }}分)</span>
      </div>
      <div class="options">
        <div v-for="opt in question.options" :key="opt.optCode" class="option">
          <span>{{ opt.optCode.toUpperCase() }}: {{ opt.optContents }}</span>
        </div>
      </div>
      <div class="correct-answer">
        <span>正确选项: {{ question.right_choice.toUpperCase() }}</span>
      </div>
    </div>
  </div>
</el-card>
<el-empty v-else></el-empty>

<template #footer>
  <div class="dialog-footer">
    <el-button type="primary" @click="PaperDetailDialogVisible = false">
      确认
    </el-button>
  </div>
</template>
</el-dialog>
  </div>
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
//加载页面的ref
let loading = ref<boolean>(false);
let detailLoading=ref<boolean>(false);
//目前首页挂载完毕发请求获取用户信息
onMounted(async()=>{
  loading.value=true;
  let res = await PaperInfoStore.getAllPaperInfo(pageNo.value,pageSize.value);
  if(res==='ok')loading.value=false;
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
import type { addPaperData, addQuestionForPaperData, deletePaperData, deleteQuestionFromPaperData, editPaperData } from '@/api/back/exam/paper/type';
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

//编辑试卷基本信息
let EditPaperDialogVisible=ref(false);
let editPaperForm=reactive<editPaperData>({
  paper_id:"",
  paper_name:"",
  duration:0,
})
const handleEditPaper = (index:any,row:any)=>{
  EditPaperDialogVisible.value=true;
  editPaperForm.duration=row.duration;
  editPaperForm.paper_id=row.paper_id;
  editPaperForm.paper_name=row.paper_name;
}
const submitEditPaperForm = async()=>{
  
  let result=await PaperInfoStore.editPaperBasicInfo(editPaperForm);
  if(result=='ok'){
    await PaperInfoStore.getAllPaperInfo(pageNo.value,pageSize.value);
    EditPaperDialogVisible.value=false;
  }
}

let PaperDetailDialogVisible=ref(false);


const handleShowPaperDetail=async(index:any,row:any)=>{
  
  let result=await PaperInfoStore.getQuestionsById(row.paper_id)
  if(result==='ok') 
  PaperDetailDialogVisible.value=true;
}
//查看试卷题目信息
let EditPaperInfoDialogVisible=ref(false);
const handleEditPaperInfo= async(index:any,row:any)=>{
  sendData.paper_id=row.paper_id;
  deleteSendData.paper_id=row.paper_id
 let result = await PaperInfoStore.getQuestionsById(row.paper_id);
 if(result=='ok'){
  EditPaperInfoDialogVisible.value=true;
 }
}
//向试卷添加试题
import useBackQuestionStore from '@/store/back/question';

let AddQuestionToPaperDialogVisible=ref(false);
let questionInfoStore=useBackQuestionStore();
let innerPageNo=ref('1')
let innerPageSize=ref('10')

const handleAddQuestionToPaper=async()=>{
  if(PaperInfoStore.questionInfoArr.length>=20){
    
    ElMessageBox({
      type:"warning",
      message:"已到达最大题目上限，请删去题目后再添加！"
    })
    return;
  }
  AddQuestionToPaperDialogVisible.value=true;
  await questionInfoStore.getAllQuestionInfo(innerPageNo.value,innerPageSize.value);

}
const handleInnerPageChange =async(pager='1')=>{
  innerPageNo.value=pager;
  await questionInfoStore.getAllQuestionInfo(innerPageNo.value,innerPageSize.value);
}
//2024/4/10 Mark!
let QuestionFormDialogVisible=ref(false);
let sendData=reactive<addQuestionForPaperData>({
  paper_id:'',
  question_id:'',
  question_order:null,
  question_value:null,
})
let nextQuestionOrder=ref();
const handleSelectQuestion = (row:any)=>{
  // for(let index=0;index<PaperInfoStore.questionInfoArr.length;index++){
  //     PaperInfoStore.questionInfoArr[index].order=index+1;
  //    }
  QuestionFormDialogVisible.value=true;
  sendData.question_id=row.question_id;
  nextQuestionOrder.value=PaperInfoStore.questionInfoArr.length + 1;
  sendData.question_order=nextQuestionOrder.value;
}
const submitAddQuestionForPaper=async()=>{
  
  let result=await PaperInfoStore.addQuestionForPaper(sendData);
  if(result=='ok'){
    sendData.question_value=null;
    await PaperInfoStore.getQuestionsById(sendData.paper_id);
    await PaperInfoStore.getAllPaperInfo(pageNo.value,pageSize.value);
    QuestionFormDialogVisible.value=false;
    AddQuestionToPaperDialogVisible.value=false;

  }
  

}

//向试卷删除试题
let deleteSendData=reactive<deleteQuestionFromPaperData>({
      paper_id:'',
      question_id:''
    })
const handleDeleteQuestionFromPaper = async(row:any)=>{
  try {
    await ElMessageBox.confirm(
      '您确定删除该问题吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    // 用户确认删除后，调用删除用户方法，并传递用户名作为参数

    deleteSendData.question_id=row.question_id;
     let result = await PaperInfoStore.deleteQuestionFromPaper(deleteSendData);  
     if(result==='ok'){
        await PaperInfoStore.getQuestionsById(deleteSendData.paper_id);
        await PaperInfoStore.getAllPaperInfo(pageNo.value,pageSize.value);

     
     }


  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  }
}
</script>
<style scoped>
.showTable{
  width:100vw;
}
.input-with-suffix {
  display: flex;
  align-items: center;
}
.suffix {
  margin-left: 5px; /* 调整后缀与输入框之间的间距 */
}
.paper {
    padding: 20px;
  }
  .question-item {
    margin-bottom: 20px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }
  .question-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .question-body {
    margin-bottom: 10px;
  }
  .options {
    margin-bottom: 10px;
  }
  .option {
    margin-bottom: 5px;
  }
  .correct-answer {
    font-weight: bold;
  }
  .el-loading-mask {
  z-index: 9 !important
}
</style>