import * as THREE from "../node_modules/three/build/three.module.js";

// 무대(scene) , 조명(lignt) , 카메라(camera) , 바라보기 (renderer)

const scene = new THREE.Scene(); // 무대 생성

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer(); //  WebGL을 사용한 장면 표시
renderer.setSize(window.innerWidth, window.innerHeight); // 사이즈 조절
document.body.appendChild(renderer.domElement); // 화면에 문서 객체 출력

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);

scene.add(line); // 무대에 추가
renderer.render(scene, camera);

animate();
