import { defineStore } from "pinia";
//@ts-ignore
import {
  reqGetDirectory,
  reqGetCaseByDis,
  reqGetCaseTextbyId,
  reqGetCaseMediabyId,
} from "@/api/front/case";
//@ts-ignore
import type {
  CategoryResponseData,
  CaseListResponseData,
  CaseDetailInfoResponseData,
  MediaResponseData,
} from "@/api/front/case/type";
import type { FrontCaseState } from "./types/type";
const useFrontCaseStore = defineStore("FrontCase", {
  state: (): FrontCaseState => {
    return {
      categoryArr: [],
      caseList: [],
      caseDetail: null,
      pictureList: [],
      videoList: [],
    };
  },
  actions: {
    //获取病例学习的目录
    async getDirectory() {
      let res: CategoryResponseData = await reqGetDirectory();
      if (res.code == 1) {
        this.categoryArr = res.data;
      }
    },
    //根据疾病获取病例
    async getCaseList(disease_id: string) {
      let res: CaseListResponseData = await reqGetCaseByDis(disease_id);
    //   console.log(res);
      if (res.code == 1) {
        this.caseList = res.data;
      }
    },
    //根据id获取病例文字信息
    async getCaseText(case_id: string) {
      let res: CaseDetailInfoResponseData = await reqGetCaseTextbyId(case_id);
    //   console.log(res);
      if (res.code == 1) {
        this.caseDetail = res.data;
      }
    },
    //根据id获取多媒体信息
    async getMediaList(case_id: string, category: string) {
      let res: MediaResponseData = await reqGetCaseMediabyId(
        case_id,
        "image",
        category
      );
      console.log(res);
      if (res.code == 1) {
        this.pictureList = res.data;
      }
      let result: MediaResponseData = await reqGetCaseMediabyId(
        case_id,
        "video",
        category
      );
      console.log(result);
      if (res.code == 1) {
        this.videoList = result.data;
      }
    },
  },
});

export default useFrontCaseStore;
