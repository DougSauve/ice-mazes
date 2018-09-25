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
      switch (tile) {
        case ' ':
          return 'ice';
        case 'G':
          return 'gravel';
        case 'W':
          return 'wall';
        case '-':
          return getOuterWallClassName(indexOfRow, indexOfTile, boardArray.length, row.length);
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