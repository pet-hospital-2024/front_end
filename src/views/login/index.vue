<template>
  <div class="login_container">
    <el-row>
      <el-col :span="14" :xs="0">
        <div class="title">
          <h1>Welcome!</h1>
          <h2>Virtual Pet Hospital Learning System.</h2>
        </div>
      </el-col>
      <el-col :span="10" :xs="24">
        <div class="form_box">
          <h1>Hello :）</h1>
          <!-- <h2>欢迎使用虚拟宠物医院学习系统</h2> -->
          <el-tabs :tab-position="tabPosition" class="demo-tabs">
            <el-tab-pane label="Sign in">
              <el-form label-width="auto" class="login_form">
                <el-form-item >
                  <el-input
                    :prefix-icon="User"
                    v-model="loginForm.username"
                    placeholder="User"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                    type="password"
                    :prefix-icon="Lock"
                    v-model="loginForm.password"
                    show-password
                    placeholder="Password"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    class="login_btn"
                    type="primary"
                    size="large"
                    color="rgb(152, 181, 172)"
                    @click="login"
                    >Sign in</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="Sign up">
              <el-form label-width="auto" class="login_form">
                <el-form-item>
                  <el-input
                    :prefix-icon="User"
                    v-model="registerForm.username"
                    placeholder="User"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item >
                  <el-input
                    type="password"
                    :prefix-icon="Lock"
                    v-model="registerForm.password"
                    show-password
                    placeholder="Password"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                    :prefix-icon="Cellphone"
                    v-model="registerForm.username"
                    placeholder="Number"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input
                    :prefix-icon="Message"
                    v-model="registerForm.username"
                    placeholder="Email"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    class="login_btn"
                    type="primary"
                    size="large"
                    color=" rgb(152, 181, 172)"
                    @click="register"
                    >Sign up</el-button
                  >
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock,Cellphone ,Message} from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
//@ts-ignore
import useUserStore from "@/store/modules/user";

const tabPosition = ref("top");

let useStore = useUserStore();

let $router = useRouter();
//收集账号密码数据
let loginForm = reactive({
  username: "",
  password: "",
});

//收集注册的信息
let registerForm = reactive({
  username: "",
  password: "",
  email: "",
  phone_number: "",
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

//注册按钮
const register=()=>{

}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.jpg") no-repeat;
  background-size: cover;

  .form_box {
    margin-left: 50px;
    position: relative;
    width: 60%;
    top: 25vh;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 30px 30px 30px 10px;
    border-radius: 20px;
    h1 {
      font-size: 40px;
      margin-left: 18px;
      margin-bottom: 20px;
      color: rgb(116, 116, 116);
    }
    h2 {
      font-size: 24px;
      margin: 20px 20px;
    }

    .login_form{
      margin-left: 0px;
    }
    .login_btn {
      width: 100%;
      margin-top: 20px;
    }

    .demo-tabs{
      margin-left: 20px;
      color: rgb(152, 181, 172);
    }
  }

  .title{
    position: relative;
    margin-left: 200px;
    top:25vh;
    max-width:100%;
    h1{
      font-size: 96px;
      color: rgb(87, 87, 87);
      font-weight: bold;
    }
    h2{
      margin-top: 10px;
      font-size: 36px;
      color: rgb(139, 139, 139);
    }
  }
}
</style>
