import Skeleton from "@/components/layout/Skeleton"
import { Button } from "@/components/ui/button"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"

function UnauthorizedPage(){

    const navigate = useNavigate();

    const redirect = () => {
        navigate("/")
    }
    return(
        <>
         <Helmet>
            <title>Unauthorized</title>
         </Helmet>
            <Skeleton>
                <div className="flex flex-col justify-center gap-8 items-center h-screen">
                    <h1 className='text-4xl text-red-500'>UnAuthroized Page</h1>
                    <Button className="bg-gray-700 text-white"  variant="destructive" onClick={redirect}>Go Home</Button>
                </div>
            </Skeleton>
        </>
    )
}

export default UnauthorizedPage