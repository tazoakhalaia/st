import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Plane {
  private planeGeometry = new PlaneGeometry(30, 30);
  private _container = new Object3D();
  private loader = new GLTFLoader();
  private grassInstances: any[] = [];
  private _mixer: any;

  get container() {
    this.init();
    return this._container;
  }

  get mixer() {
    return this._mixer;
  }
  init() {
    this.createPlane();
    this.createGrass();
    console.log(this._container.children);

    window.addEventListener("click", () => {
      let character = this._container.getObjectByName("t-pose");
      if (character) this._container.remove(character);
    });
  }

  createPlane = () => {
    const planeMaterial = new MeshBasicMaterial({ color: "gray" });
    const plane = new Mesh(this.planeGeometry, planeMaterial);
    plane.material.side = DoubleSide;
    plane.rotation.x = -0.5 * Math.PI;
    this._container.add(plane);
  };

  createGrass = () => {
    this.loader.load("models/grass.glb", (model) => {
      const grassTemplate = model.scene;
      grassTemplate.scale.set(0.03, 0.03, 0.03);

      const gridSize = 35;
      const step = 1.44;

      for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
          const grassInstance = grassTemplate.clone();
          grassInstance.position.set(i * step - 25, 0, j * step - 25);
          this._container.add(grassInstance);
          this.grassInstances.push(grassInstance);
        }
      }
    });
  };
}
