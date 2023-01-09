import React, { useEffect, useState } from 'react';
import { FlipsideQueryResult } from './useflipside';
import * as R from 'ramda';
export interface FlipsideChartData {
    label?: string;
    data: number[];
}
export interface VerticalSettings {
    borderWidth?: number;
    backgroundColor?: string;
    borderColor?: string;
    pointBackgroundColor?: string;
    pointRadius?: number;
    tension?: number;
}
export interface verticalChartData {
    label?: string | null;
    data: Array<string | number | boolean|null> ;
    borderWidth?: number;
    backgroundColor?: string;
    borderColor?: string;
    pointBackgroundColor?: string;
    pointRadius?: number;
    tension?: number;
}
export interface ChartDataResult {
    horizontal: HorizontalItemData[]; 
    vertical: verticalChartData[];
}
export type HorizontalItemData = string | number | boolean | null;
export function useChartData(horizontalIndex: number, Data: FlipsideQueryResult[], verticalSettings: VerticalSettings[],DisbaleVerticalSettings:boolean=false){
    const [VerticalData, setVerticalData] = useState<verticalChartData[]>([])
    const [HorizontalData, setHorizontalData] = useState<HorizontalItemData[]>([])
    useEffect(()=>{
        let tempVertical: verticalChartData[] = [];
        let tempHorizontal: HorizontalItemData[] = [];
        let lastverticalSettingsIndexExisted = 0;
        if (!DisbaleVerticalSettings){
        Data.map((item, index) => {
            if (horizontalIndex == index){
                tempHorizontal.push(...item.value)
            }
            else {
                if (horizontalIndex !== index)
                    // tempsettings =  verticalSettings[index]
                    if (verticalSettings[index - 1] === undefined){
                        tempVertical.push({ label: item.name, data: item.value, ...verticalSettings[lastverticalSettingsIndexExisted]})
                    }
                    else {
                        tempVertical.push({ label: item.name, data: item.value, ...verticalSettings[index - 1] })
                        lastverticalSettingsIndexExisted = index - 1
                    }
            }
        
       });
    }
    else {
            Data.map((item, index) => {
                if (horizontalIndex == index) {
                    tempHorizontal.push(...item.value)
                }
                else {
                    if (horizontalIndex !== index)
                    tempVertical.push({ label: item.name, data: item.value })
                }

            });
    }
        setVerticalData(R.clone(tempVertical));
        setHorizontalData(R.clone(tempHorizontal))
    }, [Data, verticalSettings, horizontalIndex])
    return { horizontal: HorizontalData, vertical: VerticalData }
}