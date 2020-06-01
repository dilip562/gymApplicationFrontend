import React,{useState, useEffect} from 'react'
import { Table, Space } from 'antd'
import { getAllMembership, deleteMembership, getMembership } from '../../apiHandlers/membershipHandler';
import ModalMembershipEditForm from './ModalMembershipEditForm';
// import { getAllPackage, deletePackage, getPackage } from '../../apiHandlers/packageHandler';
// import ModalPackEditForm from './ModalPackEditForm';


const MemShipTable = ({reload, setReload}) => {
    const [data, setData] = useState([]);
    const [memShipEditData, setMemShipEditData] = useState({}) 
    const [visible, setVisible] = useState(false);
    const [memShipEditId, setMemShipEditId] = useState('');
    
    const columns = [
        {
            title: 'Member',
            dataIndex: 'member',
            key: 'member'
        },
        {
            title: 'Package',
            dataIndex: 'package',
            key: 'package'
        },
        {
            title: 'Start Date',
            dataIndex: 'start',
            key: 'start'
        },
        {
            title: 'End Date',
            dataIndex: 'end',
            key: 'end'
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount',
            key: 'totalAmount'
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount'
        },
        {
            title: 'Paid',
            dataIndex: 'paid',
            key: 'paid'
        },
        {
            title: 'Remaining',
            dataIndex: 'remainingAmount',
            key: 'remaining'
        },
        {
            title: 'Remaining Date',
            dataIndex: 'remainingDate',
            key: 'remainingDate'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={()=>{editMembership(record.key)}}>Edit</a>
                    <a onClick={()=>{removeMembership(record.key)}}>Delete</a>
                </Space>
            )
        }
    ]

    const editMembership = async(id) => {
        await getMembership(id).then(data=>{
            console.log(data)
            setMemShipEditData({
                member : data.member._id,
                package: data.package._id,
                totalAmount: data.totalAmount,
                discount: data.discount,
                paid: data.paid,
                remainingAmount: data.remainingAmount,
                remainingDate: data.remainingDate,
                status: data.status,
                start: data.start,
                end: data.end
            })
            setVisible(true);
            setMemShipEditId(id);

        })
    }

    const removeMembership = (id) => {
        deleteMembership(id).then(data=>{
            setReload(!reload)
        })
        // console.log(id)
    }

    const loadData = () => {
        const dateTimeFormat = new Intl.DateTimeFormat('en', {  month: 'short', day: '2-digit',year:'numeric' })
        getAllMembership().then(dataArray=>{
            setData(dataArray.map(data=>{
                console.log(data.remainingDate)
                const dateStart = new Date(data.start)
                const dateEnd = new Date(data.end)
                let dateRemaining =''
                if(data.remainingDate === undefined){
                    dateRemaining = 'No date'
                }else{
                    dateRemaining = new Date(data.remainingDate)
                    dateRemaining = `${dateTimeFormat.formatToParts(dateRemaining)[2].value} ${dateTimeFormat.formatToParts(dateRemaining)[0].value},${dateTimeFormat.formatToParts(dateRemaining)[4].value}`
                }
                
                return({
                    key: data._id,
                    status: data.status,
                    member: data.member.name,
                    package: data.package.name,
                    totalAmount: data.totalAmount,
                    discount: data.discount,
                    paid: data.paid,
                    remainingAmount: data.remainingAmount,
                    remainingDate: dateRemaining,
                    start: `${dateTimeFormat.formatToParts(dateStart)[2].value} ${dateTimeFormat.formatToParts(dateStart)[0].value},${dateTimeFormat.formatToParts(dateStart)[4].value}`,
                    end: `${dateTimeFormat.formatToParts(dateEnd)[2].value} ${dateTimeFormat.formatToParts(dateEnd)[0].value},${dateTimeFormat.formatToParts(dateEnd)[4].value}`,
                })
            }))
        })
    }

    useEffect(()=>{
        loadData()
    },[reload])

    return(
        <>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 440 }} />
            <ModalMembershipEditForm visible={visible} setVisible={setVisible} memShipEditData={memShipEditData} memShipEditId={memShipEditId} reload={reload} setReload={setReload}/>
            {/* <ModalPackEditForm visible={visible} setVisible={setVisible} packEditData={packEditData} packEditId={packEditId} reload={reload} setReload={setReload}/> */}
        </>
    )
}

export default MemShipTable