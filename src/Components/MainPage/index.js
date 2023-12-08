import Navbar from "Components/ImportantComponents/Navbar"
import LandingPage from "./LandingPage";
import { CheckActiveNavbarLink } from "Actions/Helpers";
const index = () => {
    CheckActiveNavbarLink(1)
    return (
        <div className="MainPage d-block">
            <Navbar/>
            <LandingPage/>
        </div>
    );
}

export default index;
