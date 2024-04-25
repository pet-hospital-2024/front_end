import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import type { diseaseInfoBySliceState } from "./types/type";
import { addDiseaseInfoByIdAndName, deleteDiseaseInfoById, editDiseaseInfoByIdAndName, getDiseaseInfoBySlice, reqCheckDiseaseState } from "@/api/back/deisease";
import type { addDiseaseData, deleteDiseaseData, diseaseInfoResponseData, editDiseaseData, responseData } from "@/api/back/deisease/type";
import type { deleteDepartmentData } from "@/api/back/department/type";
import { reqCheckDepartmentState } from "@/api/back/department";
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
                return 'ok'
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
        },
        async checkDiseaseState(data:deleteDiseaseData){
            let res:responseData=await reqCheckDiseaseState(data);
            if(res.code==2){
                return "occupied"
            }else if(res.code==1){
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"删除失败",
                })
                return Promise.reject(new Error(res.message));
            
            }
        },
        async checkDepartmentState(data:deleteDepartmentData){
            let res:responseData=await reqCheckDepartmentState(data);
            if(res.code==2){
                return "occupied"
            }else if(res.code==1){
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"删除失败",
                })
                return Promise.reject(new Error(res.message));
            
            }
        }
    }
})
export default useBackDiseaseInfoStore;