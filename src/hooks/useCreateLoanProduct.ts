import { useCallback, useEffect, useState } from "react";
import type { UseFormReset } from "react-hook-form";
import axios from "axios";
import type { LoanProduct } from "../schemas/LoanProductSchema";
import {
    getLoanProductById,
    createLoanProduct,
    updateLoanProduct,
} from "../api/LoanProductApi";

const useCreateLoanProduct = (
    loanProductId: number | null,
    reset: UseFormReset<LoanProduct>
) => {
    const [loanProduct, setLoanProduct] = useState<LoanProduct | null>(null);
    const [loading, setLoading] = useState(loanProductId !== null);
    const [error, setError] = useState<string | null>(null);

    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState<string | null>(null);

    const fetchLoanProductDetails = useCallback(async () => {
        if (loanProductId === null) {
            setLoanProduct(null);
            setLoading(false);
            setError(null);

            reset({
                loan_product_name: "",
                loan_product_desc: "",
                loan_product_min_amount: 0,
                loan_product_max_amount: 0,
                loan_product_min_tenure_month: 1,
                loan_product_max_tenure_month: 12,
                loan_product_interest_rate: 0,
            });

            return;
        }

        try {
            setLoading(true);
            setError(null);
            setLoanProduct(null);

            const response = await getLoanProductById(loanProductId);

            if (response.success) {
                const product = response.data;

                setLoanProduct(product);

                reset({
                    loan_product_name: product.loan_product_name ?? "",
                    loan_product_desc: product.loan_product_desc ?? "",
                    loan_product_min_amount: Number(product.loan_product_min_amount),
                    loan_product_max_amount: Number(product.loan_product_max_amount),
                    loan_product_min_tenure_month: Number(product.loan_product_min_tenure_month),
                    loan_product_max_tenure_month: Number(product.loan_product_max_tenure_month),
                    loan_product_interest_rate: Number(product.loan_product_interest_rate),
                });
            } else {
                setLoanProduct(null);
                setError(response.message ?? "Failed to load loan product.");
            }
        } catch (error) {
            console.error("Failed to fetch loan product details:", error);
            setLoanProduct(null);
            setError("Failed to load loan product details.");
        } finally {
            setLoading(false);
        }
    }, [loanProductId, reset]);

    const createProduct = useCallback(async (
        data: LoanProduct
    ): Promise<boolean> => {
        try {
            setCreating(true);
            setCreateError(null);

            const response = loanProductId === null
                ? await createLoanProduct(
                    data.loan_product_name,
                    data.loan_product_min_amount,
                    data.loan_product_max_amount,
                    data.loan_product_min_tenure_month,
                    data.loan_product_max_tenure_month,
                    data.loan_product_interest_rate,
                    data.loan_product_desc
                )
                : await updateLoanProduct(
                    loanProductId,
                    data.loan_product_name,
                    data.loan_product_min_amount,
                    data.loan_product_max_amount,
                    data.loan_product_min_tenure_month,
                    data.loan_product_max_tenure_month,
                    data.loan_product_interest_rate,
                    data.loan_product_desc
                );

            if (!response.success) {
                setCreateError(
                    response.message ?? "Failed to save loan product."
                );
                return false;
            }

            return true;
        } catch (error) {
            console.error("Failed to save loan product:", error);

            if (axios.isAxiosError(error)) {
                const validationErrors = error.response?.data?.errors;

                setCreateError(
                    Object.values(validationErrors ?? {}).flat()[0] as string ||
                    error.response?.data?.message ||
                    "Failed to save loan product."
                );
            } else {
                setCreateError("Failed to save loan product.");
            }

            return false;
        } finally {
            setCreating(false);
        }
    }, [loanProductId]);

    useEffect(() => {
        fetchLoanProductDetails();
    }, [fetchLoanProductDetails]);

    return {
        loanProduct,
        loading,
        error,
        fetchLoanProductDetails,
        createProduct,
        creating,
        createError,
    };
};

export default useCreateLoanProduct;