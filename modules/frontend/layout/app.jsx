"use strict";

import React from "react";
import PropTypes from "prop-types";

class App extends React.Component {
  render() {
    return (
      <div>
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
