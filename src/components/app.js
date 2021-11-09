import React, { Component } from 'react';
import Table from "./table";

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <h1 className="main-heading">Computery Chess</h1>
        <Table />
      </div>
    );
  }
}
