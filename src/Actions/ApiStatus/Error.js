import { TfiReload } from "react-icons/tfi"
import { useQueryClient } from "react-query";

const Error = () => {
    const queryClient = useQueryClient()

    return (
        <div className='errorLoading fs-5 text-center mt-5'>
            خطأ في تحميل المحتوى ... <TfiReload size={20} style={{cursor:"pointer"}} onClick={(e)=>{
                e.target.classList.add("reload")
                queryClient.refetchQueries()
                setTimeout(() => {
                    e.target.classList.remove("reload")
                }, 1100);
            }}/>
        </div>
    );
}

export default Error;
