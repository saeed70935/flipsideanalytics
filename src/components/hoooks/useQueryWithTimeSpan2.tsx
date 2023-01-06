import { TimeSpan, TimeSpanDataType } from '../../Queries/types';
export default function useQueryWithTimeSpan2(Query: string, CurrentTimeSpan: TimeSpanDataType){
    // const [ModifiedQuery, setModifiedQuery] = useState<string>(Query)
    let ModifiedQuery ="";
    const setModifiedQuery =(modified)=>{
        return ModifiedQuery = modified;
    }
    switch (CurrentTimeSpan) {
        case "Last 7 days":
            {
                let temp = Query.replaceAll(TimeSpan, `7`);
               return setModifiedQuery(temp);
                break;
            }
        case "Last 30 days":
            {
                let temp = Query.replaceAll(TimeSpan, `30`);
                return setModifiedQuery(temp);
                break;
            }
        case "Last 3 months": {
            let temp = Query.replaceAll(TimeSpan, `90`);
            return setModifiedQuery(temp);
            break;
        }
        case "Last 6 months": {
            let temp = Query.replaceAll(TimeSpan, `180`);
            return setModifiedQuery(temp);
            break;
        }
        case "Last one year": {
            let temp = Query.replaceAll(TimeSpan, `360`);
            return setModifiedQuery(temp);
            break;
        }
    }
  
}