<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <div>
          <el-form class="login_form">
            <h1>Hello</h1>
            <h2>欢迎使用虚拟宠物医院学习系统</h2>
            <el-form-item>
              <el-input
                :prefix-icon="User"
                v-model="loginForm.username"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                type="password"
                :prefix-icon="Lock"
                v-model="loginForm.password"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login_btn"
                type="primary"
                size="default"
                @click="login"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { reactive } from "vue";
import { useRouter } from "vue-router";
//@ts-ignore
import useUserStore from "@/store/modules/user";

let useStore = useUserStore();

let $router = useRouter();
//收集账号密码数据
let loginForm = reactive({
  username: "",
  password: "",
});

//登录按钮
const login = async () => {
  try {
    await useStore.userLogin(loginForm);
    $router.push("/");
    ElNotification({
      type: "success",
      message: "登陆成功",
    });
  } catch (error) {
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .login_form {
    margin-left: 150px;
    position: relative;
    width: 60%;
    top: 30vh;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 30px 50px;
    border-radius: 20px;
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 24px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
