import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart, pieArcLabelClasses  } from '@mui/x-charts/PieChart';

function Chart() {

  const [getData, setGetData] = useState([]);
  const [data, setData] = useState([]);  
  const [month, setMonth] = useState('allmonth');


  useEffect(()=>{
    const data = async() => {
        const response = await axios.get(`http://localhost:4008/api3/${month}chart`)
        // console.log(response.data)
        setGetData(response.data)
    }
    data()
  },[month])

  useEffect(()=>{
    const data = async() =>{
    const response = await axios.get(`http://localhost:4008/api3/${month}piechart`)
        console.log(response.data)
        setData(response.data)
    }
    data()
  },[month])

const Data = getData
const xLabels = [
  '0-100',
  '101-200',
  '201-300',
  '301-400',
  '401-500',
  '501-600',
  '601-700',
  '701-800',
  '801-900',
  '901-100',
  '1000- Above',
];

  return (
    <div style={{margin:'50px 0px', display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
        <div>
        <h2>Bar Chart</h2>
      <select onChange={(e)=>setMonth(e.target.value)}>
                <option value='allmonth'>All month</option>
                <option value='sept'>September 2021</option>
                <option value='oct'>Octomber 2021</option>
                <option value='nov'>November 2021</option>
                <option value='dec'>December 2021</option>
                <option value='jan'>January 2022</option>
                <option value='feb'>Febrary 2022</option>
                <option value='march'>March 2022</option>
                <option value='april'>April 2022</option>
                <option value='may'>May 2022</option>
                <option value='june'>June 2022</option>
                <option value='july'>July 2022</option>
                <option value='aug'>Augest 2022</option>
      </select>
      <BarChart
      colors={['gray']}
      width={500}
      height={300}
      series={[
        { data: Data, label: month.toUpperCase() }
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
        </div>
        <div>
          <h2>Pie Chart</h2>
          <h4>{month.toUpperCase()}</h4>
          <PieChart
          colors={['red','green','gray','blue']}
      series={[
        {
          arcLabel: (item) => ` ${item.value < 2 ? item.value + ' No' : item.value + ' Nos'} `,
          startAngle: 0,
          endAngle: 360,
          data,
        },
      ]}
      sx={{
        [`& .${pieArcLabelClasses.root}`]: {
          fill: 'white',
          fontWeight: 'bold',
        },
      }}
      height={250}
      width={550}
    />
        </div>
    </div>
  )
}

export default Chart
