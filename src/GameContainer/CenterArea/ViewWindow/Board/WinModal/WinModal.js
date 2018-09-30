"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import ChooseWinPraise from './ChooseWinPraise';
import ChooseWinThanks from './ChooseWinThanks';

//connecting this component because updating is a delicate issue in the parent component (Board) and this is going to be less messy.
import {connect} from 'react-redux';

class WinModal extends React.Component {

  shouldComponentUpdate(prevProps) {
    return this.props.currentLevel !== prevProps.currentLevel
  };

  render() {
    return (
      <Modal
        className = "WinModal"
        open = {this.props.showWinModal}
        onClose = {this.props.closeWinModal}
      >
        <div className = "Win">
          <div className = "Win__moves-used">You did the puzzle in {this.props.movesTaken} moves!</div>
          
          <div className = "Win__praise">
            {ChooseWinPraise()}
          </div>
    
          <Button
            variant = "contained"
            color = "primary"
            // className = "WinModal__buton--close" below does the same thing - ask Terry about this!
            classes = {{
              root: 'WinModal__buton--close'
            }}
            onClick = {this.props.closeWinModal}
          >
            <div>
              {ChooseWinThanks()}
            </div>
          </Button>
        </div>
      </Modal>
    );
  };
};

WinModal.propTypes = {
  showWinModal: PropTypes.bool,
  closeWinModal: PropTypes.func,
  currentLevel: PropTypes.number,
  movesTaken: PropTypes.number,
};

const mapStateToProps = ((state) => ({
  movesTaken: state.gameDataReducer.movesTaken,
}));

export default connect(mapStateToProps)(WinModal);