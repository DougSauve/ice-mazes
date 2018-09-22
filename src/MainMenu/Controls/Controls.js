"use strict"

import React from 'react';
import PropTypes from 'prop-types'; 

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

const Controls = (props) => (
  <div>
    <Modal
      className = "ControlsModal"
      open = {props.showControlsModal}
    >
      <div className = "Controls">
        {/* organize this and style it */}
        <div>Controls:</div>
       
        <div>Move left: Left Arrow</div>
        <div>Move up: Up Arrow</div>
        <div>Move right: Right Arrow</div>
        <div>Move down: Down Arrow</div>

        <Button 
          variant = "contained"
          color = "primary"
          className = "Controls__button--close"
          onClick = {props.closeControlsModal}
        >
          Close
        </Button>
      </div>
    </Modal>
  </div>
);

Controls.propTypes = {
  showControlsModal: PropTypes.bool,
  closeControlsModal: PropTypes.func
};

export default Controls;