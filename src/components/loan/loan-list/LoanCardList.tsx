import LoanCard from "./LoanCard";

const LoanCardList = ({ loanData }) => {
    return (
        <div className="grid grid-cols-1 gap-5">
            {loanData.map((loan) => (
                <LoanCard
                    key={loan.loan_id}
                    loan={loan}
                />
            ))}
        </div>
    );
};

export default LoanCardList;