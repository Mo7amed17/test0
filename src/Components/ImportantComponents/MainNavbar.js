import React from 'react';
import DefaultLogo from "Media/Logo.png"
import "Styles/MainNavbar.css"
import { MdOutlinePowerSettingsNew } from 'react-icons/md';
import { Badge } from 'reactstrap';

const MainNavbar = ({ LogoutApi="" , user ,...props}) => {

    const userRole=localStorage.getItem(`_R_T_`)
        const handleLogout=()=>{
            setTimeout(() => {
                window.location.href="/"
                localStorage.clear()
            }, 500);
    }
    const Role=()=>{
        switch (userRole) {
            case "student":
            return "طــالــب"
            case "instructor":
            return "موظف"
            case "admin":
            return "الأدمـن"
            default:
                break;
        }
    }


    return (
        <div className='MainNavbar'>
                <ul>
                    <li>
                        <img alt='' src={user?.photoUrl || DefaultLogo} onError={(e)=>e.target.src=DefaultLogo}/>
                        <div className='UserDataNav'>
                        <h6>{user?.Name}</h6>
                        <Badge>{Role()}</Badge>
                        </div>
                    </li>
                    <li>
                        <span onClick={(()=>handleLogout())} style={{cursor:"pointer"}}>تسجيل الخروج<MdOutlinePowerSettingsNew size={22} style={{marginRight:"5px"}}/></span>
                    </li>
                </ul>
        </div>
    );
}

export default MainNavbar;
