"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import LevelsMap from './LevelsMap/LevelsMap';
import ViewWindow from './ViewWindow/ViewWindow';

import {connect} from 'react-redux';

const CenterArea = (props) => (
  <div className = "center-area">
    
    <div className = "center-area__top-panel">

      <div className = "center-area__top-panel__display-area">
         <div className = "center-area__top-panel__level-display">Level: {props.level}</div>
         
        <div className = "flex-spacer" />

        <div className = "center-area__top-panel__title">Ice Mazes</div>

        <div className = "flex-spacer" />
        
        <div className = "center-area__top-panel__moves-display">Moves: {props.movesTaken}</div>
      </div>
    </div>
    
    {
      props.gameView === "LevelsMap" && <LevelsMap />
    }

    <ViewWindow />
    
    <div className = "center-area__bottom-panel">
      <div className = "center-area__target-score">
        Fastest time: <span>{props.topTime}</span>
      </div>
    </div>
  </div>
);

CenterArea.propTypes = {
  gameView: PropTypes.string,
};

const mapStateToProps = (state) => ({
  gameView: state.viewReducer.gameView,
  
  level: state.gameDataReducer.levelStats.level,
  movesTaken: state.gameDataReducer.movesTaken,
  topTime: state.gameDataReducer.levelStats.topTime,
});

export default connect(mapStateToProps)(CenterArea);