import Skeleton from "@/components/layout/Skeleton"

function LoginPage(){
    return(
         <Skeleton>
            <div className="container flex justify-center items-center h-screen">
                <h1 className='text-4xl text-blue-500'>Login Page</h1>
            </div>
        </Skeleton>
    )
}

export default LoginPage