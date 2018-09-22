import MovementController from "../GameContainer/CenterArea/ViewWindow/Board/Board_Movement_Functions/MovementController";

"use strict"

//actions

const resetGameData = () => ({
  type: 'RESET_GAME_DATA'
});

const setMovesTaken = (movesTaken) => ({
  type: 'SET_MOVES_TAKEN',
  movesTaken,
});

const setBoardData = (boardData) => ({
  type: 'SET_BOARD_DATA',
  boardData
});

const setLevelStats = (levelStats) => ({
  type: 'SET_LEVEL_STATS',
  levelStats
});

const setStartingPosition = (x, y) => ({
  type: 'SET_STARTING_POSITION',
  startingPosition: {x, y}
});

const setLevelLoaded = (levelLoaded) => ({
  type: 'SET_LEVEL_LOADED',
  levelLoaded
});

const setMovementController = (movementController) => ({
  type: 'SET_MOVEMENT_CONTROLLER',
  movementController
});

const setCurrentLevel = (currentLevel) => ({
  type: 'SET_CURRENT_LEVEL',
  currentLevel
});


//default state
const defaultState = {
  movesTaken: 0,
  currentInventory: [],
  boardData: null,
  levelStats: {},
  levelLoaded: false,
  startingPosition: {
    x: null,
    y: null,
  },
  movementController: null,
  currentLevel: 1
};

//reducer
const gameDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'RESET_GAME_DATA':
    return {...defaultState};
    case 'SET_MOVES_TAKEN':
    return {...state, movesTaken: action.movesTaken};
    case 'SET_BOARD_DATA':
    return {...state, boardData: action.boardData};
    case 'SET_LEVEL_STATS':
    return {...state, levelStats: action.levelStats};
    case 'SET_STARTING_POSITION':
    return {...state, startingPosition: action.startingPosition};
    case 'SET_LEVEL_LOADED':
    return {...state, levelLoaded: action.levelLoaded};
    case 'SET_MOVEMENT_CONTROLLER':
    return {...state, movementController: action.movementController};
    case 'SET_CURRENT_LEVEL':
    return {
      ...state,
      levelStats: {...state.levelStats, level: action.currentLevel},
      currentLevel: action.currentLevel 
    };
    default:
    return state;
  };
};

export {
  gameDataReducer as default,
  resetGameData,
  setMovesTaken,
  setBoardData,
  setStartingPosition,
  setLevelStats,
  setLevelLoaded,
  setMovementController,
  setCurrentLevel,
};