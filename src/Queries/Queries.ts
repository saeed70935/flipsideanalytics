import { TimeSpan } from "./types";

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

`
 }
}
