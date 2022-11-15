import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';
  
import { ChartProps } from "types/interview/interview-type"

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );

const InterviewChart: React.FC<ChartProps> = ({emotions, values}) => {
    const data = {
        labels : emotions,
        datasets: [
            {
                label: '# of Emotions',
                data: values,
                backgroundColor: [
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                  ],
                borderWidth: 1,
            }
        ]
    };

    return (
            <Radar data={data} style={{  margin:'5% auto 0 auto', width:'75%',}}/>
    )
};


export default InterviewChart