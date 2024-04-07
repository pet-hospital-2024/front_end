import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import type { paperInfoBySliceState } from "./types/type";
import type { paperInfoResponseData } from "@/api/back/exam/paper/type";
import { getAllPaperInfoBySlice } from "@/api/back/exam/paper";
let useBackPaperInfoStore=defineStore("PaperManagement",{
    state:():paperInfoBySliceState=>{
        return{
            total:0,
            paperInfoArr:[]
        }
    },
    actions:{
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
        }
    }
})
export default useBackPaperInfoStore;