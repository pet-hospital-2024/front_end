import request from "@/utils/request";
import type { caseInfoResponseData,responseData,addTextCaseData,deleteTextCaseData, editTextCaseData } from "./type";
enum API{
    GETCASEINFOBYSLICE_URL="/disease/getCaseList",
    ADDTEXTCASE_URL="/disease/addCase",
    DELETETEXTCASE_URL="/disease/deleteCase",
    EDITTEXTCASE_URL="/disease/changeCaseTextbyId",
}
//获取病例信息
export const getCaseInfoBySlice=(page:string,pageSize:string)=>request.get<any,caseInfoResponseData>(API.GETCASEINFOBYSLICE_URL,{params:{page,pageSize}});
// 添加病例
export const addCaseByText=(data:addTextCaseData)=>request.post<any,responseData>(API.ADDTEXTCASE_URL,data);
//删除病例
export const deleteCaseByText=(data:deleteTextCaseData)=>request.post<any,responseData>(API.DELETETEXTCASE_URL,data);
//修改病例文字信息
export const editCaseByText=(data:editTextCaseData)=>request.post<any,responseData>(API.EDITTEXTCASE_URL,data);