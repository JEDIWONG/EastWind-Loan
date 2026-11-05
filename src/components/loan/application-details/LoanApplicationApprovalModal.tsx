import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    TextField,
    Typography,
} from "@mui/material";
import { ddCurrency } from "../../../utils/data-format-helper";
import { calculateLoanRepayment } from "../../../utils/loan-calculation-helper";
import AppNumberField from "../../generic/form/AppNumberField";

interface LoanApplicationApprovalModalProps {
    open: boolean;
    onClose: () => void;
    onApprove: (data: {
        loan_approve_amount: number;
        loan_approve_interest_rate: number;
        loan_approve_tenure_month: number;
        loan_total_repayment: number;
        loan_monthly_repayment: number;
    }) => void;
    loanAmount: number;
    loanInterestRate: number;
    loanTenureMonth: number;
}

const LoanApplicationApprovalModal = ({
    open,
    onClose,
    onApprove,
    loanAmount,
    loanInterestRate,
    loanTenureMonth,
}: LoanApplicationApprovalModalProps) => {
    const [approvedAmount, setApprovedAmount] = useState(loanAmount);
    const [interestRate, setInterestRate] = useState(loanInterestRate);
    const [tenureMonth, setTenureMonth] = useState(loanTenureMonth);

    useEffect(() => {
        if (open) {
            setApprovedAmount(loanAmount);
            setInterestRate(loanInterestRate);
            setTenureMonth(loanTenureMonth);
        }
    }, [open, loanAmount, loanInterestRate, loanTenureMonth]);

    const {totalInterest,totalRepayment,monthlyRepayment} = calculateLoanRepayment(approvedAmount,interestRate,tenureMonth)

    const handleApprove = () => {
        onApprove({
            loan_approve_amount: approvedAmount,
            loan_approve_interest_rate: interestRate,
            loan_approve_tenure_month: tenureMonth,
            loan_total_repayment: totalRepayment,
            loan_monthly_repayment: monthlyRepayment,
        });
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            <DialogTitle>
                Approve Loan Application
            </DialogTitle>

            <DialogContent>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >
                    Review and adjust the loan terms before approving the application.
                </Typography>

                <Box className="flex flex-col gap-5">
                    <AppNumberField
                        label="Approved Loan Amount"
                        value={approvedAmount}
                        onChange={(e) =>
                            setApprovedAmount(Number(e.target.value))
                        }
                        fullWidth
                    />

                    <AppNumberField
                        label="Approved Interest Rate (%)"
                        value={interestRate}
                        onChange={(e) =>
                            setInterestRate(Number(e.target.value))
                        }
                        fullWidth
                        disabled
                    />

                    <AppNumberField
                        label="Approved Tenure (Months)"
                        value={tenureMonth}
                        onChange={(e) =>
                            setTenureMonth(Number(e.target.value))
                        }
                        fullWidth
                    />

                    <Divider />

                    <Box className="rounded-xl bg-slate-50 p-5">
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                        >
                            Repayment Summary
                        </Typography>

                        <Box className="mt-4 flex justify-between">
                            <Typography>Total Repayment</Typography>

                            <Typography>
                                {ddCurrency(totalRepayment)}
                            </Typography>
                        </Box>

                        <Box className="mt-4 flex justify-between">
                            <Typography>Total Interest</Typography>

                            <Typography>
                                {ddCurrency(totalInterest)}
                            </Typography>
                        </Box>

                        <Box className="mt-3 flex justify-between">
                            <Typography>Monthly Repayment</Typography>

                            <Typography>
                                {ddCurrency(monthlyRepayment)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3 }}>
                <Button
                    onClick={onClose}
                    color="inherit"
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    color="success"
                    onClick={handleApprove}
                >
                    Confirm Approval
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoanApplicationApprovalModal;