<template>
  <div class="panorama">
    <canvas class="webgl"> </canvas>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted, reactive, onBeforeUnmount, ref } from "vue";
//导入three
import * as THREE from "three";
import { rooms } from "@/views/panorama/data.js";
//导入GLTFLoader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
//导入DRACOLoader，加载压缩gltf模型
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

let $router = useRouter();

const data = reactive({
  renderer: null,
  camera: null,
  scene: null,
  controls: null,
  cameraZAxis: 2,
  currentRoom: "",
  models: null,
});

const raycaster = new THREE.Raycaster();
//创建鼠标向量
const mouse = new THREE.Vector2();
const animationFrameID = ref(null);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};


function goVR(targetRoom) {
  $router.push({
    path: "/front/vr",
    query: {
      key: targetRoom,
    },
  });
}

function switchKey(room_key) {
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

const cleanup = () => {
  window.removeEventListener("mousemove", mouseMoveHandler);
  window.removeEventListener("click", clickHandler);
  window.removeEventListener("resize", resizeHandler);

  // Three.js资源清理
  data.scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.geometry.dispose();
      object.material.dispose();
    }
  });
  if (data.camera) {
    // 清理相机，如果需要的话
    cancelAnimationFrame(animationFrameID.value);
    data.scene.remove(data.camera);
  }
  if (data.renderer) {
    data.renderer.dispose();
  }
};

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
  camera.lookAt(0, 0, 0);
  data.camera = camera;
  return camera;
};

const initRenderer = () => {
  // 初始化渲染器
  const canvas = document.querySelector("canvas.webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // document.body.appendChild(renderer.domElement);
  data.renderer = renderer;
  return renderer;
};

function loadEnv(scene) {
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
}

function createScene() {
  const scene = new THREE.Scene();
  data.scene = scene;
  return scene;
} 

function makeTextSprite(room_name) {
  let canvas = document.createElement("canvas");
  let ctx = canvas.getContext("2d");
  //backgroundcolor
  ctx.fillStyle = "rgb(255,255,255)";
  //text
  ctx.font = "Bold 85px KaiTi";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgb(100, 183, 66)";
  ctx.fillText(room_name, ctx.canvas.width / 2, ctx.canvas.height / 2 + 10);
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  let spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
  });
  let sprite = new THREE.Sprite(spriteMaterial);
  return sprite;
}

function generateLabel(x, y, z, key) {
  let room_name = rooms.filter((room) => room.key === switchKey(key))[0].name;
  const label = makeTextSprite(room_name);
  if (key === "平面012") {
    label.position.set(x, y + 5, z - 15);
  } else {
    label.position.set(x, y + 5, z);
  }
  label.scale.set(4, 2.5, 1);
  label.name = switchKey(key);
  // console.log(room_name);
  return label;
}

let mouseMoveHandler, clickHandler, resizeHandler;

const initEvents = () => {
  mouseMoveHandler = function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };
  clickHandler = function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, data.camera);
    const intersects = raycaster.intersectObjects(data.models);
    if (intersects.length > 0) {
      let room_key = switchKey(intersects[0].object.name);
      goVR(room_key);
    }
  };
  resizeHandler = function () {
    //监听窗口缩放并自动适应
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // 更新渲染
    data.renderer.setSize(sizes.width, sizes.height);
    data.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // 更新相机
    data.camera.aspect = sizes.width / sizes.height;
    data.camera.updateProjectionMatrix();
  };
  window.addEventListener("mousemove", mouseMoveHandler);
  window.addEventListener("click", clickHandler);
  window.addEventListener("resize", resizeHandler);
};

const initScene = () => {
  // 创建场景
  let scene = createScene();
  // 初始化渲染器
  let renderer = initRenderer();
  //创建相机
  let camera = initCamera();

  //导入模型
  //设置GLTFLoader
  const loader = new GLTFLoader();
  const dracoloader = new DRACOLoader();
  dracoloader.setDecoderPath("/draco/");
  dracoloader.setDecoderConfig({type : "js"});
  loader.setDRACOLoader(dracoloader);
  dracoloader.preload();
  let models = [];
  loader.load("/assets/pet-hospital_compressed_2.glb", (gltf) => {
    gltf.scene.traverse(function (child) {
      // console.log(child.name,child.position);
      if (child.isMesh && child.name !== "平面") {
        models.push(child);
        scene.add(
          generateLabel(
            child.position.x,
            child.position.y,
            child.position.z,
            child.name
          )
        );
      }
    });
    scene.add(gltf.scene);
  });
  data.models = models;

  loadEnv(data.scene);

  initEvents();

  //添加环境光
  let alight = new THREE.AmbientLight(0xccbbff);
  alight.intensity = 0.8;
  data.scene.add(alight);
  //渲染
  let hoveredColor = 0x00ff00;
  let INTERSECTED = null;
  let originalMaterial = null;
  let selectedMaterial = null;
  function render() {
    animationFrameID.value = requestAnimationFrame(render);
    //通过相机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);
    //获取射线的交点
    const intersects = raycaster.intersectObjects(models); //此处models表示gltf模型中被存储的mesh对象
    if (intersects.length > 0) {
      //选中
      // console.log(intersects[0].object.name);
      if (intersects[0].object.name === "平面") {
        return;
      }
      if (INTERSECTED != intersects[0].object) {
        //当前射线指向的不是已选中的对象
        if (INTERSECTED !== null && originalMaterial !== null) {
          //已有选中的对象则复原颜色
          INTERSECTED.material = originalMaterial;
        }
        INTERSECTED = intersects[0].object; //设定当前选中对象为INTERSECTED
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

onBeforeUnmount(() => {
  cleanup();
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
}
</style>
