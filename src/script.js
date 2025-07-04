import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();
// Adding axes helper
// const axesHelper = new THREE.AxesHelper(3);
// scene.add(axesHelper);
// creating the group
const group = new THREE.Group();

// add objects to the scene
const vertex = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
const bufferAttribute = new THREE.BufferAttribute(vertex, 3);
const geometry = new THREE.BufferGeometry();
geometry.setAttribute("position", bufferAttribute);

const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);

// scaling size of the cube
// cubeMesh.scale.set(3, 3, 1);

// creating more curbe
scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);
camera.position.z = 3;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

//orbit control
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;
controls.update();
console.log(window.devicePixelRatio);

// resize event listener
window.addEventListener("resize", () => {
  const aspectRatio = window.innerWidth / window.innerHeight;
  camera.aspect = aspectRatio;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
const clock = new THREE.Clock();
let prevTime = 0;

// animation
function animation() {
  // const curretTime = clock.getDelta();
  // const delta = curretTime - prevTime;
  // cubeMesh.rotation.x += delta;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
}
animation();
