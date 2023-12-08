import React from 'react';
import { Col, Row } from 'reactstrap';
import "Styles/Navbar.css"
import Logo from "Media/Logo.png"
import { Link } from 'react-router-dom';
import { LogIn , UserPlus} from 'react-feather';
import { useAuthUser } from 'react-auth-kit';

const Index = () => {
    const User = useAuthUser()
    return (
        <div>
            <header>
                <Row lg="12" md="12" sm="12" className='d-flex justify-content-between align-items-center'>
                    <Col lg="5" md="5" sm="5">
                        {
                            User() ? 
                            <h5 className='Welcome_USER text-white'> مرحباً <span className='mx-2'>{User()?.name}</span></h5>
                            :<ul className='LoginUl'>
                                <Link className='LoginButton' to={"/login"}>تسجيل الدخول <LogIn size={20} /></Link>
                                <Link className='LoginButton' to={"/register"}>حساب جديـد <UserPlus size={20} /></Link>
                            </ul>
                        }
                    </Col>
                    <Col lg="2" md="2" sm="2">
                        <img src={Logo} alt='Logo'/>
                    </Col>
                    <Col lg="5" md="5" sm="5">
                        <ul>
                            <Link className='text-white NavbarLink' to={"/"}>الرئيسية</Link>
                            <Link className='text-white NavbarLink' to={"/about"}>معلومات عنا</Link>
                        </ul>
                    </Col>
                </Row>
            </header>
        </div>
    );
}

export default Index;
