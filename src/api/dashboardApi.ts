import { api } from "./client";

export async function getTotalOutstandingBalanceByLender() {

    const { data } = await api.get(
        "/lender/dashboard/total-outstanding-balance",
    );

    return data.data;
}

export async function getLoanPortfolioYieldByLender() {

    const { data } = await api.get(
        "/lender/dashboard/loan-portfolio-yield",
    );

    return data.data;
}

export async function getDelinquentRateByLender() {
    const { data } = await api.get(
        "/lender/dashboard/delinquent-rate",
    );

    return data.data;
}

export async function getMonthlyDelinquentBucketCompositionByLender(monthCount: number) {
    const { data } = await api.get(
        "/lender/dashboard/monthly-delinquent-bucket-composition",
        {
            params: {
                month_count: monthCount,
            },
        }
    );

    return data.data;
}

export async function getMonthlyDelinquentRateTrendByLender(monthCount: number) {
    const { data } = await api.get(
        "/lender/dashboard/monthly-delinquent-rate-trend",
        {
            params: {
                month_count: monthCount,
            },
        }
    );

    return data.data;
}

export async function getLoanCompositionByLender() {
    const { data } = await api.get(
        "/lender/dashboard/loan-composition",
    );

    return data.data;
}