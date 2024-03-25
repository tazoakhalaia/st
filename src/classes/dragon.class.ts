import { Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Dragon {
  private _container = new Object3D();
  private _GLTFLoader = new GLTFLoader();
  private _dragon: any;
  get container() {
    this.init()
    return this._container;
  }
  init() {
    this.createDragon()
  }
  createDragon() {
    this._GLTFLoader.load("models/dragon.glb", (model) => {
      this._dragon = model.scene;
      this._dragon.scale.set(0.1,0.1,0.1)
      this._container.add(this._dragon);
    });
  }
}
