
import { ChartData, ChartOptions } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar, Line } from "react-chartjs-2";
import { Queries } from '../../../Queries/Queries';
import { OptimismSwapPlatFormParam, TimeSpanDataType } from '../../../Queries/types';
import { useChartData, verticalChartData } from '../../hoooks/useChartData';
import { FlipsideResponse, FlipsideQueryResult, useFlipside } from '../../hoooks/useflipside';
import { useQueryWithTimeSpan } from '../../hoooks/useQueryWithTimeSpan';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
import * as R from 'ramda';
import { Card, Col, Dropdown, Row } from 'react-bootstrap';
import useQueryWithReplacedString from '../../hoooks/useQueryWithParam';
const VerticalSettings = [{
    backgroundColor: "#9877f9",
    borderColor: "#9877f9",
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",
    // label: "",
}

];
const VerticalSettingsSwappers = [{
    backgroundColor: "#53caed",
    borderColor: "#53caed",
    borderWidth: 1.0,
    pointBackgroundColor: "#ffffff",
    // label: "",
},
    {
        backgroundColor: "#53caed",
        borderColor: "#53caed",
        borderWidth: 1.0,
        pointBackgroundColor: "#ffffff",
        // label: "",
    }

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
const DEXPlatforms = [`'Uniswap'`, `'Sushiswap'`, `'Velodrome'`]
interface Props {
    className: string,
    options: ChartOptions,
    height: string;
    CurrentTimeSpan: TimeSpanDataType;
    QueryResult: FlipsideResponse;
    VerticalIndex :number;
    HorizontalIndex :number ;
    onSelectedDex:(dex:string)=>void;
    SelectedDex:string;
    SelectedDexSwappers:string;
    onSelectedDexSwappers:(DEX:string)=>void
}
function DropDownPlatform({ DropDownData, onSelecteItem, SelectedPlatform }) {
    return (<div className="d-flex justify-content-center align-items-center  ">
        <h5 className='p-1 mt-1  tx-13 '>Platform :</h5>
        <div className="justify-content-center">

            <Dropdown  >
                <Dropdown.Toggle size="sm" variant="primary">
                    {SelectedPlatform.replaceAll(`'`, "")}
                    <i className="fas fa-caret-down ms-1"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu className=" tx-13" style={{ marginTop: "0px" }}>
                    <h6 className="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
                        Choose Platform
                    </h6>
                    {
                        DropDownData.map((item, index) => {
                            return (
                                <Dropdown.Item key={index} onClick={() => onSelecteItem(item)} >{item.replaceAll(`'`, "")}</Dropdown.Item>
                            )
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    </div>
    )
}
export default function TopSwapPairsComp({ className, height, QueryResult, VerticalIndex, HorizontalIndex, CurrentTimeSpan, onSelectedDex, SelectedDex, SelectedDexSwappers ,onSelectedDexSwappers}: Props) {
    const TopPairsQueryResult = useFlipside(useQueryWithTimeSpan2(useQueryWithReplacedString(Queries.Dex.Top_10_pairs, OptimismSwapPlatFormParam, SelectedDex), CurrentTimeSpan));
    const TopPairsQueryResultSwappers = useFlipside(useQueryWithTimeSpan2(useQueryWithReplacedString(Queries.Dex.Top_10_pairs_swappers, OptimismSwapPlatFormParam, SelectedDexSwappers), CurrentTimeSpan));
    console.log("TopPairsQueryResult", TopPairsQueryResult)
    const ChartData = useChartData(0, TopPairsQueryResult.QueryResult, VerticalSettings);
    const ChartDataSwappers = useChartData(0, TopPairsQueryResultSwappers.QueryResult, VerticalSettingsSwappers);
    const [SelectedVertical, setSelectedVertical] = useState<verticalChartData[]>([]);
    const [SelectedVerticalSwappers, setSelectedVerticalSwappers] = useState<verticalChartData[]>([])
    useEffect(() => { 
        if (ChartData.vertical.length>0){
            let temp: verticalChartData[] = [];
            ChartData.vertical.map((item,index)=>{
                if (index === 0)
                    temp.push(item)
            })
            setSelectedVertical(R.clone(temp));
        }
       
    }, [ChartData.vertical, VerticalIndex,])
    useEffect(() => {
        if (ChartDataSwappers.vertical.length > 0) {
            let temp: verticalChartData[] = [];
            ChartDataSwappers.vertical.map((item, index) => {
                if (index === 1)
                    temp.push(item)
            })
            setSelectedVerticalSwappers(R.clone(temp));
        }

    }, [ChartDataSwappers.vertical])
    return (
        <>
            <Col
                md={6}
                sm={6}
                lg={6}
                xl={6}
                xxl={4}
                className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6"
            >
                <Card className="custom-card overflow-hidden">
                    <Card.Header className="card-header border-bottom-0">
                        <Row className="row row-sm">
                            <Col className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6" >
                                <label className="main-content-label my-auto pt-2 mb-1">
                                    Top Swap Pairs by number of swaps
                                </label>
                            </Col>
                            <Col className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6 d-flex justify-content-end">
                                <DropDownPlatform DropDownData={DEXPlatforms} SelectedPlatform={SelectedDex} onSelecteItem={(item) => onSelectedDex(item)} />
                            </Col>
                        </Row>
                        <span className="d-block tx-12 mb-0 mt-1 text-muted">
                            Top swap pairs by number of swaps on {SelectedDex.replaceAll(`'`, "")} in the  {CurrentTimeSpan}
                        </span>
                    </Card.Header>
                    <Card.Body className="card-body ht-300 d-flex justify-content-center align-items-center crypto-wallet">

                        {TopPairsQueryResult.Loading ? <SpinnerLoader height={height} className={className} /> :
                            <Bar height={height}
                                //@ts-ignore
                                options={linechartoptions} className={className} data={{
                                    labels: ChartData.horizontal,
                                    //@ts-ignore
                                    datasets: SelectedVertical
                                }}></Bar>
                        }

                    </Card.Body>
                </Card>
            </Col>

            <Col
                md={6}
                sm={6}
                lg={6}
                xl={6}
                xxl={4}
                className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6"
            >
                <Card className="custom-card overflow-hidden">
                    <Card.Header className="card-header border-bottom-0">
                        <Row className="row row-sm">
                            <Col className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6" >
                                <label className="main-content-label my-auto pt-2 mb-1">
                                    Top Swap Pairs by number of swappers
                                </label>
                            </Col>
                            <Col className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6 d-flex justify-content-end">
                                <DropDownPlatform DropDownData={DEXPlatforms} SelectedPlatform={SelectedDexSwappers} onSelecteItem={(item) => onSelectedDexSwappers(item)} />
                            </Col>
                        </Row>
                        <span className="d-block tx-12 mb-0 mt-1 text-muted">
                            Top swap pairs by number of Swappers on {SelectedDex.replaceAll(`'`, "")} in the  {CurrentTimeSpan}
                        </span>
                    </Card.Header>
                    <Card.Body className="card-body ht-300 d-flex justify-content-center align-items-center crypto-wallet">

                        {TopPairsQueryResultSwappers.Loading ? <SpinnerLoader height={height} className={className} /> :
                            <Bar height={height}
                                //@ts-ignore
                                options={linechartoptions} className={className} data={{
                                    labels: ChartDataSwappers.horizontal,
                                    //@ts-ignore
                                    datasets: SelectedVerticalSwappers
                                }}></Bar>
                        }

                    </Card.Body>
                </Card>
            </Col>
        </>
    )
    return (
        <>
            {QueryResult.Loading ? <SpinnerLoader height={height} className={className} /> :
                <Bar height={height}
                    //@ts-ignore
                    options={linechartoptions} className={className} data={{
                        labels: ChartData.horizontal,
                        //@ts-ignore
                        datasets: SelectedVertical
                    }}></Bar>
            }
        </>

    )
}