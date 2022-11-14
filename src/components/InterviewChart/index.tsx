import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ChartProps } from "types/interview/interview-type"

ChartJS.register(ArcElement, Tooltip, Legend);

const InterviewChart: React.FC<ChartProps> = ({happy}) => {
    const data = {
        labels : ['happy', 'not happy'],
        datasets: [
            {
                label: 'happy',
                data: [happy, 100-happy],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                  ],
                borderWidth: 1,
            }
        ]
    };

    return (
            <Pie data={data} style={{ width:'80%', margin:'5% auto 0 auto'}}/>
    )
};


export default InterviewChart