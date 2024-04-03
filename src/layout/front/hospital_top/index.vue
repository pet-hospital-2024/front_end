<template>
  <div class="top">
    <div class="content">
      <div class="left" @click="goHome">
        <p>虚拟宠物医院学习系统</p>
      </div>
      <div class="right">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{userStore.userData?.username}}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="modifyPw">修改密码</el-dropdown-item>
              <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ArrowDown } from "@element-plus/icons-vue";
import logout from "@/utils/logout";
//获取用户相关小仓库
import useUserStore from '@/store/modules/user';
//@ts-ignore
import usemodifyStore from '@/store/front/modifyPw';
let userStore=useUserStore();
let modifyStore=usemodifyStore();

let $router = useRouter();

//修改密码
const modifyPw=()=>{
  modifyStore.show();
}

//返回前台首页
const goHome=()=>{
  $router.push({ path: "/front" });
}

//退出登录
const userLogout=()=>{
  logout();
}
</script>

<script lang="ts">
  export default {
    name:'Top',
  }
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 8vh;
  background-color: rgb(255, 255, 255);
  display: flex;
  justify-content: center;

  .content {
    width: 80vw;
    height:8vh;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: space-between;
    margin-left: 50px;
    margin-right: 50px;

    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 20px;
        color: #55a8fe;
      }
      cursor: pointer;
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: rgb(124, 124, 124);

      ::v-deep(.el-dropdown-link) {
        outline: 0;
      }
      .el-dropdown-link {
        cursor: pointer;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
@/store/front/modifyPw