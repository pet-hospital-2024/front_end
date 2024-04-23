<template>
  <div>
         <!--顶部搜索-->
         <el-card style="height: 80px;margin-bottom: 10px;" shadow="hover">
    <el-form :inline="true" class="form" label-width="auto">
      <el-form-item label="题目名:">
        <el-input placeholder="请输入搜索题目" v-model="searchKeyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="handleSearchQuestion"
        >
          搜索
        </el-button>
        <el-button size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus" @click="handleAddQuestion">
            添加试题
        </el-button>




        <!--表格展示信息-->
        <el-table :data="QuestionInfoStore.questionInfoArr" style="margin:10px 0" stripe 
        empty-text="无题干!" >
            <el-table-column prop="question_id" label="序号" min-width="15%" align="center"/>

            <el-table-column label="题目类型" min-width="10%" align="center">
                <template v-slot="{ row }">
                    {{ row.type === 'choice' ? '选择题' : '判断题' }}
                </template>
            </el-table-column>

            <el-table-column prop="question_body" label="题目描述" align="center" min-width="40%" />
            <el-table-column align="center" class="operation" min-width="35%">
            <template v-slot="{ row, index }">
              <el-button @click="handleShowDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
              <el-button size="small" @click="handleEditQuestion(row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeleteQuestion(index,row)" 
                :icon="Delete">删除</el-button>
            </template>


            </el-table-column>
        </el-table>

        <!--分页器组件-->
        
        <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :background="true"
      layout="prev, pager, next, jumper, -> , total"
      :total="QuestionInfoStore.total"
      @current-change="handlePageChange"
      style="margin-top:20px"
/>
    </el-card>

    <!--对话框组件-->

    <!--title动态，根据点击显示添加or修改-->
    <!--点击添加弹出的对话框-->
  <el-dialog v-model="AddDialogVisible" title="添加试题" width="500" align-center>

    <el-form  style="max-width: 400px" :model="addQuestionForm" ref="formRef">
      <el-form-item label="科室名称" required>
        <el-select v-model="addQuestionForm.department_name" placeholder="选择科室" style="width: 240px" @change="handleChangeDepartment">
          <el-option
            v-for="item in QuestionInfoStore.diseaseAndDepartmentInfoArr"
            :key="item.department_id"
            :label="item.department_name"
            :value="item.department_name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="疾病名称" required>
        <el-select v-model="addQuestionForm.disease_name" placeholder="选择疾病" style="width: 240px" :disabled="!isDepartmentSelected">
          <el-option
            v-for="item in diseaseInfo"
            :key="item.disease_id"
            :label="item.disease_name"
            :value="item.disease_name"
          />
        </el-select>

      </el-form-item>
      <el-form-item label="题目类型" required>
        <el-radio-group v-model="addQuestionForm.type">
          <el-radio value="choice" name="type" size="large" @click="handleTypeChoice">选择题</el-radio>
          <el-radio value="judge" name="type" size="large" @click="handleTypeJudgement">判断题</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="题目详情" required>
        <el-input style="width: 240px;height: 100px;" :rows="4" type="textarea" placeholder="请输入题目详情" v-model="addQuestionForm.question_body"/>
      </el-form-item>
      <!--如果是选择题-->
      <el-form-item label="选项 A" v-if="isChoice" required>
        <el-input label="" v-model="addQuestionForm.a"></el-input>
      </el-form-item>
      <el-form-item label="选项 B" v-if="isChoice" required>
        <el-input label="" v-model="addQuestionForm.b"></el-input>
      </el-form-item>
      <el-form-item label="选项 C" v-if="isChoice" required>
        <el-input label="" v-model="addQuestionForm.c"></el-input>
      </el-form-item>
      <el-form-item label="选项 D" v-if="isChoice" required>
        <el-input label="" v-model="addQuestionForm.d"></el-input>
      </el-form-item>
      <el-form-item label="正确选项" v-if="isChoice" required>
        <el-radio-group v-model="addQuestionForm.right_choice">
        <el-radio name="choice_ans" value="a">A</el-radio>
        <el-radio name="choice_ans" value="b">B</el-radio>
        <el-radio name="choice_ans" value="c">C</el-radio>
        <el-radio name="choice_ans" value="d">D</el-radio>
      </el-radio-group>
      </el-form-item>
      <el-form-item label="正确选项" v-if="isJudgement" required>
        <el-radio-group v-model="addQuestionForm.right_choice">
          <el-radio name="judgement_ans" value="a"><el-icon><Check /></el-icon></el-radio>
          <el-radio name="judgement_ans" value="b"><el-icon><Close /></el-icon></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitAddQuestionForm">提交</el-button>
        <el-button @click="cancleAddQuestionForm" >取消</el-button>
        
      </div>
    </template>
  </el-dialog>

  <!-- 编辑试题对话框 -->
  <el-dialog v-model="EditQuestionDialogVisible" title="编辑试题" width="500" style="padding: 30px;" align-center>

<el-form  style="max-width: 400px" :model="editQuestionForm" ref="formRef" label-width="auto">
  <el-form-item label="题目ID" >
    <el-input v-model="editQuestionForm.question_id" disabled/>
  </el-form-item>
  
  <el-form-item label="科室名称" required>
    <el-select v-model="editQuestionForm.department_name" placeholder="选择科室" style="width: 240px" @change="handleEditChangeDepartment">
      <el-option
        v-for="item in QuestionInfoStore.diseaseAndDepartmentInfoArr"
        :key="item.department_id"
        :label="item.department_name"
        :value="item.department_name"
      />
    </el-select>
  </el-form-item>
  <el-form-item label="疾病名称" required>
    <el-select v-model="editQuestionForm.disease_name" placeholder="选择疾病" style="width: 240px">
      <el-option
        v-for="item in diseaseInfo"
        :key="item.disease_id"
        :label="item.disease_name"
        :value="item.disease_name"
      />
    </el-select>

  </el-form-item>
  <el-form-item label="题目类型" required>
    <el-radio-group v-model="editQuestionForm.type">
      <el-radio value="choice" name="type" size="large" @click="handleTypeChoice">选择题</el-radio>
      <el-radio value="judge" name="type" size="large" @click="handleTypeJudgement">判断题</el-radio>
    </el-radio-group>
  </el-form-item>

  <el-form-item label="题目详情" required>
    <el-input style="width: 240px;height: 100px;" :rows="4" type="textarea" placeholder="请输入题目详情" v-model="editQuestionForm.question_body"/>
  </el-form-item>
  <!--如果是选择题-->
  <el-form-item label="选项 A" v-if="isChoice" required>
    <el-input label="" v-model="editQuestionForm.a"></el-input>
  </el-form-item>
  <el-form-item label="选项 B" v-if="isChoice" required>
    <el-input label="" v-model="editQuestionForm.b"></el-input>
  </el-form-item>
  <el-form-item label="选项 C" v-if="isChoice" required>
    <el-input label="" v-model="editQuestionForm.c"></el-input>
  </el-form-item>
  <el-form-item label="选项 D" v-if="isChoice" required>
    <el-input label="" v-model="editQuestionForm.d"></el-input>
  </el-form-item>
  <el-form-item label="正确选项" v-if="isChoice" required>
    <el-radio-group v-model="editQuestionForm.right_choice">
    <el-radio name="choice_ans" value="a">A</el-radio>
    <el-radio name="choice_ans" value="b">B</el-radio>
    <el-radio name="choice_ans" value="c">C</el-radio>
    <el-radio name="choice_ans" value="d">D</el-radio>
  </el-radio-group>
  </el-form-item>
  <el-form-item label="正确选项" v-if="isJudgement" required>
    <el-radio-group v-model="editQuestionForm.right_choice">
      <el-radio name="judgement_ans" value="a"><el-icon><Check /></el-icon></el-radio>
      <el-radio name="judgement_ans" value="b"><el-icon><Close /></el-icon></el-radio>
    </el-radio-group>
  </el-form-item>
</el-form>
<template #footer>
  <div class="dialog-footer">
    <el-button type="primary" @click="submitEditQuestionForm">提交</el-button>
    <el-button @click="cancleEditQuestionForm" >取消</el-button>
    
  </div>
</template>
</el-dialog>

  <!--detail详情对话框-->
  <el-dialog title="试题详情" width="600" style="padding: 30px;" align-center v-model="showDetail" :QuestionInfo="QuestionInfo">
    <el-form label-width="auto">
      <el-form-item label="题目类型:">
        <span>{{ QuestionInfo.type==='choice'?'选择题':'判断题' }}</span>
      </el-form-item>
      <el-form-item label="所属科室:">
        <span>{{ QuestionInfo.department_name }}</span>
      </el-form-item>
      <el-form-item label="疾病种类:">
        <span>{{ QuestionInfo.disease_name }}</span>
      </el-form-item>

      <el-form-item label="题目详情:">
        <span>{{ QuestionInfo.question_body }}</span>
      </el-form-item>
      <el-form-item label="题目选项:" v-if="QuestionInfo.type==='choice'">
        <span >
          <div>A. {{ QuestionInfo.a }}</div>
          <div>B. {{ QuestionInfo.b }}</div>
          <div>C. {{ QuestionInfo.c }}</div>
          <div>D. {{ QuestionInfo.d }}</div>
        </span>
      </el-form-item>
      <el-form-item label="正确答案:">
        <span v-if="QuestionInfo.type==='choice'">
          {{ QuestionInfo.right_choice.toUpperCase() }}

        </span>
        <span v-if="QuestionInfo.type==='judge'&&QuestionInfo.right_choice==='a'">
          <el-icon><Check /></el-icon>
        </span>
        <span v-if="QuestionInfo.type==='judge'&&QuestionInfo.right_choice==='b'">
          <el-icon><Close /></el-icon>
        </span>
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
  </div>

</template>



<!--相关配置-->
<script setup lang="ts">
import useBackQuestionStore from "@/store/back/question"
import {Delete, Edit, ZoomIn} from '@element-plus/icons-vue'
import { ElNotification } from "element-plus";
import { ref,onMounted, reactive} from 'vue'
//分页器当前页码
let pageNo=ref<string>("1");
//定义每页展示多少条数据
let pageSize=ref<string>("10")  
//加载动画ref
let loading=ref<boolean>(false);

//搜索
let searchKeyword = ref<string>("");


const handleSearchQuestion = async () => {
    if (searchKeyword.value === "") {
        ElNotification({
            type: "warning",
            message: "请输入题目!"
        });
        return;
    }

    loading.value = true;
    try {
        let res = await QuestionInfoStore.searchQuestionInfo(searchKeyword.value);
        if (res === 'ok') {
            loading.value = false; // 成功时隐藏 loading
        } else {
            loading.value = false; // 失败时也隐藏 loading
        }
    } catch (error) {
        loading.value = false; // 发生错误时隐藏 loading
    }
}


//重置搜索结果
const reset= async ()=>{
  loading.value=true;
let res=await QuestionInfoStore.getAllQuestionInfo(pageNo.value,pageSize.value);
if(res=='ok') {
  loading.value=false;
  ElNotification({
      type:'success',
      message:"重置成功！"
    });
}
}


let QuestionInfoStore=useBackQuestionStore();
onMounted(async ()=>{
  loading.value=true;
  let res = await QuestionInfoStore.getAllQuestionInfo(pageNo.value,pageSize.value);
  if(res=='ok'){
    loading.value=false;
  }
  await QuestionInfoStore.getDepartmentAndDiseaseInfo();
})

const handlePageChange = async(pager="1")=>{
  pageNo.value=pager;
  loading.value=true;
  let res = await QuestionInfoStore.getAllQuestionInfo(pageNo.value,pageSize.value);
  if(res=='ok'){
    loading.value=false;
  }
}

//展示试题详情
const showDetail=ref(false);
const QuestionInfo=ref();
const handleShowDetail=(index:any, row:any)=>{
  showDetail.value= true;
  QuestionInfo.value=row;

}
import type { editQuestionData, addQuestionData, diseaseQuestionInfoArr, deleteQuestionData } from "@/api/back/exam/questions/type";
//添加试题
const AddDialogVisible = ref(false)
let addQuestionForm=reactive<addQuestionData>({
  question_id: '',
  disease_name: '',
  type: '',
  question_body: '',
  a: '',
  b: '',
  c: '',
  d: '',
  right_choice: '',
  department_name: ''
})
//科室信息

let diseaseInfo=ref<diseaseQuestionInfoArr>();
let isDepartmentSelected=ref<boolean>(false);
const handleChangeDepartment = ()=>{
  isDepartmentSelected.value=true;
  addQuestionForm.disease_name="";

  const selectedDepartment = QuestionInfoStore.diseaseAndDepartmentInfoArr.find(
        item => item.department_name === addQuestionForm.department_name
      );
      diseaseInfo.value= selectedDepartment ? selectedDepartment.diseases : []
}

const handleEditChangeDepartment = ()=>{
  editQuestionForm.disease_name="";
  const selectedDepartment = QuestionInfoStore.diseaseAndDepartmentInfoArr.find(
        item => item.department_name === editQuestionForm.department_name
      );
      diseaseInfo.value= selectedDepartment ? selectedDepartment.diseases : []
}
//点击“添加试题”
const handleAddQuestion=()=>{
    // 重置表单数据为初始状态
  addQuestionForm.question_id = '';
  addQuestionForm.disease_name = '';
  addQuestionForm.type = '';
  addQuestionForm.question_body = '';
  addQuestionForm.a = '';
  addQuestionForm.b = '';
  addQuestionForm.c = '';
  addQuestionForm.d = '';
  addQuestionForm.right_choice = '';
  addQuestionForm.department_name = '';

  AddDialogVisible.value=true;
  isDepartmentSelected.value=false;
}
const cancleAddQuestionForm=()=>{
  AddDialogVisible.value=false;
  isJudgement.value=false;
  isChoice.value=false;
  isDepartmentSelected.value=false;
}
const submitAddQuestionForm = async ()=>{
  if(addQuestionForm.type==='judge'){
    addQuestionForm.a="对";
    addQuestionForm.b="错";
    
  }
  let result=await QuestionInfoStore.addQuestionInfo(addQuestionForm);
  if(result==='ok'){
    await QuestionInfoStore.getAllQuestionInfo(pageNo.value,pageSize.value);
    AddDialogVisible.value=false;
    isDepartmentSelected.value=false;
  }
}



//点击“编辑试题”
let EditQuestionDialogVisible=ref(false)
let editQuestionForm=reactive<editQuestionData>({
  question_id:"",
  question_body:"",
  a:"",
  b:"",
  c:"",
  d:"",
  type:"",
  disease_name:"",
  department_name:"",
  right_choice:""
})
const handleEditQuestion=(row:any)=>{
  EditQuestionDialogVisible.value=true;
  editQuestionForm.question_id = row.question_id;
  editQuestionForm.question_body = row.question_body;
  editQuestionForm.a = row.a;
  editQuestionForm.b = row.b;
  editQuestionForm.c = row.c;
  editQuestionForm.d = row.d;
  editQuestionForm.type = row.type;
  editQuestionForm.disease_name = row.disease_name;
  editQuestionForm.department_name = row.department_name;
  editQuestionForm.right_choice = row.right_choice;
  const selectedDepartment = QuestionInfoStore.diseaseAndDepartmentInfoArr.find(
        item => item.department_name === editQuestionForm.department_name
      );
      diseaseInfo.value= selectedDepartment ? selectedDepartment.diseases : []
  
}
const cancleEditQuestionForm=()=>{
  EditQuestionDialogVisible.value=false;
}
const submitEditQuestionForm= async ()=>{
  if(editQuestionForm.type==='judge'){
    editQuestionForm.a="对";
    editQuestionForm.b="错";
  }

  let result=await QuestionInfoStore.editQuestionInfo(editQuestionForm);
  if(result==='ok'){
    QuestionInfoStore.getAllQuestionInfo(pageNo.value,pageSize.value);
    EditQuestionDialogVisible.value=false;
  }
}
//点击“删除试题”
import { ElMessage, ElMessageBox } from 'element-plus'



const handleDeleteQuestion = async (index: any, row: any) => {
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
    let deleteData=ref<deleteQuestionData>({question_id:""});
    deleteData.value.question_id=row.question_id;
     let result = await QuestionInfoStore.deleteQuestionInfo(deleteData.value);  
     if(result==='ok'){
       QuestionInfoStore.getAllQuestionInfo(pageNo.value,pageSize.value);
     }

  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  }
}

//在编辑/添加试题中选择题目类型为选择
const isChoice=ref(false);
const isJudgement=ref(false);
const handleTypeChoice = ()=>{
  isChoice.value=true;
  isJudgement.value=false;

}
const handleTypeJudgement = ()=>{
  isChoice.value=false;
  isJudgement.value=true;

}
//为了测试使用的中间状态，后期会整合到object中

</script>




<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Optional: Adjust spacing between buttons */
.button-container > .el-button {
  margin: 0 5px; /* Adjust the spacing as needed */
}
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-loading-mask {
  z-index: 9 !important
}
</style>

