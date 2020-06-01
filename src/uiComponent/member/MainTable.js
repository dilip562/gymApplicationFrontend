import React,{useState, useEffect} from 'react';
import { Table, Space, Modal } from 'antd';
import { isAuthenticated } from '../../apiHandlers/authHandler';
import { getAllMember, deleteMember, getMember } from './handler/memberHandler';
import ModalEditForm from './ModalEditForm';
import moment from 'moment'

const {trainer, token} = isAuthenticated()


const MainTable = ({reload, setReload=(f)=>!f}) => {
    const [data,setData] = useState([]);
    const [visible, setVisible] = useState(false)
    const [editId, setEditId] = useState('')
    const [editData, setEditData] = useState({})
    const [reload1,setReload1] = useState(false);


    const removeMember = (memberId) => {
        console.log(trainer)
        deleteMember(trainer._id, token ,memberId).then(data=>{
            setReload(true)
        })
    }
    const editMember = async(id) => {
        console.log(`${id} edit`)
        // setEditData({name:'wr'})
        await getMember(id).then(async data=>{
          console.log(data)
          await setEditData({name:data.name,Mobile: data.phone,package:data.package._id,amount:data.amountPaid,discount:data.discount,DOB:moment(data.DOB) })
        })
        await setVisible(true)
        await setEditId(id)
    }

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'DOB',
          dataIndex: 'DOB',
          key: 'dob',
        },
        {
          title: 'Package',
          key: 'package',
          dataIndex: 'package',
        },
        {
            title: 'Amount Paid',
            key: 'amountPaid',
            dataIndex: 'amountPaid',
        },
        {
            title: 'Discount',
            key: 'discount',
            dataIndex: 'discount',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text,record) => (
              <Space size="middle">
                <a onClick={()=>editMember(record.key)}>Edit</a>
                <a onClick={()=>removeMember(record.key)}>Delete</a>
              </Space>
            ),
          },
       
    ];

    const loadData = () => {
        const dateTimeFormat = new Intl.DateTimeFormat('en', {  month: 'short', day: '2-digit' })
        getAllMember().then(info=>{
          console.log(info)
            if(info.error){
              return
            }
        
            let data1= info.map(info=>{
                const date = new Date(info.DOB)
                return({
                    "key": info._id,
                    "name": info.name,
                    "phone": info.phone,
                    "DOB": `${dateTimeFormat.formatToParts(date)[2].value} ${dateTimeFormat.formatToParts(date)[0].value}` ,
                    "package": info.package.name,
                    "amountPaid": info.amountPaid,
                    "discount": info.discount,
                })
            })
            setData(data1)
        })
    }

    useEffect(()=>{
        setReload(false)
        loadData()
    },[reload,reload1])

    return(
      <>
        <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 440 }} />
        <ModalEditForm visible={visible} setVisible={setVisible} reload1={reload1} setReload1={setReload1} editId={editId}  editData={editData}/>
      </>
    )
}

export default MainTable