import React, { Component } from 'react';
import firebase from '../config';
import Day from './Day.js';
import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      days: []
    }
  }

  componentDidMount() {
    this._updateDays();
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

  //Watch and update the days
  _updateDays() {
    firebase.database().ref('/days').on('value', snapshot => {
      let days = this._snapshotToArray(snapshot);
      this.setState({days: days});
    });
  }

  //Set a new day on firebase
  _setNewDay(day) {
    firebase.database().ref('/days').push({
      date: day.date,
      hours: day.hours
    });
  }

  //Convert the snapshot to Array
  _snapshotToArray(snapshot) {
    let returnArr = [];
    snapshot.forEach(childSnapshot => {
        let item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });
    return returnArr;
  }
}
