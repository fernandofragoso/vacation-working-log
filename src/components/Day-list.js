import React, { Component } from 'react';
import Day from './Day';

export default class DayList extends Component {

  render() {
    let days = this.props.days.map(day => <Day onUpdateDay={this._updateDay.bind(this)} date={day.date} hours={day.hours} id={day.key} key={day.key} />);
    if (this.props.days.length === 0) {
      days = <div className='loading'>Loading...</div>
    }

    return (
      days
    );
  }

  _updateDay(day) {
    this.props.onUpdateDay(day);
  }

}