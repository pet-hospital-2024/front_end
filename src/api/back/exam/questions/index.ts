//题库管理接口管理
import request from "@/utils/request";
//试题数据类型枚举
import type{
    reqChoiceQuestion,
    reqJudgementQuestion,
    reqQuestion,
    QuestionID,
}from './type'
//接口地址枚举
enum API {
  GETALLQUESTIONS_URL = "/back/exam/getallquestions",
  GETQUESTIONSBYID_URL = "/back/exam/getquestionbyid",
  ADDQUESTION_URL="/back/exam/addquestion",
  DELETEQUESTION_URL='/back/exam/deletequestion',
  ALTERQUESTION_URL='/back/exam/alterquestion',
}
//获取试题信息
export const reqGetAllQuestions=()=>
  request.get<any,reqQuestion>(API.GETALLQUESTIONS_URL)

export const reqGetQuestionById=(data:QuestionID)=>
  request.post<any,reqQuestion>(API.GETQUESTIONSBYID_URL,data)
//暂时修改请求用户信息方法
/*export const reqUserInfo=(userid:string)=>
  request.get<any,UserInfoResponseData>(API.USERINFO_URL+userid)*/
export const reqAddQuestion=(data:Authorization)=>
  request.post<any,UserInfoResponseData>(API.USERINFO_URL)

