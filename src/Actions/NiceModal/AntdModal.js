import React, { useState } from 'react';
import { Modal } from 'antd';
import { X } from 'react-feather';
import "./style.css"
const App = ({ destroyOnClose=false ,Com , title="", className , noClose=false , initialShow=undefined , header=undefined ,...props}) => {

    const [isModalOpen, setIsModalOpen] = useState( initialShow );
    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div className={className}>
        <div className='' onClick={showModal}>
            {title}
        </div>
        <Modal destroyOnClose={destroyOnClose} open={ initialShow ?? isModalOpen } onOk={()=>{}} onCancel={()=>{}} footer={false} closable={false} title={header}>
            {
                !noClose ? 
                <span className='CloseIconModal' onClick={()=>setIsModalOpen(false)}><X size={24}/></span> : <></>
            }
            {Com}
        </Modal>
        </div>
    );
};
export default App;