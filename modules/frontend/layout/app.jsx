"use strict";

import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-default" role="navigation">
          <div className="container-fluid">
            <a href="/" className="navbar-brand">Comic Alert</a>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown">その他<b className="caret"></b></a>
                  <ul className="dropdown-menu">
                    <li>
                      <a href="/about/">About</a>
                    </li>
                    <li className="divider"></li>
                    {/* TODO Temporary Twitter Link */}
                    <li>
                      <a href="https://twitter.com/phanect"><img src="https://g.twimg.com/Twitter_logo_blue.png" width="24" height="24" /></a>
                    </li>
                  </ul>
                </li>
            <% if (typeof user != "undefined") { %>
              <li><%- linkTo("コミックの追加", "/addcomics") %></li>
              <li><%- linkTo("設定", "/settings") %></li>
              <li><%- linkTo("ログアウト", logoutPath) %></li>
            <% } %>
              </ul>
            </div>{/* /.navbar-collapse */}
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row-fluid">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
