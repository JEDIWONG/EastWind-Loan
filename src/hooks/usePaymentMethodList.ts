import { useCallback, useEffect, useState } from "react";
import { getPaymentMethods } from "../api/paymentApi";
import type { PaymentMethod } from "../schemas/paymentSchema";

const usePaymentMethodList = () => {
    const [paymentMethodList, setPaymentMethodList] = useState<PaymentMethod[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPaymentMethodList = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getPaymentMethods();

            if (response.success) {
                setPaymentMethodList(response.data);
            } else {
                setPaymentMethodList([]);
            }
        } catch (error) {
            console.error(
                "Failed to fetch payment method list:",
                error
            );

            setError("Failed to load payment method list.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPaymentMethodList();
    }, [fetchPaymentMethodList]);

    return {
        paymentMethodList,
        loading,
        error,
        refetch: fetchPaymentMethodList,
    };
};

export default usePaymentMethodList;
