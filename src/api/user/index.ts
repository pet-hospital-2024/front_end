import request from "@/utils/request";
import type{
  LoginData,
  RegisterData,
  LoginResponseData,
  UserInfoResponseData
}from './type'
enum API {
  LOGIN_URL = "/user/login",
  REGISTER_URL = "/user/register",
  USERINFO_URL="/user/getinfo"
}

export const reqLogin=(data:LoginData)=>
  request.post<any,LoginResponseData>(API.LOGIN_URL,data)

export const reqRegister=(data:RegisterData)=>
  request.post<any,LoginResponseData>(API.REGISTER_URL,data)
//暂时修改请求用户信息方法
/*export const reqUserInfo=(userid:string)=>
  request.get<any,UserInfoResponseData>(API.USERINFO_URL+userid)*/
export const reqUserInfo=()=>
  request.get<any,UserInfoResponseData>(API.USERINFO_URL)

