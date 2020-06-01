import React,{useState,useEffect} from 'react'
import './Membership.scss'
import {Button} from 'antd'
import MembershipAddForm from './MembershipAddForm'

import MemShipTable from './MemShipTable'
// import PackAddForm from './PackAddForm'

const Membership = () => {
    const [visible, setVisible] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(()=>{},[reload])

    return(
        <div className="membership">
            <div className="operationSection">
                <div className="search">
                    <h1>Membership</h1>
                </div>
                <div className="addMembership">
                    <Button type="primary" onClick={()=>setVisible(true)}>Add Membership</Button>
                </div>
            </div>
            <MembershipAddForm visible={visible} setVisible={setVisible} reload={reload} setReload={setReload} />
            {/* <PackAddForm visible={visible} setVisible={setVisible} reload={reload} setReload={setReload} /> */}
            <div className="dataSection">
                   <MemShipTable reload={reload} setReload={setReload} />
            </div>
        </div>
    )
}

export default Membership