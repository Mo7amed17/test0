import TablePreview from "FormComponents/Table"
import AddSubject from "./AddSubject";
import { useQuery } from "react-query";
import { useEffect , useState } from "react";
import API from "Api";
import { Case, Default, Switch } from 'react-if';
import Loading from 'Actions/ApiStatus/loading';
import Error from 'Actions/ApiStatus/Error';

const Index = () => {
    
    const subjects = useQuery('subjects-list', ()=>API.post("/subject/all"),{
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: Infinity,
    })
    const [subjectsList, setsubjectsList] = useState([]);

    useEffect(() => {
        setsubjectsList([])
        subjects?.data?.data?.Data?.forEach((subject, index) => {
            setsubjectsList(subjectsList => [
                ...subjectsList,
                {
                    num: index+1 ,
                    name: subject?.name_EN ,
                    name2: subject?.name_AR ,
                    count: subject?.hours ,
                    code: subject?.code ,
                    department: subject?.Department ,
                    kind: subject?.sub_Type ? "إجباري" : "اختياري" ,
                    semester: subject?.semester ,
                }
                ]);
            });
    }, [subjects?.data]);

    return (
        <Switch>
            <Case condition={subjects.isLoading}>
                <Loading/>
            </Case>
            <Case condition={subjects.isError}>
                <Error/>
            </Case>
            <Default>
                <div>
                    <TablePreview 
                        buttonTitle={"إضافة مادة"} 
                        NiceModalComponent={<AddSubject query={subjects}/>}
                        title={"قائمة المواد"} 
                        data={ subjectsList || [] }
                        headers={
                            [
                                {title:"التسلسل",width:"100px"},
                                {title:"الاسم بالانجليزيه",width:"350px"},
                                {title:"الاسم بالعربية" ,width:"350px"},
                                {title:"عدد الساعات" ,width:"200px"},
                                {title:"كود المادة" ,width:"200px"},
                                {title:"الأقسام" ,width:"200px"},
                                {title:"نوع المادة" ,width:"300px"},
                                {title:"الترم الدراسي" ,width:"200px"},
                            ]}
                    />
                </div>
            </Default>
        </Switch>
    );
}

export default Index;
