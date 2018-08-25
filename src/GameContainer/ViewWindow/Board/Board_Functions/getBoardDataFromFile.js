"use strict"

import axios from 'axios';

const getBoardDataFromFile = ({ level }) => {
  
  //request file from server
  return new Promise((resolve, reject) => {
    axios.get('/levels/' + level)  
    .then((res) => {
      resolve(res);
    })
    .catch((e) => {
      console.log('error' + e);
      reject(e);
    });
  });
};

export default getBoardDataFromFile;