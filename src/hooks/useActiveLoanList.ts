import { useEffect, useState } from "react";
import type { ActiveLoan } from "../schemas/loanSchema";
import { getActiveLoanListByBorrowerId, getActiveLoanListByLenderId } from "../api/loanApi";
import { getUserTypeId } from "../auth/session";

export const useActiveLoanList = (filterName?:string) => {
    const [activeLoanList, setActiveLoanList] = useState<ActiveLoan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userTypeId = getUserTypeId();

    useEffect(() => {
        const fetchLoanActiveLoanList = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = userTypeId === 2
                        ? await getActiveLoanListByBorrowerId()
                        : await getActiveLoanListByLenderId(filterName);

                if (response.success) {
                    setActiveLoanList(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch active loan list:", error);
                setError("Failed to load active loan list.");
            } finally {
                setLoading(false);
            }
        };

        fetchLoanActiveLoanList();
    }, [userTypeId,filterName]);

    return {
        activeLoanList,
        loading,
        error
    };
};