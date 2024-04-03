//定义全部接口返回数据都拥有ts类型
export interface ResponseData {
  code: number;
  message: string;
}

//用户登录接口
export interface LoginData {
  username: String;
  password: String;
}

//用户注册接口
export interface RegisterData {
  username: string;
  password: string;
  identity: string;
  phone_number: string;
  email: string;
}

//定义用户信息的接口
export interface UserInfo {
  user_id: string;
  username: string;
  password: string;
  identity: string;
  phone_number: string;
  email: string;
  timestamp: string;
  token: null | string;
}

// interface dataType{
//   Token:string,
// }

//定义登录接口返回数据类型
export interface LoginResponseData extends ResponseData {
  data: string;
}

// 定义data字段的接口
interface InfoData {
  info: UserInfo;
}

//定义获取用户信息返回数据类型
export interface UserInfoResponseData extends ResponseData {
  data: InfoData;
}

//定义注册接口返回数据类型
export interface RegisterResponseData extends ResponseData {
  data: string;
}

//定义验证旧密码数据
export interface CheckOldPasswordData {
  user_id: string;
  oldPassword: string;
}

//定义更新新密码数据
export interface UpdateNewPasswordData {
  user_id: string;
  newPassword: string;
}