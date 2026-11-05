import { useState } from "react";
import { createLoanDisbursement } from "../api/LoanDisbursementAPI";

export const useCreateLoanDisbursement = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const disburseLoans = async (loanIds: string[]) => {
        try {
            setLoading(true);
            setError(null);

            const response = await createLoanDisbursement(loanIds);

            return response;
        } catch (error) {
            console.error("Failed to create loan disbursement:", error);
            setError("Failed to create loan disbursement.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        disburseLoans,
        loading,
        error,
    };
};