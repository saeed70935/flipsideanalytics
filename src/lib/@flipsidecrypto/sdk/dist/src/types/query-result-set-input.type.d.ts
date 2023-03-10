import { QueryRunExecutionError, QueryRunRateLimitError, QueryRunTimeoutError, ServerError, UserError, UnexpectedSDKError } from "../errors";
import { QueryResultJson } from "./api/query-result-resp.type";
export declare type QueryResultSetBuilderInput = {
    queryResultJson: QueryResultJson | null;
    error: QueryRunExecutionError | QueryRunRateLimitError | QueryRunTimeoutError | ServerError | UserError | UnexpectedSDKError | null;
};
//# sourceMappingURL=query-result-set-input.type.d.ts.map