import React, { Component } from 'react';
import firebase from '../config';
import DayList from './Day-list';
import DayForm from './Day-form';
import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      days: [],
      loggedIn: true
    }
  }

  componentDidMount() {
    this._getDays();
  }

  render() {
    let days = this.state.days;

    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">vacation-working-log</h2>
        </header>
        <div className="App-body">
          <main className="App-content">
            <DayList onUpdateDay={this._updateDay.bind(this)} days={days} />
            <DayForm
              isVisible={this.state.loggedIn}
              onCreateDay={this._createNewDay.bind(this)} />
          </main>
        </div>
        <footer className="App-footer">/fernandofragoso - 2018</footer>
      </div>
    );
  }

  //Watch and update the days
  _getDays() {
    firebase.database().ref('/days').on('value', snapshot => {
      let days = this._snapshotToArray(snapshot);
      this.setState({days: days});
    });
  }

  //Update day on firebase
  _updateDay(day) {
    firebase.database().ref(`/days/${day.id}`).update({
      date: day.date,
      hours: day.hours
    });
  }

  //Set a new day on firebase
  _createNewDay(day) {
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
