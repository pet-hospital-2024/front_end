import request from "@/utils/request";
import type { textCaseInfoResponseData,responseData,addCaseTextData,deleteCaseTextData, editCaseTextData, searchCaseData, searchCaseResponseData, addMediaCaseData, caseMediaResponseData, deleteMediaData, mediaUrlResponseData } from "./type";
import { parseDate } from "element-plus";
enum API{
    GETCASEINFOBYSLICE_URL="/disease/getCaseList",
    ADDTEXTCASE_URL="/disease/addCase",
    DELETETEXTCASE_URL="/disease/deleteCase",
    EDITTEXTCASE_URL="/disease/changeCaseTextbyId",
    SEARCHCASE_URL="/disease/searchCase",
    ADDMEDIACASE_URL="/disease/addMedia",
    GETCASEMEDIAINFO_URL="/disease/getMedia",
    DELETEMEDIAINFO_URL="/disease/deleteMediaByUrl",
    GETMEDIAURL_URL="/disease/getMediaURL",
}
//获取病例信息
export const getCaseInfoBySlice=(page:string,pageSize:string)=>request.get<any,textCaseInfoResponseData>(API.GETCASEINFOBYSLICE_URL,{params:{page,pageSize}});
// 添加病例
export const addCaseByText=(data:addCaseTextData)=>request.post<any,responseData>(API.ADDTEXTCASE_URL,data);
//删除病例
export const deleteCaseById=(data:deleteCaseTextData)=>request.post<any,responseData>(API.DELETETEXTCASE_URL,data);
//修改病例文字信息
export const editCaseByText=(data:editCaseTextData)=>request.post<any,responseData>(API.EDITTEXTCASE_URL,data);
//搜索病例信息-get
//export const searchCaseById=(data:searchCaseData)=>request.post<any,searchCaseResponseData>(API.SEARCHCASE_URL,data);
export const searchCaseById=(case_name:string)=>request.get<any,searchCaseResponseData>(API.SEARCHCASE_URL,{params:{case_name}});
//增加病例多媒体信息
export const addCaseByMedia=(data:FormData)=>request.post<any,responseData>(API.ADDMEDIACASE_URL,data,{ headers: {
    'Content-Type': 'multipart/form-data'
  }});
//获取多媒体信息
export const getCaseMediabyId = (case_id: string,media_type:string,category:string) =>
    request.get<any,caseMediaResponseData >(API.GETCASEMEDIAINFO_URL, {params:{case_id,media_type,category}});
//删除多媒体信息
export const deleteCaseMediaById=(data:deleteMediaData)=>request.post<any,responseData>(API.DELETEMEDIAINFO_URL,data);
//获取多媒体URL
export const getMediaURL=(case_id:string,media_type:string,category:string,)=>request.get<any,mediaUrlResponseData>(API.GETMEDIAURL_URL,{params:{case_id,media_type,category}})