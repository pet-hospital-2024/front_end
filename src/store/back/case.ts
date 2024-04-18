import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import type { addCaseTextData, addMediaCaseData, caseMediaResponseData, caseTextInfoArr, deleteCaseTextData, deleteMediaData, editCaseTextData, mediaUrlResponseData, responseData, searchCaseData, searchCaseResponseData, textCaseInfoResponseData } from "@/api/back/case/type";
import type { caseInfoBySliceState } from "./types/type";
import { addCaseByMedia, addCaseByText, deleteCaseById, deleteCaseMediaById, editCaseByText, getCaseInfoBySlice, getCaseMediabyId, getMediaURL, searchCaseById } from "@/api/back/case";
import request from "@/utils/request";
let useBackCaseInfoStore=defineStore("caseManagement",{
    state:():caseInfoBySliceState=>({
            total:0,
            caseTextInfoArr:[],
            caseVideoInfoArr:[],
            casePictureInfoArr:[],
            mediaUrlArr:[]
    }),
    actions:{
        async getAllTextCaseInfo(page:string,pageSize:string){
            let result:textCaseInfoResponseData=await getCaseInfoBySlice(page,pageSize);
            if(result.code==1){
                this.caseTextInfoArr=result.data.list;
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
        async addTextCaseInfo(data:addCaseTextData){
            let result:responseData=await addCaseByText(data);
            if(result.code==1){
                if(result.code==1){
                    ElNotification({
                        type:'success',
                        message:"新建病例成功!",
                    })
                    return "ok";
                }else{
                    ElNotification({
                        type:'error',
                        message:"新建病例失败！"+result.message,
                    })
                    return Promise.reject(new Error(result.message));
                }
            }
        },
        async deleteCase(data:deleteCaseTextData){
            let result:responseData=await deleteCaseById(data);
            if(result.code==1){
                if(result.code==1){
                    ElNotification({
                        type:'success',
                        message:"删除病例成功!",
                    })
                    return "ok";
                }else{
                    ElNotification({
                        type:'error',
                        message:"删除病例失败！",
                    })
                    return Promise.reject(new Error(result.message));
                }
            }
        },
        async editTextCaseInfo(data:editCaseTextData){
            let result:responseData=await editCaseByText(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"修改病例信息成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"修改病例信息失败！"+result.message,
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async searchCaseInfo(data:string){
            let result:searchCaseResponseData=await searchCaseById(data);
            if(result.code==1){
                console.log(Object.prototype.toString.call(result.data));
                this.caseTextInfoArr = result.data.list;
                this.total = result.data.total;
                console.log(this.caseTextInfoArr);
                ElNotification({
                    type:'success',
                    message:"查询病例成功！",
                });
                
                return 'ok'
            }else{
                ElNotification({
                    type:'error',
                    message:"查询病例失败"+result.message,
                });
                return Promise.reject(new Error(result.message));
            }

        },
        //多媒体控制
        // async addMediaInfo(data:addMediaCaseData){
        //     let result= await 
        // }
        async getMediaInfo(case_id:string,category:string){
            let result:caseMediaResponseData=await getCaseMediabyId(case_id,"image",category);
            if(result.code==1){
                this.casePictureInfoArr=result.data;
            }
            console.log(this.casePictureInfoArr);
            let res:caseMediaResponseData=await getCaseMediabyId(case_id,'video',category);
            if(res.code==1){
                this.caseVideoInfoArr=res.data;
            }
            console.log(this.caseVideoInfoArr);
        },
        async addMediaInfo(data:FormData){
            let result:responseData=await addCaseByMedia(data)
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"修改病例多媒体信息成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"修改病例信息失败！"+result.message,
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async deleteMediaInfo(data:deleteMediaData){
            let result:responseData=await deleteCaseMediaById(data);
            if(result.code==1){
                ElNotification({
                    type:'success',
                    message:"删除病例多媒体信息成功!",
                })
                return "ok";
            }else{
                ElNotification({
                    type:'error',
                    message:"删除病例信息失败！"+result.message,
                })
                return Promise.reject(new Error(result.message));
            }
        },
        async getMediaUrlInfo(case_id:string,media_type:string,category:string){
            let res:mediaUrlResponseData=await getMediaURL(case_id,media_type,category)
            if(res.code==1){
                this.mediaUrlArr=res.data;
                return 'ok';
            }else{
                return Promise.reject(new Error(res.message));
            }
            
        }
    }
})
export default useBackCaseInfoStore;