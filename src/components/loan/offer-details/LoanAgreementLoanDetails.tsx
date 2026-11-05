import { BusinessCenterRounded } from "@mui/icons-material";
import { Paper } from "@mui/material";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";
import InfoRow from "../../generic/InfoRow";
import { ddCurrency, ddInterestRate } from "../../../utils/data-format-helper";

const LoanAgreementLoanDetails = ({ loan }) => {
    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 2,
                p: 2,
            }}
        >
            <CardSectionHeader
                title="Loan Details"
                subtitle="Agreed loan terms"
                icon={<BusinessCenterRounded />}
                iconBackgroundClassName="bg-purple-50"
                iconClassName="text-purple-600"
            />

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <InfoRow
                    label="Loan Product"
                    value={loan.loan_product_name}
                />

                <InfoRow
                    label="Approved Amount"
                    value={ddCurrency(loan.loan_approve_amount)}
                />

                <InfoRow
                    label="Interest Rate"
                    value={ddInterestRate(loan.loan_approve_interest_rate)}
                />

                <InfoRow
                    label="Loan Tenure"
                    value={`${loan.loan_approve_tenure_month} months`}
                />

                <InfoRow
                    label="Total Repayment"
                    value={ddCurrency(loan.loan_total_repayment)}
                />

                <InfoRow
                    label="Monthly Repayment"
                    value={ddCurrency(loan.loan_monthly_repayment)}
                />

                <InfoRow
                    label="Agreement Date"
                    value={loan.loan_approve_date}
                />
            </div>
        </Paper>
    );
};

export default LoanAgreementLoanDetails;