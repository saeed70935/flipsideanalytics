
import { ChartData, ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Queries } from '../../Queries/Queries';
import { TimeSpanDataType } from '../../Queries/types';
import { useChartData } from '../hoooks/useChartData';
import { FlipsideResponse, FlipsideQueryResult, useFlipside } from '../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../hoooks/useQueryWithTimeSpan';
import { SpinnerLoader } from '../Spinners/SpinnerLoader';
const VerticalSettings = [{
    backgroundColor: "#9877f9",
    borderColor: "#9877f9",
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",
    // label: "",
}

];
export const linechartoptions = {
    
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: false,
                text: "Chart.js Line Chart",
            },
        },
};
interface Props {
    className: string,
    options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
export default function ActiveUsersOnWeekdays({ className, options, height, CurrentTimeSpan }: Props) {
    const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.ActiveUsersOnWeekDays, CurrentTimeSpan)
    const Result: FlipsideResponse = useFlipside(ModifiedQuery);
    const ChartData = useChartData(0, Result.QueryResult, VerticalSettings);
    console.log("ChartData", ChartData)
    return (
        <>
            {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
             <Bar
             //@ts-ignore   
             options={linechartoptions}
                data={{
                        labels: ChartData.horizontal,
                        //@ts-ignore
                        datasets: ChartData.vertical
                    }}
                className="barchart"
                height="250"
              />
                // <Line height={height}
                //     //@ts-ignore
                //     options={linechartoptions} className={className} data={{
                //         labels: ChartData.horizontal,
                //         //@ts-ignore
                //         datasets: ChartData.vertical
                //     }}></Line>
            }
        </>

    )
}