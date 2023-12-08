import "./style.css"
import { Form, Formik } from "formik";
import Input from "FormComponents/Input/input"
import { Row } from "reactstrap";
import { FaRegEdit } from "react-icons/fa"
import { RiLockPasswordFill } from "react-icons/ri"
import * as yup from "yup"
import { BlockButton, Notification, OpenButton, ToFormData, checkFormValidation } from "Actions/Helpers";
import Button from "FormComponents/Button"
import API from "Api";
import { useState , useEffect } from "react";
import { Case, Default, Switch } from "react-if";

const Index = ({ User }) => {
    const [resetForm, setresetForm] = useState("done");
    useEffect(() => {
        setTimeout(() => {
            setresetForm("done")
        }, 10);
    }, [resetForm]);

    const handleSumbit=(data)=>{
        BlockButton()
        API.post("/api/auth/user/updatePassword",ToFormData(data))
        .then(()=>{
            Notification("تم تعديل كلمة السر بنجاح",2000,"success")
            setresetForm("reseting")
        }).catch(()=>{
            Notification("خطأ عند تعديل كلمة السر",2000,"error")
        }).finally(()=>{
            OpenButton()
        })
    }

    const validationSchema = yup.object().shape({
        current_password:yup.string().required("يرجى ادخال كلمة السر الحالية"),
        password:yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,"يجب أن تتكون من حروف صغيرة وكبيرة وأرقام").required("يرجى ادخال كلمة السر الجديدة"),
        password_confirmation:yup.string().oneOf([yup.ref("password")],"كلمة المرور غير متطابقة" ).required("يجب أن تكون كلمة المرور متطابقة")
    })

    return (
        <Switch>
                <Case condition={resetForm==="reseting"}>
                    ...
                </Case>
                <Default>
                <div className="EditForm">
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={User ?? {}}
                        validateOnChange={true}
                        validateOnBlur={false}
                        isInitialValid={false}
                        onSubmit={(values)=>handleSumbit(values)}
                        enableReinitialize
                    >
                        {(formikProps)=>(
                        <Form>
                            <Row style={{position:"relative"}}>
                                <Input
                                title={"كلمة السر الحالية"}
                                name={"current_password"}
                                placeholder={"يرجى ادخال كلمة السر"}
                                icon={<RiLockPasswordFill size={14}/>}
                                type={"password"}
                                />
                            </Row>
                            <Row style={{position:"relative",marginBottom:"15px"}}>
                                <Input
                                title={"كلمة السر الجديدة"}
                                name={"password"}
                                placeholder={"يرجى ادخال كلمة السر"}
                                icon={<RiLockPasswordFill size={14}/>}
                                type={"password"}
                                />
                            </Row>
                            <Row style={{position:"relative",marginBottom:"15px"}}>
                                <Input
                                title={"تأكيد كلمة السر الجديدة"}
                                name={"password_confirmation"}
                                placeholder={"يرجى إعادة تأكيد كلمة السر الجديدة"}
                                icon={<RiLockPasswordFill size={14}/>}
                                type={"password"}
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
                                onClick={(e)=>{
                                    checkFormValidation(formikProps)
                                }}
                                />
                            </Row>
                            
                        </Form>
                        )}
                    </Formik>
                    </div>
                </Default>
        </Switch>
    );
}

export default Index;
