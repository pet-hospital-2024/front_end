//题库管理接口管理
import request from "@/utils/request";
import type { responseData,paperInfoResponseData,deletePaperData, addQuestionForPaperData,addPaperData,deleteQuestionFromPaperData, editPaperBasicData, getQuestionByIdResponseData } from "./type";
enum API{
    GETPAPERINFOBYSLICE_URL="/paper/getPaperList",
    DELETEPAPERINFO_URL="/paper/delete",
    CREATEPAPER_URL="/paper/create",
    ADDQUESTIONFORPAPER_URL="/paper/addquestion",
    DELETEQUESTIONFROMPAPER_URL="/paper/deletequestion",
    EDITPAPERBASICINFO_URL="/paper/change",
    GETPAPERBYID_URL="/paper/getPaperById",
}
//获取全部试卷--check
export const getAllPaperInfoBySlice=(page:string,size:string)=>request.get<any,paperInfoResponseData>(API.GETPAPERINFOBYSLICE_URL,{params:{page,size}});
//删除试卷
export const reqDeletePaperInfo=(data:deletePaperData)=>request.post<any,responseData>(API.DELETEPAPERINFO_URL,data);
//从试卷删除试题
export const reqDeleteQuestionFromPaper=(data:deleteQuestionFromPaperData)=>request.post<any,responseData>(API.DELETEQUESTIONFROMPAPER_URL,data);
//新建试卷
export const reqAddPaperInfo=(data:addPaperData)=>request.post<any,responseData>(API.CREATEPAPER_URL,data)
// //向试卷添加试题
export const reqAddQuestionForPaper=(data:addQuestionForPaperData)=>request.post<any,responseData>(API.ADDQUESTIONFORPAPER_URL,data);
//修改基本信息
export const reqEditBasicInfo=(data:editPaperBasicData)=>request.post<any,responseData>(API.EDITPAPERBASICINFO_URL,data);
//获取试卷全部试题
export const reqQuestionInfoById=(paper_id:string)=>request.get<any,getQuestionByIdResponseData>(API.GETPAPERBYID_URL,{params:{paper_id}});
