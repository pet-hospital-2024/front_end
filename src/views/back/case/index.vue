<template>
    <el-card style="height: 80px;margin-bottom: 10px;" shadow="hover">
    <el-form :inline="true" class="form">
      <el-form-item label="病例:">
        <el-input placeholder="请你输入搜索病例" v-model="searchKeyword"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          size="default"
          @click="handleSearchCase"
        >
          搜索
        </el-button>
        <el-button size="default" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card>
    <div class="header">
      <el-button type="primary" size="default" icon="Plus" @click="handleAddCase">
            添加病例
      </el-button>
    </div>
    <el-table style="margin:10px 0" stripe :data="caseInfoStore.caseTextInfoArr">
      <!-- <el-table-column type="index" label="序号" width="80" align="center"/> -->
      <el-table-column  label="病例ID" width="200" align="center" prop="case_id"/>
      <el-table-column  label="病例名称" width="200" align="center" prop="case_name"/>
      <el-table-column  label="疾病" width="200" align="center" prop="disease_name"/>
      <el-table-column  label="科室" width="200" align="center" prop="department_name"/>
      <el-table-column align="center" label="操作">
        <template v-slot={row}>
          <el-button size="small" :icon="ZoomIn" @click="handleShowCaseDetail(row)">详情</el-button>
          <el-button size="small" @click="handleEditCase(row)" :icon="Edit" type="info">编辑
              </el-button>
              <el-button size="small" type="danger" @click="handleDeleteCase(row)" 
                :icon="Delete">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
  <!-- 分页器 -->
  <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :background="true"
      layout="prev, pager, next, jumper, -> , total"
      :total="caseInfoStore.total"
      @current-change="handlePageChange"
      style="margin-top:20px"
/>
<!-- 新增病例 -->
<el-dialog v-model="addCaseDialogVisible" title="新建病例" width="700" center>
  <el-tabs>
    <el-tab-pane label="基本信息">
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="病例名称">
          <el-input v-model="addTextCaseForm.case_name" class="inputBox" 
          placeholder="请输入病例名称"/>
        </el-form-item>
        <el-form-item label="选择科室">
          <el-select v-model="addTextCaseForm.department_id" placeholder="请选择科室" style="width: 240px" @change="handleChangeDepartment">
            <el-option
                v-for="item in QuestionInfoStore.diseaseAndDepartmentInfoArr"
                :key="item.department_id"
                :label="item.department_name"
                :value="item.department_id"
              />
          </el-select>
        </el-form-item>

      <el-form-item label="选择疾病">
        <el-select v-model="addTextCaseForm.disease_id" placeholder="请选择疾病" style="width: 240px" :disabled="!isDepartmentSelected">
          <el-option
              v-for="item in diseaseInfo"
              :key="item.disease_id"
              :label="item.disease_name"
              :value="item.disease_id"
            />
        </el-select>
      </el-form-item>
      <el-form-item label="病例介绍">
        <el-input v-model="addTextCaseForm.case_introduction" class="inputBox" type="textarea" :rows="2" placeholder="请输入病例介绍"/>
      </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="病例检查">
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="病例检查结果">
          <el-input v-model="addTextCaseForm.case_examination" class="inputBox" type="textarea" :rows="2" placeholder="请输入病例检查结果"/>
        </el-form-item>

      </el-form>
    </el-tab-pane>
    <el-tab-pane label="治疗方案">
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="治疗方案">
          <el-input v-model="addTextCaseForm.case_treatment" class="inputBox" type="textarea" :rows="2" placeholder="请输入治疗方案"/>
        </el-form-item>
        <el-form-item label="使用药物">
          <el-input v-model="addTextCaseForm.case_medicine" class="inputBox" type="textarea" :rows="2" placeholder="请输入使用药物"/>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="诊断结果">
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="诊断结果">
          <el-input v-model="addTextCaseForm.case_result" class="inputBox" type="textarea" :rows="2" placeholder="请输入诊断结果"/>
        </el-form-item>
        <el-form-item label="费用">
            <el-input v-model.number="addTextCaseForm.case_cost" class="inputBox" placeholder="请输入费用"/>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>


  <template #footer>
    
      <el-button type="primary" @click="submitAddTextCaseForm">提交</el-button>
      <el-button @click="cancleAddTextCaseForm">取消</el-button>
    
  </template>
</el-dialog>

  <!-- 病例详情页面 -->
  <el-dialog v-model="ShowCaseDetailDialogVisible" title="病例详情" width="700px" center>
    <el-card :model="caseTextDetailData" class="case-detail" @tab-click="handleTabClick">
      <el-tabs>
        <el-tab-pane label="基本信息">
          <template #label >
            <span @click="gotoConsulationDetail">基本信息</span>
          </template>
          <div class="detail-section" >
            <el-text class="case-title">{{ caseTextDetailData.case_name }}</el-text>
            <div class="section-content">
              <div class="detail-item">
                <p><strong>病例介绍</strong></p>
                <p style="line-height: 1.5;">{{ caseTextDetailData.case_introduction }}</p>
              </div>
              <div class="detail-item">
                <p><strong>所属科室</strong></p>
                <p style="line-height: 1.5;">{{ caseTextDetailData.department_name }}</p>
              </div>
              <div class="detail-item">
                <p><strong>所属疾病</strong></p>
                <p style="line-height: 1.5;">{{ caseTextDetailData.disease_name }}</p>
              </div>
              <div>
                <div>图片:</div>
                <span v-for="item in caseInfoStore.casePictureInfoArr" :key="url" class="block">
                <el-image
                  style="width: 30%; height: 30%"
                  :src="item.media_url"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :initial-index="index"
                  fit="fill"
                  v-if="item.category=='Consultation'"
                > 
                </el-image>
              </span>
              </div>

              <div >
                <div>视频：</div>
                <div v-for="item in caseInfoStore.caseVideoInfoArr" :key="url">
                  <video width="100%" controls v-if="item.category=='Consultation'">
                    <source :src="item.media_url" type="video/mp4">
                  </video>
                </div>
                
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="病例检查" >
          <template #label>
            <span @click="gotoExaminationDetail">病例检查</span>
          </template>
          <div class="detail-section">
            <p><strong>病例检查结果</strong></p>
            <p style="line-height: 1.5;">{{ caseTextDetailData.case_examination }}</p>
          </div>
          <div>
                <div>图片:</div>
                <span v-for="item in caseInfoStore.casePictureInfoArr" :key="url" class="block">
                <el-image
                  style="width: 30%; height: 30%"
                  :src="item.media_url"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :initial-index="index"
                  fit="fill"
                  v-if="item.category=='Examination'"
                > 
                </el-image>
              </span>
              </div>

              <div>
                <div>视频：</div>
                <div v-for="item in caseInfoStore.caseVideoInfoArr" :key="url">
                  <video width="100%" controls v-if="item.category=='Examination'">
                    <source :src="item.media_url" type="video/mp4">
                  </video>
                </div>
                
              </div>
        </el-tab-pane>
        <el-tab-pane label="治疗方案" >
          <template #label>
            <span @click="gotoTreatmentDetail">治疗方案</span>
          </template>
          <div class="detail-section">
            <p><strong>治疗方案</strong></p>
            <p style="line-height: 1.5;">{{ caseTextDetailData.case_treatment }}</p>
            <p><strong>使用药物</strong></p><p style="line-height: 1.5;">{{ caseTextDetailData.case_medicine }}</p>
          </div>
          <div>
                <div>图片:</div>
                <span v-for="item in caseInfoStore.casePictureInfoArr" :key="url" class="block">
                <el-image
                  style="width: 30%; height: 30%"
                  :src="item.media_url"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :initial-index="index"
                  fit="fill"
                  v-if="item.category=='Treatment'"
                > 
                </el-image>
              </span>
              </div>

              <div>
                <div>视频：</div>
                <div v-for="item in caseInfoStore.caseVideoInfoArr" :key="url">
                  <video width="100%" controls v-if="item.category=='Treatment'">
                    
                    <source :src="item.media_url" type="video/mp4">
                  </video>
                </div>
                
              </div>
        </el-tab-pane>
        <el-tab-pane label="诊断结果" >
          <template #label>
            <span>诊断结果</span>
          </template>
          <div class="detail-section">
            <p><strong>诊断结果</strong></p>
            <p style="margin-top: 10px; line-height: 1.5;">{{ caseTextDetailData.case_result }}</p>
            <p style="line-height: 1.5;"><strong>费用</strong></p>
            <p style="line-height: 1.5;">{{ caseTextDetailData.case_cost }}</p>
          </div>
          <div>
                <div>图片:</div>
                <span v-for="item in caseInfoStore.casePictureInfoArr" :key="url" class="block">
                <el-image
                  style="width: 30%; height: 30%"
                  :src="item.media_url"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :initial-index="index"
                  fit="fill"
                  v-if="item.category=='Result'"
                > 
                </el-image>
              </span>
              </div>

              <div>
                <div>视频：</div>
                <div v-for="item in caseInfoStore.caseVideoInfoArr" :key="url">
                  <video width="100%" controls v-if="item.category=='Result'">
                    <source :src="item.media_url" type="video/mp4">
                  </video>
                </div>
                
              </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-dialog>

<!-- 修改病例页面 -->
<el-dialog v-model="editCaseDialogVisible" title="编辑病例" width="700" center>
  <el-tabs  v-model="FirstTabPane" @tab-click="handleTabClick">
    <el-tab-pane label="基本信息" name="first" >
      <template #label >
        <span @click="gotoConsulationDetail" style="">基本信息</span>
      </template>
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="病例名称">
          <el-input v-model="editTextCaseForm.case_name" class="inputBox" placeholder="请输入病例名称"/>
        </el-form-item>
        <el-form-item label="选择科室">
          <el-select v-model="editTextCaseForm.department_id" placeholder="请选择科室" style="width: 240px" @change="handleEditChangeDepartment">
            <el-option
                v-for="item in QuestionInfoStore.diseaseAndDepartmentInfoArr"
                :key="item.department_id"
                :label="item.department_name"
                :value="item.department_id"
              />
          </el-select>
        </el-form-item>
        <el-form-item label="选择疾病">
          <el-select v-model="editTextCaseForm.disease_id" placeholder="请选择疾病" style="width: 240px" >
            <el-option
                v-for="item in diseaseInfo"
                :key="item.disease_id"
                :label="item.disease_name"
                :value="item.disease_id"
              />
          </el-select>
        </el-form-item>
        <el-form-item label="病例介绍">
          <el-input v-model="editTextCaseForm.case_introduction" class="inputBox" type="textarea" :rows="2" placeholder="请输入病例介绍"/>
        </el-form-item>
        <el-form-item label="附加图片">
          <el-upload
          :limit="1"
          :on-success="handleUploadSuccess"
            action="#"
            with-credentials
            list-type="picture-card"
            :on-preview="handleEditPictureCardPreview"
            :on-remove="handleDeleteImage"
            :on-change="uploadImage"
            :auto-upload="false"
            show-file-list="false"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="editDialogVisible">
            <img w-full :src="editDialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="病例检查" name="second" >
      <template #label>
        <span @click="gotoExaminationDetail">病例检查</span>
      </template>
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="病例检查结果">
          <el-input v-model="editTextCaseForm.case_examination" class="inputBox" type="textarea" :rows="2" placeholder="请输入病例检查结果"/>
        </el-form-item>
        <el-form-item label="附加图片">
          <el-upload
          :limit="1"
            :on-success="handleUploadSuccess"
            action="#"
            with-credentials
            list-type="picture-card"
            :on-preview="handleEditPictureCardPreview"
            :on-remove="handleDeleteImage"
            :on-change="uploadImage"
            :auto-upload="false"
            show-file-list="true"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="editDialogVisible">
            <img w-full :src="editDialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="治疗方案" name="third">
      <template #label>
        <span @click="gotoTreatmentDetail">治疗方案</span>
      </template>
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="治疗方案">
          <el-input v-model="editTextCaseForm.case_treatment" class="inputBox" type="textarea" :rows="2" placeholder="请输入治疗方案"/>
        </el-form-item>
        <el-form-item label="使用药物">
          <el-input v-model="editTextCaseForm.case_medicine" class="inputBox" type="textarea" :rows="2" placeholder="请输入使用药物"/>
        </el-form-item>
        <el-form-item label="附加图片">
          <el-upload
          :limit="1"
          :on-success="handleUploadSuccess"
            action="#"
            with-credentials
            list-type="picture-card"
            :on-preview="handleEditPictureCardPreview"
            :on-remove="handleDeleteImage"
            :on-change="uploadImage"
            :auto-upload="false"
            show-file-list="true"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="editDialogVisible">
            <img w-full :src="editDialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="诊断结果" name="forth">
      <template #label>
        <span @click="gotoResultDetail">诊断结果</span>
      </template>
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="诊断结果">
          <el-input v-model="editTextCaseForm.case_result" class="inputBox" type="textarea" :rows="2" placeholder="请输入诊断结果"/>
        </el-form-item>
        <el-form-item label="费用">
          <el-input v-model.number="editTextCaseForm.case_cost" class="inputBox" placeholder="请输入费用"/>
        </el-form-item>
        <el-form-item label="附加图片">
          <el-upload
          :limit="1"
          :on-success="handleUploadSuccess(editTextCaseForm.case_id)"
            action="#"
            with-credentials
            list-type="picture-card"
            :on-preview="handleEditPictureCardPreview"
            :on-remove="handleDeleteImage"
            :on-change="uploadImage"
            :auto-upload="false"
            show-file-list="true"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <el-dialog v-model="editDialogVisible">
            <img w-full :src="editDialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>

  <template #footer>
    <el-button type="primary" @click="submitEditTextCaseForm">提交</el-button>
    <el-button @click="editCaseDialogVisible = false">取消</el-button>
  </template>
</el-dialog>

</template>
<script setup lang="ts">



import { ElMessage, ElMessageBox, ElNotification, type UploadProps, type UploadUserFile } from 'element-plus'

//获取仓库对象

import {Delete, Edit, ZoomIn} from '@element-plus/icons-vue'
import useBackCaseInfoStore from '@/store/back/case';
import { onMounted, reactive, ref, watch } from 'vue';
import type { addCaseTextData, caseTextInfoArr, caseTextInfoItem, deleteCaseTextData, deleteMediaData, editCaseTextData, searchCaseData } from '@/api/back/case/type';
import type { diseaseQuestionInfoArr } from '@/api/back/exam/questions/type';
import useBackQuestionStore from "@/store/back/question"

let QuestionInfoStore=useBackQuestionStore();
let caseInfoStore=useBackCaseInfoStore();
let pageNo=ref('1')
let pageSize=ref('10')
//目前首页挂载完毕发请求获取用户信息

onMounted(async()=>{
  await caseInfoStore.getAllTextCaseInfo(pageNo.value,pageSize.value);
  await QuestionInfoStore.getDepartmentAndDiseaseInfo();
})

const handlePageChange = async(pager="1")=>{
  pageNo.value=pager;
  await caseInfoStore.getAllTextCaseInfo(pageNo.value,pageSize.value);
}
//搜索病例
let searchKeyword = ref<string>("");
let send_data = ref<searchCaseData>({
  case_name: ""
});

// 监听 searchKeyword 的变化，并更新 send_data
watch(searchKeyword, (newValue) => {
  send_data.value.case_name = newValue;
});

const handleSearchCase = async () => {
  await caseInfoStore.searchCaseInfo(send_data.value);
}
//重置搜索结果
const reset= async ()=>{
  let result=await caseInfoStore.getAllTextCaseInfo(pageNo.value,pageSize.value);
  if(result=='ok') {
  ElNotification({
      type:'success',
      message:"重置成功！"
    });
  }
}
interface MediaInfoType{
  case_id:string;
  media_name:string;
  category:string;
}
let mediaSendData=reactive<MediaInfoType>({
  media_name:'',
  case_id:'',
  category:'Consultation'
});
//查看病例详情 文字
let ShowCaseDetailDialogVisible=ref(false);
let caseTextDetailData=reactive<caseTextInfoItem>({
  case_id:"",
  case_name:'',
  case_examination:'',
  case_result:'',
  case_treatment:'',
  case_medicine:'',
  case_cost:'',
  case_introduction:'',
  disease_id:'',
  department_id:'',
  disease_name:'',
  department_name:''
})
let temp=reactive({});
const handleShowCaseDetail=async (row:any)=>{
  caseTextDetailData.case_id=row.case_id;
  caseTextDetailData.case_name=row.case_name;
  caseTextDetailData.case_cost=row.case_cost;
  caseTextDetailData.case_examination=row.case_examination;
  caseTextDetailData.case_introduction=row.case_introduction;
  caseTextDetailData.case_medicine=row.case_medicine;
  caseTextDetailData.case_result=row.case_result;
  caseTextDetailData.case_treatment=row.case_treatment;
  caseTextDetailData.disease_name=row.disease_name;
  caseTextDetailData.department_name=row.department_name
  ShowCaseDetailDialogVisible.value=true;
  await caseInfoStore.getMediaInfo(caseTextDetailData.case_id,"Consultation");
  temp=JSON.stringify(caseInfoStore.caseVideoInfoArr[0]);
  
  
}
//多媒体信息
const gotoConsulationDetail = async()=>{
  await caseInfoStore.getMediaInfo(caseTextDetailData.case_id,"Consultation");
  mediaSendData.category="Consultation"
}
const gotoExaminationDetail = async()=>{

  await caseInfoStore.getMediaInfo(caseTextDetailData.case_id,"Examination");
  mediaSendData.category="Examination"

}
const gotoTreatmentDetail = async()=>{

  await caseInfoStore.getMediaInfo(caseTextDetailData.case_id,"Treatment");
  mediaSendData.category="Treatment"

}
const gotoResultDetail = async()=>{

  await caseInfoStore.getMediaInfo(caseTextDetailData.case_id,"Result");
  mediaSendData.category="Result"

}
// const handleTabClick = async(tab:any,event:any)=>{
//   console.log(tab);
//   console.log(tab.paneName);
//     if(tab.paneName=='first'){
//       mediaSendData.category="Consultation"
//       await caseInfoStore.getMediaInfo(caseTextDetailData.case_id,"Consultation");
//       console.log(caseInfoStore.casePictureInfoArr);

//     }else if(tab.paneName=='second'){
//       mediaSendData.category="Examination"
//       await caseInfoStore.getMediaInfo(caseTextDetailData.case_id,"Examination");
//     }else if(tab.paneName=='third'){
//       mediaSendData.category="Treatment"
//       await caseInfoStore.getMediaInfo(caseTextDetailData.case_id,"Treatment");
//     }else if(tab.paneName=='forth'){
//       mediaSendData.category="Result"
//       await caseInfoStore.getMediaInfo(caseTextDetailData.case_id,"Result");
//     }
    
// }
//添加病例 文本信息
let isDepartmentSelected=ref<boolean>(false);
const addCaseDialogVisible=ref<boolean>(false);
let addTextCaseForm=reactive<addCaseTextData>({
  case_name:'',
  case_cost:'',
  case_examination:'',
  case_introduction:'',
  case_medicine:'',
  case_result:'',
  case_treatment:'',
  disease_id:"",
  department_id:''
})
const handleAddCase=()=>{
  addTextCaseForm.case_name = '';
  addTextCaseForm.case_cost = '';
  addTextCaseForm.case_examination = '';
  addTextCaseForm.case_introduction = '';
  addTextCaseForm.case_medicine = '';
  addTextCaseForm.case_result = '';
  addTextCaseForm.case_treatment = '';
  addTextCaseForm.disease_id = '';
  addTextCaseForm.department_id = '';
  addCaseDialogVisible.value=true;
  isDepartmentSelected.value=false;
}

//changeDepartment
let diseaseInfo=ref<diseaseQuestionInfoArr>()
const handleChangeDepartment = ()=>{
  isDepartmentSelected.value=true;
  addTextCaseForm.disease_id="";
  editTextCaseForm.disease_id="";
  const selectedDepartment = QuestionInfoStore.diseaseAndDepartmentInfoArr.find(item => item.department_id === addTextCaseForm.department_id);
  diseaseInfo.value= selectedDepartment ? selectedDepartment.diseases : []
}
//提交添加病例表单
const submitAddTextCaseForm = async ()=>{
  let result=await caseInfoStore.addTextCaseInfo(addTextCaseForm);
  if(result=='ok'){
    caseInfoStore.getAllTextCaseInfo(pageNo.value,pageSize.value);
    addCaseDialogVisible.value=false;
  }
}
//取消提交
const cancleAddTextCaseForm = ()=>{
addCaseDialogVisible.value=false;
isDepartmentSelected.value=false;
}

  //删除病例
const handleDeleteCase = async (row: any) => {
  try {
    await ElMessageBox.confirm(
      '您确定删除该科室吗？',
      '提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );
    // 用户确认删除后，调用删除用户方法，并传递用户名作为参数
    let deleteData=ref<deleteCaseTextData>({case_id:""});
    deleteData.value.case_id=row.case_id;
     let result = await caseInfoStore.deleteCase(deleteData.value);  
     if(result==='ok'){
       caseInfoStore.getAllTextCaseInfo(pageNo.value,pageSize.value);
       
     }

  } catch (error) {
    // 取消删除时显示提示信息
    ElMessage({
      type: 'info',
      message: '已取消删除',
    });
  }
}
//修改病例信息
let editCaseDialogVisible=ref(false)
let editTextCaseForm = reactive<editCaseTextData>({
  case_id: '',
  case_name: '',
  case_cost: '',
  case_examination: '',
  case_introduction: '',
  case_medicine: '',
  case_result: '',
  case_treatment: '',
  disease_id: '',
  department_id: ''
});
let FirstTabPane=ref('first');
const handleEditChangeDepartment = ()=>{

  editTextCaseForm.disease_id="";
  const selectedDepartment = QuestionInfoStore.diseaseAndDepartmentInfoArr.find(
        item => item.department_id === editTextCaseForm.department_id
      );
      diseaseInfo.value= selectedDepartment ? selectedDepartment.diseases : []
}
const handleEditCase = (row: any) => {
  editTextCaseForm.case_id = row.case_id;
  editTextCaseForm.case_name = row.case_name;
  editTextCaseForm.case_cost = row.case_cost;
  editTextCaseForm.case_examination = row.case_examination;
  editTextCaseForm.case_introduction = row.case_introduction;
  editTextCaseForm.case_medicine = row.case_medicine;
  editTextCaseForm.case_result = row.case_result;
  editTextCaseForm.case_treatment = row.case_treatment;
  editTextCaseForm.disease_id = row.disease_id;
  editTextCaseForm.department_id = row.department_id;
  editCaseDialogVisible.value = true;
  isDepartmentSelected.value=false;
  const selectedDepartment = QuestionInfoStore.diseaseAndDepartmentInfoArr.find(
        item => item.department_id === editTextCaseForm.department_id
      );
      diseaseInfo.value= selectedDepartment ? selectedDepartment.diseases : []
    FirstTabPane.value='first';
  mediaSendData.case_id=editTextCaseForm.case_id;
};
//提交编辑表单
const submitEditTextCaseForm = async ()=>{
  console.log(editTextCaseForm);
  let result=await caseInfoStore.editTextCaseInfo(editTextCaseForm);
  if(result=='ok'){
    caseInfoStore.getAllTextCaseInfo(pageNo.value,pageSize.value);
    editCaseDialogVisible.value=false;
  }
}
//添加病例多媒体信息
//记录是哪个分区的ref


let imageFormData=new FormData();
const uploadImage = async (file:any,list:any)=>{
  if (list.length > 1 && file.status !== "fail") {
      list.splice(0, 1);
  }
    // } else if (file.status === "fail") {
    //   ElNotification({
    //                 type:'error',
    //                 message:"每次仅允许上传一张图片！"
    //             })
    //   list.splice(0, 1);
    // }
  console.log("uploading")
  console.log(file);
  imageFormData.append('file', file.raw);
  imageFormData.append('case_id', mediaSendData.case_id);
  imageFormData.append('category',mediaSendData.category);
  console.log(imageFormData.get('category'))
  // console.log(imageFormData.get('file'))
  // console.log(imageFormData.get('media_name'))
  console.log(imageFormData.get('case_id'))
  // console.log(imageFormData.get('category'))
  // console.log(Object.prototype.toString.call(imageFormData))
  await caseInfoStore.addMediaInfo(imageFormData);
}
const handleUploadSuccess = async (data:string)=>{
  // await caseInfoStore.getMediaInfo(data);
  console.log(data);
}
//删除多媒体
let deleteMediaSendData=reactive<deleteMediaData>({
  media_id:"",
})
const handleDeleteImage = async()=>{
  console.log("delete image")
  await caseInfoStore.deleteMediaInfo(deleteMediaSendData)
}

</script>


<style scoped>
.inputBox{

  width:240px;
  margin-right:40px;

}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-section {
  /* padding: 20px; */
  font-size: 15px;
}

.case-title {
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
}

.section-content {
  margin-top: 10px;
}

.detail-section p {
  margin-bottom: 15px;
  white-space: pre-wrap; /* 保留换行 */
}
.detail-section strong{
  font-size: 20px;
}


.add-case-form .el-form-item__label {
  font-size: 14px;
  font-weight: bold;
}
.add-case-form .el-input {
  width: 80%;
}
</style>