import { Form, Formik } from "formik";
import Input from "FormComponents/Input/input"
import { Row } from "reactstrap";
import { BsFillPencilFill } from "react-icons/bs"
import { MdOutlineAttachMoney } from "react-icons/md"
import { FaRegEdit } from "react-icons/fa"
import * as yup from "yup"
import TextArea from "FormComponents/TextArea"
import API from 'Api';
import { useEffect } from 'react';
import { BlockButton, OpenButton, ToFormData, checkFormValidation , Notification } from 'Actions/Helpers';
import Button from "FormComponents/Button"
import Logo from "FormComponents/Logo"
import { useModal } from "@ebay/nice-modal-react";

const EditCourse = ({ Course , query=undefined  }) => {
    const modal =useModal()

    const handleSubmit=(data)=>{
        BlockButton()
        API.post(`/api/course/update/${Course?.id}`,ToFormData(data))
        .then(()=>{
            Notification("تم تعديل الكورس بنجاح",2000,"success")
            if(query){
                query.refetch()
            }
            modal.hide()
        }).catch(()=>{
            Notification("خطأ عند تعديل الكورس",2000,"error")
        }).finally(()=>{
            OpenButton()
        })
    }

    const validationSchema = yup.object().shape({
        title:yup.string().required("يرجى ادخال الاسم"),
        description:yup.string().required("يرجى ادخال تفاصيل الكورس"),
        price: yup.string().required('يرجى إدخال سعر الكورس'),
        photo: yup.mixed().required("يرجى رفع صورة الكورس"),
    })

    useEffect(() => {
        Course.price= +Course?.price
    }, []);

    return (
        <div>
            <Formik
                    validationSchema={validationSchema}
                    initialValues={Course}
                    validateOnChange={true}
                    validateOnBlur={true}
                    isInitialValid={false}
                    onSubmit={(values)=>handleSubmit(values)}
                    enableReinitialize
                    >
                    {(formikProps)=>(
                    <Form>
                        <Row>
                            <Logo
                            name={"photo"}
                            CurrentFile={formikProps.values?.photoUrl && formikProps.values?.photo ? formikProps.values?.photoUrl : undefined}
                            />
                        </Row>
                        <Row>
                            <Input
                            title={"عنوان الكورس"}
                            name={"title"}
                            placeholder={"يرجى ادخال عنوان الكورس"}
                            icon={<BsFillPencilFill size={16}/>}
                            />
                        </Row>
                        <Row className='mb-3 mt-1'>
                            <TextArea
                            title={"تفاصيل عن الكورس"}
                            defaultValue={Course?.description}
                            name={"description"}
                            placeholder={"يرجى ادخال وصف الكورس"}
                            icon={<BsFillPencilFill size={16}/>}
                            maxLength={2500}
                            />
                        </Row>
                        <Row className='mb-1'>
                            <Input
                            title={"سعر الكورس"}
                            name={"price"}
                            placeholder={"يرجى ادخال سعر الكورس"}
                            type={"Phone"}
                            valueIcon={"$"}
                            icon={<MdOutlineAttachMoney size={20}/>}
                            maxLength={5}
                            />
                        </Row>
                        <Row>
                            <Button
                            text={"حفظ التعديلات"}
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
        </div>
    );
}

export default EditCourse;
