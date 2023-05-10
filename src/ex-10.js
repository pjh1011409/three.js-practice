import * as THREE from 'three';
import { WEBGL } from './webgl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 무대(scene) , 조명(light), 카메라(camera), 바라보기(renderer)

if (WEBGL.isWebGLAvailable()) {
  const FogColor = 0x004fff;
  const objColor = 0xffffff;
  const FloorColor = 0x555555;

  //장면
  const scene = new THREE.Scene(); // 무대 생성
  scene.background = new THREE.Color(FloorColor);
  //   scene.fog = new THREE.Fog(FogColor, 2, 8);
  scene.fog = new THREE.FogExp2(FogColor, 0.2);

  //카메라
  const fov = 120;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 1);
  camera.position.x = 0.5;
  camera.position.y = 1;
  camera.position.z = 1.2;
  camera.lookAt(new THREE.Vector3(0, 0, 0));

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true, // 캔버스 배경 투명도 여부
    antialias: true, // 렌더링 된 이미지의 경계선 부드럽게.
  });

  renderer.setSize(window.innerWidth, window.innerHeight); // 사이즈 조절

  document.body.appendChild(renderer.domElement); // 화면에 문서 객체 출력

  renderer.shadowMap.enabled = true; // 물체그림자 on

  //OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 2; // 최소줌 설정
  controls.maxDistance = 4; // 최대줌 설정
  controls.maxPolarAngle = Math.PI / 2; // 최대각도 설정
  controls.update();

  // 박스 도형

  const geometry = new THREE.ConeGeometry(0.4, 0.7, 6);
  const material = new THREE.MeshStandardMaterial({
    color: objColor,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.rotation.y = 0;
  cube.position.y = 0;
  scene.add(cube);
  cube.castShadow = true;

  //바닥 추가
  const planeGeometry = new THREE.PlaneGeometry(30, 30, 1, 1);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: FloorColor });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.y = -0.5;
  scene.add(plane);
  plane.receiveShadow = true;

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffa500, 0.1);
  // scene.add(ambientLight);
  // ambientLight.castShadow = true;

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(-1, 1.2, 1.1);
  scene.add(directionalLight);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;

  function animate(time) {
    requestAnimationFrame(animate);

    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
  }
  animate();
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
