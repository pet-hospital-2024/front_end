export interface responseData{
    code:number;
    message:string;
}
export interface caseInfoItem {
    case_id: string;
    case_name: string;
    case_examination: string;
    case_result: string;
    case_treatment: string;
    case_medicine: string;
    case_cost: string;
    case_introduction: string;
    disease_id: string;
    department_id: string;
}
export type caseInfoArr=caseInfoItem[];
export interface caseInfoResponseData extends responseData{
    data:{
        total:number;
        list:caseInfoArr;
    }
}
export interface addTextCaseData {
    case_name: string;
    case_examination: string;
    case_result: string;
    case_treatment: string;
    case_medicine: string;
    case_cost: string;
    case_introduction: string;
    disease_id: string;
    department_id: string;
}
export interface deleteTextCaseData{
    case_id:string;
}
export interface editTextCaseData{
    case_id: string;
    case_name: string;
    case_examination: string;
    case_result: string;
    case_treatment: string;
    case_medicine: string;
    case_cost: string;
    case_introduction: string;
    disease_id: string;
    department_id: string;
}
  
  