import { useEffect, useState } from "react";
import type {LoanOfferDetails } from "../schemas/loanSchema";
import { getLoanOfferDetailsById } from "../api/loanApi";

export const useLoanOfferDetails = (id:string) => {
    const [loanOfferDetails, setLoanOfferDetails] = useState<LoanOfferDetails[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLoanOfferDetails = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getLoanOfferDetailsById(id);
                
                if (response.success) {
                    setLoanOfferDetails(response.data[0]);
                }
            } catch (error) {
                console.error("Failed to fetch loan offer details:", error);
                setError("Failed to load loan offer details.");
            } finally {
                setLoading(false);
            }
        };

        fetchLoanOfferDetails();
    }, []);

    return {
        loanOfferDetails,
        loading,
        error,
    };
};