import { Alert } from "@mui/material";
import { useLoanOfferDetails } from "../../hooks/useLoanOfferDetails";
import LoanAgreementHeader from "../../components/loan/offer-details/LoanAgreementHeader";
import LoanAgreementParties from "../../components/loan/offer-details/LoanAgreementParties";
import LoanAgreementLoanDetails from "../../components/loan/offer-details/LoanAgreementLoanDetails";
// import LoanAgreementRepayment from "../../components/loan/offer-details/LoanAgreementRepayment";
import LoanAgreementTerms from "../../components/loan/offer-details/LoanAgreementTerm";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../components/generic/loading/LoadingOverlay";
import LoanAgreementActionSection from "../../components/loan/offer-details/LoanAgreementActionSection";

const LoanOfferDetails = () => {

    const {id} = useParams();

    const { loanOfferDetails, loading, error } = useLoanOfferDetails(id);

    if (loading) {
        return (
            <LoadingOverlay/>
        );
    }

    if (error || !loanOfferDetails) {
        return (
            <Alert severity="error">
                Failed to load loan agreement.
            </Alert>
        );
    }

    return (
        <div className="mx-20 my-10 grid grid-cols-1 gap-5">
            <LoanAgreementHeader loan={loanOfferDetails} />

            <LoanAgreementParties loan={loanOfferDetails} />

            <LoanAgreementLoanDetails loan={loanOfferDetails} />

            {/* <LoanAgreementRepayment loan={loanOfferDetails} /> */}

            <LoanAgreementTerms />

            <LoanAgreementActionSection loan={loanOfferDetails}/>
        </div>
    );
};

export default LoanOfferDetails;