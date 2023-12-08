import { Timeline } from 'antd';
import { useState , useEffect } from 'react';

const View = ({ data }) => {
    const [items, setitems] = useState([]);

    useEffect(() => {
        setitems([])
        data?.forEach((subject) => {
            console.log(subject)
            setitems(itemsList => [
                ...itemsList,
                {
                    color: subject?.disabled === true ? "green" : "blue" ,
                    children : <h5>{subject?.name} ({subject?.disabled===true ? "إجباري" : "إختياري"})</h5>
                }
                ]);
            });
    }, [data]);

    return (
        <>
        <h3 className='mx-auto mb-5 text-success fw-bold' style={{paddingBottom:"8px",width:"fit-content",borderBottom:"2px solid green"}}>المواد المسجلة</h3>
            <Timeline 
                mode="left"
                items={items || []}
                style={{fontSize:"23px"}}
            />
        </>
    );
}

export default View;
