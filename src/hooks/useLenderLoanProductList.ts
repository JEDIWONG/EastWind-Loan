import { useCallback, useEffect, useState } from "react";
import type { LoanProduct } from "../schemas/LoanProductSchema";
import { viewLoanProductsByLenderID } from "../api/LoanProductApi";

const useLenderLoanProductList = () => {
    const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLoanProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await viewLoanProductsByLenderID();

            setLoanProducts(response.data);
        } catch (error) {
            console.error("Failed to fetch lender loan products:", error);
            setLoanProducts([]);
            setError("Failed to fetch loan products.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLoanProducts();
    }, [fetchLoanProducts]);

    return {
        loanProducts,
        loading,
        error,
        refetch: fetchLoanProducts,
    };
};

export default useLenderLoanProductList;