"use strict"

import React from 'react';
import PropTypes from 'prop-types';

import MenuButtons from './MenuButtons/MenuButtons';

import Instructions from './Instructions/Instructions';
import Controls from './Controls/Controls';

class MainMenu extends React.Component {
  state = {
    instructionsModalMounted: false,
    controlsModalMounted: false,
  };

  render() {
    return (
      <div className = "main-menu">
        {/* Title Bar */}
        <div className = "main-menu__title">Ice Mazes</div>
        
        {/* Main Content Area */}
        <div className = "main-menu__content">

          {/* Left side of screen */}
          <div className = "main-menu__menu-options-box">
    
           <MenuButtons 
             closeInstructionsModal = { () => { this.setState(() => ({ instructionsModalMounted: true })) } }
             closeControlsModal = { () => { this.setState(() => ({ controlsModalMounted: true })) } }
           />
    
          </div>

          {/* right side of screen */}
          <div className = "main-menu__photo-box">
    
            <div className = "main-menu__photo-box__background" />
            <img src = "./menu-penguin.png" />
    
          </div>
        </div>

        {/* modals */}
        <Instructions
          showInstructionsModal = {this.state.instructionsModalMounted}
          closeInstructionsModal = {() => { this.setState(() => ({ instructionsModalMounted: false })) }}
        />
       
        <Controls
          showControlsModal = {this.state.controlsModalMounted}
          closeControlsModal = {() => { this.setState(() => ({ controlsModalMounted: false })) }}
        />

      </div>
    );
  }
} 

MainMenu.propTypes = {
  showInstructions: PropTypes.func,
  store: PropTypes.object,
};

export default MainMenu;