import React, { Component } from "react";
import Uploadproduct from "./Uploadproduct";
import { Switch, BrowserRouter, Router, Route } from "react-router-dom";
export default class Admin extends Component {
  render() {
    return (
      <BrowserRouter>
        <h1>admin dashboard</h1>
        <Switch>
          <Route
            exact
            path="/admindashboard/uploadproduct"
            component={Uploadproduct}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}
