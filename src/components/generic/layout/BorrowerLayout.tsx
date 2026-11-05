import { Outlet } from "react-router-dom";
import Footer from "../../Footer";
import BorrowerSidebar from "../sidebar/BorrowerSidebar";


const BorrowerLayout = ()=>{
    return(
        <>
            <BorrowerSidebar/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default BorrowerLayout; 