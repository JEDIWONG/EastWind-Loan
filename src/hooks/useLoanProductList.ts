import { useCallback, useEffect, useState } from "react";
import type { LoanProduct } from "../schemas/LoanProductSchema";
import { offsetAmount } from "../utils/loan-calculation-helper";
import { matchLoanProducts } from "../api/LoanProductApi";

interface UseLoanProductListProps {
    amount?: number;
    tenure_month?: number;
    loan_type_id?: number;
    max_interest_rate?: number | null;
    lender_id?: number | null;
    monthly_salary?: number | null;
}

const useLoanProductList = ({
    amount,
    tenure_month,
    loan_type_id,
    max_interest_rate,
    lender_id,
    monthly_salary,
}: UseLoanProductListProps) => {
    const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLoanProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await matchLoanProducts(
                amount != null ? offsetAmount(amount) : undefined,
                tenure_month,
                loan_type_id,
                max_interest_rate != null
                    ? offsetAmount(max_interest_rate)
                    : undefined,
                lender_id ?? undefined,
                monthly_salary != null
                    ? offsetAmount(monthly_salary)
                    : undefined
            );

            setLoanProducts(
                Array.isArray(response.data) ? response.data : []
            );
        } catch (error) {
            console.error("Failed to fetch loan products:", error);
            setLoanProducts([]);
            setError("Failed to fetch loan products.");
        } finally {
            setLoading(false);
        }
    }, [
        amount,
        tenure_month,
        loan_type_id,
        max_interest_rate,
        lender_id,
        monthly_salary,
    ]);

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

export default useLoanProductList;