import Skeleton from "@/components/layout/Skeleton"

function NotFoundPage(){
    return(
        <>
            <Skeleton>
                <div className="flex justify-center items-center h-screen">
                    <h1 className='text-4xl text-red-500'>Not Found Page</h1>
                </div>
            </Skeleton>
        </>
    )
}

export default NotFoundPage