
import { ChartData, ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Queries } from '../../Queries/Queries';
import { TimeSpanDataType } from '../../Queries/types';
import { useChartData } from '../hoooks/useChartData';
import { FlipsideResponse, FlipsideQueryResult, useFlipside } from '../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../hoooks/useQueryWithTimeSpan';
import useQueryWithTimeSpan2 from '../hoooks/useQueryWithTimeSpan2';
import { SpinnerLoader } from '../Spinners/SpinnerLoader';
const VerticalSettings = [
    
    {
        backgroundColor: "rgba(113, 76, 190, 0.5)",
        borderColor: "rgba(113, 76, 190, 0.9)",
        fill: true,
        tension: 0.4,
        // borderDash: [5, 5],
    },
{
    borderColor: "rgba(235, 111, 51 ,0.9)",
    borderWidth: "1",
    backgroundColor: "rgba(	235, 111, 51, 0.7)",
    fill: true,
    tension: 0.4,
}

];
export const linechartoptions = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        title: {
            display: false,
        },
        legend: { // labele balaye chart 
            position: "bottom",
            display: true,
        },
        tooltip: {
            enabled: true,
        }
    },
    scales: {
        x: {
            ticks: {
                fontColor: "#c8ccdb",
            },
            barPercentage: 0.7,
            display: true,
            grid: {
                borderColor: 'rgba(119, 119, 142, 0.2)',
            }
        },
        y: {
            display: true,
            grid: {
                borderColor: 'rgba(119, 119, 142, 0.2)',
            },
            scaleLabel: {
                display: true,
                labelString: 'Thousands',
                fontColor: 'transparent'
            }
        },
        y1: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            },
        },
    },
    interaction: {
        intersect: false,
    },
};
interface Props {
    className: string,
    options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
export default function PerformanceOverTime({ className, options, height, CurrentTimeSpan }: Props) {
    const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.OptimismPerformance, CurrentTimeSpan)
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.OverView.OptimismPerformance, CurrentTimeSpan));
    const ChartData = useChartData(0, Result.QueryResult, VerticalSettings);
    return (
        <>
            {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
                <Line height={height}
                    //@ts-ignore
                    options={linechartoptions} className={className} data={{
                        labels: ChartData.horizontal,
                        //@ts-ignore
                        datasets: ChartData.vertical
                    }}></Line>
            }
        </>

    )
}