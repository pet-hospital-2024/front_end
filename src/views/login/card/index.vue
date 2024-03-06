<template>
  <div>
    <div class="card">
      <el-card shadow="always">
        <el-form
          ref="ruleFormRef"
          style="max-width: 500px"
          :model="loginForm"
          label-width="auto"
          class="demo-ruleForm"
          status-icon
        >
        
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const loginForm = reactive<any>({
  name: "",
  password: "",
});
</script>

<style scoped>
.card{
  width: 30%;
}
</style>
