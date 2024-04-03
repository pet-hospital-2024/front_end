<template>
  <el-card>
    <el-button type="primary" size="default" icon="Plus" @click="handleAddCase">
            添加病例
        </el-button>
    <el-table style="margin:10px 0" stripe>
      <el-table-column type="index" label="序号" width="80" align="center"/>
      <el-table-column  label="科室" width="80" align="center"/>
      <el-table-column  label="疾病种类" width="80" align="center"/>
      <el-table-column align="center" prop="操作">
        <template>
          <el-button size="small" :icon="ZoomIn">详情</el-button>
          <el-button size="small" @click="handleEditQuestion(index,row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeleteQuestion(index,row)" 
                :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <el-dialog v-model="addCaseDialogVisible" title="新建病例" width="700"  center>
    <el-form >
      <el-form-item label="case_name">
        <el-input class="inputBox"/>
      </el-form-item>
      <el-form-item label="选择科室">
        <el-select v-model="value" placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="选择疾病">
        <el-select v-model="value" placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="case_examination">
        <el-input class="inputBox" type="textarea" :rows="2"/>
      </el-form-item>
      <el-form-item label="case_result">
        <el-input class="inputBox" type="textarea" :rows="2"/>
      </el-form-item>
      <el-form-item label="case_treatment">
        <el-input class="inputBox" type="textarea" :rows="2"/>
      </el-form-item>
      <el-form-item label="case_medicine">
        <el-input class="inputBox" type="textarea" :rows="2"/>
      </el-form-item>
      <el-form-item label="case_cost">
        <el-input class="inputBox"/>
      </el-form-item>
      <el-form-item label="case_introduction">
        <el-input class="inputBox" type="textarea" :rows="2"/>
      </el-form-item>
      <el-form-item label="上传图片">
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          :show-file-list="true"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          list-type="picture">
        <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
        </template>
        <el-button type="primary">点击上传</el-button>
       </el-upload>
      </el-form-item>

    </el-form>

    <template #footer>
  <div class="dialog-footer">
    <el-button type="primary">提交</el-button>
    <el-button>重置</el-button>
  </div>
</template>
  </el-dialog>
</template>
<script setup lang="ts">



import type { UploadProps, UploadUserFile } from 'element-plus'

//获取仓库对象
import useUserStore from '@/store/modules/user';
import {Delete, Edit, ZoomIn} from '@element-plus/icons-vue'
let userStore=useUserStore();
//目前首页挂载完毕发请求获取用户信息


import { ref } from 'vue';
const addCaseDialogVisible=ref<boolean>(false);
const handleAddCase=()=>{
  addCaseDialogVisible.value=true;
}
</script>
<style scoped>
.inputBox{

  width:240px;
  margin-right:40px;

}
</style>