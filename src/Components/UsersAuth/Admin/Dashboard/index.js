import { Case, Default, Switch } from "react-if";
import "./style.css"
import { useQuery } from 'react-query'
import LoadingPage from "Actions/LoadingPage"
import Card from "FormComponents/Statistics/StaticticsCard"
import API from "Api";
import { useState , useEffect } from "react";
import { FcHighPriority , FcExpired , FcBarChart } from "react-icons/fc"
import { Col, Row } from "reactstrap";
import Circle from "FormComponents/Statistics/Circle"

const Index = () => {

    const adminStatistics = useQuery('admins-reports', ()=>API.get("/api/report/admin"))
    const [data, setdata] = useState({});
    useEffect(() => {
        setdata(adminStatistics?.data?.data?.data)
    }, [adminStatistics?.data]);

    
    return (
        <Switch>
            <Case condition={adminStatistics?.isLoading}>
                <LoadingPage/>
            </Case>
            <Case condition={adminStatistics?.isError}>
                
            </Case>
            <Default>
                <div className="AdminDashboard">
                    <Card title="عدد المعلمون النشطين" number={data?.instructors}/>
                    <Card title="عدد المعلمون في الانتظار" number={data?.pending_instructors} numberColor="warning" icon={<FcExpired size={30}/>}/>
                    <Card title="عدد المعلمون الكلي" number={+data?.instructors + +data?.pending_instructors} numberColor="primary" icon={<FcBarChart size={30}/>}/>
                    <Card title="عدد الكورسات النشطة" number={data?.approved_courses}/>
                    <Card title="عدد الكورسات في الانتظار" number={data?.pending_courses} numberColor="warning" icon={<FcExpired size={30}/>}/>
                    <Card title="عدد الكورسات الكلي" number={data?.courses} numberColor="primary" icon={<FcBarChart size={30}/>}/>
                    <Card title="عدد الطلاب المسجلين" number={data?.students}/>
                    <Card title="عدد النشطين في الموقع" number={data?.total_users} numberColor="primary" icon={<FcBarChart size={30}/>}/>
                    <Card title="عدد التخصصات" number={data?.subjects} numberColor="primary" icon={<FcBarChart size={30}/>}/>
                    <Card title="عدد المسؤولون النشطين" number={data?.active_admins}/>
                    <Card title="عدد المسؤولون الغير نشطين" number={data?.inactive_admins} numberColor="danger" icon={<FcHighPriority size={30}/>}/>
                    <Card title="عدد المسؤولون الكلي" number={data?.admins} numberColor="primary" icon={<FcBarChart size={30}/>}/>
                </div>
                <Row className="justify-content-around">
                    <Col sm="12" lg="5" md="5" className="mt-4">
                        <Circle tiltle={`عدد المعلمون الكلي : ${+data?.instructors + +data?.pending_instructors}`} labels={["عدد المعلمون النشطين" , "عدد المعلمون في الانتظار"]} series={[+data?.instructors ,+data?.pending_instructors]}/>
                    </Col>
                    <Col sm="12" lg="5" md="5" className="mt-4">
                        <Circle colors={["#198754" , "#dc3545" ]} tiltle={`عدد المسؤولون الكلي : ${data?.admins}`} labels={["عدد المسؤولون النشطين" , "عدد المسؤولون الغير نشطين"]} series={[+data?.active_admins ,+data?.inactive_admins]}/>
                    </Col>
                </Row>
                <Row className="justify-content-center mt-4">
                    <Col sm="12" lg="5" md="5">
                        <Circle tiltle={`عدد الكورسات الكلي : ${+data?.courses}`} labels={["عدد الكورسات النشطة" , "عدد الكورسات في الانتظار"]} series={[+data?.approved_courses ,+data?.pending_courses]}/>
                    </Col>
                </Row>
            </Default>
        </Switch>
    );
}

export default Index;
