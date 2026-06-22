import Skeleton from '../components/layout/Skeleton'
import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'

function HomePage(){

    const navigate = useNavigate();

    const redirectJobs = () => {
        navigate("/jobs")
    }


    return(
        <>
        <Helmet>
            <title>Home</title>
        </Helmet>
            <Skeleton>
                <div className="flex flex-col justify-center items-center h-full bg-[#ABC8C7] rounded-lg px-4 py-4">
                    <div className='hero-section bg-[#ABC8C7] w-full rounded-lg p-8 text-center'>
                        <h1 className='mb-10 text-4xl font-sans'>Find your Dream Job Today</h1>
                        <p className='text-xl font-sans'>Connect with top companies and discover</p>
                        <p className='text-xl font-sans mb-10'>Opportunities that match your skills.</p>
                        <div className='mx-auto flex'>
                            <Button className="cursor-pointer" onClick={redirectJobs}>Browse Jobs</Button>
                            <Button className="ml-10 cursor-pointer">Post Jobs</Button>
                        </div>
                    </div>
                    <div className='work-section bg-[#ABC8C7] w-full rounded-lg py-8 px-4 flex gap-4 lg:gap-10 flex-wrap md:flex-nowrap'>
                        <div className='candidate-section w-full md:w-3/4 p-4 text-center bg-[#B8E2C8] rounded-xl'>
                            <h1 className='text-2xl font-semibold mb-4'>Get Jobs</h1>
                            <h1 className='text-lg mb-2'>1. Create Profile</h1>
                            <p className='mb-2'>Build your professional profile
                            and showcase your skills.</p>
                            <h2 className='text-lg mb-2'>2.Apply Jobs</h2>
                            <p className='mb-2'>Browse opportunities and
                            apply with one click.</p>
                            <h2 className='text-lg mb-2'>3.Get Hired</h2>
                            <p className='mb-2'>Connect with employers and
                            start your career.</p>
                            <Button>Login</Button>
                        </div>
                        <div className='employer-section w-full md:w-3/5 p-4 py-10 text-center bg-[#B8E2C8] rounded-xl my-auto '>
                            <h1 className='text-2xl font-semibold mb-6'>Get Employee</h1>
                            <h1 className='text-xl font-helvetica'>Hire Top Talent</h1>
                            <p className='text-lg my-4'>Post jobs, review applicants,
                            and hire the best candidates.</p>
                            <Button>Post a Job</Button>
                        </div>
                    </div>
                    <div className='stats-section bg-[#B0A1BA] w-4/5 p-8 text-center text-2xl text-serif flex flex-col gap-4 rounded-2xl mb-10'>
                        <h1>10,000+ Jobs Posted</h1>
                        <h1>5,000+ Candidates</h1>
                        <h1>500+ Companies</h1>
                        <h1>95% Success Rate</h1>
                    </div>
                </div>
            </Skeleton>
        </>
    )
}

export default HomePage