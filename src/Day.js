import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
  render() {
    return (
      <div className="Day">
        <div className="Day-date">{this.props.date}</div>
        {this.props.hours.map(hour => <div key={hour.toString()} className="Day-hour">{hour}</div>)}
      </div>
    );
  }

  _calculateBalance(hours) {
    //TODO: Calculate day balance
  }

}

export default Day;