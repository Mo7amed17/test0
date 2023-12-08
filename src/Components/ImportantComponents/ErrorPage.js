import "Styles/ErrorPage.css"
import { Link } from "react-router-dom";
import { FcHighPriority } from "react-icons/fc"
import { IoIosRedo } from "react-icons/io"

const Index = () => {
    return (
        <div className="ErrorPage">
            <h3 className="text-danger">لم يتم العثور على الصفحة المطلوبة <FcHighPriority size={36}/></h3>
            <div className="ErrorPageImg">
                <img src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif" alt=""/>
            </div>
            <div className="Down">
            <h4>تأكد من رابط الصفحة</h4>
            <Link to={"/"}>الرجوع للصفحة الرئيسية <IoIosRedo  size={30}/></Link>
            </div>
        </div>
    )
}

export default Index;
