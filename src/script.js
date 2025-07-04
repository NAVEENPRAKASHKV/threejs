import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();
// Adding axes helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);
// creating the group
const group = new THREE.Group();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// scaling size of the cube
// cubeMesh.scale.set(3, 3, 1);

// creating more curbe
const cubeMesh_2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh_2.position.x = 3;

const cubeMesh_3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh_3.position.y = 2;
group.add(cubeMesh, cubeMesh_2, cubeMesh_3);
scene.add(group);

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

// animation
function animation() {
  cubeMesh.rotation.x += 0.005;
  cubeMesh_2.rotation.y += 0.005;
  cubeMesh_3.rotation.z += 0.005;
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
}
animation();
