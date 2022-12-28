

export const  APIservice  = async ()=>{
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Accept", "application/json");
myHeaders.append("x-api-key", "76eb7581-0a45-421d-b8bb-022dc9a2e04b");
let temp = {sql : `select * from optimism.core.fact_transactions limit 1`}
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: JSON.stringify(temp),
};
return fetch("https://node-api.flipsidecrypto.com/queries", requestOptions)
  .then(response => response.json())
  .then(result => {console.log('POST API',result.token) ;  return {ok:true , token:result.token} })
  .catch(error =>{ return {ok:false,token:""}} )
}
export const GetAPI = async (Token :string)=>{
    var myHeaders = new Headers();
myHeaders.append("x-api-key", "76eb7581-0a45-421d-b8bb-022dc9a2e04b");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
};

return fetch(`https://node-api.flipsidecrypto.com/queries/${Token}`, requestOptions)
  .then(response => response.json())
  .then(result => result)
  .catch(error =>  error);
}