export interface responseData{
    code:number;
    message:string;
}
export interface testInfoItem{
    exam_id:string;
    paer_id:string;
    exam_name:string;
    exam_start:string;
    exam_end:string;
    duration:number;
}
export type testInfoArr=testInfoItem[];
export interface responseAllExamData extends responseData{
    data:{
        total:number;
        list:testInfoArr
    }
}
export interface addTestData{
    paper_id:string;
    exam_name:string;
    exam_start:string;
    exam_end:string;
}
export interface deleteTestData{
    exam_id:string;
}
export interface editTestData{
    paper_id:string;
    exam_id:string;
    exam_start:string;
    exam_end:string;
}
export interface getPaperNameData{
    paper_id:string;
}
export interface paperInfoItem{
    paper_id:string;
    paper_name:string;
    duration:number;
    question_number:number;
    value:number;
}
export interface paperResponseData extends responseData{
    data:paperInfoItem;
}
