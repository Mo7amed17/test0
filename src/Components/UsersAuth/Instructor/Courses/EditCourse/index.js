import { Case, Switch } from "react-if";
import "./style.css"
import { Input, Label } from 'reactstrap';
import { useState } from "react";
import EditLesson from "./EditLesson";
import EditCourse from "./EditCourse";

const Index = ({ Course , query }) => {

    const [cheked, setcheked] = useState();

    const options=[
        {
            key : 1 ,
            value : "Lesson",
            label : "تعديل درس"
        },
        {
            key : 2 ,
            value : "Course",
            label : "تعديل الكورس"
        },
    ]
    return (
    <>
        <div className={`d-flex me-2 justify-content-around mb-2 py-3`}>
            {
                options?.map((option)=>{
                    return(
                        <div className={`d-flex mb-50`} key={`optionKey-${option.value}`} >
                            <Label className="form-check-label cursor-pointer">
                                <Input
                                    name="editName"
                                    className="cursor-pointer  mx-1"
                                    type="radio"
                                    id={option.value}
                                    value={option.value}
                                    checked={cheked === option?.value}
                                    onChange={(e) => {
                                        setcheked(option?.value)
                                    }}
                                    />
                                {option?.label || ''}
                            </Label>
                        </div>
                    )
                })
            }
        </div>
        <Switch>
            <Case condition={cheked==="Lesson"}>
                <EditLesson Lessons={Course?.lessons} query={query}/>
            </Case>
            <Case condition={cheked==="Course"}>
                <EditCourse Course={Course} query={query} />
            </Case>
        </Switch>
        </>
    );
}

export default Index;
