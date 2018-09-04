"use strict"

const findEntryCoordinates = (boardData) => {
  //find entry coordinates
  const arrayWithCurrentPosition = boardData.map((row, rowIndex) => {
    return row.findIndex( (tileValue) => {return tileValue === 'entry' } );
  });

  let entryCoordinates;

  searchArray: {
    for (let a = 0; a < arrayWithCurrentPosition.length; a++) {
      if (arrayWithCurrentPosition[a] !== -1) {
        entryCoordinates = {x: arrayWithCurrentPosition[a], y: a};
        break searchArray;
      }
    };
  };

  return entryCoordinates;
};

export default findEntryCoordinates;