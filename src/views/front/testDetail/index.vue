<template>
  <div class="container">
    <el-row>
      <el-col :span="18" style="background-color: rgb(255, 255, 255)">
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
                <span>{{ question.question_body+"("+question.value+"分)" }}</span>
              </div>
              <el-radio-group
                v-model="question.selectedOpt"
                @change="() => updateQuestionStatus(question)"
              >
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
          <div class="stateBox">
            <div class="state">
              <div
                v-for="(question, index) in questionList"
                :key="question.order"
                :class="['status-box', question.status]"
                @click="setCurrentQuestion(index)"
              >
                {{ question.order }}
              </div>
            </div>
            <div class="space"></div>
          </div>

          <div class="optBtn">
            <div style="width: 80%; margin-top: 50px" v-show="stateSwitch">
              <el-button
                type="primary"
                plain
                size="large"
                style="width: 100%"
                @click="submitConfirm"
                >提交</el-button
              >
            </div>
            <p
              v-show="!stateSwitch"
              style="
                font-size: 30px;
                color: red;
                margin-bottom: 20px;
                margin-top: 30px;
              "
            >
              得分：{{ score }}
            </p>
            <div style="width: 80%; margin-top: 20px">
              <el-button
                type="primary"
                plain
                size="large"
                style="width: 100%"
                @click="confirmExit"
                >退出测试</el-button
              >
            </div>
          </div>
          <!-- <div class="spacer"></div> -->
          <div class="leftTime" v-show="stateSwitch">
            <!-- <p>剩余时间:</p> -->
            <p>{{ formattedTime }}</p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from "vue";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

let $router = useRouter();

//提交按钮和分数切换
let stateSwitch = ref<boolean>(true);
//记录成绩
let score = ref<number>(0);

//提交试卷
const submit = () => {
  if (intervalId !== undefined) clearInterval(intervalId);
  // localStorage.removeItem(examStartTimeKey);
  localStorage.removeItem(examStartedKey);
  // localStorage.removeItem('remainingTime');
  localStorage.setItem("isSubmitted", "true"); // 保存提交状态

  calculateScore();

  stateSwitch.value = false;
};

//计算答案
const calculateScore = () => {
  score.value = 0;
  questionList.forEach((question) => {
    if (question.selectedOpt === question.right_choice) {
      score.value += question.value; // 假设每个问题1分
      question.status = "correct"; // 回答正确
    } else {
      question.status = "wrong"; // 回答错误
    }
  });
};

//题目状态相关
const updateQuestionStatus = (question: any) => {
  question.status = question.selectedOpt ? "done" : "pending";
};

//倒计时相关
const totalExamTime: number = 1 * 60;
let remainingTime = ref<number>(totalExamTime);
const formattedTime = ref<string>("");

const examStartedKey: string = "examStarted";
const examStartTimeKey: string = "examStartTime";

let intervalId: number | undefined;

const updateTime = (): void => {
  if (remainingTime.value > 0) {
    remainingTime.value--;
    localStorage.setItem("remainingTime", remainingTime.value.toString());
  } else {
    // 考试时间结束的额外处理
    submit();
  }
  // 更新格式化的时间显示
  formattedTime.value = formatTime(remainingTime.value);
};

//格式化倒计时
const formatTime = (seconds: number): string => {
  const hours: string = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const minutes: string = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs: string = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
};

onMounted(() => {
  //成绩展示部分
  const isSubmitted = localStorage.getItem("isSubmitted");
  if (isSubmitted === "true") {
    stateSwitch.value = false; // 如果已提交，隐藏提交按钮，显示成绩
  }

  //倒计时部分
  const examStarted: string | null = localStorage.getItem(examStartedKey);
  // if (examStarted) {
  const startTime: number = parseInt(
    localStorage.getItem(examStartTimeKey) || "0",
    10
  );
  const currentTime: number = Date.now();
  const elapsedTime: number = Math.floor((currentTime - startTime) / 1000);

  remainingTime.value = Math.max(totalExamTime - elapsedTime, 0);
  // }

  formattedTime.value = formatTime(remainingTime.value);
  if (remainingTime.value > 0 && examStarted) {
    intervalId = window.setInterval(updateTime, 1000);
  }

  //挂载
  window.addEventListener("beforeunload", handleBeforeUnload);
  window.addEventListener('popstate', handlePopState);
});

onUnmounted(() => {
  //倒计时部分
  if (intervalId !== undefined) clearInterval(intervalId);

  // 组件卸载时移除事件监听器
  window.removeEventListener("beforeunload", handleBeforeUnload);
  window.removeEventListener('popstate', handlePopState);
});

//退出提醒
const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  event.preventDefault();
};
//返回上一页提醒
const handlePopState = () => {
  // 用户点击浏览器后退按钮时的处理逻辑
  exit();
};

const exit=() => {
  localStorage.removeItem(examStartTimeKey);
  localStorage.removeItem(examStartedKey);
  localStorage.removeItem('remainingTime');
  localStorage.removeItem('isSubmitted');
  $router.replace({ path: '/front/testList' });
}
//定位到题目
let currentIndex = ref<number>(0);
const setCurrentQuestion = (index: number) => {
  // console.log(index);
  currentIndex.value = index;
  let allH1 = document.querySelectorAll(".question");
  allH1[currentIndex.value].scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

//提交确认
const submitConfirm = () => {
  ElMessageBox.confirm(
    "提交前请确保所有题目已经完成，一旦提交将无法更改。您确定要提交试卷吗？",
    "提醒",
    {
      confirmButtonText: "提交",
      cancelButtonText: "取消",
      type: "warning",
    }
  )
    .then(() => {
      submit();
    })
    .catch(() => {});
};
//退出确认
const confirmExit = () => {
  if (stateSwitch.value) {
    ElMessageBox.confirm(
      "考试进度将不会被保存，你确定要继续退出吗？",
      "Warning",
      {
        confirmButtonText: "确定退出",
        cancelButtonText: "继续测试",
        type: "warning",
      }
    )
      .then(() => {
        exit();
      })
      .catch(() => {});
  } else {
    exit();
  }
};

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
    right_choice: "B",
    judgement: "1",
    value: 10,
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
    value: 10,
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
      { optCode: "A", optContent: "对" },
      { optCode: "B", optContent: "错" },
    ],
    right_choice: "B",
    judgement: "1",
    value: 10,
    selectedOpt: null,
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
    right_choice: "D",
    judgement: "1",
    value: 10,
    selectedOpt: null,
    status: "pending",
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
    right_choice: "A",
    judgement: "1",
    value: 10,
    selectedOpt: null,
    status: "pending",
  },
  {
    question_id: "6",
    order: "6",
    question_body:
      "题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容题目二的题干内容",
    type: "choice",
    options: [
      { optCode: "A", optContent: "选项A" },
      { optCode: "B", optContent: "选项B" },
      { optCode: "C", optContent: "选项C" },
      { optCode: "D", optContent: "选项D" },
    ],
    right_choice: "D",
    judgement: "1",
    value: 10,
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
    background-color: rgb(237, 237, 237);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .paper {
    background-color: rgb(255, 255, 255);
    height: 83vh;
    width: 95%;
    margin-top: 2vh;
    padding-bottom: 50vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    .question {
      width: 95%;
      // height: 300px;
      background-color: #fff;
      margin-bottom: 30px;

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
  height: 91vh;
  display: flex;
  flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // justify-content: space-between;

  .title {
    width: 100%;
    height: 6vh;
    background-color: rgb(237, 237, 237);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .stateBox {
    height: 50%;
    display: flex;
    flex-direction: column;
    .state {
      margin-top: 10px;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      overflow: auto;
      .status-box {
        width: calc(20% - 10px);
        line-height: 45px;
        text-align: center;
        margin: 5px;
        width: calc(20% - 10px);
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
        border: 2px solid;
        border-color: rgb(126, 216, 126);
        background-color: #defcdf;
      } /* 绿色 */
      .wrong {
        border: 2px solid;
        border-color: rgb(246, 103, 103);
        background-color: #ffd7d3;
      } /* 红色 */
    }
    .space {
      flex-grow: 1;
    }
  }

  .leftTime {
    width: 100%;
    height: 20%;
    // margin-top: 50px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
      margin-top: 30px;
      font-size: 30px;
      color: rgb(140, 140, 140);
    }
  }
  .optBtn {
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }
}
</style>
