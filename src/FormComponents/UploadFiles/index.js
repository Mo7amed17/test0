import React, { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Space, Upload } from 'antd';
import Error from "Actions/ErrorMessageValidation"
import { get } from "lodash";
import { useFormikContext } from "formik";
import "./Style.css"
import FilesList from './FilesView';
import Modal from "Actions/NiceModal/AntdModal"
import { Eye } from 'react-feather';
import { Notification } from 'Actions/Helpers';

const Test = ({ setImage=undefined , customRequest=(e)=>{e?.onSuccess()} , AllowedTypes=["image/jpg", "image/jpeg", "image/png"] ,maxCount=3 , label="اضغط لرفع ملفاتك هنا",  name="Files"  ,...props }) => {
    
    const { errors  , values , setFieldValue } = useFormikContext();
    const [Counter, setCounter] = useState(0);

    return (
        <div className='FileUploader p-0 w-100' style={{position:"relative"}}>
            <Space
                direction="vertical"
                style={{
                width: '100%',
                }}
                size="large"
            >
                <Upload
                customRequest={customRequest}
                maxCount={maxCount}
                multiple={maxCount>1 ? true : false}
                accept={AllowedTypes}
                onChange={(e)=>{
                    if(AllowedTypes.includes(e?.file?.type)){
                        setFieldValue(name , e?.fileList)
                        if(maxCount===1){
                            if(setImage){
                                setImage(URL.createObjectURL(e?.file?.originFileObj))
                            }
                            setFieldValue(name , e?.file?.originFileObj)
                            values[name] = e?.file?.originFileObj
                        }
                    }else {
                        setCounter(Counter+1)
                        if(Counter%2===0){
                            Notification("صيغة الملف غير مدعومة" , 2000 , "error")
                        }
                    }
                }}
                showUploadList={false}
                >
                <Button icon={<UploadOutlined />} className={get(errors,name) ? "ErrorValidationUploadFiles" :""}>{label}</Button>
                </Upload>
            </Space>
            {
                get(errors,name,undefined) ? <Error message={get(errors,name)}/> :<></>
            }
            {values[name] && values[name]?.length && maxCount>1 ? <Modal title={<span>الملفات المرفوعة {<Eye size={20}/>} </span>} className={"ShowUploadedFiles"} Com={<FilesList files={values[name]} max={maxCount} name={name}/>} modal={true}/> : <></>}
        </div>
    );
}

export default Test;
