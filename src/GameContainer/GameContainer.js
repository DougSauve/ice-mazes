"use strict"

import React from 'react';

import Menu from './Menu/Menu';
import CenterArea from './CenterArea/CenterArea';
import Inventory from './Inventory/Inventory';

const GameContainer = () => (
  <div className = "GameContainer">

    {/* restart, previous level, save / load (localStorage), choose level (mounts <LevelsMap />) */}
    <Menu />

    {/* Main viewing area. Can house <LevelsMap /> or <Board /> */}
    <CenterArea />

    {/* shown as icons, words on hover */}
    <Inventory />

  </div>
);

export default GameContainer;