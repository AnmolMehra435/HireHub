import Skeleton  from "@/components/layout/Skeleton"
import { Helmet } from "react-helmet-async"

function JobDetailPage(){
    return(
        <>
        <Helmet>
            <title>Job Detail</title>
        </Helmet>
         <Skeleton>
            <div className="container flex justify-center items-center h-screen">
                <h1 className='text-4xl text-blue-500'>Detailed job page</h1>
            </div>
        </Skeleton>
        </>
    )
}

export default JobDetailPage