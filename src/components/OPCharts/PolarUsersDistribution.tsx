import {  ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Queries } from '../../Queries/Queries';
import { TimeSpanDataType } from '../../Queries/types';
import { FlipsideResponse, useFlipside } from '../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../hoooks/useQueryWithTimeSpan';
import { SpinnerLoader } from '../Spinners/SpinnerLoader';
import  * as  R from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import { _DeepPartialObject } from 'chart.js/types/utils';
import ReactEcharts from 'echarts-for-react';
import useQueryWithTimeSpan2 from '../hoooks/useQueryWithTimeSpan2';

const option = {
    backgroundColor:"transparent",
    tooltip: {
        trigger: 'item',
        
    },
    legend: {
        bottom: 0,
        show: true,
        // textStyle: { fontSize: 10 }
        // left: 'center'
    },
    series: [
        {
            // name: 'Access From',
            type: 'pie',
            color: ["#9877f9", "#53caed", 'rgb(255, 99, 132)', "#fd7e14", "#28a745", "#20c997", "#f1388b"],
            height:'250px',
            radius: ['50%', '80%'],
            avoidLabelOverlap: true,
            
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 1.5
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 10,
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                
            ]
        }
    ]
};
interface Props {
    className: string,
    options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
export default function UsersDistributionByNumTransactions({ className, options, height, CurrentTimeSpan }: Props) {
    // const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.DistributionByNumTransactions, CurrentTimeSpan)
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.OverView.DistributionByNumTransactions, CurrentTimeSpan));
    const [PiID, setPIEID] = useState<string>(uuidv4())
    const [PolarChart, setPolarChart] = useState<typeof option>(option)
    useEffect(()=>{
        
        if(Result.Success && Result.QueryRows.length >0){
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
                // <div className="" id="morrisArea2">
                //     <C3Charts
                //         id="chart-pie2"
                //         className="chartsh"
                //         data={PolarChart.data}
                //         // columns={PolarChart.pie}
                //     />
                // </div>
                <div className="ht-400" id="morrisArea2">
                    <ReactEcharts 
                    style={{height:"400px",backgroundColor:"transparent"}} theme="dark"
                        // id="chart-pie2"
                        // className="chartsh"
                        lazyUpdate  option={PolarChart}
                        //@ts-ignore
                        series={PolarChart.series}
                        // columns={PolarChart.pie}
                    />
                </div>
            }
        </>

    )
}