
import { ChartData, ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Queries } from '../../Queries/Queries';
import { TimeSpanDataType } from '../../Queries/types';
import { useChartData } from '../hoooks/useChartData';
import {   FlipsideResponse,FlipsideQueryResult, useFlipside } from '../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../hoooks/useQueryWithTimeSpan';
import useQueryWithTimeSpan2 from '../hoooks/useQueryWithTimeSpan2';
import { SpinnerLoader } from '../Spinners/SpinnerLoader';
 const OPpriceQuery = `
  select HOUR::date daily,
avg(PRICE) price 
from optimism.core.fact_hourly_token_prices
  where SYMBOL = 'OP' 
  and HOUR::date >= CURRENT_DATE -30
group by 1 order by daily
`
const linechart  = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Aug", "Sep", "Oct"],
    datasets: [
      {
        label: "TOTAL BUDGET",
        data: [100, 210, 180, 454, 454, 230, 230, 656, 656, 350, 350, 210, 410],
        borderWidth: 3,
        backgroundColor: "transparent",
        borderColor: "#6259ca",
        pointBackgroundColor: "ffffff",
        pointRadius: 0,
        // type: "line",
        tension: 0.4,
      }
    //   ,
    //   {
    //     label: "AMOUNT USED",
    //     data: [200, 530, 110, 110, 480, 520, 780, 435, 475, 738, 454, 454, 230],
    //     borderWidth: 3,
    //     backgroundColor: "transparent",
    //     borderColor: "rgb(183, 179, 220,0.5)",
    //     pointBackgroundColor: "#ffffff",
    //     pointRadius: 0,
    //     // type: "line",
    //     borderDash: [7, 3],
    //     tension: 0.3,
    //   },
    ],
  };
  const VerticalSettings =[{
    borderWidth: 3,
    backgroundColor: "transparent",
    borderColor: "#6259ca",
    pointBackgroundColor: "ffffff",
    pointRadius: 0,
    // type: "line",
    tension: 0.4,
  },
  {
    borderWidth: 3,
    backgroundColor: "transparent",
    borderColor: "#6259ca",
    pointBackgroundColor: "ffffff",
    pointRadius: 0,
    // type: "line",
    tension: 0.4,
  }

]
  interface Props {
    className: string,
    options:ChartOptions,
    height:string;
    CurrentTimeSpan :TimeSpanDataType
  }
export default function OPpriceComp({ className, options, height, CurrentTimeSpan }:Props){
  // const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.OPPrice, CurrentTimeSpan)
  console.log("useQueryWithTimeSpan2(Queries.OverView.OPPrice, CurrentTimeSpan)", useQueryWithTimeSpan2(Queries.OverView.OPPrice, CurrentTimeSpan))
  const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.OverView.OPPrice, CurrentTimeSpan));
  const ChartData = useChartData(0, Result.QueryResult, VerticalSettings)

    return(
       <>
        {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
        <Line height={height} 
        //@ts-ignore
        options={options} className={className} data={{ labels: ChartData.horizontal, 
          //@ts-ignore
          datasets: ChartData.vertical }}></Line>
       }
        </>
      
    )
}