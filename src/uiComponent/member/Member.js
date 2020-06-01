import React,{useState} from 'react'
import "./Member.scss"
import { Button} from 'antd';
import 'antd/dist/antd.css';
import MainTable from './MainTable';
import { isAuthenticated } from '../../apiHandlers/authHandler';
import ModalAddForm from './ModalAddForm';

const {trainer, token} = isAuthenticated()

const Member = () => {
    
    const [reload,setReload] = useState(false);
    const [visible, setVisible] = useState(false);
    const [loadPack, setLoadPack] = useState([])
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
                    <MainTable reload = {reload} setReload={setReload}  setReload={setReload} loadPack={loadPack} />
                }
                
            </div>
        </div>
    )
}

export default Member