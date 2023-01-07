
import { ChartData, ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { useChartData, verticalChartData } from '../../hoooks/useChartData';
import { FlipsideResponse, FlipsideQueryResult, useFlipside } from '../../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../../hoooks/useQueryWithTimeSpan';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
import * as R from 'ramda';
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
    CurrentTimeSpan: TimeSpanDataType;
    QueryResult: FlipsideResponse;
    VerticalIndex :number;
    HorizontalIndex :number 
}
export default function TopSwapPairsComp({ className,  height, QueryResult, VerticalIndex, HorizontalIndex }: Props) {
    // const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.DailynumtransactionsandActiveusers, CurrentTimeSpan)
    // const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.OverView.DailynumtransactionsandActiveusers, CurrentTimeSpan));
    const ChartData = useChartData(HorizontalIndex, QueryResult.QueryResult, VerticalSettings);
    const [SelectedVertical, setSelectedVertical] = useState<verticalChartData[]>([])
    useEffect(() => { 
        if (ChartData.vertical.length>0){
            let temp: verticalChartData[] = [];
            ChartData.vertical.map((item,index)=>{
                if (index === VerticalIndex)
                    temp.push(item)
            })
            setSelectedVertical(R.clone(temp));
        }
       
    }, [ChartData.vertical, VerticalIndex,])
    return (
        <>
            {QueryResult.Loading ? <SpinnerLoader height={height} className={className} /> :
                <Bar height={height}
                    //@ts-ignore
                    options={linechartoptions} className={className} data={{
                        labels: ChartData.horizontal,
                        //@ts-ignore
                        datasets: SelectedVertical
                    }}></Bar>
            }
        </>

    )
}