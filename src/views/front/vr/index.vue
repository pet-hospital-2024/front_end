<template>
  <div class="container">
    <div class="title">
      <p>{{ data.currentRoom }}</p>
    </div>
    <canvas class="webgl"> </canvas>
    <div class="vr">
      <!-- 切换房间 -->
      <div class="switch">
        <span
          class="button"
          v-for="(room, index) of rooms"
          :key="index"
          @click="switchRoom(room)"
          v-show="data.currentRoom !== room.name"
        >
          <b class="text">{{ room.name }}</b>
          <i class="icon"></i>
        </span>
      </div>
    </div>
    <pullUpMenu />
    <learnItem v-if="useStore.itemVisibility"/>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { rooms } from "@/views/panorama/data.js";
import * as THREE from "three";
//导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {
  onMounted,
  reactive,
  computed,
  watch,
  onBeforeUnmount,
  ref,
} from "vue";
import pullUpMenu from "@/components/pullUpMenu/index.vue";
import learnItem from "@/components/learnItem/index.vue";
import usePanoramaStore from "@/store/front/panorama";

let useStore = usePanoramaStore();
const $route = useRoute();
const $router = useRouter();

const map = new Map([
  ["平面012", 6],
  ["平面004", 2],
  ["平面011", 5],
  ["平面001", 7],
  ["平面003", 8],
  ["平面006", 9],
  ["平面002", 1],
]);
let location_id = map.get($route.query.key);

let paramKey = computed(() => $route.query.key);
const room = computed(
  () => rooms.filter((item) => item.key === paramKey.value)[0]
);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let sprites = [];
const animationFrameID = ref(null);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const data = reactive({
  renderer: null,
  camera: null,
  scene: null,
  controls: null,
  cameraZAxis: 2,
  currentRoom: room.value.name,
});
data.currentRoom = room.value.name;

//实现paramKey更新后页面刷新
watch(paramKey, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    window.location.reload();
  }
});

//房间内跳转到别的房间
function switchRoom(target_room) {
  $router.push({
    path: "/front/vr",
    query: {
      key: target_room.key,
    },
  });
}

// 获取room交互点的信息
const interactivePoints = computed(() => {
  const res = [];
  rooms.forEach((room) => {
    if (room.interactivePoints && room.interactivePoints.length > 0) {
      room.interactivePoints.forEach((point) => {
        point = {
          room: room.name,
          ...point,
        };
        res.push(point);
      });
    }
  });
  return res;
});
//创建相机
const initCamera = () => {
  //创建相机
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.y = 1;
  data.camera = camera;
  return camera;
};
//创建渲染器
const initRenderer = () => {
  // 初始化渲染器
  const canvas = document.querySelector("canvas.webgl");
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // document.body.appendChild(renderer.domElement);
  data.renderer = renderer;
  return renderer;
};
//初始化轨道控制器
const initControls = (camera, renderer) => {
  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement);
  //阻尼
  controls.enableDamping = true;
  controls.target.set(0, 1, 0);
  controls.dampingFactor = 0.4;
  controls.minPolarAngle = Math.PI / 3;
  controls.maxPolarAngle = Math.PI / 2;
  controls.enableZoom = false;
  controls.update();
  data.controls = controls;
  return controls;
};
//加载房间背景
function loadEnv(scene) {
  const envMap = new THREE.TextureLoader().load(room.value.map);
  //球面全景图映射
  envMap.mapping = THREE.EquirectangularReflectionMapping;
  //设置背景贴图
  scene.background = envMap;
  //设置环境贴图（提供环境光）
  scene.environment = envMap;
  return scene;
}

//创建scene
function createScene() {
  const scene = new THREE.Scene();
  data.scene = scene;
  return scene;
}

// 创建sprite
function makeTextSprite(message, position, parameters) {
  if (parameters === undefined) parameters = {};
  let fontface = parameters.hasOwnProperty.call("fontface")
    ? parameters["fontface"]
    : "Arial";
  // 字体大小
  let fontsize = parameters.hasOwnProperty.call("fontsize")
    ? parameters["fontsize"]
    : 18;

  let color = parameters.hasOwnProperty.call("color")
    ? parameters["color"]
    : "rgba(70, 135, 61, 1.0)";
  // 边框厚度
  let borderThickness = parameters.hasOwnProperty.call("borderThickness")
    ? parameters["borderThickness"]
    : 1;
  // 边框颜色
  let borderColor = parameters.hasOwnProperty.call("borderColor")
    ? parameters["borderColor"]
    : {
        r: 183,
        g: 183,
        b: 183,
        a: 1.0,
      };
  // 背景颜色
  //rgb(218, 249, 214)
  let backgroundColor = parameters.hasOwnProperty.call("backgroundColor")
    ? parameters["backgroundColor"]
    : {
        r: 218,
        g: 249,
        b: 214,
        a: 1.0,
      };
  // 创建画布
  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  // 字体加粗
  context.font = "Bold " + fontsize + "px " + fontface;
  // 获取文字的大小数据，高度取决于文字的大小
  let metrics = context.measureText(message);
  let textWidth = metrics.width;
  // 背景颜色
  context.fillStyle =
    "rgba(" +
    backgroundColor.r +
    "," +
    backgroundColor.g +
    "," +
    backgroundColor.b +
    "," +
    backgroundColor.a +
    ")";
  // 边框的颜色
  context.strokeStyle =
    "rgba(" +
    borderColor.r +
    "," +
    borderColor.g +
    "," +
    borderColor.b +
    "," +
    borderColor.a +
    ")";
  context.lineWidth = borderThickness;
  // 绘制圆角矩形
  roundRect(
    context,
    borderThickness / 2,
    borderThickness / 2,
    textWidth + borderThickness,
    fontsize * 1.4 + borderThickness,
    6
  );
  // 字体颜色
  context.fillStyle = color;
  context.fillText(message, borderThickness, fontsize + borderThickness);
  // 画布内容用于纹理贴图
  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;
  let spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
  });
  let sprite = new THREE.Sprite(spriteMaterial);
  sprites.push(sprite);
  sprite.position.set(position.x, position.y, position.z);
  // 缩放比例
  sprite.scale.set(15, 8, 0);
  return sprite;
}

// 绘制圆角矩形
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function showPoints(room_name) {
  /* 根据room_name来获取到房间内的交互点 */
  //let points = [],sprite;
  // console.log("0",interactivePoints.value);
  interactivePoints.value.forEach((point) => {
    if (point.room === room_name) {
      // console.log("1",point.value);//exist
      data.scene.add(makeTextSprite(point.value, point.position));
      // sprite = makeTextSprite(point.value);
      // points.push(sprite);
      // sprite.position.set(point.position);
    }
  });

  // console.log(interactivePoints.value);//所有房间的interactivePoints信息
}
let clickHandler, resizeHandler;
const initEvents = () => {
  clickHandler = function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, data.camera);
    const intersects = raycaster.intersectObjects(sprites);
    // console.log("click", intersects[0]);
    if (intersects.length > 0) {
      useStore.itemVisibility = true;
      // console.log("click", intersects[0].texture);
      console.log(useStore.role_id, location_id);
      useStore.getLearnItem(location_id, useStore.role_id);
    }
  };
  resizeHandler = () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    // 更新渲染
    data.renderer.setSize(sizes.width, sizes.height);
    data.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // 更新相机
    data.camera.aspect = sizes.width / sizes.height;
    data.camera.updateProjectionMatrix();
  };
  //监听窗口缩放并自动适应
  window.addEventListener("resize", resizeHandler);
  window.addEventListener("click", clickHandler);
};

const cleanup = () => {
  window.removeEventListener("click", clickHandler);
  window.removeEventListener("resize", resizeHandler);

  // Three.js资源清理
  data.scene.traverse((object) => {
    if (object instanceof THREE.Mesh || object instanceof THREE.Sprite) {
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
  // data.scene.remove(data.camera);
};

const initScene = () => {
  let scene = createScene();
  let camera = initCamera();
  let renderer = initRenderer();
  let controls = initControls(camera, renderer);
  loadEnv(scene);
  showPoints(data.currentRoom);
  initEvents();
  //添加世界坐标辅助器
  // const axesHelper = new THREE.AxesHelper(50);
  // scene.add(axesHelper);

  function render() {
    animationFrameID.value = requestAnimationFrame(render);
    controls.update();
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

<style lang="scss" scoped>
@import url("@/style/keyframes.scss");

.container {
  font-family: Helvetica, Arial, sans-serif;
  .title{
    position: absolute;
    font-size: 24px;
    top:10vh;
    left: 49vw;
    z-index: 999;
    font-family: Georgia, "Times New Roman", Times, serif;
    // color: azure;
    background-color:rgba(255, 255, 255, 0.5);
    padding:5px 15px;
    border: 2px solid rgb(255, 255, 255);
    border-radius: 10px;
  }

  .webgl {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    outline: none;
  }

  .switch {
    position: fixed;
    left: 24px;
    top: 20%;
    z-index: 11;
    -webkit-animation: slideInRight 1s 0.3s;
    animation: slideInRight 1s 0.3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;

    .button {
      display: block;
      background: rgba(27, 25, 24, 0.5);
      border-radius: 12px;
      display: flex;
      align-items: center;
      padding: 12px 8px 12px 24px;
      -webkit-backdrop-filter: blur(4px);
      -moz-backdrop-filter: blur(4px);
      backdrop-filter: blur(4px);
      cursor: pointer;
      transition: all 0.25s ease-in-out;

      .text {
        color: rgba(255, 255, 255, 1);
        font-size: 24px;
        font-weight: 600;
      }

      &:not(:last-child) {
        margin-bottom: 20px;
      }

      .icon {
        display: inline-block;
        height: 30px;
        width: 30px;
        background: url("/assets/images/icon_arrow.png") no-repeat center;
        background-size: 100% 100%;
        transform: rotate(180deg);
        margin-left: 8px;
      }

      &:hover {
        background: rgba(27, 25, 24, 0.2);
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      }
    }
  }

}
</style>
