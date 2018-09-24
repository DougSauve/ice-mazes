"use strict"

const path = require('path');
const fs = require('fs');

const readLevelData = (level) => {

  return new Promise((resolve, reject) => {

    fs.readFile(path.join(__dirname, `./levels/${level}.txt`), (err, levelData) => {
      
      if (!err) {
        console.log('reading ' + level + '.txt');
        resolve(levelData);
      } else {
        
        fs.readFile(path.join(__dirname, `./levels/${0}.txt`), (err, levelData) => {
          if (err) {
            reject('check readLevelData.js in server', err);
          }
          console.log('reading 0.txt');
          resolve(levelData);
        });
      
      }
    });   
  });
  //returns level data object
};

module.exports = {readLevelData};