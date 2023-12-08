import { useFormikContext } from "formik";
import {Countries} from "./Countries.js"
import "./index.css"
import { Label } from "reactstrap";
import Select from 'react-select'
import { get } from "lodash";
import Error from "Actions/ErrorMessageValidation"

const Index = ({ icon , placeholder="يرجى اختيار الدولة" , ...props}) => {
    const { values , setFieldValue , errors } = useFormikContext()
    const Screen = window?.screen?.width
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: get(errors,"country",undefined) ? "1px solid red" : "1px solid #e6e6e6",
            borderRadius: "15px",
            outline: "none",
            padding: "0px 6px",
            fontSize: Screen<=450 ? "0.8rem" :"0.9rem",
            width: "100%",
            backgroundColor: "white",
            color: "gray",
            textAlign:"start",
            cursor:"pointer",
            ":hover":{
                border: get(errors,"country",undefined) ? "1px solid red" : "1px solid #e6e6e6",
                outline:"none"
            },
            boxShadow: "0px 0px 0px 0px gray"
        }),
        option: (provided, state) => ({
            ...provided,
            fontSize: Screen <= 350 ? "0.7rem" : "0.8rem",
            cursor: "pointer",
            textAlign: "start",
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
            color: get(errors,"country",undefined) ? "#ff7474" : "lightgray",
        }),
        };

    return (
        <div className={`SelectCountry ${get(errors, "country" ,undefined) ? "ValidationComponent" : ""}`}>
            <Label for={"CountrySelect"} style={{marginBottom:"1px",marginRight:"8px",fontSize:"0.9rem",cursor:"pointer"}}>
                الدولـــة
                <span style={{marginRight:"5px"}}>{icon}</span>
                </Label>
                <Select
                    options={Countries}
                    isSearchable={true}
                    placeholder={placeholder}
                    noOptionsMessage={() => "لا توجد دولة بهذا الاسم"}
                    isClearable={true}
                    autoFocus={true}
                    id="CountrySelect"
                    defaultValue={get(values , "country",undefined)}
                    onChange={(e)=>{
                            setFieldValue("country", e?.value)
                    }}
                    
                    styles={customStyles}
                />
                {
                    get(errors,"country",undefined) ? <Error message={get(errors,"country")}/> :<></>
                }
        </div>
    );
}

export default Index;
