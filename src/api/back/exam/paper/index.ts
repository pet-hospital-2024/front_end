//题库管理接口管理
import request from "@/utils/request";
import type { responseData,paperInfoResponseData,deletePaperData, addQuestionForPaperData } from "./type";
enum API{
    GETPAPERINFOBYSLICE_URL="/paper/getPaperList",
    DELETEPAPERINFO_URL="/paper/delete",
}
//获取全部试卷
export const getAllPaperInfoBySlice=(page:string,size:string)=>request.get<any,paperInfoResponseData>(API.GETPAPERINFOBYSLICE_URL,{params:{page,size}});
//删除试卷
export const reqDeletePaperInfo=(data:deletePaperData)=>request.post<any,responseData>(API.DELETEPAPERINFO_URL,data);
//向试卷添加试题
// export const reqAddQuestionForPaper=(data:addQuestionForPaperData)=>request.post<any,>
