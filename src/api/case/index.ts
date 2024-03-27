import request from "@/utils/request";
import type { CaseGenInfoResponseData, CategoryResponseData } from "./type";

enum API {
  GETCASEBYDIS_URL = "disease/getInstancebyDis",
  GETDIRECTORY_URL = "disease/getDirectory",
}

//根据疾病返回病例
export const reqGetCaseByDis = (id: string) =>
  request.get<any, CaseGenInfoResponseData>(API.GETCASEBYDIS_URL, {params:{id}});

//返回科室和疾病目录
export const reqGetDirectory = () =>
  request.post<any, CategoryResponseData>(API.GETDIRECTORY_URL);
