import { Label } from "reactstrap";
import "./logo.css"
import { useFormikContext } from "formik";
import { BiSolidImageAdd } from "react-icons/bi"
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Notification } from "Actions/Helpers";
import Error from "Actions/ErrorMessageValidation"
import { get } from "lodash";

const Index = ({name , CurrentFile=undefined , ...props}) => {

    const { setFieldValue , errors} = useFormikContext();
    const AllowedTypes= ["image/jpg" , "image/jpeg" , "image/png",]
    const [Path, setPath] = useState(CurrentFile);

    return (
        <div className="LogoComponent">
            <Label for={name} className={`${get(errors,name) ? "ErrorLogoValidation" : ""}`}><BiSolidImageAdd size={40} color="gray"/></Label>
            {
                get(errors,name,undefined) ? <Error message={get(errors,name)}/> :<></>
            }
            <input id={name} type="file" style={{display:"none"}} 
            onInput={(e)=>{
                if(AllowedTypes.includes(e.target?.files[0]?.type)){
                    setFieldValue(name , e.target?.files[0])
                    setPath(URL.createObjectURL(e.target?.files[0]))
                }else {
                    Notification("يرجي رفع صورة فقط", 2000 , "error")
                }
            }}
            accept={AllowedTypes}
            max={1}
            />
            {
                Path ? (
                    <>
                    <span className="LOGOIMAGE"><img src={Path} alt=""/>
                    <div  className="LOGOIMAGEX"  onClick={()=>{
                        setPath(undefined)
                        setFieldValue(name , undefined)
                    }}>حذف
                    <AiFillDelete size={16}/>
                    </div>
                    </span>
                    </>
                ) : <></>
            }
        </div>
    );
}

export default Index;
