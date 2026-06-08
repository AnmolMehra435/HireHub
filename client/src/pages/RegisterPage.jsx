import Skeleton from "@/components/layout/Skeleton"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import useUIStore from "@/store/uiStore"
import { Helmet } from "react-helmet-async"

const formSchema = z.object({
    username : z.string().min(2, {message: "Username should be greator than 2 characters"}),
    email: z.email("Please enter a valid email"),
    password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*]).+$/, "password must contain at least one number and one special character"),
    confirmPassword: z.string(),
    role: z.enum(["candidate", "employer"], {
        message: "Please select a role",
    }),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"]
})


function RegisterPage(){
    const { register, handleSubmit, reset, formState: { errors } } = useForm({resolver: zodResolver(formSchema), });

    const addNotification = useUIStore((state) => state.addNotification)

    const onSubmit = (data) => {
        console.log(data);
        addNotification(
            "Account created successfull!",
            "success"
        )
        reset();
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

                    <div className="mb-4 mx-auto border-2 border-gray-500">
                        <select id="role" {...register('role')} defaultValue="">
                            <option value="" disabled>
                                Select your role
                            </option>
                            <option value='candidate'>
                                Candidate
                            </option>
                            <option value="employer">
                                Employer
                            </option>
                        </select>
                    </div>
                    {errors.role && (<p className="text-red-500 mb-4">{errors.role.message}</p>)}
                    
                    <button type="submit" className="border-2 border-gray-400 w-max px-4 mx-auto cursor-pointer">Submit</button>
                </form>
            </div>
        </Skeleton>
        </>
    )
}

export default RegisterPage