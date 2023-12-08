import { useFormikContext } from "formik";
import "./index.css"
import { Label } from "reactstrap";
import Select from 'react-select'
import { get } from "lodash";
import Error from "Actions/ErrorMessageValidation"
import { useEffect } from "react";

const Index = (
{ noOptionsMessage="لا توجد خيارات متاحة" , 
    icon , 
    name , 
    title , 
    placeholder="" , 
    isMulti=false , 
    Options=[] , 
    autoFocus = true ,
    onChange,
    ...props
}) => {
    const { values , setFieldValue , errors } = useFormikContext()
    let Screen 
    useEffect(() => {
        Screen = window?.screen?.width
    }, [window?.screen?.width]);
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: get(errors,name,undefined) ? "1px solid red" : "1px solid #e6e6e6",
            borderRadius: "15px",
            outline: "none",
            padding: "0px 6px",
            fontSize: Screen<=450 ? "0.7rem" :"0.9rem",
            width: "100%",
            backgroundColor: "white",
            color: "gray",
            textAlign:"start",
            cursor:"pointer",
            ":hover":{
                border: get(errors,name,undefined) ? "1px solid red" : "1px solid #e6e6e6",
                outline:"none",
            },
            boxShadow: "0px 0px 0px 0px gray"
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: Screen <= 450 ? "0.6rem" : "0.8rem",
            cursor: "pointer",
            textAlign: state.isDisabled ? "center":"start",
            backgroundColor: state.isDisabled ? "transparent" : "transparent",
            color: state.isDisabled ? "gray" : state.isSelected ? "green" : "black",
            ":hover": {
            backgroundColor: state.isDisabled ? "transparent" : "lightgray",
            },
        }),
        noOptionsMessage: (provided) => ({
            ...provided,
            fontSize: Screen<=600 ? "0.9rem" : "1rem",
        }),
        placeholder: (provided) => ({
            ...provided,
            color: get(errors,name,undefined) ? "#ff7474" : "lightgray",
        }),
        };


    return (
        <div className={`Select ${get(errors, name ,undefined) ? "ValidationComponent" : ""}`}>
            <Label className="select_label" for={"Select"} style={{marginBottom:"2px",marginRight:"8px",fontSize:"0.9rem",cursor:"pointer"}}>
                {title}
                <span style={{marginRight:"5px"}}>{icon}</span>
                </Label>
                <Select
                    options={Options}
                    isSearchable={true}
                    placeholder={placeholder}
                    noOptionsMessage={() => noOptionsMessage}
                    isClearable={true}
                    autoFocus={autoFocus}
                    isMulti={isMulti}
                    id="Select"
                    defaultValue={get(values , name,undefined)}
                    onChange={(e)=>{
                        setFieldValue( name , e?.value)
                        if(typeof onChange === "function"){
                            onChange(e?.value)
                        }
                    }}
                    styles={customStyles}
                    className="custom_select"
                    classNamePrefix="mohamed"
                />
                {
                    get(errors,name,undefined) ? <Error message={get(errors,name)}/> :<></>
                }
        </div>
    );
}

export default Index;
