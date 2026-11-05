import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import LoanProductCalculator from "../../components/loan/LoanProductCalculator";
import LoanProductInfoCard from "../../components/loan/LoanProductInfoCard";
import {
    ddCurrencyWithUnit,
    ddInterestRate,
    formatTenureWithMonth,
} from "../../utils/data-format-helper";
import LoanProductRequirements from "../../components/loan/product-details/LoanProductRequirements";
import { isUserLoggedIn } from "../../auth/session";
import AuthModal from "../../components/generic/modal/AuthModal";
import useLoanProductDetails from "../../hooks/useLoanProductDetails";
import LoadingOverlay from "../../components/generic/loading/LoadingOverlay";
import { useState } from "react";

const LoanProductPage = () => {
    const { loanProductId } = useParams();
    const navigate = useNavigate();

    const {
      loanProduct,
      loading,
    } = useLoanProductDetails(loanProductId ? Number(loanProductId) : null);

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleApply = () => {
        if (!loanProduct) return;

        if (isUserLoggedIn()) {
            navigate(`/apply/${loanProduct.id}`);
        } else {
            setShowConfirmation(true);
        }
    };

    if (loading) {
        return <LoadingOverlay />;
    }

    if (!loanProduct) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    Loan Product Not Found
                </h1>
            </div>
        );
    }

    return (
        <>
            {showConfirmation && (
                <AuthModal
                    title="Login to Apply"
                    description="Please sign in to continue with your loan application."
                    navigatePath={`/apply/${loanProduct.id}`}
                    onCancel={() => {
                        setShowConfirmation(false);
                    }}
                />
            )}

            <div className="mx-20 my-10">
                <button
                    type="button"
                    onClick={() => navigate("/find-loan")}
                    className="mb-8 flex items-center gap-2 text-gray-600 transition hover:text-black"
                >
                    <ArrowBack />
                    Back
                </button>

                <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-md">
                    <div className="flex items-center gap-30">
                        <div className="flex items-center">
                            <img
                                src={loanProduct.lender_img_url}
                                alt={loanProduct.lender_name}
                                className="h-30 w-30 rounded-full border border-gray-100 object-cover"
                            />

                            <p className="ml-4 text-gray-500">
                                {loanProduct.lender_name}
                            </p>
                        </div>

                        <div className="flex-cols">
                            <h1 className="mt-8 text-3xl font-bold text-gray-900">
                                {loanProduct.loan_product_name}
                            </h1>

                            <p className="mt-6 leading-7 text-gray-600">
                                {loanProduct.loan_product_desc}
                            </p>

                            <button
                                type="button"
                                onClick={handleApply}
                                className="mt-10 rounded-lg bg-yellow-500 px-8 py-3 font-bold text-black transition hover:cursor-pointer hover:bg-yellow-600"
                            >
                                Apply Today
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 grid grid-cols-5 gap-5">
                        <LoanProductInfoCard
                            title="Min Amount"
                            value={ddCurrencyWithUnit(
                                loanProduct.loan_product_min_amount
                            )}
                        />

                        <LoanProductInfoCard
                            title="Max Amount"
                            value={ddCurrencyWithUnit(
                                loanProduct.loan_product_max_amount
                            )}
                        />

                        <LoanProductInfoCard
                            title="Max Tenure"
                            value={formatTenureWithMonth(
                                loanProduct.loan_product_max_tenure_month
                            )}
                        />

                        <LoanProductInfoCard
                            title="Interest Rate"
                            value={
                                ddInterestRate(
                                    loanProduct.loan_product_interest_rate
                                ) + " p.a."
                            }
                        />

                        <LoanProductInfoCard
                            title="Loan Type"
                            value={loanProduct.loan_type_name}
                        />
                    </div>
                </div>

                <LoanProductCalculator
                    minAmount={Number(
                        loanProduct.loan_product_min_amount
                    )}
                    maxAmount={Number(
                        loanProduct.loan_product_max_amount
                    )}
                    maxTenureMonth={Number(
                        loanProduct.loan_product_max_tenure_month
                    )}
                    interestRate={Number(
                        loanProduct.loan_product_interest_rate
                    )}
                />

                <LoanProductRequirements
                    requirements={
                        loanProduct.loan_product_requirements
                    }
                />

                <div className="mt-10 flex justify-end">
                    <button
                        type="button"
                        onClick={handleApply}
                        className="rounded-lg bg-yellow-500 px-8 py-3 font-bold text-black transition hover:bg-yellow-600"
                    >
                        Apply for This Loan
                    </button>
                </div>
            </div>
        </>
    );
};

export default LoanProductPage;
