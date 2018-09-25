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
        <div className = "Instructions__title">How to Play:</div>
       
        <div className = "Instructions__row">
          
        <div className = "Board__tile">
            <div className = "entry_tile">
              <img src = "./cave.png" />
            </div>
          </div>

          <div className = "Board__tile">
            <div className = "exit_tile">
              <img src = "./cave.png" />
            </div>
          </div>
          
          <div className = "Instructions__content">Guide the penguin through the ice maze to the red exit!</div>
        </div>
        
        <div className = "Instructions__row">
          
          <div className = "demo__black_tile" />
          
          <div className = "Board__tile">
            <div className = "ice_tile"/>
          </div>

          <div className = "Instructions__content">The penguin can't stop or turn on ice.</div>
        </div>

        <div className = "Instructions__row">
          
          <div className = "Board__tile">
            <div className = "wall_tile">
              <img src = "./rock1.png" />
            </div>
          </div>

          <div className = "Board__tile">
            <div className = "wall_tile">
              <img src = "./rock2.png" />
            </div>
          </div>

          <div className = "Instructions__content">The penguin stops when it runs into a rock.</div>
        </div>

        <div className = "Instructions__row">

          <div className = "demo__black_tile" />
          
          <div className = "Board__tile">
            <div className = "gravel_tile">
              <img src = "./sand.png" />
            </div>
          </div>
          
          <div className = "Instructions__content">The penguin doesn't slide on sand patches.</div>
        </div>

        <Button 
          variant = "contained"
          color = "primary"
          className = "Instructions__button--close"
          onClick = {props.closeInstructionsModal}
        >
          Got it
        </Button>
      </div>
    </Modal>
  </div>
);

Instructions.propTypes = {
  showInstructionsModal: PropTypes.bool,
  closeInstructionsModal: PropTypes.func,
};

export default Instructions;