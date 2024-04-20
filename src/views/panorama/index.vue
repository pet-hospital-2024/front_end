<template>
  <div class="panorama">
    <canvas class="webgl"> </canvas>
  </div>
</template>

<script setup>
import { useRouter,useRoute } from "vue-router";
import { onMounted, reactive, onBeforeUnmount, computed } from "vue";
//导入three
import * as THREE from "three";
import { rooms } from "@/views/panorama/data.js";
//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//导入gui管理工具lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
//导入GLTFLoader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
//导入tween
import * as TWEEN from "@tweenjs/tween.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import Animations from "@/utils/animations.js";

import pullUpMenu from "@/components/pullUpMenu/index.vue"; 
import learnItem  from "@/components/learnItem/index.vue";

const data = reactive({
  renderer: null,
  camera: null,
  scene: null,
  controls: null,
  cameraZAxis: 2,
  currentRoom: "",
});

let $router = useRouter();
function goVR(targetRoom) {
  // createScene();

  $router.push({
    path: "/front/vr",
    query: {
      key: targetRoom,
    },
  });
}

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};


function switchKey(room_key){
  switch (room_key) {
        case "平面005":
          room_key = "平面004";
          break;
        case "平面008":
        case "平面009":
        case "平面010":
          room_key = "平面001";
          break;
      }
      return room_key;
}

const initCamera = () => {
  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 25;
  camera.position.z = -30;
  // data.scene.add(camera);
  data.camera = camera;
};

const initRenderer = () => {
  // 初始化渲染器
  const canvas = document.querySelector("canvas.webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // document.body.appendChild(renderer.domElement);
  data.renderer = renderer;
};

function loadModel(scene) {
  //设置GLTFLoader
  const loader = new GLTFLoader();
  loader.load("/assets/pet-hospital-1.glb", (gltf) => {
    // gltf.scene.traverse(function (child) {
    //   // console.log(child.name);
    // });
    scene.add(gltf.scene);
    // console.log(gltf);
  });
}

function loadEnv(scene) {
  //rgbeloader加载hdr贴图,给gltf对象打光
  const rgbeLoader = new RGBELoader();
  rgbeLoader.loadAsync("/assets/surgery_4k.hdr").then((envMap) => {
    //球面全景图映射
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    //设置背景贴图
    scene.background = envMap;
    scene.backgroundBlurriness = 0.5; //模糊度
    scene.backgroundIntensity = 0.5; //透明度
    //设置环境贴图（提供环境光）
    scene.environment = envMap;
  });
}
// // 获取交互点的信息
// const interactivePoints = computed(() => {
//   const res = [];
//   rooms.forEach((room) => {
//     if (room.interactivePoints && room.interactivePoints.length > 0) {
//       room.interactivePoints.forEach((point) => {
//         point = {
//           room: room.key,
//           ...point,
//         };
//         res.push(point);
//       });
//     }
//   });
//   return res;
// });

function createScene() {
  const scene = new THREE.Scene();
  data.scene = scene;
}

function makeTextSprite(room_name){
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  //backgroundcolor
  ctx.fillStyle = "rgb(255,255,255)";
  //text
  ctx.font = "Bold 80px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgb(125, 218, 88)"
  ctx.fillText(room_name, ctx.canvas.width / 2, ctx.canvas.height / 2 + 10);
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  let spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
  });
  let sprite = new THREE.Sprite(spriteMaterial);
  return sprite;
}

function generateLabel(x,y,z,key){
  let room_name = rooms.filter((room) => room.key === switchKey(key))[0].name;
  const spriteMaterial = new THREE.SpriteMaterial({
    color: 0xffffff,// 0x87D05D,
    transparent: true,
    opacity: 0.5,
  });
  const label =  makeTextSprite(room_name);//new THREE.Sprite(spriteMaterial);
  if(key === "平面012"){
    label.position.set(x,y+5,z-15);
  }else{
    label.position.set(x, y+5, z);
  }
  label.scale.set(4, 2.5, 1);
  label.name = switchKey(key);
  // console.log(room_name);
  return label;
}

const initScene = () => {
  // 创建场景
  // createScene();
  const scene = new THREE.Scene();
  data.scene = scene;
  // console.log("Scene created", data);
  // 初始化渲染器
  // initRenderer();
  // 初始化渲染器
  const canvas = document.querySelector("canvas.webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // document.body.appendChild(renderer.domElement);
  data.renderer = renderer;
  // console.log("renderer initialized", data);

  // initCamera();
  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  // camera.position.x = -5;
  camera.position.y = 25;
  camera.position.z = -30;
  // data.scene.add(camera);
  //设置相机视角
  camera.lookAt(0, 0, 0);
  data.camera = camera;
  // console.log("camera initialized", data);

  //导入模型
  // loadModel(data.scene);
  //设置GLTFLoader
  const loader = new GLTFLoader();
  let models = [];
  loader.load("/assets/pet-hospital-1.glb", (gltf) => {
    gltf.scene.traverse(function (child) {
      // console.log(child.name,child.position);
      if(child.isMesh && child.name !== "平面"){
        models.push(child);
        scene.add(generateLabel(child.position.x,child.position.y,child.position.z,child.name));//positiony
      }
    });
    scene.add(gltf.scene);
    // console.log(gltf);
  });
  // console.log("model loaded", data);

  //导入背景
  //rgbeloader加载hdr贴图,给gltf对象打光
  const rgbeLoader = new RGBELoader();
  rgbeLoader.loadAsync("/assets/background_2.hdr").then((envMap) => {
    //球面全景图映射
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    //设置背景贴图
    scene.background = envMap;
    scene.backgroundBlurriness = 0.5; //模糊度
    scene.backgroundIntensity = 0.5; //透明度
    //设置环境贴图（提供环境光）
    scene.environment = envMap;
  });
  // console.log("background loaded", data);
  // loadEnv(data.scene);

  //环境光
  // const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
  // ambientLight.visible = true;
  // scene.add(ambientLight);

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

  const raycaster = new THREE.Raycaster();
  //创建鼠标向量
  const mouse = new THREE.Vector2();

  window.addEventListener("mousemove", onDocumentMouseMove, false);
  function onDocumentMouseMove(e) {
    // console.log(e.clientX,e.clientY);
    // e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  }
  window.addEventListener("click", (e) => {
    // console.log(e.clientX,e.clientY);
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);//此处scene.children可能可以换一下
    if (intersects.length > 0) {
      let room_key = switchKey(intersects[0].object.name);
      // if(room_key !== "平面")
      goVR(room_key); //跳转到指定房间key
    }
  });
  //添加世界坐标辅助器
  // const axesHelper = new THREE.AxesHelper(50);
  // scene.add(axesHelper);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  // controls.update();
  // scene.add(controls);
  //渲染
  let hoveredColor = 0x00ff00;
  let INTERSECTED = null;
  let originalMaterial = null;
  let selectedMaterial = null;
  function render() {
    requestAnimationFrame(render);
    controls.update();
    //TWEEN.update();
    //通过相机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);
    //获取射线的交点
    const intersects = raycaster.intersectObjects(models);//此处models表示gltf模型中的所有mesh对象, 紧接着的参数如果为true则表明被拾取到的元素如果有子元素也会被拾取到
    if (intersects.length > 0 ) {//这段原本放在括号中对scene.children中的mesh对象进行拾取：&& intersects[0].object.isMesh
      //选中
      // console.log(intersects[0].object.name);
      if(intersects[0].object.name === "平面"){
        return;
      }
      if (INTERSECTED != intersects[0].object) {
        //当前射线指向的不是已选中的对象
        if (INTERSECTED !== null && originalMaterial !== null ) {
          //已有选中的对象则复原颜色
          INTERSECTED.material = originalMaterial;
        }
        INTERSECTED = intersects[0].object; //设定当前选中对象为INTERSECTED
        // console.log(INTERSECTED.material);
        if (originalMaterial === null) {
          originalMaterial = INTERSECTED.material.clone(); //克隆original对象材质
        }
        if (selectedMaterial === null) {
          selectedMaterial = originalMaterial.clone(); //克隆原始对象材质
          selectedMaterial.color.set(hoveredColor); //修改克隆材质的颜色
        }
        INTERSECTED.material = selectedMaterial; //修改当前选中对象的材质为改变后的材质
      }
    } else {
      //未选中
      if (INTERSECTED && originalMaterial !== null) {
        // 恢复之前选中物体的material
        INTERSECTED.material = originalMaterial;
      }
      INTERSECTED = null;
    }
    renderer.render(scene, camera);
  }
  render();
};

onMounted(() => {
  initScene();
});
</script>

<style scoped>
.webgl {
  background-color: azure;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
  /* z-index: -1; */
}
</style>
