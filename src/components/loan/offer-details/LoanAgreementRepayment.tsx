import { PaymentsRounded } from "@mui/icons-material";
import { Paper } from "@mui/material";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";
import InfoRow from "../../generic/InfoRow";
import { ddCurrency } from "../../../utils/data-format-helper";

const LoanAgreementRepayment = ({ loan }) => {
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
                title="Repayment Terms"
                subtitle="Repayment schedule"
                icon={<PaymentsRounded />}
                iconBackgroundClassName="bg-green-50"
                iconClassName="text-green-600"
            />

            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-x-8">
                <InfoRow
                    label="Frequency"
                    value="Monthly"
                />

                <InfoRow
                    label="Monthly Payment"
                    value={ddCurrency(loan.loan_monthly_repayment)}
                />

                <InfoRow
                    label="Number of Payments"
                    value={`${loan.loan_approve_tenure_month}`}
                />
            </div>
        </Paper>
    );
};

export default LoanAgreementRepayment;