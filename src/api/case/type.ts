export interface ResponseData {
    code: number;
    message: string;
}

export interface Disease{
    disCode: string;
    disName: string;
}

//科室的数据
export interface Category{
    categoryCode: string;
    categoryName: string;
    case?:Disease[];
}

//科室数组类型
export type CategoryArr=Category[];

//获取科室和疾病接口返回的数据
export interface CategoryResponseData extends ResponseData {
    data: CategoryArr;
}

//根据疾病返回病例接口
export interface CaseGenInfo{
    id:string;
    name:string;
    intro:string;
}

export type CaseList=CaseGenInfo[];

export interface CaseGenInfoResponseData extends ResponseData {
    data: CaseList;
}