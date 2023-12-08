import TablePreview from "FormComponents/Table"
import AddInstructor from "./AddInstructor";
import { useQuery } from "react-query";
import { useEffect , useState } from "react";
import API from "Api";
import { Case, Default, Switch } from 'react-if';
import Loading from 'Actions/ApiStatus/loading';
import Error from 'Actions/ApiStatus/Error';

const Index = () => {
    const instructors = useQuery('instructors-list', ()=>API.post("/users/instructors"),{
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: 1,
        staleTime: Infinity,
    })
    const [instructorsList, setinstructorsList] = useState([]);

    useEffect(() => {
        setinstructorsList([])
        instructors?.data?.data?.Data?.forEach((instructor, index) => {
            setinstructorsList(instructorsList => [
                ...instructorsList,
                {
                    num: index+1 ,
                    name: instructor?.Name ,
                    email: instructor?.Email ,
                    national_id: instructor?.Nat_ID ,
                }
                ]);
            });
    }, [instructors?.data]);

    return (
        <Switch>
            <Case condition={instructors.isLoading}>
                <Loading/>
            </Case>
            <Case condition={instructors.isError}>
                <Error/>
            </Case>
            <Default>
                <div>
                    <TablePreview 
                        buttonTitle={"إضافة مسؤول"} 
                        NiceModalComponent={<AddInstructor query={instructors}/>}
                        title={"قائمة المسؤولون"} 
                        data={ instructorsList || [] }
                        headers={
                            [
                                {title:"التسلسل",width:"100px"},
                                {title:"اسم المسؤول",width:"250px"},
                                {title:"ايميل المسؤول" ,width:"350px"},
                                {title:"رقم الهوية" ,width:"300px"},
                            ]}
                    />
                </div>
            </Default>
        </Switch>
    );
}

export default Index;
