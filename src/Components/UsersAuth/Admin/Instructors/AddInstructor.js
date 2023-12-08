import { Form, Formik } from "formik";
import "Styles/Signup.css"
import Input from "FormComponents/Input/input"
import { Row } from "reactstrap";
import { FaRegEdit } from "react-icons/fa"
import { RiLockPasswordFill } from "react-icons/ri"
import { BiLogoGmail , BiSolidContact} from "react-icons/bi"
import * as yup from "yup"
import { BlockButton, Notification, OpenButton, ToFormData, checkFormValidation } from "Actions/Helpers";
import Button from "FormComponents/Button"
import API from "Api";
import { useModal } from "@ebay/nice-modal-react";
import { CgNotes } from "react-icons/cg";

const AddInstructor = ({ query=undefined }) => {
    const modal =useModal()

    const handleSumbit=(data)=>{
            BlockButton()
            API.post("/register/instructor",ToFormData(data))
            .then(()=>{
                Notification("تم إضافة مسؤول جديد بنجاح" , 2000 ,"success")
                if(query){
                    query.refetch();
                }
                modal.hide()
            })
            .catch((err)=>{
                Notification( err?.response?.data?.Message , 2000 , "error" )
            })
            .finally(()=>{
                OpenButton();
            })
    }


    const validationSchema = yup.object().shape({
        name:yup.string().required("يرجى ادخال الاسم"),
        email:yup.string().email("برجى ادخال ايميل صحيح").required("يرجى ادخال الايميل"),
        Nat_ID:yup.number().positive().required("يرجى ادخال رقم الهوية") ,
        password:yup.string().required("يرجى ادخال كلمة السر"),
    })

return (
        <Formik
            validationSchema={validationSchema}
            initialValues={{}}
            validateOnChange={true}
            onSubmit={(values)=>handleSumbit(values)}
            validateOnBlur={false}
            isInitialValid={false}
            enableReinitialize
        >
            {(formikProps)=>(
            <Form className="p-3">
                <Row>
                    <Input
                    title={"الاسم"}
                    name={"name"}
                    placeholder={"يرجى ادخال الاسم"}
                    icon={<BiSolidContact size={16}/>}
                    maxLength={15}
                    />
                </Row>
                <Row>
                    <Input
                    title={"الايميل"}
                    name={"email"}
                    placeholder={"يرجى ادخال الايميل"}
                    icon={<BiLogoGmail size={14}/>}
                    />
                </Row>
                <Row>
                    <Input
                    title={"رقم الهوية"}
                    name={"Nat_ID"}
                    placeholder={"رقم الهوية"}
                    type={"Phone"}
                    icon={<CgNotes size={14}/>}
                    />
                </Row>
                <Row style={{position:"relative"}}>
                    <Input
                    title={"كلمة السر"}
                    name={"password"}
                    placeholder={"يرجى ادخال كلمة السر"}
                    icon={<RiLockPasswordFill size={14}/>}
                    type={"password"}
                    />
                </Row>
                <Row>
                    <Button
                    text={"تسجيل الحســاب"}
                    type="submit"
                    icon={<FaRegEdit size={18}/>}
                    color={"#08aa08"}
                    textColor={"white"}
                    border={"1px solid #08aa08"}
                    borderRadius={"20px"}
                        onClick={()=>
                            checkFormValidation(formikProps)
                        }
                    />
                </Row>
            </Form>
            )}
        </Formik>
);
}

export default AddInstructor;
