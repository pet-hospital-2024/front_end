import request from "@/utils/request";
import type { TestDetailResponseData,TestListResponseData } from "./type";

enum API{
    TESTLIST_URL="/exam/getExamList",
    TESTDETAIL_URL="/paper/getPaperById"
}

//返回前台的考试列表
export const reqTestList=()=>
    request.get<any,TestListResponseData>(API.TESTLIST_URL);


//返回考试详情
export const reqTestDetail=(paper_id:string)=>
    request.get<any,TestDetailResponseData>(API.TESTDETAIL_URL,{params:{paper_id}});