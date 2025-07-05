import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();
// Adding axes helper
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

const cubeMaterial = new THREE.MeshLambertMaterial();
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cubeMesh);
cubeMaterial.transparent = true;
cubeMaterial.opacity = 0.5;

// creating second object
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const planeMaterial = new THREE.MeshLambertMaterial({
  side: THREE.DoubleSide,
});
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(planeMesh);
planeMesh.position.z = 2;

// Adding light source to  the scene
const ambientlight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientlight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(2, 2, 2);
scene.add(pointLight);

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
  planeMesh.rotation.z += 0.01; // Rotate the mesh, not geometry
  cubeMesh.rotation.x += 0.01; // Same here

  controls.update(); // For damping effect
  renderer.render(scene, camera);
  window.requestAnimationFrame(animation);
}

animation();
