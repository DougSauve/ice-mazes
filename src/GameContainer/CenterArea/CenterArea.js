"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import LevelsMap from './LevelsMap';
import ViewWindow from './ViewWindow/ViewWindow';

import {connect} from 'react-redux';

const CenterArea = (props) => (
  <div className = "CenterArea">
    <div className = "TopPanel" />
    {
      props.gameView === "LevelsMap" ?
      // Grid showing all available levels. Can click on one to play that level.
      //<LevelsMap /> :
      <ViewWindow /> :
      // Actual game. Whole level mounted, then it moves in the background as the player 'moves'. 
      <ViewWindow />
    }
    <div className = "BottomPanel" />
  </div>
);

CenterArea.propTypes = {
  gameView: PropTypes.string,
};

const mapStateToProps = (store) => ({
  gameView: store.viewReducer.gameView,
});

export default connect(mapStateToProps)(CenterArea);