import { Mesh, MeshBasicMaterial, Object3D, PlaneGeometry } from "three";

export class Plane {
  private planeGeometry = new PlaneGeometry(50, 50);
  private _container = new Object3D();
  get container() {
    this.init();
    return this._container;
  }
  init() {
    this.createPlane();
  }

  createPlane() {
    const planeMaterial = new MeshBasicMaterial({ color: "green" });
    const plane = new Mesh(this.planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    this._container.add(plane);
  }
}
