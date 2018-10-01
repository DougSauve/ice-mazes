import animateMovement from "./animateMovement";

import store from '../../../../../App';
import {setMovesTaken} from '../../../../../Redux/gameData';

"use strict"

class MovementController {
  constructor(boardData, x, y, win) {
    this.boardData = boardData;
    this.startingX = x;
    this.startingY = y;
    this.x = x;
    this.y = y;
    this.busy = false;

    this.arrowTripped = null;

    this.reset = () => {
      this.x = this.startingX;
      this.y = this.startingY;
      this.busy = false;
    };

    this.pause = () => {
      this.busy = true;
    };

    this.resume = () => {
      this.busy = false;
    };

    // document.onkeydown = this.getKeyPressed;
    
    this.getKeyPressed = (e) => {

      if (this.busy === true) return;
      this.busy = true;

      switch(e.code) {
        case 'ArrowLeft': 
        this.move('left');
        break;
        case 'ArrowUp': 
        this.move('up');
        break;
        case 'ArrowRight': 
        this.move('right');
        break;
        case 'ArrowDown': 
        this.move('down');
        break;
        default:
        this.busy = false;
      };

    };

    this.getTileAheadOf = (currentX, currentY, direction) => {
      
      //vertical moves must be checked before being returned because the first index of the array might return undefined, which throws an error when the program tries to get a nested index within that undefined. On horizontal moves, it is already the second nested value that becomes undefined. The tile parser handles undefined as an outer wall. 
      switch (direction) {
        case 'left':
        return boardData[currentY][currentX - 1];
        case 'up':
        return (boardData[currentY - 1]) ? boardData[currentY - 1][currentX] : undefined;
        case 'right':
        return boardData[currentY][currentX + 1];
        case 'down':
        return (boardData[currentY + 1]) ? boardData[currentY + 1][currentX] : undefined;
      };
    };

    this.addToBaseByDirection = (baseX, baseY, direction, amountToIncrement) => {
      switch (direction) {
        case 'left':
        return {x: (baseX - amountToIncrement), y: baseY};
        case 'up':
        return {x: baseX, y: ((baseY - amountToIncrement))};
        case 'right':
        return {x: (baseX + amountToIncrement), y: baseY};
        case 'down':
        return {x: baseX, y: ((baseY + amountToIncrement))};
      };
    };

    this.getNumberOfTilesToMove = (direction) => {
      let tilesToMove = 0;
      let moveComplete = false;
      let tileAhead = this.getTileAheadOf(this.x, this.y, direction);

      let tempX = this.x;
      let tempY = this.y;

      //switch: 
      //ice, landing = slide;
      //exit, gravel, spiral, ladder = stop on;
      //wall, outerWall, block = stop before;
      //arrows = redirect; 
      //entry, pit = don't move

      while (moveComplete === false) {
        switch (tileAhead) {
          //keep sliding
          case 'ice':
          case 'landing':
          tilesToMove++;
          break;

          //stop on
          case 'gravel':
          case 'spiral':
          case 'ladder':
          case 'exit':
          tilesToMove++;
          moveComplete = true;
          break;
          
          //don't move at all
          case 'entry':
          case 'pit':
          tilesToMove = 0;
          moveComplete = true;
          break;

          //arrows
          case 'arrow-left':
          tilesToMove++;
          moveComplete = true;
          this.arrowTripped = 'left';
          break;

          case 'arrow-up':
          tilesToMove++;
          moveComplete = true;
          this.arrowTripped = 'up';
          break;

          case 'arrow-right':
          tilesToMove++;
          moveComplete = true;
          this.arrowTripped = 'right';
          break;

          case 'arrow-down':
          tilesToMove++;
          moveComplete = true;
          this.arrowTripped = 'down';
          break;

          //stop before
          case 'wall':
          case 'block':
          default: //covers outer walls
          moveComplete = true;

        };

        if(moveComplete === false) {
          //increment tempX or tempY without affecting the real this.x or this.y yet
          const tempCoords = this.addToBaseByDirection(tempX, tempY, direction, 1);
          tempX = tempCoords.x;
          tempY = tempCoords.y;

          tileAhead = this.getTileAheadOf(tempX, tempY, direction);
        }
      };
      return tilesToMove;
    };

    this.move = (direction) => {
      
      const tilesToMove = this.getNumberOfTilesToMove(direction);
      
      const tempCoords = this.addToBaseByDirection(this.x, this.y, direction, tilesToMove);
      this.x = tempCoords.x;
      this.y = tempCoords.y;

      if (tilesToMove === 0) {
        this.busy = false;
        return;
      }

      animateMovement(direction, tilesToMove)
      .then(() => {

        if (this.arrowTripped !== null){
          const tempArrow = this.arrowTripped;
          this.arrowTripped = null;
          this.move(tempArrow);
        } else {
          store.dispatch(setMovesTaken(store.getState().gameDataReducer.movesTaken + 1));
        };

        if (boardData[this.y][this.x] === 'exit') {
          win();
        };


        this.busy = false;
      });
    };
  };
};

export default MovementController;