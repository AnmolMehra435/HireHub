import Skeleton from "@/components/layout/Skeleton"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import userAuthStore from "@/store/authStore"
import useUIStore from "@/store/uiStore"
import { useLocation, useNavigate } from "react-router-dom"

const formSchema = z.object({
    email: z.email("Enter valid email"),
    password: z.string().min(8, "Must be more than 8 characters").regex(/^(?=.*[0-9])(?=.*[!@#$%^&*]).+$/, "password must contain at least one number and one special character")
})

function LoginPage(){
    const { register, handleSubmit,reset, formState: { errors }} = useForm({resolver: zodResolver(formSchema),})

    const location = useLocation();
    const navigate = useNavigate();

    const setUser = userAuthStore((state) => state.setUser)
    
    const addNotification = useUIStore((state) => state.addNotification)

    const from = location.state?.from?.pathname;

    const getDashboard = (role) => {
        switch(role){
            case "candidate":
                return "/candidate/dashboard";

            case "employer":
                return "/employer/dashboard";

            case "admin":
                return "/admin/dashboard";
            
            default:
                return "/";
        }
    }

    const role = "candidate"

    const onSubmit = (data) => {
        console.log(data)
        setUser({
            email: data.email,
            role
        })
        addNotification(
            "Logged in successfully!",
            "success"
        )
        reset();

        const destination = from || getDashboard(role);

        navigate(destination, {
            replace: true,
        })
    }
    return(
         <Skeleton>
            <div className="flex justify-center items-center h-screen flex-col">
                <h1 className='text-4xl text-blue-500 mb-5'>Login Page</h1>
                <form onSubmit = {handleSubmit(onSubmit)} className="flex flex-col">
                    <label>Email</label>
                    <input {...register('email')} placeholder="Enter your email" className="my-4 pl-2 border-2 border-gray-400"/>
                    {errors.email && (<p className="text-red-500 mb-4">{errors.email.message}</p>)}
                    <label>Password</label>
                    <input {...register('password')} placeholder="Enter your password" className="my-4 pl-2 border-2 border-gray-400"/>
                    {errors.password && <p className="text-red-500 mb-4">{errors.password.message}</p>}
                    <button className="border-2 border-gray-400 w-max px-4 mx-auto cursor-pointer" type='submit'>Login</button>
                </form>
            </div>
        </Skeleton>
    )
}

export default LoginPage