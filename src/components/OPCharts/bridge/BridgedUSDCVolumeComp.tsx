import { ChartData, ChartOptions, CoreChartOptions, DatasetChartOptions, ElementChartOptions, PluginChartOptions, PolarAreaControllerChartOptions, ScaleChartOptions } from 'chart.js';
import React, { useCallback, useEffect, useState } from 'react';
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { FlipsideResponse, useFlipside } from '../../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../../hoooks/useQueryWithTimeSpan';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
import * as  R from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import { _DeepPartialObject } from 'chart.js/types/utils';
import ReactEcharts,{EChartsOption} from 'echarts-for-react';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { useGroupedChartData } from '../../hoooks/useGroupedChartData';

const VerticalSettings3 = {
    datasets: [
        {
          
        },
        
    ],
};

interface Props {
    className: string,
    options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
const option2 = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    backgroundColor: 'transparent',
    angleAxis: {
        type: 'category',
        data: [],

    },
    radiusAxis: {
        min: 1,
        max: 100
},
    polar: { center: ['50%', '50%'] ,radius:'60%'},
    // yAxis:{type:'log'},
    series: [
        {
            type: 'bar',
            // data: [300, 2, 3, 4, 3, 5, 3000],
            data:[],
            coordinateSystem: 'polar',
            // name: 'ETH->Opt',
            color: 'rgb(255, 99, 132)' ,
            stack: 'a',
            emphasis: {
                focus: 'series'
            }
        },
        {
            type: 'bar',
            // data: [200, 4, 6, 1, 3, 2, 5000],
            data: [],
            coordinateSystem: 'polar',
            color: "#20c997",
            // color: ["#9877f9", "#53caed", 'rgb(255, 99, 132)', "#fd7e14", "#28a745", "#20c997", "#f1388b", "#28a745"],
            // name: 'Opt->ETH',
            stack: 'a',
            emphasis: {
                focus: 'series'
            },

        },

    ],
    legend: {
        show: true,
        data: ['ETH->Opt', 'Opt->ETH'],
        // bottom:0
    }
};
const optioninit = { backgroundColor: 'transparent', angleAxis: { data: [], type: 'category' }, legend: option2.legend , polar: {} , radiusAxis: option2.radiusAxis, series: [] }

export default function BridgedUSDCVolumeComp({ className, options, height, CurrentTimeSpan }: Props) {
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.Bridge.BridgedUSDC, "Last 30 days"));
    console.log("PURE",Result.QueryResult)
    //@ts-ignore
    const Grouped = useGroupedChartData(1, 2, 0, Result.QueryResult, VerticalSettings3, Result.Success)
    
    const [PolarChart, setPolarChart] = useState<typeof option2>(option2)
    useEffect(() => {
        console.log("RLRRLRLRL", Grouped)
        if (Result.Success && Grouped.vertical.length>0) {
            let Temp: typeof option2 = R.clone(option2)
            Temp.series = R.clone([]);
            //@ts-ignore
            Temp.angleAxis.data = R.clone( Grouped.horizontal)
            Grouped.vertical.map((item,index)=>{
                Temp.series.push({
                    ...option2[index], 
                    // data: index % 2 == 0 ? [5, 10, 20, 30, 40, 30, 20, 10, 20] : [3, 8, 20, 80, 50, 40, 20, 90, 40],
                     name: R.clone(item.label),
                //    type: 'bar',
                //    data: R.clone(item.data),
                data : item.data.map(item=>{
                    if(item <2)
                        return 10
                    return item
                }),
                    color: index == 0 ? "#fd7e14" : "#9877f9",
                //    stack: 'a',
                //    emphasis: {
                //        focus: 'series'
                //    }
               })
            })
            Temp.legend.data = Grouped.vertical.map(item=>{
                return item.label
            })
            console.log("after", Temp)
            setPolarChart(R.clone(Temp));
            // Result.QueryRows.map((item, index) => {
            //     //@ts-ignore
            //     TempData.push({ name: item[0], value: item[1] })
            // })
            // Temp.series[0].data = R.clone(TempData);
            // setPolarChart(R.clone(Temp))
        }

    }, [Grouped.vertical, Result.Success,Grouped.horizontal])
    return (
        <>
            {Result.Loading ? <SpinnerLoader height={'ht-250'} className={'justify-content-center align-items-center ht-250 '} /> :
                <div  >
                    <ReactEcharts theme="dark" lazyUpdate className="chartsh" option={PolarChart}
                        //@ts-ignore
                        series={PolarChart.series}
                         />
                </div>
            }
        </>

    )
}