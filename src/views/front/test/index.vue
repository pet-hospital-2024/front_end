<template>
  <div class="container">
    <el-row>
      <el-col :span="18" style="background-color: rgb(255, 255, 200)">
        <div class="left">
          <div class="title">
            <p>考试名称</p>
          </div>
          <div class="paper">
            <div
              class="question"
              v-for="(type, index) in questionList"
            
            >
              <div class="questionTitle">

              </div>
              <ul>
                <li>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right">
          <div class="title">
            <p>测试详情</p>
          </div>
          <div class="state"></div>
          <div class="state"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
const questionList={
  
}
</script>

<style scoped lang="scss">
.left {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    width: 95%;
    height: 6vh;
    background-color: rgb(167, 223, 167);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .paper {
    background-color: rgb(150, 213, 255);
    height: 85vh;
    width: 95%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }

    .question {
      width: 95%;
      // height: 300px;
      background-color: #fff;
      margin-top: 30px;
    }
  }
}

.right{
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .title {
    width: 95%;
    height: 6vh;
    background-color: rgb(167, 223, 167);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .state{
    background-color: rgb(150, 213, 255);
    // height: 85vh;
    width: 95%;
    display: flex;
  }
}
</style>
