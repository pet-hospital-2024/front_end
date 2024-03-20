<template>
    <!--顶部搜索-->
  <el-card style="height: 80px">
    <el-form :inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请你输入搜索用户名" v-model="keyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
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
    <el-button type="danger" size="default"
    @click="handleDeleteSelectUser" :icon="Delete"
    >
      批量删除
    </el-button>
    <el-table style="margin: 10px 0" :data="userArr" @selection-change="selectChange">
    <!--表格信息-->
      <el-table-column type="selection" align="center" ></el-table-column>
      <el-table-column label="id" align="center" prop="id" width="50"></el-table-column>
      <el-table-column label="用户名" align="center" prop="username" width="100"></el-table-column>
      <el-table-column label="身份" align="center" prop="identity" width="80"></el-table-column>
      <el-table-column label="电话号码" align="center" prop="phone" width="180"></el-table-column>
      <el-table-column label="邮箱" align="center" prop="email" width="180"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="{ row, index }">
              <el-button @click="handleShowUserDetail(index, row)" size="small" :icon="ZoomIn">详情</el-button>
              <el-button size="small" @click="handleEditUser(index,row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeleteUser(index,row)" 
                :icon="Delete">删除</el-button>
            </template>
      </el-table-column>
    </el-table>
</el-card>

<!--分页器-->
<el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper, -> , total"
      :total="total"
      @current-change="getHasUser"
      @size-change="handler"
/>

<!--添加用户对话框-->
<el-dialog
    v-model="dialogAddUser"
    title="添加用户"
    width="500"
    center
  >
    <el-form style="max-width: 400px">
        <el-form-item  label="用户名">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份">
            <el-radio-group v-model="radio1">
                <el-radio value="1" size="large">管理员</el-radio>
                <el-radio value="2" size="large">专家</el-radio>
                <el-radio value="3" size="large">学生</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item  label="密码">
            <el-input/>
        </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogAddUser = false">取消</el-button>
        <el-button type="primary" @click="dialogAddUser = false">
          确认
        </el-button>
      </div>
    </template>
</el-dialog>
<!--编辑用户对话框-->
<el-dialog
    v-model="dialogEditUser"
    title="添加用户"
    width="500"
    center
  >
    <el-form style="max-width: 400px">
        <el-form-item  label="用户名">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="身份">
            <el-radio-group v-model="radio1">
                <el-radio value="1" size="large">管理员</el-radio>
                <el-radio value="2" size="large">专家</el-radio>
                <el-radio value="3" size="large">学生</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item  label="密码">
            <el-input/>
        </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogEditUser = false">取消</el-button>
        <el-button type="primary" @click="dialogEditUser = false">
          确认
        </el-button>
      </div>
    </template>
</el-dialog>
<!--查看用户详情对话框-->
<el-dialog
    v-model="dialogShowUserDetail"
    title="用户详情"
    width="500"
    center
    :userInfo="userInfo"
  >
    <el-form style="max-width: 400px">
        <el-form-item  label="用户ID:">
            <span>{{ userInfo.id }}</span>
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
            <span>{{ userInfo.phone }}</span>
        </el-form-item>
        <el-form-item  label="邮箱:">
            <span>{{ userInfo.email }}</span>
        </el-form-item>
        <el-form-item  label="最近登录时间:">
            <span>{{ userInfo.timeStap }}</span>
        </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogShowUserDetail = false">
          确认
        </el-button>
      </div>
    </template>
</el-dialog>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
//获取仓库对象
import useUserStore from '@/store/modules/user';
import { Delete, Edit,Plus,ZoomIn } from '@element-plus/icons-vue';
import { ref } from 'vue'
//点击addUser之前ref(false)，不展示对话框
const dialogAddUser=ref(false);

//点击Edit之前是false，不显示对话框
const dialogEditUser=ref(false);

//点击查看详情之前是falase,不显示对话框
const dialogShowUserDetail=ref(false);

//分页器ref
let pageNo = ref<number>(1)

let pageSize = ref<number>(5)

let total = ref<number>(0)
let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息
onMounted(()=>{
    userStore.userInfo();
})
const userArr=[
    {
        id:'1',
        username:'syf',
        identity:'admin',
        phone:'1234567890',
        email:'1234567@qq.com',
        password:'123456',
        timeStap:'2024.03.15',
    },
    {
        id:'2',
        username:'wzz',
        identity:'expert',
        phone:'0987654321',
        email:'7654321@qq.com',
        password:'123456',
        timeStap:'2024.03.15',
    },
]
const handleAddUser = ()=>{
    //点击后显示对话框
    dialogAddUser.value=true;
}
const handleEditUser = ()=>{
    //点击编辑后显示对话框
    dialogEditUser.value=true;
}
const userInfo=ref();
const handleShowUserDetail = (index:any,row:any)=>{
    //点击查看详情后显示对话框
    dialogShowUserDetail.value=true;
    userInfo.value=row;
}
//点击“删除”
import { ElMessage, ElMessageBox } from 'element-plus'
const handleDeleteUser = ()=>{
  ElMessageBox.confirm(
    '您确定删除该用户吗？',
    '提示',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '成功删除',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除失败',
      })
    })
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>