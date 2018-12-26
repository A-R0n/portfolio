import React from 'react';
import { Switch, Route } from 'react-router-dom';
import About from './Components/About/About';
import Projects from './Components/Projects/Projects';
import Quotes from './Components/Quotes/Quotes';
import Home from './Components/Home/Home';

export default (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/projects' component={Projects} />
      <Route path='/quotes' component={Quotes} />
    </Switch>
  );