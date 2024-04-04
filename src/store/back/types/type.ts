import type { roleInfoArr, } from "@/api/back/role/type";
export interface userInfoBySliceState{
    total:number;
    userInfoArr:roleInfoArr;
}
export interface deleteUserName{
    username:string;
}
export interface searchUserName{
    username:string;
}