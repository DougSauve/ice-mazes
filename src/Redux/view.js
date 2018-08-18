"use strict"

// action
const setMainView = (mainView) => ({
  type: 'SET_MAIN_VIEW',
  mainView
});

const setGameView = (gameView) => ({
  type: 'SET_GAME_VIEW',
  gameView
});

const defaultState = {
  mainView: 'MainMenu',
  gameView: 'LevelsMap',
};

//reducer
const viewReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_MAIN_VIEW':
    return {...state, mainView: action.mainView};
    case 'SET_GAME_VIEW':
    return {...state, gameView: action.gameView};
    default:
    return state;
  };
}

export {
  viewReducer as default,

  setMainView,
  setGameView
};