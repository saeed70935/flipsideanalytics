import React, { useEffect, useState } from 'react';
import { Flipside, Query, QueryResultSet } from "../../lib/@flipsidecrypto/sdk/src";
import Moment from 'moment'
import * as R from 'ramda'
const flipside = new Flipside("99e8a56d-0bc7-49ea-9c79-94492d6326f0", "https://node-api.flipsidecrypto.com");
// const flipside = new Flipside("76eb7581-0a45-421d-b8bb-022dc9a2e04b")
export interface FlipsideQueryResult  {name:string|null;type:'date'|'number'|'text'|'boolean'|string;value:Array<string|number|boolean|null>} ;
export type QueryRowItem = Array<string | number>
export interface FlipsideResponse {
    Loading: boolean, 
    Success: boolean, 
    Failed: boolean,
    QueryResult: FlipsideQueryResult[]
    QueryRows: QueryRowItem[]
}

export function useFlipside(query: string, DateEdited:boolean=true){
    const [QueryResult,setQueryResult] = useState<QueryResultSet>({columns:[],columnTypes:[],error:null,queryId:"",records:[],rows:[],runStats:{startedAt: new Date(Date.now()),endedAt:new Date(Date.now()),elapsedSeconds:0,recordCount:0},status:"pending"});
    const [FineQueryResult,setFineQueryResult] = useState<FlipsideQueryResult[]>([]);
    const [QueryRows, setQueryRows] = useState<QueryRowItem[]>([])
    const [Loading,setLoading] = useState<boolean>(true);
    const [Success,setSuccess] = useState<boolean>(false);
    const [Failed,setFailed] = useState<boolean> (false);
    const get_query_flipside = async(query:string)=>{
        const Result = await flipside.query.run({sql:query,cached:true ,timeoutMinutes:6,ttlMinutes:60*24 });
        
        setQueryResult (Result);
    }
    useEffect(()=>{
        setFailed(false);
        setLoading(true);
        setSuccess(false);
        get_query_flipside(query)
    },[query])
    useEffect(()=>{
        let TempFineData: FlipsideQueryResult[] = []
        let TempRows: QueryRowItem[] = []
        if (QueryResult.status === 'error'){
            setFailed(true);
            setLoading(false);
            setSuccess(false);
            setFineQueryResult([]);
        }
        else {
            if(QueryResult.status ==="finished"){
                //@ts-ignore
                TempRows = QueryResult.rows && R.clone(QueryResult.rows)
                QueryResult.columns?.map((item,index)=>{
                TempFineData.push({name:item,type:QueryResult.columnTypes&&QueryResult.columnTypes[index]?QueryResult.columnTypes[index]:"",value:[]})
            })
            for (let i=0;i<TempFineData.length;i++){
                let temp2:Array<string|null|boolean|number> = [];
                QueryResult.rows?.map (item=>{
                    if(TempFineData[i].type==='date'){
                        //@ts-ignore
                        let temp :string = item[i];
                        if (DateEdited)
                        temp2.push(Moment(temp).format('MMM DD, YYYY'))
                        else temp2.push(temp)
                    }
                    else 
                    temp2.push(item[i])
                });
                TempFineData[i].value = temp2;
            }
                if (TempFineData.length >0  ){
                    setFailed(false);
                    setLoading(false);
                    setSuccess(true);
                    setFineQueryResult(TempFineData);
                    setQueryRows(TempRows)
                }
            }
    }
    },[QueryResult])
    return { Loading: Loading, Success: Success, Failed: Failed, QueryResult: FineQueryResult, QueryRows: QueryRows };
}