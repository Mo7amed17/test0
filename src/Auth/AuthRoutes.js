import { Route ,Routes } from "react-router-dom";
import { AppRoutes } from "./Routes";
import { useAuthUser } from 'react-auth-kit'
import ErrorPage from "Components/ImportantComponents/ErrorPage"

const AuthRoutes = () => {
        const User = useAuthUser()
    return (
        <Routes>
        {
        AppRoutes?.map((route,index)=>{
                //Only Login (any)
            if( User() && !route?.puplic && route?.showAfterLogin && !route?.role){
                return(
                    <Route
                        element={route?.element}
                        key={`Key-${index}`}
                        path={route?.path}
                        exact={route?.exact}
                    />
                    )
            }//Only No login (visitor)
            else if( !User() && route?.puplic && !route?.showAfterLogin){
                return(
                    <Route
                        element={route?.element}
                        key={`Key-${index}`}
                        path={route?.path}
                        exact={route?.exact}
                    />
                    )
            } //login & No login (visitor)
            else if( route?.puplic && route?.showAfterLogin){
                return(
                    <Route
                        element={route?.element}
                        key={`Key-${index}`}
                        path={route?.path}
                        exact={route?.exact}
                    />
                    )
            } // only students
            else if ( !route?.puplic && route?.showAfterLogin && User()?.user_type==="student"){
                return(
                    <Route
                        element={route?.element}
                        key={`Key-${index}`}
                        path={route?.path}
                        exact={route?.exact}
                    />
                    )
            }
            else {
                return null
            }
            
        })
        }
        <Route
            element={<ErrorPage/>}
            path="*"
        />
        </Routes>
    );
}

export default AuthRoutes;
