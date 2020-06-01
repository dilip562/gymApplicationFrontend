import React,{useState} from 'react'
import { Modal,Row,Col,Input, Form, Button, Divider, InputNumber, DatePicker } from 'antd'
import { createPackage } from '../../apiHandlers/packageHandler';
import { isAuthenticated } from '../../apiHandlers/authHandler';
import { useEffect } from 'react';
import { createTrainer } from '../../apiHandlers/trainerHandler';

const {trainer,token} = isAuthenticated()

const TrainerAddForm = ({visible, setVisible, reload, setReload}) => {
    const [form] = Form.useForm();
    // const [reload, setReload] = useState(false)

    const onFinish = (values) => {
       console.log(values)
       createTrainer(trainer._id, token, values).then(data=>{
           console.log(data)
           setReload(!reload)
       })
    }

    const onOk = () => {
        form.submit()
        setVisible(false)
    }

    // useEffect(()=>{},[reload])
    


    return(
        <Modal 
            width="70vw" 
            title="Trainer" 
            visible={visible} 
            // onOk={onOk} 
            onCancel={()=>setVisible(false)}
            footer={[
                <Button key="back" onClick={()=>setVisible(false)}>
                Cancel
                </Button>,
                <Button key="submit" type="primary" loading={false} onClick={onOk}>
                Submit
                </Button>
            ]}
        >
        {/* {
	"userId": "dilip562",
	"name": "dilip",
	"phone": "997009433",
	"email": "dilip@gmail.com",
	"DOB": "1998-11-13",
	"password": "Yodilip",
	"role":2
} */}
            <Form form={form} onFinish={onFinish}  name="trainerForm">
                <Divider><h1>Add Trainer</h1></Divider>
                <Row>
                    {/* Name */}
                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="userId"
                            label="User ID"
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
                            name="phone"
                            label="Phone"
                            labelCol={{span:6}}
                            labelAlign="left"
                            rules={[
                            {
                                required: true,
                            },
                            {
                                type: 'number',
                                message: "phone number should be in number"
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
                            name="email"
                            label="Email"
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
                            <DatePicker style={{width:'70%'}}/>
                        </Form.Item>
                    </Col>

                    <Col style={{padding: '0 8px'}} span={12}>
                        <Form.Item
                            name="password"
                            label="Password"
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
                </Row>
            </Form>
        </Modal>
    )
}

export default TrainerAddForm;