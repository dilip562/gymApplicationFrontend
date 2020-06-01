import React, {useState} from 'react';
import { Pie } from 'react-chartjs-2';
import { getAllPackage } from '../../../apiHandlers/packageHandler';
import { useEffect } from 'react';
import { getPackageCount } from '../../../apiHandlers/membershipHandler';





const PieChart = () => {
    const [label,setLabel] = useState([])
    const [chartData,setChartData] = useState([])
    const [colorData,setColorData] = useState(["#46beb6","#46beb6","#46beb6","#46beb6"])

    let data = {
        labels: label,
        // colors: ["#46beb6","#46beb6","#46beb6","#46beb6"],
        datasets: [
          {
            data: chartData,
            backgroundColor: colorData
          }
        ]
    };
    function get_random_color() {
        var color = "";
        for (var i = 0; i < 3; i++) {
          var sub = Math.floor(Math.random() * 256).toString(16);
          color += (sub.length == 1 ? "0" + sub : sub);
        }
        return "#" + color;
      }

      const loadData = () => {
        let addData = []
        let rowData = []
        let colorArray = []
        let cnt = 0
        getPackageCount().then(dataArray=>rowData=dataArray)
        getAllPackage().then(dataArray=>{
            setLabel(dataArray.map(data=>{
                rowData.forEach((row,index)=>{
                    if(row._id === data._id){
                        addData.push(row.total)
                        cnt =1
                    }
                })

                if(cnt !== 1 ){
                    addData.push(0) 
                    
                }
                cnt = 0
                colorArray.push(get_random_color())
                return data.name
            }))
            setColorData(colorArray)
            setChartData(addData)
        })
        
    }
    useEffect(()=>{
        loadData()
    },[])
    return (
      <div style={{height:'100%', padding:"20px"}}>
        <Pie data={data} height={"130%"} options={{ maintainAspectRatio: false }} />
      </div>
    
    )
}

export default PieChart