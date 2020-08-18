import React, { Component, Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Components/UI/Header/Header';
import Nav from './Components/UI/Nav/Nav';
import HomePage from './Containers/HomePage/Home';
import NewMovie from './Containers/NewMovie/NewMovie';
import ErrorPage from './Containers/ErrorPage/Error';
import DeleteMovie from './Containers/DeleteMovie/DeleteMovie';

class App extends Component {
  render() {
    return (
      <Fragment>
        <Header />
        <Nav />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/addmovie" component={NewMovie} />
          <Route path="/error" component={ErrorPage} />
          <Route path="/deletemovie" component={DeleteMovie} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
