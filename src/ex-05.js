import * as THREE from 'three';
import { WEBGL } from './webgl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 무대(scene) , 조명(light), 카메라(camera), 바라보기(renderer)

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene(); // 무대 생성
  scene.background = new THREE.Color(0xffffff);

  //카메라
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // 카메라 설정

  camera.position.z = 2; // 카메라 위치

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true, // 캔버스 배경 투명도 여부
    antialias: true, // 렌더링 된 이미지의 경계선 부드럽게.
  });

  renderer.setSize(window.innerWidth, window.innerHeight); // 사이즈 조절

  document.body.appendChild(renderer.domElement); // 화면에 문서 객체 출력

  // 카메라 이동
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.update();

  // 빛
  const pointLight = new THREE.PointLight(0xffffff, 1);
  pointLight.position.set(0, 2, 12);
  scene.add(pointLight);

  // 텍스처 추가
  const textureLoader = new THREE.TextureLoader();
  const textureBaseColor = textureLoader.load('../static/img/basecolor.jpg');
  const textureNormalMap = textureLoader.load('../static/img/normal.jpg');
  const textureHeightMap = textureLoader.load('../static/img/height.png');
  const textureRoughnessMap = textureLoader.load('../static/img/roughness.jpg');

  const geometry = new THREE.SphereGeometry(0.3, 32, 16);
  const material01 = new THREE.MeshStandardMaterial({ map: textureBaseColor });
  const obj01 = new THREE.Mesh(geometry, material01);
  obj01.position.x = -1.5;
  scene.add(obj01);

  const material02 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
  });
  const obj02 = new THREE.Mesh(geometry, material02);
  obj02.position.x = -0.5;
  scene.add(obj02);

  const material03 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.08,
  });
  const obj03 = new THREE.Mesh(geometry, material03);
  obj03.position.x = 0.5;
  scene.add(obj03);

  const material04 = new THREE.MeshStandardMaterial({
    map: textureBaseColor,
    normalMap: textureNormalMap,
    displacementMap: textureHeightMap,
    displacementScale: 0.08,
    roughnessMap: textureRoughnessMap,
    roughness: 0.8,
  });
  const obj04 = new THREE.Mesh(geometry, material04);
  obj04.position.x = 1.5;
  scene.add(obj04);

  function render(time) {
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
