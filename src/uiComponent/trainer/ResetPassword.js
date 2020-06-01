import React from 'react'
import { Modal,Row,Col,Input, Form, Button, Divider, InputNumber } from 'antd'
import { isAuthenticated } from '../../apiHandlers/authHandler';
import { updatePassword } from '../../apiHandlers/trainerHandler';

const {trainer,token} = isAuthenticated()

const ResetPassword = ({visiblePass, setVisiblePass, passwordEditId, reload, setReload}) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
       console.log(values)
       updatePassword(trainer._id, token, passwordEditId,values).then(data=>{
        form.resetFields()
       })
       
    }

    const onOk = () => {
        form.submit()
        setVisiblePass(false)
    }

    return(
        <Modal 
            title="Reset Password" 
            visible={visiblePass} 
            onCancel={()=>setVisiblePass(false)}
            footer={[
                <Button key="back" onClick={()=>setVisiblePass(false)}>
                Cancel
                </Button>,
                <Button key="submit" type="primary" loading={false} onClick={onOk}>
                Submit
                </Button>
            ]}
        >
            <Form form={form} onFinish={onFinish}  name="passwordForm">
                <Divider><h1>Reset Password</h1></Divider>
                <Row>
                    <Col style={{padding: '0 8px'}} span={24}>
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

export default ResetPassword;