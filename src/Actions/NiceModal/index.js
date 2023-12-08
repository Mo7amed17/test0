import { Modal } from 'antd';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import "./style.css"
import { X } from 'react-feather';
export default NiceModal.create(({ title , Component , zIndex =999 , ...props}) => {

  const modal = useModal();
    return (
        <Modal
        className='NICE_MODAL'
        title={title}
        onOk={() => modal.hide()}
        visible={modal.visible}
        onCancel={() => {}}
        afterClose={() => modal.remove()}
        footer={null}
        width={700}
        bodyStyle={{background:"#f2f2f25e"}}
        zIndex={zIndex}
        closeIcon={false}
        >
        <span className='CloseIconModal' onClick={()=>modal.hide()}><X size={24}/></span>
        {Component}
        </Modal>
    );
});