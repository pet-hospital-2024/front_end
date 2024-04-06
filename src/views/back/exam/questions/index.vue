<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus" @click="handleAddQuestion">
            添加试题
        </el-button>
        <!--表格展示信息-->
        <el-table :data="QuestionInfoStore.questionInfoArr" style="margin:10px 0" stripe 
        empty-text="无题干!" >
            <el-table-column type="index" label="序号" width="80" align="center"/>

            <el-table-column label="题目类型" width="100" align="center">
                <template v-slot="{ row }">
                    {{ row.type === 'choice' ? '选择题' : '判断题' }}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="disease_kind" label="疾病类型" width="100" align="center"/> -->
            <el-table-column prop="question_body" label="题目描述" align="center" width="400" />
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

        <!--分页器组件-->
        
        <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :background="true"
      layout="prev, pager, next, jumper, -> , total"
      :total="QuestionInfoStore.total"
      @current-change="handlePageChange"
/>
    </el-card>

    <!--对话框组件-->

    <!--title动态，根据点击显示添加or修改-->
    <!--点击添加或编辑弹出的对话框-->
  <el-dialog v-model="AlterorAddDialogVisible" title="添加试题" width="600" align-center>

    <el-form  style="max-width: 400px" :model="ruleForm" ref="formRef">
      <el-form-item label="题目类型">
        <el-radio-group v-model="addQuestionType">
          <el-radio value="1" size="large" @click="handleTypeChoice">选择题</el-radio>
          <el-radio value="2" size="large" @click="handleTypeJudgement">判断题</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="疾病类型" >
        <el-input v-model="disease_kind" />
      </el-form-item>
      <el-form-item label="题目详情">
        <el-input style="width: 240px;height: 100px;" :rows="4" type="textarea" placeholder="请输入题目详情" v-model="question_body"/>
      </el-form-item>
      <!--如果是选择题-->
      <el-form-item label="选项 A" v-if="isChoice">
        <el-input label=""></el-input>
      </el-form-item>
      <el-form-item label="选项 B" v-if="isChoice">
        <el-input label=""></el-input>
      </el-form-item>
      <el-form-item label="选项 C" v-if="isChoice">
        <el-input label=""></el-input>
      </el-form-item>
      <el-form-item label="选项 D" v-if="isChoice">
        <el-input label=""></el-input>
      </el-form-item>
      <el-form-item label="正确选项" v-if="isChoice">
        <el-radio-group v-model="choiceCorrectAnswer">
        <el-radio :value="0">A</el-radio>
        <el-radio :value="1">B</el-radio>
        <el-radio :value="2">C</el-radio>
        <el-radio :value="3">D</el-radio>
      </el-radio-group>
      </el-form-item>
      <el-form-item label="正确选项" v-if="isJudgement">
        <el-radio-group v-model="choiceCorrectAnswer">
          <el-radio :value="0"><el-icon><Check /></el-icon></el-radio>
          <el-radio :value="1"><el-icon><Close /></el-icon></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分值">
        <el-input></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary">提交</el-button>
        <el-button>重置</el-button>
      </div>
    </template>
  </el-dialog>


  <!--detail详情对话框-->
  <el-dialog title="试题详情" width="600" align-center v-model="showDetail" :QuestionInfo="QuestionInfo">
    <el-form>
      <el-form-item label="题目类型:">
        <span>{{ QuestionInfo.type==='choice'?'选择题':'判断题' }}</span>
      </el-form-item>
      <!-- <el-form-item label="疾病种类:">
        <span>{{ QuestionInfo.disease_kind }}</span>
      </el-form-item> -->
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

</template>



<!--相关配置-->
<script setup lang="ts">
import useBackQuestionStore from "@/store/back/question"
import {Delete, Edit, ZoomIn} from '@element-plus/icons-vue'
import { computed, ref,onMounted} from 'vue'
//分页器当前页码
let pageNo=ref<string>("1");
//定义每页展示多少条数据
let pageSize=ref<string>("10")  
let total=ref<number>(0)


let QuestionInfoStore=useBackQuestionStore();
onMounted(async ()=>{
  await QuestionInfoStore.getAllQuestionInfo(pageNo.value,pageSize.value);
})

const handlePageChange = async(pager="1")=>{
  pageNo.value=pager;
  await QuestionInfoStore.getAllQuestionInfo(pageNo.value,pageSize.value);
}






//展示试题详情
const showDetail=ref(false);
const QuestionInfo=ref();
const handleShowDetail=(index:any, row:any)=>{
  showDetail.value= true;
    QuestionInfo.value=row;

}




//获取仓库对象
import useUserStore from '@/store/modules/user';
let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息

</script>

<!--处理函数-->
<script lang="ts">
import { ref } from 'vue'
//控制修改和添加试题的ref
const AlterorAddDialogVisible = ref(false)


//点击“添加试题”
const handleAddQuestion=()=>{
  AlterorAddDialogVisible.value=true;
}



//点击“编辑试题”
const handleEditQuestion=()=>{
  AlterorAddDialogVisible.value=true;
}
//点击“删除试题”
import { ElMessage, ElMessageBox } from 'element-plus'
const handleDeleteQuestion = ()=>{
  ElMessageBox.confirm(
    '您确定删除该试题吗？',
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

//在编辑/添加试题中选择题目类型为选择
const isChoice=ref(false);
const isJudgement=ref(false);
const handleTypeChoice = ()=>{
  isChoice.value=true;
  isJudgement.value=false;
  choiceCorrectAnswer.value='';
  judgementCorrectAnswer.value='';
}
const handleTypeJudgement = ()=>{
  isChoice.value=false;
  isJudgement.value=true;
  choiceCorrectAnswer.value='';
  judgementCorrectAnswer.value='';
}
//为了测试使用的中间状态，后期会整合到object中
const addQuestionType = ref();
const question_body = ref<string>('');
const disease_kind=ref()
const choiceCorrectAnswer=ref();
const judgementCorrectAnswer=ref();
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

</style>

