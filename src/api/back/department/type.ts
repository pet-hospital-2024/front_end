export interface responseData{
    code:number;
    message:string;
}
export interface departmentInfoItem{
    department_id:string;
    department_name:string;
}
export type departmentInfoArr=departmentInfoItem[];
export interface departmentInfoResponseData extends responseData{
    data:{
        total:number;
        list:departmentInfoArr;
    }
}
export interface addDepartmentData{
    department_name:string;
}
export interface deleteDepartmentData{
    department_id:string;
}
export interface editDepartmentData{
    department_id:string;
    department_name:string;
}