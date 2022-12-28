
import { ChartData, ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { useFlipside } from '../hoooks/useflipside';
 const OPpriceQuery = `
  select HOUR::date daily,
avg(PRICE) price 
from optimism.core.fact_hourly_token_prices
  where SYMBOL = 'OP' 
  and HOUR::date >= CURRENT_DATE -30
group by 1 
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
  interface Props {
    className: string,
    options:ChartOptions,
    height:string
  }
export default function OPpriceComp ({className,options,height}:Props){
   const OPPrice =  useFlipside(OPpriceQuery);
    const [labels, setlabels] = useState<Array<string | number | boolean | null>>([])
    // const [datasets, setdatasets] = useState<Array<>>
    useEffect(() => { 
        if(OPPrice.length >0)
        OPPrice[0].name
    }, [OPPrice])
   console.log("OPPrice",OPPrice)
   
    return(
       <>
        <Line  height={height} options={options}  className={className} data={{labels:linechart.labels,datasets:linechart.datasets}}></Line>
        </>
      
    )
}