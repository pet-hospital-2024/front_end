export interface responseData{
    code:number;
    message:string;
}
export interface caseTextInfoItem {
    case_id:string;
    case_name: string;
    case_examination: string;
    case_result: string|null;
    case_treatment: string|null;
    case_medicine: string|null;
    case_cost: string|null;
    case_introduction: string|null;
    disease_id: string;
    department_id: string;
    disease_name:string;
    department_name:string;
}
export type caseTextInfoArr=caseTextInfoItem[];
export interface textCaseInfoResponseData extends responseData{
    data:{
        total:number;
        list:caseTextInfoArr;
    }
}
export interface addCaseTextData {
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
export interface deleteCaseTextData{
    case_id:string;
}
export interface editCaseTextData{
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
export interface searchCaseData{
    case_name:string;
}
export interface searchCaseResponseData extends responseData{
    data:caseTextInfoArr;
}
//多媒体传输
export interface addMediaCaseData{
    file:File;
    case_id:string;
    catagory:string;
}
export interface caseMediaResponseData extends responseData {
    data:Array<string>;
  }
  export interface deleteMediaData{
    media_id:string;
  }
  