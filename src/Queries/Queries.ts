import { OptimismSwapPlatFormParam, TimeSpan } from "./types";

export const Queries = {
 OverView :{
  OPPrice :`
  select HOUR::date daily,
avg(PRICE) price 
from optimism.core.fact_hourly_token_prices
  where SYMBOL = 'OP' 
  and HOUR::date >= CURRENT_DATE - ${TimeSpan}
group by 1 order by daily
`,
Total :`with ethpricet as (
select hour::date as day,
avg (price) as ETHPrice
from ethereum.core.fact_hourly_token_prices
where symbol = 'WETH'
and hour::date >= CURRENT_DATE - ${TimeSpan}
group by 1)
select
count (distinct tx_hash) as TX_Count,
count (distinct from_address) as Users_Count,
sum (tx_fee) as Total_ETH_Fee, 
avg (tx_fee) as Average_ETH_Fee,
min (tx_fee) as Minimum_ETH_Fee,
max (tx_fee) as Maximum_ETH_Fee,
median (tx_fee) as Median_ETH_fee,
sum (tx_fee*ethprice) as Total_USD_Fee,
avg (tx_fee*ethprice) as Average_USD_Fee,
min (tx_fee*ethprice) as Minimum_USD_Fee,
max (tx_fee*ethprice) as Maximum_USD_Fee,
median (tx_fee*ethprice) as Median_USD_Fee
from optimism.core.fact_transactions  join ethpricet on block_timestamp::date = day
  -- join  min_user on block_timestamp::date = min_date 
where status = 'SUCCESS'
and block_timestamp::date >= CURRENT_DATE - ${TimeSpan}
`,
 DistributionByNumTransactions :
  `with maintable as (
select from_address,
count (distinct tx_hash) as TX_Count
from optimism.core.fact_transactions 
where status = 'SUCCESS'
  and block_timestamp >= CURRENT_DATE - ${TimeSpan}
group by 1
)
select
case when TX_Count = 1 then '1 Transaction'
when TX_Count > 1 and TX_Count <= 10 then '2 - 10 Transactions'
when TX_Count > 10 and TX_Count <= 25 then '11 - 25 Transactions'
when TX_Count > 25 and TX_Count <= 50 then '26 - 50 Transactions'
when TX_Count > 50 and TX_Count <= 100 then '51 - 100 Transactions'
when TX_Count > 100 and TX_Count <= 250 then '101 - 250 Transactions'
when TX_Count > 250 and TX_Count <= 500 then '251 - 500 Transactions'
when Tx_Count > 500 and tx_Count <= 1000 then '500 - 1000 Transactions'
else 'More Than 1000 Transactions' end as TX_Count_type,
count (distinct from_address) as Users_Count
from maintable
group by 1 order by Users_Count desc`,

TotalSuccessPercentage :`with SuccessFul as (
  select count (tx_hash) num_success
  from optimism.core.fact_transactions
  where block_timestamp >= CURRENT_DATE - ${TimeSpan}
  and status = 'SUCCESS'
),
 Failed as (
  select count (tx_hash) num_failed
  from optimism.core.fact_transactions
  where block_timestamp >= CURRENT_DATE - ${TimeSpan}
  and status <> 'SUCCESS'
)
select num_success , num_failed,
round ((num_success/(num_success+num_failed))*100) percent
from SuccessFul , Failed`,

DailynumtransactionsandActiveusers :`
  select 
  date_trunc(day,block_timestamp)::date as date,
  count (distinct tx_hash) as Num_Transactions,
  count (distinct from_address) as Num_Users
  -- sum (tx_fee) as Total_ETH_Fee,
  -- avg (tx_fee) as Average_ETH_Fee,
  -- max (tx_fee) as Maximum_ETH_Fee,
  -- median (tx_fee) as Median_ETH_fee,
  -- sum (tx_count) over (order by date) as Cumulative_TX_Count
  from optimism.core.fact_transactions 
  where status = 'SUCCESS'
  and block_timestamp >= CURRENT_DATE - ${TimeSpan}
  group by 1 order by 1 `,
  ActiveUsersOnWeekDays :`select 
dayname(to_date(block_timestamp::date)) as weekday,
count (distinct from_address) as Num_Users
from optimism.core.fact_transactions
where status = 'SUCCESS'
  and block_timestamp >= CURRENT_DATE - ${TimeSpan}
group by 1`,
 NumTransactionsOnWeekDays :`select 
dayname(to_date(block_timestamp::date)) as weekday,
count (distinct tx_hash) as Num_Transactions
from optimism.core.fact_transactions
where status = 'SUCCESS'
  and block_timestamp >= CURRENT_DATE - ${TimeSpan}
group by 1`,
 OptimismPerformance :`with TPS_ as ( select 
date(block_timestamp)::date as date,
count(distinct tx_hash) as  tx_count,
tx_count/86400 as tps,
count (case when STATUS != 'SUCCESS' then 1 end) as Failed_TX,
count (case when STATUS = 'SUCCESS' then 1 end) as Success_TX,
(Failed_TX / (Success_TX + Failed_TX)) * 100 as Failure_Rate
from Optimism.core.fact_transactions 
  where date(block_timestamp) ::date >= CURRENT_DATE - ${TimeSpan}
group by 1 order by 1
  )
select date ,
  TPS,
 Failure_Rate
from TPS_
order by date`,
TransactionsType :`
select 
 LABEL_TYPE ,
  count(tx_hash) tx_count
  from Optimism.core.fact_transactions t join  Optimism.core.dim_labels l 
on  t.to_address = l.address
  where  status <> 'FAIL'
  and block_timestamp::date >= CURRENT_DATE - ${TimeSpan}
  
group by 1 order by tx_count desc limit 5
`
 },
 Dex:{
  TotalSwaps:
    `with UniSwap as (
 select  
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (0)  usd_volume,

avg (0)  weekly_avg_volume ,
median (0) Med_USD_volume,
max (0)  Max_USD_volume,
COUNT (DISTINCT contract_address)  num_pools
  from optimism.core.fact_event_logs 
where ORIGIN_TO_ADDRESS in ('0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45','0xe592427a0aece92de3edee1f18e0157c05861564')
and EVENT_NAME = 'Swap'
and TX_STATUS = 'SUCCESS'
  and block_timestamp >= CURRENT_DATE - ${TimeSpan}
),
Sushiswap as (select 
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (AMOUNT_IN_USD)  usd_volume,

avg (AMOUNT_IN_USD)  weekly_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume,
COUNT (DISTINCT POOL_NAME)  num_pools 
from optimism.sushi.ez_swaps 
  where block_timestamp >= CURRENT_DATE - ${TimeSpan}
  ),
Velodrome as (select 
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (AMOUNT_IN_USD)  usd_volume,

avg (AMOUNT_IN_USD)  weekly_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume,

COUNT (DISTINCT POOL_NAME)  num_pools 
from optimism.velodrome.ez_swaps
where  block_timestamp >= CURRENT_DATE - ${TimeSpan}
  ),
all_ as (
  select 'Uniswap' platform , * from UniSwap 
  UNION
  select 'Sushiswap' platform , * from Sushiswap 
  UNION
  select 'Velodrome' platform , * from Velodrome
) 
select sum (num_swaps) num_swaps ,
sum (num_swappers) num_swappers,
sum (usd_volume) Total_swapped_volume
from all_ 
`,
TotalSwapsBasedOnDex:`
with UniSwap as (
 select  
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (0)  usd_volume,

avg (0)  weekly_avg_volume ,
median (0) Med_USD_volume,
max (0)  Max_USD_volume,
COUNT (DISTINCT contract_address)  num_pools
  from optimism.core.fact_event_logs 
where ORIGIN_TO_ADDRESS in ('0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45','0xe592427a0aece92de3edee1f18e0157c05861564')
and EVENT_NAME = 'Swap'
and TX_STATUS = 'SUCCESS'
  and block_timestamp >= CURRENT_DATE -${TimeSpan}
  
),
Sushiswap as (select 
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (AMOUNT_IN_USD)  usd_volume,

avg (AMOUNT_IN_USD)  weekly_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume,
COUNT (DISTINCT POOL_NAME)  num_pools 
from optimism.sushi.ez_swaps 
  where  block_timestamp >= CURRENT_DATE -${TimeSpan} 
  ),
Velodrome as (select 
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (AMOUNT_IN_USD)  usd_volume,

avg (AMOUNT_IN_USD)  weekly_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume,

COUNT (DISTINCT POOL_NAME)  num_pools 
from optimism.velodrome.ez_swaps
where  block_timestamp >= CURRENT_DATE -${TimeSpan} 
  ),
all_ as (
  select 'Uniswap' platform , * from UniSwap 
  UNION
  select 'Sushiswap' platform , * from Sushiswap 
  UNION
  select 'Velodrome' platform , * from Velodrome
) 
select * from all_ 
`,
swapsOverTime :`with UniSwap as (
 select  BLOCK_TIMESTAMP::date daily ,
COUNT (DISTINCT TX_HASH)  num_swaps,
sum (num_swaps) over (ORDER BY daily)  cum_swaps,
COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,
sum (num_swappers) over (order by daily ) cum_swappers ,
sum (0)  usd_volume,
sum (usd_volume) over (ORDER BY daily) cum_volume,
avg (0)  daily_avg_volume ,
median (0) Med_USD_volume,
max (0)  Max_USD_volume,
avg (daily_avg_volume) over (order by daily rows between 7 PRECEDING and current row) as Moving_Average_7,
COUNT (DISTINCT contract_address)  num_pools
  from optimism.core.fact_event_logs 
where ORIGIN_TO_ADDRESS in ('0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45','0xe592427a0aece92de3edee1f18e0157c05861564')
and EVENT_NAME = 'Swap'
and TX_STATUS = 'SUCCESS'
  and BLOCK_TIMESTAMP::date >= CURRENT_DATE - ${TimeSpan} 
  group by 1 
),
Sushiswap as (select 
BLOCK_TIMESTAMP::date daily   ,
COUNT (DISTINCT TX_HASH)  num_swaps,
sum (num_swaps) over (ORDER BY daily)  cum_swaps,
COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,
sum (num_swappers) over (order by daily ) cum_swappers ,
sum (AMOUNT_IN_USD)  usd_volume,
sum (usd_volume) over (ORDER BY daily) cum_volume,
avg (AMOUNT_IN_USD)  daily_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume,
avg (daily_avg_volume) over (order by daily rows between 7 PRECEDING and current row) as Moving_Average_7,
COUNT (DISTINCT POOL_NAME)  num_pools 
from optimism.sushi.ez_swaps 
  where  BLOCK_TIMESTAMP::date >= CURRENT_DATE - ${TimeSpan} 
group by 1
  ),
Velodrome as (select 
BLOCK_TIMESTAMP::date daily   ,
COUNT (DISTINCT TX_HASH)  num_swaps,
sum (num_swaps) over (ORDER BY daily)  cum_swaps,
COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,
sum (num_swappers) over (order by daily ) cum_swappers ,
sum (AMOUNT_IN_USD)  usd_volume,
sum (usd_volume) over (ORDER BY daily) cum_volume,
avg (AMOUNT_IN_USD)  daily_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume,
avg (daily_avg_volume) over (order by daily rows between 7 PRECEDING and current row) as Moving_Average_7,
COUNT (DISTINCT POOL_NAME)  num_pools 
from optimism.velodrome.ez_swaps
  where  BLOCK_TIMESTAMP::date >= CURRENT_DATE - ${TimeSpan}
group by 1
  ),
all_ as (
  select 'Uniswap' platform , * from UniSwap 
  UNION
  select 'Sushiswap' platform , * from Sushiswap 
  UNION
  select 'Velodrome' platform , * from Velodrome
) 
select * from all_ order by daily
`,
Top_10_pairs :`
with UniSwap as (
 select  
   case when lower(CONTRACT_ADDRESS) in ('0x9595edbefc82535a02312a4c42cc91e6e9df8f67', '0x85149247691df622eaf1a8bd0cafd40bc45154a9') then 'WETH/USDC'
when lower(CONTRACT_ADDRESS) = '0xbf16ef186e715668aa29cef57e2fd7f9d48adfe6' then 'DAI/USDC'
when lower(CONTRACT_ADDRESS) in( '0xfc1f3296458f9b2a27a0b91dd7681c4020e09d05', '0x68f5c0a2de713a54991e01858fd27a3832401849' ) then 'OP/WETH'
when lower(CONTRACT_ADDRESS) = '0xf1f199342687a7d78bcc16fce79fa2665ef870e1' then 'USDC/USDT'
when lower(CONTRACT_ADDRESS) = '0xc858a329bf053be78d6239c4a4343b8fbd21472b' then 'WETH/USDT'
when lower(CONTRACT_ADDRESS) = '0x03af20bdaaffb4cc0a521796a223f7d85e2aac31' then 'WETH/DAI'
when lower(CONTRACT_ADDRESS) = '0x1c3140ab59d6caf9fa7459c6f83d4b52ba881d36' then 'OP/USDC'
when lower(CONTRACT_ADDRESS) = '0x95d9d28606ee55de7667f0f176ebfc3215cfd9c0' then 'DAI/WETH'
when lower(CONTRACT_ADDRESS) in( '0x252cbdff917169775be2b552ec9f6781af95e7f6','0xb11d715bd9e3fd4fd07401dc551d516780c12449' ) then 'USDC/sUSD'
when lower(CONTRACT_ADDRESS) = lower('0x9438a9d1bDeECe02ED4431ac59613A128201e0B9') then 'sUSD/DAI'
when lower(CONTRACT_ADDRESS) = lower('0x9438a9d1bDeECe02ED4431ac59613A128201e0B9') then 'sUSD/DAI'
else lower(CONTRACT_ADDRESS) 
end  pool,
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (0)  usd_volume,

avg (0)  weekly_avg_volume ,
median (0) Med_USD_volume,
max (0)  Max_USD_volume
  from optimism.core.fact_event_logs 
where ORIGIN_TO_ADDRESS in ('0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45','0xe592427a0aece92de3edee1f18e0157c05861564')
and lower(CONTRACT_ADDRESS) not in ('0xb589969d38ce76d3d7aa319de7133bc9755fd840','0x9438a9d1bDeECe02ED4431ac59613A128201e0B9')
and EVENT_NAME = 'Swap'
and TX_STATUS = 'SUCCESS'
  and block_timestamp >= CURRENT_DATE - ${TimeSpan}
  group by 1 
),
Sushiswap as (select 
  POOL_NAME pool , 
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (AMOUNT_IN_USD)  usd_volume,

avg (AMOUNT_IN_USD)  weekly_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume
from optimism.sushi.ez_swaps 
  where block_timestamp >= CURRENT_DATE - ${TimeSpan} 
  group by 1 
  ),
Velodrome as (select 
   POOL_NAME pool , 
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (AMOUNT_IN_USD)  usd_volume,

avg (AMOUNT_IN_USD)  weekly_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume
 
from optimism.velodrome.ez_swaps
   where block_timestamp >= CURRENT_DATE - ${TimeSpan}
group by 1 
  ),
all_ as (
  select 'Uniswap' platform , * from UniSwap 
  UNION
  select 'Sushiswap' platform , * from Sushiswap 
  UNION
  select 'Velodrome' platform , * from Velodrome
) 
select pool , num_swaps , num_swappers ,usd_volume
from all_ 
where platform = ${OptimismSwapPlatFormParam}
order by num_swaps desc limit 10 
`,
Top_10_pairs_swappers :`
with UniSwap as (
 select  
   case when lower(CONTRACT_ADDRESS) in ('0x9595edbefc82535a02312a4c42cc91e6e9df8f67', '0x85149247691df622eaf1a8bd0cafd40bc45154a9') then 'WETH/USDC'
when lower(CONTRACT_ADDRESS) = '0xbf16ef186e715668aa29cef57e2fd7f9d48adfe6' then 'DAI/USDC'
when lower(CONTRACT_ADDRESS) in( '0xfc1f3296458f9b2a27a0b91dd7681c4020e09d05', '0x68f5c0a2de713a54991e01858fd27a3832401849' ) then 'OP/WETH'
when lower(CONTRACT_ADDRESS) = '0xf1f199342687a7d78bcc16fce79fa2665ef870e1' then 'USDC/USDT'
when lower(CONTRACT_ADDRESS) = '0xc858a329bf053be78d6239c4a4343b8fbd21472b' then 'WETH/USDT'
when lower(CONTRACT_ADDRESS) = '0x03af20bdaaffb4cc0a521796a223f7d85e2aac31' then 'WETH/DAI'
when lower(CONTRACT_ADDRESS) = '0x1c3140ab59d6caf9fa7459c6f83d4b52ba881d36' then 'OP/USDC'
when lower(CONTRACT_ADDRESS) = '0x95d9d28606ee55de7667f0f176ebfc3215cfd9c0' then 'DAI/WETH'
when lower(CONTRACT_ADDRESS) in( '0x252cbdff917169775be2b552ec9f6781af95e7f6','0xb11d715bd9e3fd4fd07401dc551d516780c12449' ) then 'USDC/sUSD'
when lower(CONTRACT_ADDRESS) = lower('0x9438a9d1bDeECe02ED4431ac59613A128201e0B9') then 'sUSD/DAI'
when lower(CONTRACT_ADDRESS) = lower('0x9438a9d1bDeECe02ED4431ac59613A128201e0B9') then 'sUSD/DAI'
else lower(CONTRACT_ADDRESS) 
end  pool,
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (0)  usd_volume,

avg (0)  weekly_avg_volume ,
median (0) Med_USD_volume,
max (0)  Max_USD_volume
  from optimism.core.fact_event_logs 
where ORIGIN_TO_ADDRESS in ('0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45','0xe592427a0aece92de3edee1f18e0157c05861564')
and lower(CONTRACT_ADDRESS) not in ('0xb589969d38ce76d3d7aa319de7133bc9755fd840','0x9438a9d1bDeECe02ED4431ac59613A128201e0B9')
and EVENT_NAME = 'Swap'
and TX_STATUS = 'SUCCESS'
  and block_timestamp >= CURRENT_DATE - ${TimeSpan}
  group by 1 
),
Sushiswap as (select 
  POOL_NAME pool , 
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (AMOUNT_IN_USD)  usd_volume,

avg (AMOUNT_IN_USD)  weekly_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume
from optimism.sushi.ez_swaps 
  where block_timestamp >= CURRENT_DATE - ${TimeSpan} 
  group by 1 
  ),
Velodrome as (select 
   POOL_NAME pool , 
COUNT (DISTINCT TX_HASH)  num_swaps,

COUNT (DISTINCT ORIGIN_FROM_ADDRESS)  num_swappers,

sum (AMOUNT_IN_USD)  usd_volume,

avg (AMOUNT_IN_USD)  weekly_avg_volume ,
median (AMOUNT_IN_USD) Med_USD_volume,
max (AMOUNT_IN_USD)  Max_USD_volume
 
from optimism.velodrome.ez_swaps
   where block_timestamp >= CURRENT_DATE - ${TimeSpan}
group by 1 
  ),
all_ as (
  select 'Uniswap' platform , * from UniSwap 
  UNION
  select 'Sushiswap' platform , * from Sushiswap 
  UNION
  select 'Velodrome' platform , * from Velodrome
) 
select pool , num_swaps , num_swappers ,usd_volume
from all_ 
where platform = ${OptimismSwapPlatFormParam}
order by num_swappers desc limit 10 
`
},
NFT :{
  Total:`select 
sum (PRICE_USD) sales_volume_usd,
count (DISTINCT TX_HASH ) num_sales,
count (DISTINCT SELLER_ADDRESS) num_sellers,
count (DISTINCT BUYER_ADDRESS ) num_purchasers,
count (DISTINCT nft_address) num_collections ,
round (avg(PRICE_USD)) avg_price_usd
from optimism.core.ez_nft_sales
  where BLOCK_TIMESTAMP>= CURRENT_DATE - ${TimeSpan} `,

  SalesDistributionByPrice :`
with ETH_price as (
  select date_trunc(day,HOUR ) date , 
  avg(price) ETHprice 
  from ethereum.core.fact_hourly_token_prices
  where SYMBOL = 'WETH'
  and date_trunc(day,HOUR ) >= CURRENT_DATE - ${TimeSpan}
  group by 1 
),
prices as (
  select date_trunc(day,HOUR ) date ,
  SYMBOL,
  TOKEN_ADDRESS,
  avg(price) Token_price 
  from ethereum.core.fact_hourly_token_prices
  where SYMBOL not in ( 'WETH' , 'ETH' , 'stETH' )
   and  date_trunc(day,HOUR ) >= CURRENT_DATE - ${TimeSpan} 
  group by 1,2 ,3 
),
prices_peer_eth as (
  select date , 
  SYMBOL , 
  TOKEN_ADDRESS ,
  Token_price /ETHprice price_peer_ETH 
  from prices join ETH_price using (date ) 
),
sales as (
  select BLOCK_TIMESTAMP ::date date , 
  case when CURRENCY_SYMBOL in ('WETH' , 'ETH' , 'stETH') then PRICE 
  else (PRICE*price_peer_ETH)
  end price_ETH,
  PRICE_USD , 
  TX_HASH , 
  BUYER_ADDRESS , 
  SELLER_ADDRESS 
  from ethereum.core.ez_nft_sales join prices_peer_eth on BLOCK_TIMESTAMP ::date = date and TOKEN_ADDRESS = CURRENCY_ADDRESS 
  -- where PRICE is not NULL
  WHERE price_usd is not NULL 
  and BLOCK_TIMESTAMP ::date >= CURRENT_DATE - ${TimeSpan}
)
select CASE WHEN price_usd < 1 THEN 'Less Than $1'
WHEN price_usd BETWEEN 1 and   10 THEN '$1 - $10'
WHEN price_usd BETWEEN 10 and   50 THEN '$10 - $50'
  WHEN price_usd BETWEEN 50 and   100 THEN '$50 - $100'
  WHEN price_usd BETWEEN 100 and   250 THEN '$100 - $250'
  WHEN price_usd BETWEEN 250 and   500 THEN '$250 - $500'
  WHEN price_usd BETWEEN 500 and   1000 THEN '$500 - $1K'
  WHEN price_usd BETWEEN 500 and   1000 THEN '$1K - $2K'
else  'More Than $2K' 
end  range,
count (distinct TX_HASH)  num_sales,
  count (DISTINCT BUYER_ADDRESS ) num_buyers , 
count (DISTINCT SELLER_ADDRESS ) num_sellers 
from sales
group by 1 order by num_sales desc
`,
DailyNumSales:`select BLOCK_TIMESTAMP::date date , 
count (DISTINCT TX_HASH) num_sales,
count (DISTINCT BUYER_ADDRESS) num_purchasers,
count ( DISTINCT SELLER_ADDRESS) num_sellers
from optimism.core.ez_nft_sales
  where BLOCK_TIMESTAMP::date >= CURRENT_DATE - ${TimeSpan}
  group by 1 order by date`,
DailyNumSalesbyPrice :`
with OP_price  as (
select date_trunc(day,hour) ::date  date ,
avg (price)  price 
from optimism.core.fact_hourly_token_prices
WHERE SYMBOL =  'OP'
  and date_trunc(day,hour) ::date >= CURRENT_DATE - ${TimeSpan}
group by date
),
ETH_price  as (
select date_trunc(day,hour) ::date  date,
avg (price)  price
from ethereum.core.fact_hourly_token_prices
where SYMBOL = 'WETH'
  and date_trunc(day,hour) ::date >= CURRENT_DATE - ${TimeSpan}
GROUP BY date
),
OP_PEER_ETH as (
select date,
OP.price/ETH.price  price 
from OP_price OP join ETH_price ETH using (date )
order by 1
),
sales  as (
select 
BLOCK_TIMESTAMP::date date ,
BUYER_ADDRESS,
TX_HASH,
SELLER_ADDRESS,
CASE 
  WHEN currency_symbol = 'OP' THEN (s.price*OP.price)  
  WHEN currency_symbol = 'ETH' THEN s.price 
  end Price_in_ETH
from optimism.core.ez_nft_sales s join OP_PEER_ETH OP 
  on BLOCK_TIMESTAMP::date = OP.date
  where s.price is not NULL
)
select date_trunc(day,date) daily   ,
  CASE WHEN Price_in_ETH < 0.01 THEN 'Less Than 0.01 $ETH'
WHEN Price_in_ETH BETWEEN 0.01 and   0.1 THEN '0.01 - 0.1 $ETH'
WHEN Price_in_ETH BETWEEN 0.1 and  0.5 THEN '0.1 - 0.5 $ETH'
WHEN Price_in_ETH BETWEEN 0.5 and  1 THEN '0.5 - 1 $ETH'
WHEN Price_in_ETH BETWEEN 1 and  2 THEN '1 - 2 $ETH'
WHEN Price_in_ETH BETWEEN 2 and  3 THEN '2 - 3 $ETH'
else  'More Than 3 $ETH' 
end  range,
count (distinct TX_HASH)  num_sales,
  count (DISTINCT BUYER_ADDRESS ) num_buyers , 
count (DISTINCT SELLER_ADDRESS ) num_sellers ,
sum (num_sales) over (partition by  range order by daily) cum_sales  
from sales 
group by 1,2 order by daily
`,
Top5CollectionsbyVolume :`
with nfts as (
select address,
address_name as nft_collection
from optimism.core.dim_labels

union ALL
select column1 as address,
column2 as NFT_Collection
FROM (VALUES
('0x0110bb5739a6f82eafc748418e572fc67d854a0f','Early Optimists'),
('0xfa14e1157f35e1dad95dc3f822a9d18c40e360e2','Optimism Quest'),
('0xac3b9b3f5956b52c448158c0a07ddfa9d5c53a3b','OP Delegatooors')))

select nft_collection,
sum (price_usd) as Total_USD_Volume
from optimism.core.ez_nft_sales t1 join nfts t2 on t1.nft_address = t2.address
where origin_from_address != seller_address -- Secondary
and price_usd > 0
and BLOCK_TIMESTAMP ::date >= CURRENT_DATE - ${TimeSpan}
group by 1 order by Total_USD_Volume desc limit 5
`,
DisSellersbypriceinETH :`
with ETH_price as (
  select date_trunc(day,HOUR ) date , 
  avg(price) ETHprice 
  from ethereum.core.fact_hourly_token_prices
  where SYMBOL = 'WETH'
  and date_trunc(day,HOUR )::date >= CURRENT_DATE - ${TimeSpan}
  group by 1 
),
prices as (
  select date_trunc(day,HOUR ) date ,
  SYMBOL,
  TOKEN_ADDRESS,
  avg(price) Token_price 
  from ethereum.core.fact_hourly_token_prices
  where SYMBOL not in ( 'WETH' , 'ETH' , 'stETH' )
  and date_trunc(day,HOUR )::date >= CURRENT_DATE - ${TimeSpan}
  group by 1,2 ,3 
),
prices_peer_eth as (
  select date , 
  SYMBOL , 
  TOKEN_ADDRESS ,
  Token_price /ETHprice price_peer_ETH 
  from prices join ETH_price using (date ) 
),
sales as (
  select BLOCK_TIMESTAMP ::date date , 
  case when CURRENCY_SYMBOL in ('WETH' , 'ETH' , 'stETH') then PRICE 
  else (PRICE*price_peer_ETH)
  end price_ETH,
  PRICE_USD , 
  TX_HASH , 
  BUYER_ADDRESS , 
  SELLER_ADDRESS 
  from ethereum.core.ez_nft_sales join prices_peer_eth on BLOCK_TIMESTAMP ::date = date and TOKEN_ADDRESS = CURRENCY_ADDRESS 
  -- where PRICE is not NULL
  WHERE price_usd is not NULL 
  and BLOCK_TIMESTAMP ::date >= CURRENT_DATE - ${TimeSpan}
)
select CASE WHEN price_usd < 1 THEN 'Less Than $1'
WHEN price_usd BETWEEN 1 and   10 THEN '$1 - $10'
WHEN price_usd BETWEEN 10 and   50 THEN '$10 - $50'
  WHEN price_usd BETWEEN 50 and   100 THEN '$50 - $100'
  WHEN price_usd BETWEEN 100 and   250 THEN '$100 - $250'
  WHEN price_usd BETWEEN 250 and   500 THEN '$250 - $500'
  WHEN price_usd BETWEEN 500 and   1000 THEN '$500 - $1K'
  WHEN price_usd BETWEEN 500 and   1000 THEN '$1K - $2K'
else  'More Than $2K' 
end  range, 
count (DISTINCT SELLER_ADDRESS ) num_sellers 
from sales
group by 1 order by num_sellers desc 
`
},

}
