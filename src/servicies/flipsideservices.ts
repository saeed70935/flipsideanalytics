import { Flipside,Query,QueryResultSet } from '@flipsidecrypto/sdk';
const flipside = new Flipside("99e8a56d-0bc7-49ea-9c79-94492d6326f0");
export const get_flipside_query_API =async (query:string)=>{
    const Result = await flipside.query.run({sql:query,cached:true ,timeoutMinutes:15,ttlMinutes:60 });
    
}