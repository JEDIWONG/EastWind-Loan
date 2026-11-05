import { Paper } from "@mui/material";
import InfoRow from "../../generic/InfoRow";
import { ddInterestRate } from "../../../utils/data-format-helper";
import { AccountBalanceRounded } from "@mui/icons-material";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";

interface LoanApplicationProductInfoCardProps {
    loanApplication: any;
}

const LoanApplicationProductInfoCard = ({
    loanApplication,
}: LoanApplicationProductInfoCardProps) => {
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
                icon={<AccountBalanceRounded/>}
                title="Product Info"
                subtitle="View the loan product selected for this application"
                iconBackgroundClassName="bg-green-100"
                iconClassName="text-green-500"
            />

            <InfoRow
                label="Product Name"
                value={loanApplication.loan_product_name}
            />

            <InfoRow
                label="Loan Type"
                value={loanApplication.loan_type_name}
            />

            <InfoRow
                label="Lender"
                value={loanApplication.lender_name}
            />

            <InfoRow
                label="Interest Rate"
                value={ddInterestRate(
                    loanApplication.loan_interest_rate
                )}
            />
        </Paper>
    );
};

export default LoanApplicationProductInfoCard;