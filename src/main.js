import Background from './background';
import Organism from './organism';

const backgroundPath = 'https://s3-us-west-1.amazonaws.com/talons-dev/placeholder-background.jpeg';

// inspired by https://stackoverflow.com/questions/1114465/getting-mouse-location-in-canvas
function getMousePos(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}

document.addEventListener("DOMContentLoaded", function(event) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const background = new Background(ctx, backgroundPath, canvasWidth);
  const organism = new Organism(50, canvasWidth, canvasHeight, ctx);
  let mousePos;
  background.drawBackground();

  canvas.addEventListener('mousemove', e => {
    mousePos = getMousePos(canvas, e);
    background.updateCursorOffset(mousePos);
  });

  canvas.addEventListener('mouseout', () => {
    background.toggleDampening(true);
  });

  setInterval(() => {
    background.drawBackground();
    organism.drawOrganism();
  }, 42);
});
