"use strict"

import getBoardDataFromFile from './getBoardDataFromFile';
import createBoardObjectFromLevelData from './createBoardObjectFromLevelData';

const loadBoardData = async (level) => {
  //access localStorage
  const boardData = localStorage.getItem('boardData');
  //if there is data in localStorage, return it
  if (boardData !== null) return createBoardObjectFromLevelData(boardData);
  //if not, send an API call for level 1
  return await createBoardObjectFromLevelData(await getBoardDataFromFile(level));
};

export default loadBoardData;


//need to create level 1 file on server
//need to do something with createBoardObjectFromLevelData - if all goes well the contents of the
//level text file will arrive there and need processing.