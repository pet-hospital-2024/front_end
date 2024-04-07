import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import type { testInfoBySliceState } from "./types/type";
import type { addTestData, deleteTestData, editTestData, getPaperNameData, paperResponseData, responseAllExamData, responseData } from "@/api/back/exam/test/type";
import { getPaperInfoById, reqAddTestInfo, reqAllTestInfoBySlice, reqDeleteTestInfo, reqEditTestInfo } from "@/api/back/exam/test";
let useBackTestInfoStore=defineStore("TestManagement",{
    state:():testInfoBySliceState=>{
        return{
            total:0,
            testInfoArr:[],
            paper_name:""
        }
    },
    actions:{
        async getAllTestInfo(page:string,size:string){
            let result:responseAllExamData=await reqAllTestInfoBySlice(page,size);
            if(result.code==1){
                this.testInfoArr=result.data.list;
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
        async addTestInfo(data:addTestData){
            let result:responseData=await reqAddTestInfo(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"添加考试成功!",
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
        async deleteTestInfo(data:deleteTestData){
            let result:responseData=await reqDeleteTestInfo(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"删除考试成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"删除考试失败！",
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async editTestInfo(data:editTestData){
            let result:responseData=await reqEditTestInfo(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"修改考试信息成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"修改考试信息失败！"+result.message,
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async getPaperNameById(data:getPaperNameData){
            let result:paperResponseData=await getPaperInfoById(data);
            if(result.code==1){
                this.paper_name=result.data.paper_name;
                console.log(this.paper_name);
                return 'ok'
            }
            else{
                ElNotification({
                    type:'error',
                    message:result.message,
                });
                return Promise.reject(new Error(result.message));
                
            }
        }
    }
})
export default useBackTestInfoStore;