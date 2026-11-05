import { Paper } from "@mui/material";
import InfoRow from "../../generic/InfoRow";
import { ddCurrency, formatTenureWithMonth } from "../../../utils/data-format-helper";
import { PaymentRounded } from "@mui/icons-material";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";

interface BorrowerLoanRequestCardProps {
    loanApplication: any;
}

const BorrowerLoanRequestCard = ({
    loanApplication,
}: BorrowerLoanRequestCardProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                p: 3,
                height: "100%",
            }}
        >
            <CardSectionHeader 
                title="Application Request"
                subtitle="Review the borrower's requested loan details"
                icon={<PaymentRounded/>}
                iconBackgroundClassName="bg-purple-50"
                iconClassName="text-purple-600"
            />
        
            <InfoRow
                label="Reqeusted Loan Amount"
                value={ddCurrency(loanApplication.loan_amount)}
            />

            <InfoRow
                label="Requested Tenure"
                value={`${formatTenureWithMonth(loanApplication.loan_tenure_month)} (${loanApplication.loan_tenure_month} Months)`}
            />

            <InfoRow
                label="Application Purpose"
                value={loanApplication.loan_purpose || "-"}
            />
        </Paper>
    );
};

export default BorrowerLoanRequestCard;