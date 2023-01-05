import React, { useCallback, useEffect, useState } from 'react';
import { Flipside, Query, QueryResultSet } from "../../lib/@flipsidecrypto/sdk/src";
import Moment from 'moment'
import * as R from 'ramda'
const flipside = new Flipside("99e8a56d-0bc7-49ea-9c79-94492d6326f0");
interface FlipsideQueryResult  {name:string|null;type:'date'|'number'|'text'|'boolean'|string;value:Array<string|number|boolean|null>} ;
export interface FlipsideRowsResponse {
    Loading: boolean, 
    Success: boolean, 
    Failed: boolean,
    QueryResult: Array<string| number> []
}
export function useFlipsideRows (query:string){
    console.log("ResultQuery", query)
    const [QueryResult,setQueryResult] = useState<QueryResultSet>({columns:[],columnTypes:[],error:null,queryId:"",records:[],rows:[],runStats:{startedAt: new Date(Date.now()),endedAt:new Date(Date.now()),elapsedSeconds:0,recordCount:0},status:"pending"});
    const [FineQueryResult,setFineQueryResult] = useState<Array<string|number>[]>([]);
    const [Loading,setLoading] = useState<boolean>(true);
    const [Success,setSuccess] = useState<boolean>(false);
    const [Failed,setFailed] = useState<boolean> (false);
    const get_query_flipside = async(query:string)=>{
        const Result = await flipside.query.run({sql:query,cached:true ,timeoutMinutes:15,ttlMinutes:60 });
       
        setQueryResult (Result);
    }
    useCallback(()=>{
        // if(query !=""){
        setFailed(false);
        setLoading(true);
        setSuccess(false);
        get_query_flipside(query)
        // }
    },[query])
    useEffect(()=>{
        let TempFineData: Array<string | number>[] = []
        
        if (QueryResult.status === 'error'){
            setFailed(true);
            setLoading(false);
            setSuccess(false);
            setFineQueryResult([]);
        }
        else {
            if(QueryResult.status ==="finished"){
                if (QueryResult.rows && QueryResult.rows.length >0)
                //@ts-ignore
                setFineQueryResult(R.clone(QueryResult.rows));
                    setFailed(false);
                    setLoading(false);
                    setSuccess(true);
            }
    }
    },[QueryResult])
    return { Loading: Loading, Success: Success, Failed: Failed, QueryResult: FineQueryResult , };
}