"use strict"

import {setMainView} from '../Redux/view';
import {resetAllData} from '../Redux/gameData';
import argTypes from '../../utils/argTypes';

const resumeGame = (store) => {
  
  argTypes([
    [store, 'object']
  ]);
  
  store.dispatch(setMainView('GameContainer'));
  store.dispatch(resetAllData());

};

export default resumeGame;