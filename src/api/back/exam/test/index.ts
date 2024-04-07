//题库管理接口管理
import request from "@/utils/request";
import type { responseData,responseAllExamData, addTestData,deleteTestData, editTestData, getPaperNameData ,paperResponseData} from "./type";
enum API{
    GETTESTINFOBYSLICE_URL="/exam/getAllExam",
    ADDTESTINFO_URL="/exam/addexam",
    DELETETESTINFO_URL="/exam/deleteexam",
    EDITTESTINFO_URL="/exam/alterexam",
    GETPAPERNAMEBYID_URL="/paper/getpaper",
}
//获取所有考试
export const reqAllTestInfoBySlice=(page:string,size:string)=>request.get<any,responseAllExamData>(API.GETTESTINFOBYSLICE_URL,{params:{page,size}});
//添加考试
export const reqAddTestInfo = (data:addTestData)=>request.post<any,responseData>(API.ADDTESTINFO_URL,data);
//删除考试
export const reqDeleteTestInfo = (data:deleteTestData)=>request.post<any,responseData>(API.DELETETESTINFO_URL,data);
//修改考试
export const reqEditTestInfo = (data:editTestData)=>request.post<any,responseData>(API.EDITTESTINFO_URL,data);
//获取paperName
export const getPaperInfoById=(data:getPaperNameData)=>request.post<any,paperResponseData>(API.GETPAPERNAMEBYID_URL,data);