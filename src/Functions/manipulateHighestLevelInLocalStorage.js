"use strict"

const setHighestLevelInLocalStorage = (level) => {
  const currentHighestLevel = getHighestLevelInLocalStorage(); 
  if (level > currentHighestLevel) {
    localStorage.setItem('highestLevel', level);
  };
};

const getHighestLevelInLocalStorage = () => {
  return localStorage.getItem('highestLevel');
};

export {setHighestLevelInLocalStorage, getHighestLevelInLocalStorage};