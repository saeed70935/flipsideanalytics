import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';  
import { FlipsideQueryResult, useFlipside } from '../hoooks/useflipside';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
interface Props {
    Data : FlipsideQueryResult[] ;
    Horizontal:string;
    Vertical:string;

}
export const options = {
  plugins: {
    title: {
      display: true,
      text: 'The number of FEEs paid over time',
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};
// export const data = {
//   labels: ,
//   datasets: [
//     {
//     //   label: 'Dataset 1',
//       data: labels.map(() => faker.faker.datatype.number({ min: 0, max: 1000 })),
//       backgroundColor: 'rgb(255, 99, 132)',
//     }
//   ],
// };
interface BarchartData {
  labels : Array<string|number|boolean|null> ,
  datasets:{data:Array<string|number|boolean|null>,backgroundColor?:string,label?:string}[],
}
export default function BarChart ({Data,Horizontal,Vertical}:Props){
 const [BarchartData,setBarchartData] = useState<BarchartData>({labels:[],datasets:[],})
  useEffect(()=>{
    if(Data !=[]){
      let tempData :BarchartData = {datasets:[],labels:[]}
      Data.map((item)=>{
        if(item.name ===Horizontal){
          tempData.labels = item.value
        }
        if(item.name ===Vertical ){
            tempData.datasets.push({data:item.value,backgroundColor:'rgb(255, 99, 132)',label:item.name})
        }
      })
      console.log("wdplw",tempData)
      setBarchartData(tempData)
    }
  },[Data])
    return (
      // <div style={{width:1000,height:1000}}>
       <Bar options={options} data={BarchartData} />
      //  </div>
    )

}