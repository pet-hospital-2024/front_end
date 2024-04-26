import request from "@/utils/request";
import type { addDiseaseData, deleteDiseaseData, diseaseInfoResponseData,editDiseaseData,responseData } from "./type";

enum API{
    GETDISEASEINFOBYSLICE_URL="/disease/getDiseasebyDepartment",
    ADDDISEASEINFO_URL="/disease/addDisease",
    DELETEDISEASEINFO_URL="/disease/deleteDisease",
    EDITDISEASEINFO_URL="/disease/changeDiseaseName",
    CHECKDISEASE_URL="/disease/hasCase",
}
//获取所有疾病信息
export const getDiseaseInfoBySlice=(department_id:string,page:string,size:string)=>request.get<any,diseaseInfoResponseData>(API.GETDISEASEINFOBYSLICE_URL,{params:{department_id,page,size}});
//添加疾病
export const addDiseaseInfoByIdAndName=(data:addDiseaseData)=>request.post<any,responseData>(API.ADDDISEASEINFO_URL,data);

//删除疾病
export const deleteDiseaseInfoById=(data:deleteDiseaseData)=>request.post<any,responseData>(API.DELETEDISEASEINFO_URL,data);

//编辑疾病

export const editDiseaseInfoByIdAndName=(data:editDiseaseData)=>request.post<any,responseData>(API.EDITDISEASEINFO_URL,data);
//检查疾病是否被病例使用
export const reqCheckDiseaseState=(data:deleteDiseaseData)=>request.post<any,responseData>(API.CHECKDISEASE_URL,data);