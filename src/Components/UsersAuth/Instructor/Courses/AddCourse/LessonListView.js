import Default from "Media/Logo.png"
import NiceModal from '@ebay/nice-modal-react';
import Modal from "Actions/NiceModal"

const LessonListView = ({ lessons=[] , user , withHeader=true ,  CourseName="عنوان الكورس" , ...props }) => {


    return (
        lessons && lessons?.length ?
        <div className="LessonsList">
            {
                withHeader ?
                <>
                <h5>{CourseName}</h5>
                <div className="TeacherLessonCard d-flex">
                    <img src={user?.photoUrl || Default} alt="" onError={(e)=>e.target.src=Default}/>
                    <h6>{user?.name}</h6>
                </div> 
                </>: <></>
            }
            {
                lessons?.map((lesson)=>{
                    return(
                        <div className="LessonsListCard mt-2" onClick={()=>{
                                NiceModal.show(Modal,{
                                name:"M17",
                                Component:
                                    <video controls style={{width:"100%",height:"100%"}} poster={lesson?.photoUrl}>
                                        <source src={lesson?.videoUrl} type="video/mp4"/>
                                        للأسف متصفحك لا يدعم هذه الصيغة
                                    </video>,
                                zIndex:999999
                                
                            })
                        }}>
                            <div className="Image">
                                <img src={ typeof lesson?.photo === "object" ?  URL.createObjectURL(lesson?.photo) : lesson?.photoUrl } alt=""/>
                            </div>
                            <div className="Information">
                                <h5>{lesson?.title}</h5>
                            </div>
                        </div>
                    )
                })
            }
        </div> :<></>
    );
}

export default LessonListView;
