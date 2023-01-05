import React from 'react';
import { Queries } from '../../Queries/Queries';
import { TimeSpanDataType } from '../../Queries/types';
import { FlipsideResponse, useFlipside } from './useflipside';
import { useQueryWithTimeSpan } from './useQueryWithTimeSpan';

export function useSingleNumber(Query: string, ColumnNumber: number, CurrentTimeSpan  :TimeSpanDataType){
    const ModifiedQuery = useQueryWithTimeSpan(Query, CurrentTimeSpan)
    const Result: FlipsideResponse = useFlipside(ModifiedQuery);
    return Result
}