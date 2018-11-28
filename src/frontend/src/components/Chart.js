import React, { Component } from "react";
import { Line } from "react-chartjs-2";

// example for "Skill" in json format

class Chart extends Component {
  render() {
    const data = {
      datasets: [
        {
          label: this.props.skill,
          data: this.props.data,
          pointBorderColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,1)",
          fill: false,
          pointBorderWidth: "rgba(75,192,192,1)"
        }
      ]
    };
    return (
      <div className="Chart">
        <Line
          data={data}
          width={this.props.width}
          height={this.props.height}
          options={{
            scales: {
              xAxes: [
                {
                  type: "time",
                  position: "bottom",
                  ticks: { display: this.props.display },
                  time: {
                    displayFormats: { month: "MM/YY" },
                    tooltipFormat: "ll",
                    unit: "month"
                  }
                }
              ],
              yAxes: [
                {
                  ticks: {
                    display: this.props.display,
                    beginAtZero: true,
                    steps: 0.5,
                    stepValue: 1,
                    max: 7
                  }
                }
              ]
            },
            pan: {
              enabled: true,
              mode: "x"
            },
            zoom: {
              enabled: true,
              mode: "xy"
            },
            startAtZero: true,
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

export default Chart;
