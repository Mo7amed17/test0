import { Case, Default, Switch } from "react-if";
import "./style.css"
import { useQuery } from 'react-query'
import LoadingPage from "Actions/LoadingPage"
import API from "Api";
import { Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import { Checkbox } from "antd";
import { BlockButton, Notification, OpenButton } from "Actions/Helpers";
import Button from "FormComponents/Button"
import { FaRegEdit } from "react-icons/fa"
import { useEffect, useState } from "react";
import Error from 'Actions/ApiStatus/Error';
import View from "./SubjectsView";

const Index = () => {

    const subjects = useQuery('student__subject', ()=>API.post("/subject/StudentSubjects"))
    const [subjectsList, setSubjectsList] = useState([]);
    let result= [] ;

    const handleSumbit=(data)=>{
        data.subjects_id = result
        if(!result?.length){
            Notification("يرجى اختيار مادة واحدة على الأقل", 1500 ,"error")
        }
        else {
            BlockButton()
            API.post("/subject/StudentSubjects/add",data)
            .then(()=>{
                Notification("تم تأكيد المواد بنجاح" , 2000 ,"success")
                subjects?.refetch()
            })
            .catch((err)=>{
                Notification( err?.response?.data?.Message , 2000 , "error" )
            })
            .finally(()=>{
                OpenButton();
            })
        }
    }

    useEffect(() => {
        setSubjectsList([])
        subjects?.data?.data?.data?.forEach((subject, index) => {
            setSubjectsList(subjectsList => [
                ...subjectsList,
                {  
                    name: subject?.name_EN ,
                    value : subject?.ID ,
                    disabled : subject?.sub_Type ,
                    hours : subject?.hours
                }
                ]);
            });
    }, [subjects?.data]);
    
    return (
        <Switch>
            <Case condition={subjects.isLoading}>
                <LoadingPage/>
            </Case>
            <Case condition={subjects.isError}>
                <Error/>
            </Case>
            <Case condition={subjects?.data?.data?.Confirmed == "true"}>
                <View data={subjectsList}/>
            </Case>
            <Default>
            <Formik
            validationSchema={null}
            initialValues={{}}
            validateOnChange={true}
            onSubmit={(values)=>handleSumbit(values)}
            validateOnBlur={false}
            isInitialValid={false}
            enableReinitialize
        >
            {(formikProps)=>(
            <Form className="p-3" style={{backgroundColor:"whitesmoke" , borderRadius:"6px"}}>
                <Row className="my-4">
                    <div className="mb-2 text-primary fs-6 fw-bold">موادي</div>
                    <div className="mb-2 text-warning fs-6 fw-bold">يمكنك فقط الاختيار من المواد الاختيارية</div>
                    {
                        subjectsList?.map((subject)=>{
                            if(!result.includes(subject?.value) && subject?.disabled){
                                result.push(subject?.value)
                            }
                            return(
                                <Col lg="4" sm="12" md="6" className="mb-3">
                                <Checkbox className="fs-6" defaultChecked={subject?.disabled} disabled={subject?.disabled} value={subject?.value} onChange={(e)=>{
                                    if(e?.target?.checked){
                                        result.push(e?.target?.value)
                                    }else {
                                        result= result.filter((value) => value !== e?.target?.value)
                                    }
                                }}>{subject?.name} (عدد الساعات {subject?.hours})</Checkbox>
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row>
                    <Button
                        text={"تأكيد المواد"}
                        type="submit"
                        icon={<FaRegEdit size={18}/>}
                        color={"#08aa08"}
                        textColor={"white"}
                        border={"1px solid #08aa08"}
                        borderRadius={"20px"}
                    />
                </Row>
            </Form>
            )}
        </Formik>
            </Default>
        </Switch>
    );
}

export default Index;
