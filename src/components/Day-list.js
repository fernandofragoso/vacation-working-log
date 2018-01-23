import React, { Component } from 'react';
import Day from './Day';

export default class DayList extends Component {
  render() {
    return (
      this.props.days.map(day => <Day onUpdateDay={this._updateDay.bind(this)} date={day.date} hours={day.hours} id={day.key} key={day.key} />)
    );
  }

  _updateDay(day) {
    this.props.onUpdateDay(day);
  }

}