let scene, camera, renderer, controls;
let model;

init();
animate();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const loader = new THREE.GLTFLoader();
  loader.load('toyota_supra_mk4.glb', function(gltf) {
    model = gltf.scene;
    scene.add(model);
  });

  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);


  controls = new THREE.OrbitControls(camera, renderer.domElement);

  window.addEventListener('keydown', function(event) {
    switch (event.key) {
      case 'ArrowUp':
        model.position.y += 0.1;
        break;
      case 'ArrowDown':
        model.position.y -= 0.1;
        break;
      case 'ArrowLeft':
        model.position.x -= 0.1;
        break;
      case 'ArrowRight':
        model.position.x += 0.1;
        break;
      case 'z':
        model.position.z -= 0.1;
        break;
      case 'Z':
        model.position.z += 0.1;
        break;
    }
  });

  camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
