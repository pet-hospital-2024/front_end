

export interface responseData{
  code:number;
  message:string;
}
interface questionItem{
  question_id:string;
  question_body:string;
  type:string;//choice or judge
  disease_name:string;
  department_name:string;
  a:string;
  b:string;
  c:string|null;
  d:string|null;
  right_choice:string;

}
export type questionArr=questionItem[];
//返回所有试题数据类型
export interface responseQuestionData extends responseData{
  data:{
    total:number;
    list:questionArr;
  }
}
export interface addQuestionData{
  question_id:string;
  disease_name: string;
  type: string;
  question_body: string;
  a: string;
  b: string;
  c: string;
  d: string;
  right_choice: string;  
  department_name:string;
}
export interface editQuestionData{
  question_id:string;
  disease_name: string;
  type: string;
  question_body: string;
  a: string;
  b: string;
  c: string;
  d: string;
  right_choice: string; 
  department_name:string;
}
export interface deleteQuestionData{
  question_id:string;
}
export interface diseaseQuestionInfoItem{
  disease_id:string;
  disease_name:string;
}
export type diseaseQuestionInfoArr=diseaseQuestionInfoItem[]
export interface departmentQuestionInfoItem{
  department_id:string;
  department_name:string;
  diseases:diseaseQuestionInfoArr;
}
export type departmentQuestionInfoArr=departmentQuestionInfoItem[]
export interface diseaseAnddepartmentResponseData extends responseData{
  data:departmentQuestionInfoArr;
}
export interface searchQuestionResponseData extends responseData{
  data:{
    total:number;
    list:questionArr;
  }
}