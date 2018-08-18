"use strict"

import React from 'react';

import Button from '../Components/Button';

import store from '../App';
import {setMainView} from '../Redux/view';

const Menu = () => (
  <div>
    Menu
    <Button 
      className = "GameContainer__button--LinkToMainMenu"
      onClick = {(this, () => {store.dispatch(setMainView("MainMenu"))} )}
      value = "Exit to Menu"
    />
  </div>
);

export default Menu;