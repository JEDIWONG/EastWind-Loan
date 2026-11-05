import { useEffect, useState } from "react";
import type { LoanApplication } from "../schemas/loanSchema";
import { getLoanApplicationByBorrowerId, getLoanApplicationByLenderId } from "../api/loanApi";
import { getUserTypeId } from "../auth/session";

export const useLoanApplications = (filterName?: string) => {
    const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userTypeId = getUserTypeId();

    useEffect(() => {
        const fetchLoanApplications = async () => {
            try {
                setLoading(true);
                setError(null);

                const response =
                    userTypeId === 2
                        ? await getLoanApplicationByBorrowerId()
                        : await getLoanApplicationByLenderId(filterName);

                if (response.success) {
                    setLoanApplications(response.data);
                } else {
                    setLoanApplications([]);
                }
            } catch (error) {
                console.error("Failed to fetch loan applications:", error);
                setError("Failed to load loan applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchLoanApplications();
    }, [userTypeId, filterName]);

    return {
        loanApplications,
        loading,
        error,
        userTypeId,
    };
};