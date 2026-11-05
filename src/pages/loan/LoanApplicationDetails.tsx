import { useParams } from "react-router-dom";
import {
    Alert,
    Box,
    CircularProgress,
} from "@mui/material";
import LoanApplicationReviewSection from "../../components/loan/application-details/LoanApplicationReviewSection";
import ApplicantDetailSection from "../../components/loan/application-details/ApplicantDetailSection";
import LoanApplicationTopSection from "../../components/loan/application-details/LoanApplicationTopSection";
import LoanApplicationDetailHeader from "../../components/loan/application-details/LoanApplicationDetailHeader";
import LoanAIReviewSection from "../../components/loan/application-review/LoanAIReviewSection";
import { useLoanApplicationDetails } from "../../hooks/useLoanApplicationDetails";
import { getUserTypeId } from "../../auth/session";

const LoanApplicationDetails = () => {
    const { id } = useParams();

    const userTypeId = getUserTypeId();
    const isReviewer = userTypeId === 3;

    const {loanApplication,loading} = useLoanApplicationDetails(id);

    if (loading) {
        return (
            <Box className="flex min-h-screen items-center justify-center">
                <CircularProgress />
            </Box>
        );
    }

    if (!loanApplication) {
        return (
            <Box className="m-10">
                <Alert severity="error">
                    Loan application not found.
                </Alert>
            </Box>
        );
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-5 mx-10 my-10">
                <LoanApplicationDetailHeader loanApplication={loanApplication}/>

                <LoanApplicationTopSection loanApplication={loanApplication}/>
                <ApplicantDetailSection loanApplication={loanApplication}/>

                {isReviewer && (
                    <>
                        <LoanAIReviewSection
                            loanApplication={loanApplication}                        
                        />
                        <LoanApplicationReviewSection 
                            loanApplication={loanApplication}                                        
                        />
                    </>
                )}
            </div>
        </>
    );
};

export default LoanApplicationDetails;