import Skeleton from '../components/layout/Skeleton'
import { Helmet } from 'react-helmet-async'

function HomePage(){
    return(
        <>
        <Helmet>
            <title>Home</title>
        </Helmet>
            <Skeleton>
                <div className="flex justify-center items-center h-screen">
                    <h1 className='text-4xl text-blue-500'>Hello world</h1>
                </div>
            </Skeleton>
        </>
    )
}

export default HomePage