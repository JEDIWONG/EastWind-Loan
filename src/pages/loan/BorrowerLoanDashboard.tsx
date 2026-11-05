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
            <div className="mx-20 my-10 min-h-screen">
                <SectionTitle
                    title="My Loans"
                    desc="Overview of all your loans"
                />

                <LoanCardList loanData={loanList} />
            </div>
        </>
    );
};

export default BorrowerLoanDashboard;