export interface responseData{
    code:number;
    message:string;
}
export interface diseaseInfoItem{
    disease_id:string;
    department_id:string;
    disease_name:string;
}
export type diseaseInfoArr=diseaseInfoItem[];
export interface diseaseInfoResponseData extends responseData{
    data:{
        total:number;
        list:diseaseInfoArr;
    }
}
export interface addDiseaseData{
    department_id:string;
    disease_name:string;
}
export interface deleteDiseaseData{
    disease_id:string;
}
export interface editDiseaseData{
    disease_id:string;
    disease_name:string;
}
