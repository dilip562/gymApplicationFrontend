import React, { useState } from 'react'
import {Modal,Form,Row,Col,Button,Input, InputNumber,DatePicker,Select} from 'antd'
import { useEffect } from 'react'
import { getAllPackage } from '../../apiHandlers/packageHandler'
import moment from 'moment'
import { isAuthenticated } from '../../apiHandlers/authHandler'
import { updateMember } from './handler/memberHandler'
const {Option} = Select;

const {trainer,token} = isAuthenticated()
const ModalEditForm = ({visible, setVisible,editId, editData,reload1, setReload1}) => {
    const [data,setData] = useState({})
    const [form] = Form.useForm();
    const [loadPack, setLoadPack] = useState([])
    const [phError, setPhError] = useState({
        validateStatus: '',
        help: null
    })

    const onCancel = () => {
        setPhError({
            validateStatus: '',
            help: null
        })
        setVisible(false)
    }

    const onOk = (values) => {
        console.log(values)
        // setVisible(false)
        form.submit()
    }

    const loadData = () => {
       setData(editData) 
       form.setFieldsValue({
        name: editData.name,
        mobile:parseInt(editData.Mobile),
        DOB: moment(editData.DOB),
        package: editData.package,
        amount: editData.amount,
        discount: editData.discount
      });
    }

    const onFinish = (values) => {
        console.log(values)
        const payload = {
            name: values.name,
            phone: values.mobile.toString(),
            DOB: values.DOB,
            package: values.package,
            discount: values.discount,
            amountPaid: values.amount
        }
        updateMember(trainer._id,token,editId,payload)
        .then(data=>{
            if(data.error){
                console.log("dkwankdjnwakjdnkwnjd")
                // setVisible(true)
                setPhError({
                    validateStatus: 'error',
                    help: "Phone number already use"
                })   
            }else{
                setVisible(false)

                console.log(data)
                setReload1(!reload1)
            }
            
        })
        // setReload(reload)
    }
    const loadPackage = () => {
        getAllPackage().then(data=>{
          console.log(data)
          setLoadPack(data)
        })
    }
  
      useEffect(()=>{
        loadPackage()
      },[])

    useEffect(()=>{
        console.log(data)   
        loadData()
    },[editData])

    return(
        <Modal 
            width="70vw"
            visible={visible} 
            title="Edit Member"
            onCancel={onCancel}
            // onOk={onOk}
            footer={[
                <Button key="back" onClick={onCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={false} onClick={onOk}>
                    Submit
                </Button>,  
            ]}
        >
            <Form form={form} onFinish={onFinish}  name="editForm">
            <Row>
                {/* Name */}
                <Col style={{padding: '0 8px'}} span={12}>
                    <Form.Item
                        name="name"
                        label="User Name"
                        labelCol={{span:6}}
                        labelAlign="left"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input style={{
                        width: '70%',
                    }} />
                    </Form.Item>
                </Col>
                {/* Phone number */}
                <Col style={{padding: '0 8px'}} span={12}>
                <Form.Item
                    name="mobile"
                    label="Mobile"
                    labelCol={{span:6}}
                    validateStatus={phError.validateStatus ? 'error': undefined}
                    help={phError.help}
                    labelAlign="left"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your phone number!',
                    },
                    {
                      type: 'number',
                      message: "Phone number should be in number"
                    }
                    ]}
                >
                    <InputNumber
                        onChange={()=>setPhError({
                            validateStatus: '',
                            help: null
                        })}
                    style={{
                        width: '70%',
                    }}
                    />
                </Form.Item>
                </Col>
                {/* DOB */}
                <Col style={{padding: '0 8px'}} span={12}>
                    <Form.Item
                        name="DOB"
                        label="DOB"
                        labelCol={{span:6}}
                        labelAlign="left"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <DatePicker style={{
                        width: '70%',
                    }} />
                    </Form.Item>
                </Col>
                {/* Package */}
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
                          onChange={()=>{}}             ///////////
                          allowClear
                          style={{
                          width: '70%',
                          }}
                        >
                        {
                          loadPack.map((pack,index)=>(
                            <Option key={pack._id} value={pack._id}>{pack.name}</Option>
                          ))
                        }
                        </Select>
                    </Form.Item>
                </Col>
                {/* Amount */}
                <Col span={12}>
                <Form.Item
                    name="amount"
                    label="Amount"
                    labelCol={{span:6}}
                    labelAlign="left"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your amount!',
                    },
                    {
                      type: 'number',
                      message: "Phone amount should be in number"
                    }
                    ]}
                >
                    <InputNumber
                    style={{
                        width: '70%',
                    }}
                    />
                </Form.Item>
                </Col>

                {/* Discount */}
                <Col span={12}>
                <Form.Item
                    name="discount"
                    label="Discount"
                    labelCol={{span:6}}
                    labelAlign="left" 
                    rules={[
                    {
                        required: true,
                        message: 'Please input your discount!',
                    },
                    {
                      type: 'number',
                      message: "Discount amount should be in dicount"
                    }
                    ]}
                >
                    <InputNumber
                    style={{
                        width: '70%',
                    }}
                    />
                </Form.Item>
                </Col>
            </Row>
        </Form>
        </Modal>
    )
}

export default ModalEditForm