import React, {useState} from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllPackage } from '../../../apiHandlers/packageHandler';
import { useEffect } from 'react';
import { getPackageCount, getPaidRemCount } from '../../../apiHandlers/membershipHandler';





const BarChart = () => {
    const [label,setLabel] = useState(["Paid", "Remaining"])
    const [chartData,setChartData] = useState([])
    const [colorData,setColorData] = useState(["#46beb6","#46beb6",])

    let data = {
        labels: ["Paid", "Remaining"],
        datasets: [
          {
            data: chartData,
            backgroundColor: ["#46beb6","#99aeb6",]
          }
        ]
    };

    const loadData = () => {
        let rowData = []
       
        getPaidRemCount().then(dataArray => {
            dataArray.map(data=>{
                if(data._id === "Paid"){
                    rowData[0] = data.total
                }
                if(data._id === "Remaining"){
                    rowData[1] = data.total
                }
            })
            setChartData(rowData)
        })
        
    }
    useEffect(()=>{
        loadData()
    },[])
    return (
      <div style={{height:'100%', padding:'20px'}}>
        <Bar data={data} height={"130%"} options={{ maintainAspectRatio: false }} />
      </div>
    
    )
}

export default BarChart