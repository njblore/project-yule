import React, { Component } from 'react';

class BarChartAverage extends Component {
  state = {};

  render() {
    return <div ref="barChart">Bar Chart</div>;
  }

  componentDidMount() {
    //const totals = scores.games.map((game, i) => {}, {});
    //this.drawChart();
  }

  //   drawChart() {
  //     const svg = d3
  //       .select('body')
  //       .append('svg')
  //       .attr('width', 700)
  //       .attr('height', 300);

  //     svg
  //       .selectAll('rect')
  //       .data(data)
  //       .enter()
  //       .append('rect');
  //   }
}

export default BarChartAverage;
