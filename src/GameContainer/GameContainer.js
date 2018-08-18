"use strict"

import React from 'react';

import Menu from './Menu';
import Inventory from './Inventory';
import ViewWindow from './ViewWindow/ViewWindow';

const GameContainer = () => (
  <div>
    GameContainer!

    {/* restart, previous level, save / load (localStorage), choose level (mounts <LevelsMap />) */}
    <Menu />

    {/* shown as icons, words on hover */}
    <Inventory />

    {/* Main viewing area. Can house <LevelsMap /> or <Board /> */}
    <ViewWindow />

  </div>
);

export default GameContainer;