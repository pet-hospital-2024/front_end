//题库管理接口管理
import request from "@/utils/request";
//试题数据类型枚举
import type { responseQuestionData } from "./type";
enum API{
  GETQUESTIONINFOBYSLICE_URL="/question/getAll",
}
//返回所有试题
export const reqQuestionInfoBySlice = (page:string,size:string) =>request.get<any,responseQuestionData>(API.GETQUESTIONINFOBYSLICE_URL,{params:{page,size}})