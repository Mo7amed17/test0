import { Form, Formik } from "formik";
import { Switch , Case ,Default } from "react-if";
import "Styles/Login.css"
import Input from "FormComponents/Input/input"
import Img from "Media/Login.jpg"
import { Row } from "reactstrap";
import { RiLockPasswordFill } from "react-icons/ri"
import { BiLogoGmail } from "react-icons/bi"
import * as yup from "yup"
import { PiCheckFatFill } from "react-icons/pi"
import { BlockButton, Notification, OpenButton, ToFormData, checkFormValidation } from "Actions/Helpers";
import Button from "FormComponents/Button"
import { Link } from "react-router-dom";
import Logo from "Media/Logo.png"
import { useSignIn } from 'react-auth-kit'
import { useNavigate } from "react-router-dom";
import API from "Api";

const Index = () => {
    const signIn = useSignIn()
    const Navigate =useNavigate()
    const handleLogin=(data)=>{
        BlockButton()
        API.post("/login",ToFormData(data))
        .then((res)=>{
            if(signIn(
                {
                    token: res?.data?.data?.token,
                    expiresIn: 6000000,
                    authState: res?.data?.data?.user,
                    tokenType:res?.data?.data?.user?.user_Type
                }
            )){
                localStorage.setItem("_R_T_" , res?.data?.data?.user?.user_Type)
                Navigate("/")
                document.querySelector("footer").style.display="none"
                window.location.reload()
            }
        }).catch((e)=>{
            Notification(e?.response?.data?.Message || "خطأ في تسجيل الدخول",2000,"error")
        }).finally(()=>{
            OpenButton()
        })
    }

    const validationSchema = yup.object().shape({
        email:yup.string().email("برجى ادخال ايميل صحيح").required("يرجى ادخال الايميل"),
        password:yup.string().required("يرجى ادخال كلمة السر"),
    })

    return (
            <Switch>
                <Default>
                    <div className="Login">
                        <div className="Left">
                            <img src={Img} alt=""/>
                        </div>
                        <div className="Right">
                        <Formik
                            validationSchema={validationSchema}
                            initialValues={{}}
                            validateOnChange={true}
                            validateOnBlur={false}
                            isInitialValid={false}
                            onSubmit={(values)=> handleLogin(values) }
                            enableReinitialize
                        >
                            {(formikProps)=>(
                            <Form style={{margin:"50px",textAlign:"center"}}>
                                <Row className="Greeting">
                                    <div>
                                    <div><img alt="" src={Logo}/></div>
                                    <h6>مرحباً بعودتك</h6>
                                    </div>
                                </Row>
                                <Row>
                                    <Input
                                    title={"الايميل"}
                                    name={"email"}
                                    placeholder={"يرجى ادخال ايميلك"}
                                    icon={<BiLogoGmail size={14}/>}
                                    />
                                </Row>
                                <Row style={{position:"relative"}}>
                                    <Input
                                    title={"كلمة السر"}
                                    name={"password"}
                                    placeholder={"يرجى ادخال كلمة السر"}
                                    icon={<RiLockPasswordFill size={14}/>}
                                    type={"text"}
                                    />
                                </Row>
                                <Row>
                                    <Button
                                    text={"تسجيل الدخول"}
                                    type="submit"
                                    icon={<PiCheckFatFill size={18}/>}
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
                                    <Link className="HaveAccount" to={"/register"}>ليس لديك حساب ؟</Link>
                                </Row>
                            </Form>
                            )}
                        </Formik>
                        </div>
                    </div>
                </Default>
            </Switch>
    );
}

export default Index;
