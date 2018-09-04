"use strict"

import React from 'react';

import loadBoardData from './Board_Rendering_Functions/loadBoardData';
import getWallClassNameBasedOnSurroundings
  from './Board_Rendering_Functions/getWallClassNameBasedOnSurroundings';

import findEntryCoordinates from "./Board_Movement_Functions/findEntryCoordinates";
import setCurrentPosition from "./Board_Movement_Functions/setCurrentPosition";

import MovementController from './Board_Movement_Functions/MovementController';

class Board extends React.Component {
  state = {
    levelLoaded: false,
    levelStats: null,
    boardData: null,
    currentPosition: null
  };

  componentDidMount() {
    this.populateState()
    .then(() => {
      const {x, y} = findEntryCoordinates(this.state.boardData);
      setCurrentPosition(x, y);
      new MovementController(this.state.boardData, x, y);
    });
  };
  
  populateState = async() => {
    const {levelStatsObject, boardDataObject} = await loadBoardData();

    this.setState(() => ({
      levelStats: levelStatsObject, 
      boardData: boardDataObject,
      levelLoaded: true,
      
    }));

    return Promise.resolve();
  };

  render() {
    return (
      <div className = "Board">
        {/* board data comes to this component and gets rendered here. All the main board functions
        stem from this component. */}
        {/* Board > row > tile > ?display, class */}
        {(this.state.levelLoaded) &&
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
                        className = {`Board__tile--${tile}`}
                        key = {tileIndex}  
                      >
                      
                        {/* add styling to walls - break this out */}
                        {tile === 'wall' &&
                          <div
                            className = {
                              getWallClassNameBasedOnSurroundings(
                                row[tileIndex - 1], //left
                                row[tileIndex + 1], //right
                                this.state.boardData[rowIndex - 1][tileIndex], //up
                                this.state.boardData[rowIndex + 1][tileIndex] //down
                              )
                            }
                          >
                          </div>
                        }
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

export default Board;