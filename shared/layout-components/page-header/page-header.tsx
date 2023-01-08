import React, { useCallback, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { TimeSpanDataType } from '../../../src/Queries/types';

interface Props {
  title:string;
  setCurrentTimeSpan: (SelectedTimespan: TimeSpanDataType)=>void;
  CurrentTimeSpan: TimeSpanDataType;
  subtitle?:string;
}

const DropDownTimeData: TimeSpanDataType[] = ["Last 7 days","Last 30 days", 'Last 3 months', 'Last 6 months', 'Last one year']
interface DropDownTimeItemProps{
  onSelectTimeSpan: (SelectedTimespan: TimeSpanDataType)=>void;
}
function DropDownTimeItemsComp({onSelectTimeSpan }: DropDownTimeItemProps){
  return(
    <>
    {
      DropDownTimeData.map((item,index)=>{
        return (
          <Dropdown.Item key={index} onClick={() => onSelectTimeSpan(item)} >{item}</Dropdown.Item>
        )
      })
    }
    </>
  )
}
const PageHeader = ({ title, setCurrentTimeSpan, CurrentTimeSpan ,subtitle }:Props) => {
  // const [SelectedTimeSpan, setSelectedTimeSpan] = useState<DropDownTimeSpanData>("Last 30 days")
  // useCallback(() => { 
  //   setCurrentTimeSpan(SelectedTimeSpan)
  // }, [setCurrentTimeSpan])
  return (
    <div className="page-header">
      <div>
        <h2 className="main-content-title tx-24 mg-b-5">{title}</h2>
        {subtitle ?<ol className="breadcrumb">
          <li className="breadcrumb-item"><a>{subtitle}</a></li>
          {/* <li className="breadcrumb-item active" aria-current="page">{props.active_item}</li> */}
        </ol> :<></>}
      </div>
      
      <div className="d-flex   ">
        <h5 className='p-1 mt-1 '>Interval :</h5>
        <div className="justify-content-center">
          
          <Dropdown  >
            <Dropdown.Toggle  variant="primary">
              {CurrentTimeSpan}
            <i className="fas fa-caret-down ms-1"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu className=" tx-13" style={{ marginTop: "0px" }}>
            <h6 className="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
            Choose TimeSpan
            </h6>
              <DropDownTimeItemsComp onSelectTimeSpan={(data) => setCurrentTimeSpan(data)}  />
            {/* <Dropdown.Item onClick={()=>console.log("ss")} href="#">Action</Dropdown.Item>
            <Dropdown.Item href="#">Another action</Dropdown.Item>
            <Dropdown.Item href="#">Something else here</Dropdown.Item> */}
            </Dropdown.Menu>
          </Dropdown>
          {/* <button type="button" className="btn btn-white btn-icon-text my-2 me-2">
            <i className="fe fe-download me-2"></i> Import
          </button>
          <button type="button" className="btn btn-white btn-icon-text my-2 me-2">
            <i className="fe fe-filter me-2"></i> Filter
          </button> */}
          {/* <button type="button" className="btn btn-primary my-2 btn-icon-text">
            <i className="fe fe-download-cloud me-2"></i> Download Report
          </button> */}
        </div>
      </div>
    </div>
  )
}

export default PageHeader