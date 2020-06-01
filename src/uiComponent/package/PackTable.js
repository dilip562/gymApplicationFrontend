import React,{useState, useEffect} from 'react'
import { Table, Space } from 'antd'
import { getAllPackage, deletePackage, getPackage } from '../../apiHandlers/packageHandler';
import ModalPackEditForm from './ModalPackEditForm';


const PackTable = ({reload, setReload}) => {
    const [data, setData] = useState([]);
    const [packEditData, setPackEditData] = useState({}) 
    const [visible, setVisible] = useState(false);
    const [packEditId, setPackEditId] = useState('');
    
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Duration (Months)',
            dataIndex: 'duration',
            key: 'duration'
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=>editPack(record.key)}>Edit</a>
                    <a onClick={()=>deletePack(record.key)}>Delete</a>
                </Space>
            )
        }
    ]

    const editPack = (id) => {
        console.log(id)
        getPackage(id).then(data=>{
            setPackEditData({
                name: data.name,
                amount: data.amount,
                duration: data.duration
            })

            setVisible(true)
            setPackEditId(id)
        })
    }

    const deletePack = (id) => {
        console.log(id)
        deletePackage(id).then(data=>{
            setReload(!reload)
        })
    }

    const loadData = () => {
        getAllPackage().then(info=>{
            const allData = info.map(data=>(
                {
                    key: data._id,
                    name: data.name,
                    duration: data.duration,
                    amount: data.amount,
                }
            ))
            setData(allData)
        })
    }

    useEffect(()=>{
        loadData()
    },[reload])

    return(
        <>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 440 }} />
            <ModalPackEditForm visible={visible} setVisible={setVisible} packEditData={packEditData} packEditId={packEditId} reload={reload} setReload={setReload}/>
        </>
    )
}

export default PackTable