import {
    CheckCircleOutlined,
    CancelOutlined,
    RateReviewOutlined,
} from "@mui/icons-material";
import { Button, Grid, Paper } from "@mui/material";
import LoanApplicationApprovalModal from "./LoanApplicationApprovalModal";
import { useState } from "react";
import { useRouteHelper } from "../../../utils/route-helper";
import CardSectionHeader from "../../generic/typography/CardSectionHeader";
import useMakeLoanApplicationDecision from "../../../hooks/useMakeLoanApplicationDecision";

const LoanApplicationReviewSection = ({
    loanApplication,
}) => {
    const [approvalModalOpen, setApprovalModalOpen] = useState(false);
    const { navToLoanApplicationDashboard } = useRouteHelper();

    const {
        approveLoanApplicationDecision,
        loading,
    } = useMakeLoanApplicationDecision();

    const applicationStatus = loanApplication.application_status_name?.toUpperCase();
    const isDecisionMade = applicationStatus === "APPROVED" || applicationStatus === "REJECTED";

    const openApprovalModal = () => {
        if (isDecisionMade || loading) return;

        setApprovalModalOpen(true);
    };

    const submitApprove = async (approveLoanTerms) => {
        try {
            const response =
                await approveLoanApplicationDecision(
                    loanApplication.loan_id,
                    approveLoanTerms.loan_approve_amount,
                    approveLoanTerms.loan_approve_interest_rate,
                    approveLoanTerms.loan_approve_tenure_month,
                    approveLoanTerms.loan_total_repayment,
                    approveLoanTerms.loan_monthly_repayment
                );

            if (response.success) {
                setApprovalModalOpen(false);
                navToLoanApplicationDashboard();
            }
        } catch (error) {
            console.error(
                "Failed to submit loan application approval:",
                error
            );
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
                            title="Loan Review Decision"
                            subtitle="Review the application before making a decision."
                            iconBackgroundClassName="bg-blue-50"
                            iconClassName="text-blue-600"
                        />

                        <div className="flex gap-5">
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<CancelOutlined />}
                                disabled={isDecisionMade || loading}
                            >
                                Reject Application
                            </Button>

                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleOutlined />}
                                onClick={openApprovalModal}
                                disabled={isDecisionMade || loading}
                            >
                                {loading
                                    ? "Processing..."
                                    : "Approve Application"}
                            </Button>
                        </div>
                    </div>
                </Paper>
            </Grid>

            <LoanApplicationApprovalModal
                open={approvalModalOpen}
                onClose={() => setApprovalModalOpen(false)}
                loanAmount={Number(loanApplication.loan_amount)}
                loanInterestRate={Number(loanApplication.loan_interest_rate)}
                loanTenureMonth={Number(loanApplication.loan_tenure_month)}
                onApprove={submitApprove}
            />
        </>
    );
};

export default LoanApplicationReviewSection;
