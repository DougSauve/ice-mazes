"use strict"

import React from 'react';

import Menu from './Menu/Menu';
import CenterArea from './CenterArea/CenterArea';
import Inventory from './Inventory/Inventory';

import {connect} from 'react-redux';

const GameContainer = (props) => (
  <div className = "GameContainer">

    {/* restart, previous level, save / load (localStorage), choose level (mounts <LevelsMap />) */}
    {
      (props.levelLoaded) &&
      <Menu />
    }

    {/* Main viewing area. Can house <LevelsMap /> or <Board /> */}
    {
      (props.mainView === 'GameContainer') &&
      <CenterArea 
        onClick = {() => {console.log('clicked')}}
      />
    }

    {/* shown as icons, words on hover */}
    {
      (props.levelLoaded) &&
      <Inventory />
    }

  </div>
);

const mapStateToProps = ((state) => ({
  levelLoaded: state.gameDataReducer.levelLoaded,
  mainView: state.viewReducer.mainView,
}));

export default connect(mapStateToProps)(GameContainer);