import * as THREE from 'three';
import { WEBGL } from './webgl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 무대(scene) , 조명(light), 카메라(camera), 바라보기(renderer)

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene(); // 무대 생성
  scene.background = new THREE.Color(0xeeeeee);

  //카메라
  const fov = 120;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 1);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true, // 캔버스 배경 투명도 여부
    antialias: true, // 렌더링 된 이미지의 경계선 부드럽게.
  });

  renderer.setSize(window.innerWidth, window.innerHeight); // 사이즈 조절

  document.body.appendChild(renderer.domElement); // 화면에 문서 객체 출력

  // 박스 도형
  const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const material = new THREE.MeshStandardMaterial({
    color: 0xff7f00,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y = 0.5;
  scene.add(cube);

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffa500, 0.1);
  // scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 1, 1);
  // const dlhelper = new THREE.DirectionalLightHelper(directionalLight, 0.2, 0x000ff);
  // scene.add(dlhelper);
  // scene.add(directionalLight);

  const hemisphereLight = new THREE.HemisphereLight(0x0000ff, 0xff0000, 1);
  // scene.add(hemisphereLight);

  const pointLight = new THREE.PointLight(0xffffff, 1);
  scene.add(pointLight);

  function render(time) {
    renderer.render(scene, camera);
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
