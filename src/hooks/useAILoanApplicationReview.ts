import { useEffect, useState } from "react";
import {generateLoanApplicationAISummary,predictLoanRisk} from "../api/LoanApplicationAPI";
import type { AILoanApplicationReview } from "../schemas/loanSchema";

const useAILoanApplicationReview = (loanApplication: any) => {
    const [review, setReview] = useState<AILoanApplicationReview|null>(null);
    const [summary, setSummary] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);
    const [summaryLoading, setSummaryLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getReview = async () => {
            setLoading(true);
            setError(null);
            setReview(null);
            setSummary(null);

            try {
                const riskResponse = await predictLoanRisk(
                    loanApplication.loan_id
                );

                if (!riskResponse.success) {
                    throw new Error(
                        "Failed to generate loan risk prediction."
                    );
                }

                const riskReview = riskResponse.data;

                setReview(riskReview);
                setLoading(false);

                setSummaryLoading(true);

                const summaryResponse =
                    await generateLoanApplicationAISummary(
                        [
                            `Name: ${loanApplication.borrower_f_name} ${loanApplication.borrower_l_name}`,
                            `Age: ${loanApplication.borrower_age}`,
                            `Gender: ${loanApplication.borrower_gender}`,
                            `Occupation: ${loanApplication.borrower_occupation}`,
                            `Employment Status: ${loanApplication.borrower_employment_status}`,
                            `Monthly Income: RM ${(loanApplication.monthly_income)}`,
                            `Employment Duration: ${Number(loanApplication.borrower_employment_duration_year)*12 + Number(loanApplication.borrower_employment_duration_month)} months`,
                            `Home Ownership: ${loanApplication.home_ownership_status}`,
                        ],
                        [
                            `Loan Product: ${loanApplication.loan_product_name}`,
                            `Loan Type: ${loanApplication.loan_type_name}`,
                            `Loan Amount: RM ${(loanApplication.loan_amount)}`,
                            `Interest Rate: ${(loanApplication.loan_interest_rate)}%`,
                            `Loan Tenure: ${loanApplication.loan_tenure_month} months`, 
                            `Loan Purpose: ${loanApplication.loan_purpose}`,
                        ],
                        [
                            `Risk Level: ${riskReview.recommendation.risk_level}`,
                            `Default Probability: ${(riskReview.prediction.default_probability * 100).toFixed(2)}%`,
                            `Fully Paid Probability: ${(riskReview.prediction.fully_paid_probability * 100).toFixed(2)}%`,
                            `Recommended Amount: RM ${riskReview.recommendation.recommended_amount}`,
                            `Recommended Tenure: ${riskReview.recommendation.recommended_tenure} months`,
                        ]
                    );

                if (summaryResponse.success) {
                    setSummary(summaryResponse.data.summary);
                }
            } catch (error) {
                console.error(
                    "Failed to generate AI loan application review:",
                    error
                );

                setError(
                    error instanceof Error
                        ? error.message
                        : "Failed to generate AI loan application review."
                );
            } finally {
                setLoading(false);
                setSummaryLoading(false);
            }
        };

        getReview();
    }, [loanApplication.loan_id]);

    return {
        review,
        summary,
        loading,
        summaryLoading,
        error,
    };
};

export default useAILoanApplicationReview;