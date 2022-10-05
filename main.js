import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
})
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(50);

const gltfLoader = new GLTFLoader();
gltfLoader.load('bonut/bonut.glb', (gltf) => {
    const bonut = gltf.scene.children.find((child) => child.name === "donut");
    const icing = gltf.scene.children.find((child) => child.name === "icing");
    bonut.material = new THREE.MeshPhysicalMaterial({
        color: 0x6b4d34,
        roughness: 0.5,
    })
    icing.material = new THREE.MeshPhysicalMaterial({ 
        color: 0xdc6dde,
        roughness: 0.2,
    });
    bonut.scale.set( 10, 10, 10 );
    bonut.castShadow = true;
    bonut.receiveShadow = true;
    icing.scale.set( 10, 10, 10 );
    icing.castShadow = true;
    icing.receiveShadow = true;
    gltf.scene.children.forEach(child => {
        child.rotation.x = 0.75;
        child.rotation.z = 0.5;
    })
    scene.add( bonut, icing );
});

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20,20,20);
pointLight.castShadow = true;

const ambientLight = new THREE.AmbientLight(0xd8dff0);

scene.add(pointLight, ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);

function addstar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
    const star = new THREE.Mesh(geometry,material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 250 ) );

    star.position.set(x,y,z);
    scene.add(star);
}

Array(250).fill().forEach(addstar)

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    requestAnimationFrame( animate );
    
    scene.children.forEach( child => {
        child.rotation.y += 0.01;
    })

    controls.update();
    
    renderer.render( scene, camera );
}

animate();