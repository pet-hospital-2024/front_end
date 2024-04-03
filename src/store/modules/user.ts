import { defineStore } from "pinia";
import { reqCheckOldPassword,reqUpdateNewPassword, reqLogin, reqRegister } from "@/api/user";
import type {
  LoginData,
  LoginResponseData,
  RegisterResponseData,
  RegisterData,
  CheckOldPasswordData,
  UpdateNewPasswordData,
} from "@/api/user/type";
import type { UserState } from "./types/type";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
//引入常量路由
import { constantRoute } from "@/router/routes";
import { ElNotification } from "element-plus";
import { jwtDecode } from "jwt-decode";

//用户小仓库
let useUserStore = defineStore("User", {
  //存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute, //仓库存储菜单生成需要数组（路由）
      // username:'',//存储用户姓名和头像
      // identity:''//存储用户身份
      userData: {},
    };
  },
  actions: {
    async userLogin(data: LoginData) {
      let result: LoginResponseData = await reqLogin(data);
      console.log(result);
      if (result.code == 1) {
        this.token = result.data as string;
        const decoded = jwtDecode(this.token); // 使用jwtDecode解码
        this.userData = decoded;
        console.log(this.userData.username);
        SET_TOKEN(this.token);
        // //本地持久化存储
        // localStorage.setItem("TOKEN",result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    async getUserIdentity() {
      try {
        const decoded = await jwtDecode(this.token as string); // 使用jwtDecode解码
        this.userData = decoded;
        return this.userData?.identity;
      } catch (error) {
        // 处理解码错误
        console.error("Error decoding token:", error);
        return null;
      }
    },

    //注册
    async register(data: RegisterData) {
      let result: RegisterResponseData = await reqRegister(data);
      console.log(result);
      if (result.code == 1) {
        this.token = result.data as string;
        const decoded = jwtDecode(this.token); // 使用jwtDecode解码
        this.userData = decoded;
        console.log(this.userData.username);
        SET_TOKEN(this.token);
        // //本地持久化存储
        // localStorage.setItem("TOKEN",result.data.token);
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },
    //退出登录
    userLogout() {
      //退出登录接口（or mock 接口）：通知服务器本地用户唯一标识符失效
      this.token = "";
      this.userData = {};
      // this.username='';
      // localStorage.removeItem('TOKEN');
      REMOVE_TOKEN();
    },
    //修改密码
    async modify(pwd: any) {
      const oldPwd: CheckOldPasswordData = {
        user_id: this.userData?.user_id as string,
        oldPassword: pwd.oldPassword,
      };
      let result: any = await reqCheckOldPassword(oldPwd);
      if (result.code == 1) {
        const newPwd: UpdateNewPasswordData = {
          user_id: this.userData?.user_id as string,
          newPassword: pwd.newPassword,
        };
        let res: any = await reqUpdateNewPassword(newPwd);
        if(res.code==1){
          ElNotification({
            type: "success",
            message: "修改密码成功",
          });
        }else{
          return Promise.reject(new Error(res.message));
        }
      }else {
        return Promise.reject(new Error(result.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;