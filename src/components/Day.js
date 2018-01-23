import React, { Component } from 'react';
import './Day.css';

export default class Day extends Component {

  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      hover: false,
      date: props.date,
      hours: props.hours.join(" ")
    }
  }

  render() {
    let formClass = "";
    let date = <div className="Day-date">{this.props.date}</div>
    let hours = this.props.hours.map(hour => <div key={hour.toString()} className="Day-hour">{hour}</div>)
    let button = "";
    let onClickAction = ()=>{};
    if (this.state.hover) {
      formClass = "Day--hover";
    }
    if (this.state.edit) {
      formClass = "Day-form";
      date = <input
        className="Day-form-date"
        placeholder="Date"
        value={this.state.date}
        onChange={this._handleChangeDate.bind(this)}
        />
      hours = <input
        className="Day-form-hours"
        placeholder="Hours"
        value={this.state.hours}
        onChange={this._handleChangeHours.bind(this)}
        />
      button = <button className="button button__edit" onClick={this._updateDay.bind(this)}>Save</button>
    } else {
      onClickAction = this._editDay.bind(this);
    }

    return (
      <div
        className={`Day ${formClass}`}
        onClick={onClickAction}
        onMouseEnter={this._onMouseHandler.bind(this)}
        onMouseLeave={this._onMouseHandler.bind(this)}>
        {date}
        {hours}
        {button}
      </div>
    );
  }

  _onMouseHandler() {
    this.setState({
      hover: !this.state.hover
    });
  }

  _handleChangeHours(event) {
    this.setState({
      hours: event.target.value
    });
  }

  _handleChangeDate(event) {
    this.setState({
      date: event.target.value
    });
  }

  _calculateBalance(hours) {
    //TODO: Calculate day balance
  }

  _updateDay() {
    let day = {
      date: this.state.date,
      hours: this.state.hours.split(" "),
      key: this.props.id
    };
    this.props.onUpdateDay(day);
    this.setState({
      edit: false
    })
  }

  _editDay() {
    this.setState({
      edit: true
    });
  }

}