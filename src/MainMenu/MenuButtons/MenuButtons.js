"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import store from '../../App';

import startGame from '../../Functions/startGame';
import Button from '@material-ui/core/Button';

const MenuButtons = (props) => (
  <div>
    <Button
      variant = "contained"
      color = "primary"
      
      className = "main-menu__button--new-game"
      onClick = {() => {startGame(store, true)}} //is New Game
    >
      New Game
    </Button>

    <Button 
      variant = "contained"
      color = "primary"
      
      className = "main-menu__button--resume-game" 
      onClick = {() => {startGame(store, false)}} //is New Game
    >
      Resume Game
    </Button>

    <Button 
      variant = "contained"
      color = "secondary"
      className = "main-menu__button--instructions" 
      onClick = {props.closeInstructionsModal}
    >
    How to Play
    </Button>

    <Button 
      variant = "contained"
      color = "secondary"
      className = "main-menu__button--controls" 
      onClick = {props.closeControlsModal}
    >
      Controls
    </Button>
  </div>
);

MenuButtons.propTypes = {
  closeInstructionsModal: PropTypes.func,
  closeControlsModal: PropTypes.func
};

export default MenuButtons;