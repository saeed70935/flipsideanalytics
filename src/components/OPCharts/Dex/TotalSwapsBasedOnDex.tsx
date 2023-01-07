import { ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { FlipsideResponse, useFlipside } from '../../hoooks/useflipside';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
import * as  R from 'ramda';
import { _DeepPartialObject } from 'chart.js/types/utils';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { Card, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { useChartData, verticalChartData } from '../../hoooks/useChartData';
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
    CurrentTimeSpan: TimeSpanDataType
}
export default function TotalSwapsBasedOnDExComp({ className, options, height, CurrentTimeSpan }: Props) {
    // const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.DistributionByNumTransactions, CurrentTimeSpan)
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.Dex.TotalSwapsBasedOnDex, CurrentTimeSpan));
    //@ts-ignore
    const ChartData = useChartData(0, Result.QueryResult, VerticalSettings);
    const [TotalSWapsData, setTotalSwapsData] = useState<verticalChartData[] >([]);
    const [TotalSWappersData, setTotalSWappersData] = useState<verticalChartData[]>([]);
    const [NumPools, setNumPools] = useState<verticalChartData[]>([]);
    useEffect(() => {

        if (Result.Success && ChartData.vertical.length > 0) {
            let tempSWapsData: verticalChartData[] = [];
            let tempTotalSWappersData: verticalChartData[] = [];
            let tempNumPools : verticalChartData[] = [];
            tempSWapsData.push(ChartData.vertical[0]);
            tempTotalSWappersData.push(ChartData.vertical[1])
            tempNumPools.push(ChartData.vertical[6])
            setTotalSwapsData(R.clone(tempSWapsData))
            setTotalSWappersData(R.clone(tempTotalSWappersData))
            setNumPools(R.clone(tempNumPools))
        }

    }, [Result.Success, ChartData.vertical])

return(
    <>
    <Col
    md={4}
    sm={4}
    lg={4}
    xl={4}
    xxl={4}
    className="col-md-4 col-sm-12 col-lg-4 col-xl-4 col-xxl-4"
    >
        <Card className="custom-card overflow-hidden">
            <Card.Header className="card-header border-bottom-0">
            <label className="main-content-label my-auto pt-2 mb-1">
                Total number of Swaps 
            </label>
            <span className="d-block tx-12 mb-0 mt-1 text-muted">
                    Total number of Swaps based on DEX in {CurrentTimeSpan}
            </span>
            </Card.Header>
            <Card.Body className="card-body crypto-wallet ">
                {Result.Loading ? <SpinnerLoader height={height} className={className} /> :  
                <Bar
                    //@ts-ignore   
                    options={linechartoptions}
                        data={{
                                labels: ChartData.horizontal,
                                //@ts-ignore
                            datasets: TotalSWapsData
                            }}
                        className="barchart"
                        height="250"
                    />
                }
            </Card.Body>
            </Card>
          </Col>

        <Col
            md={4}
            sm={4}
            lg={4}
            xl={4}
            xxl={4}
            className="col-md-4 col-sm-12 col-lg-4 col-xl-4 col-xxl-4"
        >
            <Card className="custom-card overflow-hidden">
                <Card.Header className="card-header border-bottom-0">
                    <label className="main-content-label my-auto pt-2 mb-1">
                        Total number of Swappers
                    </label>
                    <span className="d-block tx-12 mb-0 mt-1 text-muted">
                        Total number of Swappers based on DEX in {CurrentTimeSpan}
                    </span>
                </Card.Header>
                <Card.Body className="card-body crypto-wallet ">
                    {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
                        <Bar
                            //@ts-ignore   
                            options={linechartoptions}
                            data={{
                                labels: ChartData.horizontal,
                                //@ts-ignore
                                datasets: TotalSWappersData
                            }}
                            className="barchart"
                            height="250"
                        />
                    }
                </Card.Body>
            </Card>
        </Col>

        <Col
            md={4}
            sm={4}
            lg={4}
            xl={4}
            xxl={4}
            className="col-md-4 col-sm-12 col-lg-4 col-xl-4 col-xxl-4"
        >
            <Card className="custom-card overflow-hidden">
                <Card.Header className="card-header border-bottom-0">
                    <label className="main-content-label my-auto pt-2 mb-1">
                        Total number of pools 
                    </label>
                    <span className="d-block tx-12 mb-0 mt-1 text-muted">
                        Total number of pools based on DEX in {CurrentTimeSpan}
                    </span>
                </Card.Header>
                <Card.Body className="card-body crypto-wallet ">
                    {Result.Loading ? <SpinnerLoader height={height} className={className} /> :
                        <Bar
                            //@ts-ignore   
                            options={linechartoptions}
                            data={{
                                labels: ChartData.horizontal,
                                //@ts-ignore
                                datasets: NumPools
                            }}
                            className="barchart"
                            height="250"
                        />
                    }
                </Card.Body>
            </Card>
        </Col>
    </>
)
    
}