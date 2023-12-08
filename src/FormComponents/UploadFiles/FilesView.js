import React, { useState } from 'react'
import { Eye, File, Trash2 } from 'react-feather';
import { ListGroup, ListGroupItem } from 'reactstrap';
import "./Style.css"
import { useFormikContext } from 'formik';
const FilesList = ({ max=0 , files = [], name , ...props}) => {

    const { setFieldValue } = useFormikContext();

    return <>
    {
        files && files?.length ?
            <ListGroup>
            {
                max>0 && files?.map((item, index) => {
                const FileName = item?.name.slice(0,10);
                return <ListGroupItem className='d-flex justify-content-between' key={`${item}-${index}`}>
                    <div className='d-flex justify-content-between w-100'>
                        <span>
                        <span className='mx-1'>
                        <File size={16} />
                        </span>
                        <span className="cursor-pointer">
                            {`${FileName || 'File'}`}
                        </span>
                        </span>
                        <span>
                        <a href={URL.createObjectURL(item?.originFileObj)}target="blank">
                            <Eye size={16} cursor={"pointer"} className='mx-2 text-primary'/>
                        </a>
                            <Trash2 size={16} cursor={"pointer"}  className='text-danger'
                            onClick={(e)=>{
                                const NewFiles = files.filter((_, i) => i !== index);
                                setFieldValue( name ,NewFiles)
                            }}
                            />
                        </span>
                    </div>
                    </ListGroupItem>
                })
            }
            </ListGroup>
        :  <>لا توجد ملفات لعرضها</>
        }
        </>
    }

export default FilesList