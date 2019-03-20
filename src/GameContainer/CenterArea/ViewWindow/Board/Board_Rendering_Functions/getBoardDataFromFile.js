"use strict"

import axios from 'axios';

const getBoardDataFromFile = async (level) => {
  
  //request file from server

  try {
    return await axios.get('levels/' + level);
  } catch (error) {
    console.warn('error in getBoardDataFromFile:', error);
  }
};

export default getBoardDataFromFile;