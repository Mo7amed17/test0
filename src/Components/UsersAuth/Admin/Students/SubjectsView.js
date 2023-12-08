import API from 'Api';
import { Timeline } from 'antd';
import { useState , useEffect } from 'react';
import { useQuery } from 'react-query';

const View = ({ id }) => {
    const [items, setitems] = useState([]);
    const subjects = useQuery('admin-students-subjects-confirmed', ()=>API.post(`/subject/StudentSubjects/${id}`))

    useEffect(() => {
        setitems([])
        subjects?.data?.data?.data?.forEach((subject) => {
            setitems(itemsList => [
                ...itemsList,
                {
                    color: "green" ,
                    children : subject?.name_EN
                }
                ]);
            });
    }, [subjects?.data]);

    return (
        <>
        <h5 className='mx-auto mb-5 text-success fw-bold' style={{paddingBottom:"8px",width:"fit-content",borderBottom:"2px solid green"}}>المواد</h5>
            <Timeline 
                mode="left"
                items={items || []}
            />
        </>
    );
}

export default View;
