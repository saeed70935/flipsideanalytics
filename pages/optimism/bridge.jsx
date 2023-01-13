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
import TotalBridgeComp from '../../src/components/OPCharts/bridge/TotalBridgeComp';
import DailyBridgeComp from '../../src/components/OPCharts/bridge/DailyBridgeComp';
import BridgedETHVolumeComp from '../../src/components/OPCharts/bridge/BridgedETHVolumeComp';
import BridgedUSDCVolumeComp from '../../src/components/OPCharts/bridge/BridgedUSDCVolumeComp';
import CumulativeBridgeComp from '../../src/components/OPCharts/bridge/CumulativeBridgeComp';


const Dashboard = () => {
  const [CurrentTimeSpan, setCurrentTimeSpan] = useState('Last 7 days');
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
  return (
    <>
        <Seo title="Dashboard"/>

      <PageHeader CurrentTimeSpan={CurrentTimeSpan} setCurrentTimeSpan={(selected) => setCurrentTimeSpan(selected)} title="Optimism Bridge Analysis" item="Airdrop" active_item="Project Dashboard"/>
    {/* <!--Row--> */}
	<div className="row row-sm">
		<div className="col-sm-12 col-lg-12 col-xl-8">
{/* <!--Row--> */}

<TotalBridgeComp CurrentTimeSpan={CurrentTimeSpan} />
							{/* <!--row--> */}
  <DailyBridgeComp CurrentTimeSpan={CurrentTimeSpan}/>
            
          
				{/* <!-- Row end --> */}
			</div>
			{/* <!-- col end --> */}
			<div className="col-sm-12 col-lg-12 col-xl-4 mt-xl-4">
				<div className="card custom-card  card-dashboard-calendar pb-2  ">
					<label className="main-content-label mb-2 pt-1">The number of $ETH Bridges</label>
					<span className="d-block tx-12 mb-2 text-muted">The number of Bridges Distribution based on Bridged Volume in The last month</span>
						<div className='justify-content-center align-items-center ht-300'>
						<BridgedETHVolumeComp   CurrentTimeSpan={CurrentTimeSpan}/>
						</div>
					
				</div>
				<div className="card custom-card ">
					<div className="card-body">
						<div className="row row-sm">
							<div className="col-12">
								<div className="card-item-title">
				<label className="main-content-label tx-13 font-weight-bold pb-0 mb-0  ">number of $USDC Bridges </label>
				<span className="d-block tx-12 mt-0 text-muted">
				The number of USDC Bridges Distribution based on Bridged Volume in The last month
				</span>
				<div className='ht-250'>
				<BridgedUSDCVolumeComp  CurrentTimeSpan={CurrentTimeSpan}/>
				</div>
				<div className='pb-1' />
						</div>
					</div>
				</div>
			</div>
			</div>
	
        					<div className="card  custom-card card-dashboard-calendar   ">
								<label className="main-content-label mb-1 pt-1">Cumulative number of Bridges</label>
								<span className="d-block tx-12 mb-2 text-muted">Cumulative number of Bridges in the {CurrentTimeSpan}</span>
                 					<div className='ht-250 '>
										<CumulativeBridgeComp CurrentTimeSpan={CurrentTimeSpan} />
									</div>
                 {/* <div className='pb-2'/>
                 <div className='pb-1'/> */}
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