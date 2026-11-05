import { useEffect, useState } from "react";
import type { LoanDetails } from "../schemas/loanSchema";
import {getLoanDetailsById } from "../api/loanApi";

export const useLoanDetails = (id?: string) => {
    const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) {
            setLoading(false);
            return;
        }

        const fetchLoanDetails = async () => {
            try {
                setLoading(true);

                const response = await getLoanDetailsById(id);
                
                if (response.success && response.data.length > 0) {
                    setLoanDetails(response.data[0]);
                } else {
                    setLoanDetails(null);
                }
            } catch (error) {
                console.error(
                    "Failed to fetch loan details:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchLoanDetails();
    }, [id]);

    return {
        loanDetails,
        loading,
    };
};