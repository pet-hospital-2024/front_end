<template>
    <el-card style="height: 80px;margin-bottom: 10px;" shadow="hover">
    <el-form :inline="true" class="form">
      <el-form-item label="病例:">
        <el-input placeholder="请输入搜索病例" v-model="searchKeyword"></el-input>
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
      <el-table-column  label="病例ID" min-width="20%" align="center" prop="case_id"/>
      <el-table-column  label="病例名称" min-width="20%" align="center" prop="case_name"/>
      <el-table-column  label="疾病" min-width="15%" align="center" prop="disease_name"/>
      <el-table-column  label="科室" min-width="15%" align="center" prop="department_name"/>
      <el-table-column align="center" label="操作" min-width="30%">
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
  <el-tabs style="min-height: 400px;">
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
    <el-card :model="caseTextDetailData" class="case-detail">
      <el-tabs @tab-click="handleTabClickDetail" v-model="FirstTabPane">
        <!-- <div class="detail-heading">
          <el-text class="case-title">{{ caseTextDetailData.case_name }}</el-text>
          
        </div> -->
        <!-- <el-divider/> -->
        <el-tab-pane label="基本信息" name="Consultation">
          <div class="detail-section" >
            
            <div class="section-content">
              <div class="detail-item">
                <p><strong>病例介绍</strong></p>
                <p style="line-height: 1.5;">{{ caseTextDetailData.case_introduction }}</p>
                <el-divider/>
              </div>
              <div class="detail-item">
                <p><strong>所属科室</strong></p>
                <p style="line-height: 1.5;">{{ caseTextDetailData.department_name }}</p>
                <el-divider/>
              </div>
              <div class="detail-item">
                <p><strong>所属疾病</strong></p>
                <p style="line-height: 1.5;">{{ caseTextDetailData.disease_name }}</p>
              </div>
              <el-divider v-if="ImageInfoArr.length"/>
              <div v-if="ImageInfoArr.length" class="detail-item">
                <p><strong>图片</strong></p>
                <span v-for="imgUrl in ImageInfoArr" class="imgItem">
                  <img :src="imgUrl" alt="img">
                </span>
              </div>
              <el-divider v-if="VideoInfoArr.length"/>
              <div v-if="VideoInfoArr.length">
                <p><strong>视频</strong></p>
                <div v-for="item in VideoInfoArr" :key="url">
                  <video width="100%" controls >
                    <source :src="item" type="video/mp4">
                  </video>
                </div>
                
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="病例检查" name="Examination">
              <div class="detail-section" >
            
            <div class="section-content">
              <div class="detail-item">
                <p><strong>病例检查结果</strong></p>
                <p style="line-height: 1.5;">{{ caseTextDetailData.case_examination }}</p>
                
                
              </div>
              <el-divider v-if="ImageInfoArr.length"/>
              <div v-if="ImageInfoArr.length" class="detail-item">
                <p><strong>图片</strong></p>
                <span v-for="imgUrl in ImageInfoArr" class="imgItem">
                  <img :src="imgUrl" alt="img">
                </span>
              </div>
              <el-divider v-if="VideoInfoArr.length"/>
              <div v-if="VideoInfoArr.length">
                <p><strong>视频</strong></p>
                <div v-for="item in VideoInfoArr" :key="url">
                  <video width="100%" controls >
                    <source :src="item" type="video/mp4">
                  </video>
                </div>
                
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="治疗方案" name="Treatment">
              <div class="detail-section" >
            
            <div class="section-content">
              <div class="detail-item">
                <p><strong>使用药物</strong></p>
                <p style="line-height: 1.5;">{{ caseTextDetailData.case_medicine }}</p>
              </div>
              <el-divider v-if="ImageInfoArr.length"/>
              <div v-if="ImageInfoArr.length" class="detail-item">
                <p><strong>图片</strong></p>
                <span v-for="imgUrl in ImageInfoArr" class="imgItem">
                  <img :src="imgUrl" alt="img">
                </span>
              </div>
              <el-divider v-if="VideoInfoArr.length"/>
              <div v-if="VideoInfoArr.length">
                <p><strong>视频</strong></p>
                <div v-for="item in VideoInfoArr" :key="url">
                  <video width="100%" controls >
                    <source :src="item" type="video/mp4">
                  </video>
                </div>
                
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="诊断结果" name="Result">
              <div class="detail-section" >
            
            <div class="section-content">
              <div class="detail-item">
                <p><strong>诊断结果</strong></p>
                <p style="line-height: 1.5;">{{ caseTextDetailData.case_result }}</p>
              </div>
              <el-divider v-if="ImageInfoArr.length"/>
              <div v-if="ImageInfoArr.length" class="detail-item">
                <p><strong>图片</strong></p>
                <span v-for="imgUrl in ImageInfoArr" class="imgItem">
                  <img :src="imgUrl" alt="img">
                </span>
              </div>
              <el-divider v-if="VideoInfoArr.length"/>
              <div v-if="VideoInfoArr.length">
                <p><strong>视频</strong></p>
                <div v-for="item in VideoInfoArr" :key="url">
                  <video width="100%" controls >
                    <source :src="item" type="video/mp4">
                  </video>
                </div>
                
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </el-dialog>

<!-- 修改病例页面 -->
<el-dialog v-model="editCaseDialogVisible" title="编辑病例" width="700" center>
  <el-tabs  v-model="FirstTabPane" @tab-click="handleTabClickEdit" style="min-height:400px" >
    <el-tab-pane label="基本信息" name="Consultation" >

      <el-form label-width="auto" class="add-case-form" size="700">
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
        <el-form-item label="图片" v-if="ImageInfoArr.length">
          <span v-for="imgUrl in ImageInfoArr" class="imgItem">
              <img :src="imgUrl" alt="img" >
              <div class="overlay">
                <el-icon class="deleteIcon" @click="handleDeleteImage(imgUrl,'Consultation')"><Delete/></el-icon>
              </div>
            </span>

        </el-form-item>
        <el-form-item label="     ">
          <el-upload
              ref="upload"
              with-credentials
              action=""
              :multiple="false"
              :on-change="uploadImage"
              :auto-upload="false"
              :show-file-list="false"
              :limit="1"
              :on-exceed="handleExceed"
              
              
            >
              <el-button type="primary">上传图片</el-button>
            </el-upload>
        </el-form-item>

        <el-form-item label="视频" v-if="VideoInfoArr.length">
          <span v-for="videoUrl in VideoInfoArr" :key="videoUrl" class="videoItem">
            <div class="videoContainer" @mouseover="handleVideoMouseOver(videoUrl)" @mouseleave="handleVideoMouseLeave">
              <video :src="videoUrl" controls style="width: 400px; height: 300px;"></video>
              <!-- 删除图标 -->
              <div v-if="showDeleteIcon && currentVideo === videoUrl" class="deleteIconContainer">
                <el-icon class="deleteIcon" @click="handleDeleteVideo(videoUrl,'Consultation')"><Delete/></el-icon>
              </div>
            </div>
          </span>
        </el-form-item>
        <el-form-item label="     ">
          <Upload :category="mediaSendData.category" :case_id="editTextCaseForm.case_id" @upload_state="uploadState"></Upload>
        </el-form-item>

      </el-form>
    </el-tab-pane>
    <el-tab-pane label="病例检查" name="Examination" >
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="病例检查结果">
          <el-input v-model="editTextCaseForm.case_examination" class="inputBox" type="textarea" :rows="2" placeholder="请输入病例检查结果"/>
        </el-form-item>
        <el-form-item label="图片" v-if="ImageInfoArr.length">
          <span v-for="imgUrl in ImageInfoArr" class="imgItem">
          <img :src="imgUrl" alt="img" style="width:200px;height:200px">
          <div class="overlay">
            <el-icon class="deleteIcon" @click="handleDeleteImage(imgUrl,'Examination')"><Delete/></el-icon>
          </div>
        </span>
        </el-form-item>
        <el-form-item>
          <el-upload
          ref="upload"
              
              with-credentials
              action=""
              :multiple="false"
              :on-change="uploadImage"
              :auto-upload="false"
              :show-file-list="false"
              :limit="1"
              :on-exceed="handleExceed"
              
              
            >
              <el-button type="primary">上传图片</el-button>
            </el-upload>
        </el-form-item>
        <el-form-item label="视频" v-if="VideoInfoArr.length">
          <span v-for="videoUrl in VideoInfoArr" :key="videoUrl" class="videoItem">
            <div class="videoContainer" @mouseover="handleVideoMouseOver(videoUrl)" @mouseleave="handleVideoMouseLeave">
              <video :src="videoUrl" controls style="width: 400px; height: 300px;"></video>
              <!-- 删除图标 -->
              <div v-if="showDeleteIcon && currentVideo === videoUrl" class="deleteIconContainer">
                <el-icon class="deleteIcon" @click="handleDeleteVideo(videoUrl,'Examination')"><Delete/></el-icon>
              </div>
            </div>
          </span>
        </el-form-item>
        <el-form-item >
          <Upload :category="mediaSendData.category" :case_id="editTextCaseForm.case_id" @upload_state="uploadState"></Upload>
        </el-form-item>


      </el-form>
    </el-tab-pane>
    <el-tab-pane label="治疗方案" name="Treatment">

      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="治疗方案">
          <el-input v-model="editTextCaseForm.case_treatment" class="inputBox" type="textarea" :rows="2" placeholder="请输入治疗方案"/>
        </el-form-item>
        <el-form-item label="使用药物">
          <el-input v-model="editTextCaseForm.case_medicine" class="inputBox" type="textarea" :rows="2" placeholder="请输入使用药物"/>
        </el-form-item>
        <el-form-item label="图片" v-if="ImageInfoArr.length">
          <span v-for="imgUrl in ImageInfoArr" class="imgItem">
          <img :src="imgUrl" alt="img" style="width:200px;height:200px">
          <div class="overlay">
            <el-icon class="deleteIcon" @click="handleDeleteImage(imgUrl,'Treatment')"><Delete/></el-icon>
          </div>
        </span>
        </el-form-item>
        <el-form-item label="     ">
          <el-upload
          ref="upload"
              
              with-credentials
              action=""
              :multiple="false"
              :on-change="uploadImage"
              :auto-upload="false"
              :show-file-list="false"
              :limit="1"
              :on-exceed="handleExceed"
              
              
            >
              <el-button type="primary">上传图片</el-button>
            </el-upload>

        </el-form-item>
        <el-form-item label="视频" v-if="VideoInfoArr.length">
          <span v-for="videoUrl in VideoInfoArr" :key="videoUrl" class="videoItem">
            <div class="videoContainer" @mouseover="handleVideoMouseOver(videoUrl)" @mouseleave="handleVideoMouseLeave">
              <video :src="videoUrl" controls style="width: 400px; height: 300px;"></video>
              <!-- 删除图标 -->
              <div v-if="showDeleteIcon && currentVideo === videoUrl" class="deleteIconContainer">
                <el-icon class="deleteIcon" @click="handleDeleteVideo(videoUrl,'Treatment')"><Delete/></el-icon>
              </div>
            </div>
          </span>
        </el-form-item>

        <el-form-item label="     ">
          <Upload :category="mediaSendData.category" :case_id="editTextCaseForm.case_id" @upload_state="uploadState"></Upload>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="诊断结果" name="Result">
      <el-form label-width="100px" class="add-case-form">
        <el-form-item label="诊断结果">
          <el-input v-model="editTextCaseForm.case_result" class="inputBox" type="textarea" :rows="2" placeholder="请输入诊断结果"/>
        </el-form-item>
        <el-form-item label="费用">
          <el-input v-model.number="editTextCaseForm.case_cost" class="inputBox" placeholder="请输入费用"/>
        </el-form-item>
        <el-form-item label="图片" v-if="ImageInfoArr.length">
          <span v-for="imgUrl in ImageInfoArr" class="imgItem">
          <img :src="imgUrl" alt="img" >
          <div class="overlay">
            <el-icon class="deleteIcon" @click="handleDeleteImage(imgUrl,'Result')"><Delete/></el-icon>
          </div>
        </span>
        </el-form-item>
        <el-form-item>
          <el-upload
          ref="upload"
              
              with-credentials
              action=""
              :multiple="false"
              :on-change="uploadImage"
              :auto-upload="false"
              :show-file-list="false"
              :limit="1"
              :on-exceed="handleExceed"
              
              
            >
              <el-button type="primary">上传图片</el-button>
            </el-upload>
            
        </el-form-item>
        <el-form-item label="视频" v-if="VideoInfoArr.length">
          <span v-for="videoUrl in VideoInfoArr" :key="videoUrl" class="videoItem">
            <div class="videoContainer" @mouseover="handleVideoMouseOver(videoUrl)" @mouseleave="handleVideoMouseLeave">
              <video :src="videoUrl" controls style="width: 400px; height: 300px;"></video>
              <!-- 删除图标 -->
              <div v-if="showDeleteIcon && currentVideo === videoUrl" class="deleteIconContainer">
                <el-icon class="deleteIcon" @click="handleDeleteVideo(videoUrl,'Result')"><Delete/></el-icon>
              </div>
            </div>
          </span>
        </el-form-item>

        <el-form-item>
          <Upload :category="mediaSendData.category" :case_id="editTextCaseForm.case_id" @upload_state="uploadState"></Upload>
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



import { ElMessage, ElMessageBox, ElNotification, genFileId, type UploadFile, type UploadInstance, type UploadProps, type UploadRawFile, type UploadUserFile } from 'element-plus'

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
//upload大文件组件
import Upload from '@/components/upload/index.vue'
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

let VideoUploadState=ref<boolean>(false);
const uploadState=async (val:any)=>{
  VideoUploadState.value=true;
  if(val=='ok'){
    await caseInfoStore.getMediaUrlInfo(editTextCaseForm.case_id,"video",mediaSendData.category)
    VideoInfoArr.value=caseInfoStore.mediaUrlArr
  }
}

const handleSearchCase = async () => {
  console.log("searchCase"+searchKeyword.value);
  await caseInfoStore.searchCaseInfo(searchKeyword.value);
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

const handleShowCaseDetail=async (row:any)=>{
  ImageInfoArr.value=[];
  VideoInfoArr.value=[];
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
  FirstTabPane.value="Consultation"
  await caseInfoStore.getMediaUrlInfo(caseTextDetailData.case_id,"image","Consultation")
  ImageInfoArr.value=caseInfoStore.mediaUrlArr;
  await caseInfoStore.getMediaUrlInfo(caseTextDetailData.case_id,"video","Consultation")
  VideoInfoArr.value=caseInfoStore.mediaUrlArr;
  
}

//点击tab事件
let ImageInfoArr=ref<string[]>([]);
let VideoInfoArr=ref<string[]>([]);
const handleTabClickEdit = async (tab:any)=>{
  console.log(tab.paneName);
  ImageInfoArr.value=[];
  VideoInfoArr.value=[];
  await caseInfoStore.getMediaUrlInfo(editTextCaseForm.case_id,"image",tab.paneName)
  ImageInfoArr.value=caseInfoStore.mediaUrlArr
  await caseInfoStore.getMediaUrlInfo(editTextCaseForm.case_id,"video",tab.paneName)
  VideoInfoArr.value=caseInfoStore.mediaUrlArr
  
  mediaSendData.category=tab.paneName;
  
}
const handleTabClickDetail = async (tab:any)=>{
  console.log(tab.paneName);
  ImageInfoArr.value=[];
  VideoInfoArr.value=[];
  await caseInfoStore.getMediaUrlInfo(caseTextDetailData.case_id,"image",tab.paneName)
  ImageInfoArr.value=caseInfoStore.mediaUrlArr;
  await caseInfoStore.getMediaUrlInfo(caseTextDetailData.case_id,"video",tab.paneName)
  VideoInfoArr.value=caseInfoStore.mediaUrlArr;
  
}
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
let FirstTabPane=ref();
const handleEditChangeDepartment = ()=>{

  editTextCaseForm.disease_id="";
  const selectedDepartment = QuestionInfoStore.diseaseAndDepartmentInfoArr.find(
        item => item.department_id === editTextCaseForm.department_id
      );
      diseaseInfo.value= selectedDepartment ? selectedDepartment.diseases : []
}
const handleEditCase =  async (row: any) => {
  ImageInfoArr.value=[];
  VideoInfoArr.value=[];
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
   
  mediaSendData.case_id=editTextCaseForm.case_id;
  FirstTabPane.value="Consultation"
  await caseInfoStore.getMediaUrlInfo(editTextCaseForm.case_id,"image","Consultation")
  ImageInfoArr.value=caseInfoStore.mediaUrlArr;
  await caseInfoStore.getMediaUrlInfo(editTextCaseForm.case_id,"video","Consultation")
  VideoInfoArr.value=caseInfoStore.mediaUrlArr;
  
  
};
//提交编辑表单
const submitEditTextCaseForm = async ()=>{
  let result=await caseInfoStore.editTextCaseInfo(editTextCaseForm);
  if(result=='ok'){
    caseInfoStore.getAllTextCaseInfo(pageNo.value,pageSize.value);
    editCaseDialogVisible.value=false;
  }
}
//添加病例多媒体信息
//记录是哪个分区的ref




const uploadImage = async (file:UploadFile)=>{
  let imageFormData=new FormData();
  imageFormData.append('file', file.raw);
  console.log(file.raw);
  imageFormData.append('case_id', mediaSendData.case_id);
  imageFormData.append('category',mediaSendData.category);
  let res=await caseInfoStore.addMediaInfo(imageFormData);
  if(res=='ok'){
    await caseInfoStore.getMediaUrlInfo(editTextCaseForm.case_id,"image",mediaSendData.category)
    ImageInfoArr.value=caseInfoStore.mediaUrlArr
  }

}


const upload = ref<UploadInstance>()
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId();
  upload.value!.handleStart(file)
  console.log(file);
}
//删除多媒体--byUrl

let currentVideo=ref<string>();
let showDeleteIcon=ref<boolean>(false)

const handleVideoMouseOver=(videoUrl:string)=>{
  currentVideo.value = videoUrl;
  showDeleteIcon.value = true;

}
const handleVideoMouseLeave=()=>{
  currentVideo.value = "";
  showDeleteIcon.value=false;
}

//删除图片
let deleteMediaSendData=reactive<deleteMediaData>({
  media_url:"",
})
const handleDeleteImage = async(imgUrl:string,category:string)=>{
  deleteMediaSendData.media_url=imgUrl;
  console.log(deleteMediaSendData);
  let res=await caseInfoStore.deleteMediaInfo(deleteMediaSendData)
  if(res=='ok'){
    await caseInfoStore.getMediaUrlInfo(editTextCaseForm.case_id,"image",category)
    ImageInfoArr.value=caseInfoStore.mediaUrlArr
  }

}
//删除视频--为什么那么慢？？？？？？？？？？
//请求被挂起--超时！  
const handleDeleteVideo=async (videoUrl:string,category:string)=>{
  console.log(videoUrl);
  deleteMediaSendData.media_url=videoUrl;
  console.log(deleteMediaSendData);
  let res=await caseInfoStore.deleteMediaInfo(deleteMediaSendData)
  if(res=='ok'){
    await caseInfoStore.getMediaUrlInfo(editTextCaseForm.case_id,"video",category)
    VideoInfoArr.value=caseInfoStore.mediaUrlArr
  }
}
  
</script>


<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
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
}
.case-detail{
  min-height: 400px;
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
.detail-heading{
  display:flex;
  justify-content: center;
  align-items: center;
  
}

.add-case-form .el-form-item__label {
  font-size: 14px;
  font-weight: bold;
}
.add-case-form .el-input {
  width: 80%;
}
.imgItem {
  position: relative;
  display: inline-block;
  width:30%;
  margin-right: 20px;

}

.imgItem img {  
  width: 200px;
  height: 200px;
}

.imgItem .overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明的黑色遮罩 */
  opacity: 0; /* 初始隐藏 */
  transition: opacity 0.3s ease; /* 添加过渡效果 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.imgItem:hover .overlay {
  opacity: 1; /* 鼠标悬停时显示遮罩 */
}

.overlay .deleteIcon {
  color: white;
  font-size: 24px;
  cursor: pointer;
}
.videoItem {
  display: inline-block;
  margin-right: 10px; /* 设置视频之间的间距 */
}

.videoContainer {
  position: relative;
}

.deleteIconContainer {
  position: absolute;
  top: 15%;
  right: 2%;
  width: 40px; /* 调整删除图标容器的宽度 */
  height: 40px; /* 调整删除图标容器的高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.deleteIcon {
  color: white;
  font-size: 1.5em;
}
</style>