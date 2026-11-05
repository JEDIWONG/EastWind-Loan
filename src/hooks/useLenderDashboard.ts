import { useEffect, useState } from "react";
import {
    getTotalOutstandingBalanceByLender,
    getLoanPortfolioYieldByLender,
    getDelinquentRateByLender,
    getMonthlyDelinquentBucketCompositionByLender,
    getMonthlyDelinquentRateTrendByLender,
    getLoanCompositionByLender,
} from "../api/dashboardApi";
import {
    type DelinquentRate,
    type TotalOutstandingBalance,
    type LoanPortfolioYield,
    type MonthlyDelinquentBucketComposition,
    type MonthlyDelinquentRateTrend,
    type LoanComposition,
} from "../schemas/dashboardSchema";

const useLenderDashboardData = (
    delinquentRateTrendMountCount:number = 6,
    monthCount: number = 12
) => {
    const [totalOutstandingBalance, setTotalOutstandingBalance] = useState<TotalOutstandingBalance | null>(null);
    const [loanPortfolioYield, setLoanPortfolioYield] = useState<LoanPortfolioYield | null>(null);
    const [delinquentRate, setDelinquentRate] = useState<DelinquentRate>(null);

    const [monthlyDelinquentBucketComposition,setMonthlyDelinquentBucketComposition] = useState<MonthlyDelinquentBucketComposition[]>([]);
    const [monthlyDelinquentRateTrend,setMonthlyDelinquentRateTrend] = useState<MonthlyDelinquentRateTrend[]>([]);

    const [loanComposition, setLoanComposition] = useState<LoanComposition[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [outstandingBalanceData, portfolioYieldData, delinquentRateData, bucketCompositionData, rateTrendData, loanCompositionData,] 
                    = await Promise.all([
                        getTotalOutstandingBalanceByLender(),
                        getLoanPortfolioYieldByLender(),
                        getDelinquentRateByLender(),
                        getMonthlyDelinquentBucketCompositionByLender(monthCount),
                        getMonthlyDelinquentRateTrendByLender(delinquentRateTrendMountCount),  
                        getLoanCompositionByLender(),
                    ]);

                setTotalOutstandingBalance(outstandingBalanceData[0]);
                setLoanPortfolioYield(portfolioYieldData[0]);
                setDelinquentRate(delinquentRateData[0]);
                setMonthlyDelinquentBucketComposition(
                    bucketCompositionData.map((item) => ({
                        ...item,
                        dpd_buckets:
                            typeof item.dpd_buckets === "string"
                                ? JSON.parse(item.dpd_buckets)
                                : item.dpd_buckets,
                    }))
                );
                setMonthlyDelinquentRateTrend(rateTrendData);
                setLoanComposition(loanCompositionData);

            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to load lender dashboard data."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();

    }, [monthCount]);

    return {
        totalOutstandingBalance,
        loanPortfolioYield,
        delinquentRate,
        monthlyDelinquentBucketComposition,
        monthlyDelinquentRateTrend,
        loanComposition,
        loading,
        error,
    };
};

export default useLenderDashboardData;
