<template>
  <div class="container">
    <el-row>
      <el-col :span="18" style="background-color: rgb(255, 255, 200)">
        <div class="left">
          <div class="title">
            <p>考试名称</p>
          </div>
          <div class="paper">
            <div
              class="question"
              v-for="(question, index) in questionList"
              :key="question.question_id"
            >
              <div class="questionTitle">
                <span>{{ question.order + "." }}</span>
                <span>{{ question.question_body }}</span>
              </div>
              <el-radio-group v-model="question.selectedOpt">
                <el-radio
                  v-for="opt in question.options"
                  :key="opt.optCode"
                  :label="opt.optCode"
                  style="
                    width: 100%;
                    white-space: normal;
                    line-height: 1.5;
                    margin-top: 10px;
                  "
                >
                  {{ opt.optCode + ". " + opt.optContent }}
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right">
          <div class="title">
            <p>测试详情</p>
          </div>
          <div class="state">
            <div
              v-for="(question, index) in questionList"
              :key="question.question_id"
              :class="['status-box', question.status]"
              @click="setCurrentQuestion"
            >
              {{ question.order }}
            </div>
          </div>
          
          <div class="optBtn">
            <div style="width: 80%;margin-top: 50px;">
              <el-button type="primary" plain size="large" style="width: 100%">提交</el-button>
            </div>
            <div style="width: 80%;margin-top: 20px;">
              <el-button type="primary" plain size="large" style="width: 100%">退出测试</el-button>
            </div>
          </div>
          <div class="spacer"></div> 
          <div class="leftTime">
            <p>剩余时间:{{ "22:22:22" }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const setCurrentQuestion=() =>{
  console.log(123);

}

const questionList = reactive([
  {
    question_id: "1",
    order: "1",
    question_body:
      "题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容",
    type: "choice",
    options: [
      {
        optCode: "A",
        optContent:
          "选项A题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容",
      },
      { optCode: "B", optContent: "选项B" },
      { optCode: "C", optContent: "选项C" },
      { optCode: "D", optContent: "选项D" },
    ],
    right_choice: "2",
    judgement: "1",
    value: "5",
    selectedOpt: null,
    status: "pending",
  },
  {
    question_id: "2",
    order: "2",
    question_body:
      "题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容",
    type: "choice",
    options: [
      { optCode: "A", optContent: "选项A" },
      { optCode: "B", optContent: "选项B" },
      { optCode: "C", optContent: "选项C" },
      { optCode: "D", optContent: "选项D" },
    ],
    right_choice: "2",
    judgement: "1",
    value: "5",
    selectedOpt: "1",
    status: "pending",
  },
  {
    question_id: "3",
    order: "3",
    question_body:
      "题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容",
    type: "choice",
    options: [
      { optCode: "1", optContent: "对" },
      { optCode: "2", optContent: "错" },
    ],
    right_choice: "2",
    judgement: "1",
    value: "5",
    selectedOpt: "1",
    status: "pending",
  },
  {
    question_id: "4",
    order: "4",
    question_body:
      "题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容",
    type: "choice",
    options: [
      { optCode: "A", optContent: "选项A" },
      { optCode: "B", optContent: "选项B" },
      { optCode: "C", optContent: "选项C" },
      { optCode: "D", optContent: "选项D" },
    ],
    right_choice: "2",
    judgement: "1",
    value: "5",
    selectedOpt: null,
    status: "done",
  },
  {
    question_id: "5",
    order: "5",
    question_body:
      "题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容",
    type: "choice",
    options: [
      { optCode: "A", optContent: "选项A" },
      { optCode: "B", optContent: "选项B" },
      { optCode: "C", optContent: "选项C" },
      { optCode: "D", optContent: "选项D" },
    ],
    right_choice: "2",
    judgement: "1",
    value: "5",
    selectedOpt: null,
    status: "pending",
  },
]);
</script>

<style scoped lang="scss">
.left {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;

  .title {
    width: 95%;
    height: 6vh;
    background-color:  rgb(237, 237, 237);;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .paper {
    background-color: rgb(255, 255, 255);
    height: 85vh;
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    // &::-webkit-scrollbar {
    //   display: none;
    // }

    .question {
      width: 95%;
      // height: 300px;
      background-color: #fff;
      margin-top: 30px;

      .questionTitle {
        line-height: 1.5;
      }

      .option {
        width: 100%;
        display: flex;
        flex-direction: column;
      }
    }
  }
}

.right {
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  justify-content: space-between;

  .title {
    width: 100%;
    height: 6vh;
    background-color: rgb(237, 237, 237);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .state {
    background-color: rgb(255, 255, 255);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;

    .status-box {
      width: 60px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      margin-bottom: 10px;
      cursor: pointer;
    }

    .pending {
      background-color: #f0f0f0;
    }
    .done {
      border: 2px solid;
      border-color: rgb(119, 214, 251);
      background-color: #c3e1f8;
    } /* 蓝色 */
    .correct {
      border-color: rgb(126, 216, 126);
      background-color: #b1e4b2;
    } /* 绿色 */
    .wrong {
      border-color: rgb(246, 103, 103);
      background-color: #e3a5a1;
    } /* 红色 */
  }

  .leftTime{
    width: 95%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
    p{
      font-size: 30px;
      color: rgb(140, 140, 140);
    }
  }
  .optBtn {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
