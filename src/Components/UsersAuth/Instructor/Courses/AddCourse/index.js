import "./style.css"
import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import LastStep from "./LastStep";

const Index = ({user}) => {
    const [current, setCurrent] = useState(0);
    const [CourseId, setCourseId] = useState();
    const [CourseName, setCourseName] = useState("");

    const steps = [
        {
            title: 'معلومات الكورس',
            content: <FirstStep 
                user={user} 
                current={current} 
                setCurrent={setCurrent} 
                setCourseName={setCourseName} 
                CourseName={CourseName}
                setCourseId={setCourseId}
                CourseId={CourseId}
            />
        },
        {
            title: 'رفع الدروس',
            content: <SecondStep CourseId={CourseId} CourseName={CourseName} user={user}/>,
        },
        {
            title: 'النهاية',
            content: <LastStep id={CourseId} user={user}/>,
        },
        ]
    
    const next = () => {
        setCurrent(current + 1)
    };
    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));


    return (
    <div className='AddCourse'>
        <Steps current={current} items={items}  responsive={false}/>
        <div className="mt-4">{steps[current].content}</div>
        <div
            style={{
            marginTop: 40,
            }}
        >
            {current < steps.length - 1 && current===1 ?
            <Button type="primary" onClick={() => next()}>تم رفع جميع الدروس</Button>
            :<></>
        }
        </div>
    </div>
    );
}

export default Index;
