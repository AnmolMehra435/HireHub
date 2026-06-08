import Navbar from './Navbar'
import Footer from './Footer';

function Skeleton({children}){
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