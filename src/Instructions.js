"use strict"

import React from 'react';

import Button from './Components/Button';

import store from './App';
import {setMainView} from './Redux/view';

const Instructions = () => (
  <div>
    <Button 
      className = "GameContainer__button--LinkToMainMenu"
      onClick = {(this, () => {store.dispatch(setMainView("MainMenu"))} )}
      value = "Exit to Menu"
    />

    Instructions are here :)
  </div>
);

export default Instructions;