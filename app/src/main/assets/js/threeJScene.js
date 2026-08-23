const container = document.getElementById('container');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
scene.add(new THREE.AmbientLight(0xffffff, 0.85));
const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
dirLight.position.set(40, 80, 120);
scene.add(dirLight);
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
function updateLayout() {
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const aspect = width / height;
    camera.aspect = aspect;
    const baseWidth = 210;
    if (aspect < 1) {
        camera.position.set(0, 0, (baseWidth / aspect));
    } else {
        camera.position.set(0, 0, 270);
    }
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    controls.update();
}
window.addEventListener('resize', updateLayout);
updateLayout();
animate();
