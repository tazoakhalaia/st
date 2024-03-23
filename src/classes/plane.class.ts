import {
  AmbientLight,
  AnimationMixer,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { FBXLoader } from "three/examples/jsm/Addons.js";

export class Plane {
  private planeGeometry = new PlaneGeometry(50, 50);
  private _container = new Object3D();
  private loader = new GLTFLoader();
  private fxbLoader = new FBXLoader();
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
    this.createAmbientLight();
    this.createCharacter();
  }

  createPlane = () => {
    const planeMaterial = new MeshBasicMaterial({ color: "gray" });
    const plane = new Mesh(this.planeGeometry, planeMaterial);
    plane.material.side = DoubleSide;
    plane.rotation.x = -0.5 * Math.PI;
    this._container.add(plane);
  };

  createAmbientLight = () => {
    const direct = new DirectionalLight("white", 10);
    const ambient = new AmbientLight("white", 0.5);
    this._container.add(ambient, direct);
  };

  createCharacter = () => {
    this.fxbLoader.load("models/character.fbx", (model) => {
      const character = model;
      this._mixer = new AnimationMixer(character);
      const action = this._mixer.clipAction(model.animations[0]);
      action.play();
      character.scale.set(0.03, 0.03, 0.03);
      this._container.add(character);
    });
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
