
export interface responseData{
    code:number;
    message:string;
}
export interface paperInfoItem{
    paper_id:string;
    paper_name:string;
    duration:number;
    question_number:number;
    value:number;
}
export type paperInfoArr=paperInfoItem[];
export interface paperInfoResponseData extends responseData{
    data:{
        total:number;
        list:paperInfoArr;
    }
}
export interface deletePaperData{
    paper_id:string;
}

export interface addQuestionForPaperData{
    paper_id: string;
    question_id: string;
    question_order: number|null;
    question_value: number|null;
}
export interface addPaperData{
    paper_name:string;
    duration:number|null;
}
export interface deleteQuestionFromPaperData{
    paper_id:string;
    question_id:string;
}
export interface editPaperData{
    paper_id:string;
    paper_name:string;
    duration:number;
}
export interface editPaperBasicData{
    paper_id:string;
    paper_name:string;
    duration:number;
}
// export interface getQuestionByIdData{
//     paper_id:string;
// }
//getQuestionById返回数据
export interface option{
    optCode:string;
    optContents:string;
}
export type options = option[];
export interface questionInfoItem{
    question_id:string;
    question_body:string;
    type:string;
    right_choice:string;
    value:number;
    order:number;
    options:options;
}
export type questionInfoArr=questionInfoItem[];
export interface getQuestionByIdResponseData extends responseData{
    data:{
        paper_id:string;
        paper_name:string;
        duration:number;
        question_number:number;
        value:number;
        questions:questionInfoArr|null;
    }
}