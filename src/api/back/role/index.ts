import request from "@/utils/request";

import type { responseRoleData,addRoleData,responseData, deleteRoleData, searchRoleData, searchResponseData } from "./type";
enum API{
    GETUSERINFOBYSLICE_URL="/user/getAllUser",
    ADDUSERINFO_URL="/user/register",
    DELETEUSER_URL="/user/delete",
    EDITUSERINFO_URL="/user/changeinfo",
    SEARCHUSER_URL="/user/getinfo",
}
//分页获取用户信息
export const reqUserInfoBySlice=(page:string,size:string)=>request.get<any,responseRoleData>(API.GETUSERINFOBYSLICE_URL,{params:{page,size}});
//添加用户
export const reqAddUser=(userInfoForm:addRoleData)=>request.post<any,responseData>(API.ADDUSERINFO_URL,userInfoForm);
//删除用户
export const reqDeleteUser=(data:deleteRoleData)=>request.post<any,responseData>(API.DELETEUSER_URL,data)
//编辑用户
export const reqEditUser=(userInfoForm:addRoleData)=>request.post<any,responseData>(API.EDITUSERINFO_URL,userInfoForm)
//查找用户
export const searchUserByName=(data:string)=>request.get<any,searchResponseData>(API.SEARCHUSER_URL,{params:{data}});