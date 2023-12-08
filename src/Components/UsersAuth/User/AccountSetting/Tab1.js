import "./style.css"
import { Form, Formik } from "formik";
import Input from "FormComponents/Input/input"
import { Row } from "reactstrap";
import { FaRegEdit} from "react-icons/fa"
import { BiLogoGmail , BiSolidContact} from "react-icons/bi"
import { CgNotes } from "react-icons/cg"
import * as yup from "yup"
import { BlockButton, Notification, OpenButton, ToFormData, checkFormValidation } from "Actions/Helpers";
import Button from "FormComponents/Button"
import API from "Api";

const Index = ({ User , query=undefined }) => {
    const handleSumbit=(data)=>{
        BlockButton()
        API.put("/users/profile",ToFormData(data))
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
    const initialValues = {
        Name : User?.Name ,
        Email : User?.Email ,
        Nat_ID : User?.Nat_ID
    }

    const validationSchema = yup.object().shape({
        Name:yup.string().required("يرجى ادخال الاسم"),
        Email:yup.string().email("برجى ادخال ايميل صحيح").required("يرجى ادخال الايميل"),
        Nat_ID: yup.string().required('يرجى إدخال رقم الهوية'),
    })

    return (
            <div className="EditForm">
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues ?? {}}
                validateOnChange={true}
                validateOnBlur={false}
                isInitialValid={false}
                onSubmit={(values)=>handleSumbit(values)}
                enableReinitialize
            >
                {(formikProps)=>(
                <Form>
                    <Row>
                        <Input
                        title={"الاسم"}
                        name={"Name"}
                        placeholder={"يرجى ادخال اسمك"}
                        icon={<BiSolidContact size={16}/>}
                        />
                    </Row>
                    <Row>
                        <Input
                        title={"الايميل"}
                        name={"Email"}
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
