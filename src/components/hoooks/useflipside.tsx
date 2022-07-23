import React, { useEffect, useState } from 'react';
import { Flipside,QueryResultSet } from '@flipsidecrypto/sdk';
import Moment from 'moment'
const flipside = new Flipside("99e8a56d-0bc7-49ea-9c79-94492d6326f0");
export interface FlipsideQueryResult  {name:string|null;type:'date'|'number'|'text'|'boolean'|string;value:Array<string|number|boolean|null>} ;
export function useFlipside (query:string){
    const [QueryResult,setQueryResult] = useState<QueryResultSet>({columns:[],columnTypes:[],error:null,queryId:"",records:[],rows:[],runStats:{startedAt: new Date(Date.now()),endedAt:new Date(Date.now()),elapsedSeconds:0,recordCount:0},status:"pending"});
    const [FineQueryResult,setFineQueryResult] = useState<FlipsideQueryResult[]>([]);
    const get_query_flipside = async(query:string)=>{
        const Result = await flipside.query.run({sql:query,cached:true ,timeoutMinutes:15,ttlMinutes:60 });
        console.log("Result",Result)
        setQueryResult (Result);
    }
    useEffect(()=>{
        get_query_flipside(query)
    },[query])
    useEffect(()=>{
        if(QueryResult.status !=="pending" && QueryResult.status !=="error"){
            let TempFineData :FlipsideQueryResult[]=[]
            QueryResult.columns?.map((item,index)=>{
            TempFineData.push({name:item,type:QueryResult.columnTypes&&QueryResult.columnTypes[index]?QueryResult.columnTypes[index]:"",value:[]})
        })
        for (let i=0;i<TempFineData.length;i++){
            let temp2:Array<string|null|boolean|number> = [];
            QueryResult.rows?.map (item=>{
                if(TempFineData[i].type==='date'){
                    //@ts-ignore
                    let temp :string = item[i];
                    temp2.push(Moment(temp).format('MMM DD, YYYY'))
                }
                else 
                temp2.push(item[i])
            });
            TempFineData[i].value = temp2;
        }
        setFineQueryResult(TempFineData.filter(x=>x));
        }
    },[QueryResult])
    return FineQueryResult;
}