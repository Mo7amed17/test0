import Card from 'FormComponents/LessonCard';
import "./style.css"
import { Form, Formik } from "formik";
import Input from "FormComponents/Input/input"
import { Row } from "reactstrap";
import { BsFillPencilFill , BsPersonCheck } from "react-icons/bs"
import { MdOutlineAttachMoney , MdSchool } from "react-icons/md"
import { AiOutlineCaretLeft } from "react-icons/ai"
import * as yup from "yup"
import React , { useState } from 'react';
import TextArea from "FormComponents/TextArea"
import FileUpload from 'FormComponents/UploadFiles';
import Select from "FormComponents/Select"
import { useQuery } from 'react-query';
import API from 'Api';
import { useEffect } from 'react';
import { Case, Default, Switch } from 'react-if';
import Loading from "Actions/ApiStatus/loading";
import Error from "Actions/ApiStatus/Error";
import UploadingProgress from 'FormComponents/UploadFiles/Progress';
import { BlockButton, OpenButton, ToFormData, checkFormValidation , Notification } from 'Actions/Helpers';
import Button from "FormComponents/Button"

const FirstStep = ({ setformikProps , CourseName , current , setCurrent , CourseId , setCourseName , setCourseId , user ,...props }) => {

    const [Image, setImage] = useState("");
    const [CoursePrice, setCoursePrice] = useState(0);
    const [uploaded, setuploaded] = useState(0);
    const [showModal, setshowModal] = useState(false);
    
    const validationSchema = yup.object().shape({
        title:yup.string().required("يرجى ادخال الاسم"),
        description:yup.string().required("يرجى ادخال تفاصيل الكورس"),
        price: yup.string().required('يرجى إدخال سعر الكورس'),
        photo: yup.mixed().required("يرجى رفع صورة الكورس"),
        subject_id : yup.number().positive("يرجى اختيار التخصص").required("يرجى اختيار التخصص")
    })

    const subjects = useQuery('specialization', ()=>API.get("/api/subject/all"))
    const [subjectsList, setsubjectsList] = useState([]);

    useEffect(() => {
        subjects?.data?.data?.data?.forEach((subject) => {
            setsubjectsList(prevSubjectsList => [...prevSubjectsList,{ label: subject?.name, value: subject?.id }]);
            });
    }, [subjects?.status]);

    const handleSubmit=(values)=>{
        setshowModal(true)
        BlockButton()
        API.post("api/course/add",ToFormData(values) , {
            onUploadProgress : (data)=>{
                setuploaded(Math.round(data.progress*100))
            }
        })
        .then((res)=>{
            setCourseId(res?.data?.data?.id)
            Notification("تم إضافة الكورس بنجاح",2000,"success")
        }).catch(()=>{
            Notification("خطأ في إضافة الكورس",2000,"error")
        }).finally(()=>{
            OpenButton()
            setshowModal(false)
            setuploaded(0)
            setCurrent(current + 1)
        })
    }


    return (
        <Switch>
            <Case condition={subjects.isLoading}>
                <Loading/>
            </Case>
            <Case condition={subjects.isError}>
                <Error/>
            </Case>
            <Default>
                <div className='FirstStep'>
                <UploadingProgress message={"يرجى الإنتظار جاري رفع الفيديو . . . . "} showModal={showModal} uploaded={uploaded}/>
            <div className='Right'>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={{}}
                    validateOnChange={true}
                    validateOnBlur={true}
                    isInitialValid={false}
                    onSubmit={(values)=>handleSubmit(values)}
                    enableReinitialize
                    >
                    {(formikProps)=>(
                    <Form>
                        <Row>
                            <Input
                            title={"عنوان الكورس"}
                            name={"title"}
                            placeholder={"يرجى ادخال عنوان الكورس"}
                            icon={<BsFillPencilFill size={16}/>}
                            onInput={(e)=>setCourseName(e.target.value)}
                            />
                        </Row>
                        <Row className='mb-3 mt-1'>
                            <TextArea
                            title={"تفاصيل عن الكورس"}
                            name={"description"}
                            placeholder={"يرجى ادخال وصف الكورس"}
                            icon={<BsFillPencilFill size={16}/>}
                            maxLength={2500}
                            />
                        </Row>
                        <Row className='mb-2'>
                            <FileUpload
                            name='photo'
                            label='قم برفع صورة الكورس هنا'
                            maxCount={1}
                            setImage={setImage}
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
                            onInput={(e)=>setCoursePrice(e?.target?.value)}
                            />
                        </Row>
                        <Row>
                            <Input
                            title={"اسم المُحاضر"}
                            disabled={true}
                            placeholder={`أ/${user?.name}`}
                            icon={<BsPersonCheck size={20}/>}
                            />
                        </Row>
                        <Row>
                            <FileUpload
                                name='demo_video'
                                label="الفيديو التعريفي للكورس (إختياري)"
                                maxCount={1}
                                AllowedTypes={["video/mp4", "video/avi", "video/mov"]}
                            />
                        </Row>
                        <Row>
                            <Select
                            title={"التخصص التابع له الكورس"}
                            name={"subject_id"}
                            placeholder={"اختر التخصص"}
                            icon={<MdSchool size={20}/>}
                            noOptionsMessage="لا توجد تخصصات متاحة"
                            Options={subjectsList || []}
                            autoFocus={false}
                            />
                        </Row>
                        <Row>
                            <Button
                            text={"الخطوة التالية"}
                            type="submit"
                            icon={<AiOutlineCaretLeft size={18}/>}
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
            <div className='Left'>
                <Card 
                    Price={CoursePrice}
                    Count={"(تلقائيا)"}  
                    disabled={true} 
                    CourseImage={Image} 
                    courseName={CourseName} 
                    teacherName={user?.name} 
                    teacherImage={user?.photoUrl}
                    addToFavorite={false}
                    rating={"(تلقائيا)"}
                />
            </div>
                </div>
            </Default>
        </Switch>
    );
}

export default FirstStep;
