import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    BarController,
    BarElement,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    registerables,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import { WordCountChartProps } from "types/interview/interview-type"

ChartJS.register(
    RadialLinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    LinearScale,
    BarController,
    BarElement,
    Filler,
    Tooltip,
    Legend
  );

const WordCountChart: React.FC<WordCountChartProps> = ({wordCounts}) => {
    let labels: string[] = [];
    let values: number[] = [];
    wordCounts.map((wordCount, idx) => {
        labels.push(wordCount.word);
        values.push(wordCount.count);
    })

    const data = {
        labels : labels,
        datasets: [
            {
                label: '반복어 분석',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                  ],
                borderWidth: 1,
            }
        ]
    };

    return (
        <Bar data={data} style={{  margin:'5% auto 0 auto', width:'75%',}}/>
    )
};


export default WordCountChart;