import React, { useEffect, useState } from 'react'
import PageHeader from "../../shared/layout-components/page-header/page-header";
import * as dashboardmain from  "../../shared/data/chart/dashboardmain"
import Seo from '../../shared/layout-components/seo/seo'
import { Card, Col, Row, ProgressBar,  Container, Table,Dropdown } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { Queries } from '../../src/Queries/Queries';
import { convertToInternationalCurrencySystem } from '../../src/lib/ConvertToInternationaCurrency/convertToInternationalCurrencySystem';
import { SpinnerLoader } from '../../src/components/Spinners/SpinnerLoader';
import SalesDistributionByPriceComp from '../../src/components/OPCharts/NFT/SalesDistributionByPriceComp';
import DailyNumNFTSales from '../../src/components/OPCharts/NFT/DailyNumNFTSales'
import DailyNumPurchasersByPrice from '../../src/components/OPCharts/NFT/DailyNumPurchasersByPrice';
import TopCollectionsByVolume from '../../src/components/OPCharts/NFT/TopCollectionsByVolume';
import DisNFTSELLERSbypriceinETHcomp from '../../src/components/OPCharts/NFT/DisNFTSELLERSbypriceinETHcomp';
import { useFlipside } from '../../src/components/hoooks/useflipside';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title,CategoryScale  } from 'chart.js/auto';


//Images
import user1 from "../../public/assets/img/users/1.jpg";
import user2 from "../../public/assets/img/users/2.jpg";
import user3 from "../../public/assets/img/users/3.jpg";
import user4 from "../../public/assets/img/users/4.jpg";
import user5 from "../../public/assets/img/users/5.jpg";
import user6 from "../../public/assets/img/users/6.jpg";
import user7 from "../../public/assets/img/users/7.jpg";
import user10 from "../../public/assets/img/users/10.jpg";
import user11 from "../../public/assets/img/users/11.jpg";
import user12 from "../../public/assets/img/users/12.jpg";
import DailyNumClaimComp from '../../src/components/OPCharts/AirDrop/DailyNumClaimComp';
import DailyClaimedAmountComp from '../../src/components/OPCharts/AirDrop/DailyClaimedAmountComp';
import AirDropDistributionComp from '../../src/components/OPCharts/AirDrop/AirDropDistributionComp';
import TopDestinations from '../../src/components/OPCharts/AirDrop/TopDestinations';
import DisAirdropHoldersComp from '../../src/components/OPCharts/AirDrop/DisAirDropHoldersComp';


const Dashboard = () => {
  const [CurrentTimeSpan, setCurrentTimeSpan] = useState('Last one year');
  const [NUM_CLAIMS,setNUM_CLAIMS] = useState(0)
  const [NUM_WALLETS,setNUM_WALLETS] = useState(0)
  const [CLAIMED_AMOUNT,setCLAIMED_AMOUNT] = useState(0)
  const [TOTAL_AMOUNT,setTOTAL_AMOUNT] = useState(0);
  const [AVG_CLAIMED,setAVG_CLAIMED] = useState(0);
  const [MAX_CLAIMED,setMAX_CLAIMED] = useState(0);
  const Total_Numbers = useFlipside(Queries.AirDrop.Total);
  useEffect(()=>{
    if(Total_Numbers.Success){
      setNUM_CLAIMS(convertToInternationalCurrencySystem( Total_Numbers.QueryResult[2].value[0]))
      setNUM_WALLETS(convertToInternationalCurrencySystem(Total_Numbers.QueryResult[3].value[0]))
      setCLAIMED_AMOUNT(convertToInternationalCurrencySystem(Total_Numbers.QueryResult[0].value[0]))
      setTOTAL_AMOUNT(convertToInternationalCurrencySystem(Total_Numbers.QueryResult[1].value[0]))
      setAVG_CLAIMED(convertToInternationalCurrencySystem(Total_Numbers.QueryResult[4].value[0]))
      setMAX_CLAIMED(convertToInternationalCurrencySystem(Total_Numbers.QueryResult[5].value[0]))
    }
  },[Total_Numbers])
  const TASKS = [
		{
		  Task: "Evaluating the design",
		  TeamMember1: user1.src,
		  TeamMember2: user2.src,
		  TeamMember3: user3.src,
		  TeamMember4: user4.src,
		  OpenTask: "37",
		  TaskProfit: "High",
		  Profittext: "primary",
		  Status: "Completed",
		  Statustext: "primary",
		},
		{
		  Task: "Generate ideas for design",
		  TeamMember1: user2.src,
		  TeamMember2: user10.src,
		  TeamMember3: user11.src,
		  TeamMember4: user12.src,
		  OpenTask: "37",
		  TaskProfit: "Normal",
		  Profittext: "secondary",
		  Status: "pending",
		  Statustext: "warning",
		},
		{
		  Task: "Define the problem",
		  TeamMember1: user3.src,
		  TeamMember2: user6.src,
		  TeamMember3: user7.src,
		  TeamMember4: user4.src,
		  OpenTask: "37",
		  TaskProfit: "Low",
		  Profittext: "warning",
		  Status: "Completed",
		  Statustext: "primary",
		},
		{
		  Task: "Empathize with users",
		  TeamMember1: user4.src,
		  TeamMember2: user5.src,
		  TeamMember3: user6.src,
		  TeamMember4: user3.src,
		  OpenTask: "37",
		  TaskProfit: "high",
		  Profittext: "primary",
		  Status: "Rejected",
		  Statustext: "danger",
		},
	  ];
  return (
    <>
        <Seo title="Dashboard"/>

      <PageHeader DisableInterval={true} CurrentTimeSpan={CurrentTimeSpan} setCurrentTimeSpan={(selected) => setCurrentTimeSpan(selected)} title="OP Airdrop Analysis" item="Airdrop" active_item="Project Dashboard"/>
    {/* <!--Row--> */}
	<div className="row row-sm">
		<div className="col-sm-12 col-lg-12 col-xl-8">
{/* <!--Row--> */}
<div className=" row row-sm mt-4">
	<div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
		<div className="card custom-card ">
			<div className="card-body crypto-card overflow-hidden " style={{borderRadius:"6%"}}>
				<div className="card-item">

					<div className=" card-item-icon card-icon ">
						<svg className="text-primary" xmlns="http://www.w3.org/2000/svg"
							enableBackground="new 0 0 24 24" height="24"
							viewBox="0 0 24 24" width="24">
							<g>
								<rect height="14" opacity=".3" width="14" x="5" y="5" />
								<g>
									<rect fill="none" height="24" width="24" />
									<g>
										<path
											d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z" />
										<rect height="5" width="2" x="7" y="12" />
										<rect height="10" width="2" x="15" y="7" />
										<rect height="3" width="2" x="11" y="14" />
										<rect height="2" width="2" x="11" y="10" />
									</g>
								</g>
							</g>
						</svg>
					</div>
					<div className="card-item-title mb-2 ">
						<div style={{display:"flex" ,flexDirection:"row",alignItems:"center",justifyContent:"space-between" }}>
						<label className="main-content-label tx-13 font-weight-bold mb-1">Numbrer of Claims</label>

						</div>
						<span className="d-block tx-12 mt-1 text-muted">Total Number of OP claims</span>
					</div>
					<div className=" card-item-body  pt-1 pb-1">
						<div className="card-item-stat">
						{Total_Numbers.Loading ? <SpinnerLoader className="align-self-center"/>:	<h3 className="font-weight-bold d-flex justify-content-center align-items-center align-self-center">{NUM_CLAIMS}</h3>}
							{/* <small><b className="text-success">55%</b> higher</small> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div className="col-sm-12 col-md-6 col-lg-6 col-xl-4">
		<div className="card custom-card">
			<div className="card-body crypto-card overflow-hidden " style={{borderRadius:"6%"}}>
				<div className="card-item">
					<div className="card-item-icon card-icon">
						<svg xmlns="http://www.w3.org/2000/svg" height="24"
							viewBox="0 0 24 24" width="24">
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path
								d="M12 4c-4.41 0-8 3.59-8 8 0 1.82.62 3.49 1.64 4.83 1.43-1.74 4.9-2.33 6.36-2.33s4.93.59 6.36 2.33C19.38 15.49 20 13.82 20 12c0-4.41-3.59-8-8-8zm0 9c-1.94 0-3.5-1.56-3.5-3.5S10.06 6 12 6s3.5 1.56 3.5 3.5S13.94 13 12 13z"
								opacity=".3" />
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
						</svg>
					</div>
					<div className="card-item-title mb-2">
						<label className="main-content-label tx-13 font-weight-bold mb-1">Total claimers</label>
						<span className="d-block tx-12 mt-1  mb-1 text-muted">Total number of OP claimers</span>
					</div>
					<div className="card-item-body  pt-1 pb-0">
						<div className="card-item-stat">
							{Total_Numbers.Loading ? <SpinnerLoader className="align-self-center"/>:<h3 className="font-weight-bold">{NUM_WALLETS}</h3>}
							{/* <small><b className="text-success">5%</b> Increased</small> */}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
		<div className="card custom-card">
			<div className="card-body crypto-card overflow-hidden " style={{borderRadius:"6%"}}>
				<div className="card-item">
					<div className="card-item-icon card-icon">
						<svg className="text-primary" xmlns="http://www.w3.org/2000/svg"
							height="24" viewBox="0 0 24 24" width="24">
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path
								d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1.23 13.33V19H10.9v-1.69c-1.5-.31-2.77-1.28-2.86-2.97h1.71c.09.92.72 1.64 2.32 1.64 1.71 0 2.1-.86 2.1-1.39 0-.73-.39-1.41-2.34-1.87-2.17-.53-3.66-1.42-3.66-3.21 0-1.51 1.22-2.48 2.72-2.81V5h2.34v1.71c1.63.39 2.44 1.63 2.49 2.97h-1.71c-.04-.97-.56-1.64-1.94-1.64-1.31 0-2.1.59-2.1 1.43 0 .73.57 1.22 2.34 1.67 1.77.46 3.66 1.22 3.66 3.42-.01 1.6-1.21 2.48-2.74 2.77z"
								opacity=".3" />
							<path
								d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
						</svg>
					</div>
					<div className="card-item-title  mb-2">
						<label className="main-content-label tx-13 font-weight-bold mb-1">Total Claimed Amount</label>
						<span className="d-block tx-12  mt-1  mb-1 text-muted">Total OP claimed amount </span>
					</div>
					<div className="card-item-body pt-1 pb-0">
							<div className="card-item-stat">
							{Total_Numbers.Loading ? <SpinnerLoader className="align-self-center"/>:	<h3 className="font-weight-bold">{"$OP "+CLAIMED_AMOUNT}</h3>}
						
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

			{/* <!--Row--> */}
			<div className=" row row-sm ">
				<div className="col-sm-12 col-md-6 col-lg-6 col-xl-4 ">
					<div className="card custom-card ">
						<div className="card-body crypto-card overflow-hidden " style={{borderRadius:"6%"}}>
							<div className="card-item">
		
								<div className=" card-item-icon card-icon ">
									<svg className="text-primary" xmlns="http://www.w3.org/2000/svg"
										height="24" viewBox="0 0 24 24" width="24">
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path
											d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1.23 13.33V19H10.9v-1.69c-1.5-.31-2.77-1.28-2.86-2.97h1.71c.09.92.72 1.64 2.32 1.64 1.71 0 2.1-.86 2.1-1.39 0-.73-.39-1.41-2.34-1.87-2.17-.53-3.66-1.42-3.66-3.21 0-1.51 1.22-2.48 2.72-2.81V5h2.34v1.71c1.63.39 2.44 1.63 2.49 2.97h-1.71c-.04-.97-.56-1.64-1.94-1.64-1.31 0-2.1.59-2.1 1.43 0 .73.57 1.22 2.34 1.67 1.77.46 3.66 1.22 3.66 3.42-.01 1.6-1.21 2.48-2.74 2.77z"
											opacity=".3" />
										<path
											d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
									</svg>
								</div>
								<div className="card-item-title mb-2 ">
									<div style={{display:"flex" ,flexDirection:"row",alignItems:"center",justifyContent:"space-between" }}>
									<label className="main-content-label tx-13 font-weight-bold mb-1">Total Claimable Amount</label>
		
									</div>
									<span className="d-block tx-12 mt-1 text-muted">Total Claimable OP Amount</span>
								</div>
								<div className=" card-item-body  pt-1 pb-1">
									<div className="card-item-stat">
									{Total_Numbers.Loading ? <SpinnerLoader className="align-self-center"/>:	<h3 className="font-weight-bold d-flex justify-content-center align-items-center align-self-center">{"$OP "+TOTAL_AMOUNT}</h3>}
										{/* <small><b className="text-success">55%</b> higher</small> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-12 col-md-6 col-lg-6 col-xl-4">
					<div className="card custom-card">
						<div className="card-body crypto-card overflow-hidden " style={{borderRadius:"6%"}}>
							<div className="card-item">
								<div className="card-item-icon card-icon">
									<svg className="text-primary" xmlns="http://www.w3.org/2000/svg"
										height="24" viewBox="0 0 24 24" width="24">
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path
											d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1.23 13.33V19H10.9v-1.69c-1.5-.31-2.77-1.28-2.86-2.97h1.71c.09.92.72 1.64 2.32 1.64 1.71 0 2.1-.86 2.1-1.39 0-.73-.39-1.41-2.34-1.87-2.17-.53-3.66-1.42-3.66-3.21 0-1.51 1.22-2.48 2.72-2.81V5h2.34v1.71c1.63.39 2.44 1.63 2.49 2.97h-1.71c-.04-.97-.56-1.64-1.94-1.64-1.31 0-2.1.59-2.1 1.43 0 .73.57 1.22 2.34 1.67 1.77.46 3.66 1.22 3.66 3.42-.01 1.6-1.21 2.48-2.74 2.77z"
											opacity=".3" />
										<path
											d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
									</svg>
								</div>
								<div className="card-item-title mb-2">
									<label className="main-content-label tx-13 font-weight-bold mb-1">Average Claimed amount</label>
									<span className="d-block tx-12 mt-1  mb-1 text-muted">Average OP Claimed amount</span>
								</div>
								<div className="card-item-body  pt-1 pb-0">
									<div className="card-item-stat">
										{Total_Numbers.Loading ? <SpinnerLoader className="align-self-center"/>:<h3 className="font-weight-bold">{"$OP "+AVG_CLAIMED}</h3>}
										{/* <small><b className="text-success">5%</b> Increased</small> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
					<div className="card custom-card">
						<div className="card-body crypto-card overflow-hidden " style={{borderRadius:"6%"}}>
							<div className="card-item">
								<div className="card-item-icon card-icon">
									<svg className="text-primary" xmlns="http://www.w3.org/2000/svg"
										height="24" viewBox="0 0 24 24" width="24">
										<path d="M0 0h24v24H0V0z" fill="none" />
										<path
											d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1.23 13.33V19H10.9v-1.69c-1.5-.31-2.77-1.28-2.86-2.97h1.71c.09.92.72 1.64 2.32 1.64 1.71 0 2.1-.86 2.1-1.39 0-.73-.39-1.41-2.34-1.87-2.17-.53-3.66-1.42-3.66-3.21 0-1.51 1.22-2.48 2.72-2.81V5h2.34v1.71c1.63.39 2.44 1.63 2.49 2.97h-1.71c-.04-.97-.56-1.64-1.94-1.64-1.31 0-2.1.59-2.1 1.43 0 .73.57 1.22 2.34 1.67 1.77.46 3.66 1.22 3.66 3.42-.01 1.6-1.21 2.48-2.74 2.77z"
											opacity=".3" />
										<path
											d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.42z" />
									</svg>
								</div>
								<div className="card-item-title  mb-2">
									<label className="main-content-label tx-13 font-weight-bold mb-1">Maximum Claimed Amount</label>
									<span className="d-block tx-12  mt-1  mb-1 text-muted">Maximum OP Claimed Amount</span>
								</div>
								<div className="card-item-body pt-1 pb-0">
									<div className="card-item-stat">
									{Total_Numbers.Loading ? <SpinnerLoader className="align-self-center"/>:	<h3 className="font-weight-bold">{"$OP "+MAX_CLAIMED}</h3>}
										{/* <small><b className="text-danger">12%</b> decrease</small> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
							{/* <!--End row--> */}

							{/* <!--row--> */}
							<Row className="row-sm">
            <Col sm={12} lg={12} xl={12}>
              <Card className="custom-card  overflow-hidden">
                <Card.Header className="border-bottom-0">
                  <div>
                    <label className="main-content-label mb-2">
                      AirDrop Claims 
                    </label>
                    <span className="d-block tx-12 mb-0 text-muted">
                      The follwing chart shows The number of AirdropClaims, wallets and cumulative number of claims
                    </span>
                  </div>
                </Card.Header>
                <Card.Body className="ps-12">
                  <div>
                    <Container>
                      <div className="chart-dropshadow2 ht-300">
                      <DailyNumClaimComp CurrentTimeSpan={CurrentTimeSpan}  options={dashboardmain.linechartoptions} className="barchart chart-dropshadow2 ht-300 chartjs-render-monitor" height="100"/>
                      </div>
                    </Container>
                  </div>
                </Card.Body>
              </Card>
            </Col>

			<Col sm={12} lg={12} xl={12}>
              <Card className="custom-card  overflow-hidden">
                <Card.Header className="border-bottom-0">
                  <div>
                    <label className="main-content-label mb-2">
                      $OP Claimed Amount  
                    </label>
                    <span className="d-block tx-12 mb-0 text-muted">
                      The follwing chart shows Weekly $OP Claimed amount over time 
                    </span>
                  </div>
                </Card.Header>
                <Card.Body className="ps-12">
                  <div>
                    <Container>
                      <div className="chart-dropshadow2 ht-250">
                    <DailyClaimedAmountComp CurrentTimeSpan={CurrentTimeSpan}  className="barchart chart-dropshadow2  chartjs-render-monitor ht-300" />
                      </div>
                    </Container>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            
          </Row>
				{/* <!-- Row end --> */}
			</div>
			{/* <!-- col end --> */}
			<div className="col-sm-12 col-lg-12 col-xl-4 mt-xl-4">
				<div className="card custom-card crypto-card card-dashboard-calendar pb-2  ">
					<label className="main-content-label mb-2 pt-1">Claimed Amount Distribution</label>
					<span className="d-block tx-12 mb-2 text-muted">$OP Claimed Amount Distribution</span>
						<div className='justify-content-center align-items-center ht-250'>
						<AirDropDistributionComp   CurrentTimeSpan={CurrentTimeSpan}/>
						</div>
					
				</div>
				<div className="card custom-card crypto-card">
					<div className="card-body">
						<div className="row row-sm">
							<div className="col-12">
								<div className="card-item-title">
				<label className="main-content-label tx-13 font-weight-bold pb-0 mb-0  ">Top Destinations </label>
				<span className="d-block tx-12 mt-0 text-muted">
				Popular Destinations for Airdrop Claimers {CurrentTimeSpan}
				</span>
				<div className='ht-250'>
				<TopDestinations  CurrentTimeSpan={CurrentTimeSpan}/>
				</div>
				<div className='pb-1' />
						</div>
					</div>
				</div>
			</div>
			</div>
	
        					<div className="card crypto-card custom-card card-dashboard-calendar pb-4 ">
								<label className="main-content-label mb-1 pt-1">NFT Sellers ( by price in ETH )</label>
								<span className="d-block tx-12 mb-2 text-muted">The Distribution of NFT Sellers based on NFT price in ETH in the {CurrentTimeSpan}</span>
                 					<div className='ht-300 '>
										<DisAirdropHoldersComp CurrentTimeSpan={CurrentTimeSpan} />
									</div>
							</div>
						</div>
						{/* <!-- col end --> */}
					</div>
					{/* <!-- Row end --> */}
    </>
  )
}
Dashboard.layout = "Contentlayout"

export default Dashboard