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
import {
  setBoardData,
  setLevelStats, 
  setStartingPosition, 
  setLevelLoaded, 
  setMovementController, 
  setCurrentLevel, 
  setMovesTaken
} from '../../../../Redux/gameData';

class Board extends React.Component {
  state = {
    levelStats: null,
    boardData: null,
    currentLevel: this.props.currentLevel,
    showWinModal: false,
    storeSubscription: null, //set in componentDidMount, removed in componentWillUnmount
  };

  componentDidMount() {
    this.setUpLevel(); 

    this.setState(() => ({ storeSubscription: store.subscribe(this.checkCurrentLevelForUpdates) })); 
  };

  componentWillUnmount() {
    //cancel store subscription
    this.state.storeSubscription();
  }

  checkCurrentLevelForUpdates = () => {
    const currentLevelInStore = store.getState().gameDataReducer.currentLevel;

    console.log('updating');
    
    if (this.state.currentLevel !== currentLevelInStore) {
      this.setState(() => ({ currentLevel: currentLevelInStore }), () => {
        this.setUpLevel();
      });
    };
  };

  setUpLevel = () => {
console.log('setting up');
    this.populateState()
    .then(() => {
      
      //get entry coordinates - used for reseting the level
      const {x, y} = findEntryCoordinates(this.state.boardData);
      setCurrentPosition(x, y);
      this.props.setStartingPosition(x, y);
      this.props.setMovesTaken(0);
    
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

    return Promise.resolve();
  };

  //passed in as a prop to movementController in this.setUpLevel
  win = () => {
    //mount win modal
    this.setState(() => ({ showWinModal: true }));

    // this.setState((prevState) => ({ currentLevel: ++prevState.currentLevel }), () => {
    //update in redux
    const nextLevel = parseInt(this.state.currentLevel + 1);

    setHighestLevelInLocalStorage(nextLevel);
    this.props.setCurrentLevel(nextLevel);
  
    // this.setUpLevel();
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
                          {(tile === 'you-win') &&
                            <div>You Win!</div>
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
        {
          (this.state.showWinModal) && //this flag is to stop it preloading every time the component gets updated
          <WinModal 
            showWinModal = {this.state.showWinModal}
            closeWinModal = {() => { this.setState(() => ({ showWinModal: false })) }}
            currentLevel = {this.props.currentLevel}
          />
        }
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