import LoanAIReviewItemCard from "./LoanAIReviewItemCard";
import { AutoAwesomeOutlined } from "@mui/icons-material";
import useAILoanApplicationReview from "../../../hooks/useAILoanApplicationReview";

const LoanAIReviewSection = ({
    loanApplication,
}) => {
    const {
        review,
        summary,
        loading,
        summaryLoading,
    } = useAILoanApplicationReview(loanApplication);

    return (
        <div className="overflow-hidden rounded-2xl bg-white py-10">
            <div className="mx-10 mb-5 flex items-center gap-10">
                <AutoAwesomeOutlined className="text-indigo-400" />

                <div className="flex-cols">
                    <div className="flex items-center gap-2">
                        <h2>
                            AI Loan Review
                        </h2>

                        <span className="rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2.5 py-1 text-xs font-medium text-indigo-300">
                            AI Assisted
                        </span>
                    </div>

                    <p className="mt-1 text-slate-400">
                        AI-generated risk assessment and loan recommendation.
                    </p>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-10">
                    <p className="text-sm text-slate-400">
                        Analysing loan application...
                    </p>
                </div>
            ) : review ? (
                <div className="grid gap-1 px-10">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <LoanAIReviewItemCard
                            title="Predicted Risk Level"
                            value={
                                review.recommendation.risk_level
                            }
                            className="border-indigo-500/30"
                        />

                        <LoanAIReviewItemCard
                            title="Predicted Default Probability"
                            value={`${(
                                review.prediction.default_probability * 100
                            ).toFixed(2)}%`}
                        />

                        <LoanAIReviewItemCard
                            title="Fully Paid Probability"
                            value={`${(
                                review.prediction.fully_paid_probability * 100
                            ).toFixed(2)}%`}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <LoanAIReviewItemCard
                            title="Recommended Amount"
                            value={`RM ${review.recommendation.recommended_amount.toLocaleString()}`}
                        />

                        <LoanAIReviewItemCard
                            title="Recommended Tenure"
                            value={`${review.recommendation.recommended_tenure} Months`}
                        />
                    </div>

                    <LoanAIReviewItemCard
                        title="AI Assessment Summary"
                        subtitle="AI-generated analysis based on the applicant's information and risk assessment"
                        className="border-indigo-500/30"
                    >
                        {summaryLoading ? (
                            <div className="py-4">
                                <p className="text-sm text-slate-400">
                                    Generating AI assessment summary...
                                </p>
                            </div>
                        ) : summary ? (
                            <div className="rounded-lg border border-slate-800 bg-slate-900/70 p-4">
                                <p className="whitespace-pre-line text-sm leading-6 text-slate-300">
                                    {summary}
                                </p>
                            </div>
                        ) : (
                            <p className="text-center text-sm text-white">
                                Unable to generate AI assessment summary.
                            </p>
                        )}
                    </LoanAIReviewItemCard>
                </div>
            ) : (
                <div className="py-10 text-center">
                    <p className="text-sm text-slate-500">
                        Unable to generate AI loan review.
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoanAIReviewSection;
