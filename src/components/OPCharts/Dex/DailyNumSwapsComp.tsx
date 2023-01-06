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
const VerticalSettings = [{
    backgroundColor: ["#9877f9", "#53caed", "#f44336"],
    borderColor: ["#9877f9", "#53caed", "#f44336"],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
{
    backgroundColor: ["#9877f9", "#53caed", "#f44336"],
    borderColor: ["#9877f9", "#53caed", "#f44336"],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
{
    backgroundColor: ["#9877f9", "#53caed", "#f44336"],
    borderColor: ["#9877f9", "#53caed", "#f44336"],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
{
    backgroundColor: ["#9877f9", "#53caed", "#f44336"],
    borderColor: ["#9877f9", "#53caed", "#f44336"],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
{
    backgroundColor: ["#9877f9", "#53caed", "#f44336"],
    borderColor: ["#9877f9", "#53caed", "#f44336"],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
{
    backgroundColor: ["#9877f9", "#53caed", "#f44336"],
    borderColor: ["#9877f9", "#53caed", "#f44336"],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
{
    backgroundColor: ["#9877f9", "#53caed", "#f44336"],
    borderColor: ["#9877f9", "#53caed", "#f44336"],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
{
    backgroundColor: ["#9877f9", "#53caed", "#f44336"],
    borderColor: ["#9877f9", "#53caed", "#f44336"],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
];
const VerticalSettings2 = {
    datasets: [
        {
            backgroundColor:  "#53caed",
            // backgroundColor: 'rgb(255, 99, 132)',
            stack: 'Stack 0',
        },
        {
           
            backgroundColor: "#9877f9",
            stack: 'Stack 1',
        },
        {
            backgroundColor: 'rgb(255, 99, 132)',
            // backgroundColor: 'rgb(53, 162, 235)',
            stack: 'Stack 2',
        },
    ],
};
const options = {
    plugins: {
        title: {
            display: false,
            text: 'Chart.js Bar Chart - Stacked',
        },
        legend: {
            position: "bottom",
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
            stacked: false,
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
export default function DailyNumSwapsComp({ className, height, CurrentTimeSpan ,QueryResult }: Props) {
    // const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.DistributionByNumTransactions, CurrentTimeSpan)
    const chartdatatemp = useGroupedChartData(1, 2, 0, QueryResult.QueryResult, VerticalSettings2.datasets);
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.Dex.TotalSwapsBasedOnDex, CurrentTimeSpan));
    //@ts-ignore
    const ChartData = useChartData(0, Result.QueryResult, VerticalSettings);
    const [TotalSWapsData, setTotalSwapsData] = useState<verticalChartData[]>([]);
    const [TotalSWappersData, setTotalSWappersData] = useState<verticalChartData[]>([]);
    const [NumPools, setNumPools] = useState<verticalChartData[]>([]);
    useEffect(() => {

        if (Result.Success && ChartData.vertical.length > 0) {
            let tempSWapsData: verticalChartData[] = [];
            let tempTotalSWappersData: verticalChartData[] = [];
            let tempNumPools: verticalChartData[] = [];
            tempSWapsData.push(ChartData.vertical[0]);
            tempTotalSWappersData.push(ChartData.vertical[1])
            tempNumPools.push(ChartData.vertical[6])
            setTotalSwapsData(R.clone(tempSWapsData))
            setTotalSWappersData(R.clone(tempTotalSWappersData))
            setNumPools(R.clone(tempNumPools))
        }

    }, [Result.Success, ChartData.vertical])

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