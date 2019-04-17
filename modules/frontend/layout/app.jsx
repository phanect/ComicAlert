"use strict";

import Tab from "@material/react-tab";
import TabBar from "@material/react-tab-bar";
import React from "react";
import PropTypes from "prop-types";

import "@material/react-tab-bar/dist/tab-bar.css";
import "@material/react-tab-scroller/dist/tab-scroller.css";
import "@material/react-tab/dist/tab.css";
import "@material/react-tab-indicator/dist/tab-indicator.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      activeIndex: 0,
    };
    this.handleActiveIndexUpdate = (activeIndex) => this.setState({ activeIndex });
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row-fluid">
            {this.props.children}
          </div>
        </div>
        <TabBar
          activeIndex={this.state.activeIndex}
          handleActiveIndexUpdate={this.handleActiveIndexUpdate}
        >
          <Tab>
            <span className="mdc-tab__text-label">お気に入り</span>
          </Tab>
          <Tab>
            <span className="mdc-tab__text-label">検索</span>
          </Tab>
          <Tab>
            <span className="mdc-tab__text-label">設定</span>
          </Tab>
        </TabBar>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
