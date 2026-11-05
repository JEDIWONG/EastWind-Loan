import { useEffect, useState } from "react";
import type { LoanApplication } from "../schemas/loanSchema";
import { getLoanApplicationDetailsByID } from "../api/loanApi";

export const useLoanApplicationDetails = (id?: string) => {
    const [loanApplication, setLoanApplication] = useState<LoanApplication | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchLoanApplicationDetails = async () => {
            try {
                setLoading(true);

                const response = await getLoanApplicationDetailsByID(id);

                if (response.success && response.data.length > 0) {
                    setLoanApplication(response.data[0]);
                } else {
                    setLoanApplication(null);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch loan application details:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLoanApplicationDetails();
    }, [id]);

    return {
        loanApplication,
        loading,
    };
};