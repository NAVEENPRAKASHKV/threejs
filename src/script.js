import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();
// Adding axes helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
// creating the group
// const group = new THREE.Group();

// add objects to the scene
// buffer geometry
// const vertex = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);
// const bufferAttribute = new THREE.BufferAttribute(vertex, 3);
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute("position", bufferAttribute);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMaterial.transparent = true;
cubeMaterial.opacity = 0.5;
// creating second object

const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: "blue",
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
planeMesh.position.z = 2;

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

function animation() {
  planeGeometry.rotateZ(0.01);
  cubeGeometry.rotateX(0.01);
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
}
animation();
