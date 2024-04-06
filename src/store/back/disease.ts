import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import type { diseaseInfoBySliceState } from "./types/type";
import { addDiseaseInfoByIdAndName, deleteDiseaseInfoById, editDiseaseInfoByIdAndName, getDiseaseInfoBySlice } from "@/api/back/deisease";
import type { addDiseaseData, deleteDiseaseData, diseaseInfoResponseData, editDiseaseData, responseData } from "@/api/back/deisease/type";
let useBackDiseaseInfoStore=defineStore("DiseaseManagement",{
    state:():diseaseInfoBySliceState=>{
        return{
            total:0,
            diseaseInfoArr:[]
        }
    },
    actions:{
        async getAllDiseaseInfo(department_id:string){
            let result:diseaseInfoResponseData= await getDiseaseInfoBySlice(department_id);
            if(result.code==1){
                this.total=result.data.total;
                this.diseaseInfoArr=result.data.list;
            }else{
                ElNotification({
                    type:'error',
                    message:result.message,
                });
                return Promise.reject(new Error(result.message));
            }
        },
        async addDiseaseInfo(data:addDiseaseData){
            let result:responseData=await addDiseaseInfoByIdAndName(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"添加疾病成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"添加疾病失败！",
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async deleteDiseaseInfo(data:deleteDiseaseData){
            let result:responseData=await deleteDiseaseInfoById(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"删除疾病成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"删除疾病失败！",
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async editDiseaseInfo(data:editDiseaseData){
            let result:responseData=await editDiseaseInfoByIdAndName(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"编辑疾病成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"编辑疾病失败！",
                })
                return Promise.reject(new Error(result.message));
            }
        }
    }
})
export default useBackDiseaseInfoStore;