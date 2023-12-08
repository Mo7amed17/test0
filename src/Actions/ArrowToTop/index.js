import { BsFillArrowUpSquareFill } from "react-icons/bs"
import "./style.css"
import { useState , useEffect } from "react";

const ArrowToTop = () => {

    const [display, setdisplay] = useState("none");
    useEffect(() => {
        window.onscroll=()=>{
            if(window.scrollY > 500){
                setdisplay("block")
            }else{
                setdisplay("none")
            }
        }
    }, []);
    return (
        <div className="ArrowToTop" style={{display:`${display}`}} onClick={()=>{
            window.scrollTo(0,0)
        }}>
            <BsFillArrowUpSquareFill size={30} color="#5f54c7"/>
        </div>
    );
}

export default ArrowToTop;
