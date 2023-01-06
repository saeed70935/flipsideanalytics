import { ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { TimeSpanDataType } from '../../Queries/types';
import dynamic from 'next/dynamic';
import { useQueryWithTimeSpan } from '../hoooks/useQueryWithTimeSpan';
import { FlipsideResponse, useFlipside } from '../hoooks/useflipside';
import { Queries } from '../../Queries/Queries';
import { SpinnerLoader } from '../Spinners/SpinnerLoader';
import * as R from 'ramda';
import { convertToInternationalCurrencySystem } from '../../lib/ConvertToInternationaCurrency/convertToInternationalCurrencySystem';
import useQueryWithTimeSpan2 from '../hoooks/useQueryWithTimeSpan2';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const radialbarchart = {
    series: [0],
    options: {
        chart: {
            height: 256,
            innerWidth: 100,
            type: "radialBar",
            offsetY: -40,
        },
        plotOptions: {
            radialBar: {
                startAngle: -125,
                endAngle: 105,
                dataLabels: {
                    name: {
                        fontSize: "16px",
                        color: undefined,
                        offsetY: 30,
                    },
                    hollow: {
                        size: "60%",
                    },
                    value: {
                        offsetY: -10,
                        fontSize: "22px",
                        color: undefined,
                        formatter: function (val:any) {
                            return val + "%";
                        },
                    },
                },
            },
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                shadeIntensity: 0.5,
                gradientToColors: ["#6259ca"],
                inverseColors: !0,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100],
            },
        },
        stroke: {
            dashArray: 4,
        },
        labels: [""],
        colors: ["#6259ca"],
    },
};
interface Props {
    CurrentTimeSpan: TimeSpanDataType
}
export function TotalSuccessRateTransactions ({CurrentTimeSpan}:Props){
    // const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.TotalSuccessPercentage, CurrentTimeSpan);
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.OverView.TotalSuccessPercentage, CurrentTimeSpan));
    const [Radial, setRadial] = useState<typeof radialbarchart>(radialbarchart);
    useEffect(()=>{
        if (Result.Success){
        let Temp =  radialbarchart;
        //@ts-ignore
        Temp.series[0] = Result.QueryResult[2].value[0];
        setRadial(R.clone(Temp))
        }

    }, [Result.Success, Result.QueryResult])
    if(!Result.Success)
        return <SpinnerLoader   />
    return( 
    <>
      <div id="recentorders"  className="d-flex justify-content-center align-items-center pt-1 mb-0 pb-0" >
        <ReactApexChart 
            //@ts-ignore
            options={radialbarchart.options }
            series={radialbarchart.series }
            type = "radialBar"
            height = { 270}
            />
    </div>
          <div style={{marginTop:'-5%'}} className="row sales-product-infomation pb-0 mb-0 mx-auto wd-100p">
              <div className="col-md-6 col justify-content-center text-center">
                  <p className="mb-0 d-flex justify-content-center ">
                      <span className="legend bg-primary brround"></span>Successful
                  </p>
                  <h3 className="mb-1 font-weight-bold">{
                    //@ts-ignore
                  convertToInternationalCurrencySystem( Result.QueryResult[0].value[0])
                  }</h3>
                  <div className="d-flex justify-content-center ">
                      <p className="text-muted ">{CurrentTimeSpan}</p>
                  </div>
              </div>
              <div className="col-md-6 col text-center float-end">
                  <p className="mb-0 d-flex justify-content-center ">
                      <span className="legend bg-danger brround"></span>Failed
                  </p>
                    <h3 className="mb-1 font-weight-bold">{
                         //@ts-ignore
                    convertToInternationalCurrencySystem(Result.QueryResult[1].value[0])}</h3>
                  <div className="d-flex justify-content-center ">
                      <p className="text-muted">{CurrentTimeSpan}</p>
                  </div>
              </div>
          </div>
    </>

  )
}