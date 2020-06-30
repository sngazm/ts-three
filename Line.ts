import * as THREE from 'three';


// 今回は使わないけどせっかく作ったからおいとく
export default class Line extends THREE.Line {
  direction: THREE.Vector3;
  speed: number;
  geometry: THREE.BufferGeometry;
  head: THREE.Vector3;
  tail: THREE.Vector3;
  isLine: true;
  idNum: number;
  static count: number = 0;

  constructor(head: THREE.Vector3, tail: THREE.Vector3, segmentNum: number) {

    const geo = new THREE.BufferGeometry();
    const points = [];
    for (let i = 0; i <= segmentNum + 1; i++) {
      const p = new THREE.Vector3();
      p.lerpVectors(head, tail, i / (segmentNum + 1));
      points.push(p.x, p.y, p.z)
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(points, 3).setUsage(THREE.DynamicDrawUsage))

    const mat = new THREE.MeshBasicMaterial({
      color: 0xff0000
    });
    super(geo, mat)
    this.geometry = geo;
    this.head = head;
    this.tail = tail;
    this.direction = new Vector3().subVectors(tail, head).normalize()
    this.speed = 0.1;
    Line.count++;

    this.idNum = Line.count;
  }

  update(time) {
    const pos = this.geometry.getAttribute('position');
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, (noise.noise3D(pos.getX(i), pos.getZ(i), time / 2)) * 0.2)
    }
    // const randDir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize()
    // this.direction.addScaledVector(randDir, 3).normalize();
    // this.head.addScaledVector(this.direction, this.speed);
    // pos.setXYZ(0, this.head.x, this.head.y, this.head.z)

    // for (let i = 1; i < pos.count; i++) {
    //   const preVec = new THREE.Vector3(pos.getX(i - 1), pos.getY(i - 1), pos.getZ(i - 1));
    //   const now = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
    //   now.lerp(preVec, 0.2)
    //   pos.setXYZ(i, now.x, now.y, now.z);
    // }

    pos.needsUpdate = true;
  }
}