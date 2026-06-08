import Skeleton from "@/components/layout/Skeleton"
import { Helmet } from "react-helmet-async"

function AdminDashboard(){
    return(
        <>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
            <Skeleton>
                <div className="flex justify-center items-center h-screen">
                    <h1 className='text-4xl text-blue-500'>Admin Dashboard</h1>
                </div>
            </Skeleton>
        </>
    )
}

export default AdminDashboard