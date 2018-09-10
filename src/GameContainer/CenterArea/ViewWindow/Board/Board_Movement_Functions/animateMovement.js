"use strict"

import store from '../../../../../App';
import {setMovesTaken} from '../../../../../Redux/gameData';

const move = (direction, tilesToMove) => {
  const Board = document.getElementsByClassName('Board')[0];

  //gets the number value of top and left margin on the board
  let startingMarginTop = Board.style.marginTop.substr(0, Board.style.marginTop.length - 2);
  let startingMarginLeft = Board.style.marginLeft.substr(0, Board.style.marginLeft.length - 2);

  store.dispatch(setMovesTaken(store.getState().gameDataReducer.movesTaken + 1));

  let timer = 32 * tilesToMove;

  return new Promise((resolve, reject) => {
    if (direction === 'left') {
  
      const moving = setInterval(() => {
        startingMarginLeft++;
  
        Board.style.marginLeft = startingMarginLeft + 'px';
        timer--;
        
        if (timer === 0) {
          clearInterval(moving);
          resolve();
        }
      }, 5);
    } else if (direction === 'up') {
  
      const moving = setInterval(() => {
        startingMarginTop++;
  
        Board.style.marginTop = startingMarginTop + 'px';
        timer--;
        
        if (timer === 0) {
          clearInterval(moving);
          resolve();
        }
      }, 5);
    } else if (direction === 'right') {
  
      const moving = setInterval(() => {
        startingMarginLeft--;
  
        Board.style.marginLeft = startingMarginLeft + 'px';
        timer--;
        
        if (timer === 0) {
          clearInterval(moving);
          resolve();
        }
      }, 5);
    } else if (direction === 'down') {
  
      const moving = setInterval(() => {
        startingMarginTop--;
  
        Board.style.marginTop = startingMarginTop + 'px';
        timer--;
        
        if (timer === 0) {
          clearInterval(moving);
          resolve();
        }
      }, 5);
    };
  });
};

export default move;