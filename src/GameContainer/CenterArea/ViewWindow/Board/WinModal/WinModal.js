"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const WinModal = (props) => (
  <Modal
    className = "WinModal"
    open = {props.showWinModal}
  >
    <div className = "Win">
      <div>
        How splendid of you.
      </div>

      <Button
        variant = "contained"
        color = "primary"
        className = "WinModal__buton--close"
        onClick = {props.closeWinModal}
      >
        Next Level
      </Button>
    </div>
  </Modal>
);

WinModal.propTypes = {
  showWinModal: PropTypes.bool,
};

export default WinModal;