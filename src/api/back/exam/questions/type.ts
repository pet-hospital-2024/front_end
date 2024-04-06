export interface responseData{
  code:number;
  message:string;
}
interface questionItem{
  question_id:string;
  question_body:string;
  type:string;//choice or judge
  disease_id:string;
  department_id:string;
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