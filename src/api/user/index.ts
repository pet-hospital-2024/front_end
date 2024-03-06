import request from "@/utils/request";
import type{
  LoginData,
  RegisterData,
  LoginResponseData,
  UserInfoResponseData
}from './type'
enum API {
  LOGIN_URL = "user/login",
  REGISTER_URL = "user/register",
  USERINFO_URL="user/getinfo"
}

export const reqLogin=(data:LoginData)=>
  request.post<any,LoginResponseData>(API.LOGIN_URL,data)

export const reqRegister=(data:RegisterData)=>
  request.post<any,LoginResponseData>(API.REGISTER_URL,data)

export const reqUserInfo=(userid:string)=>
  request.get<any,UserInfoResponseData>(API.USERINFO_URL+userid)

