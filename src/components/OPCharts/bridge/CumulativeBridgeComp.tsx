
import { ChartData, ChartOptions } from 'chart.js';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Bar, Line  } from "react-chartjs-2";
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { useChartData } from '../../hoooks/useChartData';
import { FlipsideResponse, FlipsideQueryResult, useFlipside } from '../../hoooks/useflipside';
import { useGroupedChartData } from '../../hoooks/useGroupedChartData';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
const VerticalSettings2 = {
    datasets: [
        {
            backgroundColor: "#9877f9",
            borderColor: "#9877f9",
            type: "line",
            tension: 0.4,
            // yAxisID: 'y',
            fill:false
            // fill: true,
        },
        {

            backgroundColor: "#53caed",
            borderColor: "#53caed",
            type: "line",
            tension: 0.4,
            // yAxisID: 'y',
            fill: false
            // fill: true,
        }
        ,
        {
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
            // stack: 'y',
        },
        {
            backgroundColor: "#fd7e14",
            borderColor: "#fd7e14",
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
            // stack: 'y',
        },
        {
            backgroundColor: "#20c997",
            borderColor: "#20c997",
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
            // stack: 'y',
        },
        {
            backgroundColor: "#f1388b",
            // stack: 'y',
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
        },
        {
            backgroundColor: "#28a745",
            // stack: 'y',
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
        },
    ],
};

const options = {
    maintainAspectRatio: false,
    
    plugins: {
        legend: { // labele balaye chart 
            position: "bottom",
            display: false,
        },
        tooltip: {
            enabled: true,
        }
    },
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    scales: {
        x: {
            stacked: false,
            
        },
        y: {
            type: 'logarithmic' as const,
            stacked: false,
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },

        }
        ,
         y1: {
             type: 'linear' as const,
             position: 'right',
            stacked: false,
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },

        }
        // ,
        // y1: {
        //     type: 'logarithmic' as const,
        //     stacked: false,

        // },
    },
};

interface Props {
    className: string,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
export default function CumulativeBridgeComp({ className, height, CurrentTimeSpan }: Props) {
    // const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.DailynumtransactionsandActiveusers, CurrentTimeSpan)
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.Bridge.NumBeridgesOverTime, CurrentTimeSpan));
    //@ts-ignore
    const chartdatatemp = useGroupedChartData(0,4, 1, Result.QueryResult, VerticalSettings2.datasets);
    return (
    <>

        {Result.Loading ? <SpinnerLoader  className={'ht-250'} /> :
            <Bar
                //@ts-ignore   
                                        options={options}
                data={{
                    labels: chartdatatemp.horizontal,
                    //@ts-ignore
                    datasets: chartdatatemp.vertical
                }}
                // className="linechart "
                height={'250'}
            />
        }
            
 
        </>
    )
}