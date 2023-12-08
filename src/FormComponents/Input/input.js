import "FormComponents/Input/input.css"
import { useFormikContext } from "formik";
import { get } from "lodash";
import { Label } from "reactstrap";
import Error from "Actions/ErrorMessageValidation"
import { IoMdEye } from "react-icons/io";
import { useState } from "react";

const Index = ({ maxLength=35 ,minLength=1 , onInput=()=>{} , icon , type = "text", valueIcon=undefined , title , placeholder , name  , disabled=false , className="" , ...props}) => {

        const { values , setFieldValue , errors} = useFormikContext();
        const handleChange=(e)=>{
            if (type === "Phone") {
                const pattern = /^\d{14}$/;
                const isValid = pattern.test(e?.value);
                if (!isValid) {
                    e.value = e?.value.replace(/[^\d]/g, "").slice(0, 14);
                }
                }
        }
        const [ShowPass, setShowPass] = useState(true);

        return (
        <div className={`InputComponentDiv ${get(errors,name,undefined) ? "ValidationComponent" : ""}`}>
            <Label for={name} style={{marginBottom:"1px",marginRight:"8px",fontSize:"0.9rem",cursor:"pointer"}}>
                {title}
                <span style={{marginRight:"5px"}}>{icon}</span>
            </Label>
            <input
            type={type==="password" ? (ShowPass ? "password" : "text"): type}
            placeholder={placeholder}
            disabled={disabled}
            name={name}
            id={name}
            className={`${className} InputComponent`}
            value={get(values, name , undefined)}
            onChange={(e)=>{
                handleChange(e?.target)
                if(e?.target?.value?.length){
                    setFieldValue(name ,e?.target?.value)
                } else setFieldValue(name , undefined)
            }}
            onInput={onInput}
            minLength={minLength}
            maxLength={maxLength}
            />
            {
                get(errors,name,undefined) ? <Error message={get(errors,name)}/> :<></>
            }
            {
                valueIcon ? 
                (
                    <span className="ShowPass" style={{color:"black"}}>{valueIcon}</span>
                ):(<></>)
            }
            {
                type === "password" ? 
                (
                    <span className="ShowPass" onClick={(e)=>{
                        if(ShowPass){
                            e.target.style.color="black"
                        }else {
                            e.target.style.color="gray"
                        }
                        setShowPass(!ShowPass)
                    }}><IoMdEye size={14}/></span>
                ):(<></>)
            }
        </div>
    );
}

export default Index;
