import { defineStore } from "pinia";
//@ts-ignore
import { reqGetDirectory ,reqGetCaseByDis,reqGetCaseTextbyId} from "@api/front/case";
//@ts-ignore
import type{CategoryResponseData,CaseListResponseData,CaseDetailInfoResponseData}from "@/api/front/case/type"
import type {FrontCaseState} from "./types/type";
const useFrontCaseStore =defineStore("FrontCase",{ 
    state:():FrontCaseState=>{
        return{
            categoryArr:[],
            caseList:[],
            caseDetail: null, 
        }
    },
    actions:{
        //获取病例学习的目录
        async getDirectory(){
            let res:CategoryResponseData = await reqGetDirectory();
            if(res.code==200){
                this.categoryArr = res.data;
            }
        },
        //根据疾病获取病例
        async getCaseList(disease_id:string){
            let res:CaseListResponseData= await reqGetCaseByDis(disease_id);
            if(res.code==200){
                this.caseList = res.data;
            }
        },
        //根据id获取病例文字信息
        async getCaseText(case_id: string) {
            let res: CaseDetailInfoResponseData = await reqGetCaseTextbyId(case_id);
            if (res.code == 200) {
              this.caseDetail = res.data;
            }
          }
    }
 });

export default useFrontCaseStore;