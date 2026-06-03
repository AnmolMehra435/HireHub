import Navbar from './Navbar'
import Footer from './Footer';

function Skeleton({children}){
    return(
        <>
            <Navbar/>
            <div className="min-h-screen flex flex-col">
                {children}
            </div>
            <Footer/>
        </>
    )
}

export default Skeleton