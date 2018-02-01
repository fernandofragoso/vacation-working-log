import React, { Component } from 'react';
import Moment from 'moment';
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
    let balance = this._calculateBalance();
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
      balance = ""
      button = <button className="button button__edit" onClick={this._updateDay.bind(this)}>Save</button>
    } else {
      if (this.props.isLogged) {
        onClickAction = this._editDay.bind(this);
      }
    }

    return (
      <div
        className={`Day ${formClass}`}
        onClick={onClickAction}
        onMouseEnter={this._onMouseHandler.bind(this)}
        onMouseLeave={this._onMouseHandler.bind(this)}>
        {date}
        {hours}
        <div className="Day-balance">{balance}</div>
        {button}
      </div>
    );
  }

  _formatDate(date) {
    return new Moment(date, "YYYY/MM/DD").format("DD/MM/YY");
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

  //Calculate Day balance
  _calculateBalance() {
    let balanceInMinutes = 0;
    let previousHours = 0;
    let previousMinutes = 0;

    this.props.hours.forEach((hour, index) => {
      let hourArray = hour.split(":");
      if (index%2 === 1){
          let currentHours = parseInt(hourArray[0], 10);
          let currentMinutes = parseInt(hourArray[1], 10);
          if (currentMinutes >= previousMinutes) {
            balanceInMinutes += currentMinutes - previousMinutes;
            balanceInMinutes += (currentHours - previousHours) * 60;
          } else {
            balanceInMinutes += 60 - previousMinutes + currentMinutes;
            balanceInMinutes += (currentHours - (previousHours+1)) * 60;
          }
      }
      previousHours = parseInt(hourArray[0], 10);
      previousMinutes = parseInt(hourArray[1], 10);
    });

    balanceInMinutes = balanceInMinutes - (60 * 8);
    return this._formatBalance(balanceInMinutes);
  }

  //Format minutes to '00:00' (110 -> '01:50')
  _formatBalance(minutes) {
    let m = "00";
    let h = "00";
    let s = "";
    let classNames = "Day-balance--positive";

    //Negative values
    if (minutes < 0) {
      s = "-";
      minutes = -minutes;
      classNames = "Day-balance--negative"
    }

    if (minutes < 60) {
        m = minutes.toString();
    } else {
      let hours = Math.floor(minutes/60);
      let remainingMinutes = minutes - (60*hours);
      h = hours.toString();
      m = remainingMinutes.toString();
    }

    m = ((m.length === 1) ? `0${m}` : m);
    h = ((h.length === 1) ? `0${h}` : h);

    return <span className={classNames}>{`${s}${h}:${m}`}</span>
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