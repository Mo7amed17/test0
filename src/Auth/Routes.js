import MainPage from "Components/MainPage"
import Login from "Components/Login"
import Register from "Components/Signup"
import User from "Components/UsersAuth/User"
import Admin from "Components/UsersAuth/Admin"
import Instructor from "Components/UsersAuth/Instructor"
import About from "Components/About"

const Role=localStorage.getItem(`_R_T_`)
let  Dashboard ;

const RoleRoutes = ()=>{
    switch (Role) {
        case "admin": 
            {
            Dashboard = <Admin/>
            break
            }
        case "student":
            {
            Dashboard = <User/>
            break
            }
        case "instructor":
            {
            Dashboard = <Instructor/>
            break
            }
        default:
        return null
    }
}
RoleRoutes()
export const AppRoutes=[
    {
        path:"/" ,
        element: <MainPage/> ,
        exact:true ,
        puplic:true ,
        showAfterLogin:false ,
    },
    {
        path:"/register" ,
        element: <Register/> ,
        exact:true ,
        puplic:true ,
        showAfterLogin:false ,
    },
    {
        path:"/login" ,
        element: <Login/> ,
        exact:true ,
        puplic:true ,
        showAfterLogin:false ,
    },
    {
        path:"/about" ,
        element: <About/>,
        exact:true ,
        puplic:true ,
        showAfterLogin:true ,
    },
    {
        path:"/" ,
        element: Dashboard,
        exact:true ,
        puplic:false ,
        showAfterLogin:true ,
    }
]