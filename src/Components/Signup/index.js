import { Form, Formik } from "formik";
import "Styles/Signup.css"
import Input from "FormComponents/Input/input"
import { Row } from "reactstrap";
import { FaRegEdit} from "react-icons/fa"
import { RiLockPasswordFill } from "react-icons/ri"
import { BiLogoGmail , BiSolidContact} from "react-icons/bi"
import * as yup from "yup"
import { BlockButton, Notification, OpenButton, checkFormValidation } from "Actions/Helpers";
import Button from "FormComponents/Button"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "Api";
import { CgNotes } from "react-icons/cg";
import Select from "FormComponents/Select"
import { PiStudentBold } from "react-icons/pi";

const Index = () => {
    const Navigate =useNavigate()

    const handleSumbit=(data)=>{
        data.user_type = "2" ;
        BlockButton()
        API.post("/register/student", data)
        .then(()=>{
            Notification("تم تسجيل الحساب بنجاح",2000,"success",()=>Navigate("/login"))
        }).catch((err)=>{
            Notification(err?.response?.data?.Message,2000,"error")
        }).finally(()=>{
            OpenButton()
        })
    }

    const validationSchema = yup.object().shape({
        name:yup.string().required("يرجى اختيار الاسم"),
        email:yup.string().email("برجى ادخال ايميل صحيح").required("يرجى ادخال الايميل"),
        Nat_ID: yup.string().required('يرجى إدخال رقم الهوية').matches(/^\d{14,}$/, 'يجب إدخال رقم هوية صحيح'),
        password:yup.string().required("يرجى ادخال كلمة السر"),
        semester:yup.number().positive("يرجى اختيار الفصل الدراسي").required("يرجى اختيار الفصل الدراسي"),
        Department:yup.string().required("يرجى اختيار القسم"),
    })

    return (
    <div className="Signup">
        <div className="Right">
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
            <Form style={{margin:"50px",textAlign:"center"}}>
                <Row>
                    <Input
                    title={"الاسم"}
                    name={"name"}
                    placeholder={"يرجى ادخال اسمك"}
                    icon={<BiSolidContact size={16}/>}
                    maxLength={15}
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
                <Row style={{position:"relative"}}>
                    <Select
                        title={"القسم"}
                        name={"Department"}
                        placeholder={"اختر القسم"}
                        icon={<PiStudentBold size={20}/>}
                        Options={[
                            { label:"IS" , value: "is"},
                            { label:"IT" , value: "it"},
                            { label:"CS" , value: "cs"},
                        ]}
                        autoFocus={false}
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
                <Row>
                    <Link className="HaveAccount" to={"/login"}>هل لديك حســـاب ؟</Link>
                </Row>
                
            </Form>
            )}
        </Formik>
        </div>
    </div>
    );
}

export default Index;
