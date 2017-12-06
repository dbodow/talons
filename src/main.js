import Panorama from './panorama';
import UserParams from './user_params';

// non-user params
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
  const backgroundImage = new Image;
  backgroundImage.src = backgroundPath;

  const userParams = new UserParams(backgroundImage);
  userParams.setListeners();

  const backgroundParams = {
    canvas,
    backgroundImage
  };
  const panorama = new Panorama(backgroundParams, userParams);

  let mousePos;
  panorama.draw();

  canvas.addEventListener('mousemove', e => {
    mousePos = getMousePos(canvas, e);
    panorama.updateCursorOffset(mousePos);
  });

  canvas.addEventListener('mouseout', () => {
    panorama.toggleDampening(true);
  });

  setInterval(() => {
    panorama.updateDx();
    panorama.draw();
  }, 500); //42 mHz = 24 fps
});
