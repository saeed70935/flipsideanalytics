import React, { useEffect, useState } from 'react';
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { useChartData, verticalChartData } from '../../hoooks/useChartData';
import { useFlipside } from '../../hoooks/useflipside';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
import * as R from 'ramda';
import { Bar } from 'react-chartjs-2';
import { Card, Col } from 'react-bootstrap';
const VerticalSettings = [{
    backgroundColor: ["#9877f9", "#53caed", 'rgb(255, 99, 132)'],
    borderColor: ["#9877f9", "#53caed", 'rgb(255, 99, 132)'],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
{
    backgroundColor: ["#9877f9", "#53caed", 'rgb(255, 99, 132)'],
    borderColor: ["#9877f9", "#53caed", 'rgb(255, 99, 132)'],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},
{
    backgroundColor: ["#9877f9", "#53caed", 'rgb(255, 99, 132)'],
    borderColor: ["#9877f9", "#53caed", 'rgb(255, 99, 132)'],
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",

},


];
export const linechartoptions = {

    responsive: true,
    maintainAspectRatio: false,

    plugins: {
        legend: {
            position: "bottom",
            display:false
        },
        title: {
            display: false,
            text: "Chart.js Line Chart",
        },
    },
};
interface Props {
    CurrentTimeSpan :TimeSpanDataType
}
export default function TotalBridgeComp({ CurrentTimeSpan}: Props){
    const Total_Numbers = useFlipside(useQueryWithTimeSpan2(Queries.Bridge.Total, CurrentTimeSpan))
    //@ts-ignore
    const ChartData = useChartData(0, Total_Numbers.QueryResult, VerticalSettings);
    console.log("ChartDataChartData", ChartData)
    const [TotalSWapsData, setTotalSwapsData] = useState<verticalChartData[]>([]); // NUm_bridges
    const [TotalSWappersData, setTotalSWappersData] = useState<verticalChartData[]>([]);// NUm_wallets
    const [NumPools, setNumPools] = useState<verticalChartData[]>([]);// bridged volume in usd 
    useEffect(() => {

        if (Total_Numbers.Success && ChartData.vertical.length > 0) {
            let tempSWapsData: verticalChartData[] = [];
            let tempTotalSWappersData: verticalChartData[] = [];
            let tempNumPools: verticalChartData[] = [];
            tempSWapsData.push(ChartData.vertical[0]);
            tempTotalSWappersData.push(ChartData.vertical[1])
            tempNumPools.push(ChartData.vertical[2])
            setTotalSwapsData(R.clone(tempSWapsData))
            setTotalSWappersData(R.clone(tempTotalSWappersData))
            setNumPools(R.clone(tempNumPools))
        }

    }, [Total_Numbers.Success, ChartData.vertical])
    return (
        <div className=" row row-sm mt-4">
            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                <div className="card custom-card ">
                    <div className="card-body  overflow-hidden " style={{ borderRadius: "6%" }}>
                        <div className="card-item">


                            <div className="card-item-title mb-2 ">
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <label className="main-content-label tx-13 font-weight-bold mb-1">Total number of Bridges</label>

                                </div>
                                <span className="d-block tx-12 mt-1 text-muted">Total Number of bridges in the {CurrentTimeSpan}</span>
                            </div>
                            <div className=" card-item-body justify-content-center pt-1 pb-1">
                              
                                {Total_Numbers.Loading ? <SpinnerLoader className="align-self-center ht-150" /> :
                                    <Bar
                                        //@ts-ignore   
                                        options={linechartoptions}
                                        data={{
                                            labels: ChartData.horizontal,
                                            //@ts-ignore
                                            datasets: TotalSWapsData
                                        }}
                                        className="barchart"
                                        height="150"
                                    />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                <div className="card custom-card ">
                    <div className="card-body  overflow-hidden " style={{ borderRadius: "6%" }}>
                        <div className="card-item">


                            <div className="card-item-title mb-2 ">
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <label className="main-content-label tx-13 font-weight-bold mb-1">Total number of users</label>

                                </div>
                                <span className="d-block tx-12 mt-1 text-muted">Total Number of users bridged their assets</span>
                            </div>
                            <div className=" card-item-body justify-content-center pt-1 pb-1">

                                {Total_Numbers.Loading ? <SpinnerLoader className="align-self-center ht-150" /> :
                                    <Bar
                                        //@ts-ignore   
                                        options={linechartoptions}
                                        data={{
                                            labels: ChartData.horizontal,
                                            //@ts-ignore
                                            datasets: TotalSWappersData
                                        }}
                                        className="barchart"
                                        height="150"
                                    />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
                <div className="card custom-card ">
                    <div className="card-body  overflow-hidden " style={{ borderRadius: "6%" }}>
                        <div className="card-item">


                            <div className="card-item-title mb-2 ">
                                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <label className="main-content-label tx-13 font-weight-bold mb-1">Total Bridged volume</label>

                                </div>
                                <span className="d-block tx-12 mt-1 text-muted">Total Bridged volume in the {CurrentTimeSpan}</span>
                            </div>
                            <div className=" card-item-body justify-content-center pt-1 pb-1">

                                {Total_Numbers.Loading ? <SpinnerLoader className="align-self-center  ht-150" /> :
                                    <Bar
                                        //@ts-ignore   
                                        options={linechartoptions}
                                        data={{
                                            labels: ChartData.horizontal,
                                            //@ts-ignore
                                            datasets: NumPools
                                        }}
                                        className="barchart"
                                        height="150"
                                    />
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}