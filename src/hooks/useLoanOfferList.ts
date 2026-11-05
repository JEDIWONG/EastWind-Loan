import { useEffect, useState } from "react";
import { getLoanOfferListByBorrowerId, getLoanOfferListByLenderId } from "../api/loanApi";
import { getUserTypeId } from "../auth/session";
import type { ApprovedLoan } from "../schemas/loanSchema";

export const useLoanOfferList = (filterName?:string) => {
    const [loanOffers, setLoanOffers] = useState<ApprovedLoan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const userTypeId = getUserTypeId();

    useEffect(() => {
        const fetchLoanOffers = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = userTypeId === 2
                        ? await getLoanOfferListByBorrowerId()
                        : await getLoanOfferListByLenderId(filterName);

                if (response.success) {
                    setLoanOffers(response.data);
                } else {
                    setLoanOffers([]);
                }
            } catch (error) {
                console.error("Failed to fetch loan offers:", error);
                setError("Failed to load loan offers.");
            } finally {
                setLoading(false);
            }
        };

        fetchLoanOffers();
    }, [userTypeId,filterName]);

    return {
        loanOffers,
        loading,
        error,
    };
};