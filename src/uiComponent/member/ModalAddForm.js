import React,{useEffect,useState, useRef} from 'react'
import { Form, Input, InputNumber, Modal, DatePicker,Divider } from 'antd';
import { Button,Row,Col,Select } from 'antd';
import { createMember } from './handler/memberHandler';
import { isAuthenticated } from '../../apiHandlers/authHandler';
import { getAllPackage } from '../../apiHandlers/packageHandler';
const {trainer, token} = isAuthenticated()

const { Option } = Select;


const ModalAddForm = ({ reload,visible,setVisible,setReload,editData={}, isEditForm}) => {
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
        setVisible(false);
    };

    const useResetFormOnCloseModal = ({ form, visible }) => {
      const prevVisibleRef = useRef();
      useEffect(() => {
        prevVisibleRef.current = visible;
      }, [visible]);
      const prevVisible = prevVisibleRef.current;
      useEffect(() => {
        if (!visible && prevVisible) {
          form.resetFields();
        }
      }, [visible]);
    };

    useResetFormOnCloseModal({
      form,
      visible,
    });
  
    const loadPackage = () => {
        getAllPackage().then(data=>{
          console.log(data)
          setLoadPack(data)
        })
      }
  
      useEffect(()=>{
        loadPackage()
      },[reload])

    const onOk = () => {
      form.submit();
    };

    const onFinish = values => {
      const data = {
        ...values,
        amountPaid: values.amount,
        DOB: values.DOB.format()
      }
      createMember(trainer._id, token, data)
      .then(data=>{
        if(data.error){
            setPhError({
                validateStatus: 'error',
                help: "Phone number already use"
            })          // Do something to error
        }else{
          setVisible(false);
          setReload(true)
        }

      })
    };
  
    return (

      <Modal 
        width="70vw" 
        title="Member" 
        visible={visible} 
        // onOk={onOk} 
        onCancel={onCancel}
        footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" loading={false} onClick={onOk}>
          Submit
        </Button>,
        ]}
        >
          <Divider><h1>Add Member</h1></Divider>
        <Form form={form} onFinish={onFinish}  name="userForm">
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
                <Col span={12}>
                <Form.Item
                    name="phone"
                    label="Phone Number"
                    labelCol={{span:6}}
                    validateStatus={phError.validateStatus}
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
    );
  };

  export default ModalAddForm