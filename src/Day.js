import React, { Component } from 'react';
import './Day.css';

class Day extends Component {
  render() {
    return (
      <div className="Day">
        <strong>{this.props.date}</strong>
        {this.props.hours.map(hour => ` - ${hour}`)}
      </div>
    );
  }

  _calculateBalance(hours) {
    //TODO: Calculate day balance
  }

}

export default Day;