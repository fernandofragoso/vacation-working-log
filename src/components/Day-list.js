import React, { Component } from 'react';
import Day from './Day';

export default class DayList extends Component {
  render() {
    return (
      this.props.days.map(day => <Day date={day.date} hours={day.hours} key={day.key} />)
    );
  }

}