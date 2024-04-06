import { defineStore } from "pinia";
import { ElNotification } from "element-plus";
import type { questionInfoBySliceState } from "./types/type";
import type { responseQuestionData } from "@/api/back/exam/questions/type";
import { reqQuestionInfoBySlice } from "@/api/back/exam/questions";
let useBackQuestionStore = defineStore("QuestionManagement",{
    state:():questionInfoBySliceState =>{
        return{
            total:0,
            questionInfoArr:[]
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
        }
    }
})
export default useBackQuestionStore;