<template>
    <!--顶部搜索-->
  <el-card style="height: 80px" shadow="hover">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请你输入搜索用户名" v-model="searchKeyword"></el-input>
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
      <!--添加用户和批量删除-->
    <el-button type="primary" size="default" @click="handleAddUser" :icon="Plus">
      添加用户
    </el-button>
    <el-table style="margin: 10px 0" :data="userInfoStore.userInfoArr" >
    <!--表格信息-->

      <el-table-column label="id" align="center" prop="user_id" width="220"></el-table-column>
      <el-table-column label="用户名" align="center" prop="username" width="130"></el-table-column>
      <el-table-column label="身份" align="center" prop="identity" width="130"></el-table-column>
      <!-- <el-table-column label="电话号码" align="center" prop="phone_number" width="180"></el-table-column>
      <el-table-column label="邮箱" align="center" prop="email" width="180"></el-table-column> -->
      <el-table-column label="操作" align="center">
        <template v-slot="{ row, index }">
              <el-button @click="handleShowUserDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
              <el-button size="small" @click="handleEditUser(index,row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeleteUser(index,row)" 
                :icon="Delete">删除</el-button>
              <el-button size="small" type="warning" @click="handleBanUser(index,row)" :icon="Remove">禁用</el-button>
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
/>

<!--添加用户对话框-->
<el-dialog
    v-model="dialogAddUser"
    title="添加用户"
    width="500"
    center
  >
    <el-form style="max-width: 400px" ref="ruleFormRef" :rules="rules" :model="userInfoForm">
        <el-form-item  label="用户名" prop="username">
            <el-input v-model="userInfoForm.username"></el-input>
        </el-form-item>
        <el-form-item label="身份" prop="identity">
            <el-radio-group v-model="userInfoForm.identity">
                <el-radio value="administrator" name="identity" size="large">管理员</el-radio>
                <el-radio value="teacher" name="identity" size="large">专家</el-radio>
                <el-radio value="user" name="identity" size="large">学生</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item  label="密码" prop="password">
            <el-input v-model="userInfoForm.password"/>
        </el-form-item>
        <el-form-item  label="电话" prop="phone_number">
            <el-input v-model="userInfoForm.phone_number"/>
        </el-form-item>
        <el-form-item  label="邮箱" prop="email">
            <el-input v-model="userInfoForm.email" />
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
    <el-form style="max-width: 400px" ref="ruleFormRef"  :model="editUserInfoForm">
      <el-form-item label="用户ID">
          <el-input v-model="editUserInfoForm.user_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="editUserInfoForm.username"></el-input>
        </el-form-item>

        <el-form-item label="身份">
            <el-radio-group v-model="editUserInfoForm.identity">
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
            <span>
                {{ userInfo.identity }}
            </span>
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
</template>

<script setup lang="ts">

//获取仓库对象

import { Delete, Edit,Plus,Remove,ZoomIn } from '@element-plus/icons-vue';
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


import useBackUserInfoStore from "@/store/back/role"
import { onMounted } from 'vue';

let userInfoStore=useBackUserInfoStore();
//目前首页挂载完毕发请求获取用户信息
onMounted(async () => {
  await userInfoStore.getAllUserInfo(pageNo.value, pageSize.value);
});
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
  await userInfoStore.searchUserInfo(send_data.value);
  
}

const handlePageChange = async(pager="1")=>{
  pageNo.value=pager;
  await userInfoStore.getAllUserInfo(pageNo.value,pageSize.value);
}

//重置搜索结果
const reset= async ()=>{
await userInfoStore.getAllUserInfo(pageNo.value,pageSize.value);
}



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
  { min: 11, max: 11, message: '电话号码必须是11位！', trigger: ['blur', 'change'] }
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
      console.log('error submit!', fields)
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

//编辑用户--Fail：(
const handleEditUser = (index: any, row: any) => {
  // 点击编辑后显示对话框
  dialogEditUser.value = true;
  
  // 创建一个新的对象来代替原来的 userInfo 对象
  editUserInfoForm.user_id=row.user_id;
  editUserInfoForm.username=row.username;
  editUserInfoForm.password=row.password;
  editUserInfoForm.identity=row.identity;
  editUserInfoForm.phone_number=row.phone_number;
  editUserInfoForm.email=row.email;

};

const cancleEditUser = () => {
  // 关闭编辑对话框
  dialogEditUser.value = false;

  // 重置 userInfo 对象的值为初始状态

};
const submitFormEditUser = async () => {
  // 进行用户添加操作，不进行表单验证直接提交
  let result = await userInfoStore.alterUserInfo(editUserInfoForm);
  if (result === 'ok') {
    await userInfoStore.getAllUserInfo(pageNo.value, pageSize.value);
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
import { ElMessage, ElMessageBox } from 'element-plus'
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
     let result = await userInfoStore.deleteUserByName(banData.value);  
     if(result==='ok'){
       userInfoStore.getAllUserInfo(pageNo.value,pageSize.value);
     }

  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消禁用',
    });
  }
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>