import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from "react-router";
import { BrowserRouter } from "react-router-dom";

import LoginPage from './routes/LoginPage'
import SignupPage from './routes/SignupPage'
import TaskPage from './routes/TaskPage'
import PageNotFound from './routes/PageNotFound'

export default () => (
  <BrowserRouter>
      <Switch>
        <Route path="/" exact component={TaskPage} />
        <Route path="/signin" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route component={PageNotFound} />
      </Switch>
  </BrowserRouter>
);

/*
        <Route path="/createrecipe" component={Route} />
        <Route path="/users/:userid" component={Rou} />
        <Route path="/recipes/:recipeid" component={RecipePage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/usersearch" component={UserSearchPage} />
*/