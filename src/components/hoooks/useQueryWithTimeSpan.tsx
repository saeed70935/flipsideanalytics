import React, { useEffect, useState } from 'react';
import { TimeSpan, TimeSpanDataType } from '../../Queries/types';
export function useQueryWithTimeSpan(Query: string, CurrentTimeSpan: TimeSpanDataType){
    const [ModifiedQuery, setModifiedQuery] = useState<string>(Query)
    useEffect(() => { 
        switch (CurrentTimeSpan){
            case "Last 7 days":
                {
                    let temp = Query.replaceAll(TimeSpan, `7`);
                    setModifiedQuery(temp);
                    break;
                }
            case "Last 30 days":
            {
                let temp = Query.replaceAll(TimeSpan,`30`);
                setModifiedQuery(temp);
                break;
            }
            case "Last 3 months":{
                let temp = Query.replaceAll(TimeSpan, `90`);
                setModifiedQuery(temp);
                break;
            }
            case "Last 6 months": {
                let temp = Query.replaceAll(TimeSpan, `180`);
                setModifiedQuery(temp);
                break;
            }
            case "Last one year": {
                let temp = Query.replaceAll(TimeSpan, `360`);
                setModifiedQuery(temp);
                break;
            }
        }
    }, [Query, CurrentTimeSpan])
    return ModifiedQuery;
}