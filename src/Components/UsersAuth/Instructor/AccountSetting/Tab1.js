import "./style.css"
import { Form, Formik } from "formik";
import Input from "FormComponents/Input/input"
import { Row } from "reactstrap";
import { FaPhone , FaRegEdit} from "react-icons/fa"
import { BiLogoGmail , BiSolidContact} from "react-icons/bi"
import Logo from "FormComponents/Logo"
import * as yup from "yup"
import { BlockButton, Notification, OpenButton, ToFormData, checkFormValidation } from "Actions/Helpers";
import Button from "FormComponents/Button"
import API from "Api";

const Index = ({ User , query=undefined }) => {
    const handleSumbit=(data)=>{
        BlockButton()
        API.post("/api/auth/user/updateProfile",ToFormData(data))
        .then(()=>{
            Notification("تم تعديل بيانات الحساب بنجاح",2000,"success")
            if(query){
                query.refetch()
            }
        }).catch(()=>{
            Notification("خطأ عند تعديل بيانات الحساب",2000,"error")
        }).finally(()=>{
            OpenButton()
        })
    }

    const validationSchema = yup.object().shape({
        name:yup.string().required("يرجى ادخال الاسم"),
        email:yup.string().email("برجى ادخال ايميل صحيح").required("يرجى ادخال الايميل"),
        phone: yup.string().required('يرجى إدخال رقم الهاتف').matches(/^\d{11,}$/, 'يجب إدخال رقم هاتف صحيح'),
    })

    return (
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
                    <Row>
                        <Logo
                        name={"photo"}
                        CurrentFile={formikProps.values?.photoUrl && formikProps.values?.photo ? formikProps.values?.photoUrl : undefined}
                        />
                    </Row>
                    <Row>
                        <Input
                        title={"الاسم"}
                        name={"name"}
                        placeholder={"يرجى ادخال اسمك"}
                        icon={<BiSolidContact size={16}/>}
                        />
                    </Row>
                    <Row>
                        <Input
                        title={"الايميل"}
                        name={"email"}
                        placeholder={"يرجى ادخال ايميلك"}
                        icon={<BiLogoGmail size={14}/>}
                        />
                    </Row>
                    <Row>
                        <Input
                        title={"رقم الهاتف"}
                        name={"phone"}
                        placeholder={"يرجى ادخال رقم هاتفك"}
                        type={"Phone"}
                        icon={<FaPhone size={14}/>}
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
    );
}

export default Index;
