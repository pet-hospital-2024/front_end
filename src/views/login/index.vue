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
              <el-form
                label-width="auto"
                class="login_form"
                :model="loginForm"
                :rules="loginRules"
                ref="loginForms"
                @keyup.enter="login" 
              >
                <el-form-item prop="username">
                  <el-input
                    :prefix-icon="User"
                    v-model="loginForm.username"
                    placeholder="User"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
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
              <el-form
                label-width="auto"
                class="login_form"
                :model="registerForm"
                :rules="registerRules"
                ref="registerForms"
              >
                <el-form-item prop="username">
                  <el-input
                    :prefix-icon="User"
                    v-model="registerForm.username"
                    placeholder="User"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    :prefix-icon="Lock"
                    v-model="registerForm.password"
                    show-password
                    placeholder="Password"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="phone_number">
                  <el-input
                    :prefix-icon="Cellphone"
                    v-model="registerForm.phone_number"
                    placeholder="Number"
                    size="large"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input
                    :prefix-icon="Message"
                    v-model="registerForm.email"
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
import { User, Lock, Cellphone, Message } from "@element-plus/icons-vue";
import { ElNotification } from "element-plus";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
//@ts-ignore
import useUserStore from "@/store/modules/user";

const tabPosition = ref("top");

let useStore = useUserStore();

let $router = useRouter();
//收集账号密码数据
/*let loginForm = reactive({
  username: "admin",
  password: "123456",
});*/
let loginForm = reactive({
  username: "",
  password: "",
});

//获取登录el-form组件
let loginForms = ref();

//登录校验对象
const loginRules = {
  username: [
    // { required: true, message: "用户名不能为空", trigger: "blur" },
    {
      required: true,
      min: 4,
      max: 10,
      message: "用户名长度在4-10位之间",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 15,
      message: "密码长度至少6位",
      trigger: "change",
    },
  ],
};

//登录按钮
const login = async () => {
  await loginForms.value.validate();
  try {
    const loginResult = await useStore.userLogin(loginForm);
    if (loginResult === "ok") {
      // 登录成功，调用获取用户信息
      // const userInfoResult = await useStore.userInfo();
      // if (userInfoResult === "ok") {
        // 根据身份重定向
        $router.replace(useStore.userData?.identity === "user" ? "/front" : "/back");
        ElNotification({
          type: "success",
          message: "登陆成功",
        });
    // }
    }
    // $router.push("/back");
    //$router.push("/front");
  } catch (error) {
    ElNotification({
      type: "error",
      message: (error as Error).message,
    });
  }
};

//收集注册的信息
let registerForm = reactive({
  username: "",
  password: "",
  identity:"user",
  phone_number: "",
  email: "",
});

//获取注册el-form组件
let registerForms = ref();

//自定义校验规则函数
const validatorUserName = (rule: any, value: any, callback: any) => {
  const reg = /^[a-zA-Z0-9]{4,10}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("用户名必须为4到10位的英文或数字"));
  }
};
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length < 6 || value.length > 15) {
    callback(new Error("密码长度必须在6到15位之间"));
    return;
  }
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /\d/.test(value);

  if (hasLetter && hasNumber) {
    callback();
  } else {
    callback(new Error("密码必须同时包含字母和数字"));
  }
};
const validatorEmail = (rule: any, value: any, callback: any) => {
  const reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入有效的电子邮件地址"));
  }
};
const validatorPhone = (rule: any, value: any, callback: any) => {
  const reg = /^1[3-9]\d{9}$/;

  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入有效的手机号"));
  }
};
//注册校验
const registerRules = {
  username: [{ trigger: "change", validator: validatorUserName }],
  password: [{ trigger: "change", validator: validatorPassword }],
  email: [{ trigger: "change", validator: validatorEmail }],
  phone_number: [{ trigger: "change", validator: validatorPhone }],
};

//注册按钮
const register = async () => {
  await registerForms.value.validate();
  try {
    await useStore.register(registerForm);
    $router.push("/");
    ElNotification({
      type: "success",
      message: "注册成功",
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

    .login_form {
      margin-left: 0px;
    }
    .login_btn {
      width: 100%;
      margin-top: 20px;
    }

    .demo-tabs {
      margin-left: 20px;
      color: rgb(152, 181, 172);
    }
  }

  .title {
    position: relative;
    margin-left: 200px;
    top: 25vh;
    max-width: 100%;
    h1 {
      font-size: 96px;
      color: rgb(87, 87, 87);
      font-weight: bold;
    }
    h2 {
      margin-top: 10px;
      font-size: 36px;
      color: rgb(139, 139, 139);
    }
  }
}
</style>
