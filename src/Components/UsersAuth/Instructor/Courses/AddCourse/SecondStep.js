import { Form, Formik } from "formik";
import "Styles/Login.css"
import Input from "FormComponents/Input/input"
import { Row } from "reactstrap";
import * as yup from "yup"
import { MdCloudUpload } from "react-icons/md"
import { BlockButton, Notification, OpenButton, ToFormData } from "Actions/Helpers";
import Button from "FormComponents/Button"
import { FaHeading } from "react-icons/fa"
import { CgNotes } from "react-icons/cg"
import FileUpload from 'FormComponents/UploadFiles';
import TextArea from "FormComponents/TextArea"
import LessonListView from "./LessonListView";
import { useState , useEffect } from "react";
import { Case, Default, Switch } from "react-if";
import API from "Api";
import UploadingProgress from "FormComponents/UploadFiles/Progress";

const SecondStep = ({ query=undefined ,CourseId , CourseName , twoSide=true , user ,...props}) => {

    const [LessonsList, setLessonsList] = useState([]);
    const [resetForm, setresetForm] = useState("done");
    const [uploaded, setuploaded] = useState(0);
    const [showModal, setshowModal] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setresetForm("done")
        }, 10);
    }, [resetForm]);

    const validationSchema = yup.object().shape({
        title:yup.string().required("يرجى ادخال عنوان الدرس"),
        photo: yup.mixed().required("يرجى رفع صورة الدرس"),
        description:yup.string().required("يرجى ادخال تفاصيل الدرس"),
        video: yup.mixed().required("يرجى رفع فيديو الدرس"),
    })

        window.onbeforeunload = function() {
            return "ستفقد بياناتك الحاليه!";
        }

        const handleSubmit=(values)=>{
            setshowModal(true)
            values.course_id = CourseId
            BlockButton()
            API.post("api/course-lesson/add" , ToFormData(values) , {
                onUploadProgress : (data)=>{
                    setuploaded(Math.round(data.progress*100))
                }
            })
            .then(()=>{
                Notification("تم إضافة الدرس بنجاح" , 2000 ,"success")
                setLessonsList(LessonsList=>[...LessonsList , values])
                setresetForm("reseting")
                if(query){
                    query.refetch()
                }
            })
            .catch(()=>{
                Notification("خطأ في إضافة الدرس حاول ثانية" , 2000 ,"error")
            })
            .finally(()=>{
                setshowModal(false)
                OpenButton()
                setuploaded(0)
            })
        }
        
        return (
        <div className="SecondStep">
        <UploadingProgress message={"يرجى الإنتظار جاري رفع الفيديو . . . . "} showModal={showModal} uploaded={uploaded}/>
            <Switch>
                <Case condition={resetForm==="reseting"}>
                    ...
                </Case>
                <Default>
                    <div className={ twoSide ? "Right" : "w-100"}>
                    <Formik
                        validationSchema={validationSchema}
                        initialValues={{}}
                        validateOnChange={true}
                        validateOnBlur={false}
                        isInitialValid={false}
                        onSubmit={(values) => {
                            handleSubmit(values)
                        }}
                        enableReinitialize
                    >
                        {(formikProps)=>(
                        <Form>
                            <Row className="mb-3">
                                <Input
                                title={"عنوان الدرس"}
                                name={"title"}
                                placeholder={"يرجى ادخال عنوان الدرس"}
                                icon={<FaHeading size={16}/>}
                                />
                            </Row>
                            <Row className="mb-3">
                                <FileUpload
                                name='photo'
                                label='قم برفع صورة الدرس هنا'
                                maxCount={1}
                                />
                            </Row>
                            <Row className="mb-3">
                                <TextArea
                                    title={"تفاصيل الدرس"}
                                    name={"description"}
                                    placeholder={"يرجى ادخال تفاصيل الدرس"}
                                    icon={<CgNotes size={16}/>}
                                    maxLength={2500}
                                    height={200}
                                />
                            </Row>
                            <Row>
                                <FileUpload
                                name='video'
                                label='قم برفع فيديو الدرس هنا'
                                maxCount={1}
                                AllowedTypes={["video/mp4", "video/avi", "video/mov"]}
                                />
                            </Row>
                            <Row>
                                <Button
                                    text={"رفع الدرس"}
                                    type="submit"
                                    icon={<MdCloudUpload size={18}/>}
                                    color={"#08aa08"}
                                    textColor={"white"}
                                    border={"1px solid #08aa08"}
                                    borderRadius={"20px"}
                                />
                            </Row>
                        </Form>
                        )}
                    </Formik>
                    </div>
                </Default>
            </Switch>
            {
                twoSide ? 
                <div className='Left'>
                <LessonListView lessons={LessonsList} user={user} CourseName={CourseName}/>
                </div> : <></>
            }
        </div>
    );
}

export default SecondStep;
