import React, { Component } from "react";
import { Switch, BrowserRouter, Router, Route } from "react-router-dom";
import Userlogin from "./Userlogin";
import Userregister from "./Userregister";
export default class User extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="row" style={{ justifyContent: "center" }}>
          <h1>User header</h1>
        </div>
        <Switch>
          <Route path="/userregister" component={Userregister} />
          <Route path="/userlogin" component={Userlogin} />
        </Switch>
      </BrowserRouter>
    );
  }
}
