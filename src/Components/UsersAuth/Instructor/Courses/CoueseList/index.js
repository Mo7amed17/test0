import React from 'react';
import { useQuery } from 'react-query';
import API from 'Api';
import "./style.css"
import { Case, Default, Switch } from 'react-if';
import Loading from 'Actions/ApiStatus/loading';
import Error from 'Actions/ApiStatus/Error';
import { useState , useEffect } from 'react';
import NoImage from "Media/Logo.png"
import TableView from "FormComponents/Table"
import { MdRemoveRedEye } from "react-icons/md"
import { AiFillFileAdd } from "react-icons/ai"
import { FcSupport } from "react-icons/fc"
import Modal from 'Actions/NiceModal/AntdModal';
import LessonListView from '../AddCourse/LessonListView';
import AddLesson from "../AddCourse/SecondStep"
import { Badge } from 'reactstrap';
import Edit from "../EditCourse"
import NiceModal from '@ebay/nice-modal-react';
import Modal2 from 'Actions/NiceModal';

const Index = () => {

    const myCourses = useQuery('my-courses', ()=>API.get("/api/instructor-courses"),{
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: Infinity,
    })
    const [myCoursesList, setmyCoursesList] = useState([]);

    useEffect(() => {
        setmyCoursesList([])
        myCourses?.data?.data?.data?.forEach((course, index) => {
            setmyCoursesList(myCoursesList => [
                ...myCoursesList,
                {
                    photo: <img style={{width:"40px",height:"40px",borderRadius:"10px"}} src={course?.photoUrl} alt="" onError={(e)=>e.target.src = NoImage}/> ,
                    name: course?.title ,
                    price: `${+course?.price} ج.م` ,
                    count: course?.lessons?.length , 
                    view : course?.lessons && course?.lessons?.length ? <Modal title={<span className='text-primary' style={{cursor:"pointer"}}>عرض <MdRemoveRedEye size={20}/></span>} Com={<LessonListView withHeader={false} lessons={course?.lessons}/>}/> : "لا توجد دروس",
                    add : <Modal title={<span className='text-success fw-bold' style={{cursor:"pointer"}}>إضافة <AiFillFileAdd size={20}/></span>} Com={<AddLesson twoSide={false} CourseName={course?.title} CourseId={course?.id} query={myCourses} />}/> ,
                    status : course?.status==="approved" ? <Badge style={{fontSize:"0.9rem"}} color="success">نشط</Badge> : <Badge color='warning' style={{fontSize:"0.9rem"}}>في انتظار الموافقة</Badge> ,
                    edit : <span className='text-secondary fw-bold' style={{cursor:"pointer",fontSize:"0.95rem"}}
                    onClick={(e)=>{
                        NiceModal.show(Modal2,{
                        name:"M17",
                        Component:<Edit Course={course} query={myCourses} />,
                    })
                    }}
                    >تعديل <FcSupport size={22}/></span>,
                }
                ]);
            });
    }, [myCourses?.data]);



    return (
        <Switch>
            <Case condition={myCourses.isLoading}>
                <Loading/>
            </Case>
            <Case condition={myCourses.isError}>
                <Error/>
            </Case>
            <Default>
                <div className="AdminInstructors">
                    <TableView 
                        titleColor="primary" 
                        title={"قائمة كورساتي"} 
                        data={myCoursesList || []} 
                        headers={
                            [{title:"الصورة",width:"100px"},
                                {title:"عنوان الكورس",width:"350px"},
                                {title:"سعر الكورس" ,width:"150px"},
                                {title:"عدد الدروس",width:"150px"},
                                {title:"دروس الكورس",width:"150px"},
                                {title:"إضافة درس",width:"150px"},
                                {title:"حالة الكورس",width:"120px"},
                                {title:"تعديل الكورس",width:"120px"},
                            ]}/>
                </div>
            </Default>
        </Switch>
    );
}

export default Index;
