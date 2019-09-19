import React, { Component } from "react";
import { Router, Route, hashHistory } from "react-router";
import Login from "../login/Login";
import SearchResult from "../searchResult/SearchResult";

export default class PageRoutingIndex extends Component {
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Login} />
        <Route path="search" component={SearchResult} />
      </Router>
    );
  }
}
