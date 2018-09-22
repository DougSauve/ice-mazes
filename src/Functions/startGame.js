"use strict"

import {setMainView} from '../Redux/view';
import {resetGameData, setCurrentLevel} from '../Redux/gameData';
import argTypes from '../../utils/argTypes';
import {getHighestLevelInLocalStorage} from './manipulateHighestLevelInLocalStorage';

const startGame = (store, isNewGame) => {
  
  argTypes([
    [store, 'object']
  ]);
  
  store.dispatch(setMainView('GameContainer'));
  store.dispatch(resetGameData());
  
  const currentLevel = (isNewGame) ? 1 : parseInt(getHighestLevelInLocalStorage());
  store.dispatch(setCurrentLevel(currentLevel));
};

export default startGame;