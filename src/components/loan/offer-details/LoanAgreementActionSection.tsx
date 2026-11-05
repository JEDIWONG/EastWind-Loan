import {
    CheckCircleOutlined,
    CancelOutlined,
    RateReviewOutlined,
} from "@mui/icons-material";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { useState } from "react";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";
import ConfirmationModal from "../../generic/modal/confirmation_modal";
import { acceptLoanOffer, rejectLoanOffer } from "../../../api/loanApi";
import { getUserTypeId } from "../../../auth/session";

const LoanAgreementActionSection = ({ loan }) => {
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [action, setAction] = useState<"accept" | "reject" | null>(null);

    const userTypeId = getUserTypeId();

    const isAccepted = !!loan.loan_accept_date;
    
    const isBorrower = userTypeId === 2;
    const isLender = userTypeId === 3;


    const openConfirmation = (
        selectedAction: "accept" | "reject"
    ) => {
        setAction(selectedAction);
        setConfirmationOpen(true);
    };

    const closeConfirmation = () => {
        setConfirmationOpen(false);
        setAction(null);
    };

    const handleConfirm = async () => {
        if (!action) return;

        try {
            if (action === "accept") {
                await acceptLoanOffer(loan.id);
            } else {
                await rejectLoanOffer(loan.id);
            }

            closeConfirmation();
        
        } catch (error) {
            console.error("Failed to update loan offer:", error);
        }
    };

    return (
        <>
            <Grid size={{ xs: 12 }}>
                <Paper
                    elevation={0}
                    sx={{
                        border: "1px solid #e5e7eb",
                        borderRadius: 3,
                        p: 3,
                    }}
                >
                    <div className="flex justify-between items-center">
                        <CardSectionHeader
                            icon={<RateReviewOutlined />}
                            title="Loan Offer Decision"
                            subtitle="Review the loan offer before making a decision."
                            iconBackgroundClassName="bg-blue-50"
                            iconClassName="text-blue-600"
                        />

                        {isLender && (
                            <Paper
                                elevation={0}
                                sx={{
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 2,
                                    px: 3,
                                    py: 2,
                                    minWidth: 220,
                                    textAlign: "center",
                                    backgroundColor: isAccepted ? "#f0fdf4" : "#f9fafb",
                                }}
                            >
                                {isAccepted ? (
                                    <>
                                        <Typography
                                            variant="body1"
                                            color="success.main"
                                        >
                                            Loan Offer Accepted
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{ mt: 0.5 }}
                                        >
                                            Accepted on {loan.loan_accept_date}
                                        </Typography>
                                    </>
                                ) : (
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        Awaiting Borrower Decision
                                    </Typography>
                                )}
                            </Paper>
                        )}

                        {isBorrower && (
                            <div className="flex items-center gap-5">
                                {isAccepted && (
                                    <Typography
                                        variant="body2"
                                        color="success.main"
                                    >
                                        Accepted on {loan.loan_accept_date}
                                    </Typography>
                                )}

                                <Button
                                    variant="outlined"
                                    color="error"
                                    startIcon={<CancelOutlined />}
                                    onClick={() =>
                                        openConfirmation("reject")
                                    }
                                    disabled={isAccepted}
                                >
                                    Reject Offer
                                </Button>

                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<CheckCircleOutlined />}
                                    onClick={() =>
                                        openConfirmation("accept")
                                    }
                                    disabled={isAccepted}
                                >
                                    Accept Offer
                                </Button>
                            </div>
                        )}
                    </div>
                </Paper>
            </Grid>

            {confirmationOpen && (
                <ConfirmationModal
                    title={
                        action === "accept"
                            ? "Are you sure you want to accept this loan offer?"
                            : "Are you sure you want to reject this loan offer?"
                    }
                    confirmText={
                        action === "accept"
                            ? "Accept Offer"
                            : "Reject Offer"
                    }
                    onConfirm={handleConfirm}
                    onCancel={closeConfirmation}
                />
            )}
        </>
    );
};

export default LoanAgreementActionSection;