import { defineStore } from "pinia";
import { addDepartmentInfoByName, deleteDepartmentById, editDepartmentByIdAndName, getDepartmentInfoBySlice, reqCheckDepartmentState } from "@/api/back/department";
import type { departmentInfoBySliceState } from "./types/type";
import type { addDepartmentData, deleteDepartmentData, editDepartmentData } from "@/api/back/department/type";
import type { responseData } from "@/api/back/role/type";
import { ElNotification } from "element-plus";
let useBackDepartmentInfoStore = defineStore("DepartmentManagement", {
  state: ():departmentInfoBySliceState => ({
    total: 0,
    departmentInfoArr: [],
  }),
  actions: {
    async getAllDepartmentInfo(page: string, size: string) {
      try {
        const result = await getDepartmentInfoBySlice(page, size);
        if (result.code === 1) {
          this.departmentInfoArr = result.data.list;
          this.total = result.data.total;
          return "ok";
        } else {
          // 处理错误
          return Promise.reject(new Error(result.message));
        }
      } catch (error) {
        // 处理异常
        return Promise.reject(error);
      }
    },
    async addDepartment(department_name:addDepartmentData){
      let result:responseData=await addDepartmentInfoByName(department_name);
      if(result.code==1){
        ElNotification({
          type:'success',
          message:"添加科室成功!",
      })
      return "ok";
      }
      else{
        ElNotification({
          type:'error',
          message:"添加科室失败！"+result.message,
      })
      return Promise.reject(new Error(result.message));
      }
    },
    async deleteDepartment(department_id:deleteDepartmentData){
      let result:responseData=await deleteDepartmentById(department_id);
      if(result.code==1){
        ElNotification({
          type:'success',
          message:"删除科室成功!",
      })
      return "ok";
      }
      else{
        ElNotification({
          type:'error',
          message:"删除科室失败！",
      })
      return Promise.reject(new Error(result.message));
      }
    },
    async editDepartment(data:editDepartmentData){
      let result:responseData=await editDepartmentByIdAndName(data);
      if(result.code==1){
        ElNotification({
          type:'success',
          message:"编辑科室成功!",
      })
      return "ok";
      }
      else{
        ElNotification({
          type:'error',
          message:"编辑科室失败！",
      })
      return Promise.reject(new Error(result.message));
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
  },
});

export default useBackDepartmentInfoStore;
