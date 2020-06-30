import * as THREE from 'three' ;

export default class Cell extends THREE.Mesh {
  alive: boolean;
  nextAlive: boolean;
  neighbors: Cell[];
  aliveY: number;
  deadY: number;

  constructor(alive: boolean) {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({
      // wireframe: true
    });
    super(geometry, material)
    this.aliveY = 0;
    this.deadY = -2
    this.alive = alive;
    if (alive) {
      this.position.y = this.aliveY;
    } else {
      this.position.y = this.deadY;
    }
  }

  setNeighbors(cells: Cell[]): void {
    this.neighbors = cells
  }

  updateNextAlive(): void {
    let aliveNeighbors = 0;
    // console.log(this.neighbors)
    this.neighbors.forEach(cell => {
      if (cell.alive) aliveNeighbors++;
    })

    // 周りの生きてる隣人の数によって次の生死を決定
    // 23/3ルール(2, 3人の隣人がいれば生き残り、3人の場合は誕生する)
    switch (aliveNeighbors) {
      case 2:
        this.nextAlive = this.alive ? true : false;
        break;
      case 3:
        this.nextAlive = true;
        break;
      default:
        this.nextAlive = false;
        break;
    }
  }

  toNextAlive(): void {
    this.alive = this.nextAlive;
  }

  update() {
    let targetY: number;
    if (this.alive) {
      targetY = 0;
    } else {
      targetY = -2;
    }
    const next = this.position.y + (targetY - this.position.y) * 0.2
    this.position.setY(next)
  }
}