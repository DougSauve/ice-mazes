"use strict"

import React from 'react';

import loadBoardData from './Board_Functions/loadBoardData';
import getWallClassNameBasedOnSurroundings
  from './Board_Functions/getWallClassNameBasedOnSurroundings';

class Board extends React.Component {
  state = {
    levelLoaded: false,
    levelStats: null,
    boardData: null,
  };

  componentDidMount() {
    this.populateState();
  };
  
  populateState = async() => {
    const {levelStatsObject, boardDataObject} = await loadBoardData();

    this.setState(() => ({
      levelStats: levelStatsObject, 
      boardData: boardDataObject,
      levelLoaded: true,
    }));
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
                  row.map((tile, index) => {
                    return (
                      <div 
                        className = {`Board__tile--${tile}`}
                        key = {index}  
                      >
                      
                        {/* add styling to walls - break this out */}
                        {tile === 'wall' &&
                          <div
                            className = {
                              getWallClassNameBasedOnSurroundings(
                                row[index - 1], //left
                                row[index + 1], //right
                                this.state.boardData[rowIndex - 1][index], //up
                                this.state.boardData[rowIndex + 1][index] //down
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