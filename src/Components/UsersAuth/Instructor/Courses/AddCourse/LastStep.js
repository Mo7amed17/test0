import API from 'Api';
import React from 'react';
import { useQuery } from 'react-query';
import Card from "FormComponents/LessonCard"

const LastStep = ({ id , user , ...props }) => {

    const myCourse = useQuery('my-course', ()=>API.get(`/api/course/show/${id}`))
    return (
        <>
        <h3 className='text-center text-success'>تهانينا لقد أكملت الكورس بنجاح ! </h3>
        <h6 className='text-center text-danger mt-5'>ستتم إضافة الكورس بعد مراجعته من المسؤول</h6>
        <div className='d-flex justify-content-center mt-2'>
            <Card
                CourseImage={myCourse?.data?.data?.data?.photoUrl}
                teacherImage={myCourse?.data?.data?.data?.instructor?.photoUrl} 
                Count={myCourse?.data?.data?.data?.lessons?.length} 
                teacherName={myCourse?.data?.data?.data?.instructor?.name} 
                courseName={myCourse?.data?.data?.data?.title} 
                Price={+myCourse?.data?.data?.data?.price}
                addToFavorite={false}
                rating={"(تلقائيا)"}
            />
        </div>
        </>
    );
}

export default LastStep;
