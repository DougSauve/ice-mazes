"use strict"

import React from 'react';

import Button from '@material-ui/core/Button';

//redux
import {connect} from 'react-redux';
import {setGameView} from '../../../Redux/view';
import {setCurrentLevel} from '../../../Redux/gameData';

import {getHighestLevelInLocalStorage} from '../../../Functions/manipulateHighestLevelInLocalStorage';

class LevelsMap extends React.Component {
  state = {
    arrayOfButtonLinks: [],
    readyToRenderLevelButtons: false,
  };

  componentDidMount() {
    this.setState(() => ({ 
      arrayOfButtonLinks: this.createButtonsForEachLevel(),
      readyToRenderLevelButtons: true,
     }));
  };

  createButtonsForEachLevel = () => {
    const highestLevelReached = getHighestLevelInLocalStorage();

    let arrayOfButtonLinks = [];

    for (let a = 1; a <= highestLevelReached; a++) {
      arrayOfButtonLinks.push(    
        () => {
        const currentLevel = a;
        this.props.setCurrentLevel(currentLevel);
        this.props.setGameView('Board');
        }    
      );
    };

    return arrayOfButtonLinks;
  };
  
  render() {
    return (
      <div className = 'levels-map'>
        <div className = 'levels-map__message'>Which level do you want to go to?</div>
        
        {this.state.readyToRenderLevelButtons &&
        <div className = 'levels-map__level-buttons-container'>
          {
            this.state.arrayOfButtonLinks.map((buttonLink, index) => {
              return (
                <Button
                  key = {index}
                  variant = "contained"
                  color = "secondary"
                  className = "levels-map__level-button"
                  onClick = {buttonLink} 
                >
                  {index + 1}
                </Button>
              );
            })
          }
        </div>
        }
        
        <Button
          variant = "contained"
          color = "primary"
          className = "levels-map__return-to-game"
          onClick = {() => {
            this.props.setGameView('Board');
            this.props.movementController.resume();
            }}
        >
          Return to game
        </Button>

      </div>
    );
  };
};

const mapStateToProps = ((state) => ({
  gameView: state.viewReducer.gameView,
  currentLevel: state.gameDataReducer.currentLevel,
  movementController: state.gameDataReducer.movementController,
}));

const mapDispatchToProps = {
  setGameView,
  setCurrentLevel,
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelsMap);