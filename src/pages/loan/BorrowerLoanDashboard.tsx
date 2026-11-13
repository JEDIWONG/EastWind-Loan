import SectionTitle from "../../components/generic/typography/SectionTitle";
import LoadingOverlay from "../../components/generic/loading/LoadingOverlay";
import { useBorrowerLoanList } from "../../hooks/useBorrowerLoanList";
import LoanCardList from "../../components/loan/loan-list/LoanCardList";

const BorrowerLoanDashboard = () => {
    const {
        loanList,
        loading,
    } = useBorrowerLoanList();

    if (loading) {
        return <LoadingOverlay />;
    }

    return (
        <>

            <div className="my-10 min-h-screen">
                <div className="mx-10">
                    <SectionTitle
                        title="My Loans"
                        desc="Overview of all your loans"
                    />
                </div>

                <div className="mx-0 my-10 ">
                    <LoanCardList loanData={loanList} />
                </div>
            </div>
           
        </>
    );
};

export default BorrowerLoanDashboard;