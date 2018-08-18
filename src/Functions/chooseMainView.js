"use strict"

import React from 'react';

import MainMenu from '../MainMenu/MainMenu'
import Instructions from '../Instructions'
import Controls from '../Controls';
import GameContainer from '../GameContainer/GameContainer';

const chooseMainView = (mainView, store) => {
  switch (mainView) {
    case 'MainMenu':
    return <MainMenu store = {store} />;
  
    case 'Instructions':
    return <Instructions />;
  
    case 'GameContainer':
    return <GameContainer />;
  
    case 'Controls':
    return <Controls />;
  
    default:
    return <MainMenu />;
  };
};

export default chooseMainView;