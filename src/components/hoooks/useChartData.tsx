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
export type HorizontalItemData = string | number | boolean | null;
export function useChartData(horizontalIndex: number, Data: FlipsideQueryResult[], verticalSettings: VerticalSettings[]){
    const [VerticalData, setVerticalData] = useState<verticalChartData[]>([])
    const [HorizontalData, setHorizontalData] = useState<HorizontalItemData[]>([])
    useEffect(()=>{
       let tempVertical: verticalChartData[] = [];
        let tempHorizontal: HorizontalItemData[] = [];
        Data.map((item, index) => {
            if (horizontalIndex == index){
                tempHorizontal.push(...item.value)
            }
            else {
                if (horizontalIndex !== index)
                    // tempsettings =  verticalSettings[index]
                    tempVertical.push({ label:item.name, data: item.value, ...verticalSettings[index-1]})
            }
       });
        setVerticalData(R.clone(tempVertical));
        setHorizontalData(R.clone(tempHorizontal))
    }, [Data, verticalSettings, horizontalIndex])
    return { horizontal: HorizontalData, vertical: VerticalData }
}