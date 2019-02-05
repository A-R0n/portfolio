import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import './App.scss';
import Home from './Components/Home/Home';

class App extends Component {
  render() {
    return (
      <div className='App'>
      <Home />
      </div>
    );
  }
}

export default App;
