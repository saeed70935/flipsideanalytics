import React from 'react';
interface Props {
 height?:string ;
    className?:string
}
export function SpinnerLoader({ height,className}: Props){
    return(
        <div style={{ height: height }} 
            className={`d-flex justify-content-center align-items-center  ${className}`} 
            // className="d-flex justify-content-center align-items-center"  
        >
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>

            </div>
        </div>
    )
}