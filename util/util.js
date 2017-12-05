export const positiveMod = (n, m) => (
  ((n % m) + m) % m
);

// computed the horizontal distance between two points
// accounting for the panorama's wrapping
export const distanceX = (x1, x2, panoramaWidth) => {
  const smaller = Math.min(x1, x2);
  const larger = Math.max(x1, x2);
  const innerDistance = larger - smaller;
  const outerDistance = smaller + panoramaWidth - smaller;
  return Math.min(innerDistance, outerDistance);
};

export const distanceY = (y1, y2) => {
  return Math.abs(y2 - y1);
};

export const distance = (x1, y1, x2, y2, panoramaWidth) => {
  return Math.sqrt(Math.pow(distanceY(y1, y2), 2) +
                   Math.pow(distanceX(x1, x2, panoramaWidth), 2));
};

export const fieldCellCoords = (x, y, fieldNetSize) => ({
  x: Math.floor(x / fieldNetSize),
  y: Math.floor(y / fieldNetSize)
});

export const gravitation = dist => {
  if (dist === 0) {
    // avoid singularities;
    return 4;
  } else {
    return Math.pow(dist, -2);
  }
};
