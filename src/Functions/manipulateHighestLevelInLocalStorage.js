"use strict"

const setHighestLevelInLocalStorage = (level) => {
  const currentHighestLevel = getHighestLevelInLocalStorage(); 
  if (level > currentHighestLevel) {
    localStorage.setItem('highestLevel', level);
  };
};

const getHighestLevelInLocalStorage = () => {
  if (localStorage.getItem('highestLevel')) {
    return localStorage.getItem('highestLevel');
  } else {
    localStorage.setItem('highestLevel', 1);
    return '1';
  };
};

export {setHighestLevelInLocalStorage, getHighestLevelInLocalStorage};