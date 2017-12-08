export default class Graph {
  constructor(graphCanvas) {
    this.graphCanvas = graphCanvas;
    this.canvasSize = {
      x: graphCanvas.width,
      y: graphCanvas.height
    };
    this.ctx = graphCanvas.getContext('2d');
  }

  draw(zoo) {
    // debugger;
    this.drawAxes();
  }

  drawAxes() {
    // x-axis
    

    // y-axis
    this.ctx.beginPath();
    this.ctx.moveTo(10, 0);
    this.ctx.lineTo(10, this.canvasSize.y);
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 3;
    this.ctx.stroke();
  }
}
