"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import LevelsMap from './LevelsMap';
import Board from './Board/Board';

import {connect} from 'react-redux';

const ViewWindow = (props) => (
  <div>
    ViewWindow
    {
      props.gameView === "LevelsMap" ?
      // Grid showing all available levels. Can click on one to play that level.
      //<LevelsMap /> :
      <Board /> :
      // Actual game. Whole level mounted, then it moves in the background as the player 'moves'. 
      <Board />
    }
  </div>
);

ViewWindow.propTypes = {
  gameView: PropTypes.string,
};

const mapStateToProps = (store) => ({
  gameView: store.viewReducer.gameView,
});

export default connect(mapStateToProps)(ViewWindow);