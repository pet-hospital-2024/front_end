<template>
    <el-card class="box-card">
        <el-button type="primary" size="default" icon="Plus">
            添加试题
        </el-button>
        <!--表格展示信息-->
        <el-table :data="tableData" style="margin:10px 0" stripe empty-text="无题干!">
            <el-table-column type="index" label="序号" width="80" />
            <el-table-column label="题目类型" width="80">
                <template v-slot="{ row }">
                    {{ row.type === 'choice' ? '选择题' : '判断题' }}
                </template>
            </el-table-column>
            <el-table-column prop="disease_kind" label="疾病类型" width="180" />
            <el-table-column prop="question_body" label="题目描述" />
            <el-table-column align="right" class="operation">
            <template #header>
                <el-input v-model="search" size="small" placeholder="Type to search" />
            </template>
                <!--<Detail :fullText="dataTable"></Detail>-->
                <el-button size="small" 
                @click="handleEdit(scope.$index, scope.row)" 
                :icon="Edit">编辑</el-button>
                <el-button size="small" 
                type="danger" 
                @click="handleDelete(scope.$index, scope.row)" 
                :icon="Delete">删除</el-button>
            </el-table-column>
        </el-table>
    </el-card>
</template>


<script setup lang="ts">
import {Delete, Edit} from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import Detail from './detail/index.vue'


interface ChoiceQuestion {
  disease_kind: string
  type: 'choice'
  question_body: string
  A: string
  B: string
  C: string
  D: string
  right_choice: string
}

interface JudgementQuestion {
  disease_kind: string
  type: 'judgement'
  question_body: string
  judgement: string
}

type User = ChoiceQuestion | JudgementQuestion;

const search = ref('')
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value ||
      data.disease_kind.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}
const handleDetail= (index: number, row: User)=>{

}
const tableData: User[] = [
  {
    disease_kind: "传染病",
    type: "choice",
    question_body: "Duis officia pariatur Duis officia pariatur Duis officia pariatur Duis officia pariatur Duis officia pariatur Duis officia pariatur Duis officia pariatur Duis officia pariatur",
    A: "do fugiat",
    B: "laboris eiusmod ea dolor",
    C: "reprehenderit pariatur sed ex",
    D: "dolor aute Ut",
    right_choice: "0",
  },
  {
    disease_kind: "心脏病",
    type: "judgement",
    question_body: "Duis officia pariatur",
    judgement: "1"
  }
]


import { onMounted } from 'vue';
//获取仓库对象
import useUserStore from '@/store/modules/user';
let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息
onMounted(()=>{
    userStore.userInfo();
})
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

