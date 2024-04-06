import request from "@/utils/request";
import type { addDiseaseData, deleteDiseaseData, diseaseInfoResponseData,editDiseaseData,responseData } from "./type";

enum API{
    GETDISEASEINFOBYSLICE_URL="/disease/getDiseasebyDepartment",
    ADDDISEASEINFO_URL="/disease/addDisease",
    DELETEDISEASEINFO_URL="/disease/deleteDisease",
    EDITDISEASEINFO_URL="/disease/changeDiseaseName",
}
//获取所有疾病信息
export const getDiseaseInfoBySlice=(department_id:string)=>request.get<any,diseaseInfoResponseData>(API.GETDISEASEINFOBYSLICE_URL,{params:{department_id}});
//添加疾病
export const addDiseaseInfoByIdAndName=(data:addDiseaseData)=>request.post<any,responseData>(API.ADDDISEASEINFO_URL,data);

//删除疾病
export const deleteDiseaseInfoById=(data:deleteDiseaseData)=>request.post<any,responseData>(API.DELETEDISEASEINFO_URL,data);

//编辑疾病

export const editDiseaseInfoByIdAndName=(data:editDiseaseData)=>request.post<any,responseData>(API.EDITDISEASEINFO_URL,data);