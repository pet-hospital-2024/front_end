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
    };
  },
  actions: {
    //获取考试列表
    async getTestListArr() {
      let res: TestListResponseData = await reqTestList();
      if (res.code == 200) {
        this.testListArr = res.data;
      }
    },
    //获取试卷详情
    async getQuestionListArr(id: string) {
      let res: TestDetailResponseData = await reqTestDetail(id);
      if (res.code == 200) {
        //在得到的数据的基础上加上已选择项和状态
        this.questionListArr = res.data.questions.map((question) => ({
          ...question,
          selectedOpt: null,
          status: "pending", 
        }));
      }
    },
  },
});

// export default useFrontExamStore;
