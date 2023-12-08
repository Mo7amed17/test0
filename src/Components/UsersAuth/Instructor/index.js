import React, { useState } from "react";
import "./style.css"
import { Layout, Menu, theme } from "antd";
import MainNavbar from "Components/ImportantComponents/MainNavbar";
import { PiStudentFill , PiBooksFill } from "react-icons/pi"
import { AiFillSetting , AiFillFileAdd } from "react-icons/ai"
import { BsFillBarChartFill } from "react-icons/bs"
import { Case, Default, Switch } from "react-if";
import Dashboard from "./Dashboard"
import Students from "./Students"
import CourcesList from "./Courses/CoueseList"
import AddCource from "./Courses/AddCourse"
import AccountSetting from "./AccountSetting"
import Loading from "Actions/ApiStatus/loading";
import Error from "Actions/ApiStatus/Error";
import { useQuery } from "react-query";
import API from "Api";
import { GiArchiveResearch } from "react-icons/gi"
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const App = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [ActiveTab, setActiveTab] = useState(+localStorage.getItem("ActiveTab") ?? 1);
    const user = useQuery('login_user', ()=>API.get("/api/auth/user/profile"))

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
                            icon: <PiStudentFill size={22}/>,
                            label: "طلابي",
                        },
                        {
                            key: 3,
                            icon: <AiFillFileAdd size={22}/>,
                            label: "إضافة كورس",
                        },
                        {
                            key: 4,
                            icon: <PiBooksFill size={22}/>,
                            label: "كورساتي",
                        },
                        {
                            key: 5,
                            icon: <GiArchiveResearch size={22}/>,
                            label: <Link to={"/courses"}>استكشف</Link>,
                        },
                        {
                            key: 6,
                            icon: <AiFillSetting size={22}/>,
                            label: "حسابي",
                        },
                    ]}
                onClick={(e)=>{
                    if(e?.key!=="5"){
                        localStorage.setItem("ActiveTab",e?.key)
                        setActiveTab(+e?.key)
                    }else {
                        localStorage.setItem("ActiveTab","1")
                        setActiveTab(1)
                    }
                }}/>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <MainNavbar user={user?.data?.data}/>
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
                                <Case condition={ActiveTab===1}>
                                    <Dashboard user={user?.data?.data}/>
                                </Case>
                                <Case condition={ActiveTab===2}>
                                    <Students user={user?.data?.data}/>
                                </Case>
                                <Case condition={ActiveTab===3}>
                                    <AddCource user={user?.data?.data}/>
                                </Case>
                                <Case condition={ActiveTab===4}>
                                    <CourcesList user={user?.data?.data}/>
                                </Case>
                                <Case condition={ActiveTab===6}>
                                    <AccountSetting user={user?.data?.data} query={user}/>
                                </Case>
                                <Default>
                                    <Dashboard user={user?.data?.data}/>
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
