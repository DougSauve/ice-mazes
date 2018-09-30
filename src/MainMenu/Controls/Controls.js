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
        <div className = "Controls__title">Controls:</div>
       
        <div className = "Controls__row">
          
          <div className = "demo__black_tile">
            <div className = "arrow-left_tile">
              <img src = "./arrow.png" />
            </div>
          </div>
          
          <div className = "Controls__content">Move Left</div>
        </div>
        
        <div className = "Controls__row">
          
         <div className = "demo__black_tile">
            <div className = "arrow-right_tile">
              <img src = "./arrow.png" />
            </div>
          </div>

          <div className = "Controls__content">Move Right</div>
        </div>

        <div className = "Controls__row">
          
         <div className = "demo__black_tile">
            <div className = "arrow-up_tile">
              <img src = "./arrow.png" />
            </div>
          </div>

          <div className = "Controls__content">Move Up</div>
        </div>

        <div className = "Controls__row">

         <div className = "demo__black_tile">
            <div className = "arrow-down_tile">
              <img src = "./arrow.png" />
            </div>
          </div>
          
          <div className = "Controls__content">Move Down</div>
        </div>

        <Button 
          variant = "contained"
          color = "primary"
          className = "Controls__button--close"
          onClick = {props.closeControlsModal}
        >
          Got it
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