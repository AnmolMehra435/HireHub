import Skeleton from "@/components/layout/Skeleton"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import useUIStore from "@/store/uiStore"
import { Helmet } from "react-helmet-async"
import userAuthStore from "@/store/authStore"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
    username : z.string().min(2, {message: "Username should be greator than 2 characters"}),
    email: z.email("Please enter a valid email"),
    password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*]).+$/, "password must contain at least one number and one special character"),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
})


function RegisterPage(){
    const { register, handleSubmit, reset, formState: { errors } } = useForm({resolver: zodResolver(formSchema), });

    const addNotification = useUIStore((state) => state.addNotification)
    const userRegister = userAuthStore((state) => state.register)
    const navigate = useNavigate();

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

    const onSubmit = async (data) => {

        const payload = {
            name: data.username,
            email: data.email,
            password: data.password
        }

        try{
            const response = await userRegister(payload)
            addNotification(
                "Account created successfull!",
                "success"
            )
            reset();

            const destination = getDashboard(response.data.user.role);

            navigate(destination)
            
        }catch(error){
            addNotification(
                error.response?.data?.message ||
                "Register failed",
                "error"
            )
        }
    }
    return(
        <>
        <Helmet>
            <title>Register</title>
        </Helmet>
         <Skeleton>
            <div className="flex justify-center items-center h-screen flex-col w-min sm:w-full mx-auto">
                <h1 className='text-4xl text-blue-500 mb-5'>Register page</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
                    <label>FullName</label>
                    <input  {...register("username")} className='my-4 pl-2 border-2 border-gray-400' type='text' placeholder="Enter your name"/>
                    {errors.username && (
                    <p className="text-red-500 mb-4">
                        {errors.username.message}
                    </p>
                    )}
                    <label>Email</label>
                    <input {...register("email")} className='my-4 pl-2 border-2 border-gray-400' type="email" placeholder="Enter your email"/>
                    {errors.email && (
                    <p className="text-red-500 mb-4">
                        {errors.email.message}
                    </p>
                    )}
                    <label>Password</label>
                    <input {...register("password")} className='my-4 pl-2 border-2 border-gray-400' type='password' placeholder="Create your password"/>
                    {errors.password && (
                    <p className="text-red-500 mb-4">
                        {errors.password.message}
                    </p>
                    )}
                    <label>Confirm Password</label>
                    <input {...register("confirmPassword")} className='my-4 pl-2 border-2 border-gray-400' type='password' placeholder="Confirm your password"/>
                    {errors.confirmPassword && (
                    <p className="text-red-500 mb-4">
                        {errors.confirmPassword.message}
                    </p>
                    )}

                    <button type="submit" className="border-2 border-gray-400 w-max px-4 mx-auto cursor-pointer">Submit</button>
                </form>
            </div>
        </Skeleton>
        </>
    )
}

export default RegisterPage