import * as THREE from 'three';
import { WEBGL } from './webgl';

// 무대(scene) , 조명(light), 카메라(camera), 바라보기(renderer)

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene(); // 무대 생성

  //카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // 카메라 설정

  camera.position.z = 3; // 카메라 위치

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true, // 캔버스 배경 투명도 여부
    antialias: true, // 렌더링 된 이미지의 경계선 부드럽게.
  });

  renderer.setSize(window.innerWidth, window.innerHeight); // 사이즈 조절

  document.body.appendChild(renderer.domElement); // 화면에 문서 객체 출력

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);

  // 도넛 모형
  const geometry = new THREE.TorusGeometry(0.3, 0.15, 16, 40);
  const material01 = new THREE.MeshBasicMaterial({ color: 0xff7f00 });
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.position.x = -2;
  scene.add(obj01);

  const material02 = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
    metalness: 0.9, // 금속 재질
    roughness: 0.5, // 거칠기 조절
    // wireframe: true, // 와이어프레임 여부
    // transparent: true, // 투명도 여부
    // opacity: 0.5, // 투명도 조절
  });
  const obj02 = new THREE.Mesh(geometry, material02);
  obj02.position.x = -1;
  scene.add(obj02);

  const material03 = new THREE.MeshPhysicalMaterial({
    color: 0xff7f00,
    clearcoat: 1,
    clearcoatRoughness: 0.2,
  });
  const obj03 = new THREE.Mesh(geometry, material03);
  obj03.position.x = 0;
  scene.add(obj03);

  const material04 = new THREE.MeshLambertMaterial({ color: 0xff7f00 });
  const obj04 = new THREE.Mesh(geometry, material04);
  obj04.position.x = 1;
  scene.add(obj04);

  const material05 = new THREE.MeshPhongMaterial({
    color: 0xff7f00,
    shininess: 300,
    specular: 0x004fff,
  });
  const obj05 = new THREE.Mesh(geometry, material05);
  obj05.position.x = 2;
  scene.add(obj05);

  function render(time) {
    time *= 0.0005; // convert time to seconds

    obj01.rotation.y = time;
    obj02.rotation.y = time;
    obj03.rotation.y = time;
    obj04.rotation.y = time;
    obj05.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  // 살재 그래픽 출력
  renderer.render(scene, camera);

  // 반응형 처리
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  window.addEventListener('resize', onWindowResize);
} else {
  var warning = WEBGL.getWebGLErrorMessage();
  document.body.appendChild(warning);
}
