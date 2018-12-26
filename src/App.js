import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import routes from './routes';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
				<BrowserRouter>
						{routes}
				</BrowserRouter>
			</Provider>
    );
  }
}

export default App;
