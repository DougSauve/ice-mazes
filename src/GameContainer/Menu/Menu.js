"use strict"

import React from 'react';

import Button from '@material-ui/core/Button'; // '../../Components/Button';

//Redux
import {connect} from 'react-redux';
import {setMainView, setGameView} from '../../Redux/view';
import {setLevelLoaded, setMovesTaken} from '../../Redux/gameData';

import setCurrentPosition from '../CenterArea/ViewWindow/Board/Board_Movement_Functions/setCurrentPosition';

const Menu = (props) => (
  <div className = "menu">
    
    <Button 
      variant = "contained"
      color = "secondary"
      className = "menu__button--link-to-main-menu"
      onClick = {(this, () => {
        props.setMainView("MainMenu");  
      })}
    >
      Exit to Menu
    </Button>

    <Button 
      variant = "contained"
      color = "primary"
      className = "menu__button--reset-level"
      onClick = {(this, () => {
        setCurrentPosition(props.startingPositionX, props.startingPositionY);
        props.setMovesTaken(0);
        props.movementController.reset();

      } )}
    >
      Reset Level
    </Button>

    <Button 
      variant = "contained"
      color = "primary"
      className = "menu__button--choose-level"
      onClick = {() => {
        props.setGameView('LevelsMap')
        props.movementController.pause();
      }}
    >
      Choose Level
    </Button>
  </div>
);

const mapStateToProps = ((state) => ({
  startingPositionX: state.gameDataReducer.startingPosition.x,
  startingPositionY: state.gameDataReducer.startingPosition.y,
  movementController: state.gameDataReducer.movementController,
}));

const mapDispatchToProps = {
  setMainView,
  setLevelLoaded,
  setMovesTaken,
  setGameView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);