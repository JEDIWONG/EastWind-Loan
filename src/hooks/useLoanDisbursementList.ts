import { useEffect, useState } from "react";
import { getLoanDisbursementListByLenderId } from "../api/loanApi";
import type { LoanDisbursement } from "../schemas/loanSchema";

export const useLoanDisbursementList = (statusName?: string) => {
    const [loanDisbursement, setLoanDisbursement] = useState<LoanDisbursement[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLoanDisbursement = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getLoanDisbursementListByLenderId(statusName);

            if (response.success) {
                setLoanDisbursement(response.data);
            } else {
                setLoanDisbursement([]);
            }
        } catch (error) {
            console.error("Failed to fetch loan disbursement list:", error);
            setError("Failed to load loan disbursement list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoanDisbursement();
    }, [statusName]);

    return {
        loanDisbursement,
        loading,
        error,
        refetch:fetchLoanDisbursement,
    };
};