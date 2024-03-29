<template>
  <div class="modify_container">
    <el-dialog
      v-model="usemodifyStore"
      title="修改密码"
      ref="dialog"
      width="500"
    >
      <div class="password">
        <el-form :model="pwParam">
            <el-form-item label="旧密码" prop="oldPassword">
                <el-input type="password" v-model="pwParam.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input type="password" v-model="pwParam.newPassword"></el-input>
            </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="hideModify">取消</el-button>
          <el-button type="primary" @click="modifyPwd">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive,ref } from "vue";
import usemodifyStore from '@/store/front/modifyPw';
import useUserStore from "@/store/modules/user";
let modifyStore=usemodifyStore();
let userStore=useUserStore();

let pwParam = reactive({
  oldPassword: "",
  newPassword: "",
});

const hideModify = () => {
  modifyStore.hide();
};

const modifyPwd = () => {
  userStore.modify(pwParam);
  modifyStore.hide();
};

</script>

<style scoped lang="scss">
.password{
  padding: 20px;
  // border: 1px solid #ccc;
}
</style>
@/store/front/modifyPw