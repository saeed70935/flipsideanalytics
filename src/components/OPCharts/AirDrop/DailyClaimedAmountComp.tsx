
import { ChartData, ChartOptions } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { ChartDataResult, useChartData } from '../../hoooks/useChartData';
import { FlipsideResponse, FlipsideQueryResult, useFlipside } from '../../hoooks/useflipside';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
import * as R from 'ramda';
const VerticalSettings = [{
    borderWidth: 0,
    backgroundColor: "#20c997",
    borderColor: "#20c997",
    pointBackgroundColor: "#ffffff",
    pointRadius: 0,
    type: "bar",
    tension: 0.4,
    yAxisID: 'y1',
    order: 2
 
},
{
    borderWidth: 3,
    backgroundColor: "transparent",
    // borderColor: "#fd7e14",
    borderColor: "#f1388b",
    pointBackgroundColor: "#ffffff",
    pointRadius: 0,
    borderDash: [8, 3],
    fill: true,
    tension: 0.4,
    yAxisID: 'y2',
    order: 2
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
            // type: 'time',
            ticks: {
                fontColor: "#c8ccdb",
            },
            // time: {
            //     // Luxon format string
            //     tooltipFormat: 'DD T'
            // },
            barPercentage: 0.7,
            display: true,
            grid: {
                borderColor: 'rgba(119, 119, 142, 0.2)',
            }
        },
        y1: {
            type: 'logarithmic' as const ,
            display: true,
            position: 'left' as const,
            grid: {
                borderColor: 'rgba(119, 119, 142, 0.2)',
            },
            scaleLabel: {
                display: true,
                labelString: 'Thousands',
                fontColor: 'transparent'
            }
        },
        y2: {
            type: 'linear' as const,
            display: true,
            position: 'right' as const,
            grid: {
                drawOnChartArea: false,
            }
        }
    },
    interaction: {
        intersect: true,
    },
};
interface Props {
    className: string,
    options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
export default function DailyClaimedAmountComp({ className, options, height, CurrentTimeSpan }: Props) {
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.AirDrop.claimedOverTime, CurrentTimeSpan));
    const ChartData = useChartData(0, Result.QueryResult, VerticalSettings,true);
    const [SelectedChartData, setSelectedChartData] = useState<ChartDataResult>({ horizontal: [], vertical: [] })
   
    useEffect(()=>{
        let temp :ChartDataResult = {horizontal:[],vertical:[]}
        if (ChartData.horizontal.length > 0 && ChartData.vertical.length >0 ){
            temp.horizontal = R.clone(ChartData.horizontal);
            temp.vertical.push( {...ChartData.vertical[0],...VerticalSettings[0]});
            temp.vertical.push({...ChartData.vertical[3], ...VerticalSettings[1]});
        }
        setSelectedChartData(R.clone(temp));
    }, [ChartData.horizontal,ChartData.vertical])
    return (
        <>
            {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
                <Line height={height}
                    //@ts-ignore
                    options={linechartoptions} className={className} data={{
                        labels: SelectedChartData.horizontal,
                        //@ts-ignore
                        datasets: SelectedChartData.vertical
                    }}></Line>
            }
        </>

    )
}