import { Box, LinearProgress, Paper, Typography } from "@mui/material";
import type { LoanDetails } from "../../../schemas/loanSchema";
import InfoCard from "../../generic/card/InfoCard";
import { ddCurrency, ddDate } from "../../../utils/data-format-helper";
import LoanStatusChip from "../chip/LoanStatusChip";
import CopyableText from "../../generic/CopyableText";

interface LoanDetailsHeaderProps {
    loanData: LoanDetails;
}

const LoanDetailsHeader = ({ loanData }: LoanDetailsHeaderProps) => {
    const paidInstallments = Math.max(
        0,
        Number(loanData.loan_paid_installment_count) || 0
    );

    const totalInstallments = Math.max(
        0,
        Number(
                loanData.loan_approve_tenure_month
        ) || 0
    );

    const progress =
        totalInstallments > 0
            ? Math.min(
                  100,
                  Math.max(
                      0,
                      (paidInstallments / totalInstallments) * 100
                  )
              )
            : 0;

    return (
        <Paper
            elevation={0}
            sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                p: { xs: 2, sm: 3 },
            }}
        >
            <Box className="flex flex-wrap items-center justify-between">
                <Box>
                    <Typography
                        variant="h6"
                    >
                        {loanData.loan_product_name}
                    </Typography>

                    <CopyableText label="ID :" value={loanData.id} variant="caption"/>
                </Box>

                <LoanStatusChip status={loanData.loan_status_name} />
            </Box>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                <InfoCard
                    label="Outstanding Principal"
                    value={ddCurrency(
                        loanData.loan_outstanding_principal
                    )}
                />

                <InfoCard
                    label="Total Paid"
                    value={ddCurrency(
                        loanData.loan_total_paid_amount
                    )}
                />

                <InfoCard
                    label="Next Payment Date"
                    value={
                        loanData.loan_next_payment_date
                            ? ddDate(loanData.loan_next_payment_date)
                            : "-"
                    }
                />

                <InfoCard
                    label="Mature Date"
                    value={
                        loanData.loan_mature_date
                            ? ddDate(loanData.loan_mature_date)
                            : "-"
                    }
                />
            </div>

            <Box className="mt-7">
                <Box className="mb-2 flex flex-wrap  justify-between gap-2">
                    <Box>
                        <Typography
                            variant="subtitle2"
                        >
                            Repayment Progress
                        </Typography>
                    </Box>

                    <Box className="text-right">
                        <Typography
                            variant="body2"
                        >
                            {paidInstallments} of {totalInstallments}
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {progress.toFixed(0)}% completed
                        </Typography>
                    </Box>
                </Box>

                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: "#f3f4f6",
                        "& .MuiLinearProgress-bar": {
                            borderRadius: 5,
                            backgroundColor: "#eab308",
                        },
                    }}
                />
            </Box>
        </Paper>
    );
};

export default LoanDetailsHeader;
