import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

function createPlanet(radius, textureString) {
    const geo = new THREE.SphereGeometry(radius, 32, 16);
    const texture = textureLoader.load(textureString);
    const mat = new THREE.MeshStandardMaterial({ map: texture });
    return new THREE.Mesh(geo, mat);
}

function createStar(radius, textureString)
{
    const geo = new THREE.SphereGeometry(radius, 32, 16);
    const texture = textureLoader.load(textureString);
    const mat = new THREE.MeshBasicMaterial({ map: texture });
    return new THREE.Mesh(geo, mat);
}

const w = window.innerWidth;
const h = window.innerHeight;

const textureLoader = new THREE.TextureLoader();

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 100;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 12;

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);

const solarSystem = new THREE.Group();
scene.add(solarSystem);

const sun = createStar(2, "/sun.jpg");
solarSystem.add(sun);

const earthOrbit = new THREE.Group();
solarSystem.add(earthOrbit);

const earthSystem = new THREE.Group();
earthSystem.position.set(6, 0, 0);
earthOrbit.add(earthSystem);

const earth = createPlanet(1, "/earth.jpg");
earthSystem.add(earth);

const moonOrbit = new THREE.Group();
earthSystem.add(moonOrbit);

const moon = createPlanet(0.4, "/moon.jpg");
moon.position.set(2, 0, 0);
moonOrbit.add(moon);

const marsOrbit = new THREE.Group();
solarSystem.add(marsOrbit);

const marsSystem = new THREE.Group();
marsSystem.position.set(10, 0, 0);
marsOrbit.add(marsSystem);

const mars = createPlanet(0.7, "/mars.jpg");
marsSystem.add(mars);

const sunLight = new THREE.PointLight(0xffffff, 20, 100);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x222222, 1);
scene.add(ambientLight);

function animate(t) {
    requestAnimationFrame(animate);

    earthOrbit.rotation.y = t * 0.0001;

    earth.rotation.y = t * -0.0003;

    moonOrbit.rotation.y = t * 0.0012;

    marsOrbit.rotation.y = t * 0.00005;

    mars.rotation.y = t * 0.00005;

    renderer.render(scene, camera);
}

animate();