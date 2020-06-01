import React,{useState} from 'react';
import './Dashboard.scss'
import {Row, Col} from 'antd'
import PieChart from './charts/PieChart'
import BarChart from './charts/BarChart'
import MemberDOB from './MemberDOB'
import RemPayment from './RemPayment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { signout } from '../../apiHandlers/authHandler';
import {Redirect} from 'react-router-dom'

const Dashboard = () => {
    const [redirect,setRedirect] = useState(false)
    const doSignOut = () => {
        signout()
        setRedirect(true)
    }

    return(
        <div className="dashboard">
            <div className="operationSection">
                <div className="search">
                    <h1>Dashboard</h1>
                </div>
                <div className="signout" onClick={doSignOut} >
                    {/* <Button type="primary" onClick={()=>setVisible(true)}>Add Package</Button> */}
                    <FontAwesomeIcon icon={faPowerOff} size="2x" />
                    { redirect && <Redirect path="/" /> }
                </div>
            </div>
            <div className="dataSection">
                <Row style={{height:'50%'}}>
                    <Col span={12} style={{height:'100%',padding:'20px'}}>
                        <div className="dataBox">
                            <PieChart/>
                        </div>
                    </Col>
                    <Col span={12} style={{height:'100%',padding:'20px'}}>
                        <div className="dataBox">
                            <BarChart />
                        </div>
                    </Col>
                </Row>
                <Row style={{height:'50%'}}>
                    <Col span={12} style={{height:'100%',padding:'20px'}}>
                        <div className="dataBox">
                            <MemberDOB />
                        </div>
                    </Col>
                    <Col span={12} style={{height:'100%',padding:'20px'}}>
                        <div className="dataBox">
                            <RemPayment />
                        </div>
                    </Col>
                </Row>
                
                
            </div>
        </div>
    )
}

export default Dashboard