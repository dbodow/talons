export default class Organism {
  constructor(radius, canvasWidth, canvasHeight, ctx) {
    this.ctx = ctx;
    this.radius = radius;
    this.centerX = Math.floor(Math.random() * (canvasWidth - 2*radius))+radius;
    this.centerY = Math.floor(Math.random() * (canvasHeight - 2*radius))+radius;
    this.speed = 10;
  }

  drawOrganism() {
    this.ctx.beginPath();
    this.ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'red';
    this.ctx.fill();
  }

  moveOrganism() {
    
  }
}
