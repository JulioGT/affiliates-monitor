import React, { Component } from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import configureStore from '../config/configureStore';
import ScrollToTop from '../utils/ScrollToTop';
import Routes from './Routes.js';

import '../assets/base.scss';

const saveToLocalStorage = (state) => { 
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (e) {
    console.log(e);
  }
};

const store = configureStore();
store.subscribe(() => saveToLocalStorage(store.getState()));

class App extends Component { 
  render() {
    return (
      <Provider store={store}>
      <BrowserRouter basename="/">
          <ScrollToTop>
            <Routes /> 
          </ScrollToTop>
          <ToastContainer
            enableMultiContainer
            containerId={'A'}
            position={toast.POSITION.BOTTOM_LEFT}
          />
          <ToastContainer
            enableMultiContainer
            containerId={'B'}
            position={toast.POSITION.TOP_RIGHT}
          />
          <ToastContainer
            enableMultiContainer
            containerId={'C'}
            position={toast.POSITION.BOTTOM_CENTER}
          />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);