export interface responseData{
  code:string;
  message:string;
}

interface questionOptionItem{
  optCode:string;
  optContent:string;
}
type questionOptionArr=questionOptionItem[];
interface questionItem{
  question_id:string;
  order:string;
  question_body:string;
  type:string;
  options:questionOptionArr;
  

}
export interface responseQuestionData{

}