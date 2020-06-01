import React,{useState, useEffect} from 'react'
import { Table, Space } from 'antd'
import { isAuthenticated } from '../../apiHandlers/authHandler';
import { getAllTrainer, deleteTrainer, getTrainer } from '../../apiHandlers/trainerHandler';
import TrainerEditForm from './TrainerEditForm';
import moment from 'moment'
import ResetPassword from './ResetPassword';

const TrainerTable = ({reload, setReload}) => {
    const [data, setData] = useState([]);
    const [trainerEditData, setTrainerEditData] = useState({}) 
    const [visible, setVisible] = useState(false);
    const [visiblePass, setVisiblePass] = useState(false);
    const [trainerEditId, setTrainerEditId] = useState('');
    const [passwordEditId, setPasswordEditId] = useState('');

    const {trainer, token} = isAuthenticated()

    const columns = [
        {
            title: 'UserId',
            dataIndex: 'userId',
            key: 'userId'
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Birthday',
            dataIndex: 'DOB',
            key: 'DOB'
        },
        {
            title: 'Password',
            key: 'password',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=>resetPass(record.key)}>Reset</a>
                </Space>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=>editTrainer(record.key)}>Edit</a>
                    <a onClick={()=>removeTrainer(record.key)}>Delete</a>
                </Space>
            )
        }
    ]

    const editTrainer = (id) => {
        getTrainer(id).then(data=>{
            setTrainerEditData({
                userId: data.userId,
                name: data.name,
                phone: parseInt(data.phone),
                email: data.email,
                DOB: moment(data.DOB),
            })
        })
        setVisible(true)
        setTrainerEditId(id)
    }

    const resetPass = (id) => {
        setPasswordEditId(id)
        setVisiblePass(true)
    }

    const removeTrainer = (id) => {
        deleteTrainer(trainer._id, token, id).then(data=>{
            setReload(!reload)
        })
    }

    const loadData = () => {
        const dateTimeFormat = new Intl.DateTimeFormat('en', {  month: 'short', day: '2-digit' })
        getAllTrainer(trainer._id, token).then(dataArray=>{
            console.log(dataArray)
            const info = dataArray.map(data=>{
                const date = new Date(data.DOB)
                if(trainer._id !== data._id){
                    return{
                    key: data._id,
                    userId: data.userId,
                    name: data.name,
                    phone: data.phone,
                    email: data.email,
                    DOB: `${dateTimeFormat.formatToParts(date)[2].value} ${dateTimeFormat.formatToParts(date)[0].value}`,
                    }
                }
            })
            setData(info.filter((x)=>x))
        })
    }

    useEffect(()=>{
        loadData()
    },[reload])

    return(
        <>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 440 }} />
            <TrainerEditForm visible={visible} setVisible={setVisible} trainerEditData={trainerEditData} trainerEditId={trainerEditId} reload={reload} setReload={setReload} />
            <ResetPassword visiblePass={visiblePass} setVisiblePass={setVisiblePass} passwordEditId={passwordEditId}/>
        </>
    )
}

export default TrainerTable;