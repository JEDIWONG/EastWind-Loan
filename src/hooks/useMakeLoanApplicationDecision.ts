import { useState } from "react";
import { approveLoanApplication } from "../api/LoanApplicationAPI";

const useMakeLoanApplicationDecision = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const approveLoanApplicationDecision = async (
        loanId: string,
        loanApproveAmount: number,
        loanApproveInterestRate: number,
        loanApproveTenureMonth: number,
        loanTotalRepayment: number,
        loanMonthlyRepayment: number
    ) => {
        try {
            setLoading(true);
            setError(null);

            const response = await approveLoanApplication(
                loanId,
                loanApproveAmount,
                loanApproveInterestRate,
                loanApproveTenureMonth,
                loanTotalRepayment,
                loanMonthlyRepayment
            );

            return response;
        } catch (error) {
            console.error(
                "Failed to make loan application decision:",
                error
            );

            setError(
                "Failed to make loan application decision."
            );

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        approveLoanApplicationDecision,
        loading,
        error,
    };
};

export default useMakeLoanApplicationDecision;