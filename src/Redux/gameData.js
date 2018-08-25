"use strict"

//actions

const resetAllData = () => ({
  type: 'RESET_ALL_DATA'
});

const setCurrentLevel = (currentLevel) => ({
  type: 'SET_CURRENT_LEVEL',
  currentLevel,
});


//default state
const defaultState = {
  currentLevel: 1,
  currentInventory: [],
};

//reducer
const gameDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'RESET_ALL_DATA':
    return {...defaultState};
    case 'SET_CURRENT_LEVEL':
    return {...state, currentLevel: action.currentLevel};
    default:
    return state;
  };
};

export {
  gameDataReducer as default,
  resetAllData,
  setCurrentLevel,
};