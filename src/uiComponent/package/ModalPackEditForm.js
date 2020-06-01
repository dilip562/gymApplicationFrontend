import React from 'react';
import { Modal,Row,Col,Input, Form, Button, Divider, InputNumber } from 'antd'
import { useEffect } from 'react';
import { updatePackage } from '../../apiHandlers/packageHandler';
import { isAuthenticated } from '../../apiHandlers/authHandler';

const {trainer,token} = isAuthenticated()
const ModalPackEditForm = ({visible,setVisible,packEditData,packEditId,reload,setReload}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log(values)
        updatePackage(trainer._id,token,packEditId,values)
            .then(data=>{
                console.log(data)
                setReload(!reload)
            })
    }

    const onOk = () => {
        form.submit()
        setVisible(false)
    }
    
    const loadData = () => {
        form.setFieldsValue({
            name:packEditData.name,
            amount: packEditData.amount,
            duration: packEditData.duration
        })
    }

    useEffect(()=>{
        loadData()
    },[packEditData])

    return(
        <Modal 
             width="70vw"
            visible={visible} 
            title="Edit Package"
            onCancel={()=>setVisible(false)}
            footer={[
                <Button key="back" onClick={()=>setVisible(false)}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" loading={false} onClick={onOk}>
                    Submit
                </Button>,  
            ]}
        >
            <Form form={form} onFinish={onFinish}  name="packageForm">
                <Divider><h1>Add Package</h1></Divider>
                <Row>
                    {/* Name */}
                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="name"
                            label="Name"
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

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="amount"
                            label="Amount"
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
                            name="duration"
                            label="Duration"
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
                </Row>
            </Form>
        </Modal>
    )
}

export default ModalPackEditForm