export interface responseData{
    code:number;
    message:string;
}
export interface roleInfoItem{
    user_id:string;
    username:string;
    password:string;
    identity:string;
    phone_number:string;
    email:string;
    timestamp:string;
    token:null;
    code:null;
    newPassword: null,
    oldPassword: null
}
export type roleInfoArr=roleInfoItem[];
export interface responseRoleData extends responseData {
    data:{
        total:number;
        list:roleInfoArr;
    }
}
export interface addRoleData{
    username:string;
    password:string;
    identity:string;
    phone_number:string;
    email:string;
}
export interface deleteRoleData{
    username:string;
}
export interface searchRoleData{
    username:string;
}
export interface dataType{
    info:roleInfoItem;
}
export interface searchResponseData extends responseData{
    data:dataType;
}
