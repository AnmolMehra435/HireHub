import Skeleton from "@/components/layout/Skeleton"
import useJobs from "@/hooks/useJobs";

function JobsPage(){
    
    const { data, isLoading, error} = useJobs();

    if (isLoading) {
    return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading jobs</p>;
    }
    

    return(
         <Skeleton>
            <div className="container flex justify-center items-center h-screen">
                <h1 className='text-4xl text-blue-500'>Jobs Page</h1>
            </div>
        </Skeleton>
    )
}

export default JobsPage