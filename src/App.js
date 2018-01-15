import React, { Component } from 'react';
import Day from './Day.js';
import './App.css';

class App extends Component {

  render() {

    let days = this._getDays();

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
        <footer className="App-footer">fernandofragoso - 2018</footer>
      </div>
    );
  }

  _getDays() {
    let days = [
      { id: '1', date: '08/01', hours: ['08:50', '12:05', '13:05', '17:47'] },
      { id: '2', date: '09/01', hours: ['08:15', '12:00', '13:20', '17:50'] },
      { id: '3', date: '10/01', hours: ['08:55', '12:30', '13:35', '17:40'] },
      { id: '4', date: '11/01', hours: ['07:35', '11:30', '12:40', '17:50'] },
      { id: '5', date: '15/01', hours: ['07:30'] }

    ];
    return days;
  }
}

export default App;
