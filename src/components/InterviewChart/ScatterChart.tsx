import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { ScatterChartProps } from 'types/interview/interview-type';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export const options = {
  scales: {
    x: {
        beginAtZero: true,
        min: 0.2,
        max: 0.75,
        ticks: {
          display: false,
        }
      },
    y: {
      beginAtZero: true,
      min: 0.2,
      max: 0.85,
      ticks: {
        display: false,
      }
    },
  },
};

const ScatterChart: React.FC<ScatterChartProps> = ({combinedData}) => {
    const data = {
            datasets: [
                {
                    label: '시선',
                    data: combinedData,
                    backgroundColor: 'rgba(255, 99, 132, 0.3)',
                    pointRadius: 5,
                }
            ]
        };

    
    // useEffect(()=>{
    //     if(xData && yData){
    //         console.log(xData, yData);
    //         data.datasets[0].data = xData.map((x, i) => {
    //             return {
    //                 x: x,
    //                 y: yData[i],
    //             }
    //         });
    //     }
    // }, [xData, yData])

    return (
        <Scatter options={options} data={data} style={{  margin:'5% auto 0 auto', width:'75%',}}/>
    )
};


export default ScatterChart;