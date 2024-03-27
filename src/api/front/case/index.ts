import request from "@/utils/request";
import type { CaseGenInfoResponseData, CategoryResponseData } from "./type";

enum API {
  GETCASEBYDIS_URL = "disease/getInstancebyDis",
  GETDIRECTORY_URL = "/disease/getAllKindAndDis",
  GETCASEDETAIL_URL = "/disease/searhByInstanceId",
}

//根据疾病返回病例
export const reqGetCaseByDis = (id: string) =>
  request.get<any, CaseGenInfoResponseData>(API.GETCASEBYDIS_URL, {
    params: { id },
  });

//返回科室和疾病目录
export const reqGetDirectory = () =>
  request.get<any, CategoryResponseData>(API.GETDIRECTORY_URL);

//返回病例详情
export const reqGetCaseDetail = (id: string) =>
  request.get<any, any>(API.GETCASEDETAIL_URL, { params: { id } });
