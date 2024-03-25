import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
} from "three";

export class Plane {
  private planeGeometry = new PlaneGeometry(30, 30);
  private _container = new Object3D();
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
}
