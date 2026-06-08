import Skeleton from "@/components/layout/Skeleton"
import { Helmet } from "react-helmet-async"

function NotFoundPage(){
    return(
        <>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <Skeleton>
                <div className="flex justify-center items-center h-screen">
                    <h1 className='text-4xl text-red-500'>Page Not Found</h1>
                </div>
            </Skeleton>
        </>
    )
}

export default NotFoundPage