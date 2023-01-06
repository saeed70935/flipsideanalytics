import { ChartData, ChartOptions, CoreChartOptions, DatasetChartOptions, ElementChartOptions, PluginChartOptions, PolarAreaControllerChartOptions, ScaleChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie, PolarArea } from 'react-chartjs-2';
import { Queries } from '../../Queries/Queries';
import { TimeSpanDataType } from '../../Queries/types';
import { useChartData } from '../hoooks/useChartData';
import { FlipsideResponse, useFlipside } from '../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../hoooks/useQueryWithTimeSpan';
import { SpinnerLoader } from '../Spinners/SpinnerLoader';
import * as  R from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import { _DeepPartialObject } from 'chart.js/types/utils';
import ReactEcharts from 'echarts-for-react';
import useQueryWithTimeSpan2 from '../hoooks/useQueryWithTimeSpan2';
//@ts-ignore
// export const Piechart = {
//     unload: true,
//     data: {
//         unload: true,
//         columns: [],
//         type: 'pie'
//     }
// };

interface Props {
    className: string,
    options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
const option = {
    legend: {
        // top: 'bottom',
        bottom: 0,
        textStyle: {
            color: "white"
        }
    },
    series: [
        {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [30, 85],
            center: ['50%', '50%'],
            roseType: 'area',
            label: {
                color: "white"
            },
            itemStyle: {
                borderRadius: 8,
               

            },
            data: [
                { value: 40, name: 'rose 1' },
                { value: 38, name: 'rose 2' },
                { value: 32, name: 'rose 3' },
                { value: 30, name: 'rose 4' },
                { value: 28, name: 'rose 5' },
                { value: 26, name: 'rose 6' },
                { value: 22, name: 'rose 7' },
                { value: 18, name: 'rose 8' }
            ]
        }
    ]
};
export default function DistributionProtocols ({ className, options, height, CurrentTimeSpan }: Props) {
    const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.TransactionsType, CurrentTimeSpan )
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.OverView.TransactionsType, CurrentTimeSpan));
    const [PiID, setPIEID] = useState<string>(uuidv4())
    const [PolarChart, setPolarChart] = useState<typeof option>(option)
    const [DataIsReady, setDataIsReady] = useState(false);
    const [RenderChart, setRenderChart] = useState(false)
    // useEffect(() => { setPIEID(uuidv4()); setDataIsReady(false); setRenderChart(false) }, [ModifiedQuery])
    useEffect(() => {

        if (Result.Success && Result.QueryRows.length > 0) {
            console.log("ResultROWWSS", Result.QueryRows)
            let Temp = R.clone(option);
            let TempData: { value: number; name:string }[] =[]
            Result.QueryRows.map((item,index)=>{
                //@ts-ignore
                TempData.push({ name: item[0], value: item[1] })
            })
            Temp.series[0].data = R.clone(TempData);
            // Temp.data.unload = true;
            setPolarChart(R.clone(Temp))
            setDataIsReady(true)
        }

    }, [Result.Success, Result.QueryRows])
    return (
        <>
            {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
                // <div className="" id="morrisArea2">
                //     <C3Charts
                //         id="chart-pie2"
                //         className="chartsh"
                //         data={PolarChart.data}
                //     // columns={PolarChart.pie}
                //     />
                // </div>
                <div className="ht-300">
                    <ReactEcharts lazyUpdate className="chartsh" option={PolarChart} 
                //@ts-ignore
                series={PolarChart.series} />
                </div>
            }
        </>

    )
}