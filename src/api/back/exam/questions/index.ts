//题库管理接口管理
import request from "@/utils/request";
//试题数据类型枚举
import type { responseQuestionData,addQuestionData,responseData,editQuestionData,deleteQuestionData, diseaseAnddepartmentResponseData, searchQuestionResponseData, checkQuestionStateData } from "./type";
enum API{
  GETQUESTIONINFOBYSLICE_URL="/question/getAll",
  ADDQUESTIONINFO_URL="/question/add",
  EDITQUESTIONINFO_URL="/question/alter",
  DELETEQUESTIONINFO_URL="/question/delete",
  GETDEPARTMENTANDDISEASEINFO_URL="/disease/getCatalog",
  SEARCHQUESTIONBYNAME_URL="/question/getquestionbyname",
  CHECKQUESTION_URL="/question/used",
}
//返回所有试题
export const reqQuestionInfoBySlice = (page:string,size:string) =>request.get<any,responseQuestionData>(API.GETQUESTIONINFOBYSLICE_URL,{params:{page,size}})
//新建题目
export const reqAddQuestionInfo = (data:addQuestionData)=>request.post<any,responseData>(API.ADDQUESTIONINFO_URL,data);
//修改题目
export const reqEditQuestionInfo=(data:editQuestionData)=>request.post<any,responseData>(API.EDITQUESTIONINFO_URL,data);
//删除题目
export const reqDeleteQuestionInfo=(data:deleteQuestionData)=>request.post<any,responseData>(API.DELETEQUESTIONINFO_URL,data);
//返回科室疾病目录
export const reqDepartmentAndDisease=()=>request.get<any,diseaseAnddepartmentResponseData>(API.GETDEPARTMENTANDDISEASEINFO_URL);
//模糊查找题目
export const reqSearchQuestionByName=(question_name:string)=>request.get<any,searchQuestionResponseData>(API.SEARCHQUESTIONBYNAME_URL,{params:{question_name}})
//检查改题目是否被占用
export const reqCheckQuestionState=(data:deleteQuestionData)=>request.post<any,responseData>(API.CHECKQUESTION_URL,data);