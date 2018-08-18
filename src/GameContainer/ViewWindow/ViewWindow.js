"use strict"

import React from 'react';

import LevelsMap from './LevelsMap';
import Board from './Board';

const ViewWindow = () => (
  <div>
    ViewWindow

    {/* Grid showing all available levels. Can click on one to play that level. */}
    <LevelsMap />

    {/* Actual game. Whole level mounted, then it moves in the background as the player 'moves'. */}
    <Board />
  </div>
);

export default ViewWindow;