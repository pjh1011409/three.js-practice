import * as THREE from 'three';
import { WEBGL } from './webgl';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 무대(scene) , 조명(light), 카메라(camera), 바라보기(renderer)

if (WEBGL.isWebGLAvailable()) {
  //장면
  const scene = new THREE.Scene(); // 무대 생성
  scene.background = new THREE.Color(0xeeeeee);
  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

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

  const skyMaterialArray = [];
  const texture_ft = new THREE.TextureLoader().load('../static/img/arid_ft.jpg');
  const texture_bk = new THREE.TextureLoader().load('../static/img/arid_bk.jpg');
  const texture_up = new THREE.TextureLoader().load('../static/img/arid_up.jpg');
  const texture_dn = new THREE.TextureLoader().load('../static/img/arid_dn.jpg');
  const texture_rt = new THREE.TextureLoader().load('../static/img/arid_rt.jpg');
  const texture_lf = new THREE.TextureLoader().load('../static/img/arid_lf.jpg');

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_ft,
    })
  );
  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_bk,
    })
  );

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_up,
    })
  );

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_dn,
    })
  );

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_rt,
    })
  );

  skyMaterialArray.push(
    new THREE.MeshStandardMaterial({
      map: texture_lf,
    })
  );

  // 반복문
  for (let i = 0; i < 6; i++) {
    skyMaterialArray[i].side = THREE.BackSide;
  }

  // 박스 도형

  const geometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshStandardMaterial({
    color: 0x333333,
    // map: texture,
  });
  const sky = new THREE.Mesh(geometry, skyMaterialArray);
  scene.add(sky);

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
