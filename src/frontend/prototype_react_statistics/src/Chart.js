import React, {components} from 'react';
import {Bar, Line} from 'react-chartjs-2';
import * as zoom from 'chartjs-plugin-zoom'


// example for "Skill" in json format
var json = {"label":"Python", 

            "data":[
                {
                x: '2015-05-01',
                y: 0
                },
                {
                x: '2016-08-03',
                y: 1
            },{
                x: '2019-07-06',
                y: 4
            },{
                x: '2021-11-23',
                y: 5
            }],

            "color":'rgba(75,192,192,1)'
        };

        

    const data = {
    
    datasets: [
      {
        label: json.label,
        data: json.data,

        pointBorderColor: json.color,
        borderColor: json.color,        
        pointHoverBackgroundColor: json.color,
        pointHoverBorderColor: json.color,
        backgroundColor: json.color,
        fill: false,
        pointBorderWidth: 2,
        
    }
    ]
    
  };

 
  
class Chart extends React.Component{
 
    
    render(){
        return(
            
            <div className = "Chart">
                <Line
                    data={data}
                    width={1110}
                    height={550}
                    options={{
                        scales: {
                            xAxes: [{
                                type: 'time',
                                position: 'bottom',
                                time: {
                                  displayFormats: {'month': 'MM/YY'},
                                  tooltipFormat: 'll',
                                  unit: 'month',
                                 }
                              }],
                            yAxes: [{
                                    display: true,
                                    ticks: {
                                        beginAtZero: true,
                                        steps: 0.5,
                                        stepValue: 1,
                                        max: 7
                                    }
                                }]
                        },
                        pan:{
                            enabled: true,
                             mode: 'x'
                        },
                          zoom: {
                            enabled: true,
                            mode: 'xy',
                            
                          },
                        startAtZero: true,
                        maintainAspectRatio: false,

	                        }}
                    />
            </div>
            
        )
        
        
    }
    
}



export default Chart;
