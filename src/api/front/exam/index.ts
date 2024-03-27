import request from "@/utils/request";
import type { TestDetailResponseData,ExamListResponseData } from "./type";

enum API{
    TESTLIST_URL="/paper/getpaperlist",
    TESTDETAIL_URL="/paper/getpaper"
}

//返回前台的考试列表
export const reqTestList=()=>
    request.get<any,ExamListResponseData>(API.TESTLIST_URL);


//返回考试详情
export const reqTestDetail=(id:string)=>
    request.get<any,TestDetailResponseData>(API.TESTDETAIL_URL,{params:{id}});