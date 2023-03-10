import { ChartData, ChartOptions, CoreChartOptions, DatasetChartOptions, ElementChartOptions, PluginChartOptions, PolarAreaControllerChartOptions, ScaleChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { FlipsideResponse, useFlipside } from '../../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../../hoooks/useQueryWithTimeSpan';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
import * as  R from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import { _DeepPartialObject } from 'chart.js/types/utils';
import ReactEcharts from 'echarts-for-react';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
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
    backgroundColor: "transparent",
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        // top: 'bottom',
        bottom: 0,
        show: false,
        textStyle: {
            color: "white"
        }
    
    },
    series: [
        {
            name: 'Sales Distribution',
            type: 'pie',
            radius: [50, 80],
            center: ['50%', '50%'],
            // roseType: 'markArea',
            height:"270",
            // roseType: 'area',
            color: ["#9877f9", "#53caed", 'rgb(255, 99, 132)', "#fd7e14", "#28a745", "#20c997","#f1388b"],
            label: {
                // color: "white"
            },
            itemStyle: {
                borderRadius: 2,


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
export default function AirDropDistributionComp({ className, options, height, CurrentTimeSpan }: Props) {
    const Result: FlipsideResponse = useFlipside(Queries.AirDrop.AirDropDistribution);
    const [PolarChart, setPolarChart] = useState<typeof option>(option)
    useEffect(() => {

        if (Result.Success && Result.QueryRows.length > 0) {
            let Temp = R.clone(option);
            let TempData: { value: number; name: string }[] = []
            Result.QueryRows.map((item, index) => {
                //@ts-ignore
                TempData.push({ name: item[0], value: item[1] })
            })
            Temp.series[0].data = R.clone(TempData);
            setPolarChart(R.clone(Temp))
        }

    }, [Result.Success, Result.QueryRows])
    return (
        <>
            {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
                <div  >
                    <ReactEcharts theme="dark" lazyUpdate className="chartsh" option={PolarChart}
                        //@ts-ignore
                        series={PolarChart.series} />
                </div>
            }
        </>

    )
}