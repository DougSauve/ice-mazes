"use strict"

// styles
import './Styles/Hub.scss';

import React from 'react';
import ReactDOM from 'react-dom';

//redux
import {Provider} from 'react-redux';
import storeCreator from './Redux/store';
const store = storeCreator();

import MainMenu from './MainMenu/MainMenu';
import GameContainer from './GameContainer/GameContainer';

class App extends React.Component {
  state = {
    mainView: 'MainMenu',
  };

  componentDidMount() {
    //disable scrolling on page
    document.body.style.overflow = "hidden";

    store.subscribe(() => {
      if (this.state.mainView !== store.getState().viewReducer.mainView ) {
        this.setState(() => ({ mainView: store.getState().viewReducer.mainView }));
      };
    });
  };
  
  render() {
    return (
      <div>
        {
          (this.state.mainView === 'MainMenu') ?
          <MainMenu /> : 
          <GameContainer />
        }
      </div>
    );
  };
};

const ConnectedApp = () => {
  return (
    <div>
      <Provider store = {store}>
        <App />
      </Provider>
    </div>
  )
}

ReactDOM.render(<ConnectedApp />, document.getElementById('root'));

export default store;