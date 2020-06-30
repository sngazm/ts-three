import Cell from './Cell';
import * as THREE from 'three';

export default class Grid {
  rows: number;
  columns: number;
  cells: Cell[][];
  distance = 1.05;
  center: THREE.Vector3;

  constructor(rows: number, columns: number) {
    this.rows = rows;
    this.columns = columns;
    this.cells = [];

    // セルを配置
    for (let i = 0; i < rows; i++) {
      this.cells[i] = [];
      for (let j = 0; j < columns; j++) {
        const alive = (Math.random() <= 0.5);
        const cell = new Cell(alive);
        this.cells[i][j] = cell;
        const x = this.distance * j;
        const z = this.distance * i;
        cell.position.setX(x).setZ(z);
        // app.scene.add(cell) // 本当はここでappにつっこみたい
      }
    }
    console.log(this.cells);
    this.center = new THREE.Vector3(this.distance * columns / 2, 0, this.distance * rows / 2)

    // それぞれのセルに隣人を設定
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        let left: number, right: number, top: number, bottom: number;
        const lastRow = rows - 1;
        const lastColumn = columns - 1;

        left = (j == 0) ? lastColumn : j - 1;
        right = (j == lastColumn) ? 0 : j + 1;
        top = (i == 0) ? lastRow : i - 1;
        bottom = (i == lastRow) ? 0 : i + 1;
        const neighbors = [
          this.cells[top][left], this.cells[top][j], this.cells[top][right],
          this.cells[i][left], this.cells[i][right],
          this.cells[bottom][left], this.cells[bottom][j], this.cells[bottom][right]
        ]
        this.cells[i][j].setNeighbors(neighbors)
      }
    }

    setInterval(this.updateCells.bind(this), 1000);
  }

  updateCells() {
    // それぞれのセルの隣人の生死を確認
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.cells[i][j].updateNextAlive();
      }
    }
    // それぞれのセルを次の状態へ
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        this.cells[i][j].toNextAlive();
      }
    }
  }
}