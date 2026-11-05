import { useState } from "react";
import { createLoanRepaymentPayment } from "../api/paymentApi";

const useCreateLoanRepaymentPayment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createPayment = async (
        loanRepaymentId: string,
        paymentMethodId: number
    ) => {
        try {
            setLoading(true);
            setError(null);

            const response = await createLoanRepaymentPayment(
                loanRepaymentId,
                paymentMethodId
            );

            return response;
        } catch (error) {
            console.error(
                "Failed to create loan repayment payment:",
                error
            );

            setError("Failed to create loan repayment payment.");
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return {
        createPayment,
        loading,
        error,
    };
};

export default useCreateLoanRepaymentPayment;