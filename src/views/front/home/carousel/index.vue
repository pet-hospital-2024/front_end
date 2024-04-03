<template>
  <div class="carousel">
    <el-carousel height="77vh">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="../../../../assets/images/carousel1.jpg" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.carousel {
  img {
    width: 100%;
    height: 77vh;
  }
}
</style>
