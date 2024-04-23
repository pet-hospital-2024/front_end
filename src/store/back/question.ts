import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import type { questionInfoBySliceState } from "./types/type";
import type { addQuestionData, responseQuestionData,responseData, diseaseAnddepartmentResponseData, editQuestionData, deleteQuestionData, searchQuestionResponseData } from "@/api/back/exam/questions/type";
import { reqAddQuestionInfo, reqDeleteQuestionInfo, reqDepartmentAndDisease, reqEditQuestionInfo, reqQuestionInfoBySlice, reqSearchQuestionByName } from "@/api/back/exam/questions";
let useBackQuestionStore = defineStore("QuestionManagement",{
    state:():questionInfoBySliceState =>{
        return{
            total:0,
            questionInfoArr:[],
            diseaseAndDepartmentInfoArr:[],
        }
    },
    actions:{
        async getAllQuestionInfo(page:string,size:string){
            let result:responseQuestionData=await reqQuestionInfoBySlice(page,size);
            if(result.code==1){
                this.questionInfoArr=result.data.list;
                this.total=result.data.total;
                return 'ok'
            }else{
                ElNotification({
                    type:'error',
                    message:result.message,
                });
                return Promise.reject(new Error(result.message));
            }
        },
        async getDepartmentAndDiseaseInfo(){
            let result:diseaseAnddepartmentResponseData= await reqDepartmentAndDisease();
            if(result.code==1){
                this.diseaseAndDepartmentInfoArr=result.data;
                
                return 'ok'
            }else{
                ElNotification({
                    type:'error',
                    message:result.message,
                });
                return Promise.reject(new Error(result.message));
            }
        },
        async addQuestionInfo(data:addQuestionData){
            let result:responseData=await reqAddQuestionInfo(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"添加试题成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"添加试题失败！",
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async editQuestionInfo(data:editQuestionData){
            let result:responseData=await reqEditQuestionInfo(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"编辑试题成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"编辑试题失败！",
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async deleteQuestionInfo(data:deleteQuestionData){
            let result:responseData= await reqDeleteQuestionInfo(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"删除试题成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"删除试题失败！",
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async searchQuestionInfo(question_name:string){
            let res:searchQuestionResponseData=await reqSearchQuestionByName(question_name);
            if(res.code==1){
                this.questionInfoArr=res.data.list;
                ElNotification({
                    type:'success',
                    message:"查找题目成功！",
                });
                return 'ok'
            }else{
                ElNotification({
                    type:'error',
                    message:res.message,
                });
                Promise.reject(new Error(res.message));
                return "fail"
            }
        }
    }
})
export default useBackQuestionStore;