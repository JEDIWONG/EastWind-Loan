import { useParams } from "react-router-dom";
import { useLoanDetails } from "../../hooks/useLoanDetails";
import ActivatedLoanTopSection from "../../components/loan/loan-details/ActivatedLoanTopSection";
import LoanDetailsHeader from "../../components/loan/loan-details/LoanDetailsHeader";
import LoadingOverlay from "../../components/generic/loading/LoadingOverlay";
import LoanDetailsPaymentScheduleSection from "../../components/loan/loan-details/LoanDetailsPaymentScheduleSection";

const LoanDetails = ()=>{
    const {id} = useParams();

    const {
        loanDetails,
        loading,
    } = useLoanDetails(id); 

    if(loading){
        return(
            <LoadingOverlay/>
        )
    }else 
        return(
            <>  
                <div className="grid grid-cols-1 gap-5 mx-10 my-5">
                    <LoanDetailsHeader loanData={loanDetails}/>
                    <ActivatedLoanTopSection loanData={loanDetails}/>
                    <LoanDetailsPaymentScheduleSection loanData={loanDetails}/>
                </div>
                
            </>
        )
}

export default LoanDetails; 