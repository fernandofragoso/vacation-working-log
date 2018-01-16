import React, { Component } from 'react';
import './Day-form.css';

export default class DayForm extends Component {

  render() {

    let form = "";
    if (this.props.isVisible) {
      form = <div className="Day-form">
        <button onClick={this._createDay.bind(this)}>Create Day</button>
      </div>
    }

    return (
      form
    );
  }

  _createDay() {
    let day = {};
    day.date = "31/12";
    day.hours = ["08:00", "12:00", "14:00", "18:00"];
    this.props.onCreateDay(day);
  }

}