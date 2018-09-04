"use strict"

import React from 'react';

import Board from './Board/Board';
import Dude from './Dude/Dude';

const ViewWindow = () => (
  <div className = "ViewWindow">
    <Board />
    <Dude />
  </div>
);

export default ViewWindow;