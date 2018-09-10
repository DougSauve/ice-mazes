"use strict"

import React from 'react';

import loadBoardData from './Board_Rendering_Functions/loadBoardData';

import findEntryCoordinates from "./Board_Movement_Functions/findEntryCoordinates";
import setCurrentPosition from "./Board_Movement_Functions/setCurrentPosition";

import MovementController from './Board_Movement_Functions/MovementController';

//redux
import {connect} from 'react-redux';
import {setBoardData, setLevelStats, setStartingPosition, setLevelLoaded, setMovementController, setCurrentLevel} from '../../../../Redux/gameData';

class Board extends React.Component {
  state = {
    levelStats: null,
    boardData: null,
    level: 1
  };

  componentDidMount() {
    this.setUpLevel(); 
  };
  
  setUpLevel = () => {

    this.populateState()
    .then(() => {
      
      //get entry coordinates - used for reseting the level
      const {x, y} = findEntryCoordinates(this.state.boardData);
      setCurrentPosition(x, y);
      this.props.setStartingPosition(x, y);
    
        return {x, y};

    }).then(({ x, y }) => { 
      
      //start the movement controller at the starting position
      this.props.setMovementController(
        new MovementController(this.state.boardData, 
          x, 
          y, 
          this.win
        )
      );
    
      document.onkeydown = this.props.movementController.getKeyPressed;
    
    }).then(() => {

      this.props.setLevelLoaded(true);
      
    });
  };

  populateState = async() => {
    //get levelStats and boardData from file
    const {levelStatsObject, boardDataObject} = await loadBoardData(this.state.level);

    //set them in component state
    this.setState(() => ({
      boardData: boardDataObject,
      levelStats: levelStatsObject,
    }));

    //set them in redux state as well
    this.props.setLevelStats(levelStatsObject);
    this.props.setBoardData(boardDataObject);
    this.props.setLevelLoaded(true);

    return Promise.resolve();
  };

  //passed in as a prop to movementController in this.setUpLevel
  win = () => {
    alert(`you win! Level ${this.state.level} complete.`);
    this.setState((prevState) => ({ level: ++prevState.level}), () => {
      //update in redux
      this.props.setCurrentLevel(this.state.level);
      //set up the new level using the redux currentLevel
      this.setUpLevel();
    });
  };

  render() {
    return (
      <div className = "Board">
        {(this.props.levelLoaded) &&
          this.state.boardData.map((row, rowIndex) => {
            return (
              <div 
                className = "Board__row"
                key = {rowIndex}
              >
                {
                  row.map((tile, tileIndex) => {
                    return (
                      <div 
                        className = {(tile.includes('outer')) ? 'Board__outer-wall' : `Board__tile`}
                        key = {tileIndex}  
                      >
                        <div
                          className = {`${tile}_tile`}
                        >
                          {/* images */}
                          {tile === 'gravel' &&
                          <img src = 'sand.png' />
                          }
                          {tile === 'wall' &&
                          <img src = {`rock${Math.ceil(Math.random() * 2)}.png`} /> //rock1 or rock2
                          }
                          {(tile === 'entry' || tile === 'exit') &&
                          <img src = 'cave.png' />
                          }
                        </div>
                        
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    );
  };
};

const mapStateToProps = ((state) => ({
  levelLoaded: state.gameDataReducer.levelLoaded,
  movementController: state.gameDataReducer.movementController,
}));

const mapDispatchToProps = {
  setBoardData,
  setLevelStats,
  setStartingPosition,
  setLevelLoaded,
  setMovementController,
  setCurrentLevel
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);