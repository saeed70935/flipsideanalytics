import { ChartData, ChartOptions, CoreChartOptions, DatasetChartOptions, ElementChartOptions, PluginChartOptions, PolarAreaControllerChartOptions, ScaleChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Pie, PolarArea } from 'react-chartjs-2';
import { Queries } from '../../Queries/Queries';
import { TimeSpanDataType } from '../../Queries/types';
import { useChartData } from '../hoooks/useChartData';
import { FlipsideResponse, useFlipside } from '../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../hoooks/useQueryWithTimeSpan';
import { SpinnerLoader } from '../Spinners/SpinnerLoader';
import  * as  R from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import { _DeepPartialObject } from 'chart.js/types/utils';
//@ts-ignore
import C3Charts from 'react-c3js';
import { FlipsideRowsResponse, useFlipsideRows } from '../hoooks/useflipsideRows';
export const Piechart = {
    unload: true,
    data: {
        unload :true,
        columns: [],
        type: 'pie'
    }
};

interface Props {
    className: string,
    options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
export default function UsersDistributionByNumTransactions({ className, options, height, CurrentTimeSpan }: Props) {
    const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.DistributionByNumTransactions, "Last 30 days")
    const Result: FlipsideResponse = useFlipside(ModifiedQuery);
    const [PiID, setPIEID] = useState<string>(uuidv4())
    const [PolarChart, setPolarChart] = useState<typeof Piechart>(Piechart)
    const [DataIsReady, setDataIsReady] = useState(false);
    const [RenderChart,setRenderChart] = useState(false)
    useEffect(() => { setPIEID(uuidv4()); setDataIsReady(false); setRenderChart(false)   }, [ModifiedQuery])
    useEffect(()=>{
        
        if(Result.Success && Result.QueryRows.length >0){
            let Temp = R.clone(Piechart);
            //@ts-ignore
            Temp.data.columns = R.clone(Result.QueryRows);
            Temp.data.unload = true; 
            setPolarChart(R.clone(Temp))
            setDataIsReady(true)
        }

    }, [Result.Success, Result.QueryRows])
    useEffect(() => {
        if(DataIsReady) {
            setPIEID(uuidv4())
            setRenderChart(true)
        }
         }, [DataIsReady])
    return (
        <>
            {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
                <div className="" id="morrisArea2">
                    <C3Charts
                        id="chart-pie2"
                        className="chartsh"
                        data={PolarChart.data}
                        // columns={PolarChart.pie}
                    />
                </div>
            }
        </>

    )
}