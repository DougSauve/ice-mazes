"use strict"

import React from 'react';

import loadBoardData from './Board_Functions/loadBoardData';

class Board extends React.Component {
  state = {
    boardData: null //board component
  };

  componentDidMount() {
    this.setState(() => ({ boardData: loadBoardData() }));
  };
  
  render() {
    return (
      <div>
        Board
        {/* board data comes to this component and gets rendered here. All the main board functions
        stem from this component. */}
        {/* Board > row > tile > ?display, class */}
        {/* {
          this.state.boardData.rows.map((row) => {
            return (
              <div className = "Board__row">
                {
                  row.map((tile) => {
                    return (
                      <div className = {`Board__tile--${tile.class}`}>
                       {(tile.display) && tile.display}
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        } */}
      </div>
    );
  };
};

export default Board;