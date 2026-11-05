import { useCallback, useEffect, useState } from "react";
import { getLoanListByBorrowerId } from "../api/loanApi";
import type { BorrowerLoan } from "../schemas/loanSchema";

export const useBorrowerLoanList = () => {
    const [loanList, setLoanList] = useState<BorrowerLoan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLoanList = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getLoanListByBorrowerId();

            if (response.success) {
                setLoanList(response.data);
            } else {
                setLoanList([]);
            }
        } catch (error) {
            console.error("Failed to fetch borrower loan list:", error);
            setError("Failed to load borrower loan list.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLoanList();
    }, [fetchLoanList]);

    return {
        loanList,
        loading,
        error,
        refetch: fetchLoanList,
    };
};