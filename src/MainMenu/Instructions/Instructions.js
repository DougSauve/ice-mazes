"use strict"

import React from 'react';
import PropTypes from 'prop-types'; 

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

const Instructions = (props) => (
  <div>
    <Modal
      className = "InstructionsModal"
      open = {props.showInstructionsModal}
    >
      <div className = "Instructions">
        {/* organize this and style it */}
        <div>Instructions:</div>
       
        <div>Guide your penguin through the ice maze to the red exit!</div>
        <div>White tiles are ice. The penguin can't stop or turn until he lands on something else.</div>
        <div>The penguin stops against rocks.</div>
        <div>The penguin stops on top of a patch of sand.</div>

        <Button 
          variant = "contained"
          color = "primary"
          className = "Instructions__button--close"
          onClick = {props.closeInstructionsModal}
        >
          Close
        </Button>
      </div>
    </Modal>
  </div>
);

Instructions.propTypes = {
  showInstructionsModal: PropTypes.bool,
  closeInstructionsModal: PropTypes.func
};

export default Instructions;