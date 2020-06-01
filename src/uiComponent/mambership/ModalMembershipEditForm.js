import React,{useState, useEffect} from 'react';
import { Modal,Row,Col,Input, Form, Button, Divider, InputNumber,Select,DatePicker } from 'antd'
import { getAllMember, getMember } from '../member/handler/memberHandler';
import { getAllPackage } from '../../apiHandlers/packageHandler';
import moment from 'moment'
import { updateMempack } from '../../apiHandlers/membershipHandler';

const ModalMembershipEditForm = ({visible, setVisible, memShipEditId, memShipEditData, reload, setReload}) => {
    const [form] = Form.useForm();
    const {Option} = Select
    const {RangePicker} = DatePicker;

    const [members,setMembers] = useState([])
    const [packages,setPackages] = useState([])
    // const [membershipData,setMembershipData] = useState([])

    const onOk = () => {
        form.submit()
        setVisible(false)
    }

    const onFinish = (values) => {
        console.log(values)
        const payload = {
            member : values.member,
            package: values.package,
            totalAmount: values.totalAmount,
            discount: values.discount,
            paid: values.paid,
            remainingAmount: values.remainingAmount,
            remainingDate: values.remainingDate,
            status: values.status,
            start: values.duration[0],
            end: values.duration[1]
        }
        console.log(payload)
        console.log(memShipEditId)
        updateMempack(memShipEditId, payload).then(data=>{
            console.log(data)
            setReload(!reload)
        })
    }

    const preLoadData = async() => {
        // await console.log('kenfknekfneknfkenfknek')
        form.setFieldsValue({
            member : memShipEditData.member,
            package: memShipEditData.package,
            totalAmount: memShipEditData.totalAmount,
            discount: memShipEditData.discount,
            paid: memShipEditData.paid,
            remainingAmount: memShipEditData.remainingAmount,
            remainingDate: moment(memShipEditData.remainingDate),
            status: memShipEditData.status,
            duration: [moment(memShipEditData.start),moment(memShipEditData.end)]
            // start: moment(memShipEditData.start),
            // end: moment(memShipEditData.end)
        })
        // console.log(memShipEditData)
        getAllMember().then(data=>setMembers(data))
        getAllPackage().then(data=>setPackages(data))
        
    }

    useEffect(()=>{
        preLoadData()
    },[memShipEditData])

    return(
        <Modal 
            width="70vw"
            visible={visible}
            title="Edit Membership"
            onCancel={()=>setVisible(false)}
            footer={[
                <Button key="back" onClick={()=>setVisible(false)}>
                    Cancle
                </Button>,
                <Button key="submit" type="primary" loading={false} onClick={onOk}>
                    Submit
                </Button> 
            ]}
        >
            <Form form={form} onFinish={onFinish}  name="membershipForm">
                <Divider><h1>Add Membership</h1></Divider>
                <Row>
                    {/* Name */}
                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="member"
                            label="Member"
                            labelCol={{span:6}}
                            labelAlign="left"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                           <Select
                                placeholder="Select Member"
                                style={{width:'70%'}}
                           >
                                {
                                    members.map((mem,index)=>(
                                        <Option key={mem._id}>{mem.name}</Option>
                                    ))
                                }
                                {/* <Option key="1">ABC</Option> */}
                           </Select>
                        </Form.Item>
                    </Col>

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="package"
                            label="Package"
                            labelCol={{span:6}}
                            labelAlign="left"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                           <Select
                                placeholder="Select Package"
                                style={{width:'70%'}}
                           >
                                {
                                    packages.map((pak,index)=>(
                                        <Option key={pak._id}>{pak.name}</Option>
                                    ))
                                }
                                {/* <Option key="1">ABC</Option> */}
                           </Select>
                        </Form.Item>
                    </Col>

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="totalAmount"
                            label="Total amount"
                            labelCol={{span:6}}
                            labelAlign="left"
                            rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'number',
                                message: "Amount should be in number"
                            }
                            ]}
                        >
                            <InputNumber style={{
                                width: '70%',
                            }} />
                        </Form.Item>
                    </Col>

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="discount"
                            label="Discount"
                            labelCol={{span:6}}
                            labelAlign="left"
                            rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'number',
                                message: "Discount should be in number"
                            }
                            ]}
                        >
                            <InputNumber style={{
                                width: '70%',
                            }} />
                        </Form.Item>
                    </Col>

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="paid"
                            label="Paid"
                            labelCol={{span:6}}
                            labelAlign="left"
                            rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'number',
                                message: "Paid amount should be in number"
                            }
                            ]}
                        >
                            <InputNumber style={{
                                width: '70%',
                            }} />
                        </Form.Item>
                    </Col>

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="remainingAmount"
                            label="Remaining amount"
                            labelCol={{span:8}}
                            labelAlign="left"
                            rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'number',
                                message: "Remaining amount should be in number"
                            }
                            ]}
                        >
                            <InputNumber style={{
                                width: '66%',
                            }} />
                        </Form.Item>
                    </Col>

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="remainingDate"
                            label="Remaining Date"
                            labelCol={{span:8}}
                            labelAlign="left"
                        >
                            <DatePicker style={{
                                width: '66%',
                            }} />
                        </Form.Item>
                    </Col>

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="status"
                            label="Status"
                            labelCol={{span:6}}
                            labelAlign="left"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                           <Select
                                placeholder="Select Status"
                                style={{width:'70%'}}
                           >
                                <Option key="Paid">Paid</Option>
                                <Option key="Remaining">Remaining</Option>
                           </Select>
                        </Form.Item>
                    </Col>

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="duration"
                            label="Duration"
                            labelCol={{span:6}}
                            labelAlign="left"
                            rules={[
                            {
                                required: true,
                            },
                            ]}
                        >
                            <RangePicker />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalMembershipEditForm;