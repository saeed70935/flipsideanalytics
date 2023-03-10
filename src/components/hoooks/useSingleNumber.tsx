import { Queries } from '../../Queries/Queries';
import { TimeSpanDataType } from '../../Queries/types';
import { FlipsideResponse, useFlipside } from './useflipside';
import { useQueryWithTimeSpan } from './useQueryWithTimeSpan';
import useQueryWithTimeSpan2 from './useQueryWithTimeSpan2';
 

export function useSingleNumber(Query: string, ColumnNumber: number, CurrentTimeSpan: TimeSpanDataType = "Last 7 days"){
    const Result: FlipsideResponse = useFlipside(useQueryWithTimeSpan2(Query, CurrentTimeSpan));
    return Result
}