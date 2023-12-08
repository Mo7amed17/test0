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

    const insructorStatistics = useQuery('instructor-reports', ()=>API.get("/api/report/instructor"))
    const [data, setdata] = useState({});
    useEffect(() => {
        setdata(insructorStatistics?.data?.data?.data)
    }, [insructorStatistics?.data]);

    
    return (
        <Switch>
            <Case condition={insructorStatistics?.isLoading}>
                <LoadingPage/>
            </Case>
            <Case condition={insructorStatistics?.isError}>
                
            </Case>
            <Default>
                <div className="AdminDashboard">
                    <Card title="عدد كورساتي النشطة" number={data?.approved_courses}/>
                    <Card title="عدد كورساتي في الانتظار" number={data?.pending_courses} numberColor="warning" icon={<FcExpired size={30}/>}/>
                    <Card title="عدد كورساتي الكلية" number={data?.courses} numberColor="primary" icon={<FcBarChart size={30}/>}/>
                    <Card title="عدد طلابي المسجلين" number={data?.student?.length ? data?.students : 0}/>
                </div>
                <Row className="justify-content-center mt-4">
                    <Col sm="12" lg="5" md="5">
                        <Circle tiltle={`عدد كورساتي الكلية : ${+data?.courses}`} labels={["عدد كورساتي النشطة" , "عدد كورساتي في الانتظار"]} series={[+data?.approved_courses ,+data?.pending_courses]}/>
                    </Col>
                </Row>
            </Default>
        </Switch>
    );
}

export default Index;
