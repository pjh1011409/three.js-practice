import * as THREE from "../node_modules/three/build/three.module.js";

// 무대(scene) , 조명(lignt) , 카메라(camera) , 바라보기 (renderer)

const scene = new THREE.Scene(); // 무대 생성
const camera = new THREE.PerspectiveCamera( // 카메라 설정
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer(); //  WebGL을 사용한 장면 표시
renderer.setSize(window.innerWidth, window.innerHeight); // 사이즈 조절
document.body.appendChild(renderer.domElement); // 화면에 문서 객체 출력

const geometry = new THREE.DodecahedronGeometry(3);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 그리기 재료 (색상, 음영 지정...)
const cube = new THREE.Mesh(geometry, material); // 형상 + 재료
scene.add(cube); // 무대에 추가

camera.position.z = 5; // 카메라 위치

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();
