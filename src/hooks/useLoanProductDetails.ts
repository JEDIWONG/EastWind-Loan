import { useCallback, useEffect, useState } from "react";
import type { LoanProduct } from "../schemas/LoanProductSchema";
import { getLoanProductById } from "../api/LoanProductApi";

const useLoanProductDetails = (
    loanProductId: number | null
) => {
    const [loanProduct, setLoanProduct] =
        useState<LoanProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLoanProductDetails = useCallback(async () => {
        if (loanProductId === null) {
            setLoanProduct(null);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const response = await getLoanProductById(
                loanProductId
            );

            if (response.success) {
                setLoanProduct(response.data);
            } else {
                setLoanProduct(null);
                setError(
                    response.message ??
                        "Failed to load loan product."
                );
            }
        } catch (error) {
            console.error(
                "Failed to fetch loan product details:",
                error
            );

            setLoanProduct(null);
            setError("Failed to load loan product details.");
        } finally {
            setLoading(false);
        }
    }, [loanProductId]);

    useEffect(() => {
        fetchLoanProductDetails();
    }, [fetchLoanProductDetails]);

    return {
        loanProduct,
        loading,
        error,
        refetch: fetchLoanProductDetails,
    };
};

export default useLoanProductDetails;