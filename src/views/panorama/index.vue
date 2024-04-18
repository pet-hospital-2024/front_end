<template>
  <div class="panorama">
    <canvas class="webgl"> </canvas>
    <!-- <p style="float:right">hello</p> -->
    <pullUpMenu/>
    <learnItem/>
  </div>
</template>

<script setup>
import { onMounted, reactive, onBeforeUnmount, computed } from "vue";
//导入three
import * as THREE from "three";
import { Vector3 } from "three";
//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
//导入gui管理工具lil.gui
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
//导入GLTFLoader
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
//导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
//导入tween
import { Tween } from "three/examples/jsm/libs/tween.module.js";
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
  currentRoom: "reception-desk",
});

const rooms = [
  {
    name: "前台",
    key: "平面012",
    map: new URL("/assets/reception-desk.jpg", import.meta.url)
      .href,
    showSwitch: true,
    position: new Vector3(30, 0, -50),
    interactivePoints: [],
  },
  {
    name: "诊室",
    key: "平面004", //005
    map: new URL("/assets/consulting-room.jpg", import.meta.url)
      .href,
    showSwitch: true,
    position: new Vector3(20, 0, -50),
    //每个房间的交互点
    interactivePoints: [
      {
        key: "", //交互点的key
        value: "", //交互点名称
        description: "", //交互点描述
        cover: new URL("", import.meta.url).href, //交互点的图标
        position: new Vector3(-6, 2, -8), //交互点的位置
      },
      // ../assets/images/map/objects/.jpg
      {
        key: "",
        value: "",
        description: "",
        cover: new URL("", import.meta.url).href,
        position: new Vector3(-12, 4, 9),
      },
    ],
  },
  {
    //test
    name: "手术室",
    key: "平面011",
    map: new URL("/assets/surgery-4k.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(10, 0, -50),
    interactivePoints: [
      {
        key: "opertating-table",
        value: "手术台",
        description: "",
        cover: new URL("/assets/images/map/objects/.jpg", import.meta.url).href,
        position: new Vector3(-38, 2, -14),
      },
    ],
  },
  {
    name: "病房",
    key: "平面001", //9、10、8
    map: new URL("/assets/ward.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(0, 0, -50),
    interactivePoints: [
      {
        key: "",
        value: "",
        description: "",
        cover: new URL("../assets/images/map/objects/.png", import.meta.url)
          .href,
        position: new Vector3(80, 4, 9),
      },
    ],
  },
  {
    name: "CT",
    key: "平面003",
    map: new URL("/assets/surgery-4k.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(-10, 0, -50),
    interactivePoints: [],
  },
  {
    name: "B超",
    key: "平面006",
    map: new URL("/assets/surgery-4k.jpg", import.meta.url).href,//b-ultra
    showSwitch: true,
    position: new Vector3(-20, 0, -50),
    interactivePoints: [],
  },
  {
    name: "病案室",
    key: "平面002",
    map: new URL("/assets/reception-desk.jpg", import.meta.url).href,//case-room
    showSwitch: true,
    position: new Vector3(-30, 0, -50),
    interactivePoints: [],
  },
  {
    name: "药房",
    key: "平面007",
    map: new URL("/assets/consulting-room.jpg", import.meta.url).href,
    showSwitch: true,
    position: new Vector3(-40, 0, -50),
    interactivePoints: [],
  },
];

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

const initScene = () => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  // 初始化渲染器
  const canvas = document.querySelector("canvas.webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // document.body.appendChild(renderer.domElement);
  data.renderer = renderer;
  // 初始化场景
  const scene = new THREE.Scene();
  data.scene = scene;
  //创建LoadingManager
  const loadingManager = new THREE.LoadingManager();
  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 25;
  camera.position.z = -30;
  data.camera = camera;

  //设置相机视角
  // camera.lookAt(1, 0, 0);

  //设置GLTFLoader
  const loader = new GLTFLoader(/* loadingManager */);
  loader.load("/assets/pet-hospital-1.glb", (gltf) => {
    gltf.scene.traverse(function (child) {
      // console.log(child.name);
    });
    scene.add(gltf.scene);
    // console.log(gltf);
  });

  //rgbeloader加载hdr贴图,给gltf对象打光
  const rgbeLoader = new RGBELoader(/* loadingManager */);
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

  //添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  //阻尼
  controls.enableDamping = true;
  // controls.target.set(0,0,-50);
  controls.dampingFactor = 0.4;
  controls.enableZoom = false;
  data.controls = controls;

  //环境光
  // const ambientLight = new THREE.AmbientLight(0xc0c0c0, 1.5);
  // ambientLight.visible = true;
  // scene.add(ambientLight);

  // //创建几何体
  // let picList = ["px", "nx", "py", "ny", "pz", "nz"]; //right,left,bottom,top,front,back
  // //surgery room
  // const geometry = new THREE.BoxGeometry(1, 1, 1);
  // //cosnulting room
  // // const geometry1 = new THREE.BoxGeometry(1, 1, 1);
  // // const material = new THREE.MeshBasicMaterial({color: 0xff0000});
  // let boxMaterials = [];
  // picList.forEach((item) => {
  //   // console.log(item);
  //   let texture = new THREE.TextureLoader(/* loadingManager */).load(
  //     `image/surgery/${item}.png`
  //   );
  //   boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }));
  // });

  // const cube = new THREE.Mesh(geometry, boxMaterials);
  // // const cube2 = new THREE.Mesh(geometry, boxMaterials);
  // // cube2.position.x = 1;
  // cube.geometry.scale(1, 1, -1);
  // // cube2.geometry.scale(1, 1, -1);
  // cube.position.set(0, 0, -50);
  // scene.add(cube);
  
  const textLoader = new THREE.TextureLoader();

// 创建空间
const createRoom = (key, position, map , name) => {
  const geometry = new THREE.SphereGeometry(4.9,256, 256);
  geometry.scale(1, 1, -1);
  const material = new THREE.MeshBasicMaterial({
    map: textLoader.load(map),
    side: THREE.DoubleSide,
  });
  const room = new THREE.Mesh(geometry, material);
  room.name = name;
  room.key = key;
  room.position.set(position.x, position.y, position.z);
  // room.rotation.y = Math.PI / 2;
  scene.add(room);
  return room;
};

// 创建网格对象
rooms.map((item) => {
  const room = createRoom(item.key, item.position, item.map, item.name);
  // console.log(room.name);
  return room;
});

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
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      switch_room(intersects[0].object.name); //“平面001”
      
    }
  });
  //添加世界坐标辅助器
  // const axesHelper = new THREE.AxesHelper(50);
  // scene.add(axesHelper);

  //渲染
  let hoveredColor = 0xf3f9f1;
  let INTERSECTED = null;
  let originalMaterial = null;
  let selectedMaterial = null;
  function render() {
    requestAnimationFrame(render);
    controls.update();

    //通过相机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);
    //获取射线的交点
    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      //选中
      // console.log(intersects[0].object.name);
      switch(intersects[0].object.name){
        case"平面":
        case"前台":
        case"诊室":
        case"手术室":
        case"病房":
        case"CT":
        case"B超":
        case"病案室":
        case"药房":
        return;
      }
      if (INTERSECTED != intersects[0].object) {
        //当前射线指向的不是已选中的对象
        if (INTERSECTED !== null && originalMaterial !== null) {
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

function switch_room(room_name) {
  switch(room_name){
        case"平面":
        case"前台":
        case"诊室":
        case"手术室":
        case"病房":
        case"CT":
        case"B超":
        case"病案室":
        case"药房":
        return;
      }
  console.log(room_name+"clicked");
  switch(room_name) {
    case "平面005":
      room_name = "平面004";
      break;
    case "平面008":
    case "平面009":
    case "平面010":
      room_name = "平面001";
      break;
  }
  const room = rooms.filter((item) => item.key === room_name)[0];
  if (data.camera) {
    const x = room.position.x;
    const y = room.position.y;
    const z = room.position.z;
    Animations.animateCamera(
      data.camera,
      data.controls,
      { x, y, z: data.cameraZAxis },
      { x, y, z },
      1600,
      () => {}
    );
    data.controls.update();
  }
  // await sleep(1600);
  data.currentRoom = room.key;
}
onMounted(() => {
  initScene();
});
</script>

<style scoped>
.webgl {
  background-color: azure;
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
</style>
