"use strict"

import React from 'react';
import ReactDOM from 'react-dom';

//redux
import {Provider} from 'react-redux';
import storeCreator from './Redux/store';
const store = storeCreator();

import chooseMainView from './Functions/chooseMainView';

class App extends React.Component {
  state = {
    mainView: 'MainMenu',
  };

  componentDidMount() {
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
          chooseMainView(this.state.mainView, store)
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