import SectionTitle from "../../components/generic/typography/SectionTitle";
import LoadingOverlay from "../../components/generic/loading/LoadingOverlay";
import { useBorrowerLoanList } from "../../hooks/useBorrowerLoanList";
import LoanCardList from "../../components/loan/loan-list/LoanCardList";
import { Button } from "@mui/material";
import { useRouteHelper } from "../../utils/route-helper";

const BorrowerLoanDashboard = () => {
    const {
        loanList,
        loading,
    } = useBorrowerLoanList();

    const {navToFindLoan} = useRouteHelper();

    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <>
            <div className="my-10 min-h-screen">
                <div className="flex mx-10 items-center justify-between">
                    <SectionTitle
                        title="My Loans"
                        desc="Overview of all your loans"
                    />
                    
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navToFindLoan()}

                    >
                        Get a Loan
                    </Button>
                </div>

                <div className="mx-0 my-10 ">
                    <LoanCardList loanData={loanList} />
                </div>
            </div>
           
        </>
    );
};

export default BorrowerLoanDashboard;