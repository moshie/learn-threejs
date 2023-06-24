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
 * Materials
 */
const flatMaterial = new THREE.MeshStandardMaterial({
  color: '#fff',
});
const shinyMaterial = new THREE.MeshStandardMaterial({
  color: '#fff',
  roughness: 0.4,
});

/**
 * Geometry
 */
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 20, 20),
  shinyMaterial
);
sphere.position.y = 1;
sphere.castShadow = true;
scene.add(sphere);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), flatMaterial);
plane.rotateX(-(Math.PI / 2));
plane.receiveShadow = true;
scene.add(plane);

const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.4, 0.15, 30, 20),
  shinyMaterial
);
torusKnot.position.x = 2;
torusKnot.position.y = 1;
torusKnot.castShadow = true;
scene.add(torusKnot);

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2), shinyMaterial);
torus.position.x = -2;
torus.position.y = 1;
torus.castShadow = true;
scene.add(torus);

/**
 * Light
 */
const ambientLight = new THREE.AmbientLight('white', 0.5);

const light = new THREE.PointLight('white', 0.5);
light.castShadow = true;
light.position.set(2, 3, 4);

scene.add(ambientLight, light);

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

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);

  stats.end();
}

animate();
