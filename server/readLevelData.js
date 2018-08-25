"use strict"

const path = require('path');
const fs = require('fs');

const readLevelData = (level) => {

  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, `./levels/${level}.txt`), (err, levelData) => {
      if (err) reject(err);
      resolve(levelData);
    });
  });
  //returns level data object
};

module.exports = {readLevelData};