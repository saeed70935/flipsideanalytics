
import { ChartData, ChartOptions } from 'chart.js';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Bar, Line  } from "react-chartjs-2";
import { Queries } from '../../../Queries/Queries';
import { TimeSpanDataType } from '../../../Queries/types';
import { useChartData } from '../../hoooks/useChartData';
import { FlipsideResponse, FlipsideQueryResult, useFlipside } from '../../hoooks/useflipside';
import { useGroupedChartData } from '../../hoooks/useGroupedChartData';
import useQueryWithTimeSpan2 from '../../hoooks/useQueryWithTimeSpan2';
import { SpinnerLoader } from '../../Spinners/SpinnerLoader';
const VerticalSettings2 = {
    datasets: [
        {
            backgroundColor: "#9877f9",
            borderColor: "#9877f9",
            type: "line",
            tension: 0.4,
            // yAxisID: 'y',
            fill:true
            // fill: true,
        },
        {

            backgroundColor: "#53caed",
            borderColor: "#53caed",
            type: "line",
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
        }
        ,
        {
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
            // stack: 'y',
        },
        {
            backgroundColor: "#fd7e14",
            borderColor: "#fd7e14",
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
            // stack: 'y',
        },
        {
            backgroundColor: "#20c997",
            borderColor: "#20c997",
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
            // stack: 'y',
        },
        {
            backgroundColor: "#f1388b",
            // stack: 'y',
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
        },
        {
            backgroundColor: "#28a745",
            // stack: 'y',
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
        },
    ],
};
const VerticalSettings3 = {
    datasets: [
        {
            backgroundColor: "rgba(113, 76, 190, 0.5)",
            borderColor: "rgba(113, 76, 190, 0.9)",
            fill: true,
            type: "line",
            tension: 0.4,
            borderWidth: "1",
             stack: 'y',
            // borderDash: [5, 5],
        },
        {
            borderColor: "rgba(235, 111, 51 ,0.9)",
            borderWidth: "1",
            backgroundColor: "rgba(	235, 111, 51, 0.7)",
            fill: true,
            type: "line",
            tension: 0.4,
        },
        {
            backgroundColor: "#20c997",
            borderColor: "#20c997",
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
            // stack: 'y',
        },
        {
            backgroundColor: "#fd7e14",
            borderColor: "#fd7e14",
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
            // stack: 'y',
        },
        {
            backgroundColor: "#20c997",
            borderColor: "#20c997",
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
            // stack: 'y',
        },
        {
            backgroundColor: "#f1388b",
            // stack: 'y',
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
        },
        {
            backgroundColor: "#28a745",
            // stack: 'y',
            tension: 0.4,
            // yAxisID: 'y',
            fill: true
            // fill: true,
        },
    ],
};
const options = {
    maintainAspectRatio: false,
    
    plugins: {
        legend: { // labele balaye chart 
            position: "bottom",
            display: true,
        },
        tooltip: {
            enabled: true,
        }
    },
    responsive: true,
    interaction: {
        mode: 'index' as const,
        intersect: false,
    },
    scales: {
        x: {
            stacked: false,
            
        },
        y: {
            type: 'logarithmic' as const,
            stacked: false,
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },

        }
        ,
         y1: {
             type: 'linear' as const,
             position: 'right',
            stacked: false,
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },

        }
        // ,
        // y1: {
        //     type: 'logarithmic' as const,
        //     stacked: false,

        // },
    },
};

interface Props {
    className: string,
    height: string;
    CurrentTimeSpan: TimeSpanDataType
}
export default function DailyBridgeComp({ className, height, CurrentTimeSpan }: Props) {
    // const ModifiedQuery = useQueryWithTimeSpan(Queries.OverView.DailynumtransactionsandActiveusers, CurrentTimeSpan)
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Queries.Bridge.NumBeridgesOverTime, CurrentTimeSpan));
    //@ts-ignore
    const chartdatatemp = useGroupedChartData(0, 2, 1, Result.QueryResult, VerticalSettings2.datasets);
    //@ts-ignore
    const dailyUsers = useGroupedChartData(0, 3, 1, Result.QueryResult, VerticalSettings3.datasets);
    return (
    <>
        <Row className="row-sm">
        <Col sm={12} lg={12} xl={12}>
      <Card className="custom-card  overflow-hidden">
        <Card.Header className="border-bottom-0">
          <div>
            <label className="main-content-label mb-2">
              Daily Number of Bridges 
            </label>
            <span className="d-block tx-12 mb-0 text-muted">
              The follwing chart shows The number of bridges over time in the {CurrentTimeSpan}
            </span>
          </div>
        </Card.Header>
        <Card.Body className="ps-12">
          <div>
            <Container>
              <div className="chart-dropshadow2 justify-content-center align-items-center ">
                {Result.Loading ? <SpinnerLoader  className={'ht-300'} /> :
                    <Bar
                        //@ts-ignore   
                                                options={options}
                        data={{
                            labels: chartdatatemp.horizontal,
                            //@ts-ignore
                            datasets: chartdatatemp.vertical
                        }}
                        // className="linechart "
                        height={'300'}
                    />
                }
              </div>
              {/* <div className='pb-3'/> */}
             </Container>
          </div>
        </Card.Body>
      </Card>
    </Col>
  </Row>
            <Row className="row-sm">
                <Col sm={12} lg={12} xl={12}>
                    <Card className="custom-card  overflow-hidden">
                        <Card.Header className="border-bottom-0">
                            <div>
                                <label className="main-content-label mb-2">
                                    Daily Number of Bridgers
                                </label>
                                <span className="d-block tx-12 mb-0 text-muted">
                                    The follwing chart shows The number of Bridgers over time in the {CurrentTimeSpan}
                                </span>
                            </div>
                        </Card.Header>
                        <Card.Body className="ps-12">
                            <div>
                                <Container>
                                    <div className="chart-dropshadow2 justify-content-center align-items-center pb-1 ">
                                        {Result.Loading ? <SpinnerLoader className={'ht-300'} /> :
                                            <Bar
                                                //@ts-ignore   
                                                options={options}
                                                data={{
                                                    labels: dailyUsers.horizontal,
                                                    //@ts-ignore
                                                    datasets: dailyUsers.vertical
                                                }}
                                                // className="linechart "
                                                height={'300'}
                                            />
                                        }
                                    </div>
                                    {/* <div className='pb-3'/> */}
                                </Container>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
 
        </>
    )
}