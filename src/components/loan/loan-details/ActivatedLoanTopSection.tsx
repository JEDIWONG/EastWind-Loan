import {
    PaymentsRounded,
} from "@mui/icons-material";
import { Paper } from "@mui/material";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";
import InfoRow from "../../generic/InfoRow";
import {
    ddCurrency,
    ddInterestRate,
} from "../../../utils/data-format-helper";
import type { LoanDetails } from "../../../schemas/loanSchema";

interface ActivatedLoanTopSectionProps {
    loanData: LoanDetails;
}

const ActivatedLoanTopSection = ({
    loanData,
}: ActivatedLoanTopSectionProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
                    title="Payment Terms"
                    subtitle=""
                    icon={<PaymentsRounded />}
                    iconBackgroundClassName="bg-green-50"
                    iconClassName="text-green-600"
                />

                <InfoRow
                    label="Amount"
                    value={ddCurrency(
                        loanData.loan_approve_amount
                    )}
                />

                <InfoRow
                    label="Interest Rate"
                    value={ddInterestRate(
                        loanData.loan_approve_interest_rate
                    )}
                />

                <InfoRow
                    label="Tenure"
                    value={`${loanData.loan_approve_tenure_month} months`}
                />

                <InfoRow
                    label="Total Repayment"
                    value={ddCurrency(
                        loanData.loan_total_repayment
                    )}
                />

                <InfoRow
                    label="Monthly Repayment"
                    value={ddCurrency(
                        loanData.loan_monthly_repayment
                    )}
                />
            </Paper>
        </div>
    );
};

export default ActivatedLoanTopSection;