"use strict"

const setCurrentPosition = (x, y) => {
  const Board = document.getElementsByClassName('Board')[0];
 
  Board.style.marginLeft = `-${2 * x + 0.5}rem`;
  Board.style.marginTop = `-${2 * y + 0.5}rem`; 
};

export default setCurrentPosition;