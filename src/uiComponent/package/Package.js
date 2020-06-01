import React,{useState,useEffect} from 'react'
import './Package.scss'
import {Button} from 'antd'

import PackTable from './PackTable'
import PackAddForm from './PackAddForm'

const Package = () => {
    const [visible, setVisible] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(()=>{},[reload])

    return(
        <div className="package">
            <div className="operationSection">
                <div className="search">
                    <h1>Package</h1>
                </div>
                <div className="addPackage">
                    <Button type="primary" onClick={()=>setVisible(true)}>Add Package</Button>
                </div>
            </div>
            <PackAddForm visible={visible} setVisible={setVisible} reload={reload} setReload={setReload} />
            <div className="dataSection">
                {
                   <PackTable reload={reload} setReload={setReload} />
                }
            </div>
        </div>
    )
}

export default Package