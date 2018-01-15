import React, { Component } from 'react';
import firebase from './config';
import Day from './Day.js';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      days: []
    }
  }

  componentDidMount() {
    let database = firebase.database();
    database.ref('/days').once('value').then(snapshot => {
      let days = snapshot.val();
      this.setState({days: days});
    });
  }

  render() {
    let days = this.state.days;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Vacation Working Log</h1>
        </header>
        <div className="App-body">
          <main className="App-content">
            {days.map(day => <Day date={day.date} hours={day.hours} key={day.id} /> )}
          </main>
        </div>
        <footer className="App-footer">/fernandofragoso - 2018</footer>
      </div>
    );
  }
}

export default App;
