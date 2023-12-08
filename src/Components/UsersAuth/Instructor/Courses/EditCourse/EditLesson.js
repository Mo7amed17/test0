import { Form, Formik } from "formik";
import Input from "FormComponents/Input/input"
import { Row } from "reactstrap";
import { BsFillPencilFill } from "react-icons/bs"
import { FaRegEdit } from "react-icons/fa"
import * as yup from "yup"
import TextArea from "FormComponents/TextArea"
import API from 'Api';
import { BlockButton, OpenButton, ToFormData, checkFormValidation , Notification } from 'Actions/Helpers';
import Button from "FormComponents/Button"
import Logo from "FormComponents/Logo"
import { useModal } from "@ebay/nice-modal-react";
import { useEffect , useState } from "react";
import Select from "FormComponents/Select"
import { AiFillFileAdd } from "react-icons/ai"
import { get } from "lodash";
import { Case, Default, Switch } from "react-if";

const EditCourse = ({ Lessons , query=undefined  }) => {
    const modal =useModal()
    const [resetForm, setresetForm] = useState("done");
    useEffect(() => {
        setTimeout(() => {
            setresetForm("done")
        }, 10);
    }, [resetForm]);

    const handleSubmit=(data)=>{
        BlockButton()
        API.post(`/api/course-lesson/update/${data?.id}`,ToFormData(data))
        .then(()=>{
            Notification("تم تعديل الدرس بنجاح",2000,"success")
            if(query){
                query.refetch()
            }
            modal.hide()
        }).catch(()=>{
            Notification("خطأ عند تعديل الدرس",2000,"error")
        }).finally(()=>{
            OpenButton()
        })
    }

    const validationSchema = yup.object().shape({
        title:yup.string().required("يرجى ادخال الاسم"),
        description:yup.string().required("يرجى ادخال تفاصيل الدرس"),
        photo: yup.mixed().required("يرجى رفع صورة الدرس"),
    })

        const [options, setoptions] = useState([]);
        const [activeLesson, setactiveLesson] = useState({});
    useEffect(() => {
        setoptions([])
        Lessons?.map(( lesson )=>{
            setoptions(prevLesson=>[...prevLesson , { label:lesson?.title , value : lesson }])
        })
    }, []);

    return (
        <div>
            <Formik
                    validationSchema={validationSchema}
                    initialValues={activeLesson}
                    validateOnChange={false}
                    validateOnBlur={false}
                    isInitialValid={false}
                    onSubmit={(values)=>handleSubmit(values)}
                    enableReinitialize
                    >
                    {(formikProps)=>(
                    <Form className="px-2">
                        <Row className="mb-3">
                            <Select
                                Options={options}
                                noOptionsMessage="لا توجد دروس متاحة"
                                name={"choose"}
                                placeholder={"اختر الدرس المراد تعديلة"}
                                title={"اختر الدرس"}
                                icon={<AiFillFileAdd size={20}/>}
                                onChange={(opt)=>{
                                    setactiveLesson(opt)
                                    setresetForm("reseting")
                                }}
                            />
                        </Row>
                        <Switch>
                            <Case condition={resetForm==="reseting"}>
                                ...
                            </Case>
                            <Default>
                                { 
                                    Object?.keys(activeLesson)?.length ?
                                        <>
                                        <Row>
                                            <Logo
                                            name={"photo"}
                                            CurrentFile={activeLesson?.photoUrl && activeLesson?.photo ? activeLesson?.photoUrl : undefined}
                                            />
                                        </Row>
                                        <Row>
                                            <Input
                                            title={"عنوان الدرس"}
                                            name={"title"}
                                            placeholder={"يرجى ادخال عنوان الدرس"}
                                            icon={<BsFillPencilFill size={16}/>}
                                            />
                                        </Row>
                                        <Row className='mb-3 mt-1'>
                                            <TextArea
                                            title={"تفاصيل الدرس"}
                                            defaultValue={activeLesson?.description}
                                            name={"description"}
                                            placeholder={"يرجى ادخال وصف الدرس"}
                                            icon={<BsFillPencilFill size={16}/>}
                                            maxLength={2500}
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
                                            />
                                        </Row>
                                        </> : <></>
                                }
                            </Default>
                        </Switch>
                    </Form>
                    )}
                </Formik>
        </div>
    );
}

export default EditCourse;
