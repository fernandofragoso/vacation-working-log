import React, { Component } from 'react';
import './Day.css';

export default class Day extends Component {

  constructor() {
    super();
    this.state = {
      edit: false
    }
  }

  render() {
    let formClass = "";
    let date = <div className="Day-date">{this.props.date}</div>
    let hours = this.props.hours.map(hour => <div key={hour.toString()} className="Day-hour">{hour}</div>)
    let button = <button className="button button__edit" onClick={this._editDay.bind(this)}>Edit</button>;
    if (this.state.edit) {
      formClass = "Day-form";
      date = <input
        className="Day-form-date"
        placeholder="Date"
        value={this.props.date}
        onChange={this._handleChangeDate.bind(this)}
        />
      hours = <input
        className="Day-form-hours"
        placeholder="Hours"
        value={this.props.hours.join(" ")}
        onChange={this._handleChangeHours.bind(this)}
        />
      button = <button className="button button__edit" onClick={this._updateDay.bind(this)}>Save</button>
    }

    return (
      <div className={`Day ${formClass}`}>
        {date}
        {hours}
        {button}
      </div>
    );
  }

  _calculateBalance(hours) {
    //TODO: Calculate day balance
  }

  _updateDay() {
    this.props.onUpdateDay(this.props.id);
  }

  _editDay() {
    console.log('TODO');
    // this.setState({
    //   edit: true
    // });
  }

}