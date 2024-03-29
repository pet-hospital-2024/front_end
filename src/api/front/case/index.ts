import request from "@/utils/request";
import type { CaseListResponseData, CategoryResponseData ,CaseDetailInfoResponseData} from "./type";

enum API {
  GETCASEBYDIS_URL = "/disease/getCasebyDisease",
  GETDIRECTORY_URL = "disease/getDirectory",
  GETCASETEXT_URL = "/disease/getCaseTextbyId",
}

//根据疾病返回病例
export const reqGetCaseByDis = (id: string) =>
  request.get<any, CaseListResponseData>(API.GETCASEBYDIS_URL, {params:{id}});

//返回科室和疾病目录
export const reqGetDirectory = () =>
  request.post<any, CategoryResponseData>(API.GETDIRECTORY_URL);

//根据id返回病例详细信息
export const reqGetCaseTextbyId = (id: string) =>
  request.get<any, CaseListResponseData>(API.GETCASETEXT_URL, {params:{id}});