// Dependecies
import React, { Component } from 'react';
import PropTypes from 'prop-types'

// Styles
import './App.scss';

// Components
import Navbar from "../components/navbar";

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };
  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <Navbar />
        {children}
      </div>
    );
  }
}

export default App;
