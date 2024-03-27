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


    <!--分页器-->


    <!--对话框组件-->

    <!--title动态，根据点击显示添加or修改-->
    <!--点击添加或编辑弹出的对话框-->
 <el-dialog v-model="AddDialogVisible" title="创建试卷" width="800" align-center>
    <el-form>
        <el-form-item label="试卷名称">
            <input>
        </el-form-item>
        <el-form-item label="题目数量">
            <input>
        </el-form-item>
    </el-form>
    <el-button type="primary" size="default" icon="Plus" style="margin-bottom: 20px;">添加试题</el-button>
    <el-table :data="paperDetailArr" height="300" style="width: 100%">

        <el-table-column type="index" label="序号" width="80" align="center"/>
        <el-table-column prop="type" label="题型" width="80" align="center"/>
        <el-table-column prop="disease_kind" label="疾病种类" width="80" align="center"/>
        <el-table-column prop="question_body" label="题干"  align="center"/>
        <el-table-column label="Operations" width="80">
        <template #default="scope">
            <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>

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
import { onMounted } from 'vue';
//获取仓库对象
import useUserStore from '@/store/modules/user';
import {ZoomIn,Edit,Delete} from '@element-plus/icons-vue'
let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息
onMounted(()=>{
    userStore.userInfo();
})
import { ref } from 'vue';
const AddDialogVisible=ref<boolean>(false);
const handleAddPaper=()=>{
    AddDialogVisible.value=true;

}
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
const paperDetailArr=[
    {
        type:'',
        disease_kind:'',

    }
]
</script>