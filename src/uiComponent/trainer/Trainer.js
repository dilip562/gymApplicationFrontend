import React,{useState,useEffect} from 'react'
import './Trainer.scss'
import {Button} from 'antd'
import TrainerTable from './TrainerTable'
import TrainerAddForm from './TrainerAddForm'

// import PackTable from './PackTable'
// import PackAddForm from './PackAddForm'

const Package = () => {
    const [visible, setVisible] = useState(false)
    const [reload, setReload] = useState(false)

    useEffect(()=>{},[reload])

    return(
        <div className="trainer">
            <div className="operationSection">
                <div className="search">
                    <h1>Trainer</h1>
                </div>
                <div className="addTrainer">
                    <Button type="primary" onClick={()=>setVisible(true)}>Add Trainer</Button>
                </div>
            </div>
            <TrainerAddForm visible={visible} setVisible={setVisible} reload={reload} setReload={setReload}/>
            {/* <PackAddForm visible={visible} setVisible={setVisible} reload={reload} setReload={setReload} /> */}
            <div className="dataSection">
                <TrainerTable reload={reload} setReload={setReload} />
            </div>
        </div>
    )
}

export default Package