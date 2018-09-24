"use strict"

import getBoardDataFromFile from './getBoardDataFromFile';
import createBoardObjectFromLevelData from './createBoardObjectFromLevelData';

const loadBoardData = async (level) => {
  console.log('loading board data');
  return await createBoardObjectFromLevelData(await getBoardDataFromFile(level));
};

export default loadBoardData;