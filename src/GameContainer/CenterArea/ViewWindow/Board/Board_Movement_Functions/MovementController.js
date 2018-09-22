import animateMovement from "./animateMovement";

"use strict"

class MovementController {
  constructor(boardData, x, y, win) {
    this.boardData = boardData;
    this.startingX = x;
    this.startingY = y;
    this.x = x;
    this.y = y;
    this.busy = false;

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
      const event = e || window.event;

      if (event.keyCode === 37) this.move('left');
      if (event.keyCode === 38) this.move('up');
      if (event.keyCode === 39) this.move('right');
      if (event.keyCode === 40) this.move('down');
    };

    // this.moveLeft = () => {
    //   let tileToLeft = boardData[this.y][this.x-1];
    //   if (tileToLeft !== 'ice') {
    //     this.busy = false;
    //     return;
    //   };

    //   let tilesToMove = 0;
    //   let goingOutEntry = false;
        
    //   //calculates how many tiles to move and mutates this.x and this.y
    //   while (tileToLeft === 'ice' || tileToLeft === 'exit') {
    //     this.x--;
    //     tileToLeft = boardData[this.y][this.x-1];
    //     tilesToMove++;
      
    //     if(tileToLeft === 'entry') {
    //       goingOutEntry = true; 
    //       this.y -= tilesToMove;
    //       break; 
    //     };
    //   };

    //   if (goingOutEntry) {
    //       this.busy = false;
    //       return;
    //   };
      
    //   move('left', tilesToMove)
    //     .then(() => {
    //       if (boardData[this.y][this.x] === 'exit') {
    //         win();
    //       } else {
    //         this.busy = false;
    //       }
    //     });
    //   };

    // this.moveUp = () => {
    //   let tileAbove = boardData[this.y-1][this.x];
    //   if (tileAbove !== 'ice') {
    //     this.busy = false;
    //     return;
    //   };

    //   let tilesToMove = 0;
    //   let goingOutEntry = false;

    //   //calculates how many tiles to move and mutates this.x and this.y
    //   while (tileAbove === 'ice' || tileAbove === 'exit') {
    //     this.y--;
    //     tileAbove = boardData[this.y-1][this.x];
    //     tilesToMove++;
      
    //     if(tileAbove === 'entry') {
    //       goingOutEntry = true; 
    //       this.y -= tilesToMove;
    //       break; 
    //     };
    //   };

    //   if (goingOutEntry) {
    //       this.busy = false;
    //       return;
    //   };

    //   move('up', tilesToMove)
    //   .then(() => {
    //     if (boardData[this.y][this.x] === 'exit') {
    //       win();
    //     } else {
    //       this.busy = false;
    //     }
    //   });
    // };

    // this.moveRight = () => {
    //   let tileToRight = boardData[this.y][this.x+1];
    //   if (tileToRight !== 'ice') {
    //     this.busy = false;
    //     return;
    //   };

    //   let tilesToMove = 0;
    //   let goingOutEntry = false;
  
    //   //calculates how many tiles to move and mutates this.x and this.y
    //   while (tileToRight === 'ice' || tileToRight === 'exit') {
    //     this.x++;
        
    //     tileToRight = boardData[this.y][this.x+1];
    //     tilesToMove++;

    //     if(tileToRight === 'exit'){}
      
    //     if(tileToRight === 'entry') {
    //       goingOutEntry = true; 
    //       this.y -= tilesToMove;
    //       break; 
    //     };
    //   };

    //   if (goingOutEntry) {
    //       this.busy = false;
    //       return;
    //   };
  
    //   move('right', tilesToMove)
    //   .then(() => {
    //     if (boardData[this.y][this.x] === 'exit') {
    //       win();
    //     } else {
    //       this.busy = false;
    //     }
    //   });
    // };  
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
      };
      animateMovement(direction, tilesToMove)
      .then(() => {
        if (boardData[this.y][this.x] === 'exit') {
          win();
        };
        this.busy = false;
      });
    };
  };
};

export default MovementController;