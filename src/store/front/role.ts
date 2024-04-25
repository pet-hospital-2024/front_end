import { defineStore } from "pinia";
import { reqGetDuty, reqGetProcess, reqGetLocation } from "@/api/front/study";

import type { FrontRoleState } from "./types/type";
import type { DutyResponseData,LocationResponseData,ProcessResponseData } from "@/api/front/study/type";
const useFrontRoleStore = defineStore("FrontRole", {
  state: (): FrontRoleState => {
    return {
      dutyListArr: [],
      locationListArr: [],
      processListArr: [],
    };
  },
  actions: {
    async getDutyList(role_id: string){
        let res:DutyResponseData=await reqGetDuty(role_id);
        if(res.code==1){
            this.dutyListArr=res.data;
        }
    },
    async getProcessList(role_id: string){
        let res:ProcessResponseData=await reqGetProcess(role_id);
        if(res.code==1){
            this.processListArr=res.data;
            // console.log(this.processListArr)
        }
    },
    async getLocationList(role_id: string){
        let res:DutyResponseData=await reqGetDuty(role_id);
        if(res.code==1){
            this.locationListArr=res.data;
            // console.log(this.locationListArr)
        }
    },
  }
});

export default useFrontRoleStore;
