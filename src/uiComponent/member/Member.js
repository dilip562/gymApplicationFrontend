import React,{useState} from 'react'
import "./Member.scss"
import { Button} from 'antd';
import 'antd/dist/antd.css';
import MainTable from './MainTable';
import ModalAddForm from './ModalAddForm';


const Member = () => {
    
    const [reload,setReload] = useState(false);
    const [visible, setVisible] = useState(false);
    const showUserModal = () => {
        setVisible(true);
      };
    
      

    return (
        <div className="member">
            <div className="operationSection">
                <div className="search">
                    <h1>Member</h1>
                    
                </div>
                <div className="addPerson">
                    <Button type="primary" onClick={showUserModal}>Add Member</Button>
                </div>
                <ModalAddForm reload = {reload} setReload={setReload} visible={visible} setVisible={setVisible}  />
            </div>
            <div className="dataSection">
                {
                    <MainTable reload = {reload} setReload={setReload}  setReload={setReload}/>
                }
                
            </div>
        </div>
    )
}

export default Member