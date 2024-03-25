import { AnimationMixer, Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class Dragon {
  private _container = new Object3D();
  private _GLTFLoader = new GLTFLoader();
  private _dragon: any;
  private _animation: any;
  get container() {
    this.init();
    return this._container;
  }
  get animation() {
    return this._animation;
  }
  init() {
    this.createDragon();
  }
  createDragon() {
    this._GLTFLoader.load("models/silver_dragonkin_mir4.glb", (model) => {
      this._dragon = model.scene;
      this._animation = new AnimationMixer(this._dragon);
      if (model.animations.length > 0) {
        const action = this._animation.clipAction(model.animations[0]);
        action.play();
      }
      this._dragon.scale.set(0.5, 0.5, 0.5);
      this._container.add(this._dragon);
    });
  }
}
