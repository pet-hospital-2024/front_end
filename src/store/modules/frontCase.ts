import { defineStore } from "pinia";
import { reqGetDirectory } from "@/api/front/case";

import type{
    CategoryResponseData
}from "@/api/front/case/type"
import type {FrontCaseState} from "./types/type";
const useFrontCaseStore =defineStore("FrontCase",{ 
    state:():FrontCaseState=>{
        return{
            categoryArr:[],
        }
    },
    actions:{
        //获取病例学习的目录
        async getDirectory(){
            let res:CategoryResponseData = await reqGetDirectory();
            if(res.code==200){
                this.categoryArr = res.data;
            }
        }
    }
 });

export default useFrontCaseStore;