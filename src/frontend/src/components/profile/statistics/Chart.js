import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-zoom'; // muss bleiben!! sonst funktioniert zoom nicht

const Chart = (props) => {
  const {
    skill, witdh, height, display, enabledZoom, milestones,
  } = props;

  const datastructure = [];
  Object.keys(milestones).map(idx => datastructure.push({ x: milestones[idx].date, y: milestones[idx].level }));

  const dataSet = {
    datasets: [
      {
        label: skill,
        data: datastructure,
        pointBorderColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,1)',
        fill: false,
        pointBorderWidth: 'rgba(75,192,192,1)',
      },
    ],
  };

  return (
    <div className="Chart">
      <Line
        data={dataSet}
        width={witdh}
        height={height}
        options={{
          scales: {
            xAxes: [
              {
                type: 'time',
                position: 'bottom',
                ticks: { display },
                time: {
                  displayFormats: { month: 'MM/YY' },
                  tooltipFormat: 'll',
                  unit: 'month',
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  display,
                  beginAtZero: true,
                  steps: 0.5,
                  stepValue: 1,
                  max: 7,
                },
              },
            ],
          },
          pan: {
            enabled: enabledZoom,
            mode: 'x',
          },
          zoom: {
            enabled: enabledZoom,
            mode: 'xy',

            rangeMin: {
              y: -10,
            },
            rangeMax: {
              y: 30,
            },
          },
          startAtZero: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default Chart;
