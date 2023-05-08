import * as THREE from 'three';
import { WEBGL } from './webgl';

// 무대(scene) , 조명(light), 카메라(camera), 바라보기(renderer)

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene(); // 무대 생성
  scene.background = new THREE.Color(0x004ff);

  //카메라
  const camera = new THREE.PerspectiveCamera( // 카메라 설정
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.z = 2; // 카메라 위치

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true, // 캔버스 배경 투명도 여부
    antialias: true, // 렌더링 된 이미지의 경계선 부드럽게.
  });

  renderer.setSize(window.innerWidth, window.innerHeight); // 사이즈 조절

  document.body.appendChild(renderer.domElement); // 화면에 문서 객체 출력

  renderer.render(scene, camera);

  // 매쉬
  const geometry01 = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material01 = new THREE.MeshStandardMaterial({ color: 0x999999 });

  const obj01 = new THREE.Mesh(geometry01, material01);
  obj01.position.x = -1;
  scene.add(obj01);

  // 매쉬
  const geometry02 = new THREE.ConeGeometry(0.4, 0.7, 6);
  const material02 = new THREE.MeshStandardMaterial({ color: 0x999999 });
  const obj02 = new THREE.Mesh(geometry02, material02);
  scene.add(obj02);

  // 매쉬
  const geometry03 = new THREE.IcosahedronGeometry(0.4, 0);
  const material03 = new THREE.MeshStandardMaterial({ color: 0x999999 });
  const obj03 = new THREE.Mesh(geometry03, material03);
  obj03.position.x = 1;

  scene.add(obj03);

  function render(time) {
    time *= 0.0005; // convert time to seconds

    obj01.rotation.x = time;
    obj01.rotation.y = time;
    obj02.rotation.x = time;
    obj02.rotation.y = time;
    obj03.rotation.x = time;
    obj03.rotation.y = time;

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

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
