import React, { useEffect, useState } from "react";
import PageHeader from "../../shared/layout-components/page-header/page-header";
import Slider from "react-slick";
import { Card, Col, Dropdown, Row, Table } from "react-bootstrap";
import * as cryptodashboard from "../../shared/data/crypto-currencies/cryptodashboard";
import dynamic from "next/dynamic";
import * as R from 'ramda';
const ReactApexChart = dynamic(() => import("react-apexcharts"), {ssr: false,});
import { Line, Doughnut } from "react-chartjs-2";
// Need to Import {Importent}
import Chart from "chart.js/auto";
import Link from "next/link";
import Seo from "../../shared/layout-components/seo/seo";

//images

import btc from "../../public/assets/img/svgs/crypto-currencies/btc.svg";
import eth from "../../public/assets/img/svgs/crypto-currencies/eth.svg";
import xrp from "../../public/assets/img/svgs/crypto-currencies/xrp.svg";
import ltc from "../../public/assets/img/svgs/crypto-currencies/ltc.svg";
import dash from "../../public/assets/img/svgs/crypto-currencies/dash.svg";
import xmr from "../../public/assets/img/svgs/crypto-currencies/xmr.svg";
import neo from "../../public/assets/img/svgs/crypto-currencies/neo.svg";
import steem from "../../public/assets/img/svgs/crypto-currencies/steem.svg";
import { useSingleNumber } from "../../src/components/hoooks/useSingleNumber";
import { Queries } from "../../src/Queries/Queries";
import { convertToInternationalCurrencySystem } from "../../src/lib/ConvertToInternationaCurrency/convertToInternationalCurrencySystem";
import { SpinnerLoader } from "../../src/components/Spinners/SpinnerLoader";
import TotalSwapsBasedOnDExComp from "../../src/components/OPCharts/Dex/TotalSwapsBasedOnDex";
import { useFlipside } from "../../src/components/hoooks/useflipside";
import useQueryWithTimeSpan2 from "../../src/components/hoooks/useQueryWithTimeSpan2";
import DailyNumSwapsComp from "../../src/components/OPCharts/Dex/DailyNumSwapsComp";
import DailyNumSwappersComp from "../../src/components/OPCharts/Dex/DailyNumSwappersComp";
import useQueryWithReplacedString from "../../src/components/hoooks/useQueryWithParam";
import { OptimismSwapPlatFormParam } from "../../src/Queries/types";
import TopSwapPairsComp from "../../src/components/OPCharts/Dex/TopSwapPairsComp";


const TRADINGACTIVITIES = [
  {
    id: 1,
    icon: "btc",
    name: "Bitcoin ",
    title: "BTC",
    price: "USD 680,175.06",
    change: "+13%",
    changeStatus: "success",
    date: "21/09/2021",
    status: "success",
    statusText: "delivery",
  },
  {
    id: 2,
    icon: "eth",
    name: "Ethereum ",
    title: "ETH",
    price: "USD 345,235.02",
    change: "-13%",
    changeStatus: "danger",
    date: "22/09/2021",

    status: "danger",
    statusText: "Cancel",
  },
  {
    id: 3,
    icon: "xrp",
    name: "Ripple ",
    title: "XRP",
    price: "USD 235,356.12",
    change: "-2.23%",
    changeStatus: "warning",
    date: "23/09/2021",

    status: "warning",
    statusText: "Hold",
  },
  {
    id: 4,
    icon: "ltc",
    name: "Litecoin",
    title: "LTC",
    price: "USD 456,235.52",
    change: "-1.13%",
    changeStatus: "danger",
    date: "24/09/2021",

    status: "danger",
    statusText: "Cancel",
  },
];
 const CryptoCurrencies = [
    { coin: "Total Swaps", price: 0, },
    { coin: "Total Swappers", price: 0,  },
    { coin: "Total swapped volume", price: 0,  },
  ];
function DropDownPlatform ({DropDownData,onSelecteItem,SelectedPlatform}){
 return( <div className="d-flex justify-content-center align-items-center  ">
        <h5 className='p-1 mt-1  tx-13 '>Platform :</h5>
        <div className="justify-content-center">
          
          <Dropdown  >
            <Dropdown.Toggle size="sm"  variant="primary">
              {SelectedPlatform.replaceAll(`'`,"")}
            <i className="fas fa-caret-down ms-1"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className=" tx-13" style={{ marginTop: "0px" }}>
            <h6 className="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
            Choose Platform
            </h6>
              {
                DropDownData.map((item,index)=>{
                  return (
                    <Dropdown.Item key={index} onClick={() => onSelecteItem(item)} >{item.replaceAll(`'`,"")}</Dropdown.Item>
                  )
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
 )
}
const DEXPlatforms =[`'Uniswap'`,`'Sushiswap'`,`'Velodrome'`]
const Dashboard = () => {
  const [CurrentTimeSpan, setCurrentTimeSpan] = useState("Last 7 days");
  const [Total,setTotal]=useState(CryptoCurrencies);
  const [SelectedDex,setSelectedDex] = useState(DEXPlatforms[1]);
  const [SelectedDexSwappers,setSelectedDexSwappers] = useState(DEXPlatforms[1]);
  const TotalSwaps = useSingleNumber(Queries.Dex.TotalSwaps,1,CurrentTimeSpan);
  const SwapsOvertime = useFlipside(useQueryWithTimeSpan2(Queries.Dex.swapsOverTime,CurrentTimeSpan));
  useEffect(()=>{
    if(!TotalSwaps.Loading && TotalSwaps.QueryResult && TotalSwaps.QueryResult.length >0 ){
      let temp = CryptoCurrencies;
      temp[0].price = convertToInternationalCurrencySystem( TotalSwaps.QueryResult[0].value[0])
      temp[1].price = convertToInternationalCurrencySystem(TotalSwaps.QueryResult[1].value[0])
      temp[2].price =convertToInternationalCurrencySystem( TotalSwaps.QueryResult[2].value[0])
      setTotal(R.clone(temp));
    }
  },[TotalSwaps.QueryResult,TotalSwaps.Loading])
  const settings = {
    // dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 5000,
    arrows: false,
    autoplaySpeed: 1500,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

 

  return (
    <>
      <Seo title={"Crypto Currencies Dashboard"} />
      <PageHeader subtitle="swaps on Velodrome,Uniswap and Sushiswap" CurrentTimeSpan={CurrentTimeSpan} setCurrentTimeSpan={(selected) => setCurrentTimeSpan(selected)} title="Swaps on Optimism" item="Home" active_item="Project Dashboard"/>
      <div>
        {/* <!-- row opened --> */}
        <div className="row row-sm">
          {/* <div className="owl-carousel  owl-theme"> */}
            {/* <Slider {...settings}> */}
              {CryptoCurrencies.map((data) => {
                return (
                  <Col
                  key={Math.random()}
                  md={4}
                  sm={4}
                  lg={4}
                  xl={4}
                  xxl={4}
                  className="col-md-4 col-sm-12 col-lg-4 col-xl-4 col-xxl-4"
                  >
                  {/* <div className="itemslick" > */}
                    <Card className="custom-card crypto-card overflow-hidden">
                      <Card.Body>
                        <div className="d-flex no-block align-items-center currency-item">
                          <div>
                            <span className="text-muted tx-15 mb-3">
                              {data.coin}
                            </span>
                            {TotalSwaps.Loading?<SpinnerLoader/>:<h3 className="m-0 mt-2">{data.price}</h3>}
                          </div>
                          <div className="ms-auto mt-auto">
                            {/* <img src={data.image} alt={data.coin} /> */}
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  {/* </div> */}
                  </Col>
                  
                );
              })}
            {/* </Slider> */}
          {/* </div> */}
        </div>
        <div className="row row-sm">
         <TotalSwapsBasedOnDExComp CurrentTimeSpan={CurrentTimeSpan} />
           
        </div>
        {/* <!-- row closed --> */}

        {/* <!-- row opened --> */}
        <Row className="row row-sm">
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
                <label className="main-content-label my-auto pt-2 mb-1">
                  Daily Number of Swaps 
                </label>
                <span className="d-block tx-12 mb-0 mt-1 text-muted">
                  Daily Number of Swaps by DEXs in the {CurrentTimeSpan}
                </span>
              </Card.Header>
              <Card.Body className="card-body crypto-wallet">
              <div>
              <DailyNumSwapsComp height="150" CurrentTimeSpan={CurrentTimeSpan} QueryResult={SwapsOvertime} />
              </div>
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
                <label className="main-content-label my-auto pt-2 mb-1">
                  Daily Number of Swappers 
                </label>
                <span className="d-block tx-12 mb-0 mt-1 text-muted">
                  Daily Number of SWappers by DEXs in the {CurrentTimeSpan}
                </span>
              </Card.Header>
              <Card.Body className="card-body crypto-wallet">
              <div>
              <DailyNumSwappersComp height="150" CurrentTimeSpan={CurrentTimeSpan} QueryResult={SwapsOvertime} />
              </div>
              </Card.Body>
            </Card>
          </Col>
          {/* <div className="col-xl-12 col-xxl-8 col-lg-12 col-md-12">
            <div className="card card-bitcoin custom-card">
              <div className="card-header border-bottom-0">
                <label className="main-content-label my-auto pt-2 tx-15-f">
                  BTC/USD
                </label>
                <span className="d-block tx-12 mb-0 mt-1 text-muted">
                  Bitcoin is a digital cryptocurrency made up of processed data
                  blocks used for online and brick-and-mortar purchases.
                </span>
              </div>
              <div className="card-body">
              

                <ReactApexChart
                  options={cryptodashboard.ApexChart.options}
                  series={cryptodashboard.ApexChart.series}
                  type="candlestick"
                  height={350}
                />
              </div>
              <div className="media px-4 pb-4 pt-1 bitcoin-market">
                <div className="media-icon bg-primary crypto-icon me-2">
                  <i className="cf cf-btc tx-20" />
                </div>
                <div className="media-body ms-2">
                  <div className="row row-sm">
                    <div className="col">
                      <label>Symbol</label>
                      <p>BTC</p>
                    </div>
                    <div className="col-3">
                      <label>Price Benchmark</label>
                      <p>135.00%</p>
                    </div>
                    <div className="col">
                      <label>Price (USD)</label>
                      <p>$2,457.69</p>
                    </div>
                    <div className="col">
                      <label>Change (24H)</label>
                      <p>-0.32%</p>
                    </div>
                    <div className="col">
                      <label>Market Cap</label>
                      <p>$134.17B</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div> */}
        </Row>
        <Row className="row row-sm">
        <TopSwapPairsComp CurrentTimeSpan={CurrentTimeSpan} SelectedDex={SelectedDex} SelectedDexSwappers={SelectedDexSwappers} onSelectedDexSwappers={(DEX)=>setSelectedDexSwappers(DEX)} onSelectedDex={(DEX)=>setSelectedDex(DEX)} />
          {/* <Col
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
                  <Col  className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6 d-flex justify-content-end">
                  <DropDownPlatform DropDownData={DEXPlatforms} SelectedPlatform={SelectedDex}  onSelecteItem={(item)=>setSelectedDex(item)}/>
                  </Col>
                </Row>
                <span className="d-block tx-12 mb-0 mt-1 text-muted">
                  Top swap pairs on {SelectedDex.replaceAll(`'`,"")} in the  {CurrentTimeSpan}
                </span>
              </Card.Header>
              <Card.Body className="card-body ht-300 d-flex justify-content-center align-items-center crypto-wallet">
              <div>
              <TopSwapPairsComp height="150" CurrentTimeSpan={CurrentTimeSpan} QueryResult={TopPairsQueryResult} VerticalIndex={0} HorizontalIndex={0} />
              </div>
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
                      Top Swap Pairs by number of swaps
                    </label>
                  </Col>
                  <Col  className="col-md-6 col-sm-6 col-lg-6 col-xl-6 col-xxl-6 d-flex justify-content-end">
                    <DropDownPlatform DropDownData={DEXPlatforms} SelectedPlatform={SelectedDex}  onSelecteItem={(item)=>setSelectedDex(item)}/>
                  </Col>
                </Row>
                <span className="d-block tx-12 mb-0 mt-1 text-muted">
                  Top swap pairs on {SelectedDex.replaceAll(`'`,"")} in the  {CurrentTimeSpan}
                </span>
              </Card.Header>
              <Card.Body className="card-body ht-300 d-flex justify-content-center align-items-center crypto-wallet">
              
                <TopSwapPairsComp height="200" CurrentTimeSpan={CurrentTimeSpan} QueryResult={TopPairsQueryResult} VerticalIndex={0} HorizontalIndex={0} />
             
              </Card.Body>
            </Card>
          </Col> */}

           
          
        </Row>
        {/* <!-- row closed --> */}

        {/* <!-- row opened --> */}
        {/* <div className="row row-sm">
          <div className="col-md-12 col-sm-12 col-lg-12 col-xl-12 col-xxl-8">
            <div className="row row-sm">
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="card custom-card">
                  <div className="card-body row">
                    <div className="col-sm-5 d-flex no-block align-items-center">
                      <div>
                        <span className="tx-18 mb-3">Bitcoin</span>
                        <h2 className="mb-2 mt-2">3.634528</h2>
                        <span className="m-0 tx-15 mt-4 text-muted">
                          $2500 USD
                        </span>
                      </div>
                    </div>
                    <div className="col-sm-7">
                      <div className="chart-wrapper mt-4 ms-2 me-2">
                        <Line
                          options={cryptodashboard.Cryptochart3}
                          data={cryptodashboard.cryptochart3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="card custom-card">
                  <div className="card-body pt-0">
                    <br />
                    <br />
                    <span className="tx-18 mb-3">Your Profile</span>
                    <div className="row mt-3">
                      <div className="col-sm-6 my-auto border-end text-centerd-flex no-block align-items-center">
                        <div className="d-flex wh-50">
                          <Doughnut
                            data={cryptodashboard.cryptochart4}
                            options={{ maintainAspectRatio: false }}
                          />
                          <div className="my-auto d-block ms-3">
                            <h6 className="mb-2 tx-16">2.343434</h6>
                            <span className="m-0 tx-13 text-muted">
                              $2500 USD
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6 my-auto text-sm-center">
                        <h2 className="mb-2  mt-3 mt-sm-0">2.343434</h2>
                        <span className="m-0 tx-14 mt-3 text-muted">
                          Pending Balance
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card custom-card">
              <div className="card-header border-bottom-0">
                <label className="main-content-label my-auto pt-2">
                  TRADING ACTIVITIES
                </label>
                <span className="d-block tx-12 mb-3 mt-1 text-muted">
                  Cryptocurrency trading is the act of speculating on
                  cryptocurrency price movements via a CFD trading account, or
                  buying and selling the underlying coins via an exchange
                </span>
              </div>
              <div className="card-body pt-2 pb-0">
                <div className="table-responsive tasks">
                  <Table
                    className="table card-table table-vcenter text-nowrap border"
                    borderless
                  >
                    <thead>
                      <tr>
                        <th className="wd-lg-10p text-center">#</th>
                        <th className="wd-lg-10p text-center">Name</th>
                        <th className="wd-lg-20p text-center">Price</th>
                        <th className="wd-lg-20p text-center">Change</th>
                        <th className="wd-lg-20p text-center">Date</th>
                        <th className="wd-lg-20p text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TRADINGACTIVITIES.map((list, index) => (
                        <tr key={index} data-index={index}>
                          <td className="text-center">{list.id}</td>
                          <td
                            className="coin_icon
                         d-flex"
                          >
                            <div className="cryp-icon bg-primary me-2">
                              <i className={`cf cf-${list.icon} text-center`} />
                            </div>
                            <span className=" my-auto text-center">
                              {list.name} <b>{list.title}</b>
                            </span>
                          </td>
                          <td className="text-center">{list.price}</td>
                          <td className="text-center">
                            <span className={`text-${list.changeStatus} `}>
                              {list.change}
                            </span>
                          </td>
                          <td className="text-center">{list.date}</td>
                          <td className="text-center">
                            <Link href="#" className={`text-${list.status}`}>
                              {list.statusText}
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <Col md={12} sm={12} lg={12} xl={12} xxl={4}>
            <Card className=" custom-card overflow-hidden">
              <Card.Header className=" border-bottom-0">
                <label className="main-content-label my-auto pt-2">
                  Activity
                </label>
                <span className="d-block tx-12 mb-4 mt-1 text-muted">
                  Activity is one of the many blockchain consensus algorithms
                </span>
              </Card.Header>
              <ul className="crypto-transcation list-unstyled mg-b-0">
                <li className="list-item mb-0 px-3 mt-0 pb-3">
                  <div className="media align-items-center">
                    <div className="crypto-icon bg-primary-transparent text-primary">
                      <i className="cf cf-btc wd-20 ht-20 text-center tx-18" />
                    </div>
                    <div className="media-body ms-3">
                      <p className="tx-medium mg-b-3 tx-15">Sent Litecoin</p>
                      <p className="tx-11 mg-b-0 tx-gray-500">
                        To bitcoin Address
                      </p>
                    </div>
                  </div>
                  <div className="text-end ms-auto my-auto">
                    <h5 className="font-weight-semibold tx-16 mb-0">
                      + 0.0147
                      <i className="text-success tx-16 fe fe-arrow-up ms-1" />
                    </h5>
                  </div>
                </li>
                <li className="list-item mb-0 px-3 pb-3">
                  <div className="media align-items-center">
                    <div className="crypto-icon bg-primary-transparent text-primary">
                      <i className="cf cf-ltc wd-20 ht-20 text-center tx-18" />
                    </div>
                    <div className="media-body ms-3">
                      <p className="tx-medium mg-b-3 tx-15">Sent Ethereum</p>
                      <p className="tx-11 mg-b-0 tx-gray-500">Pending</p>
                    </div>
                  </div>
                  <div className="text-end ms-auto my-auto">
                    <h5 className="font-weight-semibold tx-16 mb-0">
                      - 0.0345
                      <i className="text-danger tx-16 fe fe-arrow-down ms-1" />
                    </h5>
                  </div>
                </li>
                <li className="list-item mb-0 px-3 pb-3">
                  <div className="media align-items-center">
                    <div className="crypto-icon bg-primary-transparent text-primary">
                      <i className="cf cf-dash wd-20 ht-20 text-center tx-18" />
                    </div>
                    <div className="media-body ms-3">
                      <p className="tx-medium mg-b-3 tx-15">Received Dash</p>
                      <p className="tx-11 mg-b-0 tx-gray-500">
                        To Received Address
                      </p>
                    </div>
                  </div>
                  <div className="text-end ms-auto my-auto">
                    <h5 className="font-weight-semibold tx-16 mb-0">
                      - 0.0346
                      <i className="text-danger tx-16 fe fe-arrow-down" />
                    </h5>
                  </div>
                </li>
                <li className="list-item px-3 pb-3">
                  <div className="media align-items-center">
                    <div className="crypto-icon bg-primary-transparent text-primary">
                      <i className="cf cf-xrp wd-20 ht-20 text-center tx-18" />
                    </div>
                    <div className="media-body ms-3">
                      <p className="tx-medium mg-b-3 tx-15">Received Ripple</p>
                      <p className="tx-11 mg-b-0 tx-gray-500">
                        To Received Address
                      </p>
                    </div>
                  </div>
                  <div className="text-end ms-auto my-auto">
                    <h5 className="font-weight-semibold tx-16 mb-0">
                      + 0.0237
                      <i className="text-success tx-16 fe fe-arrow-up ms-1" />
                    </h5>
                  </div>
                </li>
                <li className="list-item px-3 pb-3">
                  <div className="media align-items-center">
                    <div className="crypto-icon bg-primary-transparent text-primary">
                      <i className="cf cf-bsd wd-20 ht-20 text-center tx-18" />
                    </div>
                    <div className="media-body ms-3">
                      <p className="tx-medium mg-b-3 tx-15">Received Ripple</p>
                      <p className="tx-11 mg-b-0 tx-gray-500">
                        To Received Address
                      </p>
                    </div>
                  </div>
                  <div className="text-end ms-auto my-auto">
                    <h5 className="font-weight-semibold tx-16 mb-0">
                      - 0.0348
                      <i className="text-danger tx-16 fe fe-arrow-down ms-1" />
                    </h5>
                  </div>
                </li>
              </ul>
            </Card>
          </Col>
        </div> */}
      </div>
    </>
  );
};

Dashboard.layout = "Contentlayout";

export default Dashboard;
