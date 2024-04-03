import request from "@/utils/request";
import type { CaseListResponseData, CategoryResponseData ,CaseDetailInfoResponseData} from "./type";

enum API {
  GETCASEBYDIS_URL = "/disease/getCasebyDisease",
  GETDIRECTORY_URL = "/disease/getCatalog",
  GETCASETEXT_URL = "/disease/getCaseTextbyId",
}

//根据疾病返回病例
export const reqGetCaseByDis = (disease_id: string) =>
  request.get<any, CaseListResponseData>(API.GETCASEBYDIS_URL, {params:{disease_id}});

//返回科室和疾病目录
export const reqGetDirectory = () =>
  request.get<any, CategoryResponseData>(API.GETDIRECTORY_URL);

//根据id返回病例详细信息
export const reqGetCaseTextbyId = (case_id: string) =>
  request.get<any, CaseDetailInfoResponseData>(API.GETCASETEXT_URL, {params:{case_id}});