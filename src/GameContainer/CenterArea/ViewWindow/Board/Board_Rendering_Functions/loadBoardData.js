"use strict"

import getBoardDataFromFile from './getBoardDataFromFile';
import createBoardObjectFromLevelData from './createBoardObjectFromLevelData';

const loadBoardData = async (level) => {
  return await createBoardObjectFromLevelData(await getBoardDataFromFile(level));
};

export default loadBoardData;