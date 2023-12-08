import React , { useEffect} from 'react';
import "Styles/LandingPage.css"
import LandingPageImg from "Media/LandingPage.jpg"
import {Youtube , ArrowDownCircle} from 'react-feather';
import { Button } from 'reactstrap';
import Card1 from "Media/Card1.png"
import Card2 from "Media/Card2.jpg"
import Card3 from "Media/Card3.avif"
import Card4 from "Media/Card4.webp"
import LastImage from "Media/BeforeFooter.webp"
import { FcMindMap , FcWorkflow , FcGraduationCap} from "react-icons/fc"
import { FcStatistics , FcUnlock , FcSearch , FcApproval} from "react-icons/fc"
import NiceModal from '@ebay/nice-modal-react';
import Modal from "Actions/NiceModal"
import Video from "Actions/NiceModal/Viedo";
import VideoMedia from "Media/video (540p).mp4"

const LandingPage = () => {

    const Cards=[
        {
            header:"خدمات طلابية",
            icon: <FcSearch/>,
            text:"تقدم جامعة دمنهور كافة الخدمات المعلوماتية و الإلكترونية التى يحتاجها طلاب الجامعة بمختلف كلياتها من خلال الموقع بكل سهولة و يسر. ",
            img:Card1,
            id:0
        },
        {
            header:"المنصة التعليمية",
            icon: <FcApproval/>,
            text:"بوابة جامعة دمنهور للتعليم الإلكتروني لدعم الطلاب وتزويدهم بتقنية التعليم الإلكتروني لتحسين جودة الخدمات التعليمية وتشجيع التميز في المجال التعليمي.",
            img:Card2,
            id:1
        },
        {
            header:"تعلّم باحترافية",
            icon: <FcStatistics/>,
            text:"مع أكثر المحاضرين كفاءة لتصقل مهاراتك المهنية والعمليّة.",
            img:Card3,
            id:2
        },
        {
            header:"أطلق إبداعك",
            icon: <FcUnlock/>,
            text:"لتعزّز فرصك في إطلاق مسيرتك المهنية، أو تنميتها وتطويرها.",
            img:Card4,
            id:3
        },
    ]
            let Counter=0;
            useEffect(() => {
                let Cards = document.querySelectorAll(".Card")
                setInterval(() => {
                    Cards.forEach(card => {
                        card.classList.remove("ActiveCard")
                        Cards[Counter].classList.add("ActiveCard")
                    });
                    if(Counter<=2){
                        Counter++;
                    }else Counter=0
                }, 7500);
            }, []);

    return (
        <>
        <div className='LandingPage'>
            <div className='Left'>
                <h1>أقسام الكلية :-</h1>
                <h4 className='text-center'>قسم علوم الحاسب</h4>
                <h4 className='text-center'>قسم نظم المعلومات</h4>
                <h4 className='text-center'>قسم تكنولوجيا المعلومات</h4>
                <h4 className='text-center'>قسم الوسائط المتعددة</h4>
                <div style={{width:"100%",textAlign:"center"}} className='LearnNow'>
                <Button style={{display:"block"}}
                onClick={(e)=>{
                    NiceModal.show(Modal,{
                    name:"M17",
                    Component:<Video Video={VideoMedia}/>,
                })
                }}
                >فيديو تعريفي للموقع <Youtube size={20}/></Button>
                </div>
            </div>
            <div className='Right'>
                <div className='LandingPageImg'>
                    <img src={LandingPageImg} alt='Main Logo'/>
                </div>
            </div>
            <a href='#/' className='IconToDown'><ArrowDownCircle size={30} color='white'/></a>
        </div>
        <div  id='/' style={{marginBottom:"150px"}}></div>
        <div className='LandingPageDown'>
            <div className='Right'>
            <h3>حوّل معرفتك إلى تأثير حقيقي</h3>
            <h6>قُم بتنمية مهاراتك المهنيّة في مجال محدّد من خلال مجموعة من الدورات التدريبيّة المترابطة.</h6>
            <h6>واجه التحديات العمليّة وطبّق الأفكار والمفاهيم التي تعلّمتها في مشاريع عمليّة ملموسة.</h6>
            <h6>عزّز فرصك في الحصول على وظائف أفضل.</h6>
            </div>
            <div className='Left'>
                {
                        Cards.map(( card )=>{
                            return(
                                <div className={`${card?.id === 0 ? "Card ActiveCard" : "Card"} `} key={card?.id}>
                                    <div className='CardLeft'>
                                        <div className='CardImg'>
                                            <img src={card?.img} alt=''/>
                                        </div>
                                    </div>
                                    <div className='CardRight'>
                                        <h2>{card?.header} {card?.icon}</h2>
                                        <p>{card?.text}</p>
                                    </div>
                                </div>
                            )
                        })
                }
                
            </div>
        </div>
        </>
    );
}
export default LandingPage;
