import { defineStore } from "pinia";
import type { responseRoleData,addRoleData,responseData, searchResponseData, banRoleData } from "@/api/back/role/type";
import type { userInfoBySliceState,deleteUserName ,searchUserName} from "./types/type";
import { reqUserInfoBySlice,reqAddUser, reqDeleteUser, reqEditUser, searchUserByName, banUserByName } from "@/api/back/role";
import { ElNotification } from "element-plus";
let useBackUserInfoStore=defineStore(
    "UserManagement",{
        state:():userInfoBySliceState=>{
            return{
                total:0,
                userInfoArr:[],
            }
        },
        actions:{
            async getAllUserInfo(page:string,size:string){
                let result:responseRoleData=await reqUserInfoBySlice(page,size);
                if(result.code==1){
                    this.userInfoArr=result.data.list;
                    this.total=result.data.total;
                    return 'ok'
                }
                else{
                    ElNotification({
                        type:'error',
                        message:result.message,
                    });
                    return Promise.reject(new Error(result.message));
                    
                }
            },
            async addNewUser(userInfoForm:addRoleData){
                let result:responseData=await reqAddUser(userInfoForm);
                if(result.code==1){

                    ElNotification({
                        type:'success',
                        message:"添加用户成功!",
                    })
                    return "ok";
                }
                else{
                    ElNotification({
                        type:'error',
                        message:result.message,
                    });
                    return Promise.reject(new Error(result.message));
                }
            },
            async deleteUserByName(username:deleteUserName){
                let result:responseData=await reqDeleteUser(username);
                if(result.code==1){
                    ElNotification({
                        type:'success',
                        message:"删除用户成功!",
                    })
                    return "ok";
                }else{
                    ElNotification({
                        type:'error',
                        message:"删除用户失败！",
                    })
                    return Promise.reject(new Error(result.message));
                }
            },
            async alterUserInfo(userInfoForm:addRoleData){
                let result:responseData=await reqEditUser(userInfoForm);
                if(result.code==1){
                    ElNotification({
                        type:'success',
                        message:"修改用户信息成功!",
                    })
                    return "ok";
                }else{
                    ElNotification({
                        type:'error',
                        message:"修改用户信息失败！"+result.message,
                    })
                    return Promise.reject(new Error(result.message));
                }
            },
            async searchUserInfo(username:searchUserName){
                let result:searchResponseData= await searchUserByName(username);
                if(result.code==1){
                    this.userInfoArr.splice(0, this.userInfoArr.length);
                    // 将新的用户信息添加到数组中
                    this.userInfoArr.push(result.data);
                    ElNotification({
                        type:'success',
                        message:"查找用户成功!",
                    })
                    return "ok";
                }else{
                    ElNotification({
                        type:'error',
                        message:"查找用户失败"+result.message,
                    });
                    return Promise.reject(new Error(result.message));
                }
            },
            async banUser(username:banRoleData){
                let result:responseData=await banUserByName(username);
                if(result.code==1){
                    ElNotification({
                        type:'success',
                        message:"禁用用户成功!",
                    })
                    return "ok";
                }else{
                    ElNotification({
                        type:'error',
                        message:"禁用用户失败！",
                    })
                    return Promise.reject(new Error(result.message));
                }
            }
        },
    }
);
export default useBackUserInfoStore;