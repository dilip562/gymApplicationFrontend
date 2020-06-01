import React,{useEffect, useState} from 'react'
import {getAllMember} from '../member/handler/memberHandler'
import {Row,Col} from 'antd'
import avatar from '../../Assets/images/avatar.png'

const MemberDOB = () => {
    const [data,setData] = useState([])
    const dateTimeFormat = new Intl.DateTimeFormat('en',{month:'short', day:"2-digit"})

    const loadData = async() => {
        await getAllMember().then(data=>{
            data.sort((a,b)=>new Date(new Date().getFullYear(),new Date(a.DOB).getMonth(),new Date(a.DOB).getDate())-new Date(new Date().getFullYear(),new Date(b.DOB).getMonth(),new Date(b.DOB).getDate()))
            data = data.filter((info)=>(
                new Date(new Date().getFullYear(),new Date(info.DOB).getMonth(),new Date(info.DOB).getDate()) - new Date(new Date().getFullYear(), new Date().getMonth(),new Date().getDate()) >= 0
            ))
            setData(data)
        })
    }

    useEffect(()=>{
        loadData()
    },[])

    return(
        <div className="memdob">
            <Row>
                <Col span={24}><h1 style={{paddingLeft:'20px'}}>Upcoming Birthday</h1></Col>
            </Row>
            <div className="mem_data" style={{'overflow-y':"scroll",height:"215px"}}>
                {
                    data.map(info=>(

                        <Row>
                            <Col span={24}>
                                <div className="mem" style={{boxShadow:'0 0 5px 0 rgba(0,0,0,0.4)', padding:'10px 0', borderRadius:'5px', margin:"5px 10px"}}>
                                <Row> 
                                    <Col span={16}>
                                        <Row>
                                            <Col span={6}>
                                            <img src={avatar} alt="" style={{width:'40px',marginLeft:'30px', borderRadius:'50%'}}/>

                                            </Col>
                                            <Col>
                                            <h3 style={{padding:"0 0px 0 0px"}}>{info.name}</h3>
                                                
                                            </Col>
                                        </Row>
                                        
                                    </Col>
                                    <Col span={8}>
                                        <h3>{`${dateTimeFormat.formatToParts(new Date(info.DOB))[2].value} ${dateTimeFormat.formatToParts(new Date(info.DOB))[0].value}`}</h3>
                                    </Col>
                                </Row>
                                </div>
                            </Col>
                        </Row>
                    ))
                }
            </div>
            
        </div>
    )
}

export default MemberDOB