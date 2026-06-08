import Skeleton from "@/components/layout/Skeleton"
import { Helmet } from "react-helmet-async"

function UnauthorizedPage(){
    return(
        <>
         <Helmet>
            <title>Unauthroized</title>
         </Helmet>
            <Skeleton>
                <div className="flex justify-center items-center h-screen">
                    <h1 className='text-4xl text-red-500'>UnAuthroized Page</h1>
                </div>
            </Skeleton>
        </>
    )
}

export default UnauthorizedPage