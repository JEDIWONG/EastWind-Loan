import { Outlet } from "react-router-dom";
import Header from "./Header";


const LenderLayout = ()=>{
    return(
        <>  
            <div>
                <Header/>
                <Outlet/>
            </div>
            
        </>
    )
}

export default LenderLayout; 