import request from "@/utils/request";

import type { responseRoleData,addRoleData,responseData, deleteRoleData, searchRoleData, searchResponseData,banRoleData } from "./type";
enum API{
    GETUSERINFOBYSLICE_URL="/user/getAllUser",
    ADDUSERINFO_URL="/user/register",
    DELETEUSER_URL="/user/delete",
    EDITUSERINFO_URL="/user/changeinfo",
    SEARCHUSER_URL="/user/getinfo",
    BANUSER_URL="/user/ban",
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
export const searchUserByName=(data:searchRoleData)=>request.get<any,searchResponseData>(API.SEARCHUSER_URL,{params:data});
//禁用用户
export const banUserByName = (data:banRoleData)=>request.post<any,responseData>(API.BANUSER_URL,data);