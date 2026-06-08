import Skeleton from "@/components/layout/Skeleton"
import { Helmet } from "react-helmet-async"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

function NotFoundPage(){
    const navigate = useNavigate();

    const redirect = () => {
        navigate("/");
    }
    return(
        <>
            <Helmet>
                <title>Page Not Found</title>
            </Helmet>
            <Skeleton>
                <div className="flex flex-col gap-8 justify-center items-center h-screen">
                    <h1 className='text-4xl text-red-500'>Page Not Found</h1>
                    <Button vairant="destructive" onClick={redirect}>Go Home</Button>
                </div>
            </Skeleton>
        </>
    )
}

export default NotFoundPage