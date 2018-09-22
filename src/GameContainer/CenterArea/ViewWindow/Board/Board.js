"use strict"

import React from 'react';

import loadBoardData from './Board_Rendering_Functions/loadBoardData';

import findEntryCoordinates from "./Board_Movement_Functions/findEntryCoordinates";
import setCurrentPosition from "./Board_Movement_Functions/setCurrentPosition";

import MovementController from './Board_Movement_Functions/MovementController';

import store from '../../../../App';

import {setHighestLevelInLocalStorage} from '../../../../Functions/manipulateHighestLevelInLocalStorage';

import WinModal from './WinModal/WinModal';

//redux
import {connect} from 'react-redux';
import {setBoardData, setLevelStats, setStartingPosition, setLevelLoaded, setMovementController, setCurrentLevel, setMovesTaken} from '../../../../Redux/gameData';

class Board extends React.Component {
  state = {
    levelStats: null,
    boardData: null,
    currentLevel: 1,
    showWinModal: false,
  };

  componentDidMount() {
    this.setUpLevel(); 

    store.subscribe(this.checkCurrentLevelForUpdates);
  };

  checkCurrentLevelForUpdates = () => {
    const currentLevelInStore = store.getState().gameDataReducer.currentLevel;
    
    if (this.state.currentLevel !== currentLevelInStore) {
      this.setState(() => ({ currentLevel: currentLevelInStore }), () => { //causes an error message on starting a new game when there is one active at a higher level. Not sure why. Doesn't break the game - will come back to it later.
        this.setUpLevel();
      });
    };
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
    const {levelStatsObject, boardDataObject} = await loadBoardData(this.state.currentLevel);

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
    //mount win modal
    this.setState(() => ({ showWinModal: true }));

    this.setState((prevState) => ({ currentLevel: ++prevState.currentLevel }), () => {
      //update in redux
      this.props.setCurrentLevel(this.state.currentLevel);
      this.props.setMovesTaken(0);
    
      setHighestLevelInLocalStorage(this.state.currentLevel);
    
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

        {/* Win Modal */}
        <WinModal 
          showWinModal = {this.state.showWinModal}
          closeWinModal = {() => { this.setState(() => ({ showWinModal: false })) }} //This line is apparently calling setState on an unmounted component when a game is resumed, but only after a new game has been started and then they return to the menu.
        />
      </div>
    );
  };
};

const mapStateToProps = ((state) => ({
  levelLoaded: state.gameDataReducer.levelLoaded,
  movementController: state.gameDataReducer.movementController,
  currentLevel: state.gameDataReducer.currentLevel
}));

const mapDispatchToProps = {
  setBoardData,
  setLevelStats,
  setStartingPosition,
  setLevelLoaded,
  setMovementController,
  setCurrentLevel,
  setMovesTaken
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);