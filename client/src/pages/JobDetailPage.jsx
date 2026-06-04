import Skeleton  from "@/components/layout/Skeleton"

function JobDetailPage(){
    return(
         <Skeleton>
            <div className="container flex justify-center items-center h-screen">
                <h1 className='text-4xl text-blue-500'>Detailed job page</h1>
            </div>
        </Skeleton>
    )
}

export default JobDetailPage