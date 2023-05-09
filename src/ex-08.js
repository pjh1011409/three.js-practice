import * as THREE from 'three';
import { WEBGL } from './webgl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

// 무대(scene) , 조명(light), 카메라(camera), 바라보기(renderer)

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene(); // 무대 생성

  //카메라
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 3;
  camera.lookAt(0, 0, 0);

  // 렌더러
  const renderer = new THREE.WebGLRenderer({
    alpha: true, // 캔버스 배경 투명도 여부
    antialias: true, // 렌더링 된 이미지의 경계선 부드럽게.
  });
  renderer.setSize(window.innerWidth, window.innerHeight); // 사이즈 조절
  document.body.appendChild(renderer.domElement); // 화면에 문서 객체 출력

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.update();

  // 직사각형 빛 방출
  const recLight = new THREE.RectAreaLight(0xffffff, 2, 1, 1);
  recLight.position.set(0.5, 0.5, 1);
  recLight.lookAt(0, 0, 0);
  scene.add(recLight);
  // 빛
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // 전역 빛
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const objLoader = new OBJLoader();
  const mtlLoader = new MTLLoader();
  const OBJGroup = new THREE.Group();

  mtlLoader.load('../static/bugatti.mtl', (mtl) => {
    mtl.preload();
    objLoader.setMaterials(mtl);
  });

  // obj 파일 로드
  objLoader.load(
    '../static/bugatti.obj',
    (object) => {
      OBJGroup.add(object);
      OBJGroup.position.y = -0.8;
      scene.add(OBJGroup);
    },
    function (xhr) {
      const progress = (xhr.loaded, xhr.total) * 100 + '%';
      console.log(progress);
    },
    function (error) {
      console.log('An error happen');
    }
  );

  // Raycaster
  const raycaster = new THREE.Raycaster();

  function onMouseMove(e) {
    const mouse = {
      x: (e.clientX / renderer.domElement.clientWidth) * 2 - 1,
      y: -(e.clientY / renderer.domElement.clientHeight) * 2 + 1,
    };
    console.log(mouse.x, mouse.y);
  }

  function animate(time) {
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
