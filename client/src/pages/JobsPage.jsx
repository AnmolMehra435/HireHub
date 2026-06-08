import Skeleton from "@/components/layout/Skeleton"
import useJobs from "@/hooks/useJobs";
import { Helmet } from "react-helmet-async";

function JobsPage(){
    
    const { isLoading, error} = useJobs();

    if (isLoading) {
    return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading jobs</p>;
    }
    

    return(
        <>
        <Helmet>
            <title>JobsPage</title>
        </Helmet>
         <Skeleton>
            <div className="container flex justify-center items-center h-screen">
                <h1 className='text-4xl text-blue-500'>Jobs Page</h1>
            </div>
        </Skeleton>
        </>
    )
}

export default JobsPage