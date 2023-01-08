import { ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { FlipsideQueryResult, FlipsideResponse, useFlipside } from '../../hoooks/useflipside';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
import * as  R from 'ramda';
import { _DeepPartialObject } from 'chart.js/types/utils';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { Card, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useChartData, verticalChartData } from '../../hoooks/useChartData';
import { useGroupedChartData } from '../../hoooks/useGroupedChartData';
const VerticalSettings2 = {
    datasets: [
        {
            backgroundColor: "#9877f9",
            // stack: 'Stack 0',
        },
        {
           
            backgroundColor: "#53caed",
            // stack: 'Stack 0',
        },
        {
            backgroundColor: 'rgb(255, 99, 132)',
            
            // stack: 'Stack 2',
        },
        {
            backgroundColor: "#fd7e14",
            // stack: 'Stack 3',
        },
        {
            backgroundColor: "#20c997",
            // stack: 'Stack 4',
        },
        {
            backgroundColor: "#f1388b",
            // stack: 'Stack 4',
        },
        {
            backgroundColor: "#28a745",
            // stack: 'Stack 4',
        },
    ],
};
const options = {
    plugins: {
        // title: {
        //     display: false,
        //     text: 'Chart.js Bar Chart - Stacked',
        // },
        legend: {
            position: "top",
        },
    },
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    scales: {
        x: {
            stacked: true,
        },
        y: {
            stacked: true,
        },
    },
};

interface Props {
    className: string,
    // options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType;
    QueryResult: FlipsideResponse
}
export default function DailyNumPurchasersByPrice({ className, height, CurrentTimeSpan ,QueryResult }: Props) {
    const [FilteredTimespan, setFilteredTimespan] = useState<TimeSpanDataType>("Last 6 months")
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.NFT.DailyNumSalesbyPrice, FilteredTimespan));
    console.log("DailyNumPurchasersByPrice",Result)
    //@ts-ignore
    const chartdatatemp = useGroupedChartData(0, 2, 1, Result.QueryResult, VerticalSettings2.datasets);


    return (
        <>
        {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
            <Bar
                //@ts-ignore   
                    options={options}
                data={{
                    labels: chartdatatemp.horizontal,
                    //@ts-ignore
                    datasets: chartdatatemp.vertical
                }}
                // className="barchart"
                    height={height}
            />
        }     
        </>
    )

}