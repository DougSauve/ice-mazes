"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import startNewGame from '../Functions/startNewGame';
import resumeGame from '../Functions/resumeGame';

import Button from '../Components/Button';

import store from '../App';
import {setMainView} from '../Redux/view'; 

const MainMenu = (props) => (
  <div>
    Main Menu :)

    <Button
      className = "MainMenu__button--newGame"
      onClick = {startNewGame.bind(this, props.store)}
      value = "New Game"
    />

    <Button 
      className = "MainMenu__button--resumeGame" 
      onClick = {resumeGame.bind(this, props.store)}
      value = "Resume Game"
    />
  
    <Button 
      className = "MainMenu__button--instructions" 
      onClick = {(this, () => {store.dispatch(setMainView("Instructions"))} )}
      value = "How To Play" 
    />

    <Button 
      className = "MainMenu__button--controls" 
      onClick = {(this, () => {store.dispatch(setMainView("Controls"))} )}
      value = "Controls" 
    />
    
  </div>
);

MainMenu.propTypes = {
  showInstructions: PropTypes.func,
  store: PropTypes.object,
};

export default MainMenu;