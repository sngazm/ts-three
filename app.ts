import * as THREE from 'three' ;
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import { Vector3, Scene } from 'three';
import * as SimplexNoise from 'simplex-noise';
import Cell from './Cell';
import Grid from './Grid';
import MovingLight from './MovingLight';
const noise = new SimplexNoise()

class App {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  light: MovingLight;
  light2: MovingLight;
  clock: THREE.Clock;

  constructor() {
    // シーンの初期設定
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    this.camera.position.set(-0.53, 7, 7.2);
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
    
    // グリッドをついか
    const grid = new Grid(20,20);
    // めっちゃ違和感のある追加の仕方
    for (let i = 0; i < grid.rows; i++) {
      for (let j = 0; j < grid.columns; j++) {
        this.scene.add(grid.cells[i][j])
      }
    }

    // グリッドの大きさに合わせてカメラの向き変える
    const control = new OrbitControls(this.camera, this.renderer.domElement);
    control.target = grid.center;
    control.update();

    // グリッドの大きさに合わせてライトの動き変える
    this.light = new MovingLight(0xf90000, .7, 50, 1, {
      center: new THREE.Vector3(grid.center.x, 3, grid.center.z),
      radius: grid.center.x 
    })
    this.scene.add(this.light)
    const plh = new THREE.PointLightHelper(this.light, 1)
    // this.scene.add(plh)
    this.light2 = new MovingLight(0x00d2ff, .7, 50, 1, {
      center: new THREE.Vector3(grid.center.x , 3, grid.center.z),
      radius: grid.center.x 
    })
    this.scene.add(this.light2)
    const plh2 = new THREE.PointLightHelper(this.light2, 1);
    // this.scene.add(plh2)

    this.clock = new THREE.Clock()
    this.clock.start()
    console.log(this.clock.startTime)
    this.animate();
  }

  animate() {
    const time = this.clock.getElapsedTime()

    this.scene.traverse(object => {
      if (object.isMesh) {
        object.update(time)
      }
    })
    
    this.light.update(time)
    this.light2.update(-time)

    requestAnimationFrame(this.animate.bind(this))
    this.renderer.render(this.scene, this.camera)
  }
}


const app = new App();





