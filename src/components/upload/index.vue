<template>
  <div :class="state.showProgress ? 'loading' : ''" >
    <el-upload
      
      multiple
      
      :auto-upload="true"
      :http-request="checkedFile"
      :on-remove="removeFile"
      :limit="10"
      :disabled="false"
      
    >
      <!-- <i class="el-icon-upload"></i> -->
      <el-button type="primary">上传视频</el-button>
    </el-upload>
    <el-dialog title="正在上传" v-model="state.showProgress" width="30%">
      <el-progress
        type="circle"
        :percentage="state.progress"
        class="progress"
        v-if="state.showProgress"
      ></el-progress>
    </el-dialog>
  </div>
</template>

<script lang="ts">
export default{
  name:'Upload'
}
</script>

<script setup lang="ts">
import { reactive, ref } from "vue";
import axios from "axios";
import SparkMD5 from "spark-md5";
import { ElMessage, ElDialog, ElProgress } from "element-plus";
import useUserStore from "@/store/modules/user";
//父组件值
const props=defineProps({
  category:{
    type:String,
    default:''
  },
  case_id:{
    type:String,
    default:''
  }
})
console.log(props)
//子组件向父组件传值
import { defineEmits } from "vue";
const emit = defineEmits(['upload_state'])

let userStore = useUserStore();
//属性传值
// defineProps(["file"])
const state = reactive({
  maxSize: 5 * 1024 * 1024 * 1024, // 上传最大文件限制
  multiUploadSize: 100 * 1024 * 1024, // 大于这个大小的文件使用分块上传
  eachSize: 100 * 1024 * 1024, // 每块文件大小
  requestCancelQueue: {}, // 请求方法队列（用于取消上传）
  progress: 0,
  showProgress: false,
  // eachProgress: 0,
  chunksKeep: 0,
  fileChunksKeep: [],
  fileKeep: null, //当前这个文件
  fileMd5Keep: "",
});



//移除文件
const removeFile = (file) => {
  console.log("remove", file);
  if (state.requestCancelQueue[file.uid]) {
    state.requestCancelQueue[file.uid]();
    delete state.requestCancelQueue[file.uid];
  }
  return true;
};

// 格式化文件大小显示文字
const getSize = (size) => {
  if (size > 1024) {
    if (size / 1024 > 1024) {
      if (size / (1024 * 1024) > 1024) {
        return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
      } else {
        return `${(size / (1024 * 1024)).toFixed(2)} MB`;
      }
    } else {
      return `${(size / 1024).toFixed(2)} KB`;
    }
  }
  return `${size.toFixed(2)} B`;
};

//检查文件
const checkedFile = async (options) => {
  console.log(options);
  const { file, onProgress, onSuccess, onError } = options;
  //是否超过最大上限
  if (file.size > state.maxSize) {
    console.log(file.size);
    return ElMessage({
      message: `您选择的文件大于${getSize(state.maxSize)}`,
      type: "error",
    });
  }
  state.fileKeep = file;
  console.log(state.fileKeep);
  const uploadFunc =
    //分块上传还是单个上传
    file.size > state.multiUploadSize ? splitUpload : singleUpload;
  try {
    await uploadFunc(file, onProgress);
    onSuccess();
  } catch (e) {
    console.error(e);
    ElMessage({
      message: e.message,
      type: "error",
    });
    state.showProgress = false;
    state.progress = 0;
    onError();
  }
};

//单文件上传
const singleUpload = async (file, onProgress) => {
  console.log(onProgress);
  await postFile(
    {
      file,
      chunk: 0,
      chunks:1,
      file_name:file.name,
    },
    onProgress
  );
  
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = () => {
    const hash = SparkMD5.ArrayBuffer.hash(reader.result);
    state.fileMd5Keep = hash;
    console.log("Hash for single file:", hash);
    validateFile({
      case_id: props.case_id,
      file_name: file.name,
      file_md5: hash,
      chunks: 1,
      chunk:0,
      category: props.category,

      // name: file.name,
      // uid: file.uid,
      // md5: hash,
      // chunks: 1,
      // filter_type: "user_data_file",
    });
  };
  reader.onerror = (e) => {
    console.error("Error reading file for MD5:", e);
  };
};

//分块上传
const splitUpload = async (file, onProgress) => {
  console.log("Splitting");
  const chunks = Math.ceil(file.size / state.eachSize);
  state.chunksKeep = chunks;
  const fileChunks = [];
  for (let i = 0; i < chunks; i++) {
    const start = i * state.eachSize;
    const end =
      start + state.eachSize >= file.size ? file.size : start + state.eachSize;
    fileChunks.push(file.slice(start, end));
  }
  state.fileChunksKeep = fileChunks;

  console.log("File chunks split complete", fileChunks);

  state.showProgress = true;
  let currentChunk = 0;

  for (const chunk of fileChunks) {
    await postFile(
      {
        file: chunk,
        //   uid: file.uid,
        chunk: currentChunk,
        // chunks: chunks,
        //   eachSize: state.eachSize,
        file_name:file.name,
        //   fullSize: file.size,
        //   chunked: true,
      },
      onProgress
    );

    currentChunk++;
    state.progress = Math.floor((currentChunk / chunks) * 100);
  }

  const spark = new SparkMD5.ArrayBuffer();
  for (const chunk of fileChunks) {
    const reader = new FileReader();
    await new Promise((resolve, reject) => {
      console.log(spark);
      reader.onload = function () {
        spark.append(reader.result);
        resolve();
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(chunk);
    });
  }
  console.log(spark);
  const finalMD5 = spark.end();
  state.fileMd5Keep = finalMD5;
  console.log("Final MD5 for chunked file:", finalMD5);

  await validateFile({
    case_id: props.case_id,
    file_name: file.name,
    file_md5: finalMD5,
    chunks: chunks,
    category: props.category,
  });

  state.showProgress = false;
  state.progress = 0;
};

const postFile = async (params, onProgress) => {

  const formData = new FormData();
  formData.append("file", params.file);
  // formData.append("uid", params.uid);
  formData.append("chunk", params.chunk);
  // formData.append("chunks", params.chunks);
  formData.append("file_name", params.file_name);
  console.log(params.file_name);  
  console.log(formData.get('file_name'))
  // formData.append("fullSize", params.fullSize);
  // formData.append("chunked", params.chunked ? "true" : "false");
  formData.append("case_id", props.case_id);
  formData.append("category", props.category);

  const config = {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      onProgress({ percent: percentCompleted });
    },
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": userStore.token,
    },
  };

  try {
    const response = await axios.post(
      "/api/disease/addMediaChunk",
      formData,
      config
    );
    console.log("Upload response:", response.data);
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
};

const validateFile = async (params) => {
  const formData = new FormData();
  formData.append("file_md5",params.file_md5);
  formData.append("chunks", params.chunks);
  formData.append("file_name", params.file_name);
  formData.append("case_id", params.case_id);
  formData.append("category", params.category);
  const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": userStore.token,
      },
    };
  try {
    // console.log(111);
    const response = await axios.post("/api/disease/checkChunk", formData, config);
    console.log("Upload response:", response.data);
    console.log(response.data.code);
    console.log(response.status);
    if (response.data.code === -2) {
      console.log("Resuming upload for failed chunks");
      againSplitUpload(state.fileKeep, response.data.error_file);
    } else if (response.data.code === 1) {
      emit("upload_state","ok")
      console.log(emit);
      ElMessage({
        message: "上传成功",
        type: "success",
      });
      state.showProgress = false;
      state.progress = 0;
    } else {
      ElMessage.error(response.data.message);
    }
  } catch (error) {
    console.error("Validation error:", error);
  }
};

//断点续传
const againSplitUpload = async (file, errorChunks) => {
  for (const chunkIndex of errorChunks) {
    const chunk = state.fileChunksKeep[chunkIndex];
    await postFile(
      {
        file: chunk,
        // uid: file.uid,
        chunk: chunkIndex,
        chunks: state.chunksKeep,
        // eachSize: state.eachSize,
        // fileName: file.name,
        // fullSize: file.size,
        // chunked: true,
      },
      (e) => console.log("Retry progress:", e.percent)
    );
  }
  ElMessage({
    message: "重传完成！",
    type: "info",
  });
};
</script>

<style scoped>
.loading {
  /* 页面灰色遮罩 */
}
.progress {
  position: relative;
  transform: translate(-50%, 0);
  margin-left: 50%;
  margin-top: 20px;
  margin-bottom: 20;
}
.el-dialog {
  position: relative;
  height: 500px;
}
.el-upload_text{
  width:30%;
  display: flex;
  justify-content: center;
  align-items:center
}

/deep/ .el-upload .el-upload-dragger {
    width: 70%;
    display:flex;
    justify-content: center;
}
</style>