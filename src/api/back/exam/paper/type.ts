export interface responseData{
    code:number;
    message:string;
}
export interface paperInfoItem{
    paper_id:string;
    paper_name:string;
    duration:number;
    question_number:number;
    value:string;
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
    question_order: number;
    question_value: number;
}