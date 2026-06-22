import Navbar from './Navbar'
import Footer from './Footer';
import useSocket from '@/hooks/useSocket';

function Skeleton({children}){
    useSocket()
    return(
        <>
            <Navbar/>
            <div className="min-h-screen w-9/10 flex flex-col mx-auto my-10">
                {children}
            </div>
            <Footer/>
        </>
    )
}

export default Skeleton