
import { ChartData, ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { useChartData } from '../../hoooks/useChartData';
import { FlipsideResponse, FlipsideQueryResult, useFlipside } from '../../hoooks/useflipside';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
const VerticalSettings = [{
    backgroundColor: ["#9877f9", "#53caed", 'rgb(255, 99, 132)', "#20c997", "#f1388b"],
    borderColor: ["#9877f9", "#53caed", 'rgb(255, 99, 132)', "#20c997", "#f1388b"],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",
    // label: "",
}

];
export const linechartoptions = {
        // indexAxis: 'y' as const,
        responsive: true,
    scales: {
        x:{
            display:true
        },
        y:{

        }
    },
        maintainAspectRatio: false,
    elements: {
        bar: {
            borderWidth: 2,
            display:false
        },
    },
        plugins: {
                legend: {
                    position: 'right' as const,
                    display:false
                },
            title: {
                display: false,
                text: "",
            },
        },
};
interface Props {
    className: string,
    options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
export default function TopCollectionsByVolume({ className, options, height, CurrentTimeSpan }: Props) {
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.NFT.Top5CollectionsbyVolume, CurrentTimeSpan));
    //@ts-ignore
    const ChartData = useChartData(0, Result.QueryResult, VerticalSettings);
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