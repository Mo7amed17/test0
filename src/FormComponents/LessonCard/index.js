import "./style.css"
import Default from "Media/Logo.png"
import { useState , useEffect } from "react"
import { FcBarChart , FcConferenceCall , FcVoicePresentation } from "react-icons/fc"
import { MdFavorite } from "react-icons/md"
import API from "Api"
import { Notification } from "Actions/Helpers"
import { useQueryClient } from "react-query"

const Index = (
{ id="" ,
disabled=true ,
buttonTitle="محتويات الكورس" , 
linkTo="", 
currency="$", 
Price=0 , 
Count=undefined ,  
CourseImage , 
courseName="" , 
Grade=undefined, 
teacherName="اسم المحاضر" , 
teacherImage="", 
addToFavorite=true ,
rating=0,
favoriteList = [] ,
...props 
}
) => {
    const [favorite, setfavorite] = useState(false);

    useEffect(() => {
        if(favoriteList.includes(id)){
            setfavorite(true)
        }
    }, [favoriteList]);

    const query = useQueryClient()

    const changeFavouirte=()=>{
        if(!favorite){
            API.post("api/favorite/add", { course_id : id } )
            .then(()=>{
                Notification("تمت الإضافة إلى المفضلة",1500,"success")
                setfavorite(!favorite)
                query.invalidateQueries("favorites")
            }).catch(()=>{
                Notification("حدث خطأ حاول مرة اخرى", 1500 , "error" )
            })
        }else{
            API.delete(`api/favorite/delete/${id}`)
            .then(()=>{
                Notification( "تمت الإزالة من المفضلة" , 1500 ,"warning")
                setfavorite(!favorite)
                query.invalidateQueries("favorites")
            }).catch(()=>{
                Notification("حدث خطأ حاول مرة اخرى", 1500 , "error" )
            })
        }
        
    }

    return (
        <div className="LessonCard" key={`cardKey-${id}`}>
            <div class="card-ribbon">
                <span>{Price || 0} {currency}</span>
            </div>
            <div className="LessonCardImg">
                <img src={CourseImage} alt={""}/>
                {
                    addToFavorite ?
                    <div className="AddToFavorite">
                {
                    (favorite ? <MdFavorite size={36} onClick={changeFavouirte} color="red"/> : <MdFavorite size={36} onClick={changeFavouirte} color="#c11c1c82"/>) 
                }
                </div>
                : <></>
                }
            </div>
            <div className="LessonCardContainer">
            <h6>{courseName || "اسم الكورس"}</h6>
                <div className="TeacherLessonCard d-flex">
                    <img src={teacherImage || Default} alt="" onError={(e)=>e.target.src=Default}/>
                    <h4>{teacherName}</h4>
                </div>
                    {Grade ? <h4><FcConferenceCall size={20}/> {Grade}</h4> : <></>}
                    <h4><FcVoicePresentation size={20}/>{rating ? `التقييمات ${rating}/5` : "لا توجد تقييمات"}</h4>
                    <h4><FcBarChart size={20}/>{ Count ?  ` عدد الدروس ${Count}` : "لا توجد دروس" }</h4>
                <div className="Information">
                    <a target="_blank" href={linkTo} onClick={disabled ? (e)=>e.preventDefault() : ()=>{}}>{buttonTitle}</a>
                </div>
            </div>
        </div>
    );
}

export default Index;
