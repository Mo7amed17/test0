import { CheckActiveNavbarLink } from "Actions/Helpers";
import Navbar from "Components/ImportantComponents/Navbar"
import "./style.css"
import Img1 from "Media/about1.jpg"
import Img2 from "Media/about2.jpg"
import Img3 from "Media/about3.jpeg"
import {
FcOrgUnit,
FcGlobe,
FcFlashOn,
FcSignature,
FcSynchronize,
FcSms,
FcStackOfPhotos,
FcDecision,
FcDiploma1
} from "react-icons/fc"
import { useEffect } from "react";

const Index = () => {
    CheckActiveNavbarLink(2)
    const years= new Date().getFullYear() - 2015 

    const cards=[
        { key:1 ,icon:<FcFlashOn size={65}/> , title:"شعارنا" , message:"تسعى كلية الحاسبات والمعلومات -جامعة دمنهور إلى التميز والريادة والإبتكار في مجالات التعليم والبحث العلمي"},
        { key:2 ,icon:<FcGlobe size={65}/> , title:"رؤيتنا" , message:"إعداد خريجين متميزين في مجالات الحاسب الآلي ونظم وتكنولوجيا المعلومات وفقا لمتطلبات سوق العمل، وطبقا للمواصفات العالمية"},
        { key:3 ,icon:<FcOrgUnit size={65}/>, title:"مهمتنا" , message:"تعزيز الاستفادة من نتائج البحث العلمي في مجالات الحاسب الآلي ونظم وتكنولوجيا المعلومات بما يحقق مردود مجتمعي إيجابي"},
    ]

    const goals=[
        { key:1 ,icon:<FcDiploma1 size={40}/> , message:"تصميم بيئة تعليمية مستمرة وآمنة وداعمة للتعلم."},
        { key:2 ,icon:<FcSignature size={40}/> , message:"تبني أنشطة تعليمية بصورة إبداعية استجابة للخصائص النائية للطلاب"},
        { key:3 ,icon:<FcStackOfPhotos size={40}/> , message:"مراعاة الخصائص السيكلوجية للطلاب والتنوع في خلفياتهم."},
        { key:4 ,icon:<FcDecision size={40}/> , message:"توظيف أساليب تدريس متنوعة تنمي التفكير الناقد والتأملي وحل المشكلات."},
        { key:5 ,icon:<FcSynchronize size={40}/> , message:"تصميم أساليب تقويم متنوعة لتقويم خبرات الطلاب المختلفة."},
    ]

    useEffect(() => {
        document.querySelector('a[href="#more"]').addEventListener('click', function(event) {
            event.preventDefault(); 
            const targetElement = document.querySelector('#more');
            const spaceBefore = 150; 
            window.scrollTo({
                top: targetElement.offsetTop - spaceBefore,
                behavior: 'smooth'
            });
        });
    }, []);
    return (
    <>
        <Navbar/>
        <div className="About">
            <div className="About1">
                <div className="Right">
                    <div className="double_img">
                        <img src={Img1} alt=""/>
                        <img src={Img2} alt=""/>
                        </div>
                    <div className="single_img">
                        <img src={Img3} alt=""/>
                    </div>
                </div>
                <div className="Left">
                    <h2>عن الكلية</h2>
                    <p>في إطار سعي جامعة دمنهور نحو مواكبة التطورات الحديثة في مجال تكنولوجيا المعلومات والعمل على إعداد كوادر بشرية مزودة بكافة القدرات والمهارات العلمية والعملية للتعامل مع تلك التطورات كان لزاما على الجامعة إنشاء كلية الحاسبات والمعلومات لخدمة أبناء محافظة البحيرة والمحافظات المجاورة بتوفير برامج دراسية وفقا لمعايير الاعتماد الأكاديمي الدولية لتخريج متخصصين قادرين على التعامل مع الحاسب الآلي وتكنولوجيا المعلومات. أنشئت الكلية بالقرار الجمهورى رقم: 1734 لسنة 2018 وبدات الدراسة بها بالقرار رقم: 4237 بتاريخ 19/9/2019 في العام الجامعي 2019-2020   </p>
                    <a href="#more">اكـتـشف المزيد</a>
                </div>
            </div>
            <div className="About2" id="more">
                {
                    cards?.map((card)=>{
                        return(
                            <div className="about_card" key={`about_key_${card?.key}`}>
                                <h4>{card?.title}</h4>
                                <div>{card?.icon}</div>
                                <p>{card?.message}</p>
                            </div>
                        )
                    })
                }
            </div>
                <h1 className="our_goals">أهدافنا</h1>
            <div className="About3">
                {
                    goals?.map((goal)=>{
                        return(
                            <div className="goal" key={`Goal-${goal?.key}`}>
                                <span className="mx-1">{goal?.icon}</span>
                                <p>{goal?.message}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>
    );
}

export default Index;
