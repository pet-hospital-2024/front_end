import { defineStore } from "pinia";
import { reqTestDetail, reqTestList } from "@/api/front/exam";

import type {
  TestDetailResponseData,
  TestListResponseData,
} from "@/api/front/exam/type";

import type { FrontExamState } from "./types/type";

export const useFrontExamStore = defineStore("FrontExam", {
  state: (): FrontExamState => {
    return {
      testListArr: [],
      questionListArr: [],
      testData: null,
      isSubmitted: false,
    };
  },
  actions: {
    //获取考试列表
    async getTestListArr() {
      let res: TestListResponseData = await reqTestList();
      if (res.code == 1) {
        this.testListArr = res.data.filter(paper=>{
          const now = new Date();
          const examEnd = new Date(paper.exam_end as string);
          return now < examEnd;
        });
        // console.log(this.testListArr);
      }
    },
    //获取试卷详情
    async getQuestionListArr(paper_id: string) {
      let res: TestDetailResponseData = await reqTestDetail(paper_id);
      // console.log(111);
      
      if (res.code == 1) {
        //在得到的数据的基础上加上已选择项和状态
        this.testData = res.data;
        this.questionListArr = res.data.questions;
        // console.log(this.questionListArr);
        this.questionListArr = res.data.questions.map((question) => ({
          ...question,
          selectedOpt: null,
          status: "pending",
        }));
        // console.log(this.questionListArr);
      }
      return this.questionListArr;
    },
    submitAnswer() {
      // 提交答案的逻辑
      this.isSubmitted = true;
    },
    resetExamState() {
      this.questionListArr = this.questionListArr.map((question) => ({
        ...question,
        selectedOpt: null,
        status: "pending",
      })); 
      this.testData = null; 
      this.isSubmitted = false;
    }
  },
});

// export default useFrontExamStore;
