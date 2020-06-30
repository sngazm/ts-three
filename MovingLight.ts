import * as THREE from "three";

export default class MovingLight extends THREE.PointLight {
  center: THREE.Vector3;
  radius: number;

  constructor(color?: string | number | THREE.Color, intensity?: number, distance?: number, decay?: number, options: {center: THREE.Vector3, radius: number}) {
    super(color, intensity, distance, decay);
    this.center = options.center;
    this.radius = options.radius
  }
  
  update(time: number) {
    this.position.x = this.center.x + this.radius * Math.sin(time)
    this.position.y = this.center.y
    this.position.z = this.center.z + this.radius * Math.cos(time)
  }
}