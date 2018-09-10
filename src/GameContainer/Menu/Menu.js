"use strict"

import React from 'react';

import Button from '../../Components/Button';

//Redux
import {connect} from 'react-redux';
import {setMainView} from '../../Redux/view';
import {setLevelLoaded, setMovesTaken} from '../../Redux/gameData';

import setCurrentPosition from '../CenterArea/ViewWindow/Board/Board_Movement_Functions/setCurrentPosition';

const Menu = (props) => (
  <div className = "Menu">
    Menu   
    
    <Button 
      className = "GameContainer__button--ResetLevel"
      onClick = {(this, () => {
        setCurrentPosition(props.startingPositionX, props.startingPositionY);
        props.setMovesTaken(0);
        props.movementController.reset();

      } )}
      value = "Reset Level"
    />
    <p>moves: {props.movesTaken}</p>

    <p>
      level: {props.level}
    </p>
    <Button 
      className = "GameContainer__button--LinkToMainMenu"
      onClick = {(this, () => {props.setMainView("MainMenu")} )}
      value = "Exit to Menu"
    />
  </div>
);

const mapStateToProps = ((state) => ({
  level: state.gameDataReducer.levelStats.level,
  movesTaken: state.gameDataReducer.movesTaken,
  startingPositionX: state.gameDataReducer.startingPosition.x,
  startingPositionY: state.gameDataReducer.startingPosition.y,
  movementController: state.gameDataReducer.movementController,
}));

const mapDispatchToProps = {
  setMainView,
  setLevelLoaded,
  setMovesTaken
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);