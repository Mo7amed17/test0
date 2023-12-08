import { useFormikContext } from "formik";
import { Input, Label } from "reactstrap";
import "./style.css"
import { get } from "lodash";
import Error from "Actions/ErrorMessageValidation"

const Index = ({ options= [], name , title ,...props}) => {

    const { values , setFieldValue , errors} =useFormikContext()

    return (
        <div className="RadioButton">
            {
                options?.map((option,index)=>{
                    return(
                        <span key={`key-${index}`} style={{margin:"0px 25px"}} className={get(errors , name ) ? "RadioValidation" : ""}>
                        <Label className="RadioLabel" for={option?.value} style={{margin:"-2px 2px 0px",fontSize:"0.9rem",cursor:"pointer"}}>
                            {option?.label}
                        </Label>
                        <Input
                        type="radio"
                        name={name}
                        id={option?.value}
                        onChange={(e)=>{
                            let Labels = document.querySelectorAll(".RadioLabel")
                            Labels.forEach((label)=>label.classList.remove("ActiveRadioLabel"))
                            e.target.previousElementSibling.classList.add("ActiveRadioLabel")
                            setFieldValue(name,e?.target?.value)
                        }}
                        value={option?.value}
                        />
                        </span>
                    )
                })
            }
                <div style={{marginTop:'8px'}}>
                { get(errors,name,undefined) ? <Error message={get(errors,name)}/> :<></>}
                </div>
        </div>
    );
}

export default Index;
