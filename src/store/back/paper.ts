import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import type { paperInfoBySliceState } from "./types/type";
import type { addPaperData, addQuestionForPaperData, deletePaperData, deleteQuestionFromPaperData, editPaperBasicData,  getQuestionByIdResponseData, paperInfoResponseData, responseData } from "@/api/back/exam/paper/type";
import { getAllPaperInfoBySlice, reqAddPaperInfo, reqAddQuestionForPaper, reqDeletePaperInfo, reqDeleteQuestionFromPaper, reqEditBasicInfo, reqQuestionInfoById } from "@/api/back/exam/paper";
let useBackPaperInfoStore=defineStore("PaperManagement",{
    state:():paperInfoBySliceState=>{
        return{
            total:0,
            paperInfoArr:[],
            questionInfoArr:[]
        }
    },
    actions:{
        //获取试卷基础信息
        async getAllPaperInfo(page:string,size:string){
            let result:paperInfoResponseData=await getAllPaperInfoBySlice(page,size);
            if(result.code==1){
                this.total=result.data.total;
                this.paperInfoArr=result.data.list;
                return 'ok'
            }else{
                ElNotification({
                    type:'error',
                    message:result.message,
                });
                return Promise.reject(new Error(result.message));
            }
        },
        async deletePaperInfo(data:deletePaperData){
            let result:responseData=await reqDeletePaperInfo(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"删除试卷成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"删除试卷失败！"+result.message,
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async deleteQuestionFromPaper(data:deleteQuestionFromPaperData){
            let result:responseData=await reqDeleteQuestionFromPaper(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"从试卷中删除试题成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"从试卷中删除试题失败!"+result.message,
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async addPaper(data:addPaperData){
            let result:responseData=await reqAddPaperInfo(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"新建试卷成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"新建试卷失败！",
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async addQuestionForPaper(data:addQuestionForPaperData){
            let result:responseData=await reqAddQuestionForPaper(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"向试卷添加试题成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"向试卷添加试题失败！"+result.message,
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async editPaperBasicInfo(data:editPaperBasicData){
            let result:responseData=await reqEditBasicInfo(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"修改试卷信息成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"修改试卷信息失败!"+result.message,
                })
                return Promise.reject(new Error(result.message));
            }     
        },
        //获取试卷包含试题信息
        async getQuestionsById(data:string){
            let result:getQuestionByIdResponseData=await reqQuestionInfoById(data);
            if(result.code==1){
                this.questionInfoArr=result.data.questions;
                return 'ok'
            }else{
                ElNotification({
                    type:'error',
                    message:"获取试卷题目失败！"+result.message,
                })
                return Promise.reject(new Error(result.message));
            }
        }
    }
})
export default useBackPaperInfoStore;