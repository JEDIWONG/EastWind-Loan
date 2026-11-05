import { useEffect, useState } from "react";
import type {LoanRepayment } from "../schemas/loanSchema";
import { getLoanRepaymentListByLoanId } from "../api/loanApi";
import { getUserTypeId } from "../auth/session";

export const useLoanRepaymentList = (loanId: string, statusName?:string) => {
    const [loanRepaymentList, setLoanRepaymentList] = useState<LoanRepayment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userTypeId = getUserTypeId();

    const fetchLoanRepaymentList = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await getLoanRepaymentListByLoanId(loanId,statusName);

            if (response.success) {
                setLoanRepaymentList(response.data);
            } else {
                setLoanRepaymentList([]);
            }
        } catch (error) {
            console.error("Failed to fetch loan repayment list:", error);
            setError("Failed to load loan repayment list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLoanRepaymentList();
    }, [statusName]);

    return {
        loanRepaymentList,
        loading,
        error,
        userTypeId,
        refetch: fetchLoanRepaymentList
    };
};