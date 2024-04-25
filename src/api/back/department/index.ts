import request from "@/utils/request";
import type { responseData,departmentInfoResponseData,addDepartmentData, deleteDepartmentData, editDepartmentData } from "./type";
enum API{
    GETDEPARTMENTBYSLICE_URL="/disease/getAllDepartment",
    ADDDRPARTMENT_URL="/disease/addDepartment",
    DELETEDEPARTMENT_URL="/disease/deleteDepartment",
    EDITDEPARTMENT_URL="/disease/changeDepartment",
    CHECKDEPARTMENT_URL="/disease/hasDisease",

}
//获取科室信息
export const getDepartmentInfoBySlice=(page:string,size:string)=>request.get<any,departmentInfoResponseData>(API.GETDEPARTMENTBYSLICE_URL,{params:{page,size}})
//添加科室
export const addDepartmentInfoByName=(department_name:addDepartmentData)=>request.post<any,responseData>(API.ADDDRPARTMENT_URL,department_name);
//删除科室
export const deleteDepartmentById=(department_id:deleteDepartmentData)=>request.post<any,responseData>(API.DELETEDEPARTMENT_URL,department_id);
//修改科室
export const editDepartmentByIdAndName=(data:editDepartmentData)=>request.post<any,responseData>(API.EDITDEPARTMENT_URL,data);
//检查科室是否被疾病使用
export const reqCheckDepartmentState=(data:deleteDepartmentData)=>request.post<any,responseData>(API.CHECKDEPARTMENT_URL,data);