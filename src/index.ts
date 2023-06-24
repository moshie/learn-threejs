import * as THREE from 'three';
import * as dat from 'lil-gui';
import * as Stats from 'stats.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { viewportResizeHandler } from './viewportResizeHandler';

/**
 * Stats
 */
const stats = new Stats();

stats.showPanel(0);
document.body.appendChild(stats.dom);

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Axes Helper
 */
const helper = new THREE.AxesHelper();
scene.add(helper);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);
camera.position.set(0, 1.5, 3);
camera.lookAt(new THREE.Vector3(0, 0, 0));

/**
 * Geometry
 */
const SphereGeo = new THREE.SphereGeometry(0.5, 20, 20);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 'green',
});
const sphere = new THREE.Mesh(SphereGeo, sphereMaterial);
sphere.position.y = 0.5;
sphere.castShadow = true;
scene.add(sphere);

const planeGeo = new THREE.PlaneGeometry(4, 4);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: '#ccc',
});
const plane = new THREE.Mesh(planeGeo, planeMaterial);
plane.rotateX(-(Math.PI / 2));
plane.receiveShadow = true;
scene.add(plane);

/**
 * Light
 */
const light = new THREE.DirectionalLight();
light.castShadow = true;
light.position.y = 3;
light.position.x = 3;

scene.add(light);

/**
 * Resize Handler
 */
addEventListener('resize', viewportResizeHandler(camera, renderer));

/**
 * Orbit Controls
 */
const controls = new OrbitControls(camera, renderer.domElement);

/**
 * Animation Ticker
 */
function animate() {
  stats.begin();

  requestAnimationFrame(animate);

  controls.update();

  renderer.render(scene, camera);

  stats.end();
}

animate();
