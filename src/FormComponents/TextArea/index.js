import React from 'react';
import { Input } from 'antd';
import { Label } from "reactstrap";
import { useFormikContext } from "formik";
import Error from "Actions/ErrorMessageValidation"
import { get } from "lodash";
import "./style.css"
const Index = ({ defaultValue=undefined ,height=120 , resize="none", name="textArea", icon , placeholder="" , title , maxLength=100 ,...props }) => {
  
  const { TextArea } = Input;
  const { values , setFieldValue , errors} = useFormikContext();


  return (
    <div className={`TextAreaComponentDiv ${get(errors,name,undefined) ? "ValidationComponent" : ""}`}>
    <Label for={name} className='w-100 text-end' style={{marginBottom:"1px",marginRight:"8px",fontSize:"0.9rem",cursor:"pointer"}}>
        {title}
        <span style={{marginRight:"5px"}}>{icon}</span>
    </Label>
    <TextArea
    classNames='TextAreaComponent'
    showCount
    defaultValue={defaultValue}
    maxLength={maxLength}
    style={{
        height: height,
        resize: resize,
    }}
    onChange={(e)=>{
      setFieldValue(name , e?.target?.value)
    }}
    placeholder={placeholder}
    />
    {
      get(errors,name,undefined) ? <Error message={get(errors,name)}/> :<></>
    }
  </div>
  );
}

export default Index;
