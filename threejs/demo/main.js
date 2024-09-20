import './style.css'
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 导入GUI
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
// 创建场景
const scene = new THREE.Scene();
// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 创建立方体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 设置材质为线框模式
material.wireframe = true
// 创建网格
const cube = new THREE.Mesh(geometry, material);
// 添加到场景
scene.add(cube);
// 设置相机位置
camera.position.z = 5;

// 添加坐标辅助
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 设置阻尼
controls.enableDamping = true;

// 创建背景
const bgTexture = new THREE.TextureLoader().load('./public/vite.svg');
scene.background = bgTexture;



function animate() {
  controls.update()
  requestAnimationFrame(animate);

  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  // 渲染场景
  renderer.render(scene, camera);
}

animate();

// 创建GUI
const gui = new GUI();
gui.add(cube.position, 'x', -3, 3, 0.01);
gui.add(cube.rotation, 'x', -3, 3, 0.01);
gui.add(material, 'wireframe');
gui.add(cube.material, 'color');
const colorParams = {
  cubeColor: '#00ff00'
}
gui.addColor(colorParams, 'cubeColor').onChange((value) => {
  cube.material.color.set(value);
})

window.addEventListener('resize', (e) => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
})

