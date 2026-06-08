import Skeleton from "@/components/layout/Skeleton"

function UnauthorizedPage(){
    return(
        <>
            <Skeleton>
                <div className="flex justify-center items-center h-screen">
                    <h1 className='text-4xl text-red-500'>UnAuthroized Page</h1>
                </div>
            </Skeleton>
        </>
    )
}

export default UnauthorizedPage