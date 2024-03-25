import * as THREE from "three";
import { Plane } from "./plane.class";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { Dragon } from "./dragon.class";

export class GameScene {
  private plane = new Plane();
  private dragon =  new Dragon()
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  private renderer = new THREE.WebGLRenderer();
  private orbit = new OrbitControls(this.camera, this.renderer.domElement);

  init() {
    this.drawScene();
    this.animate();
    this.createLigth()
    this.scene.add(this.plane.container,this.dragon.container);
    window.addEventListener("resize", () => this.resize());
  }

  createLigth = () => {
    const direct = new THREE.DirectionalLight("white", 10);
    const ambient = new THREE.AmbientLight("white", 0.5);
    this.scene.add(ambient, direct);
  };


  drawScene() {
    this.scene.background = new THREE.Color("white");
    this.camera.position.set(-2, 8, 10);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.orbit.update();
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
