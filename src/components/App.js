import React, { Component } from 'react';
import firebase from '../config';
import DayList from './Day-list';
import DayForm from './Day-form';
import AppHeader from './App-header';
import './App.css';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      days: [],
      isLogged: false
    }


  }

  componentDidMount() {
    this._getDays();

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isLogged: true
        });
      } else {
        this.setState({
          isLogged: false
        });
      }
    });
  }

  render() {
    let days = this.state.days;

    return (
      <div className="App">
        <AppHeader
          onLogin={this._login.bind(this)}
          onLogout={this._logout.bind(this)}
          isLogged={this.state.isLogged} />
        <div className="App-body">
          <main className="App-content">
            <DayList
              isLogged="true"
              onUpdateDay={this._updateDay.bind(this)} days={days} />
            <DayForm
              isLogged="true"
              onCreateDay={this._createNewDay.bind(this)} />
          </main>
        </div>
        <footer className="App-footer">/fernandofragoso - 2018</footer>
      </div>
    );
  }

  //Authenticate user
  _login(user, password) {
    //TODO: firebase auth
    if (user === "fernando" && password === "password") {
      firebase.auth().signInAnonymously().catch(function(error) {
        //Handle Error
      });
    } else {
      //Show feedback
    }
  }

  _logout() {
    //TODO: firebase auth
    firebase.auth().signOut().then(function() {
      //Sign out
    }).catch(function(error) {
      //Sign out error
    });
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

    firebase.database().ref(`/days/${day.key}`).update({
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
