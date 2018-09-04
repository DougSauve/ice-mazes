"use strict"

class MovementController {
  constructor(boardData, x, y) {
    console.log('MovementController started');

    document.onkeydown = this.getKeyPressed;
    
    this.getKeyPressed = (e) => {
      const event = e || window.event;

      if (event.keyCode == '37') console.log('left');
      if (event.keyCode == '38') console.log('up');
      if (event.keyCode == '39') console.log('right');
      if (event.keyCode == '40') console.log('down');
    }; //not working - I think onkeydown needs to be in Board and passed in as a prop to this.move() or something
  };

}

export default MovementController;