"use strict"

import axios from 'axios';

const getBoardDataFromFile = async (level) => {
  
  //request file from server

  try {
    return await axios.get('levels/' + level);
  } catch (error) {
    console.log('asdf error:', error);
  }
  // return new Promise(async(resolve, reject) => { 
  //   axios.get('/levels/' + level)  
  //   .then((res) => {
  //     console.log('RES IS', res);
  //     resolve(res);
  //   })
  //   .catch((e) => {
  //     reject(e);
  //   });
  // });
};

export default getBoardDataFromFile;