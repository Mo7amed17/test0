import React, { useState } from "react";
import "./style.css"
import { Layout, Menu, theme } from "antd";
import MainNavbar from "Components/ImportantComponents/MainNavbar";
import { FaUserAlt , FaHandshake } from "react-icons/fa"
import { PiStudentFill , PiBooksFill } from "react-icons/pi"
import { AiFillSetting } from "react-icons/ai"
import { BsFillBarChartFill , BsFillPencilFill } from "react-icons/bs"
import { Case, Default, Switch } from "react-if";
import AdminDashboard from "./Dashboard"
import Instructors from "./Instructors"
import Students from "./Students"
import Courses from "./Courses"
import AccountSetting from "./AccountSetting"
import { useQuery } from "react-query";
import API from "Api";
import Loading from "Actions/ApiStatus/loading";
import Error from "Actions/ApiStatus/Error";

const { Header, Sider, Content } = Layout;
const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [ActiveTab, setActiveTab] = useState(+localStorage.getItem("ActiveTab") ?? 1);
    const user = useQuery('login_admin', ()=>API.post("/users"))

    return (
        <Layout>
            <Sider trigger={null} collapsed={false}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={localStorage.getItem("ActiveTab")?? "1"}
                    items={[
                        {
                            key: 1,
                            icon: <BsFillBarChartFill size={22}/>,
                            label: "الرئيسية",
                        },
                        {
                            key: 2,
                            icon: <FaUserAlt size={22}/>,
                            label: "الموظفون",
                        },
                        {
                            key: 3,
                            icon: <PiStudentFill size={22}/>,
                            label: "الطلاب",
                        } ,
                        {
                            key: 4,
                            icon: <PiBooksFill size={22}/>,
                            label: "المواد",
                            value : "courses"
                        },
                        {
                            key: 5,
                            icon: <AiFillSetting size={22}/>,
                            label: "حسابي",
                        },
                    ]}
                onClick={(e)=>{
                    localStorage.setItem("ActiveTab",e?.key)
                    setActiveTab(+e?.key)
                }}/>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <MainNavbar LogoutApi="/logout" user={user?.data?.data?.Data}/>
                </Header>
                <Content>
                    <Switch>
                        <Case condition={user.isLoading}>
                            <Loading/>
                        </Case>
                        <Case condition={user.isError}>
                            <Error/>
                        </Case>
                        <Default>
                        <Switch>
                                <Case condition={ActiveTab === 1}>
                                    <AdminDashboard user={user?.data?.data}/>
                                </Case>
                                <Case condition={ActiveTab === 2}>
                                    <Instructors user={user?.data?.data?.Data}/>
                                </Case>
                                <Case condition={ActiveTab === 3}>
                                    <Students/>
                                </Case>
                                <Case condition={ActiveTab === 4}>
                                    <Courses/>
                                </Case>
                                <Case condition={ActiveTab === 5}>
                                    <AccountSetting user={user?.data?.data?.Data} query={user}/>
                                </Case>
                                <Default>
                                    <AdminDashboard user={user?.data?.data?.Data}/>
                                </Default>
                            </Switch>
                        </Default>
                    </Switch>
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;
