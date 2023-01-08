import React, { useEffect, useState } from 'react';
import { FlipsideQueryResult } from './useflipside';
import * as R from 'ramda';
export interface GroupedVerticalChartItem {
    label?:string;
    data?:number[];
    backgroundColor:string;
    stack:number

}
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
// export interface verticalChartData {
//     label?: string | null;
//     data: Array<string | number | boolean|null> ;
//     borderWidth?: number;
//     backgroundColor?: string;
//     borderColor?: string;
//     pointBackgroundColor?: string;
//     pointRadius?: number;
//     tension?: number;
    
// }
export type HorizontalItemData = string | number | boolean | null;
export function useGroupedChartData(horizontalIndex: number, VerticalIndex: number, GroupedIndex: number, Data: FlipsideQueryResult[], verticalSettings: GroupedVerticalChartItem[]){
    const [VerticalData, setVerticalData] = useState<GroupedVerticalChartItem[]>([])
    const [HorizontalData, setHorizontalData] = useState<HorizontalItemData[]>([])
    useEffect(()=>{
        let tempVertical: GroupedVerticalChartItem[] = [];
        let tempHorizontal: HorizontalItemData[] = [];
        let groupddata:{label:string,value:number[]}[]=[];
        if (Data && Data.length>0  ){
            Data[GroupedIndex].value && Data[GroupedIndex].value.map((item,index)=>{
            let existed= false;
            groupddata.map((grouped)=>{
                if (grouped.label === item){
                    existed=true
                }
            });
             if (!existed){
                //@ts-ignore
                groupddata.push({ label: item, value :[]})
             }
         });
            Data[GroupedIndex].value && Data[GroupedIndex].value.map((item, index) => {
                Data[VerticalIndex].value.map((verticalitem,verticalIndexItem)=>{
                    groupddata.map((groupditem,groupedindex)=>{
                        if (item === groupditem.label ){
                            if (verticalIndexItem === index){
                                //@ts-ignore
                                groupditem.value.push(verticalitem)
                            }
                        }
                    })
                })
            })
            Data[horizontalIndex].value && Data[horizontalIndex].value.map(item=>{
                if (!tempHorizontal.includes(item)){
                    tempHorizontal.push(item)
                }
            })
        }
        groupddata.map((item,index)=>{
            tempVertical.push({ ...verticalSettings[index] , label:item.label,data:item.value })
        })
        setVerticalData(R.clone(tempVertical));
        setHorizontalData(R.clone(tempHorizontal))
        
    }, [Data, verticalSettings, horizontalIndex, GroupedIndex])
    return { horizontal: HorizontalData, vertical: VerticalData }
}