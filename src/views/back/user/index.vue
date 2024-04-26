<template>
  <div>
        <!--顶部搜索-->
  <el-card style="height: 80px" shadow="hover">
    <el-form :inline="true" class="form" label-width="auto">
      <el-form-item label="用户名:" >
        <el-input placeholder="请输入搜索用户名" v-model="searchKeyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="handleSearchUser"
        >
          搜索
        </el-button>
        <el-button size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>



  
 <!--下方表单-->
 <el-card style="margin: 10px 0;">
      <!--添加用户-->
    <el-button type="primary" size="default" @click="handleAddUser" :icon="Plus">
      添加用户
    </el-button>
    <el-table style="margin: 10px 0" :data="userInfoStore.userInfoArr" :row-class-name="tableRowClassName" v-loading="loading">
    <!--表格信息-->

      <el-table-column label="用户ID" align="center" prop="user_id" min-width="20%"></el-table-column>
      <el-table-column label="用户名" align="center" prop="username" min-width="20%"></el-table-column>
      <el-table-column label="身份" align="center" min-width="15%">
        <template v-slot="{ row }">
          <span v-if="row.identity === 'administrator'">管理员</span>
          <span v-else-if="row.identity === 'teacher'">教师</span>
          <span v-else-if="row.identity === 'user'">学生</span>
          <span v-else-if="row.identity=== 'banned'">禁用</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center" min-width="45%">
        <template v-slot="{ row, index }">
              <el-button @click="handleShowUserDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
              <el-button size="small" @click="handleEditUser(index,row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeleteUser(index,row)" 
                :icon="Delete">删除</el-button>
              <el-button size="small" type="success" v-if="row.identity==='banned'" :icon="Unlock" 
              @click="handleRecoverUser(index,row)"
              >恢复</el-button >
              <el-button size="small" type="warning" @click="handleBanUser(index,row)" :icon="Lock" v-else>禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
</el-card>

<!--分页器-->
<el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :background="true"
      layout="prev, pager, next, jumper, -> , total"
      :total="userInfoStore.total"
      @current-change="handlePageChange"
      style="margin-top:20px"
/>

<!--添加用户对话框-->
<el-dialog
    v-model="dialogAddUser"
    title="添加用户"
    width="500"
    center
  >
    <el-form style="max-width: 400px" ref="ruleFormRef" :rules="rules" :model="userInfoForm" label-width="auto">
        <el-form-item  label="用户名" prop="username">
            <el-input v-model="userInfoForm.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity" >
            <el-radio-group v-model="userInfoForm.identity">
                <el-radio value="administrator" name="identity" size="large">管理员</el-radio>
                <el-radio value="teacher" name="identity" size="large">专家</el-radio>
                <el-radio value="user" name="identity" size="large">学生</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item  label="密码" prop="password" >
            <el-input v-model="userInfoForm.password" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item  label="电话" prop="phone_number" >
            <el-input v-model="userInfoForm.phone_number" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item  label="邮箱" prop="email" >
            <el-input v-model="userInfoForm.email" placeholder="请输入邮箱"/>
        </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancleSubmitForm">取消</el-button>
        <el-button type="primary" @click="submitFormAddUser(ruleFormRef)">
          确认
        </el-button>
      </div>
    </template>
</el-dialog>
<!--编辑用户对话框-->
<el-dialog
    v-model="dialogEditUser"
    title="编辑用户"
    width="500"
    center
    
  >
    <el-form style="max-width: 400px" ref="ruleFormRef"  :model="editUserInfoForm" label-width="auto">
      <el-form-item label="用户ID">
          <el-input v-model="editUserInfoForm.user_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="editUserInfoForm.username"></el-input>
        </el-form-item>

        <el-form-item label="身份">
            <el-radio-group v-model="editUserInfoForm.identity" disabled>
                <el-radio value="administrator" size="large">管理员</el-radio>
                <el-radio value="teacher" size="large">专家</el-radio>
                <el-radio value="user" size="large">学生</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item  label="密码">
            <el-input v-model="editUserInfoForm.password"></el-input>
        </el-form-item>
        <el-form-item  label="手机">
            <el-input v-model="editUserInfoForm.phone_number"></el-input>
        </el-form-item>
        <el-form-item  label="邮箱">
            <el-input v-model="editUserInfoForm.email"></el-input>
        </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancleEditUser">取消</el-button>
        <el-button type="primary" @click="submitFormEditUser">
          确认
        </el-button>
      </div>
    </template>
</el-dialog>

<!--查看用户详情对话框-->
<el-drawer
    v-model="dialogShowUserDetail"
    title="用户详情"
    width="500"
    center
    :userInfo="userInfo"
  >
    <el-form style="max-width: 400px" v-if="userInfo">
        <el-form-item  label="用户ID:">
            <span>{{ userInfo.user_id }}</span>
        </el-form-item>
        <el-form-item  label="用户名:">
            <span>{{ userInfo.username }}</span>
        </el-form-item>
        <el-form-item label="身份:">
          <span v-if="userInfo.identity === 'administrator'">管理员</span>
          <span v-else-if="userInfo.identity === 'teacher'">教师</span>
          <span v-else-if="userInfo.identity === 'user'">学生</span>
          <span v-else-if="userInfo.identity=== 'banned'">禁用</span>
        </el-form-item>
        <el-form-item  label="密码:">
            <span>
                {{userInfo.password  }}
            </span>
        </el-form-item>
        <el-form-item  label="电话号码:">
            <span>{{ userInfo.phone_number }}</span>
        </el-form-item>
        <el-form-item  label="邮箱:">
            <span>{{ userInfo.email }}</span>
        </el-form-item>
        <el-form-item  label="最近登录时间:">
            <span>{{ userInfo.timestamp }}</span>
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogShowUserDetail = false">
          确认
        </el-button>
      </div>
    </template>
</el-drawer>
  </div>
</template>

<script setup lang="ts">

//获取仓库对象

import { Delete, Edit,Plus,Lock,Unlock,ZoomIn} from '@element-plus/icons-vue';
import { ref,reactive,watch } from 'vue'
//点击addUser之前ref(false)，不展示对话框
const dialogAddUser=ref(false);

//点击Edit之前是false，不显示对话框
const dialogEditUser=ref(false);

//点击查看详情之前是falase,不显示对话框
const dialogShowUserDetail=ref(false);

//分页器ref
let pageNo = ref<string>('1')

let pageSize = ref<string>('10')
//加载页面ref
let loading=ref<boolean>(false);

import useBackUserInfoStore from "@/store/back/role"
import { onMounted } from 'vue';

let userInfoStore=useBackUserInfoStore();
//目前首页挂载完毕发请求获取用户信息
onMounted(async () => {
  loading.value=true;
  let res=await userInfoStore.getAllUserInfo(pageNo.value, pageSize.value);
  if(res=='ok'){
    loading.value=false;
  }
});

const tableRowClassName = ({
  row,
}: {
  row: roleInfoItem

}) => {
  if ( row.identity == 'banned') {
    return 'warning-row'
  } 
  return ''
}


//读取搜索框内数据
interface dataType {
  username: string;
}

let searchKeyword = ref<string>("");
let send_data = ref<dataType>({
  username: ""
});

// 监听 searchKeyword 的变化，并更新 send_data
watch(searchKeyword, (newValue) => {
  send_data.value.username = newValue;
  
});



const handleSearchUser = async () => {
    if (searchKeyword.value === "") {
        ElNotification({
            type: "warning",
            message: "请输入用户名!"
        });
        return;
    }

    loading.value = true;
    try {
        let res = await userInfoStore.searchUserInfo(send_data.value);
        console.log(res);
        if (res === 'ok') {
            loading.value = false; // 成功时隐藏 loading
        } else {
            // 失败时也应该隐藏 loading
            loading.value = false;
            console.log("搜索用户失败");
        }
    } catch (error) {
        loading.value = false; // 发生错误时隐藏 loading
        console.error("搜索用户出错:", error);
    }
}

const handlePageChange = async(pager="1")=>{
  pageNo.value=pager;
  loading.value=true;
  let res=await userInfoStore.getAllUserInfo(pageNo.value,pageSize.value);
  if(res=='ok'){
    loading.value=false;
  }
}

//重置搜索结果
const reset= async ()=>{
  loading.value=true;
let result=await userInfoStore.getAllUserInfo(pageNo.value,pageSize.value);
if(result=='ok') {
  loading.value=false;
  ElNotification({
      type:'success',
      message:"重置成功！"
    });
  }
  searchKeyword.value="";
}

import { ElMessage, ElMessageBox, ElNotification } from 'element-plus'

import type { FormInstance, FormRules ,} from 'element-plus'

const ruleFormRef = ref<FormInstance>()
// import {addRoleData} from "@/api/back/role/type"
interface RuleForm {
  username: string
  password: string
  identity: string
  phone_number: string
  email: string
}
let userInfoForm = reactive<RuleForm>({
  username: "",
  password:"",
  identity:"",
  phone_number:"",
  email:"",
});
const rules = reactive<FormRules<RuleForm>>({
  username:[
   { required:true, message:"请输入用户名！",trigger:'blur'},
   {min: 4,max: 10, message: "用户名长度在4-10位之间！",trigger: "change",},
  ],
  password:[
    {required:true, message:"请输入密码！",trigger:'blur'},
    {min:6,max:15,message:"密码至少6位！",trigger:'change'},
    
  ],
  identity:[
    {required:true,message:"请选择用户身份！",trigger:['blur', 'change']},
  ],
  phone_number: [
  { required: true, message: '请输入电话号码！', trigger: 'blur' },
  { min: 11, max: 11, message: '电话号码必须是11位！', trigger: ['blur', 'change'] },
  
  ],
  email:[
  {
          required: true,
          message: '请输入用户邮箱！',
          trigger: 'blur',
        },
        {
          type: 'email',
          message: '请输入正确的邮箱！',
          trigger: ['blur', 'change'],
        },
  ]
})

//添加用户--check
const submitFormAddUser = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
        // 进行用户添加操作
        let result = await userInfoStore.addNewUser(userInfoForm);
        if(result==='ok'){
          dialogAddUser.value = false;
          await userInfoStore.getAllUserInfo(pageNo.value,pageSize.value);

          }
  }else{
      
  }
})}


const handleAddUser = ()=>{
    //点击后显示对话框
          userInfoForm.email="";
          userInfoForm.identity="";
          userInfoForm.password="";
          userInfoForm.phone_number="";
          userInfoForm.username="";
    dialogAddUser.value=!dialogAddUser.value; 

}
const cancleSubmitForm=()=>{

    dialogAddUser.value=!dialogAddUser.value;

}
interface EditRuleForm{
  user_id:string;
  username: string
  password: string
  identity: string
  phone_number: string
  email: string
}
let editUserInfoForm = reactive<EditRuleForm>({
  user_id:"",
  username: "",
  password:"",
  identity:"",
  phone_number:"",
  email:"",
});

//编辑用户
const handleEditUser = (index: any, row: any) => {
  editUserInfoForm.user_id=row.user_id;
  editUserInfoForm.username=row.username;
  editUserInfoForm.password=row.password;
  editUserInfoForm.identity=row.identity;
  editUserInfoForm.phone_number=row.phone_number;
  editUserInfoForm.email=row.email;
  // 点击编辑后显示对话框
  dialogEditUser.value = true;
  
  // 创建一个新的对象来代替原来的 userInfo 对象


};

const cancleEditUser = () => {
  // 关闭编辑对话框
  dialogEditUser.value = false;

};
const submitFormEditUser = async () => {
  // 进行用户添加操作，不进行表单验证直接提交
  let result = await userInfoStore.alterUserInfo(editUserInfoForm);
  if (result === 'ok') {
    userInfoStore.getAllUserInfo(pageNo.value, pageSize.value);
    dialogEditUser.value = false;
  }
}



const userInfo=ref<roleInfoItem>();
const handleShowUserDetail = (index:any,row:any)=>{
    //点击查看详情后显示对话框
    dialogShowUserDetail.value=true;
    userInfo.value=row;
    
    
}
//点击“删除”

import type { roleInfoItem } from '@/api/back/role/type';
interface deleteUser{
  username:string;
}
//删除用户--check
const handleDeleteUser = async (index: any, row: any) => {
  try {
    await ElMessageBox.confirm(
      '您确定删除该用户吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    // 用户确认删除后，调用删除用户方法，并传递用户名作为参数
    let deleteData=ref<deleteUser>({username:""});
    deleteData.value.username=row.username;
     let result = await userInfoStore.deleteUserByName(deleteData.value);  
     if(result==='ok'){
       userInfoStore.getAllUserInfo(pageNo.value,pageSize.value);
     }

  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  }
}

interface banUser{
  username:string;
}
const handleBanUser = async (index:any,row:any)=>{
  try {
    await ElMessageBox.confirm(
      '您确定禁用该用户吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    // 用户确认删除后，调用删除用户方法，并传递用户名作为参数
    let banData=ref<banUser>({username:""});
    banData.value.username=row.username;
     let result = await userInfoStore.banUser(banData.value);  
     if(result==='ok'){
       userInfoStore.getAllUserInfo(pageNo.value,pageSize.value);
     }

  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消',
    });
  }
}
//恢复用户
const handleRecoverUser = (index:any,row:any)=>{
  ElMessageBox.confirm(
      '该用户已被禁用，请联系客服恢复使用',
      '提示',
      {
        confirmButtonText: '确认',
        type: 'info',
      }
    );
}
</script>

<style scoped>
.el-loading-mask {
  z-index: 900 !important
}
.el-table >>> .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.fade-enter-from{
    opacity: 0;
}
.fade-enter-active{
    transition: all 1s;
}
.fade-enter-to{
    opacity: 1;
}

</style>