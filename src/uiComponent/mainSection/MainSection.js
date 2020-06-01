import React from 'react';
import { useParams } from 'react-router-dom';
import Member from '../member/Member';
import { useEffect } from 'react';
import Package from '../package/Package';
import Membership from '../mambership/Mambership';
import Trainer from '../trainer/Trainer';
import Dashboard from '../dashboard/Dashboard'

const MainSection = ({setActiveLink}) => {
    let {id} = useParams()
    useEffect(()=>{
        setActiveLink(id)
    },[id])
    return(
        <div className="main-section">
            { id === "dashboard" && <Dashboard />}
            { id === "member" &&  <Member />}
            { id === "package" &&  <Package />}
            { id === "trainer" &&  <Trainer/>}
            { id === "membership" &&  <Membership />}
        </div>
    )
}

export default MainSection