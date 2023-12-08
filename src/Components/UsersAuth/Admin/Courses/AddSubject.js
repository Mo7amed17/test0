import { Form, Formik } from "formik";
import "Styles/Signup.css"
import Input from "FormComponents/Input/input"
import { Col, Row } from "reactstrap";
import { FaRegEdit } from "react-icons/fa"
import * as yup from "yup"
import { BlockButton, Notification, OpenButton, checkFormValidation } from "Actions/Helpers";
import Button from "FormComponents/Button"
import API from "Api";
import { useModal } from "@ebay/nice-modal-react";
import { TbCircleLetterA , TbCircleLetterE } from "react-icons/tb";
import { MdOutlineNumbers } from "react-icons/md";
import { ImSortNumbericDesc } from "react-icons/im";
import { Checkbox } from "antd";
import RadioButton from "FormComponents/RadioButton"
import Select from "FormComponents/Select"
import { PiStudentBold } from "react-icons/pi";

const AddSubject = ({ query=undefined }) => {
    const modal =useModal()

    const handleSumbit=(data)=>{
        data.departments = result
        if(!result?.length){
            Notification("يرجى اختيار صلاحية واحدة على الأقل", 1500 ,"error")
        }else {
            BlockButton()
            API.post("/register/instructor",data)
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
    }

    const departments=[ 
        {
            name: "IS" ,
            value: "is" ,
        },
        {
            name: "IT" ,
            value: "it" ,
        },
        {
            name: "CS" ,
            value: "cs" ,
        }
    ]
    let result=[]

    const validationSchema = yup.object().shape({
        name_EN:yup.string().required("يرجى ادخال الاسم بالانجليزية"),
        name_AR:yup.string().required("يرجى ادخال الاسم بالعربية"),
        hours:yup.number().positive().required("يرجى ادخال عدد الساعات"),
        code:yup.string().required("يرجى ادخال كود المادة") ,
        semester:yup.string().required("يرجى اختيار الفصل الدراسي"),
        sub_Type:yup.string().required("يرجى اختيار نوع المادة"),
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
                        title={"الاسم بالانجليزية"}
                        name={"name_EN"}
                        placeholder={"يرجى ادخال الاسم"}
                        icon={<TbCircleLetterE size={16}/>}
                        maxLength={20}
                    />
                </Row>
                <Row>
                    <Input
                        title={"الاسم بالعربية"}
                        name={"name_AR"}
                        placeholder={"يرجى ادخال الاسم"}
                        icon={<TbCircleLetterA size={16}/>}
                        maxLength={20}
                    />
                </Row>
                <Row>
                    <Input
                        title={"عدد الساعات"}
                        name={"hours"}
                        placeholder={"يرجى ادخال عدد الساعات"}
                        icon={<ImSortNumbericDesc size={16}/>}
                        type="phone"
                        maxLength={1}
                    />
                </Row>
                <Row>
                    <Input
                        title={"كود المادة"}
                        name={"code"}
                        placeholder={"يرجى ادخال كود المادة"}
                        icon={<MdOutlineNumbers size={16}/>}
                        maxLength={8}
                    />
                </Row>
                <Row style={{position:"relative"}}>
                    <Select
                        title={"الفصل الدراسي (Semester)"}
                        name={"semester"}
                        placeholder={"اختر الفصل الدراسي (Semester)"}
                        icon={<PiStudentBold size={20}/>}
                        Options={[
                            { label:1 , value: "1"},
                            { label:2 , value: "2"},
                            { label:3 , value: "3"},
                            { label:4 , value: "4"},
                            { label:5 , value: "5"},
                            { label:6 , value: "6"},
                            { label:7 , value: "7"},
                            { label:8 , value: "8"},
                        ]}
                        autoFocus={false}
                    />
                </Row>
                <Row>
                    <RadioButton
                    options={[
                        { label:"إجباري" , value:1 },
                        { label:"إختياري" , value:0 },
                    ]}
                    name={"sub_Type"}
                    />
                </Row>
                <Row className="my-4">
                    <di className="mb-2 text-primary fs-6 fw-bold">يرجى اختيار الأقسام التابعة لها المادة</di>
                    {
                        departments?.map((department)=>{
                            return(
                                <Col>
                                <Checkbox className="fs-6" value={department?.value} onChange={(e)=>{
                                    if(e?.target?.checked){
                                        result.push(e?.target?.value)
                                    }else {
                                        result= result.filter((value) => value !== e?.target?.value)
                                    }
                                }}>{department?.name}</Checkbox>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row>
                    <Button
                    text={"تسجيل المادة"}
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

export default AddSubject;
