import API from "Api";
import TableView from "FormComponents/Table"
import { Switch , Case, Default } from "react-if";
import { useQuery, useQueryClient } from "react-query";
import Loading from "Actions/ApiStatus/loading";
import Error from "Actions/ApiStatus/Error";
import { useEffect, useState } from "react";
import { FcCancel , FcOk } from "react-icons/fc"
import { Notification } from "Actions/Helpers";
import Modal from 'Actions/NiceModal/AntdModal';
import { Eye } from "react-feather";
import View from "./SubjectsView";

const Index = () => {
    const queryClient = useQueryClient()

    const ActiveStudents = useQuery('admin-students-List-active', ()=>API.post("/users/students/confirmed"))
    const inActiveStudents = useQuery('admin-students-List-inActive', ()=>API.post("/users/students/pending"))
    const confirmedStudents = useQuery('admin-students-List-confirmed', ()=>API.post("/subject/StudentSubjects/Submitted"))

    const [activeStudentsList, setActiveStudentsList] = useState([]);
    const [inActiveStudentsList, setInActiveStudentsList] = useState([]);
    const [confirmedStudentsList, setConfirmedStudentsList] = useState([]);

    const Accept =(id)=>{
        API.post(`/users/confirmStudent/${id}`)
        .then(()=>{
            Notification("تم قبولة بنجاح" , 2000 ,"success")
        })
        .catch(()=>{
            Notification("خطأ حاول مرة اخرى" , 2000 ,"error")
        })
        .finally(()=>{
            queryClient.invalidateQueries('admin-students-List-active')
            queryClient.invalidateQueries('admin-students-List-inActive')
        })
    }
    const Reject =(id)=>{
        API.post(`/users/rejectStudent/${id}`)
        .then(()=>{
            Notification("تم رفضة بنجاح" , 2000 ,"success")
        })
        .catch(()=>{
            Notification("خطأ حاول مرة اخرى" , 2000 ,"error")
        })
        .finally(()=>{
            queryClient.invalidateQueries('admin-students-List-active')
            queryClient.invalidateQueries('admin-students-List-inActive')
        })
    }

    useEffect(() => {
        setActiveStudentsList([])
        ActiveStudents?.data?.data?.Data?.forEach((student, index) => {
            setActiveStudentsList(studentsList => [
                ...studentsList,
                {
                    num: index+1 ,
                    name: student?.Name ,
                    email: student?.Email ,
                    national_id: student?.Nat_ID ,
                    department: student?.Department || <>&#8213;</> ,
                    semster: student?.Semester
                }
                ]);
            });
    }, [ActiveStudents?.data]);

    useEffect(() => {
        setInActiveStudentsList([])
        inActiveStudents?.data?.data?.Data?.forEach((student, index) => {
            setInActiveStudentsList(studentsList => [
                ...studentsList,
                {
                    num: index+1 ,
                    name: student?.Name ,
                    email: student?.Email ,
                    national_id: student?.Nat_ID ,
                    department: student?.Department || <>&#8213;</> ,
                    event : <div className="d-flex justify-content-around">
                        <FcOk size={28} style={{cursor:"pointer"}} onClick={()=>{
                            Accept(student?.ID)
                        }}/>
                        <FcCancel size={30} style={{cursor:"pointer"}} onClick={()=>{
                            Reject(student?.ID)
                        }}/>
                    </div>
                }
                ]);
            });
    }, [inActiveStudents?.data]);

    useEffect(() => {
        setConfirmedStudentsList([])
        confirmedStudents?.data?.data?.Data?.forEach((student, index) => {
            setConfirmedStudentsList(studentsList => [
                ...studentsList,
                {
                    num: index+1 ,
                    name: student?.Name ,
                    email: student?.Email ,
                    national_id: student?.Nat_ID ,
                    department: student?.Department || <>&#8213;</> ,
                    view : <Modal title={<span className='text-success fw-bold' style={{cursor:"pointer"}}>عرض <Eye size={20}/></span>} Com={<View id={student?.ID}/>}/> ,
                }
                ]);
            });
    }, [confirmedStudents?.data]);
    
    return (
        <Switch>
            <Case condition={ActiveStudents.isLoading || inActiveStudents.isLoading || confirmedStudents.isLoading}>
                <Loading/>
            </Case>
            <Case condition={ActiveStudents.isError || inActiveStudents.isError || confirmedStudents.isError}>
                <Error/>
            </Case>
            <Default>
            <div className="AdminStudents">
                <TableView 
                    titleColor="warning" 
                    title={"قائمة الطلاب في الإنتظار"} 
                    data={inActiveStudentsList || []} 
                    headers={[
                        {title:"التسلسل",width:"100px"},
                        {title:"اسم الطالب",width:"250px"},
                        {title:"ايميل الطالب" ,width:"350px"},
                        {title:"رقم الهوية" ,width:"300px"},
                        {title:"القسم" ,width:"200px"},
                        {title:"قبول - رفض",width:"200px"}
                    ]}
                />
            </div>
            <div className="AdminStudents">
                <TableView 
                    titleColor="success" 
                    title={"قائمة الطلاب المسجلين"} 
                    data={activeStudentsList || []} 
                    headers={[
                        {title:"التسلسل",width:"100px"},
                        {title:"اسم الطالب",width:"250px"},
                        {title:"ايميل الطالب" ,width:"350px"},
                        {title:"رقم الهوية" ,width:"300px"},
                        {title:"القسم" ,width:"200px"},
                        {title:"الفصل الدراسي" ,width:"200px"},
                    ]}
                />
            </div>
            <div className="AdminStudents">
                <TableView 
                    titleColor="primary" 
                    title={"قائمة الطلاب الذين أكدوا المواد"} 
                    data={confirmedStudentsList || []} 
                    headers={[
                        {title:"التسلسل",width:"100px"},
                        {title:"اسم الطالب",width:"250px"},
                        {title:"ايميل الطالب" ,width:"350px"},
                        {title:"رقم الهوية" ,width:"300px"},
                        {title:"القسم" ,width:"200px"},
                        {title:"المواد" ,width:"200px"},
                    ]}
                />
            </div>
            </Default>
        </Switch>
            );
}

export default Index;
