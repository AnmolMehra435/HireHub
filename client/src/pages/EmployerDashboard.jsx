import Skeleton from "@/components/layout/Skeleton"
import { Helmet } from "react-helmet-async"

function EmployerDashboard(){
    return(
        <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
            <Skeleton>
                <div className="flex justify-center items-center h-screen">
                    <h1 className='text-4xl text-blue-500'>Employer Dashboard</h1>
                </div>
            </Skeleton>
        </>
    )
}

export default EmployerDashboard