import Skeleton from "@/components/layout/Skeleton"

function JobsPage(){
    
    const { data, isLoading, error} = useJobs();
    

    return(
         <Skeleton>
            <div className="container flex justify-center items-center h-screen">
                <h1 className='text-4xl text-blue-500'>Jobs Page</h1>
            </div>
        </Skeleton>
    )
}

export default JobsPage