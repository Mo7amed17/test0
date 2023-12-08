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
import Modal from 'Actions/NiceModal/AntdModal';

const Index = () => {

    const myStudents = useQuery('my-students', ()=>API.get("/api/instructor/students"),{
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: Infinity,
    })
    const [myStudentsList, setmyStudentsList] = useState([]);

    useEffect(() => {
        setmyStudentsList([])
        myStudents?.data?.data?.data?.forEach((student, index) => {
            setmyStudentsList(myStudentsList => [
                ...myStudentsList,
                {
                    photo: <img style={{width:"40px",height:"40px",borderRadius:"10px"}} src={student?.photoUrl} alt="" onError={(e)=>e.target.src = NoImage}/> ,
                    name: student?.name ,
                    email:student?.email ,
                    country : student?.country ,
                    phone : student?.phone ,
                    courses : <Modal title={<span className='text-primary' style={{cursor:"pointer"}}>عرض <MdRemoveRedEye size={20}/></span>} Com={<h1>uuuuu</h1>}/>,
                }
                ]);
            });
    }, [myStudents?.data]);




    return (
        <Switch>
            <Case condition={myStudents.isLoading}>
                <Loading/>
            </Case>
            <Case condition={myStudents.isError}>
                <Error/>
            </Case>
            <Default>
                <div className="AdminInstructors">
                    <TableView 
                        titleColor="primary" 
                        title={"قائمة طلابي"} 
                        data={myStudentsList || []} 
                        headers={
                            [{title:"الصورة",width:"100px"},
                                {title:"اسم الطالب",width:"350px"},
                                {title:"ايميل الطالب" ,width:"150px"},
                                {title:"الدولة",width:"150px"},
                                {title:"رقم الهاتف",width:"200px"},
                                {title:"الكورسات",width:"200px"},
                            ]}/>
                </div>
            </Default>
        </Switch>
    );
}

export default Index;
