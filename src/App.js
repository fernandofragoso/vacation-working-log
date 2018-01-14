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
        <footer className="App-footer">My working hours by React</footer>
      </div>
    );
  }

  _getDays() {
    let days = [
      { id: '1', date: '08/01', hours: ['08:00', '12:00', '13:00', '17:00'] },
      { id: '2', date: '09/01', hours: ['08:00', '11:00', '12:30', '17:30'] },
      { id: '3', date: '10/01', hours: ['09:00', '12:00', '13:00', '18:00'] },
      { id: '4', date: '11/01', hours: ['09:00', '13:00', '14:00', '16:00', '16:30', '18:30'] }
    ];
    return days;
  }
}

export default App;
