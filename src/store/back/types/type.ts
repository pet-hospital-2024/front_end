import type { diseaseInfoArr } from "@/api/back/deisease/type";
import type { departmentInfoArr } from "@/api/back/department/type";
import type { paperInfoArr } from "@/api/back/exam/paper/type";
import type {  departmentQuestionInfoArr, questionArr } from "@/api/back/exam/questions/type";
import type { testInfoArr } from "@/api/back/exam/test/type";
import type { roleInfoArr, } from "@/api/back/role/type";
export interface userInfoBySliceState{
    total:number;
    userInfoArr:roleInfoArr;
}
export interface deleteUserName{
    username:string;
}
export interface searchUserName{
    username:string;
}
//用户管理数据类型定义
export interface questionInfoBySliceState{
    total:number;
    questionInfoArr:questionArr;
    diseaseAndDepartmentInfoArr:departmentQuestionInfoArr;
}

//科室返回数据
export interface departmentInfoBySliceState{
    total:number;
    departmentInfoArr:departmentInfoArr;
}
//疾病返回数据
export interface diseaseInfoBySliceState{
    total:number;
    diseaseInfoArr:diseaseInfoArr;
}
//试卷保存类型
export interface paperInfoBySliceState{
    total:number;
    paperInfoArr:paperInfoArr;
    
}
//考试保存类型
export interface testInfoBySliceState{
    total:number;
    testInfoArr:testInfoArr;
    paper_name:string;
}