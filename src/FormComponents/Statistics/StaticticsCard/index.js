import { FcApproval } from "react-icons/fc";
import "./style.css"

const Index = ({ icon=<FcApproval size={30}/>, numberColor="success" , title="" , number=0 ,...props }) => {
    return (
        <div className='StatisticsCard'>
            <div className="mb-2">{icon}</div>
            <h3 className={`mb-2 text-${numberColor}`}>{number}</h3>
            <h6 className={`text-${numberColor}`}>{title}</h6>
            
        </div>
    );
}

export default Index;
