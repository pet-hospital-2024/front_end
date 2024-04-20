<template>
  <div class = "container">
    <canvas class="webgl"> </canvas>
    <button id="tag" @click="goPanorama" style = "z-index: 10;">返回</button>
  </div>  
</template>

<script setup>
import { useRouter,useRoute} from "vue-router";
import {rooms} from "@/views/panorama/data.js"
import * as THREE from 'three';
//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted,reactive } from "vue";

const $route = useRoute();
const $router = useRouter();
let paramKey = $route.query.key;
const room = rooms.filter((item) => item.key === paramKey)[0];
const data = reactive({
  renderer: null,
  camera: null,
  scene: null,
  controls: null,
  cameraZAxis: 2,
  currentRoom: "",
});

data.currentRoom = room.name;

const goPanorama =() => {
  $router.push({path:"/front/panorama"});
};

const initCamera = () => {
  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1;
  camera.position.z = -1;
  // data.scene.add(camera);
  data.camera = camera;
  return camera;
};

const initRenderer = () => {
  // 初始化渲染器
  const canvas = document.querySelector("canvas.webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // document.body.appendChild(renderer.domElement);
  data.renderer = renderer;
  return renderer;
};

const initControls = (camera,renderer) => {
  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  //阻尼
  controls.enableDamping = true;
  controls.target.set(0,0,-5);
  controls.dampingFactor = 0.4;
  controls.enableZoom = false;
  controls.update();
  data.controls = controls;
  return controls;
}

function loadEnv(scene) {
    const envMap = new THREE.TextureLoader().load(room.map);
    //球面全景图映射
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    //设置背景贴图
    scene.background = envMap;
    //设置环境贴图（提供环境光）
    scene.environment = envMap;
    return scene;
}
function createScene() {
  const scene = new THREE.Scene();
  data.scene = scene;
  return scene;
}
const initScene = ()=>{
  const sizes ={
    width: window.innerWidth,
    height: window.innerHeight,
  };
  console.log(room);
  let scene = createScene();
  let camera = initCamera();
  let renderer = initRenderer();
  let controls = initControls(camera,renderer);
  loadEnv(scene);

  //监听窗口缩放并自动适应
    window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // 更新渲染
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // 更新相机
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
  });
  
  function render() {
    requestAnimationFrame(render);
    controls.update();
    renderer.render(scene, camera);
  }
  render();
}

onMounted(() => {
  initScene();
});

</script>

<style lang="scss">
.webgl{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>