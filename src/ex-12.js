import * as THREE from 'three';
import { WEBGL } from './webgl';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene(); // 무대 생성
  scene.background = new THREE.Color(0xeeeeee);

  //카메라
  const fov = 50;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 1;
  const far = 4000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 20, 100);
  camera.lookAt(0, 0, 0);

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true, // 캔버스 배경 투명도 여부
    antialias: true, // 렌더링 된 이미지의 경계선 부드럽게.
  });
  renderer.setSize(window.innerWidth, window.innerHeight); // 사이즈 조절
  document.body.appendChild(renderer.domElement); // 화면에 문서 객체 출력

  //OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 20; // 최소줌 설정
  controls.maxDistance = 800; // 최대줌 설정
  controls.update();

  //HDR 로드
  const loader = new RGBELoader();
  console.log();
  loader.setDataType(THREE.UnsignedByteType);
  loader.load('', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
    //texture.dispose();
  });
  // 박스 도형

  const geometry = new THREE.TorusKnotGeometry(1, 0.3, 256, 64, 2, 3);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });

  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  function animate() {
    requestAnimationFrame(animate);
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
