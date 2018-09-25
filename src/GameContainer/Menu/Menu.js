"use strict"

import React from 'react';

import Button from '@material-ui/core/Button'; // '../../Components/Button';

import Instructions from '../../MainMenu/Instructions/Instructions';
import Controls from '../../MainMenu/Controls/Controls';

//Redux
import {connect} from 'react-redux';
import {setMainView, setGameView} from '../../Redux/view';
import {setLevelLoaded, setMovesTaken} from '../../Redux/gameData';

import setCurrentPosition from '../CenterArea/ViewWindow/Board/Board_Movement_Functions/setCurrentPosition';

class Menu extends React.Component {
  state = {
    instructionsModalOpen: false,
    controlsModalOpen: false,
  };
  
  render() {
    return (
      <div className = "menu">
        
        <Button 
          variant = "contained"
          color = "secondary"
          className = "menu__button--link-to-main-menu"
          onClick = {(this, () => {
            this.props.setMainView("MainMenu");  
          })}
        >
          Exit to Menu
        </Button>
    
        <Button 
          variant = "contained"
          color = "primary"
          className = "menu__button--reset-level"
          onClick = {(this, () => {
            setCurrentPosition(this.props.startingPositionX, this.props.startingPositionY);
            this.props.setMovesTaken(0);
            this.props.movementController.reset();
    
          } )}
        >
          Reset Level
        </Button>
    
        <Button 
          variant = "contained"
          color = "primary"
          className = "menu__button--choose-level"
          onClick = {() => {
            this.props.setGameView('LevelsMap')
            this.props.movementController.pause();
          }}
        >
          Choose Level
        </Button>

        <Button 
          variant = "contained"
          color = "primary"
          className = "menu__button--instructions"
          onClick = {() => {
            this.setState(() => ({ instructionsModalOpen: true }))
          }}
        >
          Instructions
        </Button>

        <Button 
          variant = "contained"
          color = "primary"
          className = "menu__button--controls"
          onClick = {() => {
            this.setState(() => ({ controlsModalOpen: true }))
          }}
        >
          Controls
        </Button>
    
        {/* modals */}
        <Instructions
              showInstructionsModal = {this.state.instructionsModalOpen}
              closeInstructionsModal = {() => { this.setState(() => ({ instructionsModalOpen: false })) }}
            />
           
            <Controls
              showControlsModal = {this.state.controlsModalOpen}
              closeControlsModal = {() => { this.setState(() => ({ controlsModalOpen: false })) }}
            />
      </div>
    );
  };
};



const mapStateToProps = ((state) => ({
  startingPositionX: state.gameDataReducer.startingPosition.x,
  startingPositionY: state.gameDataReducer.startingPosition.y,
  movementController: state.gameDataReducer.movementController,
}));

const mapDispatchToProps = {
  setMainView,
  setLevelLoaded,
  setMovesTaken,
  setGameView,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);