"use strict"

const getWallClassNameBasedOnSurroundings = (toLeft, toRight, above, below) => {
  let styles = ' wall_';


  if (toLeft === 'wall') {
    styles += 'l';
  }

  if (toRight === 'wall') {
    styles += 'r';
  }

  if (above === 'wall') {
    styles += 'u';
  }

  if (below === 'wall') {
    styles += 'd';
  }
  
  return styles;
};

export default getWallClassNameBasedOnSurroundings;