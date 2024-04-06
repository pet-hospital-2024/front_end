import request from "@/utils/request";
import type {
  LoginData,
  RegisterData,
  LoginResponseData,
  RegisterResponseData,
  UserInfoResponseData,
  CheckOldPasswordData,
  UpdateNewPasswordData,
} from "./type";
enum API {
  LOGIN_URL = "/user/login",
  REGISTER_URL = "/user/register",
  USERINFO_URL = "/user/getinfo",
  CHECK_OLD_PASSWORD_URL = "/user/verifyOldPwd",
  UPDATE_NEW_PASSWORD_URL = "/user/updatePwd",
}

export const reqLogin = (data: LoginData) =>
  request.post<any, LoginResponseData>(API.LOGIN_URL, data);

export const reqRegister = (data: RegisterData) =>
  request.post<any, RegisterResponseData>(API.REGISTER_URL, data);
//暂时修改请求用户信息方法
/*export const reqUserInfo=(userid:string)=>
  request.get<any,UserInfoResponseData>(API.USERINFO_URL+userid)*/
export const reqUserInfo = () =>
  request.get<any, UserInfoResponseData>(API.USERINFO_URL);

//修改密码
export const reqCheckOldPassword = (data: CheckOldPasswordData) =>
  request.post<any, any>(API.CHECK_OLD_PASSWORD_URL, data);

export const reqUpdateNewPassword = (data: UpdateNewPasswordData) =>
  request.post<any, any>(API.UPDATE_NEW_PASSWORD_URL, data);
