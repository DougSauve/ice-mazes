"use strict"

const createBoardObjectFromLevelData = (boardData) => {

  const {levelStatsArray, boardDataArray} = turnRawDataIntoArrays(boardData);

  const floors = createFloorsArray(levelStatsArray.slice(2));
  
  const levelStatsObject = {
    level: levelStatsArray[0],
    topTime: levelStatsArray[1],
    floorsInLevel: levelStatsArray.length - 2, //for the first two lines
    floors
  };
  
  const boardDataObject = createBoardDataArray(boardDataArray);

  return {levelStatsObject, boardDataObject};
};

const turnRawDataIntoArrays = (boardData) => {
  const fileByLinesWithComments = boardData.data.split('\n');
  const fileByLines = removeCommentsFromArray(fileByLinesWithComments);

  const dividingLine = findDividingLine(fileByLinesWithComments);

  //split file data at dividingLine
  const levelStatsArray = fileByLines.slice(0, dividingLine);
  const boardDataArray = fileByLines.slice(dividingLine + 1);

  return {levelStatsArray, boardDataArray};
};

const removeCommentsFromArray = (fileByLinesWithComments) => {
  return fileByLinesWithComments.map((line) => {
    if (line.includes('//')) {
      return line.substr(0, line.indexOf('//')).trim();
    } else return line.trim();
  });
};

const findDividingLine = (fileByLines) => {
  let dividingLine = -1;
  
  fileByLines.forEach((line, index) => {
    if (line.match(/::/)) {
      dividingLine = index;
    };
  });

  return dividingLine;
};

const createFloorsArray = (rawFloorsData) => {
  //input: [1-15-15, 2-15-15]
  const rawFloorsNestedArray = rawFloorsData.map((floor) => {
    return floor.split('-');
  });
  //rawFloorsNestedArray looks like: [[1],[15],[15]], [[2],[15],[15]]
  return rawFloorsNestedArray;
};

const createBoardDataArray = (boardDataArray) => {
  //input: array of each row as a long string, including outer walls.
  const boardArray = boardDataArray.map((row) => {
    return row.split('');
  });
  
  return createBoardDataArrayWithClassNames(boardArray);
};

const createBoardDataArrayWithClassNames = (boardArray) => {
  
  const createBoardDataArrayWithClassNames = [];

  boardArray.forEach((row, indexOfRow) => {
    createBoardDataArrayWithClassNames[indexOfRow] = row.map((tile, indexOfTile) => {
      //returns class name based on symbol
      const catchButton = new RegExp(/^[a-f|h-k]$/);
      if (catchButton.test(tile)) {
        console.log(`button-${tile}`);
        return `button-${tile}`;
      };
      const catchStalagmite = new RegExp(/^[A-F|H-K]$/);
      if (catchStalagmite.test(tile)) {
        console.log(`stalagmite-${tile.toLowerCase()}`);
        return `stalagmite-${tile.toLowerCase()}`;
      }; 

      //when this is tripped, it is a key. Determine whether it is uppercase or lowercase - uppercase are the moving walls, lowercase are the keys. For each one, return its class and add tile to the end. This will make them initial-render properly. Then, during gameplay, landing on the lowercase key triggers a change to the className with the matching uppercase.

      switch (tile) {
        case ' ':
          return 'ice';
        case 'G':
          return 'gravel';
        case 'W':
          return 'wall';
        case '-':
          return getOuterWallClassName(indexOfRow, indexOfTile, boardArray.length, row.length);
        case '<':
          return 'arrow-left';
        case '>':
          return 'arrow-right';
        case '<':
          return 'arrow-left';
        case '^':
          return 'arrow-up';
        case 'v':
          return 'arrow-down';      
        case '{':
          return 'entry';
        case '}':
          return 'exit';
        case 'y':
          return 'you-win';
        default:
        return 'outerWallTopLeftCorner';
      };
    });
  });

  return createBoardDataArrayWithClassNames;
};

const getOuterWallClassName = (indexOfRow, indexOfTile, boardArrayLength, rowLength) => {
  if (indexOfRow === 0) {
  
    if (0 < indexOfTile && indexOfTile < rowLength - 1 ) return 'outerWallTop';
    else if (indexOfTile === rowLength - 1) return 'outerWallTopRightCorner';
  
  } else if (0 < indexOfRow && indexOfRow < boardArrayLength - 1) {

    if (indexOfTile === 0) return 'outerWallLeft';
    else if (indexOfTile === rowLength - 1) return 'outerWallRight';

  } else if (indexOfRow === boardArrayLength - 1) {

    if (indexOfTile === 0) return 'outerWallBottomLeftCorner';
    else if (0 < indexOfTile && indexOfTile < rowLength - 1 ) return 'outerWallBottom';
    else if (indexOfTile === rowLength - 1) return 'outerWallBottomRightCorner';

  };
};

export default createBoardObjectFromLevelData;