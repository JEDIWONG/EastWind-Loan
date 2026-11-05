import { z } from "zod";

export const MonthlyDelinquentBucketCompositionSchema = z.object({
    month_start: z.string(),
    snapshot_date: z.string(),
    dpd_buckets: z.object({
        "1-29": z.coerce.number(),
        "30-59": z.coerce.number(),
        "60-89": z.coerce.number(),
        "90+": z.coerce.number(),
    }),
});

export const MonthlyDelinquentRateTrendSchema = z.object({
    month_start: z.string(),
    snapshot_date: z.string(),
    dpd_bucket: z.enum(["1-29", "30-59", "60-89", "90+"]),
    delinquent_principal: z.coerce.number(),
    total_outstanding_principal: z.coerce.number(),
    total_delinquent_principal: z.coerce.number(),
    delinquent_rate: z.coerce.number(),
});

export const LoanCompositionSchema = z.object({
    loan_product_name: z.string(),
    loan_count: z.coerce.number(),
});

export const DelinquentRateSchema = z.object({
    lender_id: z.coerce.number(),
    period: z.enum(["CURRENT", "LAST_MONTH"]),
    snapshot_date: z.string(),
    total_outstanding_principal: z.coerce.number(),
    delinquent_outstanding_principal: z.coerce.number(),
    delinquent_rate: z.coerce.number(),
});

export const TotalOutstandingBalanceSchema = z.object({
    total_outstanding_balance: z.coerce.number(),
});

export const LoanPortfolioYieldSchema = z.object({
    period_start: z.string(),
    period_end: z.string(),
    total_interest_income: z.coerce.number(),
    beginning_outstanding_principal: z.coerce.number(),
    ending_outstanding_principal: z.coerce.number(),
    average_outstanding_principal: z.coerce.number(),
    loan_portfolio_yield: z.coerce.number(),
});

export type DelinquentRate = z.infer<typeof DelinquentRateSchema>;
export type TotalOutstandingBalance = z.infer<typeof TotalOutstandingBalanceSchema>;
export type LoanPortfolioYield = z.infer<typeof LoanPortfolioYieldSchema>;

export type MonthlyDelinquentBucketComposition = z.infer<typeof MonthlyDelinquentBucketCompositionSchema>;
export type MonthlyDelinquentRateTrend = z.infer<typeof MonthlyDelinquentRateTrendSchema>;
export type LoanComposition = z.infer<typeof LoanCompositionSchema>;
