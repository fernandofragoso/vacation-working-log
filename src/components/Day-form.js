import React, { Component } from 'react';
import './Day-form.css';

export default class DayForm extends Component {

  render() {

    let form = "";
    if (this.props.isLogged) {
      form = <div>
        <form className="Day-form" onSubmit={this._handleSubmit.bind(this)}>
          <input className="Day-form-date" placeholder="Date" ref={c => { this._date = c }} />
          <input className="Day-form-hours" placeholder="Hours" ref={c => { this._hours = c }} />
          <button className="button" type="submit">Add day</button>
        </form>
      </div>
    }

    return (
      form
    );
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.onCreateDay(this._getDay());
    this._date.value = "";
    this._hours.value = "";
  }

  _getDay() {
    let day = {};
    day.date = this._date.value;
    day.hours = this._hours.value.split(" ");
    return day;
  }

}